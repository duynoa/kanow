import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

// lấy danh sách cars
const getListCars = (
    page: string | number,
    limit: string | number,
    param?: any
) => {
    // Chuyển đổi mảng thành chuỗi query string
    let config: AxiosRequestConfig = {
        params: {
            current_page: page,
            per_page: limit,
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/car/getList`, config);
};
// const getListCars = (
//     page: string | number,
//     limit: string | number,
//     query?: string,

// ) => {
//     return axios.get(
//         `/car/getList?current_page=${page}&per_page=${limit}${
//             query ? `&${query}` : ""
//         }`
//     );
// };

// lấy danh sách hãng xe
const getListAutomaker = () => {
    return axios.get(`/car/getListCompanyCar`);
};

// lấy danh sách loại xe
const getListTypeCars = () => {
    return axios.get(`/car/getListTypeCar`);
};

// get data detail car
const getDataDetailCar = (id: string | number) => {
    return axios.get(`/car/getDetail/${id}`);
};

// post update favorite heart car
const postUpdateFavoriteHeartCar = (data: any) => {
    return axios.post(`/car/changeFavouriteCar`, data);
};

export {
    getListCars,
    getListAutomaker,
    getListTypeCars,
    getDataDetailCar,
    postUpdateFavoriteHeartCar,
};
