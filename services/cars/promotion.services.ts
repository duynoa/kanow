import { AxiosRequestConfig } from 'axios';

import axios from '../../utils/axios-customize';

// post update favorite heart car
const getListPromotions = (param: any) => {
  let config: AxiosRequestConfig = {
    params: {
      ...param, // Nối các tham số trong param object
    },
  };
  return axios.get(`/promotion/getListPromotion?current_page=1&per_page=10`, config);
};

const getPromotionVoucher = (param: any) => {
  let config: AxiosRequestConfig = {
    params: {
      ...param, // Nối các tham số trong param object
    },
  };
  return axios.get(`/promotion/getPromotionVoucher?current_page=1&per_page=10`, config);
};

export { getListPromotions, getPromotionVoucher };
