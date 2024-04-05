import axios from "../../utils/axios-customize";
import { AxiosRequestConfig } from "axios";
const apiMyTrips = () => {
    const apiListMyTrips = (page: string | number, limit: string | number, param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                current_page: page,
                per_page: limit,
                ...param, // Nối các tham số trong param object
            },
        };
        return axios.get(`/transaction/getListTransaction`, config);
    };

    return { apiListMyTrips };
};

export default apiMyTrips;
