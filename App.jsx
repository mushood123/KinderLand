import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { UserProvider, UserContext } from './src/context';
import { LogoutProvider } from './src/context/logoutContext';
import { useEffect, useState, useCallback, useContext } from 'react';
import { navigation } from './src/navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Wrapper component to access UserContext
const AppContent = ({ token, setToken, renderKey, setRenderKey }) => {
  const { clearUser, isLoading } = useContext(UserContext);

  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      console.log('=== Initial Token Check ===');
      console.log('Token fetched:', storedToken);
      console.log('Token type:', typeof storedToken);
      console.log('Token truthy check:', !!storedToken);
      // Only set token if it's not null, undefined, or empty string
      if (storedToken && storedToken.trim() !== '') {
        console.log('Setting valid token:', storedToken);
        setToken(storedToken);
      } else {
        console.log('Setting token to null (no valid token found)');
        setToken(null);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      setToken(null);
    }
  };

  // Fetch token on app start
  useEffect(() => {
    checkToken();
  }, []);

  // Monitor token changes and force re-render
  useEffect(() => {
    console.log('Token state changed to:', token);
    console.log('Token type after change:', typeof token);
    console.log('Token truthy check after change:', !!token);
    console.log('Current render key:', renderKey);

    // Force a re-render when token changes
    setRenderKey(prev => {
      console.log('Incrementing render key from', prev, 'to', prev + 1);
      return prev + 1;
    });
  }, [token]);

  const handleLogout = useCallback(async () => {
    console.log('Logout pressed');
    console.log('Current token before logout:', token);
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed from AsyncStorage');

      // Clear user data
      await clearUser();
      console.log('User data cleared');

      // Force a re-render by incrementing render key first
      setRenderKey(prev => prev + 1);
      console.log('Render key incremented');

      setToken(null);
      console.log('setToken(null) called');

      // Double-check that token was actually removed
      const checkTokenAfterLogout = await AsyncStorage.getItem('token');
      console.log('Token check after logout:', checkTokenAfterLogout);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }, [token, clearUser]);

  console.log('token from app', token);

  console.log('=== App.jsx RE-RENDER ===');
  console.log('Render key:', renderKey);
  console.log('Current token state:', token);
  console.log('Token type:', typeof token);
  console.log('Token truthy check:', !!token);
  console.log('handleLogout function created:', typeof handleLogout);
  console.log('UserContext loading:', isLoading);
  console.log(
    'About to render navigation with token:',
    token,
    'and handleLogout:',
    typeof handleLogout,
  );

  // Show loading screen while user data is being loaded
  if (isLoading) {
    return (
      <GestureHandlerRootView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StatusBar hidden={true} />
        {/* You can add a proper loading component here */}
      </GestureHandlerRootView>
    );
  }

  return (
    <LogoutProvider handleLogout={handleLogout}>
      <GestureHandlerRootView>
        <StatusBar hidden={true} />
        <NavigationContainer
          key={`${token ? 'private' : 'public'}-${renderKey}`}
        >
          {navigation(token, handleLogout)}
        </NavigationContainer>
      </GestureHandlerRootView>
    </LogoutProvider>
  );
};

function App() {
  const [token, setToken] = useState(null);
  const [renderKey, setRenderKey] = useState(0);

  return (
    <UserProvider>
      <AppContent
        token={token}
        setToken={setToken}
        renderKey={renderKey}
        setRenderKey={setRenderKey}
      />
    </UserProvider>
  );
}

export default App;
