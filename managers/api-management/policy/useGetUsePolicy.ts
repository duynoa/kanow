import usePolicyApi from "@/services/policy/policy.services";
import { useQuery } from "@tanstack/react-query";

export const useGetUsePolicy = () => {
    const { apiPolicyUse } = usePolicyApi();
    return useQuery({
        queryKey: ["getUsePolicy"],
        queryFn: async () => {
            const { data } = await apiPolicyUse();
            return data;
        },
    });
};
