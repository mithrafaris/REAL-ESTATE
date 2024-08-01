// utils/error.js
module.exports = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
