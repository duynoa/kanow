import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

const apiVehicleCommon = () => {
    // api chi tiết
    const apiDetailCar = (id: string | number, param?: any) => {
        let config: AxiosRequestConfig = {
            params: {
                ...param, // Nối các tham số trong param object
            },
        };

        return axios.get(`/car/getDetail/${id}`, config);
    };
    // api cập nhật thông tin
    const apiUpdateCar = (data: any) => {
        return axios.post(`/car/updateCar`, data);
    };
    // api dữ liệu khác
    const apiListOtherAmenitiesCar = () => {
        return axios.get(`/category/getListUtilitiesCar`);
    };
    /// tắt mở nút swwithc been tab
    const apiOpenSwitchLayout = (data: any) => {
        return axios.post("/car/changeStatusType", data);
    };

    // api giá thuê đề xuất
    const apiRentCostPropose = (data: any) => {
        return axios.post("/category/getRentCostPropose", data);
    };

    return { apiDetailCar, apiUpdateCar, apiListOtherAmenitiesCar, apiOpenSwitchLayout, apiRentCostPropose };
};

export default apiVehicleCommon;
