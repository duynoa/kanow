import axios from "../../utils/axios-customize";
import { AxiosRequestConfig } from "axios";
const apiGoogleKey = () => {
    const apiGetGoogleKey = () => {
        return axios.get(`/get_info_settings`);
    };
    return { apiGetGoogleKey };
};

export default apiGoogleKey;
