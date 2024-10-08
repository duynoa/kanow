import axios from "../../utils/axios-customize";
// chính sách ....
const usePolicyApi = () => {
    const apiPolicyList = (type: any) => {
        return axios.get(`/policy/getList?type=${type}`);
    };

    return { apiPolicyList };
};

export default usePolicyApi;
