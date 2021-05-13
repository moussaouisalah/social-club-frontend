import React from "react";
import "./app.css";
import Content from "./components/content/Content";
import Navbar from "./components/navbar/Navbar";
import SidebarItem from "./components/sidebar-item/SidebarItem";
import SidebarTitle from "./components/sidebar-title/SidebarTitle";
import Sidebar from "./components/sidebar/Sidebar";
import UserClubCard from "./components/user-club-card/UserClubCard";
import UserProfile from "./components/user-profile/UserProfile";

function App() {
  return (
    <div className="App">
      <Navbar />
      <section className="main-content">
        <Sidebar>
          <SidebarItem text="Fil d'actualité" isSelected />
          <SidebarItem text="Créer un Club" />
          <SidebarTitle title="Mes Clubs" />
          <SidebarItem text="IEEE Ensa Fès" color="#347DA7" />
          <SidebarItem text="Junior Entreprises" color="#A7345B" />
        </Sidebar>
        <div className="content">
          <UserProfile
            name="salaheddine moussaoui"
            tabs={[{ onClick: () => null, name: "Clubs", isSelected: true }]}
          />
          <Content>
            <UserClubCard name="IEEE ENSA Fès" role="Editeur" color="#347DA7" />
          </Content>
        </div>
      </section>
    </div>
  );
}

export default App;
