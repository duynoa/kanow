import axios from "../../utils/axios-customize";

const apiAccount = () => {
    const apiUpdateInfo = (data: any) => {
        return axios.post(`/update_account`, data);
    };

    return { apiUpdateInfo };
};

export default apiAccount;
