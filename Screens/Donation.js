import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

export default function Donation() {
  const openLink = async (url) => {
    // Check if the device supports deep linking
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the link using the device's default browser
      await Linking.openURL(url);
    } else {
      console.log(`Cannot open URL: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Generous Supporters like YOU!</Text>
      <TouchableOpacity
        onPress={() => openLink("https://www.paypal.com/paypalme/SeanWinnik")}
      >
        <Text style={styles.donation}>Donate Here!</Text>
      </TouchableOpacity>
      <Text>To keep 2$ Taco running!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  donation: {
    color: "blue",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
