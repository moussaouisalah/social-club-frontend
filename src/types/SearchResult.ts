export enum SearchResultTypes {
  Club,
  User,
}

export type SearchResult = {
  id: number;
  type: SearchResultTypes;
  name: string;
  profileImage?: string;
};
