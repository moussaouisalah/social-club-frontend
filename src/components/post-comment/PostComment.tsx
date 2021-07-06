import React, { useContext, useEffect, useState } from "react";
import { CommentType } from "../../types/CommentType";
import defaultProfile from "../../assets/default-profile.jpg";
import { PostModalContext } from "../../contexts/PostModalContext";
import { useHistory } from "react-router-dom";
import { primaryColor } from "../../theme.json";
import "./post-comment.css";
import { userProvider } from "../../providers/data-providers/userProvider";
import { User } from "../../types/User";
import { SERVER_URL } from "../../config.json";

type PostCommentProps = {
  comment: CommentType;
  color?: string;
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

const PostComment = ({ comment, color = primaryColor }: PostCommentProps) => {
  const { post, setPost } = useContext(PostModalContext);
  const [user, setUser] = useState<User | undefined>(undefined);
  const history = useHistory();

  // get user
  useEffect(() => {
    if (!comment.user_owner_comment) return;
    userProvider.getOne(comment.user_owner_comment.id).then((user) => {
      console.log("here");
      setUser(user);
    });
  }, [comment.user_owner_comment]);

  const handleRedirectToUser = () => {
    if (!setPost) return;
    history.push("/user/" + post!.userId);
    setPost(undefined);
  };

  const styles = makeStyles(color);
  return (
    <div className="comment">
      <div className="comment-header">
        <img
          className="comment-header-image"
          src={
            user?.profileImage
              ? SERVER_URL + user?.profileImage
              : defaultProfile
          }
          alt="profile"
        />
        <div className="comment-header-data">
          <div className="comment-header-name" style={styles.mainColor}>
            <span onClick={handleRedirectToUser} style={{ cursor: "pointer" }}>
              {user?.firstName + " " + user?.lastName}
            </span>
          </div>
          <div className="comment-header-time">
            {comment.creationDateTime.toString()}
          </div>
        </div>
      </div>
      <div className="comment-text">{comment.text}</div>
    </div>
  );
};

export default PostComment;
