import axios from "axios";
import { Post } from "../../types/Post";
import { SERVER_URL, POSTS_ENDPOINT } from "../../config.json";

export const postProvider = {
  getManyByUser: (userId: number): Promise<Post[]> => {
    console.log("postProvider getManyByUser: Start (id: " + userId + ")");
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + POSTS_ENDPOINT + "?userId=" + userId)
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
  getManyByClub: (clubId: number): Promise<Post[]> => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + POSTS_ENDPOINT + "?clubId=" + clubId)
        .then((response) => {
          resolve(response.data);
        });
    });
  },
};
