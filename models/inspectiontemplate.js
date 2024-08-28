"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InspectionTemplate extends Model {}

  InspectionTemplate.init(
    {
      result: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Result harus diisi" },
          notEmpty: { msg: "Result harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "InspectionTemplate",
      timestamps: false,
    }
  );

  return InspectionTemplate;
};
