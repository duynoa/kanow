import axios from "../../../utils/axios-customize";

const apiDeleteAccount = () => {
    const apiLogAccount = () => {
        return axios.get(`/client/getListAddress`);
    };

    return { apiLogAccount };
};

export default apiDeleteAccount;
