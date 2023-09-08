const { User, Customer } = require("../models");
const { verifyToken } = require("../helpers");

async function authentication(request, response, next) {
  try {
    // kalau access tokennya terbaca dan valid, maka akan lanjut
    let data;
    const { access_token } = request.headers;

    if (!access_token) {
      throw { name: "JsonWebTokenError" };
    }

    const payload = verifyToken(access_token);

    if (!payload) {
      throw { name: "JsonWebTokenError" };
    }

    // ngecek user di database
    if (payload.role === "Customer") {
      data = await Customer.findOne({
        where: {
          email: payload.email,
        },
      });
    } else {
      data = await User.findOne({
        where: {
          email: payload.email,
        },
      });
    }

    if (!data) {
      throw { name: "JsonWebTokenError" };
    }

    request.user = {
      id: data.id,
      username: data.username || "",
      email: data.email,
      role: data.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
