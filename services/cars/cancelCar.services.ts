import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

// cancel rental car
const getListReasonsCancel = (type: any) => {
    let config: AxiosRequestConfig = {
        params: {
            type, // Nối các tham số trong param object
        },
    };

    return axios.get("/category/getListNoteCancel", config)
}
const postReasonCancelCar = (data: any) => {
    return axios.post("/transaction/changeStatus", data)
}

export {
    getListReasonsCancel,
    postReasonCancelCar
}