import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

const apiVehicleCommon = () => {
    const apiDetailCar = (id: string | number, param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param, // Nối các tham số trong param object
            },
        };

        return axios.get(`/car/getDetail/${id}`, config);
    };

    return { apiDetailCar };
};

export default apiVehicleCommon;
