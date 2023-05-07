import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import Trivia from "../screens/Trivia.js";
import Result from "../screens/Result.js";
import ProfileScreen from "../screens/Profile.js";
import PGD from "../screens/PlayedGameDetails.js";
import StandardGame from "../screens/StandardGame.js";
import CustomGame from "../screens/CustomGame.js";

// create stack navigation for standard game
const StackA = createNativeStackNavigator();

// create navigation for custom game
const StackB = createNativeStackNavigator();

// create navigation for profile
const StackC = createNativeStackNavigator();

export const StandardStack = ({ navigation }) => {
  useEffect(() => {
    navigation.addListener("focus", () => {
      navigation.navigate("Standard");
    });
  }, [navigation]);

  return (
    <StackA.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackA.Screen name="Standard" component={StandardGame} />
      <StackA.Screen name="Trivia" component={Trivia} />
      <StackA.Screen name="Result" component={Result} />
    </StackA.Navigator>
  );
};

export const CustomStack = ({ navigation }) => {
  useEffect(() => {
    navigation.addListener("focus", () => {
      navigation.navigate("Custom");
    });
  }, [navigation]);

  return (
    <StackB.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackB.Screen name="Custom" component={CustomGame} />
      <StackB.Screen name="Trivia" component={Trivia} />
      <StackB.Screen name="Result" component={Result} />
    </StackB.Navigator>
  );
};

export const ProfileStack = ({ navigation }) => {
  return (
    <StackC.Navigator>
      <StackC.Screen name="ProfileScreen" component={ProfileScreen}  options={{
        headerShown: false,
      }}/>
      <StackC.Screen name="Details" component={PGD}  options={{
          title: 'Go back',
          headerLeft: () => (
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              //style={style.menuIcon}
              onPress={() => {
                navigation.navigate('ProfileScreen');
              }}
            />
          ),
        }} />
    </StackC.Navigator>
  );
};
