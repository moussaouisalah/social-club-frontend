import axios from "axios";
import { auth, users } from "../temporaryData.json";
import { User } from "../types/User";
import { SERVER_URL, SIGN_UP_ENDPOINT } from "../config.json";

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
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profileImage: File,
    coverImage: File
  ) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      // Add images to form data
      formData.append("profileImage", profileImage);
      formData.append("coverImage", coverImage);

      // Add the serialized JSON data to the formData (not
      // sure what your JSON object is called)
      formData.append(
        "user",
        JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        })
      );
      axios
        .post(SERVER_URL + SIGN_UP_ENDPOINT, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("sign up response: " + JSON.stringify(response));
          resolve(undefined);
        });
    });
  },
};
