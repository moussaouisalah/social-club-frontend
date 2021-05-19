import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authProvider } from "../../providers/authProvider";
import "./login.css";

const Login = () => {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  // redirect if already logged in
  useEffect(() => {
    authProvider.getIdentity().then(() => history.push("/"));
  }, []);

  const handleLogin = () => {
    authProvider
      .login(emailField, passwordField)
      .then(() => {
        history.push("/");
      })
      .catch(() => {});
  };

  const handleRedirectToSignUp = () => {
    history.push("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">Connexion</h1>
        <div className="login-form">
          <input
            type="text"
            placeholder="Email"
            className="login-input"
            value={emailField}
            onChange={(event) => setEmailField(event.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            className="login-input"
            value={passwordField}
            onChange={(event) => setPasswordField(event.target.value)}
          />
          <button
            className="login-button"
            disabled={isLoading || emailField === "" || passwordField === ""}
            onClick={handleLogin}
          >
            Se Connecter
          </button>
          <p className="no-account">
            pas de compte?{" "}
            <span className="link" onClick={handleRedirectToSignUp}>
              Inscrivez-vous
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
