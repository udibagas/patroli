"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    static associate(models) {
      Area.belongsTo(models.Station);
    }
  }

  Area.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama harus diisi" },
          notEmpty: { msg: "Nama harus diisi" },
        },
      },
      StationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Station harus diisi" },
          notEmpty: { msg: "Station harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "Area",
      timestamps: false,
    }
  );

  return Area;
};
