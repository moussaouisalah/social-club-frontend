import { roles } from "../../temporaryData.json";
import { Role } from "../../types/Role";

export const roleProvider = {
  getOne: (id: number): Promise<Role> => {
    return new Promise((resolve, reject) => {
      const role = roles.find((role) => role.id === id);
      if (!role) reject("Role not found");
      resolve(role!);
    });
  },
  getManyByClub: (clubId: number): Promise<Role[]> => {
    return new Promise((resolve, reject) => {
      const rolesList = roles.filter((role) => role.clubId === clubId);
      resolve(rolesList);
    });
  },
};
