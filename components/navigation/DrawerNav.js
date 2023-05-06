import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native"
import Home from '../screens/Home'
import Profile from "../screens/Profile";
import { Standard, Custom } from "./StackNav";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator initialRouteName="Home page">
      <Drawer.Screen name="Home page" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Standard game" component={Standard} />
      <Drawer.Screen name="Custom game" component={Custom} />
    </Drawer.Navigator>
  );
}
