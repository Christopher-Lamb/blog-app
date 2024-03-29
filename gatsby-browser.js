import "./src/styles/global.css";
import React from "react";

import { AuthProvider } from "./src/context/AuthContext";
import { UserProvider } from "./src/context/UserContext";

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <UserProvider>{element}</UserProvider>
    </AuthProvider>
  );
};
