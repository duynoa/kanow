import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

// lấy bộ lịch danh sách trong tháng
const getListCalendarPriceMonth = (param: any) => {
    let config: AxiosRequestConfig = {
        params: {
            ...param, // Nối các tham số trong param object
        },
    };

    return axios.get("/car/getPriceMonth", config)
}

// update tiền ngày đơn
const putPriceSingleDate = (data: any) => {
    return axios.post("/car/updatePrice", data)
}

// update tiền nhiều ngày 
const putPriceMultiDate = (data: any) => {
    return axios.post("/car/updateStatusPriceMulti", data)
}

// update tiền thứ 7 và chủ nhật
const putPriceSaturdayAndSunday = (data: any) => {
    return axios.post("/car/updateStatusPriceSunday", data)
}

// update ngày bận 
const putPriceBusyDay = (data: any) => {
    return axios.post("/car/updateStatusPrice", data)
}

// đổi số lượng tháng của xe tự lái
const postChangeQuantityMonths = (data: any) => {
    return axios.post("/car/price_month_car", data)
}

// đổi số lượng tháng của xe có tài
const postChangeQuantityMonthsTalend = (data: any) => {
    return axios.post("/car/price_month_car_talent", data)
}

export {
    getListCalendarPriceMonth,
    putPriceSingleDate,
    putPriceMultiDate,
    putPriceSaturdayAndSunday,
    putPriceBusyDay,
    postChangeQuantityMonths,
    postChangeQuantityMonthsTalend
}