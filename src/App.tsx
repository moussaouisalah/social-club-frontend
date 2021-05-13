import React from "react";
import "./app.css";
import ClubProfile from "./components/club-profile/ClubProfile";
import Content from "./components/content/Content";
import Navbar from "./components/navbar/Navbar";
import PostCard from "./components/post-card/PostCard";
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
          <ClubProfile
            name="IEEE ENSA Fès"
            tabs={[{ onClick: () => null, name: "Clubs", isSelected: true }]}
          />
          <Content>
            <UserClubCard name="IEEE ENSA Fès" role="Editeur" color="#347DA7" />
            <PostCard
              firstName="Salaheddine"
              lastName="Moussaoui"
              dateTime={new Date()}
              text="test dsqdaz oazuea dsq wxczadepodua pjdqs azioj kvdfspojfa azdeio p^qslkjfa paoih sqdazeaz zasqdza az dezadesqdf azd az dqs azd azd azdqs azefd a dsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqsqddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
              likesCount={0}
              clubName="IEEE"
              image="https://via.placeholder.com/150"
              commentsCount={0}
            />
          </Content>
        </div>
      </section>
    </div>
  );
}

export default App;
