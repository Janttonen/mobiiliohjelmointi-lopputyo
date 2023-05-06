import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import { Text, TextInput, View, Button, ActivityIndicator } from "react-native";
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
        game: 'custom',
        difficulty: inputs.difficulty,
        amount: inputs.amount,
        category: inputs.category,
      });
    } else if (!inputs.amount) {
      setErrorInput("Please write number of questions");
    } else {
      setErrorInput("Input is invalid!");
    }
  };

  return (
    <View style={style.container}>
      <ActivityIndicator size="small" animating={!categories} />

      {categories != [] ? (
        <>
          <View>
            <Text>Otsikko, tervetuloa trivia peliin!</Text>
            <Text>Valitse vaikeustaso!, category and amount(Custom)</Text>
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
            <TextInput
              placeholder={"Number of questions"}
              value={inputs.amount}
              onChangeText={(text) => setInputs({ ...inputs, amount: text })}
              numeric
              keyboardType={"numeric"}
            />
            {errorInput ? <Text>{errorInput}</Text> : null}
            <Button title="Create game" onPress={() => validInput()}></Button>
          </View>
        </>
      ) : (
        "Something went wrong"
      )}
    </View>
  );
}
