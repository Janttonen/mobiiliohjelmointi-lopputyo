import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import style from "../style.js";
import {saveItems } from "../firebase.js";

export default function Result({ navigation, route }) {
  // save your answers for firebase
  const [save, setSave] = useState(null);

  useEffect(() => {
      setSave(route.params.gameresults);
  }, []);

  console.log(save);
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  //https://reactnavigation.org/docs/stack-actions/
  // https://reactnavigation.org/docs/use-is-focused/

  return (
    <View style={style.container}>
      <Text> haha sait pisteit {route.params.gameresults.points}</Text>
      <Button
        title="New game"
        onPress={() => {
          if (route.params.category != 0) {
            navigation.navigate("Custom game", { screen: "Custom" });
          } else {
            navigation.navigate("Standard game", { screen: "Standard" });
          }
        }}
      ></Button>

      <Button
        title="Save results"
        onPress={() => {
          saveItems(save);
        }}
      ></Button>
    </View>
  );
}
