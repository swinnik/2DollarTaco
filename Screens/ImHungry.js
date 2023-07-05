import React, { useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { VendorContext } from "../App";

const ImHungry = () => {
  const { vendors } = useContext(VendorContext);
  console.log(vendors);

  return (
    <View>
      <Text>ImHungry</Text>
      {vendors.map((vendor) => (
        <View key={vendor.name}>
          <Text>{vendor.name}</Text>
          <Text>{vendor.protein} </Text>
          <Text>Latitude: {vendor.location.latitude}</Text>
          <Text>Longitude: {vendor.location.longitude}</Text>
        </View>
      ))}
    </View>
  );
};

export default ImHungry;
