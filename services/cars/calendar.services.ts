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

// update tiền thứ 7 và chủ nhật
const putPriceSaturdayAndSunday = (data: any) => {
    return axios.post("/car/updateStatusPriceSunday", data)
}

// update ngày bận 
const putPriceStatus = (data: any) => {
    return axios.post("/car/updateStatusPrice", data)
}

export {
    getListCalendarPriceMonth,
    putPriceSingleDate,
    putPriceSaturdayAndSunday,
    putPriceStatus,
}