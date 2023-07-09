import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPlayingWithAi, setIsPlayingWithAi] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const signup = () => {
    setIsLoggedIn(true);
  };

  const playwithai = () => {
    setIsPlayingWithAi(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isPlayingWithAi, login, signup, playwithai }}
    >
      {children}
    </AuthContext.Provider>
  );
};
