import "./src/styles/global.css";
import React from "react";

import { UserProvider } from "./src/context/UserContext";

export const wrapRootElement = ({ element }) => {
  return (
    <UserProvider>
      {element}
    </UserProvider>
  );
};
