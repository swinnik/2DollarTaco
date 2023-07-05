import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../Screens/home";
import ImHungry from "../Screens/ImHungry";
import NewSpot from "../Screens/NewSpot";

import ReviewDetails from "../Screens/reviewDetails";

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
  ReviewDetails: {
    screen: ReviewDetails,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
