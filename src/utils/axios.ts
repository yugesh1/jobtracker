import axios, { AxiosInstance } from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch: AxiosInstance = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }

  return config;
});

export default customFetch;
