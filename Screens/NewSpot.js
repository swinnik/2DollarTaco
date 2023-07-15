import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, Overlay } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { VendorContext } from "../VendorContext";
import axios from "axios";

const NewSpot = ({ navigation }) => {
  const { addVendor } = useContext(VendorContext);
  const [initialRegion, setInitialRegion] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [vendorName, setVendorName] = useState("");
  const [bestProtein, setBestProtein] = useState("");
  const [price, setPrice] = useState("");
  const [buttonTitle, setButtonTitle] = useState("Save Location");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [review, setReview] = useState("");
  const [city, setCity] = useState("");

  const vendorNameRef = useRef();
  const priceRef = useRef();
  const bestProteinRef = useRef();
  const textAreaRef = useRef();

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
          if (addressResult.length > 0) {
            const { postalCode, city } = addressResult[0];
            setCity(city);
          }
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
        } else {
          console.log("Location permission not granted");
        }
      } catch (error) {
        console.log("Error getting current location:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (
      attemptedSubmit &&
      vendorName !== "" &&
      bestProtein !== "" &&
      price !== "" &&
      markerLocation
    ) {
      setButtonTitle("Save Location");
    }
  }, [vendorName, bestProtein, markerLocation]);

  // const handleSaveLocation = async () => {
  //   try {
  //     const vendorResponse = await axios.post(
  //       "http://localhost:3000/api/vendors",
  //       {
  //         name: vendorName,
  //         city: city,
  //         latitude: markerLocation.latitude,
  //         longitude: markerLocation.longitude,
  //         protein: bestProtein,
  //         price: price,
  //       }
  //     );
  //     const vendorId = vendorResponse.data.id;
  //     const reviewResponse = await axios.post("/api/reviews", {
  //       review,
  //     });
  //     setVendorName("");
  //     setBestProtein("");
  //     setReview("");
  //     setPrice("");
  //     setCity("");
  //     setMarkerLocation(null);
  //     Keyboard.dismiss();
  //     navigation.navigate("Home");
  //   } catch (error) {
  //     navigation.navigate("Home");
  //     console.log("Error saving location:", error, "lammmeeeee");
  //   }
  // };

  const handleSaveLocation = () => {
    axios
      .post("http://localhost:3000/api/vendors", {
        name: vendorName,
        city: city,
        latitude: markerLocation.latitude,
        longitude: markerLocation.longitude,
        protein: bestProtein,
        price: price,
      })
      .then((vendorResponse) => {
        const vendorId = vendorResponse.data.id;
        return axios.post(
          `http://localhost:3000/api/vendors/${vendorId}/reviews`,
          { review }
        );
      })
      .then(() => {
        setVendorName("");
        setBestProtein("");
        setReview("");
        setPrice("");
        setCity("");
        setMarkerLocation(null);
        Keyboard.dismiss();
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Error saving location:", error, "lammmeeeee");
      });
  };

  useEffect(() => {
    if (visible) {
      textAreaRef.current.focus();
    }
  }, [visible]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const submitReview = () => {
    console.log("submitting review");
    toggleOverlay();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={(event) => {
          setMarkerLocation(event.nativeEvent.coordinate);
          Keyboard.dismiss();
        }}
      >
        {markerLocation && (
          <Marker coordinate={markerLocation} title="Current Location" />
        )}
      </MapView>

      <View style={styles.overlayContainer}>
        <Button title="Write a Review" onPress={toggleOverlay} />
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
              returnKeyType="next"
              onSubmitEditing={submitReview}
            />
            {/* <Button onPress={toggleOverlay}>Submit Review</Button>x */}
          </View>
        </Overlay>
      </View>

      <View style={styles.dropdownContainer}>
        <View>
          <Text style={styles.label}>Vendor Name:</Text>
          <TextInput
            style={styles.input}
            value={vendorName}
            onChangeText={setVendorName}
            placeholder="Enter vendor name"
            returnKeyType="next"
            ref={vendorNameRef}
            onSubmitEditing={() => bestProteinRef.current.focus()}
          />

          <Text style={styles.label}>Best Protein:</Text>
          <TextInput
            style={styles.input}
            value={bestProtein}
            onChangeText={setBestProtein}
            placeholder="Enter best protein"
            returnKeyType="next"
            ref={bestProteinRef}
            onSubmitEditing={() => priceRef.current.focus()}
            editable={true} // Disable editing if the value is selected from the dropdown
          />
          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="Enter Price"
            returnKeyType="done"
            ref={priceRef}
            onSubmitEditing={handleSaveLocation}
            editable={true} // Disable editing if the value is selected from the dropdown
          />
        </View>
        <Picker
          selectedValue={bestProtein}
          onValueChange={(value) => setBestProtein(value)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Carnitas" value="Carnitas" />
          <Picker.Item label="Carne Asada" value="Carne Asada" />
          <Picker.Item label="Pollo" value="Pollo" />
          <Picker.Item label="Mariscos" value="Mariscos" />
          <Picker.Item label="Buche" value="Buche" />
          <Picker.Item label="Suadero" value="Suadero" />
          <Picker.Item label="Al Pastor" value="Al Pastor" />
        </Picker>
      </View>

      <Button title={buttonTitle} onPress={handleSaveLocation} />
      <View style={{ height: 15 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  overlay: {},
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
    marginBottom: 16,
  },

  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    width: 150,
  },
  dropdownContainer: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  picker: {
    marginRight: 8,
    justifySelf: "flex-end",
  },
  pickerItem: {
    fontSize: 15,
    width: 180,
    border: "solid black",
  },
});

export default NewSpot;
