"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Site extends Model {
    static associate(models) {
      Site.hasMany(models.Station);
    }
  }

  Site.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Site",
      timestamps: false,
    }
  );

  return Site;
};
