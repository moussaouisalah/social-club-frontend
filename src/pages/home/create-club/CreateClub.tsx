import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { clubProvider } from "../../../providers/data-providers/clubProvider";
import { User } from "../../../types/User";
import { CirclePicker } from "react-color";
import CustomImagePick from "../../../components/custom-image-pick/CustomImagePick";

type CreateClubProps = {
  currentUser: User | undefined;
};

const CreateClub = ({ currentUser }: CreateClubProps) => {
  const [formName, setFormName] = useState("");
  const [formColor, setFormColor] = useState("#698ef3");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [profileImage, setProfileImage] = useState<HTMLInputElement | null>(
    null
  );
  const [coverImage, setCoverImage] = useState<HTMLInputElement | null>(null);

  const history = useHistory();

  const handleCreateClub = () => {
    if (!currentUser) return;
    clubProvider
      .createClub(currentUser.id, formName, formColor, profileImage, coverImage)
      .then((data) => {
        history.push("/club/" + data.id);
      });
  };

  return (
    <div className="sign-up-form-container" style={{ margin: "50px" }}>
      <h1 className="sign-up-title">Créer un Club</h1>
      <div className="sign-up-form">
        <input
          type="text"
          placeholder="Nom"
          className="sign-up-input"
          value={formName}
          onChange={(event) => setFormName(event.target.value)}
        />
        <div className="first-last-container justify-start">
          <CustomImagePick
            pickName="Profile"
            image={profileImage}
            setImage={(event) => setProfileImage(event.target.files[0])}
            className="profile-photo"
          />
        </div>
        <div className="first-last-container justify-start">
          <CustomImagePick
            pickName="Cover"
            image={coverImage}
            setImage={(event) => setCoverImage(event.target.files[0])}
            className="cover-photo"
          />
        </div>
        <CirclePicker
          color={formColor}
          onChangeComplete={(color) => setFormColor(color.hex)}
        />
        <button
          className="login-button"
          onClick={handleCreateClub}
          disabled={!currentUser || isButtonDisabled}
        >
          Créer
        </button>
      </div>
    </div>
  );
};

export default CreateClub;
