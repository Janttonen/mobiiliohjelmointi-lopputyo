import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import style from "../style.js";

export default function Result({navigation, route}){

    return(
        <View style={style.container}>
           <Text> haha sait pisteit {route.params.points}</Text>
           <Button
              title='Home page'
              onPress={() =>
                navigation.navigate("Choose game")
              }
            ></Button>
        </View>
    );
}