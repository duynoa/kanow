import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

// cancel rental car
const getListReasonsCancel = () => {
    // let config: AxiosRequestConfig = {
    //     params: {
    //         type, // Nối các tham số trong param object
    //     },
    // };

    return axios.get("/category/getListNoteCancel")
}


export {
    getListReasonsCancel,   
}