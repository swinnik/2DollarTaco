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
import { VendorContext } from "../VendorContext";

const ImHungry = ({ navigation }) => {
  const { vendors } = useContext(VendorContext);

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url).catch(() => {
      console.log("Error opening Google Maps");
    });
  };

  const navigateHandler = (name, vendor) => () => {
    navigation.navigate(name, { vendor });
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
                <Card.Title
                  onPress={() => navigateHandler("VendorDetails", vendor)}
                >
                  {vendor.name}
                </Card.Title>
                <Card.Divider />
                <View style={styles.bottom}>
                  <Text>You gotta try their {vendor.protein}!</Text>
                  <Text>It only costs {vendor.price}!</Text>
                  <View style={styles.scrollCurtain}>
                    <ScrollView style={styles.scrollReviews}>
                      {vendor.reviews &&
                        vendor.reviews.map((review, index) => (
                          <Text key={index}>
                            {review.length ? review : "no reviews yet!"}
                          </Text>
                        ))}
                    </ScrollView>
                    <Text style={styles.writeAReview}>Write A Review!</Text>
                  </View>
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
  scrollCurtain: {
    // backgroundColor: "blue",
  },
  writeAReview: {
    position: "relative",
    color: "blue",
    bottom: 40,
    alignSelf: "center",
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
