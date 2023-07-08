const { Pool } = require("pg");

const pool = new Pool({
  user: "seanwinnik",
  role: "postgres",
  host: "localhost",
  database: "dollartaco",
  password: "postgres",
  port: 5432,
});

module.exports = pool;
