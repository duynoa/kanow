import axios from "../../utils/axios-customize";

const useAuthenticationAPI = () => {
    const apiLogin = (data: any) => {
        return axios.post(`/login`, data);
    };

    const apiInfoUser = () => {
        return axios.post(`/get_info_account`);
    };

    const apiLogout = () => {
        return axios.post("/logout");
    };

    const apiSignup = (data: any) => {
        return axios.post(`/sign_up`, data);
    };

    const apiOtpSignup = (data: any) => {
        return axios.post(`/create_otp_sign_up`, data);
    };

    return { apiLogin, apiInfoUser, apiLogout, apiSignup, apiOtpSignup };
};

export default useAuthenticationAPI;
