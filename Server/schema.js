const pool = require("./db");

// Create the vendors and reviews tables
const createTables = async () => {
  try {
    const dropVendorsTableQuery = `DROP TABLE IF EXISTS vendors`;
    const createVendorsTableQuery = `
      CREATE TABLE vendors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        latitude NUMERIC NOT NULL,
        longitude NUMERIC NOT NULL,
        protein VARCHAR(255) NOT NULL,
        price NUMERIC
      )
    `;

    const dropReviewsTableQuery = `DROP TABLE IF EXISTS reviews`;
    const createReviewsTableQuery = `
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        vendor_id INTEGER REFERENCES vendors(id),
        review TEXT NOT NULL,
        points INTEGER
      )
    `;

    await pool.query(dropReviewsTableQuery);
    await pool.query(dropVendorsTableQuery);
    await pool.query(createVendorsTableQuery);
    await pool.query(createReviewsTableQuery);

    console.log("Vendors and reviews tables created successfully");

    // Insert initial data
    await pool.query(`
      INSERT INTO vendors (name, latitude, longitude, protein, price)
      VALUES
        ('Sean''s Taco Truck', 37.7749, -122.4194, 'Carne Asada', 2.57),
        ('Elizabeths''s Taco Truck', 34.7749, -128.4194, 'Buche', 2.5);
      
      INSERT INTO reviews (vendor_id, review, points)
      VALUES
        (1, 'I really liked this taco', 5),
        (1, 'What can I say, this taco is awesome!', 4),
        (1, 'I would eat this taco again', 4),
        (2, 'This is my favorite taco', 5),
        (2, 'I would eat this taco a million times', 4),
        (2, 'I would eat this taco again', 4);
    `);

    console.log("Initial data inserted successfully");
  } catch (error) {
    console.error("Error creating vendors and reviews tables:", error);
  }
};

// Call the function to create tables and insert initial data
createTables();
