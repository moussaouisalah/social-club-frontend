import { clubs } from "../../temporaryData.json";

export const getOne = (id: number) => {
  return new Promise((resolve, reject) => {
    const club = clubs.find((club) => club.id === id);
    resolve(club);
  });
};

export const getMany = (ids: number[]) => {
  return new Promise((resolve, reject) => {
    const clubsList = clubs.filter((club) => ids.includes(club.id));
    resolve(clubsList);
  });
};

export const createClub = () => {
  // TODO
};

export const updateClub = () => {
  // TODO
};

export const deleteClub = () => {
  // TODO
};
