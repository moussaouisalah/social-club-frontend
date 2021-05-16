import { roles } from "../../temporaryData.json";

export const getOne = (id: number) => {
  return new Promise((resolve, reject) => {
    const role = roles.find((role) => role.id === id);
    resolve(role);
  });
};

export const getManyByClub = (clubId: number) => {
  return new Promise((resolve, reject) => {
    const rolesList = roles.filter((role) => role.clubId === clubId);
    resolve(rolesList);
  });
};
