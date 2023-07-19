import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import * as Location from "expo-location";
import TacoLogo from "../assets/TacoLogo.png";
import { LocationContext } from "../LocationContext";

const Loading = ({ navigation }) => {
  //   const [city, setCity] = useState("");
  //   const [initialRegion, setInitialRegion] = useState(null);
  const { setCity, setInitialRegion } = useContext(LocationContext);
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
          setCity(city);
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
          navigation.navigate("Home");
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
      {/* <Text>Loading</Text> */}
      <Image source={TacoLogo} alt="Taco Logo" style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    position: "absolute",
    top: 200,
  },
});

export default Loading;
