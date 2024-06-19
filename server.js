const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const clientRouter = require("./routes/clientRouter");
const fundingSourceRouter = require("./routes/fundingSourceRouter");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/client", clientRouter);
app.use("/funding-sources", fundingSourceRouter);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
