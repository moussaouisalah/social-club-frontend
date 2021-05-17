import React from "react";
import "./navbar.css";
import defaultImage from "../../assets/default-profile.jpg";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { User } from "../../types/User";

type NavbarProps = {
  user: User | undefined;
};

const Navbar = ({ user }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="logo"></div>
      <div>
        <input type="text" placeholder="Rechercher" className="text-input" />
      </div>
      <div>
        <div className="nav-user">
          {user && (
            <>
              <img
                className="user-image"
                src={(user.profileImage || defaultImage) as string}
                alt="user"
              />
              <div className="user-name">
                {user.firstName} {user.lastName}
              </div>
              <div className="user-dropdown">
                <KeyboardArrowDownIcon />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
