import { View, Text, Button } from "react-native";
import React from "react";

export default function reviewDetails({ navigation }) {
  const pressHandler = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>{reviewDetails}</Text>
      <Button title="go to home" onPress={pressHandler} />
    </View>
  );
}
        