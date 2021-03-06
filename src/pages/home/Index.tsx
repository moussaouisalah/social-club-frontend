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
import CreateClub from "./create-club/CreateClub";
import PostModal from "../../components/post-modal/PostModal";
import { Post } from "../../types/Post";
import { PostModalContext } from "../../contexts/PostModalContext";
import { PostModalProps } from "../../types/PostModalProps";
import { TOKEN_NAME } from "../../config.json";

const Index = () => {
  // TODO: add user to types
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [clubs, setClubs] = useState<ClubType[]>([]);
  const [openedPost, setOpenedPost] = useState<PostModalProps | undefined>(
    undefined
  );

  const history = useHistory();

  // check login and get user
  useEffect(() => {
    if (!localStorage.getItem(TOKEN_NAME)) {
      history.push("/login");
      return;
    }
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
        const clubsIds = members.map((member) => member.club.id);
        if (clubsIds.length === 0) return;
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

  const handleRedirectToCreateClub = () => {
    history.push("/create-club");
  };

  return (
    <PostModalContext.Provider
      value={{ post: openedPost, setPost: setOpenedPost }}
    >
      <div className={openedPost ? "App noscroll" : "App"}>
        {openedPost && <PostModal />}
        <Navbar user={user} />
        <section className="main-content">
          <Sidebar>
            <SidebarItem
              text="Fil d'actualit??"
              onClick={handleRedirectToHomePage}
            />
            <SidebarItem
              text="Cr??er un Club"
              onClick={handleRedirectToCreateClub}
            />
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
                  <User currentUser={user} setCurrentUser={setUser} />
                </Route>
                <Route path="/create-club" exact>
                  <CreateClub currentUser={user} />
                </Route>
                <Route path="/">
                  <HomePage user={user} />
                </Route>
              </Switch>
            </Router>
          </div>
        </section>
      </div>
    </PostModalContext.Provider>
  );
};

export default Index;
