const express = require("express");
const vendorsRouter = require("./Router");
require("dotenv").config();
// const pool = require("./db");

const app = express();

// Middleware
app.use(express.json());

// Mount the vendorsRouter at the '/api' route
app.use("/api", vendorsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
