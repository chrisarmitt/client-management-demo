const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { body, validationResult } = require("express-validator");
const db = require("./models");
const { Client, FundingSource } = db;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// get all clients
app.get("/clients", async (_req, res) => {
  const clients = await Client.findAll({
    include: [{ model: FundingSource, as: "fundingSource" }],
  });
  res.json(clients);
});

// get client by id
app.get("/client/:id", async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ error: "Client record not found" });
  }
});

// create client
app.post(
  "/client",
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
app.put("/client/:id", async (req, res) => {
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
app.delete("/client/:id", async (req, res) => {
  const client = await Client.findByPk(req.params.id);
  if (client) {
    await Client.destroy({ where: { id: req.params.id } });
    res.status(204).json({ success: true });
  } else {
    res.status(404).json({ error: "Client record not found" });
  }
});

// get all funding sources
app.get("/funding-sources", async (_req, res) => {
  const fundingSources = await FundingSource.findAll();
  res.json(fundingSources);
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
