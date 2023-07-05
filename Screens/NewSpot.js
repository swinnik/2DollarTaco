import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Button } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { VendorContext } from "../App";

const NewSpot = ({ navigation }) => {
  const { addVendor } = useContext(VendorContext);
  const [initialRegion, setInitialRegion] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [vendorName, setVendorName] = useState("");
  const [bestProtein, setBestProtein] = useState("");
  const bestProteinRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;
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

  const handleSaveLocation = () => {
    if (vendorName && bestProtein && markerLocation) {
      const newVendor = {
        name: vendorName,
        location: markerLocation,
        protein: bestProtein,
      };
      addVendor(newVendor);
      setVendorName("");
      setBestProtein("");
      setMarkerLocation(null);
      Keyboard.dismiss();
      navigation.navigate("Home");
    } else {
      console.log(
        "Please enter vendor name, best protein, and select a location"
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onPress={(event) => setMarkerLocation(event.nativeEvent.coordinate)}
        >
          {markerLocation && (
            <Marker coordinate={markerLocation} title="Current Location" />
          )}
        </MapView>
      )}
      <Text style={styles.label}>Vendor Name:</Text>
      <TextInput
        style={styles.input}
        value={vendorName}
        onChangeText={setVendorName}
        placeholder="Enter vendor name"
        returnKeyType="next"
        onSubmitEditing={() => bestProteinRef.current.focus()}
      />

      <Text style={styles.label}>Best Protein:</Text>
      <TextInput
        style={styles.input}
        value={bestProtein}
        onChangeText={setBestProtein}
        placeholder="Enter best protein"
        returnKeyType="done"
        ref={bestProteinRef}
        onSubmitEditing={handleSaveLocation}
      />

      <Button title="Save Location" onPress={handleSaveLocation} />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default NewSpot;
