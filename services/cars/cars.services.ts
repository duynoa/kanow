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

// lấy danh sách hãng xe
const getListAutomaker = (param: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/car/getListCompanyCar`, config);
};

// lấy danh sách mẫu xe
const getListModelCars = (param: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/car/getListModelCar`, config);
};

// lấy danh sách loại xe
const getListTypeCars = (param: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/car/getListTypeCar`, config);
};

// get data detail car
const getDataDetailCar = (id: string | number, param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/car/getDetail/${id}`, config);
};
const getPriceDetail = (param: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };
    return axios.get(`/car/getPriceDetail`, config);
};

// post update favorite heart car
const postUpdateFavoriteHeartCar = (data: any) => {
    return axios.post(`/car/changeFavouriteCar`, data);
};

// api related vehicle (Xe liên quan)
const getListCarsRelated = (param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/car/getListCarRelated`, config)
}

// post request rental car
const postRequestRentalCar = (data: any) => {
    return axios.post(`/transaction/addTransaction`, data)
}

// danh sách xe dành cho bạn
const getListCarsForYou = (param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get(`/car/getListCarForYou`, config)
}

// post data hẹn tài xế
const postDriverAppointment = (data: any) => {
    return axios.post(`/driver_ticket/addDriverTicket`, data)
}

// post data change status flow thuê xe
const postChangeStatusRentalCar = (data: any) => {
    return axios.post("/transaction/changeStatus", data)
}

// get List all Review 
const getListAllReview = (param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };
    return axios.get("/car/getListReview", config)
}

// get list content review car (type 1: khách thuê đánh giá, type2: chủ xe đánh giá)
const getListContentReview = (param?: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };
    return axios.get("/category/getListContentRewiew", config)
}

// post add revieww car(type 1: khách thuê đánh giá, type2: chủ xe đánh giá)
const postAddReviewCar = (data: any) => {
    return axios.post("/transaction/addReview", data)
}

export {
    getListCars,
    getListAutomaker,
    getListModelCars,
    getListTypeCars,
    getDataDetailCar,
    getListCarsRelated,
    getListCarsForYou,
    postUpdateFavoriteHeartCar,
    postRequestRentalCar,
    postDriverAppointment,
    postChangeStatusRentalCar,
    getListContentReview,
    postAddReviewCar,
    getListAllReview,
    getPriceDetail
};
