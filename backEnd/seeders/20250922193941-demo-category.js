"use strict";

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

    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Work",
          color: "#3B82F6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Personal",
          color: "#59AC77",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Shopping",
          color: "#FFE100",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bermain",
          color: "#6B3F69",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Categories", null, {});
  },
};
