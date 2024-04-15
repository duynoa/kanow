import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

const getListReasonsCancel = (car_id: any) => {
    let config: AxiosRequestConfig = {
        params: {
            car_id, // Nối các tham số trong param object
        },
    };

    return axios.get("/car/getPriceMonth", config)
}

export {
    getListReasonsCancel
}