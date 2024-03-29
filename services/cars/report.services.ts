import { AxiosRequestConfig } from "axios";

import axios from "../../utils/axios-customize";

// Lấy danh sách báo cáo xe
const getListReportCar = () => {
    return axios.get(`/category/getListCategoryReport?current_page=1&per_page=10`);
};
// post báo cáo xe
const postReportCar = (data: any) => {
    return axios.post(`/car/addReportCar`, data);
};

export { getListReportCar, postReportCar };
