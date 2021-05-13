import React from "react";
import "./app.css";
import ClubMemberCard from "./components/club-member-card/ClubMemberCard";
import ClubProfile from "./components/club-profile/ClubProfile";
import Content from "./components/content/Content";
import CreatePostCard from "./components/create-post-card/CreatePostCard";
import InviteMemberCard from "./components/invite-member-card/InviteMemberCard";
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
            membersCount={5}
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
            <ClubMemberCard
              firstName="salah"
              lastName="moussaoui"
              role="editeur"
              currentUserRole={{
                id: 1,
                name: "test",
                canEdit: true,
                canRemove: true,
                canPost: true,
                canInvite: true,
              }}
            />
            <InviteMemberCard
              clubRoles={[
                {
                  id: 1,
                  name: "test",
                  canEdit: true,
                  canRemove: true,
                  canPost: true,
                  canInvite: true,
                },
                {
                  id: 1,
                  name: "test2",
                  canEdit: true,
                  canRemove: true,
                  canPost: true,
                  canInvite: true,
                },
                {
                  id: 1,
                  name: "test3",
                  canEdit: true,
                  canRemove: true,
                  canPost: true,
                  canInvite: true,
                },
              ]}
            />
            <CreatePostCard />
          </Content>
        </div>
      </section>
    </div>
  );
}

export default App;
