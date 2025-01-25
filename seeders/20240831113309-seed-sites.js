"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Sites", [
      {
        code: "01",
        name: "UNGARAN",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sites", {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
