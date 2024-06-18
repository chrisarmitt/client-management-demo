"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("FundingSources", [
      { name: "NDIS", createdAt: new Date(), updatedAt: new Date() },
      { name: "HCP", createdAt: new Date(), updatedAt: new Date() },
      { name: "CHSP", createdAt: new Date(), updatedAt: new Date() },
      { name: "DVA", createdAt: new Date(), updatedAt: new Date() },
      { name: "HACC", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.bulkDelete("FundingSources", null, {});
  },
};
