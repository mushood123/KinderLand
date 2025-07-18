import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard, ForgotPassword, LoginScreen } from '../../screens';

const Stack = createStackNavigator();

export const PublicStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    </Stack.Navigator>

  );
}