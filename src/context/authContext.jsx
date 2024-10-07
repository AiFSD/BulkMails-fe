// context / authContext
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

 
const login = (newToken, newUser) => {
  console.log("Updating token state:", newToken);
  console.log("Updating user state with userId:", newUser.userId);
  setToken(newToken);
  setUser(newUser);
  localStorage.setItem("token", newToken);
  localStorage.setItem("user", JSON.stringify(newUser));
};



  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
