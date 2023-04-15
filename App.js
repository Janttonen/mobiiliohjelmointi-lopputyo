import 'react-native-gesture-handler';
import StackNav from './components/navigation/StackNav';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
