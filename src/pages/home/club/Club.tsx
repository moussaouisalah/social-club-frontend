import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClubMemberCard from "../../../components/club-member-card/ClubMemberCard";
import ClubProfile from "../../../components/club-profile/ClubProfile";
import Content from "../../../components/content/Content";
import CreatePostCard from "../../../components/create-post-card/CreatePostCard";
import EditClub from "../../../components/edit-club/EditClub";
import InviteMemberCard from "../../../components/invite-member-card/InviteMemberCard";
import PostCard from "../../../components/post-card/PostCard";
import PostModal from "../../../components/post-modal/PostModal";
import { clubProvider } from "../../../providers/data-providers/clubProvider";
import { memberProvider } from "../../../providers/data-providers/memberProvider";
import { postProvider } from "../../../providers/data-providers/postProvider";
import { roleProvider } from "../../../providers/data-providers/roleProvider";
import { userProvider } from "../../../providers/data-providers/userProvider";
import { Club as ClubType } from "../../../types/Club";
import { ClubTab, ClubTabType } from "../../../types/ClubTab";
import { Member, MemberType } from "../../../types/Member";
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
  const [userMember, setUserMember] = useState<Member | undefined>(undefined);
  const [posts, setPosts] = useState<Post[]>([]);
  const [tabs, setTabs] = useState<ClubTab[]>([]);
  const [selectedTab, setSelectedTab] = useState<ClubTab | undefined>(
    undefined
  );
  const [isEditDisabled, setEditDisabled] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

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
        if (userMemberArray.length > 0) {
          setUserMember(userMemberArray[0]);
          setUserRole(userMemberArray[0].role);
        }
      });
  }, [club, user]);

  // get roles
  useEffect(() => {
    if (!club) return;
    roleProvider
      .getManyByClub(club.id)
      .then((rolesList) => setRoles(rolesList));
  }, [club]);

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
    if (!club) return;
    let createdTabs: ClubTab[];
    if (!userRole || !userMember || userMember.type !== MemberType.member) {
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
  }, [userRole, userMember, club]);

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

  const handleEditClub = (name: string, primaryColor: string) => {
    if (!user || !club) return;
    setEditDisabled(true);
    clubProvider.updateClub(club.id, name, primaryColor).then((data) => {
      setClub({ ...club, name: data.name, primaryColor: data.primaryColor });
      setEditDisabled(false);
    });
  };

  const handleAddPostToList = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleAddMemberToList = (newMember: Member) => {
    setMembers([newMember, ...members]);
  };

  const handleChangeUserMemberType = (newType: MemberType) => {
    if (!user || !club) return;

    memberProvider.changeMember(user.id, club.id, newType).then((member) => {
      // TODO: handle data
      setUserMember(member);
      roleProvider.getOne(member.roleId).then((role) => {
        setUserRole(role);
      });
    });
  };

  const handleEditMemberInList = (userId: number, newMemberData: Member) => {
    setMembers(
      members.map((member) =>
        member.userId === userId ? newMemberData : member
      )
    );
  };

  const handleDeleteMemberFromList = (userId: number) => {
    setMembers(members.filter((member) => member.userId !== userId));
  };

  return (
    <>
      <ClubProfile
        name={club?.name || ""}
        tabs={tabs}
        membersCount={members.length}
        role={userRole}
        member={userMember}
        tabChangeHandler={handleTabChange}
        color={club?.primaryColor || undefined}
        changeUserMemberType={handleChangeUserMemberType}
      />
      <Content>
        {selectedTab?.type === ClubTabType.Discussion ? (
          <>
            {user && club && userRole?.canPost && (
              <CreatePostCard
                userId={user.id}
                clubId={club.id}
                profileImage={user.profileImage || undefined}
                color={club.primaryColor}
                addPostToList={handleAddPostToList}
              />
            )}
            {posts.map((post, key) => (
              <PostCard
                key={key}
                postId={post.id}
                clubId={id ? parseInt(id) : 1}
                userId={post.userId}
                firstName={(post.user?.firstName || "") as string}
                lastName={(post.user?.lastName || "") as string}
                dateTime={post.creationDateTime}
                profileImage={post.user?.profileImage || undefined}
                color={club?.primaryColor || undefined}
                text={post.text}
                image={post.image}
                likesCount={post.likesCount || 0}
                commentsCount={post.commentsCount || 0}
              />
            ))}
          </>
        ) : selectedTab?.type === ClubTabType.Membres ? (
          <>
            {user &&
              club &&
              userMember &&
              userMember.type === MemberType.member &&
              userRole?.canInvite && (
                <InviteMemberCard
                  color={club.primaryColor}
                  clubRoles={roles}
                  members={members}
                  clubId={club.id}
                  addMemberToList={handleAddMemberToList}
                />
              )}
            {members.map((member, key) => (
              <ClubMemberCard
                userId={member.userId}
                clubId={club?.id || 0}
                key={key}
                profileImage={member.user?.profileImage}
                firstName={member.user?.firstName || ""}
                lastName={member.user?.lastName || ""}
                role={member.role}
                member={member}
                currentUserRole={userRole}
                currentUserMember={userMember}
                color={club?.primaryColor || undefined}
                clubRoles={roles}
                editMemberInList={handleEditMemberInList}
                deleteMemberFromList={handleDeleteMemberFromList}
              />
            ))}
          </>
        ) : selectedTab?.type === ClubTabType.Gestion ? (
          <>
            <EditClub
              name={club?.name || ""}
              primaryColor={club?.primaryColor || ""}
              editHandler={handleEditClub}
              isButtonDisabled={!user || !club || isEditDisabled}
            />
          </>
        ) : (
          <></>
        )}
      </Content>
    </>
  );
};

export default Club;
