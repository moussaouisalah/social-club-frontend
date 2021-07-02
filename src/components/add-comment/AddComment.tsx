import React, { useState } from "react";
import { primaryColor } from "../../theme.json";
import { CommentType } from "../../types/CommentType";
import "./add-comment.css";
import defaultProfile from "../../assets/default-profile.jpg";
import { commentProvider } from "../../providers/data-providers/commentProvider";

type AddCommentProps = {
  profileImage?: string;
  color?: string;
  userId: number;
  postId: number;
  addCommentToList: (newComment: CommentType) => void;
};

const makeStyles = (color: string) => ({
  border: {
    border: "1px solid " + color,
  } as React.CSSProperties,
  backgroundColor: {
    backgroundColor: color,
  } as React.CSSProperties,
});

const AddComment = ({
  profileImage = defaultProfile,
  addCommentToList,
  color = primaryColor,
  postId,
}: AddCommentProps) => {
  const [commentText, setCommentText] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleCreateComment = () => {
    console.log(commentText);
    if (!commentText) return;
    setButtonDisabled(true);
    commentProvider.create(postId, commentText).then((newComment) => {
      setButtonDisabled(false);
      console.log("commentText");
      setCommentText("");
      addCommentToList(newComment);
    });
  };

  const styles = makeStyles(color);
  return (
    <div className="add-comment-card">
      <img
        className="add-comment-header-image"
        src={profileImage}
        alt="profile"
      />
      <div className="add-comment-content">
        <textarea
          className="add-comment-textarea"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
        ></textarea>
        <div className="add-comment-bottom">
          <button
            className="add-comment-button"
            style={styles.backgroundColor}
            disabled={isButtonDisabled || !commentText}
            onClick={handleCreateComment}
          >
            Commenter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
