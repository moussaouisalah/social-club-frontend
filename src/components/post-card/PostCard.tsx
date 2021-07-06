import {
  ChatBubble,
  ChatOutlined,
  ThumbUpOutlined,
  ThumbUpSharp,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import defaultProfile from "../../assets/default-profile.jpg";
import { PostModalContext } from "../../contexts/PostModalContext";
import { clubProvider } from "../../providers/data-providers/clubProvider";
import { postProvider } from "../../providers/data-providers/postProvider";
import { userProvider } from "../../providers/data-providers/userProvider";
import { primaryColor } from "../../theme.json";
import { Club } from "../../types/Club";
import { User } from "../../types/User";
import "./post-card.css";
import { SERVER_URL } from "../../config.json";

type PostCardProps = {
  postId: number;
  userId: number;
  clubId: number;
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
  postId,
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
  const [user, setUser] = useState<User | undefined>(undefined);
  const [club, setClub] = useState<Club | undefined>(undefined);
  const [isTextFullLength, setTextFullLength] = useState(text.length < 200);
  const [isLikedByUser, setLikedByUser] = useState(false);
  const [postLikes, setPostLikes] = useState(likesCount);

  const { post, setPost: setOpenedPost } = useContext(PostModalContext);

  const history = useHistory();

  // get user
  useEffect(() => {
    if (!userId) return;
    userProvider.getOne(userId).then((newUser) => {
      setUser(newUser);
    });
  }, [userId]);

  // get club
  useEffect(() => {
    if (!clubId) return;
    clubProvider.getOne(clubId).then((newClub) => {
      setClub(newClub);
    });
  }, [clubId]);

  // get is liked
  useEffect(() => {
    if (!userId) return;
    postProvider.getIsLikedByUser(postId, userId).then((isLikedByUser) => {
      setLikedByUser(isLikedByUser);
    });
  }, []);

  const handleRedirectToClub = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    history.push("/club/" + clubId);
  };

  const handleRedirectToUser = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.stopPropagation();
    history.push("/user/" + userId);
  };

  const handleToggleLike = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setPostLikes(isLikedByUser ? postLikes - 1 : postLikes + 1);
    setLikedByUser(!isLikedByUser);
    postProvider.togglePostLike(postId);
  };

  const handleClick = () => {
    if (!setOpenedPost) return;

    setOpenedPost({
      postId,
      userId,
      clubId,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateTime,
      profileImage: user?.profileImage || "",
      clubName: club?.name || "",
      color,
      text,
      image,
      likesCount,
      commentsCount,
    });
  };

  const styles = makeStyles(color);
  return (
    <div className="post" style={styles.border} onClick={handleClick}>
      <div className="post-header">
        <img
          className="post-header-image"
          src={
            user?.profileImage
              ? SERVER_URL + user?.profileImage
              : defaultProfile
          }
          alt="profile"
        />
        <div className="post-header-data">
          <div className="post-header-name" style={styles.mainColor}>
            <span
              onClick={
                userId ? (event) => handleRedirectToUser(event) : undefined
              }
              style={{ cursor: "pointer" }}
            >
              {user?.firstName + " " + user?.lastName}
            </span>{" "}
            <span
              onClick={
                clubId ? (event) => handleRedirectToClub(event) : undefined
              }
              style={{ cursor: "pointer" }}
            >
              {club?.name ? "> " + club?.name : ""}
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
      {image && (
        <img className="post-image" src={SERVER_URL + image} alt="post" />
      )}
      <div className="post-reactions">
        <div
          className="likes"
          onClick={(event) => handleToggleLike(event)}
          style={styles.clickable}
        >
          <div className="like-icon" style={styles.mainColor}>
            {isLikedByUser ? <ThumbUpSharp /> : <ThumbUpOutlined />}
          </div>
          <div className="like-count" style={styles.mainColor}>
            {}
          </div>
        </div>
        <div className="comments">
          <div className="comment-icon" style={styles.mainColor}>
            <ChatOutlined />
          </div>
          <div className="comment-count" style={styles.mainColor}>
            {}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
