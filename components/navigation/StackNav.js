import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Trivia from "../screens/Trivia.js";
import Result from "../screens/Result.js";
import StandardGame from "../screens/StandardGame.js";

const Stack = createNativeStackNavigator();

export default function StackNav() {
  return (
    
    <Stack.Navigator  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Choose game" component={StandardGame} />
      <Stack.Screen name="Trivia" component={Trivia} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}
