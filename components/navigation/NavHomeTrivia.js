import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../components/Home.js";
import Trivia from "../components/Trivia.js";

const Stack = createNativeStackNavigator();

export default function NavHomeTrivia({ navigation, route }) {
  return (
    
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Trivia" component={Trivia} />
    </Stack.Navigator>
  );
}
