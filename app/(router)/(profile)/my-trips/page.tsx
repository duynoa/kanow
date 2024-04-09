"use client"
import React, { useEffect, useRef, useState } from 'react'

import Nodata from '@/components/image/Nodata'
import { ScrollArea } from '@/components/ui/scroll-area'
import BackgroundUiProfile from '@/themes/profile/BackgroundUiProfile'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useResize } from '@/hooks/useResize'
import { IMyTrips } from '@/types/Profile/IMyTrips'
import { CustomDataMyTripCar } from '@/custom/CustomData'

import apiMyTrips from '@/services/myTrips/myTrips.services'
import MyTripSelfDrivingCar from './components/MyTripSelfDrivingCar'

import DialogFilterMytrip from './components/DialogFilterMytrip'

type Props = {}



const MyTrips = (props: Props) => {
    const initialState: IMyTrips = {
        openFilter: false,
        isLoadingCar: false,
        dataMyTrips: [],
        dataMyTripsTalented: [],
        page: 1,
        limit: 4,
        favourite: "1",
        next: "",
        totalDrivingCar: 0,
        status_search: -1,
        isLoadingScroll: false,
        daTafilter: [],
    }

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const { apiListMyTrips, apiListFilterMyTrips } = apiMyTrips()

    const lastContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isState, sIsState] = useState<IMyTrips>(initialState)

    const queryState = (key: any) => sIsState((prev: IMyTrips) => ({ ...prev, ...key }))

    const handleFetchListCars = async (page: any) => {
        queryState({ isLoadingCar: true })
        try {
            const { data } = await apiListMyTrips(page, isState.limit, { status_search: isState.status_search })
            if (data && data.data && data.base) {
                const { customDataMyTripCar } = CustomDataMyTripCar(data)
                queryState({
                    dataMyTrips: customDataMyTripCar,
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
        handleFetchListCars(isState.page)
    }, [isState.favourite])


    const fetDataFilter = async () => {
        try {
            const { data: { data } } = await apiListFilterMyTrips()
            if (data) {
                queryState({
                    daTafilter: [
                        {
                            id: -1,
                            name: "Tất cả",
                            index: 0,
                            color: "black",
                        },
                        ...data]
                })
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

                            const { data } = await apiListMyTrips(isState.page, isState.limit, { status_search: isState.status_search })

                            if (data && data?.links && data?.data && data?.base) {
                                let { customDataMyTripCar } = CustomDataMyTripCar(data)
                                if (!isState.isLoadingScroll) {
                                    queryState({
                                        dataMyTrips: [...(isState.dataMyTrips || []), ...customDataMyTripCar],
                                        next: data?.links?.next,
                                        page: isState.page + 1,
                                    })
                                }

                            } else {
                                queryState({
                                    listCardCars: isState.dataMyTrips,
                                    next: data?.links?.next,
                                    page: data?.links?.next !== null ? isState.page + 1 : isState.page,
                                    isLoadingScroll: false,
                                });
                            }
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

    const handleSubmitFilter = async () => {
        try {
            queryState({ openFilter: false });
            await handleFetchListCars(1)
        } catch (error) {
            throw error;
        }
    };


    const shareProps = { isState, queryState, handleSubmitFilter }

    return (
        <BackgroundUiProfile className='space-y-4 '>
            <div className="flex md:flex-row flex-col justify-between">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Chuyến của tôi</h1>
                <div className='items-center gap-5 md:my-0 my-5 md:flex hidden'>
                    <DialogFilterMytrip {...shareProps} />

                </div>
            </div>
            <Tabs defaultValue="1" onValueChange={(value) => queryState({ favourite: value, page: 1 })} className="w-full">
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
                            <DialogFilterMytrip {...shareProps} />
                        </div>
                    }
                    <ScrollArea
                        ref={scrollContainerRef}
                        id='scroll-container'
                        className={`${isState.dataMyTrips?.length > 0 && isVisibleMobile ? 'h-[680px]' : isVisibleTablet ? 'h-[980px]' : 'h-[780px]'} lg:pr-6 pr-3`}
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
                        className={`${isState.dataMyTripsTalented?.length > 0 && isVisibleMobile ? 'h-[680px]' : isVisibleTablet ? 'h-[980px]' : 'h-[780px]'} lg:pr-6 pr-3`}
                    // className={`${isState.dataMyTripsTalented?.length > 0 && isVisibleMobile ? 'h-[1380px]' : isVisibleTablet ? 'h-[1680px]' : 'h-[780px]'} lg:pr-6 pr-3`}
                    >
                        <Nodata type='mytrip' />
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </BackgroundUiProfile>
    )
}

export default MyTrips