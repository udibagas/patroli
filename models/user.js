"use strict";
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Inspection, {
        as: "inspections",
        foreignKey: "UserId",
      });

      User.belongsTo(models.Site);
    }

    verify(password) {
      return compareSync(password, this.password);
    }

    generateToken() {
      const { id, name, role, SiteId } = this;
      return sign({ id, name, role, SiteId }, process.env.JWT_SECRET);
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: { msg: "Nama sudah dipakai" },
        allowNull: false,
        validate: {
          notNull: { msg: "Nama harus diisi" },
          notEmpty: { msg: "Nama harus diisi" },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          hasPassword(value) {
            if (!this.id && !value) {
              throw new Error("Password harus diisi");
            }
          },
        },
      },
      role: DataTypes.STRING,
      SiteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Site harus diisi" },
          notEmpty: { msg: "Site harus diisi" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
    }
  );

  User.beforeSave((instance) => {
    if (instance.password) {
      instance.password = hashSync(instance.password, 10);
    }
  });

  return User;
};
