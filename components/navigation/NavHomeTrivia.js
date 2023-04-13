import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home.js";
import Trivia from "../screens/Trivia.js";
import Result from "../screens/Result.js";

const Stack = createNativeStackNavigator();

export default function NavHomeTrivia() {
  return (
    
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Trivia" component={Trivia} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}
