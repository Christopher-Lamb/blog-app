import React, { createContext, useContext, useState, useEffect } from "react";
import { getUser, updateUser } from "../utils/userAPI";
import { useAuthContext } from "./AuthContext";
import { AxiosResponse } from "axios";

interface User {
  name: string;
  email: string;
  username: string;
  profileImg: string;
}

interface UserContextProps {
  userObj: User | null;
  changeName: (text: string) => void;
  changeImg: (file: string) => void;
}

const defaultContextValue: Partial<UserContextProps> = {
  userObj: undefined,
  changeName: undefined,
};

const UserContext = createContext(defaultContextValue);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userObj, setUserObj] = useState<User>({ username: "", name: "", email: "", profileImg: "" });
  const { isAuthenticated } = useAuthContext();

  const handleUserData = async () => {
    // Try to get userData from session storage
    const userDataString = sessionStorage.getItem("userData");

    // Initialize userData as a User type or null
    let userData: User | null = userDataString ? JSON.parse(userDataString) : null;

    // If userData doesn't exist, fetch it and update session storage
    if (!userData) {
      try {
        // Assuming getUser() returns a User object or throws an error
        const user: User = await getUser();
        userData = user; // Update userData with the fetched user

        // Corrected the typo in the key ("userDatta" -> "userData")
        sessionStorage.setItem("userData", JSON.stringify(user));
      } catch (error) {
        console.error(error);
      }
    }
    if (userData) setUserObj(userData);
  };

  const changeName = async (text: string) => {
    setUserObj((prevUserObj) => ({ ...prevUserObj, name: text }));
    // Try to get userData from session storage
    const newData = JSON.parse(JSON.stringify(userObj));
    newData["name"] = text;
    sessionStorage.setItem("userData", JSON.stringify(newData));
    //Backend
    try {
      const response: AxiosResponse = await updateUser({ name: text });
    } catch (error) {
      throw error;
    }
  };

  const changeImg = async (file: string) => {
    // upload image to cloundinary and return url link to the image
    // Try to get userData from session storage
    const newData = JSON.parse(JSON.stringify(userObj));
    newData["profileImg"] = file;
    setUserObj((prevUserObj) => ({ ...prevUserObj, profileImg: file }));
    sessionStorage.setItem("userData", JSON.stringify(newData));

    //Backend
    try {
      const response: AxiosResponse = await updateUser({ profileImg: file });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // console.log({ isAuthenticated });
    if (isAuthenticated) {
      handleUserData();
    }
    if (!isAuthenticated) {
      sessionStorage.removeItem("userData");
    }
    //We are storing user Data in localstorage but we only handle actions based on the UID in the token
    // on logout we are clearing the local storage
  }, [isAuthenticated]);

  // const getUser = () => {};

  return <UserContext.Provider value={{ userObj, changeName, changeImg }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
