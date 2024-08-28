"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static associate(models) {
      // define association here
    }
  }

  Shift.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama harus diisi" },
          notEmpty: { msg: "Nama harus diisi" },
        },
      },
      start: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Start harus diisi" },
          notEmpty: { msg: "Start harus diisi" },
        },
      },
      end: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "End harus diisi" },
          notEmpty: { msg: "End harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "Shift",
      timestamps: false,
    }
  );

  return Shift;
};
