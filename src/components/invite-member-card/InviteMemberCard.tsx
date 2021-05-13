import React from "react";
import { Role } from "../../types/Role";
import { primaryColor } from "../../theme.json";
import "./invite-member-card.css";

type InviteMemberCardProps = {
  clubRoles: Role[];
  color?: string;
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

const InviteMemberCard = ({
  clubRoles,
  color = primaryColor,
}: InviteMemberCardProps) => {
  const styles = makeStyles(color);
  return (
    <div className="invite-user-card" style={styles.border}>
      <input className="invite-user-input" placeholder="Rechercher" />
      <select
        className="invite-user-select"
        style={{ ...styles.borderColor, ...styles.color }}
      >
        <option value="role">Role</option>
        {clubRoles.map((clubRole, key) => (
          <option value={clubRole.id} key={key}>
            {clubRole.name}
          </option>
        ))}
      </select>
      <button className="invite-user-button" style={styles.backgroundColor}>
        Inviter
      </button>
    </div>
  );
};

export default InviteMemberCard;
