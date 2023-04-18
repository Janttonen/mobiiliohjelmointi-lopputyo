import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native"
import Home from '../screens/Home'
import StandardGame from "../screens/StandardGame";
import CustomGame from "../screens/CustomGame";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator initialRouteName="Home page">
        <Drawer.Screen name="Home page" component={Home} />
      <Drawer.Screen name="Standard game" component={StandardGame} />
      <Drawer.Screen name="Custom game" component={CustomGame} />
    </Drawer.Navigator>
  );
}
