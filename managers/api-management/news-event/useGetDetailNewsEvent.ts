import { getDetailNewsEvents } from "@/services/blog/blog.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface NewsEventDetailParams {
    idBlog: number | string,
}

export const useGetDetailNewsEvent = ({ idBlog }: NewsEventDetailParams) => {

    const fetchDetailNewsEvent = async () => {
        try {
            const { data } = await getDetailNewsEvents(idBlog);

            return data
        } catch (err) {
            throw err
        }
    }

    return useQuery<any, Error>({
        queryKey: ["getDetailNewsEvents",idBlog],
        queryFn: fetchDetailNewsEvent,
        placeholderData: keepPreviousData,
        enabled: !!idBlog
    });
};
