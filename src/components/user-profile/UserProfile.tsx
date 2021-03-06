import React from "react";
import "./user-profile.css";
import defaultCover from "../../assets/default-cover.jpg";
import defaultProfile from "../../assets/default-profile.jpg";
import { UserTab, UserTabType } from "../../types/UserTab";
import { User } from "../../types/User";
import { SERVER_URL } from "../../config.json";

type UserProfileProps = {
  user: User | undefined;
  tabs: UserTab[];
  tabChangeHandler: (tabType: UserTabType) => void;
};

const UserProfile = ({ user, tabs, tabChangeHandler }: UserProfileProps) => {
  return (
    <div className="profile-container">
      <img
        className="cover-image"
        src={user?.coverImage ? SERVER_URL + user?.coverImage : defaultCover}
        alt="cover"
      />
      <div className="inner-profile">
        <div className="profile-data">
          <img
            className="profile-image"
            src={
              user?.profileImage
                ? SERVER_URL + user?.profileImage
                : defaultProfile
            }
            alt="profile"
          />
          <div className="profile-name">
            {user?.firstName} {user?.lastName}
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
