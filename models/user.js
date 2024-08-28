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
    }

    verify(password) {
      return compareSync(password, this.password);
    }

    generateToken() {
      const { id, email, role } = this;
      return sign({ id, email, role }, process.env.JWT_SECRET);
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Email harus diisi" },
          notEmpty: { msg: "Email harus diisi" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password harus diisi" },
          notEmpty: { msg: "Password harus diisi" },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeSave((instance) => {
    if (instance.password) {
      const salt = genSaltSync(10);
      instance.password = hashSync(instance.password, salt);
    }
  });

  return User;
};
