import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ClubProfile from "../../components/club-profile/ClubProfile";
import Content from "../../components/content/Content";
import Navbar from "../../components/navbar/Navbar";
import SidebarItem from "../../components/sidebar-item/SidebarItem";
import SidebarTitle from "../../components/sidebar-title/SidebarTitle";
import Sidebar from "../../components/sidebar/Sidebar";
import { authProvider } from "../../providers/authProvider";

const Index = () => {
  // TODO: add user to types
  const [user, setUser]: any = useState(null);

  const history = useHistory();

  useEffect(() => {
    authProvider
      .getIdentity()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        authProvider.logout();
        history.push("/login");
      });
  }, []);

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
            membersCount={5}
          />
          <Content></Content>
        </div>
      </section>
    </div>
  );
};

export default Index;
