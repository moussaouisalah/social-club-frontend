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
  createClub: (
    userId: number,
    name: string,
    primaryColor: string,
    profileImage: File | null,
    coverImage: File | null
  ) => {
    // TODO
    return axios
      .post(SERVER_URL + CLUBS_ENDPOINT, {
        userId,
        name,
        primaryColor,
        profileImage,
        coverImage,
      })
      .then((response) => response.data);
  },
  updateClub: (id: number, name: string, primaryColor: string) => {
    console.log("update: " + JSON.stringify({ name, primaryColor }));
    return axios
      .put(SERVER_URL + CLUBS_ENDPOINT + "/" + id, {
        name,
        primaryColor,
        profileImage: "", // TODO remove
        coverImage: "", // TODO remove
      })
      .then((response) => {
        console.log("update response: " + JSON.stringify(response));
        return response.data;
      });
  },
};

export const deleteClub = () => {
  // TODO
};
