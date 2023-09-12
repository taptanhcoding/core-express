const jwt = require("jsonwebtoken");
const  secretkey = require("../configs/jwt.config");

module.exports = {
  async signToken(data) {
    try {
      const token = await jwt.sign(data, secretkey.token, {
        expiresIn: "24h",
        algorithm: 'HS512',
      });
      return token;
    } catch (error) {
      console.log("Lỗi Tạo token-->", error);
      return false;
    }
  },
  async signRfToken(data) {
    try {
      const token = await jwt.sign(data, secretkey.rf_token, {
        expiresIn: "1y",
        algorithm: 'HS512',
      });
      return token;
    } catch (error) {
      console.log("Lỗi Tạo token-->", error);
      return false;
    }
  },

  async verifyToken(token) {
    try {
      const data = await jwt.verify(token, secretkey.token);
      return data;
    } catch (error) {
      console.log("Lỗi Tạo token-->", error);
      return false;
    }
  },

  async verifyRfToken(token) {
    try {
      const data = await jwt.verify(token, secretkey.rf_token);
      return data;
    } catch (error) {
      console.log("Lỗi Tạo token-->", error);
      return false;
    }
  },
};
