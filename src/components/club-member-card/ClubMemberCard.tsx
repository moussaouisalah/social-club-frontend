import React from "react";
import { Role } from "../../types/Role";
import defaultProfile from "../../assets/default-profile.jpg";
import "./club-member-card.css";
import { Create, Delete } from "@material-ui/icons";
import { primaryColor } from "../../theme.json";

type ClubMemberCardProps = {
  profileImage?: string;
  firstName: string;
  lastName: string;
  role: string;
  currentUserRole: Role;
  color?: string;
};

const makeStyles = (color: string) => ({
  color: {
    color,
  } as React.CSSProperties,
  border: {
    border: "solid 1px blue",
  } as React.CSSProperties,
});

const ClubMemberCard = ({
  profileImage = defaultProfile,
  firstName,
  lastName,
  role,
  currentUserRole,
  color = primaryColor,
}: ClubMemberCardProps) => {
  const styles = makeStyles(color);
  return (
    <div className="member-card" style={styles.border}>
      <div className="member-data-container">
        <img className="member-image" src={profileImage} alt="profile" />
        <div className="member-data">
          <div className="member-name" style={styles.color}>
            {firstName + " " + lastName}
          </div>
          <div className="member-role">{role}</div>
        </div>
      </div>
      <div className="member-buttons">
        {currentUserRole.canEdit && (
          <div className="member-edit-button">
            <Create />
          </div>
        )}
        {currentUserRole.canRemove && (
          <div className="member-delete-button">
            <Delete />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubMemberCard;
