"use strict";

const { hashSync } = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Super Admin",
        password: hashSync("superadmin123", 10),
        role: "superadmin",
      },
      {
        name: "Admin",
        password: hashSync("admin123", 10),
        role: "admin",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
