import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

const getListNotifications = (param: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get("/notification/getListNotification", config)
}

const postReadSingleNotification = (data: any) => {
    return axios.post("/notification/readSingleNotification", data)
}

const postReadAllNotifications = () => {
    return axios.post("/notification/readAllNotification")
}

export {
    getListNotifications,
    postReadAllNotifications,
    postReadSingleNotification
}