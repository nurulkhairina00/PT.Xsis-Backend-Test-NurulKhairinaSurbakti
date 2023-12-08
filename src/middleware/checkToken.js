const jwt = require("jsonwebtoken");
const config = require("../database/config");
const errorHandler = require("./errorHandler");

const checkToken = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  const token =
    authHeaders && /^Bearer\s/.test(authHeaders) && authHeaders.split(" ")[1];

  if (!token)
    return errorHandler(res, 401, "Unauthorized - Token not provided");

  jwt.verify(token, config.secret, (err, user) => {
    if (err) return errorHandler(res, 403, "Forbidden - Invalid token");

    req.user = user;
    next();
  });
};

module.exports = checkToken;
