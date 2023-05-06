import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Trivia from "../screens/Trivia.js";
import Result from "../screens/Result.js";
import StandardGame from "../screens/StandardGame.js";
import CustomGame from "../screens/CustomGame.js"

// create stack navigation for standard game
const StackA = createNativeStackNavigator();

// create navigation for custom game
const StackB = createNativeStackNavigator();


export const Standard = ({navigation}) => {

  useEffect(() => {
    navigation.addListener('focus', () => {
      navigation.navigate("Standard")
    });
  }, [navigation]);

  return (
    <StackA.Navigator
      screenOptions={{
        headerShown: false,
      }}
   
    >
      <StackA.Screen name="Standard" component={StandardGame}/>
      <StackA.Screen name="Trivia" component={Trivia} />
      <StackA.Screen name="Result" component={Result} 
    
  />
    </StackA.Navigator>
  );
}

export const Custom = ({navigation}) => {

  useEffect(() => {
    navigation.addListener('focus', () => {
      navigation.navigate("Custom")
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
}
