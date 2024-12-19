import { getListBlogNewsAndEvents } from "@/services/blog/blog.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface NewsEventParams {

}

export const useGetNewsEventList = ({  }: NewsEventParams) => {

    const fetchNewsEventList = async () => {
        try {
            const { data } = await getListBlogNewsAndEvents();

            return data
        } catch (err) {
            throw err
        }
    }

    return useQuery<any, Error>({
        queryKey: ["getListBlogNewsAndEvents"],
        queryFn: fetchNewsEventList,
        placeholderData: keepPreviousData,
        // enabled: !!language && action === "edit"
    });
};
