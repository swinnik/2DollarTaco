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
      {!initialRegion && (
        <Text style={styles.map}>Getting current location...</Text>
      )}
      {initialRegion && (
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
      )}
      <View style={styles.dropdownContainer}>
        <View>
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
    width: "120%",
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
