import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./routes/homeStack";
import { VendorProvider } from "./VendorContext";

export default function App() {
  return (
    <VendorProvider>
      <Navigator />
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
