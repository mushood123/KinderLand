import React, { createContext, useContext } from 'react';

const LogoutContext = createContext();

export const LogoutProvider = ({ children, handleLogout }) => {
  return (
    <LogoutContext.Provider value={handleLogout}>
      {children}
    </LogoutContext.Provider>
  );
};

export const useLogout = () => {
  const context = useContext(LogoutContext);
  if (context === undefined) {
    throw new Error('useLogout must be used within a LogoutProvider');
  }
  return context;
}; 