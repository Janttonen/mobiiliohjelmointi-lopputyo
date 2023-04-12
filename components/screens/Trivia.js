import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { default_API, fetchJson } from "../util.js";
import Checkbox from "expo-checkbox";
import style from "../style.js";

// Triviapage
export default function Trivia({ navigation, route }) {
  // data from fetch
  const [data, setData] = useState(null);
  // trivia
  const [trivia, setTrivia] = useState([]);
  // points
  const [points, setPoints] = useState(0);
  // index of the question
  const [index, setIndex] = useState(0);
  // answer Status (true or false)
  const [answerStatus, setAnswerStatus] = useState(null);
  // answers
  const [answers, setAnswers] = useState([]);
  // selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  useEffect(() => {
    fetchTrivia();
    setTrivia([]);
  }, []);

  useEffect(() => {
    if (data) randomizeArray();
  }, [data]);

  const fetchTrivia = () => {
    fetchJson(`${default_API}${route.params.difficulty}`).then((data) => {
      setData(data.results);
    });
  };

  // add options array and suffle said array
  const randomizeArray = () => {
    data.map((q) => {
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
  };

  const currentQuestion = trivia[index];

  return (
    <View style={style.container}>
      <Text>Toimiii</Text>
      <Text>{route.params.difficulty}</Text>

      <ActivityIndicator size="small" animating={!data} />

      {data && (
        <>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {currentQuestion?.question}
            </Text>
            <View>
              {currentQuestion?.options.map((item, index) => (
                <Text>{item}</Text>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
}
