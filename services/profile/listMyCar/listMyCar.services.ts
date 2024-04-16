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

    return { apiContract, apiListCar };
};

export default apiMyCar;
