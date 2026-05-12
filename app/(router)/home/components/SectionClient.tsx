"use client";

import { Button } from "@/components/ui/button";
import { useResize } from "@/hooks/useResize";
import { useGetHomepageData } from "@/managers/api-management/homepage/useGetHomepageData";
import { PartnerItem } from "@/types/Homepage/IHomepage";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {};

// const dataPartners: PartnerItem[] = [
//   {
//     id: 1,
//     image: "/icon/about/icon_about_1.png", // Placeholder image
//     name: "Quán Rành Là Nhậu",
//     address: "2.8 phan xích long Tân Bình",
//     phone: "0938598494",
//   },
//   {
//     id: 2,
//     image: "/icon/about/icon_about_2.png",
//     name: "Cafe Sáng Tạo",
//     address: "Nguyễn Trãi, Quận 1",
//     phone: "0966696609",
//   },
//   {
//     id: 3,
//     image: "/icon/about/icon_about_3.png",
//     name: "Nhà Hàng Gia Đình",
//     address: "Lê Lợi, Quận 3",
//     phone: "0329283498",
//   },
//   {
//     id: 4,
//     image: "/icon/about/icon_about_4.png",
//     name: "Bar Rooftop View",
//     address: "Đồng Khởi, Quận 1",
//     phone: "0908308113",
//   },
//   {
//     id: 5,
//     image: "/icon/about/icon_about_5.png",
//     name: "Quán Nướng BBQ",
//     address: "Hai Bà Trưng, Quận 3",
//     phone: "0983611989",
//   },
//   {
//     id: 6,
//     image: "/icon/about/icon_about_6.png",
//     name: "Spa Relax Center",
//     address: "Nam Kỳ Khởi Nghĩa, Quận 3",
//     phone: "0937632118",
//   },
//   {
//     id: 7,
//     image: "/icon/about/icon_about_7.png",
//     name: "Karaoke Golden",
//     address: "Cách Mạng Tháng 8, Quận 10",
//     phone: "0985593011",
//   },
// ];

const SectionClient = (props: Props) => {
  const swiperRefPartner = useRef<any>(null);

  // Call homepage API and log data
  const {
    data: homepageData,
    isLoading,
    isError,
    error,
  } = useGetHomepageData();

  // Log data để debug
  // React.useEffect(() => {
  //   if (homepageData) {
  //     console.log("🏠 Homepage Data:", homepageData);
  //     console.log("🏢 Partners Data:", homepageData.partner);
  //     console.log("🗺️ Provinces Data:", homepageData.data);
  //   }
  //   if (isError) {
  //     console.error("❌ Homepage API Error:", error);
  //   }
  //   if (isLoading) {
  //     console.log("⏳ Homepage API Loading...");
  //   }
  // }, [homepageData, isLoading, isError, error]);

  // Sử dụng dữ liệu thực từ API, fallback sang mock data nếu chưa có
  const partnersToDisplay: PartnerItem[] = homepageData?.partner || [];
  //   const partnersToDisplay: PartnerItem[] = [];

  // slider partners
  const [sliderStartPartner, setSliderStartPartner] = useState<boolean>(true);
  const [sliderEndPartner, setSliderEndPartner] = useState<boolean>(false);

  const handlePrev = (e: any, type: string) => {
    if (swiperRefPartner.current && !sliderStartPartner && type === "partner") {
      swiperRefPartner?.current?.slidePrev();
      setSliderStartPartner(swiperRefPartner.current.isBeginning);
      setSliderEndPartner(swiperRefPartner.current.isEnd);
    }
  };

  const handleNext = (e: any, type: string) => {
    if (swiperRefPartner.current && !sliderEndPartner && type === "partner") {
      swiperRefPartner?.current?.slideNext();
      setSliderStartPartner(swiperRefPartner.current.isBeginning);
      setSliderEndPartner(swiperRefPartner.current.isEnd);
    }
  };

  const handleDownloadClick = () => {
    const userAgent =
      navigator.userAgent || (navigator as any).vendor || (window as any).opera;

    if (/android/i.test(userAgent)) {
      // Điều hướng đến Google Play
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.kanow&pcampaignid=web_share";
    } else if (
      /iPad|iPhone|iPod/.test(userAgent) &&
      !(window as any).MSStream
    ) {
      // Điều hướng đến App Store
      window.location.href =
        "https://apps.apple.com/vn/app/kanow-thu%C3%AA-xe-t%E1%BB%B1-l%C3%A1i/id6503139402?l=vi";
    } else {
      // Điều hướng đến trang web hoặc link dự phòng
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.kanow&pcampaignid=web_share";
    }
  };

  return (
    <div className="relative z-20 bg-cover bg-right-bottom shadow-md flex flex-col gap-2 w-full 3xl:py-20 2xl:py-16 xl:py-14 lg:py-12 py-16">
      <div className="custom-container flex flex-col 3xl:gap-8 gap-6">
        <div className="flex flex-col gap-2">
          <div className="3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl text-[26px] leading-tight capitalize font-bold md:max-w-[85%] max-w-full text-[#101010]">
            Đối tác kết nối dịch vụ tìm tài xế
          </div>
          <div className="3xl:text-base xl:text-sm md:text-xs text-sm text-[#8C93A3] font-medium">
            Khám phá hàng ngàn đối tác uy tín đã kết nối với KANOW
          </div>
        </div>

        <div className="relative">
          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRefPartner.current = swiper;
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={800}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1920: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="custom-swiper-partner 3xl:h-[400px] xxl:h-[380px] xl:h-[360px] lg:h-[340px] h-[320px]"
          >
            {partnersToDisplay?.length > 0 &&
              partnersToDisplay?.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white rounded-xl border border-gray-200 transition-shadow duration-300 overflow-hidden cursor-pointer h-full">
                    {/* Image Container */}
                    <div className="px-4 pt-4 relative w-full h-[180px] md:h-[220px] lg:h-[230px] xl:h-[240px] xxl:h-[280px]">
                      <Image
                        alt={`${item.name} image`}
                        src={item.image}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover rounded-xl"
                        sizes="100vw"
                        priority
                        fetchPriority="high"
                        quality={60}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col gap-3 h-[calc(100%-12rem)]">
                      <h3 className="font-bold text-lg text-[#101010] line-clamp-2">
                        {item.name}
                      </h3>

                      <div className="flex flex-col gap-2 text-sm text-[#8C93A3]">
                        <div className="flex items-start gap-2">
                          <svg
                            className="text-base text-[#FA3434] w-[16px] max-w-[16px]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="line-clamp-2">{item.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

            <div className="hidden xl:flex gap-2 absolute 3xl:-top-24 xl:top-[-15%] lg:top-[-15%] md:top-[-15%] top-[-12%] right-0 disable-selection">
              <TiArrowLeft
                onClick={(e) => handlePrev(e, "partner")}
                className={`${
                  sliderStartPartner
                    ? "bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed"
                    : "bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition"
                } p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
              />
              <TiArrowRight
                onClick={(e) => handleNext(e, "partner")}
                className={`${
                  sliderEndPartner
                    ? "bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed"
                    : "bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition"
                } p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
              />
            </div>
        </div>

        <div className="pt-6 flex items-center  justify-center">
          <Button
            size="readMore"
            className="2xl:px-8 2xl:py-3 xl:px-6 xl:py-3 px-4 py-2 flex items-center gap-2 font-bold text-[#000000] bg-[#9DF2EE] hover:bg-[#9DF2EE]/70 group-hover:translate-x-2"
            onClick={handleDownloadClick}
          >
            <span className="xl:text-base lg:text-sm md:text-base text-lg">
              Tìm tài xế ngay
            </span>
            <IoArrowForwardOutline className="xl:text-xl text-lg -rotate-45" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SectionClient;
