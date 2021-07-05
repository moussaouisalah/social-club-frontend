import axios from "axios";
import { users } from "../../temporaryData.json";
import { SERVER_URL, USERS_ENDPOINT } from "../../config.json";
import { User } from "../../types/User";
import { resolve } from "url";
import { Pagination } from "../../types/Pagination";

export const userProvider = {
  getOne: (id: number): Promise<User> => {
    console.log("userProvider getOne: Start (id: " + id + ")");
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + USERS_ENDPOINT + "/" + id)
        .then((response: any) => {
          resolve(response.data);
        });
    });
  },
  getList: (pagination: Pagination = { skip: 0, take: 10 }) => {
    return new Promise((resolve, reject) => {
      axios.get(SERVER_URL + USERS_ENDPOINT).then((response) => {
        resolve(response.data);
      });
    });
  },
  getMany: (ids: number[], pagination: Pagination = { skip: 0, take: 10 }) => {
    return new Promise((resolve, reject) => {
      // make ids string
      let idsString: string = "";
      for (let i = 0; i < ids.length; i++) {
        if (i === ids.length - 1) {
          idsString += `${ids[i]}`;
        } else {
          idsString += `${ids[i]},`;
        }
      }
      axios
        .get(SERVER_URL + USERS_ENDPOINT + `?ids=${idsString}`)
        .then((response) => {
          resolve(response.data);
        });
    });
  },
  updateUser: (
    id: number,
    firstName: string,
    lastName: string,
    email: string
  ): Promise<User> => {
    return axios
      .put(SERVER_URL + USERS_ENDPOINT + "/" + id, {
        firstName,
        lastName,
        email,
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
