import React, { useState } from "react";
import { CirclePicker } from "react-color";

type EditClubProps = {
  name: string;
  primaryColor: string;
  editHandler: (name: string, primaryColor: string) => void;
  isButtonDisabled: boolean;
};

const EditClub = ({
  name,
  primaryColor,
  editHandler,
  isButtonDisabled,
}: EditClubProps) => {
  const [formName, setFormName] = useState(name);
  const [formPrimaryColor, setFormPrimaryColor] = useState(primaryColor);

  const handleEdit = () => {
    editHandler(formName, formPrimaryColor);
  };

  return (
    <>
      <h1 className="sign-up-title">Modifier CLub</h1>
      <div className="sign-up-form">
        <input
          type="text"
          placeholder="Nom"
          className="sign-up-input"
          value={formName}
          onChange={(event) => setFormName(event.target.value)}
        />
        <div className="first-last-container justify-start">
          <button className="profile-photo">Photo de profil</button>
          <p>{}</p>
        </div>
        <div className="first-last-container justify-start">
          <button className="cover-photo">Photo de couverture</button>
          <p>{}</p>
        </div>
        <CirclePicker
          color={formPrimaryColor}
          onChangeComplete={(color) => setFormPrimaryColor(color.hex)}
        />
        <button
          className="login-button"
          onClick={handleEdit}
          disabled={isButtonDisabled}
        >
          Modifier
        </button>
      </div>
    </>
  );
};

export default EditClub;
