import 'react-native-gesture-handler';
import DrawerNav from './components/navigation/DrawerNav';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
}
