import { getListBlogNewsAndEvents } from "@/services/blog/blog.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface NewsEventParams {
    page: number | string;
    limit: number | string;
}

export const useGetNewsEventList = ({ page, limit }: NewsEventParams) => {
    const fetchNewsEventList = async () => {
        try {
            const dataParams = {
                current_page: page,
                per_page: limit,
            };
            const { data } = await getListBlogNewsAndEvents(dataParams);

            return data;
        } catch (err) {
            throw err;
        }
    };

    return useQuery<any, Error>({
        queryKey: ["getListBlogNewsAndEvents"],
        queryFn: fetchNewsEventList,
        placeholderData: keepPreviousData,
        // enabled: !!language && action === "edit"
    });
};
