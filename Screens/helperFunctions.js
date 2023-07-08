import { useState } from "react";

const [vendors, setVendors] = useState([]);

const fetchVendors = async () => {
  try {
    const response = await axios.get("api/vendors");
    setVendors(response.data);
  } catch (error) {
    console.log("Error fetching vendors:", error);
  }
};

module.exports = { fetchVendors };
