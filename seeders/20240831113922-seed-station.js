"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        SiteId: 1,
        code: "1",
        name: "Pos Induk dan sekitarnya",
        areas: ["Pos Induk dan sekitarnya", "Office", "Basement", "Poliklinik"],
      },
      {
        SiteId: 1,
        code: "2",
        name: "Conference room",
        areas: ["Conference room", "Dress 1"],
      },
      {
        SiteId: 1,
        code: "3",
        name: "Masjid dan sekitarnya",
        areas: ["Masjid", "Area sebelah barat", "Depan Shirt"],
      },
      {
        SiteId: 1,
        code: "4",
        name: "Area timur dan belakang shirt",
        areas: [
          "Area timur",
          "Belakang shirt",
          "Gudang aval",
          "Tukang kayu",
          "Store fabric",
          "Office utility dan genset",
        ],
      },
      {
        SiteId: 1,
        code: "5",
        name: "Store accessories",
        areas: [
          "Store accessories",
          "Rumah pompa",
          "Lorong samping Dress 1 - Store Fabric",
          "Office lama",
        ],
      },
      {
        SiteId: 1,
        code: "6",
        name: "Dress 2 dan sekitarnya",
        areas: ["Dress 2 dan sekitarnya", "Kantin"],
      },
    ];

    const result = await queryInterface.bulkInsert(
      "Stations",
      data.map(({ areas, ...data }) => data),
      { returning: true }
    );

    for (let r of result) {
      const areas = data
        .find((el) => el.code == r.code)
        .areas.map((el) => ({ StationId: r.id, name: el }));
      await queryInterface.bulkInsert("Areas", areas);
    }

    return result;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Stations", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
