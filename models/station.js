"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    static associate(models) {
      // define association here
    }
  }

  Station.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Station",
      timestamps: false,
    }
  );

  return Station;
};
