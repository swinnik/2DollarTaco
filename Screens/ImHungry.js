import React, { useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Swiper from "react-native-swiper";
import { Card, Button } from "react-native-elements";
import { VendorContext } from "../App";

const ImHungry = ({ navigation }) => {
  const { vendors } = useContext(VendorContext);
  console.log(vendors);

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    console.log("first");

    Linking.openURL(url).catch(() => {
      console.log("Error opening Google Maps");
    });
  };

  const navigateHandler = (name) => () => {
    navigation.navigate(name);
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false} // Disable looping of cards
        showsButtons={false} // Hide navigation buttons
      >
        {vendors.map((vendor, index) => (
          <View style={styles.cardContainer} key={index}>
            <Card containerStyle={styles.card}>
              <View style={styles.touchableCard} key={vendor.name}>
                <Card.Title onPress={navigateHandler("VendorDetails")}>
                  {vendor.name}
                </Card.Title>
                <Card.Divider />
                <View style={styles.bottom}>
                  <Text>You gotta try their {vendor.protein}!!</Text>
                  <ScrollView style={styles.scrollReviews}>
                    {vendor.reviews &&
                      vendor.reviews.map((review, index) => (
                        <Text key={index}>{review}</Text>
                      ))}
                  </ScrollView>
                  <Button
                    title="Take me to my Taco!"
                    style={styles.tacoButton}
                    onPress={() =>
                      openGoogleMaps(
                        vendor.location.latitude,
                        vendor.location.longitude
                      )
                    }
                  />
                </View>
              </View>
            </Card>
          </View>
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
  touchableCard: {
    height: "100%",
    display: "flex",
  },
  scrollReviews: {
    height: "50%",
    width: "100%",
    marginVertical: 20,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    padding: 10,
  },
  card: {
    borderRadius: 5,
    height: "40%",
    display: "flex",
    maxWidth: "80%",
  },
  bottom: {
    // marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    height: "80%",
  },
  tacoButton: {
    width: "100%",
    justifySelf: "flex-end",
  },
});

export default ImHungry;
