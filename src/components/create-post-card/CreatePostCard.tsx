import React from "react";
import "./create-post-card.css";
import defaultProfile from "../../assets/default-profile.jpg";
import { primaryColor } from "../../theme.json";

type CreatePostCardProps = {
  profileImage?: string;
  color?: string;
};

const makeStyles = (color: string) => ({
  border: {
    border: "1px solid " + color,
  } as React.CSSProperties,
  backgroundColor: {
    backgroundColor: color,
  } as React.CSSProperties,
});

const CreatePostCard = ({
  profileImage = defaultProfile,
  color = primaryColor,
}: CreatePostCardProps) => {
  const styles = makeStyles(color);
  return (
    <div className="create-post-card" style={styles.border}>
      <img
        className="create-post-header-image"
        src={profileImage}
        alt="profile"
      />
      <div className="create-post-content">
        <textarea className="create-post-textarea"></textarea>
        <div className="create-post-bottom">
          <button className="create-post-image">Image</button>
          <button className="create-post-button" style={styles.backgroundColor}>
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
