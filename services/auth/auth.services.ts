import axios from "../../utils/axios-customize";

const useAuthenticationAPI = () => {
    const apiLogin = (data: any) => {
        return axios.post(`/login`, data);
    };

    const apiInfoUser = () => {
        return axios.post(`/get_info_account`);
    };

    return { apiLogin, apiInfoUser };
};
export default useAuthenticationAPI;
