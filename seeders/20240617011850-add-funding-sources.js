"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const date = new Date();
    return queryInterface.bulkInsert("FundingSources", [
      { name: "NDIS", createdAt: date, updatedAt: date },
      { name: "HCP", createdAt: date, updatedAt: date },
      { name: "CHSP", createdAt: date, updatedAt: date },
      { name: "DVA", createdAt: date, updatedAt: date },
      { name: "HACC", createdAt: date, updatedAt: date },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("FundingSources", null, {});
  },
};
