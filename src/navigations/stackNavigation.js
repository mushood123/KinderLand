import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard, ForgotPassword, LoginScreen } from '../screens';

const Stack = createStackNavigator();

const PublicStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    </Stack.Navigator>

  );
}

const PrivateStack = ({ handleLogout }) => {
  console.log('handleLogout from stackNavigation', handleLogout);
  console.log('handleLogout type in PrivateStack:', typeof handleLogout);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
        initialParams={{ handleLogout }}
      />
    </Stack.Navigator>
  );
}

export const navigation = (token, handleLogout) => {
  console.log('=== Navigation function called ===');
  console.log('handleLogout from navigation', handleLogout);
  console.log('handleLogout type:', typeof handleLogout);
  console.log('token:', token);
  console.log('token type:', typeof token);
  console.log('token truthy check:', !!token);
  console.log('token === null:', token === null);
  console.log('token === undefined:', token === undefined);
  console.log('token === "":', token === "");
  console.log('token length:', token ? token.length : 'N/A');

  // More explicit token check
  const hasValidToken = token &&
    typeof token === 'string' &&
    token.trim() !== '' &&
    token !== 'null' &&
    token !== 'undefined';

  console.log('hasValidToken:', hasValidToken);

  if (hasValidToken) {
    console.log('Returning PrivateStack');
    return <PrivateStack handleLogout={handleLogout} />;
  }
  console.log('Returning PublicStack');
  return <PublicStack />;
}