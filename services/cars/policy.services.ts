import axios from "../../utils/axios-customize";

const getDataPolicy = () => {
    return axios.get(`/category/getDataCar`);
};

export {
    getDataPolicy
}