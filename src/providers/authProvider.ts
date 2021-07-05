import { auth, users } from "../temporaryData.json";
import { User } from "../types/User";
import {
  SERVER_URL,
  SIGN_UP_ENDPOINT,
  LOGIN_ENDPOINT,
  IDENTITY_ENDPOINT,
  TOKEN_NAME,
} from "../config.json";
import { axios } from "./localAxios";

export const authProvider = {
  getIdentity: (): Promise<User> => {
    console.log("authProvider getIdentity: Start");
    return new Promise((resolve, reject) => {
      axios.get(SERVER_URL + IDENTITY_ENDPOINT).then((response: any) => {
        resolve(response.data);
      });
    });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_NAME);
  },
  login: (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      // TODO: check stuff
      axios
        .post(SERVER_URL + LOGIN_ENDPOINT, {
          email,
          password,
        })
        .then((response: any) => {
          localStorage.setItem(TOKEN_NAME, response.data.jwtToken);
          console.log(localStorage.getItem(TOKEN_NAME));
          resolve(undefined);
        });
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
