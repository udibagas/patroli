"use strict";

const { hashSync } = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin",
        email: "admin@mail.com",
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
