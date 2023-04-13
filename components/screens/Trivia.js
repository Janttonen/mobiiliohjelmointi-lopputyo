import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { default_API, fetchJson } from "../util.js";
import Checkbox from "expo-checkbox";
import style from "../style.js";

// Triviapage
export default function Trivia({ navigation, route }) {
  // trivia
  const [trivia, setTrivia] = useState([]);
  // points
  const [points, setPoints] = useState(0);
  // index of the question
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [check, setCheck] = useState(false);

  const currentQuestion = trivia[index];

  useEffect(() => {
    fetchTrivia();
  }, []);

  useEffect(() => {
    if (index + 1 > route.params.amount) {
      navigation.navigate("Result", {
        points: points,
      });
    }
  }, [index]);
  //täää nyt sekooo koska trivia lenght alussa nollla tms

  const fetchTrivia = () => {
    fetchJson(
      `${default_API}amount=${route.params.amount}&difficulty=${route.params.difficulty}`
    ).then((data) => {
      data.results.map((q) => {
        setTrivia((prevState) => [
          ...prevState,
          {
            category: q.category,
            correct_answer: q.correct_answer,
            difficulty: q.difficulty,
            incorrect_answers: q.incorrect_answers,
            question: q.question,
            type: q.type,
            options: q.incorrect_answers
              .concat(q.correct_answer)
              .sort(() => 0.5 - Math.random()),
          },
        ]);
      });
    });
  };

  // check given answer and give points if correct
  const checkAnswer = (answer) => {
    setCheck(true);
    if (answer === currentQuestion.correct_answer) {
      setAnswer(`Oikein meni!`);
      setPoints(points + 1);
    } else {
      setAnswer(`Väärin meni, oikea vastaus ${currentQuestion.correct_answer}`);
    }
  };

  return (
    <View style={style.container}>
      <ActivityIndicator size="small" animating={!trivia} />

      {trivia ? (
        <>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Question {index + 1} of {route.params.amount}
            </Text>

            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {currentQuestion?.question}
            </Text>

            {currentQuestion?.options.map((item, index) => (
              <TouchableOpacity
                style={style.button}
                onPress={() => checkAnswer(item)}
                activeOpacity={0.5}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}

            {check == true ? (
              <View>
                <Text>{answer}</Text>
                <Button
                  title="Next"
                  onPress={() => {
                    setIndex(index + 1), setCheck(false);
                  }}
                />
                <Button title="Prev" onPress={() => setIndex(index - 1)} />
              </View>
            ) : null}
          </View>
        </>
      ) : (
        "jotain meni väärin"
      )}
    </View>
  );
}
