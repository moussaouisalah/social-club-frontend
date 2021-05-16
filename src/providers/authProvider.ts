const TOKEN_NAME = "auth_token";

export const getIdentity = () => {};

export const logout = () => {
  localStorage.removeItem(TOKEN_NAME);
};
