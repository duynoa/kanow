import axios from "../../../utils/axios-customize";
import { AxiosRequestConfig } from "axios";
const apiAddress = () => {
    ///Danh sách thành phố
    const apiListCity = (param: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param,
            },
        };
        return axios.get(`/category/getListProvince`, config);
    };

    //danh sách quận huyện
    const apiListDistrict = (param: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param,
            },
        };
        return axios.get(`/category/getListDistrict`, config);
    };
    //Danh sách phường xa
    const apiListWard = (param: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param,
            },
        };
        return axios.get(`/category/getListWard`, config);
    };

    // thêm địa chỉ
    const apiCreateAddress = (data: any) => {
        return axios.post(`/client/detailAddress`, data);
    };
    // danh sách địa chỉ
    const apiListAddress = () => {
        return axios.get(`/client/getListAddress`);
    };

    // chi tiết địa chỉ để sửa,
    const apiDetailAddress = (id: any) => {
        return axios.get(`/client/getDetailAddress/${id}`);
    };
    //Xóa địa chỉ

    const apiDeleteAddress = (id: any) => {
        return axios.get(`/client/deleteAddress/${id}`);
    };

    return {
        apiListCity,
        apiListDistrict,
        apiListWard,
        apiCreateAddress,
        apiListAddress,
        apiDetailAddress,
        apiDeleteAddress,
    };
};

export default apiAddress;
