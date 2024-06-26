import React from "react";
import { Link } from "gatsby";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
const Navbar: React.FC = () => {
  const { isAuthenticated, handleLogout } = useAuthContext();
  const { userObj } = useUserContext();

  const handleLogoutBtn = () => {
    if (handleLogout) handleLogout();
  };

  return (
    <div className="h-med dark-primary jost flex items-center justify-center">
      <div className="flex justify-between max-w-four 2xl:max-w-five w-full ">
        <nav>
          <ul className="flex gap-2xsmall">
            <Link to="/">
              <li>Blogs</li>
            </Link>
            <Link to="/account">
              <li>Account</li>
            </Link>
          </ul>
        </nav>
        <div className="flex gap-2xsmall">
          {!isAuthenticated ? (
            <>
              <Link to="/sign-up">
                <span>Sign up</span>
              </Link>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </>
          ) : (
            <>
              <span>{userObj?.username}</span>
              <button aria-label="Logout" onClick={handleLogoutBtn}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
