import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Text,
  TextInput,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import style from "../style";
import { gameOptions } from "../util.js";
import { category_API, fetchJson } from "../util.js";

// Custom game
export default function CustomGame({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [inputs, setInputs] = useState({
    category: null,
    difficulty: "",
    amount: null,
  });
  const [errorInput, setErrorInput] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetchJson(category_API).then((data) => {
      data.trivia_categories.unshift({ id: 0, name: "Any category" });
      setCategories(data.trivia_categories);
    });
  };

  // validate number input
  const validInput = () => {
    if (inputs.amount > 0 && inputs.amount < 50) {
      navigation.navigate("Trivia", {
        game: "Custom",
        difficulty: inputs.difficulty,
        amount: inputs.amount,
        category: inputs.category,
      });
    } else if (!inputs.amount) {
      setErrorInput("Please write how many questions you want");
    } else {
      setErrorInput("Input is invalid!");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ margin: 10 }}>
        <View style={style.headerContainer2}>
          <Text
            style={{
              fontSize: 40,
              color: "#459ECF",
              fontFamily: "Nunito_300Light",
              flexShrink: 1,
            }}
          >
            Custom game
          </Text>
          <Text style={style.h4}>
            You have chosen to customize you game. You can choose from category,
            difficulty and lenght. Feel free to mix things up!
          </Text>
        </View>
        <ActivityIndicator size="small" animating={!categories} />

        {categories != [] ? (
          <>
            <View style={{ margin: 10 }}>
              <View style={style.textContainer}>
                <Text style={style.text}>Search by category</Text>
                <Picker
                  selectedValue={inputs.category}
                  onValueChange={(itemValue, itemIndex) =>
                    setInputs({ ...inputs, category: itemValue })
                  }
                >
                  {categories.map((category) => (
                    <Picker.Item
                      key={category.id}
                      label={category.name}
                      value={category.id}
                    />
                  ))}
                </Picker>
              </View>
              <View style={style.textContainer}>
                <Text style={style.text}>Choose difficulty</Text>
                <Picker
                  selectedValue={inputs.difficulty}
                  onValueChange={(itemValue, itemIndex) =>
                    setInputs({ ...inputs, difficulty: itemValue })
                  }
                >
                  {gameOptions.difficulty.map((difficulty) => (
                    <Picker.Item
                      key={difficulty.id}
                      label={difficulty.title}
                      value={difficulty.value}
                    />
                  ))}
                </Picker>
              </View>
              <View style={style.textContainer}>
                <Text style={style.text}>Choose amount of questions</Text>
                <TextInput
                  placeholder={"1-50 questions"}
                  value={inputs.amount}
                  onChangeText={(text) =>
                    setInputs({ ...inputs, amount: text })
                  }
                  numeric
                  keyboardType={"numeric"}
                  style={style.input}
                />
              </View>
              {errorInput ? (
                <Text style={{ color: "#C2171D" }}>{errorInput}</Text>
              ) : (
                []
              )}
              <View style={style.horizontal}>
                <Pressable
                  style={style.buttonClear}
                  onPress={() => {
                    setInputs({ category: 0, difficulty: "", amount: null });
                    setErrorInput("");
                  }}
                >
                  <Text style={style.h4}>Clear</Text>
                </Pressable>
                <Pressable
                  style={style.buttonBlue}
                  onPress={() => validInput()}
                >
                  <Text style={style.h4white}>Create game</Text>
                </Pressable>
              </View>
            </View>
          </>
        ) : (
          "Something went wrong"
        )}
      </View>
    </View>
  );
}
