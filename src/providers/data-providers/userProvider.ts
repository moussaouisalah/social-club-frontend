import axios from "axios";
import { users } from "../../temporaryData.json";
import { SERVER_URL, USERS_ENDPOINT } from "../../config.json";
import { User } from "../../types/User";
import { resolve } from "url";

export const userProvider = {
  getOne: (id: number): Promise<User> => {
    console.log("userProvider getOne: Start (id: " + id + ")");
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + USERS_ENDPOINT + "/" + id)
        .then((response) => {
          console.log(
            "userProvider getOne: Response (" + JSON.stringify(response) + ")"
          );
          resolve(response.data);
        })
        .catch((error) => {
          console.log(
            "userProvider getOne: Error (" + JSON.stringify(error) + ")"
          );
        });
    });
  },
  getList: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + USERS_ENDPOINT)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  getMany: (ids: number[]) => {
    return new Promise((resolve, reject) => {
      const usersList = users.filter((user) => ids.includes(user.id));
      resolve(usersList);
    });
  },
  updateUser: (
    id: number,
    firstName: string,
    lastName: string,
    email: string
  ) => {
    return axios
      .put(SERVER_URL + USERS_ENDPOINT + "/" + id, {
        firstName,
        lastName,
        email,
        profileImage: "",
        coverImage: "",
      })
      .then((response) => {
        console.log("update response: " + JSON.stringify(response));
        return response.data;
      });
  },
  changePassword: (id: number, newPassword: string) => {
    /* TODO */
    return new Promise((resolve, reject) => {
      resolve("");
    });
  },
};

export const createUser = () => {
  // TODO
};

export const deleteUser = () => {
  // TODO
};

export const getClubs = (id: number) => {
  // TODO
};
