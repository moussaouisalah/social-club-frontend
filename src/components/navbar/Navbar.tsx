import React, { useState } from "react";
import "./navbar.css";
import defaultImage from "../../assets/default-profile.jpg";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { User } from "../../types/User";
import { ClickAwayListener } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { authProvider } from "../../providers/authProvider";

type NavbarProps = {
  user: User | undefined;
};

const Navbar = ({ user }: NavbarProps) => {
  const [isDropDownEnabled, setDropDownEnabled] = useState(false);

  const history = useHistory();

  const handleRedirectToProfile = () => {
    setDropDownEnabled(false);
    user && history.push("/user/" + user.id);
  };

  const handleLogout = () => {
    setDropDownEnabled(false);
    authProvider.logout();
    history.push("/login");
  };

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
              <div
                className="user-dropdown"
                onClick={() => setDropDownEnabled(!isDropDownEnabled)}
              >
                <KeyboardArrowDownIcon />
              </div>
            </>
          )}
          {isDropDownEnabled && (
            <ClickAwayListener onClickAway={() => setDropDownEnabled(false)}>
              <div className="user-dropdown-modal">
                <div
                  className="user-dropdown-modal-item"
                  onClick={handleRedirectToProfile}
                >
                  Profil
                </div>
                <div
                  className="user-dropdown-modal-item"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </div>
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
