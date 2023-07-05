import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./routes/homeStack";
import React, { createContext, useState } from "react";

export const VendorContext = createContext();

export default function App() {
  const [vendors, setVendors] = useState([
    {
      name: "Sean's Taco Truck",
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
      protein: "Carne Asada",
    },
    {
      name: "Elizabeths's Taco Truck",
      location: {
        latitude: 34.7749,
        longitude: -128.4194,
      },
      protein: "Buche",
    },
  ]);

  const addVendor = (vendor) => {
    setVendors((prevVendors) => [...prevVendors, vendor]);
  };
  return (
    <VendorContext.Provider value={{ vendors, addVendor }}>
      <Navigator />
    </VendorContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
