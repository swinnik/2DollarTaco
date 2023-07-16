import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

const Loading = ({ navigation }) => {
  const [city, setCity] = useState("");
  const [initialRegion, setInitialRegion] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;
          const addressResult = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          //   if (addressResult.length > 0) {
          let { postalCode, city } = addressResult[0];
          // setCity(city);
          //   }
          const region = {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setInitialRegion(region);
          setMarkerLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          });
          navigation.navigate("Home", {
            latitude: region.latitude,
            longitude: region.longitude,
            city: city,
            // postalCode: postalCode,
            initialRegion: region,
          });
        } else {
          console.log("Location permission not granted");
        }
      } catch (error) {
        console.log("Error getting current location:", error);
      }
    })();
  }, []);
  return (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default Loading;
