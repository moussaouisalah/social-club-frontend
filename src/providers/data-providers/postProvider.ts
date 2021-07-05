import axios from "axios";
import { Post } from "../../types/Post";
import {
  SERVER_URL,
  POSTS_ENDPOINT,
  ADD_POST_ENDPOINT,
} from "../../config.json";
import { Pagination } from "../../types/Pagination";

export const postProvider = {
  getManyByUser: (
    userId: number,
    pagination: Pagination = { skip: 0, take: 10 }
  ): Promise<Post[]> => {
    console.log("postProvider getManyByUser: Start (id: " + userId + ")");
    return new Promise((resolve, reject) => {
      axios
        .get(
          SERVER_URL +
            POSTS_ENDPOINT +
            `?userId=${userId}&pageNo=${
              pagination.skip! / pagination.take!
            }&pageSize=${pagination.take}`
        )
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
        .get(
          SERVER_URL +
            POSTS_ENDPOINT +
            `?clubId=${clubId}&pageNo=${
              pagination.skip! / pagination.take!
            }&pageSize=${pagination.take}`
        )
        .then((response) => {
          console.log(
            "postProvider getManyByClub: Response (" +
              JSON.stringify(response) +
              ")"
          );
          resolve(response.data);
        });
    });
  },

  getIsLikedByUser: (postId: number, userId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + POSTS_ENDPOINT + `/${postId}?isLikedBy=${userId}`)
        .then((response) => {
          resolve(response.data ?? false);
        });
    });
  },

  togglePostLike: (postId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      axios
        .post(SERVER_URL + POSTS_ENDPOINT + `/${postId}/like`)
        .then((response) => {
          resolve(response.data ?? false);
        });
    });
  },

  create: (
    clubId: number,
    userId: number,
    text: string,
    postImage: File
  ): Promise<Post> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      // Add images to form data
      formData.append("file", postImage);

      // Add the serialized JSON data to the formData (not
      // sure what your JSON object is called)
      formData.append(
        "post",
        JSON.stringify({
          text,
          club: { id: clubId },
          user: { id: userId },
        })
      );
      axios
        .post(SERVER_URL + ADD_POST_ENDPOINT, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("sign up response: " + JSON.stringify(response));
          resolve(response.data);
        });
    });
  },
};
