import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { authProvider } from "../../providers/authProvider";
import "./sign-up.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const history = useHistory();

  // redirect if already logged in
  useEffect(() => {
    authProvider.getIdentity().then(() => history.push("/"));
  }, []);

  // TODO: this and image upload
  const handleSignUp = () => {};

  const handleRedirectToLogin = () => {
    history.push("/login");
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-form-container">
        <h1 className="sign-up-title">Inscription</h1>
        <div className="sign-up-form">
          <div className="first-last-container">
            <input
              type="text"
              placeholder="Prénom"
              className="sign-up-input"
              id="first-input"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Nom"
              className="sign-up-input"
              id="last-input"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Email"
            className="sign-up-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            className="sign-up-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
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
            onClick={handleSignUp}
            disabled={false}
          >
            S'inscrire
          </button>
          <p className="already-account">vous avez déjà un compte?</p>
          <span className="link" onClick={handleRedirectToLogin}>
            Connectez-vous
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
