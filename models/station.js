"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    static associate(models) {
      Station.hasMany(models.Area);
    }

    static findByName(name) {
      return Station.findOne({
        where: {
          name: {
            [Op.iLike]: name,
          },
        },
      });
    }
  }

  Station.init(
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Kode sudah dipakai" },
        validate: {
          notEmpty: { msg: "Kode harus diisi" },
          notNull: { msg: "Kode harus diisi" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Nama harus diisi" },
          notNull: { msg: "Nama harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "Station",
      timestamps: false,
    }
  );

  return Station;
};
