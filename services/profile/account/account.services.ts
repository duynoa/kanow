import { AxiosRequestConfig } from "axios";
import axios from "../../../utils/axios-customize";

const apiAccount = () => {
    const apiUpdateInfo = (data: any) => {
        return axios.post(`/update_account`, data);
    };

    const apiPaginationStartingUser = (data: any) => {
        return axios.post(`/get_info_account`, data);
    };

    const apiListRatings = (data: any) => {
        return axios.post(`/getListReview`, data);
    };

    return { apiUpdateInfo, apiPaginationStartingUser, apiListRatings };
};

export default apiAccount;
