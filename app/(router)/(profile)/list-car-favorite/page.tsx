"use client"
import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import { useResize } from '@/hooks/useResize'
import { FaCircleCheck } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import { CustomDataListCars } from '@/custom/CustomData'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useRef, useState } from 'react'
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti'
import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import SkeletonCarFavorite from './components/SkeletonCarFavorite'
import BackgroundUiProfile from '@/themes/profile/BackgroundUiProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import apiListCarFavorite from '@/services/profile/listCarFavorite/listCarFavorite.services'
import { FormatNumberHundred, FormatNumberToDecimal, FormatNumberToThousands } from '@/components/format/FormatNumber'
import { IListCarFavorite } from '@/types/Profile/IListCarFavorite'
import Nodata from '@/components/image/Nodata'

type Props = {}

const ListCarFavorite = (props: Props) => {
    const initialData: IListCarFavorite = {
        isLoadingCar: false,
        dataDrivingCar: [],
        datalentedCar: [],
        ///xe tu lai
        page: 1,
        limit: 4,
        next: "",
        favourite: "1",
        totalDrivingCar: 0,
        isLoadingScroll: false
    }
    // THÊM MỘT HẰNG SỐ ĐỂ ĐỊNH NGHĨA KHOẢNG ĐỘ CHO PHÉP
    const ALLOWED_OFFSET = 100;
    // const ALLOWED_OFFSET = 900;

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const isAtBottomRef = useRef<boolean>(false);
    // SỬ DỤNG TRONG SCROLL ĐỂ NGĂN CHẶN VIỆC GỌI API LIÊN TỤC
    const lastContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isState, sIsState] = useState<IListCarFavorite>(initialData)

    const { apiListCar, apiUpdateFavoriteHeartCar } = apiListCarFavorite()

    const queryState = (key: any) => sIsState((prev: any) => ({ ...prev, ...key }))

    const handleFetchListCars = async () => {
        try {
            queryState({ isLoadingCar: true })
            const { data } = await apiListCar(isState.page, isState.limit, { favourite: isState.favourite })
            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)
                queryState({
                    dataDrivingCar: customDataListCars,
                    page: isState.page + 1,
                    next: data?.links?.next,
                    totalDrivingCar: data?.meta?.total
                })
            }

        }
        catch (err) {
            throw err
        }
        finally {
            queryState({ isLoadingCar: false })
        }

    }

    useEffect(() => {
        handleFetchListCars()
    }, [isState.favourite])


    useEffect(() => {
        const handleWheel = (event: any) => {
            const scrollContainer = scrollContainerRef.current;
            const lastContainer = lastContainerRef.current;

            if (!scrollContainer || !lastContainer || isState.isLoadingScroll) return;

            const scrollContainerBottom = Math.floor(scrollContainer.getBoundingClientRect().bottom);
            const lastContainerBottom = Math.floor(lastContainer.getBoundingClientRect().bottom);

            const containerHeight = scrollContainer.clientHeight;
            const threshold = containerHeight * 0.1; // 10% của kích thước containe

            if (scrollContainerBottom <= lastContainerBottom + threshold) {
                if (isState.dataDrivingCar && isState.next !== null) {
                    queryState({ isLoadingScroll: true });
                    const fetchDataListCar = async () => {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1500));

                            const { data } = await apiListCar(isState.page, isState.limit, { favourite: isState.favourite });

                            if (data && data?.links && data?.data && data?.base) {
                                let { customDataListCars } = CustomDataListCars(data)
                                if (!isState.isLoadingScroll) {
                                    queryState({
                                        dataDrivingCar: [...(isState.dataDrivingCar || []), ...customDataListCars],
                                        next: data?.links?.next,
                                        page: isState.page + 1,
                                    })
                                }
                                // setTimeout(() => {
                                //     const lastElementId = customDataListCars && customDataListCars.length > 0 ? customDataListCars[customDataListCars.length - 1].id : null;
                                //     const lastElement = document.getElementById(`card-${lastElementId}`);
                                //     if (lastElement) {
                                //         lastElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                                //     }

                                //     const scrollContainer = document.getElementById("scroll-container");
                                //     if (scrollContainer) {
                                //         const scrollHeight = scrollContainer.scrollHeight;
                                //         const clientHeight = scrollContainer.clientHeight;
                                //         const paddingBottom = Math.max(0, clientHeight - scrollHeight + 50); // Thêm 50px khoảng cách
                                //         const currentScrollTop = scrollContainer.scrollTop;
                                //         scrollContainer.scrollTop = currentScrollTop + paddingBottom; // Thay đổi vị trí cuộn
                                //     }
                                // }, 100);

                            } else {
                                queryState({
                                    listCardCars: isState.dataDrivingCar,
                                    next: data?.links?.next,
                                    page: data?.links?.next !== null ? isState.page + 1 : isState.page,
                                    isLoadingScroll: false,
                                });
                            }
                        } catch (error) {
                            console.error("Error fetching data:", error);
                        } finally {
                            queryState({ isLoadingScroll: false });
                        }

                    };
                    fetchDataListCar()
                } else {
                    console.log("check next false");
                }
            }

        }

        const scrollCurrent = scrollContainerRef.current;

        scrollCurrent?.addEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);

        return () => {
            scrollCurrent?.removeEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);
        };
    }, [
        scrollContainerRef,
        isState.next,
        isState.page,
        isState.isLoadingScroll,
    ]);

    const handleClickFavorite = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, car_id?: number | string) => {
        e.stopPropagation()
        e.preventDefault();
        if (car_id) {
            try {
                const { data: dataHeart } = await apiUpdateFavoriteHeartCar({ "car_id": car_id, "status": 0 })
                if (dataHeart?.result) {
                    const { data } = await apiListCar(1, isState.limit, { favourite: isState.favourite })
                    if (data && data.data && data.base) {
                        let { customDataListCars } = CustomDataListCars(data)
                        queryState({
                            dataDrivingCar: customDataListCars,
                            page: 2,
                            next: data?.links?.next,
                            totalDrivingCar: data?.meta?.total
                        })
                    } else {
                        console.log(data);
                    }
                } else {
                    console.log(dataHeart?.message);

                }
            } catch (err) {
                throw err
            }
        }
    };


    return (
        <BackgroundUiProfile className='space-y-4 lg:pr-2 pr-3'>
            <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Xe yêu thích của tôi</h1>
            <Tabs defaultValue="1" onValueChange={value => queryState({ favourite: value, page: 1 })} className="w-full">
                <TabsList className='bg-transparent border-b border-b-[#F6F6F8] rounded-none w-full justify-start gap-8 p-0'>
                    <TabsTrigger
                        value="1"
                        className='data-[state=active]:text-[#2FB9BD] text-[#667085] data-[state=active]:border-b-[#2FB9BD]
                                border-b-2 border-transparent rounded-none pb-[15px] px-0 font-semibold text-sm leading-[17px]'>
                        Xe tự lái ({isState.totalDrivingCar})
                    </TabsTrigger>
                    <TabsTrigger
                        value="2"
                        className='data-[state=active]:text-[#2FB9BD] text-[#667085] data-[state=active]:border-b-[#2FB9BD]
                                border-b-2 border-transparent rounded-none pb-[15px] px-0 font-semibold text-sm leading-[17px]'>
                        Xe có tài (100)
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="1" className='lg:mt-4 mt-5'>
                    <ScrollArea
                        ref={scrollContainerRef}
                        id='scroll-container'
                        className={`${isState.dataDrivingCar?.length > 0 && isVisibleMobile ? 'h-[1380px]' : isVisibleTablet ? 'h-[1680px]' : 'h-[780px]'} lg:pr-6 pr-3`}
                    >
                        <div className='flex flex-col gap-4'>
                            {isState.isLoadingCar ?
                                <>
                                    {[...Array(3)].map((_, index) => (
                                        <SkeletonCarFavorite key={index} />
                                    ))}
                                </>
                                :
                                isState.dataDrivingCar?.length > 0 ? isState.dataDrivingCar.map((card, index) => (
                                    <div
                                        key={card.id}
                                        id={`card-${card.id}`}
                                        className={`flex lg:flex-nowrap flex-wrap lg:gap-6 gap-3 xl:items-start lg:items-start items-start bg-white border-[#D7D9E0] border w-full p-4 rounded-xl relative z-0`}
                                    >
                                        <Link
                                            prefetch={false}
                                            href={`/detail-car/${card.id}?${ConvertToSlug(card?.name_car)}`}
                                            className='3xl:w-[30%] xxl:w-[35%]  2xl:w-[35%] xl:w-[40%] lg:w-[45%] w-full 3xl:h-[210px] xxl:h-[185px] 2xl:h-[190px] xl:h-[175px] lg:h-[165px] md:h-[280px] h-[180px] relative'>
                                            <Image
                                                src={card?.image_car?.length > 0 ? card?.image_car[0]?.name : '/default/default.png'}
                                                alt="image_card"
                                                width={1280}
                                                height={1024}
                                                className='rounded-xl h-full w-full object-cover'
                                            />
                                            <div
                                                onClick={(event) => handleClickFavorite(event, card.id)}
                                                className='absolute right-2 top-2 bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out z-20'
                                            >
                                                <TiHeartFullOutline className={`${card.favorite_car ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                                            </div>
                                            <div className='flex gap-2 absolute bottom-[10px] left-[10px]'>
                                                {
                                                    card?.type?.mortgage ?
                                                        <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                            Miễn thế chấp
                                                        </Badge>
                                                        :
                                                        null
                                                }
                                                {
                                                    card?.type?.book_car_flash ?
                                                        <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                            Đặt xe nhanh
                                                        </Badge>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </Link>
                                        <div className='3xl:w-[50%] xxl:w-[45%] 2xl:w-[45%] xl:w-[40%] lg:w-[45%] w-full flex flex-col 3xl:gap-2 xxl:gap-2.5 2xl:gap-2 xl:gap-2 lg:gap-2 gap-3'>
                                            <div className='flex items-center gap-2 '>

                                                <Badge className='bg-[#C9DCF9]/35 hover:bg-[#C9DCF9]/50 text-[#3561FF] 3xl:text-sm text-xs font-medium cursor-default caret-transparent'>
                                                    {card?.type?.transmission_search ? card?.type?.transmission_search : ""}
                                                </Badge>
                                                {
                                                    card?.type?.delivery_car ?
                                                        <Badge className='bg-[#F9ECC9]/35 hover:bg-[#F9ECC9]/50 text-[#FF9900] 3xl:text-sm text-xs font-medium cursor-default'>
                                                            Giao tận nơi
                                                        </Badge>
                                                        :
                                                        null
                                                }
                                            </div>
                                            <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase'>
                                                {card.name_car ? card.name_car : ''}
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                <TiLocation className='text-base text-[#FA3434] w-[16px] max-w-[16px]' />
                                                <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%]'>
                                                    {card.address ? card.address : ''}
                                                </div>
                                            </div>
                                            <div className='border-b lg:hidden block border-[#D7D9E0]/50 w-full col-span-12' />
                                            <div className={`flex lg:flex-col xl:justify-start lg:justify-center md:justify-between ${card.total_trip ? 'justify-between ' : 'justify-between px-3'} lg:px-0 px-2  flex-row 3xl:gap-2 2xl:gap-2 xxl:gap-2.5 xl:gap-2 lg:gap-2 gap-2  lg:bg-transparent lg:py-0 lg:rounded-none
                                                     rounded-md py-3 bg-[#F2FCF7] `}>
                                                <div className='flex lg:flex-col flex-row lg:items-start items-center gap-2'>
                                                    {
                                                        card.point_star ?
                                                            <div className='flex items-center gap-1'>
                                                                <div className='flex items-center gap-1'>
                                                                    <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#FFC118]' />
                                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                        {card.point_star ? (FormatNumberToDecimal(card.point_star, 1)) : 0}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        card.total_trip ?
                                                            <>
                                                                <div className='size-1 bg-[#B4B8C5] rounded-full md:hidden block'></div>
                                                                <div className='flex items-center gap-1'>
                                                                    <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#3AC996]' />
                                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                        {card.total_trip ? FormatNumberHundred(card.total_trip, 100) : 0} Chuyến
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                                Chưa có chuyến
                                                            </div>
                                                    }
                                                </div>
                                                <div className='flex items-center gap-1 3xl:mt-4 2xl:mt-3 xxl:mt-2 xl:mt-2'>
                                                    {
                                                        card?.promotion?.length > 0 ?
                                                            <>
                                                                <div className='3xl:text-[32px] xxl:text-2xl 2xl:text-[28px] xl:text-[18px] lg:text-xl text-base text-[#D7D9E0] font-medium line-through'>
                                                                    {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                </div>
                                                                <div className='flex'>
                                                                    <span className='3xl:text-[32px] xxl:text-2xl 2xl:text-[28px] xl:text-[18px] lg:text-xl text-base text-[#1AC5CA] font-medium'>
                                                                        {card.price_after_promotion ? FormatNumberToThousands(card.price_after_promotion) : 0}
                                                                    </span>
                                                                    <span className='xxl:text-[14px] 2xl:text-[16px] xl:text-[14px] text-xs text-[#585F71] flex justify-start font-bold capitalize'>
                                                                        /ngày
                                                                    </span>
                                                                </div>
                                                            </>
                                                            :
                                                            <div className='flex'>
                                                                <span className='3xl:text-[32px] xxl:text-2xl 2xl:text-[28px] xl:text-[18px] text-[#1AC5CA] font-medium'>
                                                                    {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                </span>
                                                                <span className='xxl:text-[14px] 2xl:text-[16px] xl:text-[14px] text-xs text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                    /ngày
                                                                </span>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className='3xl:w-[20%] xxl:w-[20%] 2xl:w-[20%] xl:w-[20%] lg:w-[15%] w-full flex lg:flex-col flex-row justify-start items-center lg:gap-2 gap-4  mt-2'>
                                            <div className="lg:size-11 size-10 lg:block hidden">
                                                <Avatar className='w-full h-full shadow'>
                                                    <AvatarImage
                                                        alt="@kanow"
                                                        src={card?.car_owner?.avatar ? card?.car_owner?.avatar : '/avatar/avatar_default.png'}
                                                    />
                                                    <AvatarFallback >
                                                        <Image
                                                            width={44}
                                                            height={44}
                                                            src='/avatar/avatar_default.png'
                                                            alt="@kanow"
                                                            className='w-full h-full'
                                                        />
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <Button
                                                type='button'
                                                onClick={(e: any) => handleClickFavorite(e, card.id)}
                                                className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] w-full xl:text-sm lg:text-[9px] text-sm
                                                        2xl:py-3 xl:py-2.5 lg:py-1.5 py-2.5  rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  lg:border border-[1.5px] uppercases`}>
                                                Bỏ thích
                                            </Button>
                                            <Link
                                                prefetch={false}
                                                href={`/detail-car/${card.id}?${ConvertToSlug(card?.name_car)}`}
                                                className={`bg-[#2FB9BD]/80 hover:bg-[#2FB9BD]/80 text-white border-[#2FB9BD] w-full xl:text-sm lg:text-[9px] text-sm text-center
                                                        2xl:py-3 xl:py-2.5 lg:py-1.5 py-2.5  rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  lg:border border-[1.5px] uppercases`}>
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                )) :
                                    // <div className='h-[472px]'>
                                    //     <Image src='/listCarFavorite/nodata.png' alt='' width={1280} height={1024} className='object-cover h-full -w-full' />
                                    // </div>
                                    <Nodata type='list-car-favorite' />
                            }
                        </div>

                        {
                            isState?.isLoadingScroll && (
                                <div className="w-full 3xl:h-[80px] h-[60px] flex justify-center items-center gap-2">
                                    <div className="text-[#2FB9BD] inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                                    <span className="text-[#2FB9BD] 3xl:text-xl text-base">Loading...</span>
                                </div>
                            )
                        }
                        <div ref={lastContainerRef} />
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="2" className='lg:mt-4 mt-5'>
                    <ScrollArea
                        ref={scrollContainerRef}
                        className={`${isState.datalentedCar?.length > 0 && isVisibleMobile ? 'h-[1380px]' : isVisibleTablet ? 'h-[1680px]' : 'h-[780px]'} lg:pr-6 pr-3`}
                    >
                        {/* <div className='h-[472px]'>
                            <Image src='/listCarFavorite/nodata.png' alt='' width={1280} height={1024} className='object-cover h-full -w-full' />
                        </div> */}
                        <Nodata type='list-car-favorite' />
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </BackgroundUiProfile >
    )
}

export default ListCarFavorite