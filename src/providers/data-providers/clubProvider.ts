import { clubs } from "../../temporaryData.json";
import { Club } from "../../types/Club";
import { SERVER_URL, CLUBS_ENDPOINT } from "../../config.json";
import { axios } from "../localAxios";

export const clubProvider = {
  getOne: (id: number): Promise<Club> => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + CLUBS_ENDPOINT + "/" + id)
        .then((response: any) => {
          resolve(response.data);
        });
    });
  },
  getMany: (ids: number[]): Promise<Club[]> => {
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
        .get(SERVER_URL + CLUBS_ENDPOINT + `?ids=${idsString}`)
        .then((response) => {
          resolve(response.data);
        });
    });
  },
  createClub: (
    userId: number,
    name: string,
    primaryColor: string,
    profileImage: File,
    coverImage: File
  ): Promise<Club> => {
    const formData = new FormData();

    // Add images to form data
    formData.append("profileImage", profileImage);
    formData.append("coverImage", coverImage);

    // Add the serialized JSON data to the formData (not
    // sure what your JSON object is called)
    formData.append(
      "club",
      JSON.stringify({
        name,
        primaryColor,
      })
    );
    return new Promise((resolve, reject) => {
      axios
        .post(SERVER_URL + CLUBS_ENDPOINT, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          resolve(response.data);
        });
    });
  },
  updateClub: (id: number, name: string, primaryColor: string) => {
    console.log("update: " + JSON.stringify({ name, primaryColor }));
    return axios
      .put(SERVER_URL + CLUBS_ENDPOINT + "/" + id, {
        name,
        primaryColor,
      })
      .then((response) => {
        console.log("update response: " + JSON.stringify(response));
        return response.data;
      });
  },
};
