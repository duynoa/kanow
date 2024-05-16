import { AxiosRequestConfig } from "axios";
import axios from "../../utils/axios-customize";

const getPanymentGuide = () => {
    return axios.get("/category/getListGuidePayment");
};

export { getPanymentGuide };
