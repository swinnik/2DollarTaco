const express = require("express");

const pool = require("./db");

const router = express.Router();

router.get("/vendors", async (req, res) => {
  console.log(req, "GET req");

  try {
    const vendors = await pool.query("SELECT * FROM vendors");
    const vendorIds = vendors.rows.map((vendor) => vendor.id);

    const reviews = await pool.query(
      "SELECT * FROM reviews WHERE vendor_id = ANY($1::integer[])",
      [vendorIds]
    );

    const vendorsWithReviews = vendors.rows.map((vendor) => {
      const vendorReviews = reviews.rows.filter(
        (review) => review.vendor_id === vendor.id
      );
      return {
        ...vendor,
        reviews: vendorReviews,
      };
    });

    res.json(vendorsWithReviews);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/vendors", async (req, res) => {
  console.log(req, "reqfasdfasf");
  const { name, latitude, longitude, protein, price } = req.body;
  try {
    const newVendor = await pool.query(
      "INSERT INTO vendors (name, latitude, longitude, protein, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, latitude, longitude, protein, price]
    );
    res.json(newVendor.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/vendors/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { review, points } = req.body;
  try {
    const newReview = await pool.query(
      "INSERT INTO reviews (vendor_id, review, points) VALUES ($1, $2, $3) RETURNING *",
      [id, review, points]
    );
    res.json(newReview.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
