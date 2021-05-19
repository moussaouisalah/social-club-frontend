import React from "react";
import { Role } from "../../types/Role";
import defaultProfile from "../../assets/default-profile.jpg";
import "./club-member-card.css";
import { Create, Delete } from "@material-ui/icons";
import { primaryColor } from "../../theme.json";
import { useHistory } from "react-router-dom";

type ClubMemberCardProps = {
  userId: number;
  profileImage?: string;
  firstName: string;
  lastName: string;
  role?: Role;
  currentUserRole?: Role;
  color?: string;
};

const makeStyles = (color: string) => ({
  color: {
    color,
  } as React.CSSProperties,
  border: {
    border: "solid 1px " + color,
  } as React.CSSProperties,
  clickable: {
    cursor: "pointer",
  },
});

const ClubMemberCard = ({
  userId,
  profileImage = defaultProfile,
  firstName,
  lastName,
  role,
  currentUserRole,
  color = primaryColor,
}: ClubMemberCardProps) => {
  const history = useHistory();

  const handleRedirectToUser = () => {
    history.push("/user/" + userId);
  };

  const styles = makeStyles(color);
  return (
    <div className="member-card" style={styles.border}>
      <div className="member-data-container">
        <img
          className="member-image"
          src={profileImage || defaultProfile}
          alt="profile"
        />
        <div className="member-data">
          <div
            className="member-name"
            style={{ ...styles.color, ...styles.clickable }}
            onClick={handleRedirectToUser}
          >
            {firstName} {lastName}
          </div>
          <div className="member-role">{role?.name}</div>
        </div>
      </div>
      <div className="member-buttons">
        {currentUserRole?.canEdit && (
          <div className="member-edit-button">
            <Create />
          </div>
        )}
        {currentUserRole?.canRemove && (
          <div className="member-delete-button">
            <Delete />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubMemberCard;
