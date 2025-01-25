"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Inspection extends Model {
    static associate(models) {
      Inspection.belongsTo(models.User);
      Inspection.belongsTo(models.Station);
      Inspection.hasMany(models.InspectionImage);
      Inspection.belongsTo(models.Site);
    }

    static report({ SiteId, shift, reportDate }) {
      const options = {
        where: { shift, reportDate },
        order: [["createdAt", "asc"]],
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
      };

      if (SiteId) {
        options.where.SiteId = SiteId;
      }

      return this.findAll(options);
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
      SiteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Site harus diisi" },
          notEmpty: { msg: "Site harus diisi" },
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
    const shift = await sequelize.models.Shift.getCurrentShift();
    instance.shift = shift?.name || "-";
    instance.reportDate = shift?.nextDay
      ? new Date(new Date().setDate(new Date().getDate() - 1))
      : new Date();
  });

  return Inspection;
};
