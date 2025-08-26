import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

// get homepage data
const getHomepageData = (param?: any) => {
  let config: AxiosRequestConfig = {
    params: {
      ...param, // Nối các tham số trong param object
    },
  };
  return axios.get("/homepage/getData", config);
};

export { getHomepageData };
