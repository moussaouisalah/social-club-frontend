import axios from "axios";
import { SearchResult, SearchResultTypes } from "../../types/SearchResult";
import {
  SERVER_URL,
  SEARCH_USERS_ENDPOINT,
  SEARCH_ENDPOINT,
} from "../../config.json";

export const miscProvider = {
  search: (searchQuery: string): Promise<SearchResult[]> => {
    return new Promise<SearchResult[]>((resolve, reject) => {
      axios
        .get(SERVER_URL + SEARCH_ENDPOINT + `?query=${searchQuery}`)
        .then((response) => {
          resolve(response.data);
        });
    });
  },
  searchUsers: (searchQuery: string): Promise<SearchResult[]> => {
    return new Promise<SearchResult[]>((resolve, reject) => {
      axios
        .get(SERVER_URL + SEARCH_USERS_ENDPOINT + `?query=${searchQuery}`)
        .then((response) => {
          resolve(response.data);
        });
    });
  },
};
