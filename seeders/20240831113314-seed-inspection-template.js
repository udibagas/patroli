"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      "Aktifitas nihil",
      "Tidak ada hal - hal yang mencurigakan",
      "Situasi aman",
      "Penerangan malam berfungsi baik",
    ].map((el) => ({ result: el }));

    await queryInterface.bulkInsert("InspectionTemplates", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("InspectionTemplates", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
