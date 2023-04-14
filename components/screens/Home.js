import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import style from "../style";
import { difficulty } from "../util.js";

// Homepage
export default function Home({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Homepage</Text>


      <StatusBar style="auto" />
    </View>
  );
}
