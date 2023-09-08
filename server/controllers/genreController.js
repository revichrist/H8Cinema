const { Genre } = require("../models");

class GenreController {
  static async readGenre(request, response, next) {
    try {
      const data = await Genre.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        }
      });

      response.status(200).json({
        statusCode: 200,
        data
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GenreController