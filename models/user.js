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
      const { id, name, email, role } = this;
      return sign({ id, name, email, role }, process.env.JWT_SECRET);
    }

    toJSON() {
      const { id, name, email, role } = this;
      return { id, name, email, role };
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Nama harus diisi" },
          notEmpty: { msg: "Nama harus diisi" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email sudah dipakai" },
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
      timestamps: false,
    }
  );

  User.beforeSave((instance) => {
    if (instance.password) {
      instance.password = hashSync(instance.password, 10);
    }
  });

  return User;
};
