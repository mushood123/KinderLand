import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // Load user data from AsyncStorage on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log('User data loaded from storage:', parsedUser);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Custom setUser function that also saves to AsyncStorage
  const setUserAndPersist = async (userData) => {
    try {
      setUser(userData);
      if (userData && Object.keys(userData).length > 0) {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('User data saved to storage:', userData);
      } else {
        await AsyncStorage.removeItem('userData');
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
      await AsyncStorage.removeItem('userData');
      console.log('User data cleared from storage');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndPersist, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};