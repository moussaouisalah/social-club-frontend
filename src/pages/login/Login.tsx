import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authProvider } from "../../providers/authProvider";

const Login = () => {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    authProvider
      .login(emailField, passwordField)
      .then(() => {
        history.push("/");
      })
      .catch(() => {});
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={emailField}
        onChange={(event) => setEmailField(event.target.value)}
      />
      <input
        type="password"
        placeholder="********"
        value={passwordField}
        onChange={(event) => setPasswordField(event.target.value)}
      />
      <button
        disabled={isLoading || emailField === "" || passwordField === ""}
        onClick={handleLogin}
      >
        Se Connecter
      </button>
    </div>
  );
};

export default Login;
