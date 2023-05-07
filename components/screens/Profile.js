import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text, View, FlatList } from "react-native";
import { firebaseConfig } from "../firebase.js";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import style from "../style";

// Profile
export default function Profile({ navigation }) {
  const [data, setData] = useState(null);

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
    onValue(ref(database, "/played-games/"), (snapshot) => {
      const data = snapshot.val();

      const keys = Object.keys(data);
      const dataWithKeys = Object.values(data).map((obj, index) => {
        return { ...obj, key: keys[index] };
      });

      setData(dataWithKeys);
    });
  }, []);

  return (
    <View style={style.container}>
      <ActivityIndicator size="small" animating={!data} />

      {data ? (
        <View style={{ margin: 5 }}>
          <FlatList
            ListHeaderComponent={
              <>
                <View style={style.headerContainer2}>
                  <Text style={style.h4bold}>Played games: {data.length}</Text>
                  <Text style={style.h4}>
                    Here you can find results and details about your played
                    games.
                  </Text>
                </View>
              </>
            }
            data={data}
            renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#000",
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={style.textContainer}>
                  <Text style={style.h4}>
                    {item.game[1].date} / {item.game[1].game} game
                  </Text>

                  <Text style={style.h4}>
                    Collected points: {item.game[1].points} / {item.game[0].length}
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#BB79BD",
                      fontFamily: "Nunito_300Light",
                      flexShrink: 1,
                    }}
                    onPress={() =>
                      navigation.navigate("Details", {
                        id: item.key,
                      })
                    }
                  >
                    More details
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      ) : (
        []
      )}
      <StatusBar style="auto" />
    </View>
  );
}
