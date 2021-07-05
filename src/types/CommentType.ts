import { Post } from "./Post";
import { User } from "./User";

export type CommentType = {
  id: number;
  text: string;
  creationDateTime: Date;
  post: Post;
  user_owner_comment: User;
};
