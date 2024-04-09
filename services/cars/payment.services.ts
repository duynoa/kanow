import { AxiosRequestConfig } from "axios";

import axios from "../../utils/axios-customize";

const getInfoDetailCarTransaction = (id: any) => {
    return axios.get(`/transaction/getDetail/${id}`);
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

export {
    getInfoDetailCarTransaction,
    getListStatusTransaction,
    getListPaymentMode,
    postPaymentRentalCar
}