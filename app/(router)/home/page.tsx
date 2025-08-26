"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import IntroSection from "./components/IntroSection";
import SectionCardCar from "./components/SectionCardCar";
import SectionBannerPromotion from "./components/SectionBannerPromotion";
import SectionPlaceProminent from "./components/SectionPlaceProminent";
import SectionTripCarServices from "./components/SectionTripCarServices";
import SectitonWhyWe from "./components/SectitonWhyWe";
import SectionShowApp from "./components/SectionShowApp";
import SectionArticle from "./components/SectionArticle";
import { getListCarsForYou } from "@/services/cars/cars.services";
import { useDataHome } from "@/hooks/useDataQueryKey";
import { CustomDataListCars } from "@/custom/CustomData";
import SectionFeedbackCustomer from "./components/SectionFeedbackCustomer";
import SectionClient from "./components/SectionClient";

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Lấy thời điểm hiện tại
  const currentTime = new Date();
  // Tính thời điểm hết hạn của cookie là 60 giây sau thời điểm hiện tại
  const expirationTime = new Date(currentTime.getTime() + 30 * 60 * 1000);

  const { isStateDataHome, queryKeyIsStateDataHome } = useDataHome();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchListCarsForYou = async () => {
      const params = {
        type: 1,
      };

      queryKeyIsStateDataHome({
        ...isStateDataHome,
        loading: {
          isLoadingListCars: true,
        },
      });

      const { data } = await getListCarsForYou(params);

      if (data && data.data && data.base) {
        let { customDataListCars } = CustomDataListCars(data);

        queryKeyIsStateDataHome({
          listCardCarsForYou: customDataListCars,
          loading: {
            isLoadingListCars: false,
          },
        });
      } else {
        queryKeyIsStateDataHome({
          ...isStateDataHome,
          loading: {
            isLoadingListCars: false,
          },
        });
      }
    };

    fetchListCarsForYou();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-[#FBFBFC] ">
      <IntroSection />
      <SectionCardCar />
      <SectionClient />
      <SectionBannerPromotion />
      <SectionPlaceProminent />
      <SectionTripCarServices />
      <SectitonWhyWe />
      <SectionFeedbackCustomer />
      <SectionShowApp />
      <SectionArticle />
    </div>
  );
}
