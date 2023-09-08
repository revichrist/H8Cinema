const { Movie, Genre } = require("../../models");
const axios = require("axios");

class CustomerMovieController {
  static async fetchMovie(request, response, next) {
    try {
      let { limit = 4, currentPage = 1, genreFilter } = request.query;

      

      const genreContainer = {};

      if (genreFilter) {
        genreContainer.name = genreFilter.split("%");
      }

      const data = await Movie.findAndCountAll({
        limit,
        offset,
        include: {
          model: Genre,
          where: genreContainer,
          order: [["id", "ASC"]],
        },
      });

      response.status(200).json({
        statusCode: 200,
        totalData: data.count,
        totalPage: Math.ceil(data.count / limit),
        data: data.rows,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchMovieDetail(request, response, next) {
    try {
      const { id } = request.params;

      const checkMovie = await Movie.findOne({
        where: {
          id,
        },
        include: {
          model: Genre,
        },
      });

      if (!checkMovie) throw { name: "DataNotFound" };

      response.status(200).json({
        statusCode: 200,
        data: checkMovie,
      });
    } catch (error) {
      next(error);
    }
  }

  static async generateCode(request, response, next) {
    try {
      const { link } = request.body;

      const data = await axios({
        method: "POST",
        url: `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_ACCESS_TOKEN}`,
        data: {
          frame_name: "no-frame",
          qr_code_text: link,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      });

      response.status(200).json(data.data);

    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerMovieController;
