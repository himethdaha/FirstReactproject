import React, { createContext, useState } from "react";

// Contexts
export const AuthContext = createContext();

// Create a provider component
// Purpose is to share all data with the components
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // To set when logged in
  const login = () => {
    setIsLoggedIn(true);
  };

  // To set when logged out
  const logout = () => {
    setIsLoggedIn(false);
  };

  const authContextValues = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};
