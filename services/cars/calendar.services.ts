import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

const getListCalendarPriceMonth = (param: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get("/car/getPriceMonth", config)
}

export {
    getListCalendarPriceMonth
}