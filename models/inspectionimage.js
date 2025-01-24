"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InspectionImage extends Model {
    static associate(models) {
      InspectionImage.belongsTo(models.Inspection);
      InspectionImage.belongsTo(models.Site);
    }
  }

  InspectionImage.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama harus diisi" },
          notEmpty: { msg: "Nama harus diisi" },
        },
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Path harus diisi" },
          notEmpty: { msg: "Path harus diisi" },
        },
      },
      InspectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Inspeksi harus diisi" },
          notNull: { msg: "Inspeksi harus diisi" },
        },
      },
      SiteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Site harus diisi" },
          notNull: { msg: "Site harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "InspectionImage",
      timestamps: false,
    }
  );

  return InspectionImage;
};
