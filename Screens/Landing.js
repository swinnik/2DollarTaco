import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from "@rneui/themed";
import React from "react";
import TacoLogo from "../assets/TacoLogo.png";

export default function Home({ navigation, route }) {
  const { city, latitude, longitude, initialRegion } = route.params;
  const pressHandler = (name) => {
    navigation.navigate(name, { city, latitude, longitude, initialRegion });
  };
  console.log(route);

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center" }}>{city}</Text>
      <Button
        style={styles.wideButton}
        title="New Spot?"
        onPress={() => pressHandler("NewSpot")}
      />
      <Image source={TacoLogo} alt="Taco Logo" style={styles.image} />
      <Button
        style={styles.wideButton}
        title="I'm Hungry!!"
        onPress={() => pressHandler("ImHungry")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  wideButton: {
    width: "100%",
  },
  image: {
    alignSelf: "center",
  },
});
