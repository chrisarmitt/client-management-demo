const express = require("express");
const { body, validationResult } = require("express-validator");
const { Client, FundingSource } = require("../models");

const router = express.Router();

// get all clients
router.get("/", async (_req, res) => {
  const clients = await Client.findAll({
    include: [{ model: FundingSource, as: "fundingSource" }],
  });
  res.json(clients);
});

// get client by id
router.get("/:id", async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ error: "Client record not found" });
  }
});

// create client
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name required"),
    body("dob").isDate().withMessage("Dob is invalid"),
    body("primary_language")
      .notEmpty()
      .withMessage("Primary language required"),
    body("funding_source").isInt().withMessage("Funding source is invalid"),
  ],
  async (req, res) => {
    const errorList = validationResult(req);
    if (!errorList.isEmpty()) {
      return res.status(400).json({ errorList: errorList.array() });
    }

    try {
      const client = await Client.create(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ error: `Client creation error: ${error}` });
    }
  }
);

// update client
router.put("/:id", async (req, res) => {
  const [updated] = await Client.update(req.body, {
    where: { id: req.params.id },
  });
  if (updated) {
    const updatedClient = await Client.findByPk(req.params.id);
    res.json(updatedClient);
  } else {
    res.status(404).json({ error: "Client record not found" });
  }
});

// delete client
router.delete("/:id", async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (client) {
    await Client.destroy({ where: { id: req.params.id } });
    res.status(204).json({ success: true });
  } else {
    res.status(404).json({ error: "Client record not found" });
  }
});

module.exports = router;
