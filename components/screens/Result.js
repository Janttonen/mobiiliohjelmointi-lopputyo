import { useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import style from "../style.js";

export default function Result({ navigation, route }) {
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <View style={style.container}>
      <View style={{ margin: 20 }}>
        <View style={style.headerContainer}>
          <Text
            style={{
              fontSize: 40,
              color: "#BB79BD",
              fontFamily: "Nunito_300Light",
              flexShrink: 1,
            }}
          >
            You got {route.params.points} points
          </Text>
          <View style={{ marginTop: 20 }}>
            <Text style={style.h4}>
              You can check details of this game from your profile
            </Text>
            {route.params.game == "Custom" ? (
              <Text style={style.h4}>
                Click this amazing button to create new custom game!
              </Text>
            ) : (
              <Text style={style.h4}>
                Click this amazing button to create new standard game!
              </Text>
            )}
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={style.buttonPink}
            onPress={() => {
              if (route.params.game === "Custom") {
                navigation.navigate("Custom game", { screen: "Custom" });
              } else {
                navigation.navigate("Standard game", { screen: "Standard" });
              }
            }}
          >
            <Text style={style.h4white}>New game</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// https://reactnavigation.org/docs/stack-actions/
// https://reactnavigation.org/docs/use-is-focused/
