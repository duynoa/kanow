import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

// Chi tiết sao kê giao dịch của chủ xe
const getListDetailSyntheticTransaction = (
    param?: any
) => {
    // Chuyển đổi mảng thành chuỗi query string
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/synthetic_report/getListDetailSyntheticTransaction`, config);
};

// Đanh sách tổng hợp ví của tôi
const getListSyntheticTransaction = (
    param?: any
) => {
    // Chuyển đổi mảng thành chuỗi query string
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/synthetic_report/getListSyntheticTransaction`, config);
};

export {
    getListDetailSyntheticTransaction,
    getListSyntheticTransaction
}