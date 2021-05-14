import { users } from "../../temporaryData.json";

export const getOne = (id: number) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    resolve(user);
  });
};

export const getMany = (ids: number[]) => {
  return new Promise((resolve, reject) => {
    const usersList = users.filter((user) => ids.includes(user.id));
    resolve(usersList);
  });
};

export const createUser = () => {
  // TODO
};

export const updateUser = () => {
  // TODO
};

export const deleteUser = () => {
  // TODO
};

export const getClubs = (id: number) => {
  // TODO
};
