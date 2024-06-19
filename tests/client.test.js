const request = require("supertest");
const app = require("../server");
const { sequelize, Client, FundingSource } = require("../models");

const testUser = {
  name: "AUTOMATION TEST",
  dob: "1990-01-01",
  primary_language: "English",
  secondary_language: "Spanish",
  funding_source: 1,
};

const malformedUser = {
  name: "",
  dob: "notDate",
  primary_language: "",
  funding_source: "notInt",
};

beforeAll(async () => {
  console.log("Syncing database...");
  await sequelize.sync({ force: true });
  console.log("Database synced.");

  // Seed funding sources
  console.log("Seeding funding sources...");
  await FundingSource.bulkCreate([
    { id: 1, name: "NDIS" },
    { id: 2, name: "HCP" },
    { id: 3, name: "CHSP" },
    { id: 4, name: "DVA" },
    { id: 5, name: "HACC" },
  ]);
  console.log("Funding sources seeded.");
});

afterAll(async () => {
  console.log("Closing database connection...");
  await sequelize.close();
  console.log("Database connection closed.");
});

describe("Client API", () => {
  it("should create a new client", async () => {
    try {
      const response = await request(app).post("/client").send(testUser);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(testUser.name);
    } catch (error) {
      console.log("Error creating client:", error);
      throw error;
    }
  });

  it("should return 400 when data payload is malformed", async () => {
    try {
      const response = await request(app).post("/client").send(malformedUser);
      expect(response.status).toBe(400);
      expect(response.body.errorList).toBeDefined();
    } catch (error) {
      console.log("Error creating client with malformed data:", error);
      throw error;
    }
  });

  it("should fetch all clients", async () => {
    try {
      await Client.create(testUser);
      const response = await request(app).get("/client");
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    } catch (error) {
      console.log("Error getting all clients:", error);
      throw error;
    }
  });

  it("should fetch a client by id", async () => {
    try {
      const getClient = await Client.create({ ...testUser, name: "getById" });
      const response = await request(app).get(`/client/${getClient.id}`);
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("getById");
    } catch (error) {
      console.log("Error getting client by id:", error);
      throw error;
    }
  });

  it("should return 404 when trying to fetch a non-existent client", async () => {
    try {
      const response = await request(app).get("/client/99999");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Client record not found");
    } catch (error) {
      console.log("Error fetching non-existent client:", error);
      throw error;
    }
  });

  it("should update a client", async () => {
    try {
      const updateClient = await Client.create(testUser);
      const response = await request(app)
        .put(`/client/${updateClient.id}`)
        .send({ ...testUser, name: "Updated Name" });
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Updated Name");
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  });

  it("should return 404 when trying to update a non-existent client", async () => {
    try {
      const response = await request(app)
        .put("/client/99999")
        .send({ ...testUser, name: "Fake Client" });
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Client record not found");
    } catch (error) {
      console.log("Error updating non-existent client:", error);
      throw error;
    }
  });

  it("should delete a client", async () => {
    try {
      const deleteClient = await Client.create({
        name: "Delete Me",
        dob: new Date(),
        primary_language: "English",
        secondary_language: "",
        funding_source: 1,
      });
      const response = await request(app).delete(`/client/${deleteClient.id}`);
      expect(response.status).toBe(204);
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    }
  });

  it("should return 404 when trying to delete a non-existent client", async () => {
    try {
      const response = await request(app).delete("/client/99999");
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Client record not found");
    } catch (error) {
      console.error("Error deleting non-existent client:", error);
      throw error;
    }
  });
});
