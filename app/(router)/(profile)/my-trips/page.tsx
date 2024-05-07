"use client"
import { useEffect, useRef, useState } from 'react'

import Nodata from '@/components/image/Nodata'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BackgroundUiProfile from '@/themes/profile/BackgroundUiProfile'

import { CustomDataMyTripCar } from '@/custom/CustomData'
import { useResize } from '@/hooks/useResize'
import { IMyTrips } from '@/types/Profile/IMyTrips'

import apiMyTrips from '@/services/profile/myTrips/myTrips.services'
import MyTripSelfDrivingCar from './components/MyTripSelfDrivingCar'

import { Button } from '@/components/ui/button'
import { useDialogFilterMyCar } from '@/hooks/useOpenDialog'

type Props = {}



const MyTrips = (props: Props) => {
    const initialState: IMyTrips = {
        openFilter: false,
        isLoadingCar: false,
        dataMyTrips: [],
        dataMyTripsTalented: [],
        page: 1,
        limit: 4,
        tab: "1",
        next: "",
        totalDrivingCar: 0,
        isLoadingScroll: false,
        daTafilter: [],
    }

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const { apiListMyTrips, apiListFilterMyTrips } = apiMyTrips()

    const lastContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isState, sIsState] = useState<IMyTrips>(initialState)

    const queryState = (key: any) => sIsState((prev: IMyTrips) => ({ ...prev, ...key }))

    const { setDataFilter, setValueFilter, valueFilter, setOpenDialogFilterCar } = useDialogFilterMyCar()


    const handleFetchListCars = async (page: any) => {
        queryState({ isLoadingCar: true })
        try {
            const { data } = await apiListMyTrips(page, isState.limit, { status_search: valueFilter })
            if (data && data.data && data.base) {
                const { customDataMyTripCar } = CustomDataMyTripCar(data)
                queryState({
                    dataMyTrips: customDataMyTripCar,
                    page: isState.page + 1,
                    next: data?.links?.next,
                    totalDrivingCar: data?.meta?.total ?? 0
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
        // handleFetchListCars(isState.page)
        setValueFilter(-1)
    }, [isState.tab])


    const fetDataFilter = async () => {
        try {
            const { data: { data } } = await apiListFilterMyTrips()
            if (data) {
                setDataFilter([{
                    id: -1,
                    name: "Tất cả",
                    color: "black",
                }, ...data])
            }
        }
        catch (err) {
            throw err
        }
    }

    useEffect(() => {
        fetDataFilter()
    }, [])

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
                if (isState.dataMyTrips && isState.next !== null) {
                    queryState({ isLoadingScroll: true });
                    const fetchDataListCar = async () => {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1500));

                            const { data } = await apiListMyTrips(isState.page, isState.limit, { status_search: valueFilter })

                            if (data && data?.links && data?.data && data?.base) {
                                let { customDataMyTripCar } = CustomDataMyTripCar(data)
                                if (!isState.isLoadingScroll) {
                                    queryState({
                                        dataMyTrips: [...(isState.dataMyTrips || []), ...customDataMyTripCar],
                                        next: data?.links?.next,
                                        page: isState.page + 1,
                                    })
                                }
                                return
                            }
                            queryState({
                                dataMyTrips: isState.dataMyTrips,
                                next: data?.links?.next,
                                page: data?.links?.next !== null ? isState.page + 1 : isState.page,
                                isLoadingScroll: false,
                            });
                        } catch (error) {
                            throw error
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
    }, [scrollContainerRef, isState.next, isState.page, isState.isLoadingScroll]);


    useEffect(() => {
        if (valueFilter) {
            handleFetchListCars(1)
        }
    }, [valueFilter, isState.tab])

    return (
        <BackgroundUiProfile className='space-y-4 '>
            <div className="flex md:flex-row flex-col justify-between">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Chuyến của tôi</h1>
                <div className='items-center gap-5 md:my-0 my-5 md:flex hidden'>
                    <Button onClick={() => setOpenDialogFilterCar(true)} className={`bg-[#2FB9BD]/80  hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                             md:block hidden    px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}
                    >
                        Bộ lọc
                    </Button>
                </div>
            </div>
            <Tabs defaultValue="1" onValueChange={(value) => queryState({ tab: value, page: 1 })} className="w-full">
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
                        Xe có tài xế (0)
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="1" className='lg:mt-4 mt-5'>
                    {isVisibleMobile &&
                        <div className='items-center gap-5  my-5'>
                            <Button onClick={() => setOpenDialogFilterCar(true)} className={`bg-[#2FB9BD]/80  hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                             md:block hidden    px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}
                            >
                                Bộ lọc
                            </Button>
                        </div>
                    }
                    <ScrollArea
                        ref={scrollContainerRef}
                        className={`${isState.dataMyTrips?.length > 0 &&
                            isVisibleMobile ? isState.dataMyTrips?.length > 4 ? 'h-[680px]' : 'h-auto' :
                            isVisibleTablet ? isState.dataMyTrips?.length > 4 ? 'h-[980px]' : 'h-auto' : isState.dataMyTrips?.length >= 3 ? 'h-[780px]' : 'h-[550px]'} lg:pr-6 pr-3`}
                    >
                        <div className='flex flex-col gap-4'>
                            <MyTripSelfDrivingCar isState={isState} />
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
                        // ref={scrollContainerRef}
                        className={`${isState.dataMyTripsTalented?.length > 0 &&
                            isVisibleMobile ? isState.dataMyTripsTalented?.length > 4 ? 'h-[680px]' : 'h-auto' :
                            isVisibleTablet ? isState.dataMyTripsTalented?.length > 4 ? 'h-[980px]' : 'h-auto' : isState.dataMyTripsTalented?.length > 0 ? 'h-[780px]' : 'h-[550px]'} lg:pr-6 pr-3`}
                    >
                        <Nodata type='mytrip' />
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </BackgroundUiProfile>
    )
}

export default MyTrips