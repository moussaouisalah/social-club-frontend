import { SearchResult, SearchResultTypes } from "../../types/SearchResult";

export const miscProvider = {
  search: (searchQuery: string): Promise<SearchResult[]> => {
    return new Promise<SearchResult[]>((resolve, reject) => {
      resolve([
        {
          id: 1,
          type: SearchResultTypes.User,
          name: "salah moussaoui",
        },
        {
          id: 1,
          type: SearchResultTypes.Club,
          name: "IEEE Ensaf",
        },
      ]);
    });
  },
  searchUsers: (searchQuery: string): Promise<SearchResult[]> => {
    return new Promise<SearchResult[]>((resolve, reject) => {
      resolve([
        {
          id: 1,
          type: SearchResultTypes.User,
          name: "salah moussaoui",
        },
      ]);
    });
  },
};
