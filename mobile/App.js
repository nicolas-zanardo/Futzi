import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home/home';
import SoccerTraining from './screens/soccer-training/soccer-training';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='soccer-training' component={SoccerTraining}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}