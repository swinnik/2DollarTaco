import { View, Text } from "react-native";
// import { useRoute } from "@react-navigation/native";
import React from "react";

const VendorDetails = ({ route }) => {
  // const route = useRoute();
  console.log(route, "route route route");

  // const { vendor } = route.params;

  return (
    <View>
      {/* <Text>{vendor.name}</Text> */}
      <Text>protein</Text>
      {/* <Text>{reviews}</Text> */}
    </View>
  );
};

export default VendorDetails;
