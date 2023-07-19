import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../Screens/Landing";
import ImHungry from "../Screens/ImHungry";
import NewSpot from "../Screens/NewSpot";
import VendorDetails from "../Screens/VendorDetails";
import Loading from "../Screens/Loading";
import Donation from "../Screens/Donation";

const screens = {
  Home: {
    screen: Home,
  },
  // Donation: {
  //   screen: Donation,
  // },
  ImHungry: {
    screen: ImHungry,
  },
  NewSpot: {
    screen: NewSpot,
  },
  VendorDetails: {
    screen: VendorDetails,
    navigationOptions: {
      headerShown: false, // Optional: Hide the header if desired
    },
  },
};

const HomeStack = createStackNavigator(screens);
const AppContainer = createAppContainer(HomeStack);

export default AppContainer;
