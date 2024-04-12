import axios from "../../utils/axios-customize";

const useAuthenticationAPI = () => {
    const apiLogin = (data: any) => {
        return axios.post(`/login`, data);
    };
    const apiLoginGoogle = (data: any) => {
        return axios.post(`/sign_up_to_google`, data);
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

    /// đổi mật khẩu
    const apiChangePassword = (data: any) => {
        return axios.post(`/update_account`, data);
    };

    const getKeySettings = () => {
        return axios.get(`/get_info_settings`);
    };

    return {
        apiLogin,
        apiInfoUser,
        apiLogout,
        apiSignup,
        apiOtpSignup,
        apiChangePassword,
        getKeySettings,
        apiLoginGoogle,
    };
};

export default useAuthenticationAPI;
