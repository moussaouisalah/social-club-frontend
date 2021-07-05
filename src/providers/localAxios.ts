import axios from "axios";
import { TOKEN_NAME } from "../config.json";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(TOKEN_NAME);
  config.headers.Authorization = "Bearer " + token;
  return config;
});

// response interceptor, it runs before resolving every response.
/*
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      status,
      data: { message, errors },
    } = error.response;
    if (status === 401) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
    } else if (status === 400) {
      Toastr.error(message  "something went wrong");
    } else if (status === 404) {
      Toastr.error(message  "item not found");
    }
    return error.response;
  }
);
*/
export { axios };
