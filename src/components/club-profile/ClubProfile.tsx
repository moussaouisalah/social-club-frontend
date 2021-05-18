import React from "react";
import "./club-profile.css";
import { primaryColor } from "../../theme.json";
import defaultCover from "../../assets/default-cover.jpg";
import defaultClub from "../../assets/default-club.png";
import { Role } from "../../types/Role";
import { ClubTab, ClubTabType } from "../../types/ClubTab";

type ClubProfileProps = {
  coverImage?: string;
  profileImage?: string;
  name: string;
  tabs: ClubTab[];
  color?: string;
  role?: Role | undefined;
  membersCount: number;
  tabChangeHandler: (tabType: ClubTabType) => void;
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
  role = undefined,
  membersCount,
  tabChangeHandler,
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
          {!role && (
            <button className="join-button" style={styles.backgroundColor}>
              Rejoindre
            </button>
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
