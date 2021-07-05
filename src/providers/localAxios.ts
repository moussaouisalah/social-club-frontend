import axios from "axios";
import { TOKEN_NAME } from "../config.json";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(TOKEN_NAME);
  config.headers.Authorization = "Bearer " + token;
  return config;
});

export { axios };
