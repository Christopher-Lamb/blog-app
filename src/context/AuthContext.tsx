import React, { createContext, useContext, useState, useEffect } from "react";
import { hasTokenExpired, createToken, removeToken } from "../utils/tokenRefresh";
import { refreshToken, logoutUser } from "../utils/userAPI";
import useInterval from "../hooks/useInterval";
import { navigate } from "gatsby";

interface AuthContextProps {
  checkAuthenticated: () => boolean;
  isAuthenticated: boolean | null;
  loginSuccess: () => void;
  handleLogout: () => void;
}

const defaultContextValue: Partial<AuthContextProps> = {
  checkAuthenticated: undefined,
  isAuthenticated: undefined,
  loginSuccess: undefined,
  handleLogout: undefined,
};

const AuthContext = createContext(defaultContextValue);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  const loginSuccess = () => {
    setIsAuthenticated(true);
    navigate("/");
    createToken();
  };

  useInterval(() => {
    if (isAuthenticated) handleToken();
  }, 2700000);

  const handleToken = async () => {
    const { isExpired } = hasTokenExpired();
    console.log({ isExpired });
    if (isExpired) {
      // Refresh token
      // /refresh-token on a restricted route
      // The is authenticated will be based on the response from the server
      try {
        await refreshToken();
        createToken();
        if (!isAuthenticated) setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else if (isExpired === false) {
      // If the token is not expired
      setIsAuthenticated(true);
    } else if (isExpired === null) {
      //IF Null
      setIsAuthenticated(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    logoutUser();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    handleToken();
  }, []);

  return <AuthContext.Provider value={{ handleLogout, loginSuccess, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
