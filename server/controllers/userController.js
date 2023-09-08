const { User } = require("../models");
const { loginValidation, generateToken } = require("../helpers");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(request, response, next) {
    const { email, password, username, phoneNumber, address } = request.body;
    const role = "Admin";

    try {
      const data = await User.create({
        email,
        password,
        role,
        username,
        phoneNumber,
        address,
      });
      response.status(201).json({
        statusCode: 201,
        message: "Successfully created",
        data: {
          id: data.id,
          email: data.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(request, response, next) {
    try {
      const { email, password } = request.body;

      if(!email) throw {name: 'EmailRequired'}
      if(!password) throw {name: 'PasswordRequired'}

      const data = await User.findOne({
        where: {
          email,
        },
      });

      if (!data) throw { name: "InvalidEmailOrPassword" };

      const loginAccess = loginValidation(password, data.password);

      if (!loginAccess) throw { name: "InvalidEmailOrPassword" };

      // data yang ada didalem ini, key2 nya adalah payload
      const access_token = generateToken({
        id: data.id,
        email: data.email,
        role: data.role,
      });

      response.status(200).json({
        statusCode: 200,
        access_token,
        username: data.username,
        email: data.email,
        role: data.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(request, response, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const { google_token } = request.headers;
      
      if (!google_token) throw { name: "GoogleTokenError" };
      console.log(google_token, 76)
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      
      const { email, given_name: username } = payload;
      const password = "google_password";
      const role = "Staff";

      const [data, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          password,
          role,
          username,
        },
        hooks: false,
      });

      const access_token = generateToken({
        id: data.id,
        email: data.email,
        role: data.role,
      });

      response.status(200).json({
        statusCode: 200,
        access_token,
        username: data.username,
        email: data.email,
        role: data.role,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
