import React, { ComponentType, useEffect, useRef } from "react";
import { useUserContext } from "../../context/UserContext"; // Fixed import path
import { navigate, PageProps } from "gatsby";

interface AuthenticatedProps extends PageProps {
  WrappedComponent: ComponentType<any>; // Renamed to WrappedComponent for clarity, added 'any' to specify props but consider defining a more specific type
}

const Authenticated: React.FC<AuthenticatedProps> = ({ WrappedComponent, ...pageProps }) => {
  const { isAuthenticated } = useUserContext();
  const isInitialMount = useRef(true);

  useEffect(() => {
    console.log({ isAuthenticated });
    // Skip the effect on initial mount
    if (isAuthenticated === false) {
      // Navigate to login, ensure you're using the correct route
      navigate("/login");
    }
  }, [isAuthenticated]); // Depend on isAuthenticated to trigger the effect

  return isAuthenticated === true ? <WrappedComponent {...pageProps} /> : null;
};

export default Authenticated;
