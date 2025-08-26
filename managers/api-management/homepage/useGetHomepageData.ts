import { getHomepageData } from "@/services/homepage/homepage.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IHomepageResponse } from "@/types/Homepage/IHomepage";

interface HomepageDataParams {
  [key: string]: any; // Cho phép params tùy ý
}

export const useGetHomepageData = (params?: HomepageDataParams) => {
  const fetchHomepageData = async (): Promise<IHomepageResponse> => {
    try {
      const { data } = await getHomepageData(params);

      return data;
    } catch (err) {
      throw err;
    }
  };

  return useQuery<IHomepageResponse, Error>({
    queryKey: ["getHomepageData", params],
    queryFn: fetchHomepageData,
    placeholderData: keepPreviousData,
    // enabled: true // Luôn fetch data khi component mount
  });
};
