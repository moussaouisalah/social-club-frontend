import React from "react";
import "./app.css";
import Navbar from "./components/navbar/Navbar";
import SidebarItem from "./components/sidebar-item/SidebarItem";
import SidebarTitle from "./components/sidebar-title/SidebarTitle";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <section className="main-content">
        <Sidebar>
          <SidebarItem text="Fil d'actualité" isSelected />
          <SidebarItem text="Créer un Club" />
          <SidebarTitle title="Mes Clubs" />
          <SidebarItem text="IEEE Ensa Fès" />
          <SidebarItem text="Junior Entreprises" />
        </Sidebar>
      </section>
      <div className="content"></div>
    </div>
  );
}

export default App;
