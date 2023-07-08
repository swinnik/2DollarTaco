import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { VendorProvider } from "./VendorContext";
import Home from "./Screens/home";
import ImHungry from "./Screens/ImHungry";
import NewSpot from "./Screens/NewSpot";
import VendorDetails from "./Screens/VendorDetails";
import ReviewDetails from "./Screens/ReviewDetails";

const Stack = createStackNavigator();

export default function App() {
  return (
    <VendorProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ImHungry" component={ImHungry} />
          <Stack.Screen name="NewSpot" component={NewSpot} />
          <Stack.Screen name="ReviewDetails" component={ReviewDetails} />
          <Stack.Screen
            name="VendorDetails"
            component={VendorDetails}
            options={{ headerShown: false }} // Optional: Hide the header if desired
          />
        </Stack.Navigator>
      </NavigationContainer>
    </VendorProvider>
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
