"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User, {
        foreignKey: "authorId",
      });

      Movie.belongsTo(models.Genre, {
        foreignKey: "genreId",
      });

      Movie.hasMany(models.Bookmark, { foreignKey: "MovieId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Movie title is required",
          },
          notNull: {
            args: true,
            msg: "Movie title is required",
          },
        },
      },

      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Synopsis is required",
          },
          notNull: {
            args: true,
            msg: "Synopsis is required",
          },
        },
      },

      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,

      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: "Minimum rating is 1",
          },
        },
      },

      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Genre is required",
          },
          notNull: {
            args: true,
            msg: "Genre is required",
          },
        },
      },

      authorId: DataTypes.INTEGER,

      status: DataTypes.STRING,

      deletedAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
      paranoid: true,
    }
  );
  Movie.beforeCreate(async (movie) => {
    movie.status = "Active";
  });

  return Movie;
};
