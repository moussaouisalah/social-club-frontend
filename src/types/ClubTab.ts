export enum ClubTabType {
  Discussion,
  Membres,
  Gestion,
}

export type ClubTab = {
  name: string;
  isSelected?: boolean;
  type: ClubTabType;
};
