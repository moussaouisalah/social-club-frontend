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

  create: (
    clubId: number,
    userId: number,
    text: string,
    postImage: File
  ): Promise<Post> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();

      // Add images to form data
      formData.append("postImage", postImage);

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
        .post(SERVER_URL + SIGN_UP_ENDPOINT, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("sign up response: " + JSON.stringify(response));
          resolve(undefined);
        });
    });
  },
};
