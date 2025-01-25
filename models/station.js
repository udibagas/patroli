"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    static associate(models) {
      Station.hasMany(models.Area);
      Station.belongsTo(models.Site);
    }

    static findByName(name, SiteId) {
      const options = {
        where: {
          name: {
            [Op.iLike]: `${name}%`,
          },
        },
      };

      if (SiteId) {
        options.where.SiteId = SiteId;
      }

      return Station.findOne(options);
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
      SiteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Site harus diisi" },
          notNull: { msg: "Site harus diisi" },
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
