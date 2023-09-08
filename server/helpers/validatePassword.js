const bcrypt = require("bcryptjs");

function hashPassword(value = "") {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(value, salt);

  return hashedPassword;
}

function loginValidation(password = "", hashedPassword = "") {
  const validation = bcrypt.compareSync(password, hashedPassword);

  return validation;
}

module.exports = { hashPassword, loginValidation };