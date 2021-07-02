import axios from "axios";
import { Post } from "../../types/Post";
import { SERVER_URL, COMMENTS_ENDPOINT } from "../../config.json";
import { Pagination } from "../../types/Pagination";
import { CommentType } from "../../types/CommentType";

export const commentProvider = {
  getManyByPost: (
    postId: number,
    pagination: Pagination = { skip: 0, take: 10 }
  ): Promise<CommentType[]> => {
    return new Promise((resolve, reject) => {
      axios
        .get(SERVER_URL + COMMENTS_ENDPOINT + "?postId=" + postId)
        .then((response) => {
          resolve(response.data);
        });
    });
  },
  create: (postId: number, text: string): Promise<CommentType> => {
    return new Promise((resolve, reject) => {
      axios
        .post(SERVER_URL + COMMENTS_ENDPOINT, {
          text,
          postId,
          userId: 1, // TODO: remove this and get it from token on the server side
          creationDateTime: "", // TODO: remove this
        })
        .then((response) => {
          console.log("create comment response: " + JSON.stringify(response));
          resolve(response.data);
        });
    });
  },
};
