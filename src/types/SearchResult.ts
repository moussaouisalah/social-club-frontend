export enum SearchResultTypes {
  Club = "club",
  User = "user",
}

export type SearchResult = {
  id: number;
  type: SearchResultTypes;
  name: string;
  profileImage?: string;
};
