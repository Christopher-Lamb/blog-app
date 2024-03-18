import React from "react";
import { Link } from "gatsby";

const Navbar: React.FC = () => {
  return (
    <div className="h-med dark-primary jost flex items-center justify-center">
      <div className="flex justify-between max-w-four 2xl:max-w-five w-full ">
        <nav>
          <ul className="flex gap-2xsmall">
            <Link to="/blogs">
              <li>Blogs</li>
            </Link>
            <Link to="create-blog">
              <li>Create Blog</li>
            </Link>
            <Link to="/account">
              <li>Account</li>
            </Link>
          </ul>
        </nav>
        <Link to="/sign-up">
          <span>Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
