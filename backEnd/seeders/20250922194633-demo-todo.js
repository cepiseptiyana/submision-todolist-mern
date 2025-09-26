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
        title: "bekerja",
        description: "persiapan materi dan tugas.",
        completed: true,
        priority: "high",
        due_date: new Date("2025-09-30"),
        category_id: 1, // id kategori Belajar
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: "makan malam",
        description: "kumpul bareng teman dan makan bersama.",
        completed: false,
        priority: "medium",
        due_date: new Date("2025-10-05"),
        category_id: 2, // id kategori
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        title: "Belajar coding",
        description: "belajar nodejs, mysql, dan ORM",
        completed: true,
        priority: "medium",
        due_date: new Date("2025-10-10"),
        category_id: 3, // id kategori
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Bermain",
        description: "bermain di taman bersam adik.",
        completed: true,
        priority: "medium",
        due_date: new Date("2025-10-10"),
        category_id: 4, // id kategori
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
