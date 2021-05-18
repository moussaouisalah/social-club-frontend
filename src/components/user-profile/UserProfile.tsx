import React from "react";
import "./user-profile.css";
import defaultCover from "../../assets/default-cover.jpg";
import defaultProfile from "../../assets/default-profile.jpg";
import { UserTab, UserTabType } from "../../types/UserTab";

type UserProfileProps = {
  coverImage?: string;
  profileImage?: string;
  firstName: string;
  lastName: string;
  tabs: UserTab[];
  tabChangeHandler: (tabType: UserTabType) => void;
};

const UserProfile = ({
  coverImage,
  profileImage,
  firstName,
  lastName,
  tabs,
  tabChangeHandler,
}: UserProfileProps) => {
  return (
    <div className="profile-container">
      <img
        className="cover-image"
        src={coverImage || defaultCover}
        alt="cover"
      />
      <div className="inner-profile">
        <div className="profile-data">
          <img
            className="profile-image"
            src={profileImage || defaultProfile}
            alt="profile"
          />
          <div className="profile-name">
            {firstName} {lastName}
          </div>
        </div>
        <div className="tabs">
          {tabs.map(({ name, isSelected, type }, key: number) => (
            <div
              className={isSelected ? "tab selected-tab" : "tab"}
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

export default UserProfile;
