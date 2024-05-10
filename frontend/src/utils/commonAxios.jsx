import Axios from "axios";
import { BASE_URL, LOCATION_BASE_URL } from "./Base";

export const commonAxios = (url) => {
  return Axios.get(`${LOCATION_BASE_URL}${url}`);
};

export const commonPostAxios = (url, data) => {
  return Axios.post(`${BASE_URL}${url}`, data);
};
