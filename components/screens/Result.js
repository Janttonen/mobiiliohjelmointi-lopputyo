import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import style from "../style.js";

export default function Result({ navigation, route }) {
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  //https://reactnavigation.org/docs/stack-actions/
  // https://reactnavigation.org/docs/use-is-focused/

  return (
    <View style={style.container}>
      <Text> haha sait pisteit {route.params.points}</Text>
      <Button
        title="New game"
        onPress={() => {
          if (route.params.game === "custom") {
            navigation.navigate("Custom game", { screen: "Custom" });
          } else {
            navigation.navigate("Standard game", { screen: "Standard" });
          }
        }}
      ></Button>
    </View>
  );
}
