import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { default_API, fetchJson } from "../util.js";
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

  //points data?? like navigation yms yms yms
  useEffect(() => {
    fetchTrivia();
  }, []);

  useEffect(() => {
    if (index + 1 > route.params.amount) {
      navigation.navigate("Result", {
        category: route.params.category,
        gameresults: {
          points: points,
          details: gameResults,
        },
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
      setAnswer(`You are correct!`);
      setPoints(points + 1);
    } else {
      setAnswer(`Wrong :( Correct answer is ${currentQuestion.correct_answer}`);
    }

    // save your answers for firebase data
    setGameResults((prevState) => [
      ...prevState,
      { question: currentQuestion, youranswer: answer },
    ]);
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
                key={index}
                style={style.button}
                onPress={() => {if (check == false) {
                  checkAnswer(item)}}}
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
