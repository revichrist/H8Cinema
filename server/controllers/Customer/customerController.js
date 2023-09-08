const { Customer, Movie } = require("../../models");
const { loginValidation, generateToken } = require("../../helpers");
const { OAuth2Client } = require("google-auth-library");

class CustomerController {
  static async login(request, response, next) {
    try {
      const { email, password } = request.body;

      if(!email) throw {name: "EmailRequired"}
      if(!password) throw {name: "PasswordRequired"}

      const data = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!data) throw { name: "InvalidEmailOrPassword" };

      const validation = loginValidation(password, data.password);

      if (!validation) throw { name: "InvalidEmailOrPassword" };

      const payload = {
        id: data.id,
        email: data.email,
        role: data.role,
      };

      const access_token = generateToken(payload);

      response.status(200).json({
        statusCode: 200,
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(request, response, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const { google_token } = request.headers;
      console.log(google_token, 46)
      if (!google_token) throw { name: "GoogleTokenError" };

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const { email } = payload;
      const password = "google_password";
      const role = "Customer";

      const [data, created] = await Customer.findOrCreate({
        where: {
          email,
        },
        defaults: {
          password,
          role,
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
        email: payload.email,
        role: data.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(request, response, next) {
    try {
      const { email, password } = request.body;
      const role = "Customer";

      const data = await Customer.create({
        email,
        password,
        role,
      });

      response.status(201).json({
        statusCode: 201,
        message: "Successfully created",
        data: {
          id: data.id,
          email: data.email,
          role: data.role
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
