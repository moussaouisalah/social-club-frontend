import React from "react";
import defaultImage from "../../assets/default-club.png";
import "./user-club-card.css";
import { primaryColor } from "../../theme.json";
import { useHistory } from "react-router-dom";
import { SERVER_URL } from "../../config.json";

type UserClubCardProps = {
  id: number;
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
  id,
  image,
  name,
  role,
  color = primaryColor,
}: UserClubCardProps) => {
  const history = useHistory();

  const handleRedirectToClub = () => {
    history.push("/club/" + id);
  };

  const styles = makeStyles(color);
  return (
    <div className="club-card" style={styles.clubCard}>
      <img
        className="club-image"
        src={image ? SERVER_URL + image : defaultImage}
        alt="club"
      />
      <div className="club-data">
        <div
          className="club-name"
          style={styles.clubName}
          onClick={handleRedirectToClub}
        >
          {name}
        </div>
        <div className="club-role">{role}</div>
      </div>
    </div>
  );
};

export default UserClubCard;
