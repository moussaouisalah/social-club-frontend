import { auth, users } from "../temporaryData.json";
import { User } from "../types/User";

const TOKEN_NAME = "auth_token";

export const authProvider = {
  getIdentity: (): Promise<User> => {
    console.log("authProvider getIdentity: Start");
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem(TOKEN_NAME);
      if (!token) reject("Vous n'êtes pas connecté.");
      const userAuth = auth.find((item) => item.token === token);
      if (!userAuth) reject("invalid token");
      const user = users.find((user) => user.id === userAuth!.userId);
      console.log(
        "authProvider getIdentity: Response (" + JSON.stringify(user) + ")"
      );
      if (!user) reject("User not found");
      resolve(user!);
    });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_NAME);
  },
  login: (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      // TODO: check stuff
      localStorage.setItem(TOKEN_NAME, "oijrpekg");
      resolve(undefined);
    });
  },
};
