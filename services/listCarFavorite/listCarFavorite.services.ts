import axios from "../../utils/axios-customize";
import { AxiosRequestConfig } from "axios";
const apiListCarFavorite = () => {
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

    const apiUpdateFavoriteHeartCar = (data: any) => {
        return axios.post(`/car/changeFavouriteCar `, data);
    };

    return { apiListCar, apiUpdateFavoriteHeartCar };
};

export default apiListCarFavorite;
