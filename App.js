import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Contactus from './screens/Contactus';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contact Us" component={Contactus} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


