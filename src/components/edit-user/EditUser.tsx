import React, { useState } from "react";

type EditUserProps = {
  firstName: string;
  lastName: string;
  email: string;
  editHandler: (firstName: string, lastName: string, email: string) => void;
  isButtonDisabled: boolean;
};

const EditUser = ({
  firstName,
  lastName,
  email,
  editHandler,
  isButtonDisabled,
}: EditUserProps) => {
  const [formFirstName, setFormFirstName] = useState(firstName);
  const [formLastName, setFormLastName] = useState(lastName);
  const [formEmail, setFormEmail] = useState(email);

  const handleEdit = () => {
    editHandler(formFirstName, formLastName, formEmail);
  };

  return (
    <>
      <h1 className="sign-up-title">Modifier</h1>
      <div className="sign-up-form">
        <div className="first-last-container">
          <input
            type="text"
            placeholder="Prénom"
            className="sign-up-input"
            id="first-input"
            value={formFirstName}
            onChange={(event) => setFormFirstName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Nom"
            className="sign-up-input"
            id="last-input"
            value={formLastName}
            onChange={(event) => setFormLastName(event.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Email"
          className="sign-up-input"
          value={formEmail}
          onChange={(event) => setFormEmail(event.target.value)}
        />
        <div className="first-last-container justify-start">
          <button className="profile-photo">Photo de profil</button>
          <p>{}</p>
        </div>
        <div className="first-last-container justify-start">
          <button className="cover-photo">Photo de couverture</button>
          <p>{}</p>
        </div>
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

export default EditUser;
