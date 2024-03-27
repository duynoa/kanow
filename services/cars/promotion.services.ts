import axios from "../../utils/axios-customize";

// post update favorite heart car
const getListPromotions = (data: any) => {
    return axios.get(
        `/promotion/getListPromotion?current_page=1&per_page=10`,
        data
    );
};

export { getListPromotions };
