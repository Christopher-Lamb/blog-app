import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { hasTokenExpired, createToken, removeToken } from "../utils/tokenRefresh";
import { refreshToken, logoutUser } from "../utils/apiService";
import useInterval from "../hooks/useInterval";

interface UserContextProps {
  checkAuthenticated: () => boolean;
  isAuthenticated: boolean | null;
  loginSuccess: () => void;
  handleLogout: () => void;
}

const defaultContextValue: Partial<UserContextProps> = {
  checkAuthenticated: undefined,
  isAuthenticated: undefined,
  loginSuccess: undefined,
  handleLogout: undefined,
};

const UserContext = createContext(defaultContextValue);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  const loginSuccess = () => {
    setIsAuthenticated(true);
    createToken();
  };

  useInterval(() => {
    if (isAuthenticated) handleToken();
  }, 120000);

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

  return <UserContext.Provider value={{ handleLogout, loginSuccess, isAuthenticated }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
