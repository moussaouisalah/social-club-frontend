import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Content from "../../../components/content/Content";
import UserClubCard from "../../../components/user-club-card/UserClubCard";
import UserProfile from "../../../components/user-profile/UserProfile";
import { clubProvider } from "../../../providers/data-providers/clubProvider";
import { memberProvider } from "../../../providers/data-providers/memberProvider";
import { roleProvider } from "../../../providers/data-providers/roleProvider";
import { userProvider } from "../../../providers/data-providers/userProvider";
import { Member } from "../../../types/Member";
import { User as UserType } from "../../../types/User";
import { UserTab, UserTabType } from "../../../types/UserTab";

type UserProps = {
  currentUser?: UserType;
};

type UserParams = {
  id?: string;
};

const User = ({ currentUser }: UserProps) => {
  const { id } = useParams<UserParams>();
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [members, setMembers] = useState<Member[]>([]);
  const [tabs, setTabs] = useState<UserTab[]>([]);
  const [selectedTab, setSelectedTab] =
    useState<UserTab | undefined>(undefined);

  // get user
  useEffect(() => {
    if (!id) return;
    userProvider.getOne(parseInt(id)).then((user) => setUser(user));
  }, [id]);

  // get members
  useEffect(() => {
    if (!user) return;
    memberProvider
      .getManyByUser(user.id)
      .then(async (members) => {
        return Promise.all(
          members.map(async (member) => {
            // fill club
            member.club = await clubProvider.getOne(member.userId);
            // fill role
            member.role = await roleProvider.getOne(member.roleId);
            return member;
          })
        );
      })
      .then((members) => setMembers(members));
  }, [user]);

  // create tabs
  useEffect(() => {
    console.log("here");
    if (!user) return;
    let createdTabs: UserTab[];
    console.log("here");
    if (!currentUser || user.id !== currentUser.id) {
      createdTabs = [
        {
          name: "Clubs",
          isSelected: true,
          type: UserTabType.Clubs,
        },
      ];
    } else {
      createdTabs = [
        {
          name: "Clubs",
          isSelected: true,
          type: UserTabType.Clubs,
        },
        {
          name: "Gestion",
          isSelected: false,
          type: UserTabType.Gestion,
        },
      ];
    }
    console.trace(user.id);
    console.trace(currentUser);
    console.trace(!currentUser || user.id !== currentUser.id);
    console.log("setting tabs as: " + JSON.stringify(createdTabs));
    setTabs(createdTabs);
  }, [user, currentUser]);

  // set selected tab on tabs change
  useEffect(() => {
    if (tabs.length === 0) return;
    setSelectedTab(tabs.find((tab) => tab.isSelected));
  }, [tabs]);

  const handleTabChange = (newSelectedTag: UserTabType) => {
    console.log("old tabs: " + JSON.stringify(tabs));
    setTabs(
      tabs.map((tab) => ({ ...tab, isSelected: tab.type === newSelectedTag }))
    );
  };

  return (
    <>
      <UserProfile
        firstName={user?.firstName || ""}
        lastName={user?.lastName || ""}
        coverImage={user?.coverImage}
        profileImage={user?.profileImage}
        tabs={tabs}
        tabChangeHandler={handleTabChange}
      />
      <Content>
        {selectedTab?.type === UserTabType.Clubs ? (
          members.map((member, key) => (
            <UserClubCard
              key={key}
              id={member.clubId}
              image={member.club?.profileImage}
              name={member.club?.name || ""}
              role={member.role?.name || ""}
              color={member.club?.primaryColor}
            />
          ))
        ) : (
          <></>
        )}
      </Content>
    </>
  );
};

export default User;
