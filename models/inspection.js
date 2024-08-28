"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Inspection extends Model {
    static associate(models) {
      Inspection.hasMany(models.InspectionImage);
      Inspection.belongsTo(models.User, { as: "user", foreignKey: "UserId" });
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
        // allowNull: false,
        // validate: {
        //   notNull: { msg: "Shift harus diisi" },
        //   notEmpty: { msg: "Shift harus diisi" },
        // },
      },
      StationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Station harus diisi" },
          notEmpty: { msg: "Station harus diisi" },
        },
      },
      result: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Result harus diisi" },
          notEmpty: { msg: "Result harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "Inspection",
    }
  );

  Inspection.beforeCreate(async (instance) => {
    instance.shift = await sequelize.models.Shift.getShift();
  });

  return Inspection;
};
