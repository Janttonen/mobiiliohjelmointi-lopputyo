import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { default_API, fetchJson } from "../util.js";
import style from "../style.js";
import { saveItems } from "../firebase.js";

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
        { points: 1, game: route.params.game, date: date },
      ]);
      navigation.navigate("Result", {
        game: route.params.game,
        points: points,
      });
    }
  }, [index]);

  const checkUrl = () => {
    if (route.params.category === 0 && route.params.difficulty === "any") {
      return `${default_API}${route.params.amount}`;
    } else if (route.params.category === 0) {
      return `${default_API}${route.params.amount}&difficulty=${route.params.difficulty}`;
    } else {
      return `${default_API}${route.params.amount}&category=${route.params.category}&difficulty=${route.params.difficulty}`;
    }
  };

  const fetchTrivia = () => {
    try {
      const url = checkUrl();
      if (url) {
        fetchJson(url).then((data) => {
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
    // question, difficulty, category and did player get points
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
        <>
          <View style={{ margin: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 25,
                  color: "#000",
                  fontFamily: "Nunito_300Light",
                  flexShrink: 1,
                  fontWeight: "bold",
                }}
              >
                Question {index + 1} of {route.params.amount}
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  color: "#000",
                  fontFamily: "Nunito_300Light",
                  flexShrink: 1,
                  fontWeight: "bold",
                }}
              >
                {currentQuestion?.question}
              </Text>
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
        </>
      ) : (
        "Something went wrong"
      )}
    </View>
  );
}
