import React from "react";
import defaultImage from "../../assets/default-club.png";
import "./user-club-card.css";
import { primaryColor } from "../../theme.json";

type UserClubCardProps = {
  image?: string;
  name: string;
  role: string;
  color?: string;
};

const makeStyles = (color: string) => ({
  clubCard: {
    border: "solid 1px " + color,
  } as React.CSSProperties,
  clubName: {
    color,
  } as React.CSSProperties,
});

const UserClubCard = ({
  image,
  name,
  role,
  color = primaryColor,
}: UserClubCardProps) => {
  const styles = makeStyles(color);
  return (
    <div className="club-card" style={styles.clubCard}>
      <img className="club-image" src={image || defaultImage} alt="club" />
      <div className="club-data">
        <div className="club-name" style={styles.clubName}>
          {name}
        </div>
        <div className="club-role">{role}</div>
      </div>
    </div>
  );
};

export default UserClubCard;
