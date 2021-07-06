import axios from "axios";
import { Toastr } from "../components/toastr-component/ToastrComponent";
import { TOKEN_NAME } from "../config.json";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(TOKEN_NAME);
  config.headers.Authorization = "Bearer " + token;
  return config;
});

// response interceptor, it runs before resolving every response.

axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      if (localStorage.getItem(TOKEN_NAME)) {
        localStorage.removeItem(TOKEN_NAME);
      }
      console.log("401 here");
      return new Promise(() => {});
    } else if (response.status === 400) {
      Toastr.error(response.data?.message || "something went wrong");
      console.log("400 here");
      return new Promise(() => {});
    } else if (response.status === 404) {
      Toastr.error(response.data?.message || "item not found");
      console.log("404 here");
      return new Promise(() => {});
    }
    console.log("here" + JSON.stringify(response));
    return response;
  },
  (error) => {
    const {
      status,
      data: { message, errors },
    } = error.response;
    console.log("errore: " + JSON.stringify(error));
    if (status === 401) {
      if (localStorage.getItem(TOKEN_NAME)) {
        localStorage.removeItem(TOKEN_NAME);
      }
    } else if (status === 400) {
      Toastr.error(message || "something went wrong");
    } else if (status === 404) {
      console.log("if 404 here");
      Toastr.error(message || "item not found");
    } else {
      Toastr.error("error");
    }
    return new Promise(() => {});
  }
);

export { axios };
