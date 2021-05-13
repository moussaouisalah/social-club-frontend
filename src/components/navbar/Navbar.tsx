import React from "react";
import "./navbar.css";
import defaultImage from "../../assets/default-profile.jpg";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo"></div>
      <div>
        <input type="text" placeholder="Rechercher" className="text-input" />
      </div>
      <div>
        <div className="nav-user">
          <img className="user-image" src={defaultImage} alt="user" />
          <div className="user-name">Salaheddine Moussaoui</div>
          <div className="user-dropdown">
            <KeyboardArrowDownIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
