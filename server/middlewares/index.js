const errorHandler = require("./errorHandler");
const authentication = require("./authentication");
const { deleteAuthorization, statusAuthorization } = require("./authorization");

module.exports = {
  errorHandler,
  authentication,
  deleteAuthorization,
  statusAuthorization,
};
