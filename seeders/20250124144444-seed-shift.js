"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Shifts", [
      {
        name: "SHIFT 1",
        start: "06:00",
        end: "13:59",
        nextDay: false,
      },
      {
        name: "SHIFT 2",
        start: "14:00",
        end: "21:59",
        nextDay: false,
      },
      {
        name: "SHIFT 3",
        start: "22:00",
        end: "23:59",
        nextDay: false,
      },
      {
        name: "SHIFT 3",
        start: "00:00",
        end: "05:59",
        nextDay: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Shifts");
  },
};
