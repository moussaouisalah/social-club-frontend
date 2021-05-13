import { ChatBubble, ThumbUpSharp } from "@material-ui/icons";
import React, { useState } from "react";
import defaultProfile from "../../assets/default-profile.jpg";
import { primaryColor } from "../../theme.json";
import "./post-card.css";

type PostCardProps = {
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
    border: "solid 1px blue",
  } as React.CSSProperties,
  mainColor: {
    color,
  } as React.CSSProperties,
});

const PostCard = ({
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
  const styles = makeStyles(color);
  return (
    <div className="post" style={styles.border}>
      <div className="post-header">
        <img className="post-header-image" src={profileImage} alt="profile" />
        <div className="post-header-data">
          <div className="post-header-name" style={styles.mainColor}>
            {firstName + " " + lastName} {clubName ? "> " + clubName : ""}
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
        <div className="likes">
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
