"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Inspection extends Model {
    static associate(models) {
      Inspection.belongsTo(models.User);
      Inspection.belongsTo(models.Station);
      Inspection.hasMany(models.InspectionImage);
    }

    static report({ shift, UserId, reportDate }) {
      return this.findAll({
        where: { shift, UserId, reportDate },
        include: [
          {
            model: sequelize.models.User,
            attributes: ["name"],
          },
          {
            model: sequelize.models.Station,
            attributes: ["name", "code"],
            include: {
              model: sequelize.models.Area,
              attributes: ["name"],
            },
          },
          {
            model: sequelize.models.InspectionImage,
            attributes: ["path"],
          },
        ],
      });
    }
  }

  Inspection.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User harus diisi" },
          notEmpty: { msg: "User harus diisi" },
        },
      },
      shift: {
        type: DataTypes.STRING,
      },
      reportDate: {
        type: DataTypes.DATEONLY,
      },
      StationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Lokasi harus diisi" },
          notEmpty: { msg: "Lokasi harus diisi" },
        },
      },
      result: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Keterangan harus diisi" },
          notEmpty: { msg: "Keterangan harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "Inspection",
    }
  );

  Inspection.beforeCreate(async (instance) => {
    instance.shift = await sequelize.models.Shift.getCurrentShift();
    instance.reportDate = new Date();
  });

  return Inspection;
};
