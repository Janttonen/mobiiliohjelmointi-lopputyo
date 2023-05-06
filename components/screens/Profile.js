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

      const keys = Object.keys(data);
      // Combine keys with data 
      const dataWithKeys = Object.values(data).map((obj, index) => { 
        return {...obj, key: keys[index] } 
      });

      setData(dataWithKeys);
      
      console.log(data)
      console.log(Object.keys(data))
    });
    
  }, []);

  return (
    <View style={style.container}>
        <ActivityIndicator size="small" animating={!data} />
      <Text>Profile</Text>
      {data ? (
        <>
        <View>
          {data.map((item, key) => {
            return (
              <>
                <Text>Played game details:</Text>
               
                <Text>{item.game[1].game} game</Text>
                <Text>{item.game[1].date} game</Text>
                <Text>Collected points: {item.game[1].points}</Text>

                <Text
                  
                  onPress={() =>
                    navigation.navigate('PlayedGameDetails', {
                      id: item.key,
                    })
                  }
                >
                  more details
                </Text>
                {/*item.game.details.map((y) => {
                    return(
                    <>
                    <Text>{y.question.category}</Text>
                <Text>{y.question.question}</Text>
                
                </>)
               })*/}
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
