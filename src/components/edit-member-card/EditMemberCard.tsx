import React, { useState } from "react";
import { primaryColor } from "../../theme.json";
import "./invite-member-card.css";
import "./club-member-card.css";
import { Role } from "../../types/Role";
import defaultProfile from "../../assets/default-profile.jpg";

type EditMemberCardProps = {
  profileImage?: string;
  firstName: string;
  lastName: string;
  clubRoles: Role[];
  currentRoleId: number;
  color?: string;
  editHandler: (newRoleId: number) => void;
  cancelHandler: () => void;
};

const makeStyles = (color: string) => ({
  color: {
    color,
  } as React.CSSProperties,
  borderColor: {
    borderColor: color,
  } as React.CSSProperties,
  border: {
    border: "solid 1px " + color,
  } as React.CSSProperties,
  backgroundColor: {
    backgroundColor: color,
  } as React.CSSProperties,
});

const EditMemberCard = ({
  profileImage = defaultProfile,
  firstName,
  lastName,
  clubRoles,
  currentRoleId,
  color = primaryColor,
  editHandler,
  cancelHandler,
}: EditMemberCardProps) => {
  const [selectedRoleId, setSelectedRoleId] = useState(currentRoleId);

  const handleEdit = () => {
    editHandler(selectedRoleId);
  };

  const handleCancel = () => {
    cancelHandler();
  };

  const styles = makeStyles(color);
  return (
    <div className="invite-user-card" style={styles.border}>
      <div className="member-data-container">
        <img
          className="member-image"
          src={profileImage || defaultProfile}
          alt="profile"
        />
        <div className="member-data">
          <div className="member-name" style={{ ...styles.color }}>
            {firstName} {lastName}
          </div>
        </div>
      </div>
      <select
        className="invite-user-select"
        style={{ ...styles.borderColor, ...styles.color }}
        onChange={(event) => setSelectedRoleId(parseInt(event.target.value))}
      >
        <option value="role">Role</option>
        {clubRoles.map((clubRole, key) => (
          <option
            value={clubRole.roleId}
            key={key}
            selected={clubRole.roleId === selectedRoleId}
          >
            {clubRole.name}
          </option>
        ))}
      </select>
      <button
        className="invite-user-button"
        style={styles.backgroundColor}
        onClick={handleEdit}
      >
        Modifier
      </button>
      <div onClick={handleCancel} style={{ cursor: "pointer" }}>
        Annuler
      </div>
    </div>
  );
};

export default EditMemberCard;
