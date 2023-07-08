const express = require("express");
const vendorsRouter = require("./Router");
// const pool = require("./db");

const app = express();

// Middleware
app.use(express.json());

// Mount the vendorsRouter at the '/api' route
app.use("/api", vendorsRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
