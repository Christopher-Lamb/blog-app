import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextProps {
  isLoggedIn: boolean;
}

const defaultContextValue: Partial<UserContextProps> = {
  isLoggedIn: undefined,
};

const UserContext = createContext(defaultContextValue);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    //Switch to tokenizing and saving username saving in cookies 
    // Temporary
    const existingValue = localStorage.getItem("user-account");
    const defaultValue = false;
    if (existingValue === null) {
      // The key does not exist, so set it with the default value
      localStorage.setItem("user-account", JSON.stringify(defaultValue));
      setIsLoggedIn(defaultValue);
    } else {
      // The key exists, parse its value and return it
      setIsLoggedIn(JSON.parse(existingValue));
    }
  }, []);

  return <UserContext.Provider value={{ isLoggedIn }}>{children}</UserContext.Provider>;
};
