"use client"

import { useEffect, useRef, useState } from "react"
import { useResize } from "@/hooks/useResize"
import apiMyCar from "@/services/profile/listMyCar/listMyCar.services"
import { CustomDataMyCar } from "@/custom/CustomData"
import { ScrollArea } from "@/components/ui/scroll-area"
import BackgroundUiProfile from "@/themes/profile/BackgroundUiProfile"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Contract from "./components/contract/Contract"
import MyWallet from "./components/my-wallet/MyWallet"
import VehicleRegistration from "./components/vehicle-registration/VehicleRegistration"
import MyCar from "./components/mycar/MyCar"
import { Button } from "@/components/ui/button"
import { useDialogFilterMyCar } from "@/hooks/useOpenDialog"
import { useDataProfileMyCar } from "@/hooks/useDataQueryKey"

type Props = {

}


const TAB = [
    {
        id: "1",
        icon_active: '',
        icon_no_active: "",
        name: 'Danh sách xe',
        link: '/list-my-car/my-car'
    },
    {
        id: "2",
        icon_active: '',
        icon_no_active: "",
        name: 'Hợp đồng mẫu',
        link: '/list-my-car/contract'
    },
    {
        id: "3",
        icon_active: '',
        icon_no_active: "",
        name: 'Ví của tôi',
        link: '/list-my-car/my-wallet'
    },
    {
        id: "4",
        icon_active: '',
        icon_no_active: "",
        name: 'Đăng ký xe',
        link: '/list-my-car/vehicle-registration'
    }
]

const ListMyCar = (props: Props) => {
    const { queryKeyIsStateProfileMyCar, isStateProfileMyCar } = useDataProfileMyCar()

    const { setDataFilter, setValueFilter, valueFilter, setOpenDialogFilterCar } = useDialogFilterMyCar()


    const { isVisibleMobile, isVisibleTablet } = useResize()

    const lastContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const { apiListCar, apiListStatusFilter } = apiMyCar()

    const handleFetchListCars = async (page: any) => {

        queryKeyIsStateProfileMyCar({ isLoadingCar: true })
        try {
            const { data } = await apiListCar(page, isStateProfileMyCar.limit, { car_owner: 1, status_car: valueFilter })
            if (data && data.data && data.base) {
                const { customDataMyCar } = CustomDataMyCar(data)
                queryKeyIsStateProfileMyCar({
                    dataMyCar: customDataMyCar,
                    page: isStateProfileMyCar.page + 1,
                    next: data?.links?.next,
                })
            }

        }
        catch (err) {
            throw err
        }
        finally {
            queryKeyIsStateProfileMyCar({ isLoadingCar: false })
        }

    }


    /// danh sách xe
    useEffect(() => {
        const handleWheel = (event: any) => {
            const scrollContainer = scrollContainerRef.current;
            const lastContainer = lastContainerRef.current;

            if (!scrollContainer || !lastContainer || isStateProfileMyCar.isLoadingScroll) return;

            const scrollContainerBottom = Math.floor(scrollContainer.getBoundingClientRect().bottom);
            const lastContainerBottom = Math.floor(lastContainer.getBoundingClientRect().bottom);

            const containerHeight = scrollContainer.clientHeight;
            const threshold = containerHeight * 0.1; // 10% của kích thước containe

            if (scrollContainerBottom <= lastContainerBottom + threshold) {
                if (isStateProfileMyCar.dataMyCar && isStateProfileMyCar.next !== null) {
                    queryKeyIsStateProfileMyCar({ isLoadingScroll: true });
                    const fetchDataListCar = async () => {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1500));

                            const { data } = await apiListCar(isStateProfileMyCar.page, isStateProfileMyCar.limit, { car_owner: 1, status_car: valueFilter });

                            if (data && data?.links && data?.data && data?.base) {
                                let { customDataMyCar } = CustomDataMyCar(data)
                                if (!isStateProfileMyCar.isLoadingScroll) {
                                    queryKeyIsStateProfileMyCar({
                                        dataMyCar: [...(isStateProfileMyCar.dataMyCar || []), ...customDataMyCar],
                                        next: data?.links?.next,
                                        page: isStateProfileMyCar.page + 1,
                                    })
                                }
                                return
                            }
                            queryKeyIsStateProfileMyCar({
                                listCardCars: isStateProfileMyCar.dataMyCar,
                                next: data?.links?.next,
                                page: data?.links?.next !== null ? isStateProfileMyCar.page + 1 : isStateProfileMyCar.page,
                                isLoadingScroll: false,
                            });
                        } catch (error) {
                            throw error
                        } finally {
                            queryKeyIsStateProfileMyCar({ isLoadingScroll: false });
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
    }, [scrollContainerRef, isStateProfileMyCar.next, isStateProfileMyCar.page, isStateProfileMyCar.isLoadingScroll,]);

    const handleFetchListStatusFilter = async () => {
        try {
            const { data } = await apiListStatusFilter()
            if (data?.data) {
                setDataFilter([{
                    id: -1,
                    name: "Tất cả",
                    color: "black",
                }, ...data?.data])
            }
        }
        catch (err) {
            throw err
        }
    }

    useEffect(() => {
        if (isStateProfileMyCar.tab == 1) {
            handleFetchListCars(isStateProfileMyCar.page)
            setValueFilter(-1)
        }
    }, [isStateProfileMyCar.tab])

    useEffect(() => {
        handleFetchListStatusFilter()
    }, [])

    useEffect(() => {
        handleFetchListCars(1)
    }, [valueFilter])



    // useEffect(() => {
    //     queryKeyIsStateProfileMyCar({ page: 1 })
    //     if (isStateProfileMyCar.tab == 1) {
    //         // handleFetchListCars(1)
    //         if (valueFilter) {
    //             handleFetchListCars(1)

    //         } else {
    //             handleFetchListCars(isStateProfileMyCar.page)
    //         }
    //         setValueFilter(-1)
    //     }
    // }, [isStateProfileMyCar.tab, valueFilter])

    // useEffect(() => {
    //     handleFetchListStatusFilter()
    // }, [])

    // // useEffect(() => {
    // //     // handleFetchListCars(1)
    // //     handleFetchListCars(1)
    // // }, [valueFilter])

    return (
        <BackgroundUiProfile className={'space-y-4  lg:pr-2 pr-3'}>
            <div className="flex justify-between items-center">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Xe của tôi</h1>
                {isStateProfileMyCar.tab == 1 &&
                    <Button onClick={() => setOpenDialogFilterCar(true)} className={`bg-[#2FB9BD]/80  hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                             md:block hidden    px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}
                    >
                        Bộ lọc
                    </Button>
                }
            </div>
            <Tabs defaultValue="1" value={`${isStateProfileMyCar.tab}`} onValueChange={value => queryKeyIsStateProfileMyCar({ tab: value, page: 1, dataMyCar: [] })} className="w-full">
                <TabsList className='bg-transparent border-b border-b-[#F6F6F8] rounded-none w-full justify-start overflow-x-auto overflow-y-hidden gap-8 p-0'>
                    {
                        TAB.map((e) => (
                            <TabsTrigger
                                key={e.id}
                                value={e.id}
                                className='data-[state=active]:text-[#2FB9BD] text-[#667085] data-[state=active]:border-b-[#2FB9BD]
                                border-b-2 border-transparent rounded-none pb-[15px] px-0 font-semibold text-sm leading-[17px]'>
                                {e.name}
                            </TabsTrigger>

                        ))
                    }
                </TabsList>
                <TabsContent value="1" className='lg:mt-4 mt-5'>
                    {isVisibleMobile && <Button onClick={() => setOpenDialogFilterCar(true)} className={`bg-[#2FB9BD]/80  hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                   px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all mb-5  border uppercases`}
                    >
                        Bộ lọc
                    </Button>
                    }
                    <ScrollArea
                        ref={scrollContainerRef}
                        id='scroll-container'
                        className={`${isStateProfileMyCar.dataMyCar?.length > 0 &&
                            isVisibleMobile ? isStateProfileMyCar.dataMyCar?.length > 3 ? 'h-[1380px]' : 'h-auto' :
                            isVisibleTablet ? isStateProfileMyCar.dataMyCar?.length > 3 ? 'h-[1680px]' : 'h-auto' : isStateProfileMyCar.dataMyCar?.length >= 3 ? 'h-[780px]' : 'h-[550px]'} lg:pr-6 pr-3`}
                    >
                        <div className='flex flex-col gap-4'>
                            <MyCar />
                        </div>
                        {
                            isStateProfileMyCar?.isLoadingScroll && (
                                <div className="w-full 3xl:h-[80px] h-[60px] flex justify-center items-center gap-2">
                                    <div className="text-[#2FB9BD] inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                                    <span className="text-[#2FB9BD] 3xl:text-xl text-base">Loading...</span>
                                </div>
                            )
                        }
                        <div ref={lastContainerRef} />
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="2">
                    <div className="h-[550px] flex justify-center items-center">
                        <Contract />
                    </div>
                </TabsContent>
                <TabsContent value="3">
                    <MyWallet />
                </TabsContent>
                <TabsContent value="4">
                    <VehicleRegistration />
                </TabsContent>
            </Tabs>
        </BackgroundUiProfile>
    )
}

export default ListMyCar