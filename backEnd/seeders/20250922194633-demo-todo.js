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

    await queryInterface.bulkInsert("Todos", [
      {
        title: "Belajar Node.js",
        description: "Pelajari dasar Node.js dan HTTP module",
        completed: true,
        priority: "high",
        due_date: new Date("2025-09-30"),
        category_id: 1, // id kategori Belajar
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: "Belajar Sequelize",
        description: "Coba migration, model, dan seeder",
        completed: false,
        priority: "medium",
        due_date: new Date("2025-10-05"),
        category_id: 2, // id kategori Pekerjaan
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: "Belajar coding",
        description: "Coba nodejs, mysql, dan ORM",
        completed: true,
        priority: "medium",
        due_date: new Date("2025-10-10"),
        category_id: 3, // id kategori Pekerjaan
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Todos", null, {});
  },
};
