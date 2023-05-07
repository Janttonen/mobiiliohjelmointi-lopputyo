import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { fetchJson, checkUrl } from "../util.js";
import { saveItems } from "../firebase.js";
import style from "../style.js";

// Trivia page
export default function Trivia({ navigation, route }) {
  const [trivia, setTrivia] = useState([]);
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [check, setCheck] = useState(false);
  const [gameResults, setGameResults] = useState([]);

  const currentQuestion = trivia[index];

  // listen if user tries to leave page
  // https://reactnavigation.org/docs/preventing-going-back/
  // https://reactnavigation.org/docs/use-is-focused/
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      Alert.alert(
        "Your game is paused",
        "You can resume to current game or start new game",
        [
          { text: "Resume", style: "cancel", onPress: () => {} },
          {
            text: "Leave current game",
            style: "destructive",
            onPress: () => navigation.dispatch(e.data.action),
          },
        ]
      );
    });
  }, [navigation]);

  useEffect(() => {
    fetchTrivia();
    setIndex(0);
  }, []);

  useEffect(() => {
    if (index + 1 > route.params.amount) {
      const date = new Date().toLocaleDateString("de-DE");

      saveItems([
        gameResults,
        { points: points, game: route.params.game, date: date },
      ]);
      navigation.navigate("Result", {
        game: route.params.game,
        points: points,
      });
    }
  }, [index]);

  const fetchTrivia = () => {
    try {
      const url = checkUrl(
        route.params.category,
        route.params.difficulty,
        route.params.amount
      );
      if (url) {
        fetchJson(url).then((data) => {
          data.results.map((q) => {
            setTrivia((prevState) => [
              ...prevState,
              {
                category: decodeURIComponent(q.category),
                correct_answer: decodeURIComponent(q.correct_answer),
                difficulty: decodeURIComponent(q.difficulty),
                question: decodeURIComponent(q.question),
                type: decodeURIComponent(q.type),
                options: q.incorrect_answers
                  .map((q) => decodeURIComponent(q))
                  .concat(decodeURIComponent(q.correct_answer))
                  .sort(() => 0.5 - Math.random()),
              },
            ]);
          });
        });
      }
    } catch (error) {
      console.error("fetchTrivia error: ", error);
    }
  };

  // check given answer and give points if correct
  const checkAnswer = (answer) => {
    setCheck(true);
    if (answer === currentQuestion.correct_answer) {
      setPoints(points + 1);
      setAnswer(`Correct!`);
    } else {
      setAnswer(`Wrong :( Correct answer is ${currentQuestion.correct_answer}`);
    }

    // save your answers for firebase data
    // question, difficulty, category, answer
    setGameResults((prevState) => [
      ...prevState,
      {
        category: currentQuestion.category,
        difficulty: currentQuestion.difficulty,
        question: currentQuestion.question,
        correct_answer: currentQuestion.correct_answer,
        your_answer: answer,
      },
    ]);
  };

  return (
    <View style={style.container}>
      <ActivityIndicator size="small" animating={!trivia} />

      {trivia ? (
        <View style={{ margin: 6 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={style.h3bold}>
              Question {index + 1} of {route.params.amount}
            </Text>
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={style.h4bold}>{currentQuestion?.category}</Text>
              <Text style={style.h4}>{currentQuestion?.question}</Text>
            </View>
          </View>
          <View style={style.headerContainer2}>
            {currentQuestion?.options.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={style.buttonGame}
                onPress={() => {
                  if (check == false) {
                    checkAnswer(item);
                  }
                }}
                activeOpacity={1}
              >
                <Text style={style.text}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {check == true ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={style.text}>{answer}</Text>
              <Pressable
                style={style.buttonPink}
                onPress={() => {
                  setIndex(index + 1), setCheck(false);
                }}
              >
                <Text style={style.h4white}>Next</Text>
              </Pressable>
            </View>
          ) : (
            []
          )}
        </View>
      ) : (
        "Something went wrong"
      )}
    </View>
  );
}
