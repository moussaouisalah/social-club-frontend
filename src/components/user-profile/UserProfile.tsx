import React from "react";
import "./user-profile.css";
import defaultCover from "../../assets/default-cover.jpg";
import defaultProfile from "../../assets/default-profile.jpg";

type UserProfileProps = {
  coverImage?: string;
  profileImage?: string;
  name: string;
  tabs: [{ name: string; onClick: () => void; isSelected?: boolean }];
};

const UserProfile = ({
  coverImage = defaultCover,
  profileImage = defaultProfile,
  name,
  tabs,
}: UserProfileProps) => {
  return (
    <div className="profile-container">
      <img className="cover-image" src={coverImage} alt="cover" />
      <div className="inner-profile">
        <div className="profile-data">
          <img className="profile-image" src={profileImage} alt="profile" />
          <div className="profile-name">{name}</div>
        </div>
        <div className="tabs">
          {tabs.map(({ name, onClick, isSelected }, key: number) => (
            <div
              className={isSelected ? "tab selected-tab" : "tab"}
              onClick={onClick}
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

export default UserProfile;
