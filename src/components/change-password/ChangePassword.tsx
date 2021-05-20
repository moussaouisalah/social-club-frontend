import React, { useState } from "react";

type ChangePasswordProps = {
  changeHandler: (newPassword: string) => void;
  isButtonDisabled: boolean;
};

const ChangePassword = ({
  changeHandler,
  isButtonDisabled,
}: ChangePasswordProps) => {
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");

  const handleChange = () => {
    // todo add error handler
    if (formPassword !== formConfirmPassword) return;
    changeHandler(formPassword);
    setFormPassword("");
    setFormConfirmPassword("");
  };

  return (
    <>
      <h1 className="sign-up-title">Mot de passe</h1>
      <div className="sign-up-form">
        <input
          type="password"
          placeholder="********"
          className="sign-up-input"
          value={formPassword}
          onChange={(event) => setFormPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="********"
          className="sign-up-input"
          value={formConfirmPassword}
          onChange={(event) => setFormConfirmPassword(event.target.value)}
        />
        <button
          className="login-button"
          onClick={handleChange}
          disabled={isButtonDisabled}
        >
          Changer
        </button>
      </div>
    </>
  );
};

export default ChangePassword;
