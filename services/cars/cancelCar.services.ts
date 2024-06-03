import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

// cancel rental car
const getListReasonsCancel = (param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };
    return axios.get("/category/getListNoteCancel", config)
}


export {
    getListReasonsCancel,
}