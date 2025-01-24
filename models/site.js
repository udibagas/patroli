"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Site extends Model {
    static associate(models) {
      Site.hasMany(models.Station);
      Site.hasHook(models.Inspection);
      Site.hasHook(models.InspectionImage);
      Site.hasHook(models.User);
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
