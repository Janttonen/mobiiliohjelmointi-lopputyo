import { StatusBar } from "expo-status-bar";
import { Text, View, Button } from "react-native";
import style from "../style";
import { gameOptions } from "../util.js";

// Standard game
export default function StandardGame({ navigation }) {
  return (
    <View style={style.container}>
      <Text>Otsikko, tervetuloa trivia peliin!</Text>
      <Text>Valitse vaikeustaso! (Standard game)</Text>

      <View>
        {gameOptions.difficulty.map((option) => {
          return (
            <Button
              key={option.id}
              title={option.title}
              onPress={() =>
                navigation.navigate("Trivia", {
                
                  difficulty: option.value,
                  amount: 5,
                  category: 0,
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