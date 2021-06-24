import axios from "axios";
import { Post } from "../../types/Post";
import { SERVER_URL, POSTS_ENDPOINT } from "../../config.json";
import { Pagination } from "../../types/Pagination";

export const postProvider = {
  getManyByUser: (
    userId: number,
    pagination: Pagination = { skip: 0, take: 10 }
  ): Promise<Post[]> => {
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
  getManyByClub: (
    clubId: number,
    pagination: Pagination = { skip: 0, take: 10 }
  ): Promise<Post[]> => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + POSTS_ENDPOINT + "?clubId=" + clubId)
        .then((response) => {
          resolve(response.data);
        });
    });
  },

  getIsLikedByUser: (postId: number, userId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          SERVER_URL + POSTS_ENDPOINT + "/" + postId + "?isLikedBy=" + userId
        )
        .then((response) => {
          resolve(response.data.isLikedByUser ?? false);
        });
    });
  },

  togglePostLike: (postId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      axios
        .post(SERVER_URL + POSTS_ENDPOINT + "/" + postId)
        .then((response) => {
          resolve(response.data.isLikedByUser ?? false);
        });
    });
  },

  create: (clubId: number, text: string): Promise<Post> => {
    return new Promise((resolve, reject) => {
      axios
        .post(SERVER_URL + POSTS_ENDPOINT, {
          text,
          image: "",
          clubId,
          userId: 1, // TODO: remove this and get it from token on the server side
          creationDateTime: "", // TODO: remove this
        })
        .then((response) => {
          console.log("create post response: " + JSON.stringify(response));
        });
    });
  },
};
