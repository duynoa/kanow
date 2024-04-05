"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { useResize } from '@/hooks/useResize'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import BackgroundUiProfile from '@/themes/profile/BackgroundUiProfile'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IMyTrips } from '@/types/Profile/IMyTrips'
import apiMyTrips from '@/services/myTrips/myTrips.services'
import { CustomDataMyTripCar } from '@/custom/CustomData'

type Props = {}


const MyTrips = (props: Props) => {
    const initialState: IMyTrips = {
        isLoadingCar: false,
        dataMyTrips: [],
        page: 1,
        limit: 4,
        favourite: "1",
        next: "",
        totalDrivingCar: 0
    }

    const { apiListMyTrips } = apiMyTrips()

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isState, sIsState] = useState<IMyTrips>(initialState)

    const queryState = (key: any) => sIsState((prev: IMyTrips) => ({ ...prev, ...key }))


    const handleFetchListCars = async () => {
        queryState({ isLoadingCar: true })
        try {
            const { data } = await apiListMyTrips(isState.page, isState.limit)
            console.log("data", data);
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
        handleFetchListCars()
    }, [isState.favourite])

    return (
        <BackgroundUiProfile className='space-y-4 '>
            <div className="flex md:flex-row flex-col justify-between">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Chuyến của tôi</h1>
                <div className='flex items-center gap-5 md:my-0 my-5'>
                    <Button className={`bg-[#2FB9BD]/80  hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                                 px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}
                    >
                        Bộ lọc
                    </Button>
                </div>
            </div>
            <Tabs defaultValue="1" className="w-full">
                <TabsList className='bg-transparent border-b border-b-[#F6F6F8] rounded-none w-full justify-start gap-8 p-0'>
                    <TabsTrigger
                        value="1"
                        className='data-[state=active]:text-[#2FB9BD] text-[#667085] data-[state=active]:border-b-[#2FB9BD]
                                border-b-2 border-transparent rounded-none pb-[15px] px-0 font-semibold text-sm leading-[17px]'>
                        Xe tự lái (1)
                    </TabsTrigger>
                    <TabsTrigger
                        value="2"
                        className='data-[state=active]:text-[#2FB9BD] text-[#667085] data-[state=active]:border-b-[#2FB9BD]
                                border-b-2 border-transparent rounded-none pb-[15px] px-0 font-semibold text-sm leading-[17px]'>
                        Xe có tài xế (100)
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="1" className='lg:mt-4 mt-5'>
                    <ScrollArea
                        ref={scrollContainerRef}
                        id='scroll-container'
                        className={`${isState.dataMyTrips?.length > 0 && isVisibleMobile ? 'h-[1380px]' : isVisibleTablet ? 'h-[1680px]' : 'h-[780px]'} lg:pr-6 pr-3`}
                    >
                        <div className='flex flex-col gap-4'>
                            {isState.isLoadingCar ?
                                <>
                                    {[...Array(3)].map((_, index) => (
                                        'test'
                                    ))}
                                </>
                                :
                                isState.dataMyTrips?.length > 0 ? isState.dataMyTrips.map((card, index) => (
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
                                            <div className='flex gap-2 absolute bottom-[10px] left-[10px]'>
                                                <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                    Chủ xe đã hủy
                                                </Badge>
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

                                            <div className={`flex lg:flex-col xl:justify-start lg:justify-center md:justify-between ${card.total_trip ? 'justify-between ' : 'justify-between px-3'} lg:px-0 px-2  flex-row 3xl:gap-2 2xl:gap-2 xxl:gap-2.5 xl:gap-2 lg:gap-2 gap-2  lg:bg-transparent lg:py-0 lg:rounded-none
                                                     rounded-md py-3 bg-[#F2FCF7] `}>

                                            </div>
                                        </div>
                                        <div className='3xl:w-[20%] xxl:w-[20%] 2xl:w-[20%] xl:w-[20%] lg:w-[15%] w-full flex lg:flex-col flex-row justify-start items-center lg:gap-2 gap-4  mt-2'>

                                        </div>
                                    </div>
                                )) :
                                    <div className='h-[472px]'>
                                        <Image src='/listCarFavorite/nodata.png' alt='' width={1280} height={1024} className='object-cover h-full -w-full' />
                                    </div>
                            }
                        </div>
                        {/* {
                            isState?.isLoadingScroll && (
                                <div className="w-full 3xl:h-[80px] h-[60px] flex justify-center items-center gap-2">
                                    <div className="text-[#2FB9BD] inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                                    <span className="text-[#2FB9BD] 3xl:text-xl text-base">Loading...</span>
                                </div>
                            )
                        }
                        <div ref={lastContainerRef} /> */}
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="2" className='lg:mt-4 mt-5'>
                    <ScrollArea
                    // ref={scrollContainerRef}
                    // className={`${isState.dataMyTrips?.length > 0 && isVisibleMobile ? 'h-[1380px]' : isVisibleTablet ? 'h-[1680px]' : 'h-[780px]'}`}
                    >
                        <div className='h-[472px]'>
                            <Image src='/listCarFavorite/nodata.png' alt='' width={1280} height={1024} className='object-cover h-full -w-full' />
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </BackgroundUiProfile>
    )
}

export default MyTrips