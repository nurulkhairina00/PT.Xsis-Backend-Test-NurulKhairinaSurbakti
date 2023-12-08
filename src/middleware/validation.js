const { validationResult } = require("express-validator");
const errorHandler = require("../middleware/errorHandler");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorHandler(res, 400, errors.array()[0].msg);
  }
  next();
};

module.exports = { validate };
