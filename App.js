import "react-native-gesture-handler";
import DrawerNav from "./components/navigation/DrawerNav";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Nunito_300Light } from "@expo-google-fonts/nunito";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_300Light,
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  } else {
    return null;
  }

  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
}
