"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CustomDataListCars } from '@/custom/CustomData'
import { useResize } from '@/hooks/useResize'
import apiListCarFavorite from '@/services/profile/listCarFavorite/listCarFavorite.services'
import BackgroundUiProfile from '@/themes/profile/BackgroundUiProfile'
import { IListCarFavorite } from '@/types/Profile/IListCarFavorite'
import React, { useEffect, useRef, useState } from 'react'
import ListDataCar from './components/ListDataCar'
import LoadingData from '@/components/loadingData/LoadingData'

type Props = {}

const ListCarFavorite = (props: Props) => {
    const initialData: IListCarFavorite = {
        isLoadingCar: false,
        dataDrivingCar: [],
        dataTalentedCar: [],
        ///xe tu lai
        pageDrivingCar: 1,
        pageTalentedCar: 1,
        limit: 8,
        nextDrivingCar: "",
        nextTalentedCar: "",
        tab: "1",
        totalDrivingCar: 0,
        totalTalentedCar: 0,
        isLoadingScroll: false
    }

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const lastContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isState, sIsState] = useState<IListCarFavorite>(initialData)

    const { apiListCar, apiUpdateFavoriteHeartCar } = apiListCarFavorite()

    const queryState = (key: any) => sIsState((prev: any) => ({ ...prev, ...key }))
    // danh sách xe tự lái
    const handleFetchListCars = async (page: any) => {
        queryState({ isLoadingCar: true })
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const { data } = await apiListCar(page, isState.limit, { favourite: isState.tab, type: 1 })
            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryState({
                    dataDrivingCar: customDataListCars,
                    pageDrivingCar: isState.pageDrivingCar === 1 ? isState.pageDrivingCar + 1 : 2,
                    nextDrivingCar: data?.links?.next,
                    totalDrivingCar: data?.meta?.total ?? 0,

                })
                return
            }
        }
        catch (err) {
            throw err
        }
        finally {
            queryState({ isLoadingCar: false })
        }
    }
    // danh sách xe có tài
    const handleFetchListCarsTalented = async (page: any) => {
        queryState({ isLoadingCar: true })
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const { data } = await apiListCar(page, isState.limit, { favourite: isState.tab, type: 2 })
            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)
                queryState({
                    dataTalentedCar: customDataListCars,
                    pageTalentedCar: isState.tab == "1" ? 2 : isState.pageTalentedCar + 1,
                    nextTalentedCar: data?.links?.next,
                    totalTalentedCar: data?.meta?.total ?? 0,
                })
                return
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
        handleFetchListCars(1)
        handleFetchListCarsTalented(1)
    }, [])


    const fetchDataListCar = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const page = isState.tab == '1' ? isState.pageDrivingCar : isState.pageTalentedCar

            const { data } = await apiListCar(page, isState.limit, { favourite: isState.tab, type: isState.tab });

            if (data && data?.links && data?.data && data?.base) {
                let { customDataListCars } = CustomDataListCars(data)
                if (!isState.isLoadingScroll) {
                    const dataNewNext: any = {
                        1: {
                            dataDrivingCar: [...(isState.dataDrivingCar || []), ...customDataListCars],
                            nextDrivingCar: data?.links?.next,
                            pageDrivingCar: isState.pageDrivingCar + 1
                        },
                        2: {
                            dataTalentedCar: [...(isState.dataTalentedCar || []), ...customDataListCars],
                            nextTalentedCar: data?.links?.next,
                            pageTalentedCar: isState.pageTalentedCar + 1
                        }
                    }
                    queryState(dataNewNext[isState.tab])
                }
                return
            }
            const dataNotNext: any = {
                1: {
                    dataDrivingCar: isState.dataDrivingCar,
                    nextDrivingCar: data?.links?.next,
                    pageDrivingCar: data?.links?.next !== null ? isState.pageDrivingCar + 1 : isState.pageDrivingCar,
                    isLoadingScroll: false
                },
                2: {
                    dataTalentedCar: isState.dataTalentedCar,
                    nextTalentedCar: data?.links?.next,
                    pageTalentedCar: data?.links?.next !== null ? isState.pageTalentedCar + 1 : isState.pageTalentedCar,
                    isLoadingScroll: false
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
                if (isState.tab == '1' && isState.dataDrivingCar && isState.nextDrivingCar !== null) {
                    queryState({ isLoadingScroll: true });
                    fetchDataListCar()
                    return
                }
                if (isState.tab == '2' && isState.dataTalentedCar && isState.nextTalentedCar !== null) {
                    queryState({ isLoadingScroll: true });
                    fetchDataListCar()
                    return
                }
            }
        }

        const scrollCurrent = scrollContainerRef.current;

        scrollCurrent?.addEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);

        return () => {
            scrollCurrent?.removeEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);
        };
    }, [scrollContainerRef, isState.nextDrivingCar, isState.nextTalentedCar, isState.pageDrivingCar, isState.pageTalentedCar, isState.isLoadingScroll,]);

    const handleClickFavorite = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, car_id?: number | string) => {
        e.stopPropagation()
        e.preventDefault();
        if (car_id) {
            try {
                const { data: dataHeart } = await apiUpdateFavoriteHeartCar({ "car_id": car_id, "status": 0, "type": isState.tab })
                if (dataHeart?.result) {
                    const { data } = await apiListCar(1, isState.limit, { favourite: isState.tab, type: isState.tab })
                    if (data && data.data && data.base) {
                        let { customDataListCars } = CustomDataListCars(data)
                        const newData: any = {
                            1: {
                                dataDrivingCar: customDataListCars,
                                pageDrivingCar: 2,
                                nextDrivingCar: data?.links?.next,
                                totalDrivingCar: data?.meta?.total ?? 0
                            },
                            2: {
                                dataTalentedCar: customDataListCars,
                                pageTalentedCar: 2,
                                nextTalentedCar: data?.links?.next,
                                totalTalentedCar: data?.meta?.total ?? 0
                            }
                        }
                        queryState(newData[isState.tab])
                    }
                    return
                }
            } catch (err) {
                throw err
            }
        }
    };


    return (
        <BackgroundUiProfile className='space-y-4 lg:pr-2 pr-3'>
            <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Xe yêu thích của tôi</h1>
            <Tabs defaultValue="1" onValueChange={value => {
                queryState({ tab: value, pageDrivingCar: 1, pageTalentedCar: 1, })
                if (value == '1') {
                    handleFetchListCars(1)
                    return
                }
                handleFetchListCarsTalented(1)
            }
            } className="w-full">
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
                        Xe có tài ({isState.totalTalentedCar})
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="1" className='lg:mt-4 mt-5'>
                    <ScrollArea
                        ref={scrollContainerRef}
                        id='scroll-container'
                        className={`${isState.dataDrivingCar?.length > 0 &&
                            isVisibleMobile ? isState.dataDrivingCar?.length > 3 ? 'h-[1380px]' : 'h-auto' :
                            isVisibleTablet ? isState.dataDrivingCar?.length > 3 ? 'h-[1680px]' : 'h-auto' : isState.dataDrivingCar?.length >= 3 ? 'h-[780px]' : 'h-[550px]'} lg: pr-6 pr - 3`}
                    >
                        <div className='flex flex-col gap-4'>
                            <ListDataCar isState={isState} arrData={isState.dataDrivingCar} handleClickFavorite={handleClickFavorite} />
                        </div>
                        {isState?.isLoadingScroll && <LoadingData />}
                        <div ref={lastContainerRef} />
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="2" className='lg:mt-4 mt-5'>
                    <ScrollArea
                        ref={scrollContainerRef}
                        className={`${isState.dataTalentedCar?.length > 0 &&
                            isVisibleMobile ? isState.dataTalentedCar?.length > 3 ? 'h-[1380px]' : 'h-auto' :
                            isVisibleTablet ? isState.dataTalentedCar?.length > 3 ? 'h-[1680px]' : 'h-auto' : isState.dataTalentedCar?.length >= 3 ? 'h-[780px]' : 'h-[550px]'} lg: pr-6 pr - 3`}
                    >
                        <div className='flex flex-col gap-4'>
                            <ListDataCar isState={isState} arrData={isState.dataTalentedCar} handleClickFavorite={handleClickFavorite} />
                        </div>
                        {isState?.isLoadingScroll && <LoadingData />}
                        <div ref={lastContainerRef} />
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </BackgroundUiProfile >
    )
}

export default ListCarFavorite