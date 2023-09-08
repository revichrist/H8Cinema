const { Movie, Bookmark } = require("../../models");

class CustomerBookmarkController {
  static async postBookmark(request, response, next) {
    try {
      const { id } = request.params;

      const checkMovie = await Movie.findByPk(id);

      if (!checkMovie) throw { name: "DataNotFound" };

      const MovieId = checkMovie.id;
      const { id: CustomerId } = request.user;

      const checkDuplicate = await Bookmark.findOne({
        where: {
          MovieId,
          CustomerId,
        },
      });

      if (checkDuplicate) throw { name: "NoDuplication" };

      await Bookmark.create({
        CustomerId,
        MovieId,
      });

      response.status(201).json({
        statusCode: 201,
        message: `Movie ${checkMovie.title} has been added to your bookmark list`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchBookmark(request, response, next) {
    try {
      const { id: CustomerId } = request.user;

      const userBookmark = await Bookmark.findAll({
        where: {
          CustomerId,
        },
        include: {
          model: Movie,
        },
        order: [["id", "ASC"]],
      });

      response.status(200).json({
        statusCode: 200,
        data: userBookmark,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookmark(request, response, next) {
    try {
      const { id: MovieId } = request.params;

      const checkBookmark = await Bookmark.findOne({
        where: {
          MovieId
        },
        include: {
          model: Movie
        }
      });

      if (!checkBookmark) throw { name: "DataNotFound" };
      const movieName = checkBookmark.Movie.title
      
      await Bookmark.destroy({
        where: {
          MovieId
        }
      })
      
      response.status(200).json({
        statusCode: 200,
        message: `${movieName} has been removed from your bookmark`
      })

    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerBookmarkController;
