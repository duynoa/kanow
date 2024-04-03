import { AxiosRequestConfig } from "axios";

import axios from "../../utils/axios-customize";

const getInfoDetailCarTransaction = (id: any) => {
    return axios.get(`/transaction/getDetail/${id}`);
};
const getListStatusTransaction = () => {
    return axios.get(`/transaction/getListStatusTransaction`);
};

export {
    getInfoDetailCarTransaction,
    getListStatusTransaction
}