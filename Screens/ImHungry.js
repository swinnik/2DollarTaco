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
import axios from "axios";
import { LocationContext } from "../LocationContext";

const ImHungry = ({ navigation }) => {
  const { city, initialRegion } = useContext(LocationContext);
  const [vendors, setVendors] = useState([]);
  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState("");
  const [currentVendor, setCurrentVendor] = useState(null);
  const textAreaRef = useRef();
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, [fetch]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180; // Latitude difference in radians
    const dLon = ((lon2 - lon1) * Math.PI) / 180; // Longitude difference in radians

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get(
        `http://192.168.86.112:3000/api/vendors?city=${city}`
      );
      const { data } = response;
      console.log(data, "data");
      const sortedVendors = data.sort((vendorA, vendorB) => {
        const distanceA = calculateDistance(
          initialRegion.latitude,
          initialRegion.longitude,
          vendorA.latitude,
          vendorA.longitude
        );
        const distanceB = calculateDistance(
          initialRegion.latitude,
          initialRegion.longitude,
          vendorB.latitude,
          vendorB.longitude
        );
        return distanceA - distanceB;
      });

      setVendors(data);
    } catch (error) {
      console.log("Error fetching vendors:", error);
    }
  };

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
    console.log(
      "submitting review to vendor ID:",
      currentVendor,
      "review: ",
      review
    );
    toggleOverlay();
    axios
      .post(`http://localhost:3000/api/vendors/${currentVendor.id}/reviews`, {
        review,
      })
      .then((res) => {
        setFetch(!fetch);
        setReview("");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    Linking.openURL(url).catch(() => {
      console.log("Error opening Google Maps");
    });
  };

  const openReview = (vendor) => {
    setCurrentVendor(vendor);
    toggleOverlay();
  };

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center" }}>
        You're in {city}! {initialRegion.latitude}, {initialRegion.longitude}
      </Text>
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
            value={review}
            ref={textAreaRef}
            returnKeyType="done"
            onSubmitEditing={submitReview}
          />
          <Button onPress={submitReview} title="Submit Review" />
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
                  <Text>Located nearby in {vendor.city}!</Text>
                  <View style={styles.scrollViewCurtain}>
                    <ScrollView style={styles.scrollReviews}>
                      {vendor.reviews.length > 1 ? (
                        vendor.reviews.map((review, index) => (
                          <Text key={index}>{`* ${review.review}`}</Text>
                        ))
                      ) : (
                        <Text> No reviews yet! </Text>
                      )}
                    </ScrollView>
                    <TouchableOpacity
                      onPress={() => {
                        openReview(vendor);
                      }}
                    >
                      <Text style={styles.scrollViewFooter}>
                        Leave a review?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Button
                    title="Take me to my Taco!"
                    style={styles.tacoButton}
                    onPress={() =>
                      setCurrentVendor(vendor.id) &&
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
  writeAReview: {
    position: "relative",
    color: "blue",
    bottom: 40,
    alignSelf: "center",
  },

  scrollReviews: {
    height: "50%",
    width: "100%",
    marginVertical: 10,
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
