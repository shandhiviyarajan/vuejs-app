import axios from "axios";
import { getAuthToken } from "@/plugins/tokens";

//create axios instance
let http = axios.create();

switch (process.env.NODE_ENV) {
  case "development":
    http.defaults.baseURL = "http://pb-backend-lb-30e3b7a2fe04ab9c.elb.eu-west-3.amazonaws.com"
    break;
  case "staging":
    http.defaults.baseURL = "http://be-pb-stg.beyond.lk"
    break;
  case "prod":
    http.defaults.baseURL = "http://pb-backend-lb-30e3b7a2fe04ab9c.elb.eu-west-3.amazonaws.com"
    break;

    default:
    http.defaults.baseURL = "http://pb-backend-lb-30e3b7a2fe04ab9c.elb.eu-west-3.amazonaws.com"
}
//default app URL//
http.defaults.baseURL = process.env.VUE_APP_API_URL;
//axios timeout
http.defaults.timeout = 50000;
//Request interceptors configuration
http.interceptors.request.use(function (config) {
  config.headers = {
    "x-api-key": process.env.VUE_APP_X_KEY,
    "x-api-secret": process.env.VUE_APP_X_SECRET,
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
    "Accept-Language": "en-US",
  };
  config.headers.Accept = "application/json";
  config.headers.Authorization = "Bearer " + getAuthToken();
  return config;
});

//Response interceptors
http.interceptors.response.use(
  (response) => {
    //forward error message into next function
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    }
  },
  (error) => {
    //forward error message into next function
    error.message = error.response.data.message || error.message;
    return Promise.reject(error);
  }
);

export const HTTP = http;

//Get request with form data
export const CREATEHTTP = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 50000,
  headers: {
    "x-api-key": process.env.VUE_APP_X_KEY,
    "x-api-secret": process.env.VUE_APP_X_SECRET,
    "Accept-Language": "en-US",
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + getAuthToken(),
  },
});

//Post, Put, Delete // no use
export const AXIOS = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 50000,
  headers: {
    "x-api-key": process.env.VUE_APP_X_KEY,
    "x-api-secret": process.env.VUE_APP_X_SECRET,
    "Accept-Language": "en-US",
    "Content-Type": "application/json",
    Authorization: "Bearer " + getAuthToken(),
  },
});

//no use
export const NOTIFY = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `key=${process.env.VUE_APP_FIREBASE_NOTIFICATION_SERVER_KEY}`,
  },
});
