import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

// lấy danh sách cars
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

export {
    getListDetailSyntheticTransaction
}