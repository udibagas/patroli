"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Site extends Model {
    static associate(models) {
      Site.hasMany(models.Station);
      Site.hasMany(models.Inspection);
      Site.hasMany(models.InspectionImage);
      Site.hasMany(models.User);
    }
  }

  Site.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Kode sudah dipakai" },
        validate: {
          notNull: { msg: "Kode harus diisi" },
          notEmpty: { msg: "Kode harus diisi" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Nama sudah dipakai" },
        validate: {
          notNull: { msg: "Nama harus diisi" },
          notEmpty: { msg: "Nama harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "Site",
      timestamps: false,
    }
  );

  return Site;
};
