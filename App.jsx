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

      // Only set token if it's not null, undefined, or empty string
      if (storedToken && storedToken.trim() !== '') {
        setToken(storedToken);
      } else {
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
    // Force a re-render when token changes
    setRenderKey(prev => {
      console.log('Incrementing render key from', prev, 'to', prev + 1);
      return prev + 1;
    });
  }, [token]);

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('token');

      // Clear user data
      await clearUser();

      // Force a re-render by incrementing render key first
      setRenderKey(prev => prev + 1);

      setToken(null);

      // Double-check that token was actually removed
      const checkTokenAfterLogout = await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }, [token, clearUser]);

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
