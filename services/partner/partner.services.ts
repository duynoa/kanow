import axios from "../../utils/axios-customize";
// danh sách sân bay trong bộ lọc địa chỉ theo vị trí
const usePartnerApi = () => {
    const apiRegisterOwnerDriver = (data: any) => {
        return axios.post(`/become_partner/detailBecomePartner`, data);
    };

    return { apiRegisterOwnerDriver };
};

export default usePartnerApi;
