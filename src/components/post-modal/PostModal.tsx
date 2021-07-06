import React, { useContext, useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { PuffLoader } from "react-spinners";
import { PostModalContext } from "../../contexts/PostModalContext";
import "./post-modal.css";
import { primaryColor } from "../../theme.json";
import defaultProfile from "../../assets/default-profile.jpg";
import {
  ChatOutlined,
  ThumbUpOutlined,
  ThumbUpSharp,
} from "@material-ui/icons";
import { postProvider } from "../../providers/data-providers/postProvider";
import { useHistory } from "react-router-dom";
import AddComment from "../add-comment/AddComment";
import { CommentType } from "../../types/CommentType";
import { commentProvider } from "../../providers/data-providers/commentProvider";
import PostComment from "../post-comment/PostComment";
import { SERVER_URL } from "../../config.json";
import { User } from "../../types/User";
import { authProvider } from "../../providers/authProvider";

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

const PostModal = () => {
  const { post, setPost } = useContext(PostModalContext);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLikedByUser, setLikedByUser] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [comments, setComments] = useState<CommentType[]>([]);
  const history = useHistory();

  const handleClickAway = () => {
    if (!setPost) return;
    setPost(undefined);
  };

  useEffect(() => {
    authProvider.getIdentity().then((newUser) => {
      setUser(newUser);
    });
  }, []);

  useEffect(() => {
    if (!post) return;

    checkIsLikedByUser();

    commentProvider.getManyByPost(post.postId).then((commentsList) => {
      setComments(commentsList);
    });

    setPostLikes(post.likesCount);
  }, [post]);

  const checkIsLikedByUser = async () => {
    postProvider
      .getIsLikedByUser(post!.postId, post!.userId)
      .then((isLikedByUser) => {
        setLikedByUser(isLikedByUser);
      });
  };

  const handleAddCommentToList = (newComment: CommentType) => {
    setComments([newComment, ...comments]);
  };

  const handleRedirectToUser = () => {
    history.push("/user/" + post!.userId);
    setPost!(undefined);
  };

  const handleRedirectToClub = () => {
    history.push("/club/" + post!.clubId);
    setPost!(undefined);
  };

  const handleToggleLike = () => {
    setPostLikes(isLikedByUser ? postLikes - 1 : postLikes + 1);
    setLikedByUser(!isLikedByUser);
    postProvider.togglePostLike(post!.postId);
  };

  const styles = makeStyles(post?.color || primaryColor);
  return (
    <div className="post-modal-wrapper">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="post-modal-container">
          {post ? (
            <div className="post">
              <div className="post-header">
                <img
                  className="post-header-image"
                  src={
                    post.profileImage
                      ? SERVER_URL + post.profileImage
                      : defaultProfile
                  }
                  alt="profile"
                />
                <div className="post-header-data">
                  <div className="post-header-name" style={styles.mainColor}>
                    <span
                      onClick={handleRedirectToUser}
                      style={{ cursor: "pointer" }}
                    >
                      {post.firstName + " " + post.lastName}
                    </span>{" "}
                    <span
                      onClick={handleRedirectToClub}
                      style={{ cursor: "pointer" }}
                    >
                      {post.clubName ? "> " + post.clubName : ""}
                    </span>
                  </div>
                  <div className="post-header-time">
                    {post.dateTime.toString()}
                  </div>
                </div>
              </div>
              <div className="post-text">{post.text}</div>
              {post.image && (
                <img
                  className="post-image"
                  src={SERVER_URL + post.image}
                  alt="post"
                />
              )}
              <div className="post-reactions">
                <div
                  className="likes"
                  onClick={handleToggleLike}
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
              <div className="separator"></div>
              <AddComment
                profileImage={user?.profileImage}
                color={post.color}
                userId={user?.id}
                postId={post.postId}
                addCommentToList={handleAddCommentToList}
              />
              <div className="separator"></div>
              <div className="post-comments">
                {comments.map((comment, key) => (
                  <PostComment key={key} comment={comment} />
                ))}
              </div>
            </div>
          ) : (
            <div className="center">
              <PuffLoader loading={true} />
            </div>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default PostModal;
