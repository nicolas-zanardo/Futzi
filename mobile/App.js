import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home/home';
import SoccerTraining from './screens/soccer-training/soccer-training';
import Match from './screens/match/match';
import Login from './screens/login/login';
import { AuthProvider } from './components/authProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='home'>
          <Stack.Screen name='home' component={Home}/>
          <Stack.Screen name='soccer-training' component={SoccerTraining}/>
          <Stack.Screen name='match' component={Match}/>
          <Stack.Screen name='login' component={Login}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}