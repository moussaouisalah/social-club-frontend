import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo"></div>
      <div>
        <input type="text" placeholder="Rechercher" className="text-input" />
      </div>
      <div>
        <div className="nav-user">
          <div className="user-image"></div>
          <div className="user-name">Salaheddine Moussaoui</div>
          <div className="user-dropdown">t</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
