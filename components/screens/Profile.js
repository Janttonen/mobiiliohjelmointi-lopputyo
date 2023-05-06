import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text, View, Button } from "react-native";
import style from "../style";
import { firebaseConfig } from "../firebase.js";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";

// Homepage
export default function Profile({ navigation }) {
  const [data, setData] = useState(null);

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
    onValue(ref(database, "/played-games/"), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setData(Object.values(data));
      }
    });
    
  }, []);

  return (
    <View style={style.container}>
        <ActivityIndicator size="small" animating={!data} />
      <Text>Profile</Text>
      {data ? (
        <>
        <View>
          {data.map((item) => {
            return (
              <>
                <Text>Played game details:</Text>
                <Text>{item.game.points}</Text>
                {item.game.details.map((y) => {
                    return(<>
                <Text>{y.question.question}</Text>
                <Text>{y.question.correct_answer}</Text>
                <Text>{y.youranswer}</Text>
                </>)
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
