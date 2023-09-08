const { Movie } = require("../models");

async function deleteAuthorization(request, response, next) {
  try {
    const { id: userId, role } = request.user;
    const { id } = request.params;

    const dataMovie = await Movie.findByPk(id);

    if (dataMovie) {
      if (role !== "Admin" && dataMovie.authorId !== userId) {
        throw { name: "AuthorizationError" };
      }
      next();
    } else {
      throw { name: "DataNotFound" };
    }
  } catch (error) {
    next(error);
  }
}

async function statusAuthorization(request, response, next) {
  try {
    const { role } = request.user;
    const { id } = request.params;

    const data = await Movie.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      throw { name: "DataNotFound" };
    } else {
      if (role !== "Admin") {
        throw { name: "AuthorizationError" };
      }else{
        next()
      }
    }

  } catch (error) {
    next(error);
  }
}

module.exports = { statusAuthorization, deleteAuthorization };