"use client"
import { useEffect, useRef, useState } from 'react'

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
import MyTripTalentedCar from './components/MyTripTalentedCar'
import LoadingData from '@/components/loadingData/LoadingData'

type Props = {}


const MyTrips = (props: Props) => {
    const initialState: IMyTrips = {
        openFilter: false,
        isLoadingCar: false,
        dataMyTrips: [],
        dataMyTripsTalented: [],
        pageMyTrips: 1,
        pageMyTripsTalented: 1,
        limit: 8,
        tab: "1",
        nextMyTrips: "",
        nextMyTripsTalented: "",
        totalDrivingCar: 0,
        totalTalentedCar: 0,
        isLoadingScroll: false,
        daTafilter: [],
    }

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const { apiListMyTrips, apiListFilterMyTrips } = apiMyTrips()

    const lastContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isState, sIsState] = useState<IMyTrips>(initialState)

    const queryState = (key: any) => sIsState((prev: IMyTrips) => ({ ...prev, ...key }))

    const { setDataFilter, setValueFilter, valueFilter, defaultValue, setOpenDialogFilterCar, openDialogFilterCar, setDefaultValue } = useDialogFilterMyCar()

    const handleFetchListMyTrips = async (page: any) => {
        queryState({ isLoadingCar: true })
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const { data: dataMyTrips } = await apiListMyTrips(page, isState.limit, { status_search: valueFilter ? valueFilter : -1, type: 1 })

            if (dataMyTrips && dataMyTrips.data && dataMyTrips.base) {
                const { customDataMyTripCar } = CustomDataMyTripCar(dataMyTrips)
                queryState({
                    dataMyTrips: customDataMyTripCar,
                    pageMyTrips: isState.pageMyTrips === 1 ? isState.pageMyTrips + 1 : 2,
                    nextMyTrips: dataMyTrips?.links?.next,
                    totalDrivingCar: dataMyTrips?.meta?.total ?? 0,
                    isLoadingCar: false
                })

            }
        }
        catch (err) {
            throw err
        }
        finally {
            // queryState({ isLoadingCar: false })
        }
    }

    const handleFetchListMyTripsTalented = async (page: any) => {
        queryState({ isLoadingCar: true })
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const { data: dataMyTripsTalented } = await apiListMyTrips(page, isState.limit, { status_search: valueFilter ? valueFilter : -1, type: 2 })

            if (dataMyTripsTalented && dataMyTripsTalented.data && dataMyTripsTalented.base) {
                const { customDataMyTripCar } = CustomDataMyTripCar(dataMyTripsTalented)
                queryState({
                    dataMyTripsTalented: customDataMyTripCar,
                    pageMyTripsTalented: isState.tab == "1" ? 2 : isState.pageMyTripsTalented + 1,
                    nextMyTripsTalented: dataMyTripsTalented?.links?.next,
                    totalTalentedCar: dataMyTripsTalented?.meta?.total ?? 0,
                    isLoadingCar: false
                })
            }
        }
        catch (err) {
            throw err
        }
        finally {
            // queryState({ isLoadingCar: false })
        }
    }

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
        if (valueFilter != defaultValue) {
            handleFetchListMyTrips(1)
            handleFetchListMyTripsTalented(1)
        }
    }, [valueFilter])

    useEffect(() => {
        setValueFilter(-1)
        setDefaultValue(-1)
        handleFetchListMyTrips(1)
        handleFetchListMyTripsTalented(1)
        fetDataFilter()
    }, [])

    useEffect(() => {
        if (valueFilter != defaultValue) {
            queryState({
                pageMyTrips: 1,
                pageMyTripsTalented: 1
            })
        }
    }, [openDialogFilterCar])


    const fetchDataListCar = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const page = isState.tab == '1' ? isState.pageMyTrips : isState.pageMyTripsTalented

            const { data } = await apiListMyTrips(page, isState.limit, { status_search: valueFilter ? valueFilter : -1, type: isState.tab })

            if (data && data?.links && data?.data && data?.base) {
                let { customDataMyTripCar } = CustomDataMyTripCar(data)
                if (!isState.isLoadingScroll) {
                    const dataNewNext: any = {
                        1: {
                            dataMyTrips: [...(isState.dataMyTrips || []), ...customDataMyTripCar],
                            nextMyTrips: data?.links?.next,
                            pageMyTrips: isState.pageMyTrips + 1,
                        },
                        2: {
                            dataMyTripsTalented: [...(isState.dataMyTripsTalented || []), ...customDataMyTripCar],
                            nextMyTripsTalented: data?.links?.next,
                            pageMyTripsTalented: isState.pageMyTripsTalented + 1,
                        }
                    }
                    queryState(dataNewNext[isState.tab])
                }
                return
            }
            const dataNotNext: any = {
                1: {
                    dataMyTrips: isState.dataMyTrips,
                    nextMyTrips: data?.links?.next,
                    pageMyTrips: data?.links?.next !== null ? isState.pageMyTrips + 1 : isState.pageMyTrips,
                    isLoadingScroll: false,
                },
                2: {
                    dataMyTripsTalented: isState.dataMyTripsTalented,
                    nextMyTripsTalented: data?.links?.next,
                    pageMyTripsTalented: data?.links?.next !== null ? isState.pageMyTripsTalented + 1 : isState.pageMyTripsTalented,
                    isLoadingScroll: false,
                }
            }
            queryState(dataNotNext[isState.tab])
        } catch (error) {
            throw error
        } finally {
            queryState({ isLoadingScroll: false });
        }
    };

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
                if (isState.tab == "1") {
                    if (isState.dataMyTrips && isState.nextMyTrips !== null) {
                        queryState({ isLoadingScroll: true });
                        fetchDataListCar()
                        return
                    }
                    console.log("check next false");
                }
                if (isState.tab == "2") {
                    if (isState.dataMyTripsTalented && isState.nextMyTripsTalented !== null) {
                        queryState({ isLoadingScroll: true });
                        fetchDataListCar()
                        return
                    }
                    console.log("check next false");
                }
            }
        }

        const scrollCurrent = scrollContainerRef.current;

        scrollCurrent?.addEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);

        return () => {
            scrollCurrent?.removeEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);
        };
    }, [scrollContainerRef, isState.nextMyTrips, isState.nextMyTripsTalented, isState.pageMyTrips, isState.pageMyTripsTalented, isState.isLoadingScroll]);



    return (
        <BackgroundUiProfile className='space-y-4 '>
            <div className="flex md:flex-row flex-col justify-between">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Chuyến của tôi</h1>
                <div className='items-center gap-5 md:my-0 my-5 md:flex hidden'>
                    <Button onClick={() => {
                        setOpenDialogFilterCar(true)
                    }} className={`bg-[#2FB9BD]/80  hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                             md:block hidden    px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}
                    >
                        Bộ lọc
                    </Button>
                </div>
            </div>
            <Tabs value={isState.tab} defaultValue="1" onValueChange={(value) => {
                // setValueFilter(-1)
                // setDefaultValue(-1)
                queryState({
                    tab: value,
                    pageMyTrips: 1,
                    pageMyTripsTalented: 1,
                    isLoadingCar: true
                })
                if (value == '1') {
                    handleFetchListMyTrips(1)
                    return
                }
                handleFetchListMyTripsTalented(1)
            }} className="w-full">
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
                        Xe có tài xế ({isState.totalTalentedCar})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="1" className='lg:mt-4 mt-5'>
                    {isVisibleMobile &&
                        <div className='items-center gap-5  my-5'>
                            <Button onClick={() => {

                                setOpenDialogFilterCar(true)
                            }} className={`bg-[#2FB9BD]/80  hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
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
                            isVisibleTablet ? isState.dataMyTrips?.length > 4 ? 'h-[980px]' : 'h-auto' : isState.dataMyTrips?.length >= 3 ? 'h-[780px]' : 'h-[550px]'} pr-3`}
                    >
                        <div className='flex flex-col gap-4'>
                            <MyTripSelfDrivingCar isState={isState} />
                        </div>
                        {isState?.isLoadingScroll && <LoadingData />}
                        <div ref={lastContainerRef} />
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="2" className='lg:mt-4 mt-5'>
                    <ScrollArea
                        ref={scrollContainerRef}
                        className={`${isState.dataMyTripsTalented?.length > 0 &&
                            isVisibleMobile ? isState.dataMyTripsTalented?.length > 4 ? 'h-[680px]' : 'h-auto' :
                            isVisibleTablet ? isState.dataMyTripsTalented?.length > 4 ? 'h-[980px]' : 'h-auto' : isState.dataMyTripsTalented?.length > 0 ? 'h-[780px]' : 'h-[550px]'} pr-3`}
                    >
                        <div className='flex flex-col gap-4'>
                            <MyTripTalentedCar isState={isState} />
                        </div>
                        {isState?.isLoadingScroll && <LoadingData />}
                        <div ref={lastContainerRef} />
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </BackgroundUiProfile>
    )
}

export default MyTrips