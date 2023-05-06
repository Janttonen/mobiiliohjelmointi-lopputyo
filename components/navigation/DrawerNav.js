import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native"
import Home from '../screens/Home'
import { StandardStack, CustomStack, ProfileStack } from "./StackNav";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator initialRouteName="Home page">
      <Drawer.Screen name="Home page" component={Home} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Standard game" component={StandardStack} />
      <Drawer.Screen name="Custom game" component={CustomStack} />
    </Drawer.Navigator>
  );
}
