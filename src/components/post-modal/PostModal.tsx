import React, { useContext } from "react";
import ClickAwayListener from "react-click-away-listener";
import { PostModalContext } from "../../contexts/PostModalContext";
import "./post-modal.css";

const PostModal = () => {
  const { post, setPost } = useContext(PostModalContext);

  const handleClickAway = () => {
    if (!setPost) return;
    setPost(undefined);
  };

  return (
    <div className="post-modal-wrapper">
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className="post-modal-container"></div>
      </ClickAwayListener>
    </div>
  );
};

export default PostModal;
