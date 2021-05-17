import { clubs } from "../../temporaryData.json";
import { Club } from "../../types/Club";

export const clubProvider = {
  getOne: (id: number): Promise<Club> => {
    return new Promise((resolve, reject) => {
      const club = clubs.find((club) => club.id === id);
      if (!club) reject("Club not found");
      resolve(club!);
    });
  },
  getMany: (ids: number[]): Promise<Club[]> => {
    return new Promise((resolve, reject) => {
      const clubsList = clubs.filter((club) => ids.includes(club.id));
      resolve(clubsList);
    });
  },
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
