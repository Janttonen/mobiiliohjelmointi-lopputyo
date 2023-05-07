import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, FlatList } from "react-native";
import style from "../style";
import { firebaseConfig } from "../firebase.js";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

// Details about played games
export default function PlayedGameDetails({ navigation, route }) {
  const [data, setData] = useState(null);

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
    onValue(ref(database, `/played-games/${route.params.id}`), (snapshot) => {
      const data = snapshot.val();

      const result = Object.values(data);
      setData(result);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={style.container}>
        <ActivityIndicator size="small" animating={!data} />

        {data ? (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={style.textContainer}>
                <Text style={style.h4}>
                  {item[1].date} / {item[1].game} game
                </Text>
                <Text style={style.h4}>Collected points: {item[1].points} / {item[0].length}</Text>

                <FlatList
                  data={item[0].map((q, index) => ({
                    category: q.category,
                    difficulty: q.difficulty,
                    question: q.question,
                    correct_answer: q.correct_answer,
                    your_answer: q.your_answer,
                  }))}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => (
                    <View style={{ margin: 10 }}>
                      <Text style={style.text}>{item.category}</Text>
                      <Text style={style.text}>
                        Difficulty: {item.difficulty}
                      </Text>
                      <Text style={style.text}>Question: {item.question}</Text>
                      <Text style={style.text}>
                        Correct answer: {item.correct_answer}
                      </Text>
                      <Text style={style.text}>
                        Your answer: {item.your_answer}
                      </Text>
                      <View borderBottomWidth={1} style={{ padding: "5%" }} />
                    </View>
                  )}
                />
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        ) : (
          []
        )}
      </View>
    </View>
  );
}
