"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {}
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Judul harus diisi.",
          },
          max: {
            args: [200],
            msg: "Panjang judul maksimum 200 karakter.",
          },
          min: {
            args: [5],
            msg: "Panjang judul minimum 5 karakter.",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.FLOAT,
        validate: {
          isMoreThanFive(value) {
            if (value > 10) {
              throw new Error("Maksimal nilai rating 10");
            }
          },
        },
      },
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
      name: "Movie",
    }
  );
  return Movie;
};
