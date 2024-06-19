import { AxiosRequestConfig } from "axios";

import axios from "../../utils/axios-customize";

const getInfoDetailCarTransaction = (id: any, param: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };
    return axios.get(`/transaction/getDetail/${id}`, config);
};

const getListStatusTransaction = () => {
    return axios.get(`/transaction/getListStatusTransaction`);
};

const getListPaymentMode = () => {
    return axios.get(`/category/getListPaymentMode`)
}

const postPaymentRentalCar = (data: any) => {
    return axios.post(`/transaction/addPayment`, data)
}


const getListBanksInland = (data?: any) => {
    return axios.post(`${process.env.NEXT_PUBLIC_URL_API_PAYMENT}/get-list-banks`, data)
}

export {
    getInfoDetailCarTransaction,
    getListStatusTransaction,
    getListPaymentMode,
    postPaymentRentalCar,
    getListBanksInland
}