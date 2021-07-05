import { User } from "./User";

export type CommentType = {
  id: number;
  text: string;
  creationDateTime: Date;
  postId: number;
  userId: number;
  user: User;
};
