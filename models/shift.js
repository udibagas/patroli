"use strict";
const { Model, QueryTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static async getShift() {
      const time = new Date()
        .toLocaleString("id-ID", { timeStyle: "short" })
        .replace(".", ":");

      const records = await sequelize.query(
        `SELECT "name" FROM "Shifts" WHERE ? BETWEEN "start" AND "end"`,
        {
          replacements: [time],
          type: QueryTypes.SELECT,
        }
      );

      return records.length > 0 ? records[0].name : "-";
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
