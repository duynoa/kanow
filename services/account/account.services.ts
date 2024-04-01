import axios from "../../utils/axios-customize";

const apiAccount = () => {
    const apiUpdateInfo = (data: any) => {
        return axios.post(`/update_account`, data);
    };

    const apiPaginationStartingUser = (data: any) => {
        return axios.post(`/get_info_account`, data);
    };

    return { apiUpdateInfo, apiPaginationStartingUser };
};

export default apiAccount;
