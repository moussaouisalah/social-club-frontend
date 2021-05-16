import { auth, users } from "../temporaryData.json";

const TOKEN_NAME = "auth_token";

export const getIdentity = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem(TOKEN_NAME);
    if (!token) reject("Vous n'êtes pas connecté.");
    const userAuth = auth.find((item) => item.token === token);
    if (!userAuth) reject("invalid token");
    const user = users.find((user) => user.id === userAuth!.userId);
    resolve(user);
  });
};

export const logout = () => {
  localStorage.removeItem(TOKEN_NAME);
};

export const login = (email: string, password: string) => {};
