module.exports = (res, statusCode, message) => {
  return res
    .status(statusCode)
    .json({ success: false, status: statusCode, error: message });
};
