import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable } from "react-native";
import style from "../style";
import { gameOptions } from "../util.js";

// Standard game
export default function StandardGame({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 10 }}>
        <View style={style.headerContainer2}>
          <Text
            style={{
              fontSize: 40,
              color: "#BB79BD",
              fontFamily: "Nunito_300Light",
              flexShrink: 1,
            }}
          >
            Standard game
          </Text>
          <Text style={style.h4}>
            So you have chosen standard game, choose your difficulty and we will
            give you 10 questions from any category.
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          {gameOptions.difficulty.map((option) => {
            return (
              <View
                key={option.id}
                style={{
                  alignItems: "center",
                }}
              >
                <Pressable
                  style={style.buttonPink}
                  onPress={() =>
                    navigation.navigate("Trivia", {
                      game: "Standard",
                      difficulty: option.value,
                      amount: 10,
                      category: 0,
                    })
                  }
                >
                  <Text style={style.h4white}>{option.title}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        <StatusBar style="auto" />
      </View>
    </View>
  );
}
