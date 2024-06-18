const { Sequelize } = require("sequelize");
const dbConfig = require("./config/config.json").development;

const sequelize = new Sequelize(dbConfig);

async function listTables() {
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    console.log("Tables in the database:");
    results.forEach((row) => console.log(row.name));
  } catch (error) {
    console.error("Error listing tables:", error);
  }
}

async function listFundingSource() {
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM FundingSource"
    );
    console.log("Funding Source:");
    results.forEach((row) => console.log(row.name));
  } catch (error) {
    console.error("Error retrieving funding source:", error);
  }
}

async function dropTable(tableName) {
  try {
    await sequelize.query(`DROP TABLE IF EXISTS ${tableName}`);
    console.log(`Table ${tableName} has been dropped.`);
  } catch (error) {
    console.error(`Error dropping table ${tableName}:`, error);
  } finally {
    await sequelize.close();
  }
}

// listTables();
// listFundingSource();
// dropTable("Client");
