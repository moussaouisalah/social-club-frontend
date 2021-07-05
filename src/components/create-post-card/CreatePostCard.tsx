import React, { useState } from "react";
import "./create-post-card.css";
import defaultProfile from "../../assets/default-profile.jpg";
import { primaryColor } from "../../theme.json";
import { postProvider } from "../../providers/data-providers/postProvider";
import { Post } from "../../types/Post";
import CustomImagePick from "../custom-image-pick/CustomImagePick";

type CreatePostCardProps = {
  profileImage?: string;
  color?: string;
  userId: number;
  clubId: number;
  addPostToList: (newPost: Post) => void;
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
  userId,
  clubId,
  addPostToList,
}: CreatePostCardProps) => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState<File | null>(null);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleCreatePost = () => {
    console.log(postImage);
    if (!postText || !postImage) return;
    console.log("here");
    setButtonDisabled(true);
    postProvider.create(clubId, userId, postText, postImage).then((newPost) => {
      setButtonDisabled(false);
      setPostText("");
      addPostToList(newPost);
    });
  };

  const styles = makeStyles(color);
  return (
    <div className="create-post-card" style={styles.border}>
      <img
        className="create-post-header-image"
        src={profileImage}
        alt="profile"
      />
      <div className="create-post-content">
        <textarea
          className="create-post-textarea"
          value={postText}
          onChange={(event) => setPostText(event.target.value)}
        ></textarea>
        <div className="create-post-bottom">
          <CustomImagePick
            pickName=""
            image={postImage}
            setImage={(event) => setPostImage(event.target.files[0])}
            className="profile-photo"
          />
          <button
            className="create-post-button"
            style={styles.backgroundColor}
            onClick={handleCreatePost}
            disabled={isButtonDisabled || !postText}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostCard;
