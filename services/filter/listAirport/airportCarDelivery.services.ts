import axios from "../../../utils/axios-customize";
// danh sách sân bay trong bộ lọc địa chỉ theo vị trí
const useAirportCarDeliveryApi = () => {
    const apiGetListAirportCarDelivery = () => {
        return axios.get(`/category/getListCategoryLocation`);
    };

    return { apiGetListAirportCarDelivery };
};

export default useAirportCarDeliveryApi;
