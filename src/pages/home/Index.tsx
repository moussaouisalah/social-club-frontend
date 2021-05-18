import React, { useEffect, useState } from "react";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import SidebarItem from "../../components/sidebar-item/SidebarItem";
import SidebarTitle from "../../components/sidebar-title/SidebarTitle";
import Sidebar from "../../components/sidebar/Sidebar";
import { authProvider } from "../../providers/authProvider";
import { clubProvider } from "../../providers/data-providers/clubProvider";
import { memberProvider } from "../../providers/data-providers/memberProvider";
import { User as UserType } from "../../types/User";
import { Club as ClubType } from "../../types/Club";
import Club from "./club/Club";
import User from "./user/User";
import HomePage from "./homepage/HomePage";

const Index = () => {
  // TODO: add user to types
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [clubs, setClubs] = useState<ClubType[]>([]);

  const history = useHistory();

  // check login and get user
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

  // get user clubs after the user is loaded
  useEffect(() => {
    if (!user) return;
    memberProvider
      .getManyByUser(user.id)
      .then((members) => {
        const clubsIds = members.map((member) => member.clubId);
        clubProvider.getMany(clubsIds).then((clubs) => setClubs(clubs));
      })
      .catch((error) => {});
  }, [user]);

  const handleRedirectToClub = (clubId: number) => {
    history.push("/club/" + clubId);
  };

  const handleRedirectToHomePage = () => {
    history.push("/");
  };

  return (
    <div className="App">
      <Navbar user={user} />
      <section className="main-content">
        <Sidebar>
          <SidebarItem
            text="Fil d'actualité"
            onClick={handleRedirectToHomePage}
          />
          <SidebarItem text="Créer un Club" />
          <SidebarTitle title="Mes Clubs" />
          {clubs.map((club, key) => (
            <SidebarItem
              text={club.name}
              color={club.primaryColor}
              key={key}
              onClick={() => handleRedirectToClub(club.id)}
            />
          ))}
        </Sidebar>
        <div className="content">
          <Router history={history}>
            <Switch>
              <Route path="/club/:id">
                <Club user={user} />
              </Route>
              <Route path="/user/:id">
                <User />
              </Route>
              <Route path="/">
                <HomePage user={user} />
              </Route>
            </Switch>
          </Router>
        </div>
      </section>
    </div>
  );
};

export default Index;
