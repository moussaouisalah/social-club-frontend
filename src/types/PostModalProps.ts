export type PostModalProps = {
  postId: number;
  userId: number;
  clubId: number;
  firstName: string;
  lastName: string;
  dateTime: Date;
  profileImage?: string;
  clubName?: string;
  color?: string;
  text: string;
  image?: string;
  likesCount: number;
  commentsCount: number;
};
