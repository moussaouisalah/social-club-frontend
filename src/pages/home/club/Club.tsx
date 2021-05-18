import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClubMemberCard from "../../../components/club-member-card/ClubMemberCard";
import ClubProfile from "../../../components/club-profile/ClubProfile";
import Content from "../../../components/content/Content";
import PostCard from "../../../components/post-card/PostCard";
import { clubProvider } from "../../../providers/data-providers/clubProvider";
import { memberProvider } from "../../../providers/data-providers/memberProvider";
import { postProvider } from "../../../providers/data-providers/postProvider";
import { roleProvider } from "../../../providers/data-providers/roleProvider";
import { userProvider } from "../../../providers/data-providers/userProvider";
import { Club as ClubType } from "../../../types/Club";
import { ClubTab, ClubTabType } from "../../../types/ClubTab";
import { Member } from "../../../types/Member";
import { Post } from "../../../types/Post";
import { Role } from "../../../types/Role";
import { User } from "../../../types/User";

type ClubProps = {
  user?: User;
};

type ClubParams = {
  id?: string;
};

const Club = ({ user }: ClubProps) => {
  const { id } = useParams<ClubParams>();
  const [club, setClub] = useState<ClubType | undefined>(undefined);
  const [members, setMembers] = useState<Member[]>([]);
  const [userRole, setUserRole] = useState<Role | undefined>(undefined);
  const [posts, setPosts] = useState<Post[]>([]);
  const [tabs, setTabs] = useState<ClubTab[]>([]);
  const [selectedTab, setSelectedTab] =
    useState<ClubTab | undefined>(undefined);

  // get Club
  useEffect(() => {
    if (!id) return;
    clubProvider.getOne(parseInt(id)).then((club) => setClub(club));
  }, [id]);

  // get members
  useEffect(() => {
    if (!club || !user) return;
    memberProvider
      .getManyByClub(club.id)
      .then(async (members) => {
        return Promise.all(
          members.map(async (member) => {
            // fill user
            member.user = await userProvider.getOne(member.userId);
            // fill role
            member.role = await roleProvider.getOne(member.roleId);
            return member;
          })
        );
      })
      .then((members) => {
        setMembers(members);
        // set user role
        const userMemberArray = members.filter(
          (member) => member.userId === user.id
        );
        if (userMemberArray.length > 0) setUserRole(userMemberArray[0].role);
      });
  }, [club, user]);

  // get posts
  useEffect(() => {
    if (!club) return;
    postProvider
      .getManyByClub(club.id)
      .then(async (posts) => {
        return Promise.all(
          posts.map(async (post) => {
            // fill user
            post.user = await userProvider.getOne(post.userId);
            return post;
          })
        );
      })
      .then((posts) => setPosts(posts));
  }, [club]);

  // create tabs
  useEffect(() => {
    console.log("here");
    if (!club) return;
    let createdTabs: ClubTab[];
    console.log("here");
    if (!userRole) {
      createdTabs = [
        {
          name: "Membres",
          isSelected: true,
          type: ClubTabType.Membres,
        },
      ];
    } else if (userRole.canEdit) {
      createdTabs = [
        {
          name: "Discussion",
          isSelected: true,
          type: ClubTabType.Discussion,
        },
        {
          name: "Membres",
          isSelected: false,
          type: ClubTabType.Membres,
        },
        {
          name: "Gestion",
          isSelected: false,
          type: ClubTabType.Gestion,
        },
      ];
    } else {
      createdTabs = [
        {
          name: "Discussion",
          isSelected: true,
          type: ClubTabType.Discussion,
        },
        {
          name: "Membres",
          isSelected: false,
          type: ClubTabType.Membres,
        },
      ];
    }
    console.log("setting tabs as: " + JSON.stringify(createdTabs));
    setTabs(createdTabs);
  }, [userRole]);

  // set selected tab on tabs change
  useEffect(() => {
    if (tabs.length === 0) return;
    setSelectedTab(tabs.find((tab) => tab.isSelected));
  }, [tabs]);

  const handleTabChange = (newSelectedTag: ClubTabType) => {
    console.log("old tabs: " + JSON.stringify(tabs));
    setTabs(
      tabs.map((tab) => ({ ...tab, isSelected: tab.type === newSelectedTag }))
    );
  };

  console.log("render tabs:" + tabs);
  return (
    <>
      <ClubProfile
        name={club?.name || ""}
        tabs={tabs}
        membersCount={members.length}
        role={userRole}
        tabChangeHandler={handleTabChange}
        color={club?.primaryColor || undefined}
      />
      <Content>
        {selectedTab?.type === ClubTabType.Discussion ? (
          posts.map((post, key) => (
            <PostCard
              key={key}
              firstName={(post.user?.firstName || "") as string}
              lastName={(post.user?.lastName || "") as string}
              dateTime={post.creationDateTime}
              profileImage={club?.profileImage || undefined}
              color={club?.primaryColor || undefined}
              text={post.text}
              image={post.image}
              likesCount={post.likesCount || 0}
              commentsCount={post.commentsCount || 0}
            />
          ))
        ) : selectedTab?.type === ClubTabType.Membres ? (
          members.map((member, key) => (
            <ClubMemberCard
              key={key}
              profileImage={member.user?.profileImage}
              firstName={member.user?.firstName || ""}
              lastName={member.user?.lastName || ""}
              role={member.role}
              currentUserRole={userRole}
              color={club?.primaryColor || undefined}
            />
          ))
        ) : selectedTab?.type === ClubTabType.Gestion ? (
          <></>
        ) : (
          <></>
        )}
      </Content>
    </>
  );
};

export default Club;
