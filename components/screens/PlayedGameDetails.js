import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text, View, Button } from "react-native";
import style from "../style";
import { firebaseConfig } from "../firebase.js";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

// Homepage
export default function PlayedGameDetails({ navigation, route }) {
  const [data, setData] = useState(null);

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
    onValue(ref(database, `/played-games/${route.params.id}`), (snapshot) => {
      const data = snapshot.val();

      const result = Object.values(data);
      setData(result);
      console.log(data);
    });
  }, []);

  return (
    <View>
      <ActivityIndicator size="small" animating={!data} />
      <Text>GameDetails</Text>
      {data && data != null ? (
        <>
          <View>
            {data.map((item) => {
              return (
                <>
                  <Text>Played game details:</Text>

                  <Text>{item[1].date}</Text>
                  <Text>{item[1].game} game</Text>
                  <Text>Collected points: {item[1].points}</Text>

                  <Text>Questions:</Text>
                  {item[0].map((q) => {
                    return (
                      <>
                        <Text>{q.category}</Text>
                        <Text>{q.difficulty}</Text>
                        <Text>{q.question}</Text>
                        <Text>{q.correct_answer}</Text>
                        <Text>{q.your_answer}</Text>
                      </>
                    );
                  })}
                </>
              );
            })}
          </View>
        </>
      ) : (
        []
      )}

      <StatusBar style="auto" />
    </View>
  );
}
