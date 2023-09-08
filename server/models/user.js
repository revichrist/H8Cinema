"use strict";
const { hashPassword } = require("../helpers");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie, {
        foreignKey: "authorId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "This email is already taken, please input another one",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
          notNull: {
            args: true,
            msg: "Email is required",
          },
          isEmail: {
            args: true,
            msg: "The email format you are inputting is invalid",
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
          notNull: {
            args: true,
            msg: "Password is required",
          },
          lengthValidation(value) {
            if (value.length < 5) {
              throw new Error("Minimum password length is 5 characters");
            }
          },
        },
      },

      role: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    const value = user.password;
    user.password = hashPassword(value);
  });

  return User;
};
