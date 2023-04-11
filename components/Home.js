import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import style from "./style";
import { difficulty } from "./util.js";

export default function Home({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Otsikko, tervetuloa trivia peliin!</Text>
      <Text>Valitse vaikeustaso!</Text>

      <View>
        {difficulty.map((option) => {
          return (
            <Button
              title={option.title}
              onPress={() =>
                navigation.navigate("Trivia", {
                  difficulty: option.value,
                })
              }
            ></Button>
          );
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
