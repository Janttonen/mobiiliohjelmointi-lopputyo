import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { default_API, fetchJson } from "./util.js";
import style from "./style.js";

export default function Trivia({ navigation, route }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTrivia();
  }, []);

  const fetchTrivia = () => {
    fetchJson(`${default_API}${route.params.difficulty}`).then((data) => {
      setData(data.results);
    });
  };

  console.log(data);
  return (
    <View style={style.container}>
      <Text>Toimiii</Text>
      <Text>{route.params.difficulty}</Text>

      <ActivityIndicator size="small" animating={!data} />

      {data && (
        <>
          {data.map((question) => {
            return (
              <View>
                <Text>{question.question}</Text>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
}
