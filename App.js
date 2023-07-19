import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { VendorProvider } from "./VendorContext";
import Home from "./Screens/Landing";
import ImHungry from "./Screens/ImHungry";
import NewSpot from "./Screens/NewSpot";
import Loading from "./Screens/Loading";
import Donation from "./Screens/Donation";
import { LocationContext } from "./LocationContext";
import { LocationProvider } from "./LocationContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ImHungry" component={ImHungry} />
          <Stack.Screen name="NewSpot" component={NewSpot} />
          <Stack.Screen name="Donation" component={Donation} />
          {/* <Stack.Screen
            name="VendorDetails"
            component={VendorDetails}
            options={{ headerShown: false }} // Optional: Hide the header if desired
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
