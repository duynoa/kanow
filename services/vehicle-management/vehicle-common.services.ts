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

    const apiUpdateCar = (data: any) => {
        return axios.post(`/car/updateCar`, data);
    };

    const apiListOtherAmenitiesCar = () => {
        return axios.get(`/category/getListUtilitiesCar`);
    };

    const apiOpenSwitchLayout = (data: any) => {
        return axios.post("/car/changeStatusType", data);
    };

    return { apiDetailCar, apiUpdateCar, apiListOtherAmenitiesCar, apiOpenSwitchLayout };
};

export default apiVehicleCommon;
