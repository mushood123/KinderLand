import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { UserProvider, UserContext, CartProvider, ShippingProvider } from './src/context';
import { LogoutProvider } from './src/context/logoutContext';
import { useEffect, useState, useCallback, useContext } from 'react';
import { navigation } from './src/navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AppContent() {
  const [token, setToken] = useState(null);
  const [renderKey, setRenderKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { clearUser } = useContext(UserContext);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      console.log('=== Initial Token Check ===');
      console.log('Token fetched:', storedToken);
      console.log('Token type:', typeof storedToken);
      console.log('Token truthy check:', !!storedToken);
      if (storedToken && storedToken.trim() !== '') {
        console.log('Setting valid token:', storedToken);
        setToken(storedToken);
      } else {
        console.log('Setting token to null (no valid token found)');
        setToken(null);
      }
    } catch (error) {
      console.log('Error fetching token:', error);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    console.log('Token state changed to:', token);
    console.log('Token type after change:', typeof token);
    console.log('Token truthy check after change:', !!token);
    console.log('Current render key:', renderKey);

    setRenderKey(prev => {
      console.log('Incrementing render key from', prev, 'to', prev + 1);
      return prev + 1;
    });
  }, [token]);

  console.log('token from app', token);

  const handleLogout = useCallback(async () => {
    console.log('Logout pressed');
    console.log('Current token before logout:', token);
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed from AsyncStorage');

      await clearUser();
      console.log('User data cleared from context');

      setRenderKey(prev => prev + 1);
      console.log('Render key incremented');

      setToken(null);
      console.log('setToken(null) called');

      const checkTokenAfterLogout = await AsyncStorage.getItem('token');
      console.log('Token check after logout:', checkTokenAfterLogout);
    } catch (error) {
      console.log('Error removing token:', error);
    }
  }, [clearUser]);

  console.log('=== App.jsx RE-RENDER ===');
  console.log('Render key:', renderKey);
  console.log('Current token state:', token);
  console.log('Token type:', typeof token);
  console.log('Token truthy check:', !!token);
  console.log('handleLogout function created:', typeof handleLogout);
  console.log('About to render navigation with token:', token, 'and handleLogout:', typeof handleLogout);

  if (isLoading) {
    return (
      <GestureHandlerRootView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StatusBar hidden={true} />
      </GestureHandlerRootView>
    );
  }

  return (
    <LogoutProvider handleLogout={handleLogout}>
      <GestureHandlerRootView>
        <StatusBar hidden={true} />
        <NavigationContainer key={`${token ? 'private' : 'public'}-${renderKey}`}>
          {navigation(token, handleLogout)}
        </NavigationContainer>
      </GestureHandlerRootView>
    </LogoutProvider>
  );
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ShippingProvider>
          <AppContent />
        </ShippingProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
