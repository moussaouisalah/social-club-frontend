import axios from "axios";
import { clubs } from "../../temporaryData.json";
import { Club } from "../../types/Club";
import { SERVER_URL, CLUBS_ENDPOINT } from "../../config.json";

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
  createClub: (userId: number, clubName: string, primaryColor: string) => {
    // TODO
    return axios
      .post(SERVER_URL + CLUBS_ENDPOINT, {
        userId,
        clubName,
        primaryColor,
        profileImage: "",
        coverImage: "",
      })
      .then((response) => response.data);
  },
};

export const updateClub = () => {
  // TODO
};

export const deleteClub = () => {
  // TODO
};
