import axios, { AxiosRequestConfig } from "axios";
import { API_URL_GLOBAL_SET } from "./env";
import { loadState } from "@/store/localStorage";

let APIKit = axios.create({
  baseURL: API_URL_GLOBAL_SET.API_END_POINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});

export const APIKitFormData = axios.create({
  baseURL: API_URL_GLOBAL_SET.API_END_POINT,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

//@ts-ignore
APIKit.interceptors.request.use(
  async (config) => {
    config.headers = config.headers ?? {};
    const token = loadState("access_token");
    if (token) {
      let authorization = "Bearer " + token;
      //@ts-ignore
      config.headers.Authorization = authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//@ts-ignore
APIKitFormData.interceptors.request.use(
  async (config) => {
    config.headers = config.headers ?? {};
    const token = loadState("access_token");
    if (token) {
      let authorization = "Bearer " + token;
      //@ts-ignore
      config.headers.Authorization = authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const handleResponse = (response) => {
  if (response.status == "200" || response.statusText == "ok") {
    response.data.data.message = response?.data?.message;
    response.data.data.status = response?.data?.status;
    return response?.data?.data;
  }
  if (response.status == "400" || response.statusText == "Bad Request") {
    response.data.data.message = response?.data?.message;
    response.data.data.status = response?.data?.status;
    return response?.data?.data;
  } else {
    // logout();

    return response?.data?.error;
  }
};

export default APIKit;
