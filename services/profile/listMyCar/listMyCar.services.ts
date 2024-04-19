import axios from "../../../utils/axios-customize";
import { AxiosRequestConfig } from "axios";
const apiMyCar = () => {
    const apiContract = () => {
        return axios.get(`/category/getListContractTemplate`);
    };

    const apiListCar = (page: string | number, limit: string | number, param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                current_page: page,
                per_page: limit,
                ...param, // Nối các tham số trong param object
            },
        };
        return axios.get(`/car/getList`, config);
    };

    const apiListStatusFilter = () => {
        return axios.get(`/category/getListStatusCar`);
    };

    //Đăng ký xe
    // Api danh sách tính năng
    const apiListFeature = () => {
        return axios.get(`/category/getListOtherAmenitiesCar`);
    };
    return { apiContract, apiListCar, apiListStatusFilter, apiListFeature };
};

export default apiMyCar;
