import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  ImageBackground,
  SafeAreaView,
  Pressable,
  Text,
  View,
} from "react-native";
import mainpage from "../images/mainpage.jpg";
import style from "../style";

// Homepage
export default function Home({ navigation }) {
  return (
    <SafeAreaView style={style.container}>
      <ImageBackground source={mainpage} style={{ flex: 1 }}>
        <View>
          <View style={style.headerContainer}>
            <Text style={style.h1}>Welcome to Trivia Game App!</Text>
            <Text style={style.h2}>
              Test your knowledge on multiple different categories
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 40, marginBottom: 10 }}>
          <Pressable
            style={style.button}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={style.h3}>
              <Ionicons name="person-circle-outline" size={25} /> Profile
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Standard game")}
            style={style.button}
          >
            <Text style={style.h3}>
              <Ionicons name="play-circle-outline" size={25} />
              Standard game
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Custom game")}
            style={style.button}
          >
            <Text style={style.h3}>
              <Ionicons name="play-circle-outline" size={25} />
              Custom game
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

// Photo by Pawel Czerwinski on Unsplash
