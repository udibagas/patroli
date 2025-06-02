"use strict";
const { hashSync } = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = [
      {
        Nama: "Nawolo Prasetyo",
        Nik: "199209002",
      },
      {
        Nama: "Kuat Purwanto",
        Nik: "199910010",
      },
      {
        Nama: "Maryanto",
        Nik: "199912048",
      },
      {
        Nama: "Hardi Prajoyo",
        Nik: "20220234U",
      },
      {
        Nama: "Tisdy Fayyadh",
        Nik: "201809296",
      },
      {
        Nama: "M.Maulana",
        Nik: "202107227",
      },
      {
        Nama: "Novant Prabowo",
        Nik: "202312267",
      },
      {
        Nama: "Heru Susanto",
        Nik: "200110113",
      },
      {
        Nama: "Adi Ardiansyah",
        Nik: "202206040",
      },
      {
        Nama: "Hariyono",
        Nik: "200502130",
      },
      {
        Nama: "M.Wahyudi",
        Nik: "200205004",
      },
      {
        Nama: "Riyan Ismawan",
        Nik: "202211101",
      },
      {
        Nama: "Supriyanto",
        Nik: "199911002",
      },
      {
        Nama: "Agus Anggoro",
        Nik: "200604124",
      },
      {
        Nama: "Gunawan W",
        Nik: "201907327",
      },
      {
        Nama: "Luhadi",
        Nik: "199911004",
      },
      {
        Nama: "David Putra",
        Nik: "201707182",
      },
      {
        Nama: "Adiat Nugroho",
        Nik: "201902022",
      },
      {
        Nama: "Mulyadi",
        Nik: "201907328",
      },
      {
        Nama: "Ari Prabowo",
        Nik: "201908021",
      },
      {
        Nama: "Ferry Kurniawan",
        Nik: "202209164",
      },
      {
        Nama: "Rendi Arga S",
        Nik: "20230205S",
      },
      {
        Nama: "Agung Wibowo",
        Nik: "2024081S4",
      },
      {
        Nama: "Surya Wijaya",
        Nik: "20240613Q",
      },
    ].map((user) => {
      return {
        name: user.Nama,
        password: hashSync(user.Nik, 10),
        role: "user",
        SiteId: 1,
      };
    });

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
