import axios from "../../../utils/axios-customize";

const apiDeleteAccount = () => {
    const apiLogAccount = () => {
        return axios.post(`/lockAccount`);
    };

    return { apiLogAccount };
};

export default apiDeleteAccount;
