import { Club } from "./Club";
import { User } from "./User";

export type Post = {
  id: number;
  text: string;
  image?: string;
  creationdate: Date;
  likesCount: number;
  commentsCount: number;

  user: User;
  club: Club;
  comments: Comment[] | undefined;
};
