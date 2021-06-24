import { createContext, Dispatch, SetStateAction } from "react";
import { Post } from "../types/Post";
import { PostModalProps } from "../types/PostModalProps";

export const PostModalContext = createContext<{
  post: PostModalProps | undefined;
  setPost: Dispatch<SetStateAction<PostModalProps | undefined>> | undefined;
}>({ post: undefined, setPost: undefined });
