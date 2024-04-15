import axios from "../../utils/axios-customize";

const useAirportCarDeliveryApi = () => {
    const apiGetListAirportCarDelivery = () => {
        return axios.get(`/category/getListCategoryLocation`);
    };

    return { apiGetListAirportCarDelivery };
};

export default useAirportCarDeliveryApi;
