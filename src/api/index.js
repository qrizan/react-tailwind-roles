import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    console.error(error)
    if (401 === error.response.status) {
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("permissions");
      window.location = "/";
    } else if (403 === error.response.status) {
      window.location = "/forbidden";
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
