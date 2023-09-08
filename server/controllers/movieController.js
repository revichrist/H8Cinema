const { Movie, User, Genre, History } = require("../models");

class MovieController {
  static async postMovie(request, response, next) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } =
        request.body;
      const { id: authorId, username, email } = request.user;

      const insertMovieData = await Movie.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId,
      });

      await History.create({
        name: "CREATE",
        description: `New Movie ${insertMovieData.title} with  ID:${insertMovieData.id} has been created`,
        updatedBy: `${username || email}`,
      });

      response.status(201).json({
        statusCode: 201,
        data: insertMovieData,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readMovie(request, response, next) {
    try {
      const data = await Movie.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Genre,
          },
        ],
      });

      response.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async detailMovie(request, response, next) {
    try {
      const { id } = request.params;
      const data = await Movie.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "DataNotFound" };
      } else {
        response.status(200).json({
          statusCode: 200,
          data,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovie(request, response, next) {
    try {
      const { id } = request.params;
      const { username, email } = request.user;

      const data = await Movie.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "DataNotFound" };
      } else {
        await Movie.destroy({
          where: {
            id,
          },
        });

        await History.create({
          name: "DELETE",
          description: `Movie ${data.title} with  ID:${data.id} has been deleted`,
          updatedBy: `${username || email}`,
        });

        response.status(200).json({
          statusCode: 200,
          message: `${data.title} with ID:${data.id} has been deleted`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async editMovieData(request, response, next) {
    try {
      const { id } = request.params;
      const { username, email } = request.user;

      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } =
        request.body;

      const data = await Movie.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "DataNotFound" };
      } else {
        await Movie.update(
          {
            title,
            synopsis,
            trailerUrl,
            imgUrl,
            rating,
            genreId,
          },
          {
            where: {
              id,
            },
          }
        );
      }

      await History.create({
        name: "EDIT",
        description: `Movie ${data.title} with  ID:${data.id} has been edited`,
        updatedBy: `${username || email}`,
      });

      response.status(200).json({
        statusCode: 200,
        message: `Movie with ID:${id} was edited`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editStatus(request, response, next) {
    try {
      const { id } = request.params;
      const { status } = request.body;
      const { username, email } = request.user;

      const data = await Movie.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "DataNotFound" };
      } else {
        await Movie.update(
          {
            status,
          },
          {
            where: {
              id,
            },
          }
        );
      }

      await History.create({
        name: "EDIT",
        description: `Movie ${data.title} with ID:${data.id} has its status been changed from ${data.status} to ${status}`,
        updatedBy: `${username || email}`,
      });

      response.status(200).json({
        statusCode: 200,
        message: `${data.title} with ID:${id} has its status changed to ${status}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
