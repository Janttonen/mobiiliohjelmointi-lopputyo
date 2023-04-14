import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native"
import Home from '../screens/Home'
import StackNav from "./StackNav";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Standard game" component={StackNav} />
    </Drawer.Navigator>
  );
}
