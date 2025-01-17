"use strict";
const { Model, QueryTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static async getCurrentShift() {
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

      return records.length > 0 ? records[0] : null;
    }

    static findByName(name) {
      return Shift.findOne({ where: { name } });
    }

    async getEarlyStart() {
      const data = await Shift.findOne({
        attributes: ["start"],
        where: { name: this.name },
        order: [["start", "ASC"]],
      });

      if (!data) return "-";
      return data.start;
    }

    async getLateEnd() {
      const data = await Shift.findOne({
        attributes: ["end"],
        where: { name: this.name },
        order: [["end", "DESC"]],
      });

      if (!data) return "-";
      return data.end;
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
      nextDay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
