const createError = require("http-errors");
const { verifyRfToken } = require("../helpers/jwt.helper");
const { client } = require("../connection/redis");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
  RFTOKEN: "rf_token_key",
};

async function checkAuth(req, res, next) {
  const key = req.headers[HEADER.AUTHORIZATION];
  if (!key) return createError(500, "authorization is require!");
  const data = await verifyToken(key);

  if (data.message == "jwt expired") return createError(401, data.message);
  else if (data.message == "jwt malformed")
    return createError(500, data.message);
  else if (data.message == "jwt not active")
    return createError(404, data.message);
  const { id } = data;
  if (!id) return createError(500, "Unknow Error");
  const dataSession = await client.get(id);
  if (!dataSession) return createError(503, "you have logout the account");

  const { token, rf_token } = dataSession;
  if (!token) return createError(503, "you have logout the account");
  if (token !== key)
    return createError(400, "you account already login at another ip!");
  req.SessionInfo = data;
  return next();
}

async function GetTonkenByRf(req, res, next) {
  const key = req.headers[HEADER.RFTOKEN];
  if (!key) return createError(500, "refresh is require!");
  const data = await verifyRfToken(key);

  if (data.message == "jwt expired") return createError(401, data.message);
  else if (data.message == "jwt malformed")
    return createError(500, data.message);
  else if (data.message == "jwt not active")
    return createError(404, data.message);
  const { id } = data;
  if (!id) return createError(500, "Unknow Error");
  const { token, rf_token } = await UserRedis.fetch(id);
  if (!rf_token) return createError(503, "you have logout the account");
  if (rf_token !== key)
    return createError(400, "you account already login at another ip!");
  req.SessionRFInfo = data;
  return next();
}

function checkClient(req, res, next) {
  const clientkey = req.headers[HEADER.API_KEY];
  console.log(clientkey);
  if (clientkey == "e320f58623b1841c7cc3a74d") return next();
  return res.status(500).json({
    status: false,
    message: "you are not out service!!",
  });
}

module.exports = {
  checkClient,
  checkAuth,
  GetTonkenByRf,
};
