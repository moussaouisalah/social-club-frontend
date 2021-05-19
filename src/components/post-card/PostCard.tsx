import { ChatBubble, ThumbUpSharp } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import defaultProfile from "../../assets/default-profile.jpg";
import { postProvider } from "../../providers/data-providers/postProvider";
import { primaryColor } from "../../theme.json";
import "./post-card.css";

type PostCardProps = {
  userId?: number;
  clubId?: number;
  firstName: string;
  lastName: string;
  dateTime: Date;
  profileImage?: string;
  clubName?: string;
  color?: string;
  text: string;
  image?: string;
  likesCount: number;
  commentsCount: number;
};

const makeStyles = (color: string) => ({
  border: {
    border: "solid 1px " + color,
  } as React.CSSProperties,
  mainColor: {
    color,
  } as React.CSSProperties,
  clickable: {
    cursor: "pointer",
  } as React.CSSProperties,
});

const PostCard = ({
  userId,
  clubId,
  firstName,
  lastName,
  dateTime,
  profileImage = defaultProfile,
  clubName,
  color = primaryColor,
  text,
  image,
  likesCount,
  commentsCount,
}: PostCardProps) => {
  const [isTextFullLength, setTextFullLength] = useState(text.length < 200);

  const history = useHistory();

  const handleRedirectToClub = () => {
    history.push("/club/" + clubId);
  };

  const handleRedirectToUser = () => {
    history.push("/user/" + userId);
  };

  const handleToggleLike = () => {
    // TODO
    //postProvider.togglePostLike()
  };

  const styles = makeStyles(color);
  return (
    <div className="post" style={styles.border}>
      <div className="post-header">
        <img className="post-header-image" src={profileImage} alt="profile" />
        <div className="post-header-data">
          <div className="post-header-name" style={styles.mainColor}>
            <span
              onClick={userId ? handleRedirectToUser : undefined}
              style={{ cursor: "pointer" }}
            >
              {firstName + " " + lastName}
            </span>{" "}
            <span
              onClick={clubId ? handleRedirectToClub : undefined}
              style={{ cursor: "pointer" }}
            >
              {clubName ? "> " + clubName : ""}
            </span>
          </div>
          <div className="post-header-time">{dateTime.toString()}</div>
        </div>
      </div>
      <div className="post-text">
        {isTextFullLength ? text : text.substring(0, 200)}
        {!isTextFullLength && (
          <span
            className="see-more"
            style={styles.mainColor}
            onClick={() => setTextFullLength(true)}
          >
            Voir plus
          </span>
        )}
      </div>
      {image && <img className="post-image" src={image} alt="post" />}
      <div className="post-reactions">
        <div
          className="likes"
          onClick={handleToggleLike}
          style={styles.clickable}
        >
          <div className="like-icon" style={styles.mainColor}>
            <ThumbUpSharp />
          </div>
          <div className="like-count" style={styles.mainColor}>
            {likesCount}
          </div>
        </div>
        <div className="comments">
          <div className="comment-icon" style={styles.mainColor}>
            <ChatBubble />
          </div>
          <div className="comment-count" style={styles.mainColor}>
            {commentsCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
