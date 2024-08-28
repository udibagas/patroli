"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InspectionImage extends Model {
    static associate(models) {
      InspectionImage.belongsTo(models.Inspection);
    }
  }

  InspectionImage.init(
    {
      name: DataTypes.STRING,
      path: DataTypes.STRING,
      InspectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Inspeksi harus diisi" },
          notNull: { msg: "Inspeksi harus diisi" },
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
