import React, { useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import { Card } from "react-native-elements";
import { VendorContext } from "../App";

const ImHungry = () => {
  const { vendors } = useContext(VendorContext);
  console.log(vendors);

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    console.log("first");

    Linking.openURL(url).catch(() => {
      console.log("Error opening Google Maps");
    });
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false} // Disable looping of cards
        showsButtons={false} // Hide navigation buttons
      >
        {vendors.map((vendor) => (
          <TouchableOpacity
            key={vendor.name}
            style={styles.cardContainer}
            onPress={() =>
              openGoogleMaps(
                vendor.location.latitude,
                vendor.location.longitude
              )
            }
          >
            <Card>
              <Card.Title>{vendor.name}</Card.Title>
              <Card.Divider />
              <Text>{vendor.protein}</Text>
              <Text>Latitude: {vendor.location.latitude}</Text>
              <Text>Longitude: {vendor.location.longitude}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default ImHungry;
