function errorHandler(error, request, response, next) {
  let statusCode = 500;
  let message;

  // console.log(error, 5)

  switch (error.name) {
    // error 400 - Bad Request
    // Validation error
    case "NoDuplication":
      statusCode = 400;
      message = "This movie is already added in your list";
      break;

    case "EmailRequired":
      statusCode = 400;
      message = "Email is required";
      break;

    case "PasswordRequired":
      statusCode = 400;
      message = "Password is required";
      break;

    case "SequelizeValidationError":
      const errorMessages = error.errors.map((el) => {
        return el.message;
      });

      statusCode = 400;
      message = errorMessages;
      break;

    // Duplicate email
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = error.message;
      break;

    // error 401 - Unauthorized
    // Invalid password or email
    case "InvalidEmailOrPassword":
      statusCode = 401;
      message = "Invalid password or email";
      break;

    // Invalid JWT
    case "JsonWebTokenError":
      statusCode = 401;
      message = "You need to login before accessing even further";
      break;

    // Invalid Google Token
    case "GoogleTokenError":
      statusCode = 401;
      message = "There's an error when fetching user's token";
      break;

    // error 403 - Forbidden
    // authorization error
    case "AuthorizationError":
      statusCode = 403;
      message = "You are not authorized to do this action";
      break;

    // error 404 - Not found
    case "DataNotFound":
      statusCode = 404;
      message = "Can't find data";
      break;

    // error 500 - Global Error
    default:
      message = error.message || error;
      break;
  }

  response.status(statusCode).json({
    statusCode,
    message,
  });
}

module.exports = errorHandler;
