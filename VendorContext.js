import React, { createContext, useState } from "react";

export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([
    {
      name: "Sean's Taco Truck",
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
      protein: "Carne Asada",
      price: 2.57,
      reviews: [
        "I really liked this taco",
        "What can I say, this taco is awesome!",
        "I would eat this taco again",
      ],
    },
    {
      name: "Elizabeths's Taco Truck",
      location: {
        latitude: 34.7749,
        longitude: -128.4194,
      },
      protein: "Buche",
      price: 2.5,
      reviews: [
        "This is my favorite taco",
        "I would eat this taco a million times",
        "I would eat this taco again",
      ],
    },
  ]);

  const addVendor = (vendor) => {
    setVendors((prevVendors) => [...prevVendors, vendor]);
  };

  const addReview = (vendorName, review) => {
    setVendors((prevVendors) => {
      const updatedVendors = [...prevVendors];
      const vendorIndex = updatedVendors.findIndex(
        (vendor) => vendor.name === vendorName
      );
      if (vendorIndex !== -1) {
        updatedVendors[vendorIndex].reviews.push(review);
      }
      return updatedVendors;
    });
  };

  return (
    <VendorContext.Provider value={{ vendors, addVendor, addReview }}>
      {children}
    </VendorContext.Provider>
  );
};
