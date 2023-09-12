const { client } = require("../connection/redis");
const { handleCompare, handleHash } = require("../helpers/encodePassword");
const { signToken, signRfToken } = require("../helpers/jwt.helper");
const User = require("../indexKey/UserModel");
const createError = require("http-errors");
const sendMail = require("../helpers/sendmail");
const randomPassword = require("../helpers/randomPassword");
const bcrypt = require("bcrypt");
class UserController {
  async register(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        return next(createError(400, "Invalid value!!"));
      const thisUer = await User.findOne({
        $or: [{ username }, { email: username }],
      });
      if (thisUer) return next(createError(400, "This user is exist!!"));
      const newUser = new User(req.body);
      const data = await newUser.save();
      return res.send({
        status: true,
        data,
      });
    } catch (error) {
      return next(createError(500, error.message));
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const thisUser = await User.findOne({
        $or: [{ username }, { email: username }],
      });
      if (!thisUser)
        return next(createError(404, "This user does not exist!!"));
      const same = await handleCompare(password, thisUser.password);
      if (!same) return next(createError(404, "Your password is incorrect"));
      const dataSign = {
        _id: thisUser._id,
        type: "control",
      };
      const token = await signToken(dataSign);
      const rf_token = await signRfToken(dataSign);
      await client.set(
        thisUser._id.toString(),
        JSON.stringify({ token, rf_token })
      );

      return res.send({
        token,
        rf_token,
        permisions: thisUser.permission,
      });
    } catch (error) {
      console.log(error);
      return next(createError(500, error.message));
    }
  }

  async authAccount(req, res, next) {
    try {
      const { id } = req.SessionInfo;
      const ThisUser = await User.findOne({ _id: id }, { password: 0 });
      return response.send({
        status: 200,
        data: ThisUser,
      });
    } catch (error) {
      return next(createError(500, error.message));
    }
  }

  async requestToken(req, res, next) {
    try {
      const { id, type } = req.SessionRFInfo;
      const inforUser = await User.findOne(
        { id },
        {
          password: 0,
        }
      );

      const dataSign = {
        _id: thisUer._id,
        type: "control",
      };
      const token = await signToken(dataSign);
      const rf_token = await signRfToken(dataSign);
      await client.set(
        thisUser._id.toString(),
        JSON.stringify({ token, rf_token })
      );
      return res.send({
        token,
        rf_token,
        permisions: thisUer.permission,
      });
    } catch (error) {
      return next(createError(500, error.message));
    }
  }

  async logout(req, res, next) {
    try {
      const { id } = req.SessionInfo;
      await client.del(id);
      return res.send({
        status: 200,
        message: "Logout",
      });
    } catch (error) {
      return next(createError(500, error.message));
    }
  }

  async updateUser(req, res, next) {
    try {
      const { password } = req.body;
      const { id } = req.SessionInfo;
      const { userId } = req.query;
      let data = null;
      if (userId) {
        data = User.updateOne({ _id: userId }, { $set: req.body });
      } else {
        const thisUser = await User.findOne({ _id: id });
        if (!thisUser)
          return next(createError(404, "This user does not exist!!"));
        const same = await handleCompare(password, thisUser.password);
        if (!same) return next(createError(404, "Your password is incorrect"));
        data = User.updateOne({ _id: id }, { $set: req.body });
      }

      return res.send({
        status: 200,
        data,
      });
    } catch (error) {
      return next(createError(500, error.message));
    }
  }
}

module.exports = new UserController();
