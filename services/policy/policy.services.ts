import axios from "../../utils/axios-customize";
// chính sách ....
const usePolicyApi = () => {
    const apiPolicyList = (type: any) => {
        return axios.get(`/policy/getList?type=${type}`);
    };

    // hd sử dụng
    const apiPolicyUse = () => {
        return axios.get(`/setup_qa/getListCategorySetupQa`);
    };

    return { apiPolicyList, apiPolicyUse };
};

export default usePolicyApi;
