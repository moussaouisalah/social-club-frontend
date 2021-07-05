import { roles } from "../../temporaryData.json";
import { Role } from "../../types/Role";
import { axios } from "../localAxios";
import { SERVER_URL, ROLES_ENDPOINT } from "../../config.json";

export const roleProvider = {
  getOne: (id: number): Promise<Role> => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + ROLES_ENDPOINT + "/" + id)
        .then((response: any) => {
          resolve(response.data);
        });
    });
  },
  getManyByClub: (clubId: number): Promise<Role[]> => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + ROLES_ENDPOINT + `?clubId=${clubId}`)
        .then((response) => {
          console.log(
            "postProvider getManyByUser: Response (" +
              JSON.stringify(response) +
              ")"
          );
          resolve(response.data);
        });
    });
  },
  create: (
    clubId: number,
    roleName: string,
    canEdit: boolean,
    canInvite: boolean,
    canPost: boolean,
    canRemove: boolean
  ): Promise<Role> => {
    return new Promise((resolve, reject) => {
      axios
        .post(SERVER_URL + ROLES_ENDPOINT, {
          club: { id: clubId },
          canEdit,
          canInvite,
          canPost,
          canRemove,
          name: roleName,
          isDefault: false,
        })
        .then((response) => {
          resolve(response.data);
        });
    });
  },
};
