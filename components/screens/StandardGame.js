import { StatusBar } from "expo-status-bar";
import { Text, View, Pressable } from "react-native";
import style from "../style";
import { gameOptions } from "../util.js";

// Standard game
export default function StandardGame({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={style.textContainer}>
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
          give you any questions from any category.
        </Text>
      </View>

      <View>
        {gameOptions.difficulty.map((option) => {
          return (
            <>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Pressable
                  key={option.id}
                  style={style.buttonPink}
                  onPress={() =>
                    navigation.navigate("Trivia", {
                      game: "Standard",
                      difficulty: option.value,
                      amount: 5,
                      category: 0,
                    })
                  }
                >
                  <Text style={style.h4white}>{option.title}</Text>
                </Pressable>
              </View>
            </>
          );
        })}
      </View>

      <StatusBar style="auto" />
      </View>
    </View>
  );
}
