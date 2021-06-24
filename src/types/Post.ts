import { Club } from "./Club";
import { User } from "./User";

export type Post = {
  id: number;
  text: string;
  image?: string;
  creationDateTime: Date;
  userId: number;
  clubId: number;
  likesCount: number;
  commentsCount: number;

  user: User | undefined;
  club: Club | undefined;
  comments: Comment[] | undefined;
};
