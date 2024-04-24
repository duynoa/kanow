import axios from "../../../utils/axios-customize";
import { AxiosRequestConfig } from "axios";
const apiMyCar = () => {
    const apiContract = () => {
        return axios.get(`/category/getListContractTemplate`);
    };

    const apiListCar = (page: string | number, limit: string | number, param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                current_page: page,
                per_page: limit,
                ...param, // Nối các tham số trong param object
            },
        };
        return axios.get(`/car/getList`, config);
    };

    const apiListStatusFilter = () => {
        return axios.get(`/category/getListStatusCar`);
    };

    //Đăng ký xe

    // api danh sách hãng xe
    const apiListCarCompany = (nameSearch: any, typePage: string | number, param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                name_search: nameSearch,
                type: typePage,
                ...param, // Nối các tham số trong param object
            },
        };
        return axios.get(`/category/getListCompanyCar`, config);
    };
    // danh sách loại xe
    const apiListCarModel = (nameSearch: any, typePage: string | number, param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                name_search: nameSearch,
                type: typePage,
                ...param, // Nối các tham số trong param object
            },
        };
        return axios.get(`/category/getListTypeCar`, config);
    };
    /// danh sách mẫu xe
    const apiListSampleCar = (nameSearch: any, id: any, param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                name_search: nameSearch,
                company_car_id: id,
                ...param, // Nối các tham số trong param object
            },
        };
        return axios.get(`/category/getListModelCar`, config);
    };

    // danh sách chuyển động, nhiên liệu
    const apiListMoveEndFeuelType = () => {
        return axios.get(`/category/getListUtilitiesCar`);
    };

    // Api danh sách tính năng
    const apiListFeature = () => {
        return axios.get(`/category/getListOtherAmenitiesCar`);
    };
    /// api lưu đăng ký xe tự lái
    const apiAddCar = (data: any) => {
        return axios.post(`/car/addCar`, data);
    };
    return {
        apiContract,
        apiListCar,
        apiListStatusFilter,
        apiListFeature,
        apiListCarCompany,
        apiListCarModel,
        apiListMoveEndFeuelType,
        apiAddCar,
        apiListSampleCar,
    };
};

export default apiMyCar;
