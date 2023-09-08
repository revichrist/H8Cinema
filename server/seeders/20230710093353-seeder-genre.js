"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fs = require("fs");
    const rawData = JSON.parse(fs.readFileSync("./data/genre.json", "utf-8"));

    const data = rawData.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();

      return el;
    });

    await queryInterface.bulkInsert("Genres", data, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Genres", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
