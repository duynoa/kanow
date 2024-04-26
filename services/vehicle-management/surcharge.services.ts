import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

const apiVehicleSurcharge = () => {
    const apiListSurchargeCar = (param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param, // Nối các tham số trong param object
            },
        };

        return axios.get(`/category/getListSurchargeCar`, config);
    };

    return { apiListSurchargeCar };
};

export default apiVehicleSurcharge;
