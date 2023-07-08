import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../Screens/Home";
import ImHungry from "../Screens/ImHungry";
import NewSpot from "../Screens/NewSpot";
import VendorDetails from "../Screens/VendorDetails";

const screens = {
  Home: {
    screen: Home,
  },
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
