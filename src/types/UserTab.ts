export enum UserTabType {
  Clubs,
  Gestion,
}

export type UserTab = {
  name: string;
  isSelected?: boolean;
  type: UserTabType;
};
