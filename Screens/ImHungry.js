import React, { useContext, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Swiper from "react-native-swiper";
import { Card, Button } from "react-native-elements";
import { Overlay } from "@rneui/themed";
import { VendorContext } from "../App";

const ImHungry = ({ navigation }) => {
  const { vendors, addReview } = useContext(VendorContext);
  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState("");
  const [currentVendor, setCurrentVendor] = useState(null);
  const textAreaRef = useRef();

  useEffect(() => {
    if (visible) {
      textAreaRef.current.focus();
    }
  }, [visible]);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const openOverlay = (vendor) => {
    toggleOverlay();
    setCurrentVendor(vendor);
  };

  const submitReview = () => {
    console.log("submitting review");
    addReview(currentVendor, review);
    toggleOverlay();
  };

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url).catch(() => {
      console.log("Error opening Google Maps");
    });
  };

  return (
    <View style={styles.container}>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <View style={styles.overlayView}>
          <Text style={styles.overlayText}>Write A Review</Text>
          <TextInput
            containerStyle={styles.overlayTextArea}
            onChangeText={setReview}
            ref={textAreaRef}
            returnKeyType="done"
            onSubmitEditing={submitReview}
          />
          {/* <Button onPress={toggleOverlay}>Submit Review</Button>x */}
        </View>
      </Overlay>
      <Swiper
        loop={false} // Disable looping of cards
        showsButtons={false} // Hide navigation buttons
      >
        {vendors.map((vendor, index) => (
          <View style={styles.cardContainer} key={index}>
            <Card containerStyle={styles.card}>
              <View style={styles.touchableCard} key={vendor.name}>
                <Card.Title>{vendor.name}</Card.Title>
                <Card.Divider />
                <View style={styles.bottom}>
                  <Text>You gotta try their {vendor.protein}!</Text>
                  <Text>It only costs {vendor.price}!</Text>
                  <View style={styles.scrollViewCurtain}>
                    <ScrollView style={styles.scrollReviews}>
                      {vendor.reviews &&
                        vendor.reviews.map((review, index) => (
                          <Text key={index}>
                            {review.length ? "* " + review : "no reviews yet!"}
                          </Text>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={toggleOverlay}>
                      <Text style={styles.scrollViewFooter}>
                        Leave a review?
                      </Text>
                    </TouchableOpacity>
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
  overlayView: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-around",fasdf
    marginBottom: 16,
    width: 300,
    height: 300,
    position: "relative",
    top: 10,
  },
  overlayText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  overlayTextArea: {
    width: "80%", // Adjust the width as needed
    height: 150, // Adjust the height as needed
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    // marginTop: 100,
    marginBottom: 16,
  },

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
  scrollViewCurtain: {
    height: "fit-content",
    width: "fit-content",
  },
  scrollReviews: {
    height: "50%",
    width: "100%",
    marginVertical: 20,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    padding: 10,
  },
  scrollViewFooter: {
    textAlign: "center",
    fontStyle: "italic",
    bottom: 40,
  },
  card: {
    borderRadius: 5,
    height: "40%",
    width: "100%",
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
