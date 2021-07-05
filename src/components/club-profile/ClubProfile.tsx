import React, { useEffect } from "react";
import "./club-profile.css";
import { primaryColor } from "../../theme.json";
import defaultCover from "../../assets/default-cover.jpg";
import defaultClub from "../../assets/default-club.png";
import { Role } from "../../types/Role";
import { ClubTab, ClubTabType } from "../../types/ClubTab";
import { Member, MemberType } from "../../types/Member";

type ClubProfileProps = {
  coverImage?: string;
  profileImage?: string;
  name: string;
  tabs: ClubTab[];
  color?: string;
  role?: Role;
  member?: Member;
  membersCount: number;
  tabChangeHandler: (tabType: ClubTabType) => void;
  changeUserMemberType: (newType: MemberType) => void;
};

const makeStyles = (color: string) => ({
  selectedTab: {
    color,
    borderBottom: "solid 5px",
    padding: "10px 20px 5px 20px",
  } as React.CSSProperties,
  color: {
    color,
  } as React.CSSProperties,
  backgroundColor: {
    backgroundColor: color,
  } as React.CSSProperties,
});

const ClubProfile = ({
  coverImage = defaultCover,
  profileImage = defaultClub,
  name,
  tabs,
  color = primaryColor,
  role,
  member,
  membersCount,
  tabChangeHandler,
  changeUserMemberType,
}: ClubProfileProps) => {
  const styles = makeStyles(color);
  return (
    <div className="profile-container">
      <img className="cover-image" src={coverImage} alt="cover" />
      <div className="inner-profile">
        <div className="profile-data-container">
          <div className="profile-data">
            <img className="profile-image" src={profileImage} alt="profile" />
            <div>
              <div className="profile-name" style={styles.color}>
                {name}
              </div>
              <div className="club-members-count">{membersCount} membres</div>
            </div>
          </div>
          {!role || !member ? (
            <button
              className="join-button"
              style={styles.backgroundColor}
              onClick={() => changeUserMemberType(MemberType.requested)}
            >
              Rejoindre
            </button>
          ) : member.memberType === MemberType.invited ? (
            <div>
              <button
                className="accept-button"
                onClick={() => changeUserMemberType(MemberType.member)}
              >
                Accepter
              </button>
              <button
                className="refuse-button"
                onClick={() => changeUserMemberType(MemberType.refused)}
              >
                Refuser
              </button>
            </div>
          ) : (
            member.memberType === MemberType.requested && <div>En Attente</div>
          )}
        </div>
        <div className="tabs">
          {tabs.map(({ name, isSelected, type }, key: number) => (
            <div
              className={"tab"}
              style={isSelected ? styles.selectedTab : {}}
              onClick={() => tabChangeHandler(type)}
              key={key}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
