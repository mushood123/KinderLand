import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from AsyncStorage on app startup
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log('User data loaded from storage:', parsedUser);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Custom setUser function that also persists to AsyncStorage
  const updateUser = async userData => {
    try {
      console.log('updateUser called with:', userData);
      setUser(userData);
      if (userData && Object.keys(userData).length > 0) {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        console.log('User data saved to storage:', userData);
      } else {
        await AsyncStorage.removeItem('user');
        console.log('User data removed from storage');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Clear user data (for logout)
  const clearUser = async () => {
    try {
      setUser({});
      await AsyncStorage.removeItem('user');
      console.log('User data cleared from storage');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: updateUser,
        clearUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
