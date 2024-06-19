const express = require("express");
const { FundingSource } = require("../models");

const router = express.Router();

router.get("/", async (_req, res) => {
  const fundingSources = await FundingSource.findAll();
  res.json(fundingSources);
});

module.exports = router;
