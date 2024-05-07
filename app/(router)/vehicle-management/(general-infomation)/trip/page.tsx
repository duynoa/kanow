"use client"
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import Nodata from "@/components/image/Nodata";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useDialogFilterMyCar } from "@/hooks/useOpenDialog";
import { useResize } from "@/hooks/useResize";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import apiTrips from "@/services/vehicle-management/trip.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { IStateGeneralTrip } from "@/types/VehicleManagement/GeneralInfomation/ITrip";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {}


export default function VehicleTripManagement(props: Props) {


    const form = useForm({
        defaultValues: {}
    })

    const findValue = form.getValues()

    const { informationUser } = useAuth()

    const { dataDetail: { data, base }, idCar } = useVehicleManage()


    const initialState: IStateGeneralTrip = {
        isLoadingCar: false,
        dataTrips: [],
        page: 1,
        limit: 3,
        next: "",
        isLoadingScroll: false,
    }

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const { apiListTrips } = apiTrips()

    const lastContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isState, sIsState] = useState<any>(initialState)

    const { setDataFilter, setValueFilter, valueFilter, setOpenDialogFilterCar } = useDialogFilterMyCar()

    const queryState = (key: IStateGeneralTrip) => sIsState((prev: IStateGeneralTrip) => ({ ...prev, ...key }))


    const convertArray = (data: any) => {
        const array = data.map((item: any) => {
            return {
                id: item?.id,
                starTime: item?.date_start,
                endTime: item?.date_end,
                total: item?.grand_total,
                status: item?.status,
                user: {
                    name: item?.customer_renter?.fullname,
                    avatar: item?.customer_renter?.avatar ?? "/avatar/avatar_default.png"
                },
                time: item?.date_status
            }
        })
        return array
    }

    const handleFetchListCars = async (page: any) => {
        queryState({ isLoadingCar: true })
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const { data: db } = await apiListTrips(page, isState.limit, { status_search: valueFilter, customer_search: informationUser?.id })
            if (db && db.data && db.base) {
                queryState({
                    dataTrips: convertArray(db.data),
                    page: isState.page + 1,
                    next: db?.links?.next,
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
        setValueFilter(-1)
        if (informationUser?.id) {
            handleFetchListCars(isState.page)
        }
    }, [informationUser?.id])

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
                if (isState.dataTrips && isState.next !== null) {
                    queryState({ isLoadingScroll: true });
                    const fetchDataListCar = async () => {
                        try {
                            await new Promise(resolve => setTimeout(resolve, 1500));

                            const { data: db } = await apiListTrips(isState.page, isState.limit, { status_search: valueFilter, customer_search: data?.customer?.id })

                            if (db && db?.links && db?.data && db?.base) {
                                const arr = convertArray(db.data)

                                if (!isState.isLoadingScroll) {
                                    queryState({
                                        dataTrips: [...(isState.dataTrips || []), ...arr],
                                        next: db?.links?.next,
                                        page: isState.page + 1,
                                    })
                                }
                                return
                            }
                            queryState({
                                dataTrips: isState.dataTrips,
                                next: db?.links?.next,
                                page: db?.links?.next !== null ? isState.page + 1 : isState.page,
                                isLoadingScroll: false,
                            });
                        } catch (error) {
                            throw error
                        } finally {
                            queryState({ isLoadingScroll: false });
                        }
                    };
                    fetchDataListCar()
                    return
                }
                console.log("check next false");
            }
        }

        const scrollCurrent = scrollContainerRef.current;

        scrollCurrent?.addEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);

        return () => {
            scrollCurrent?.removeEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);
        };
    }, [scrollContainerRef, isState.next, isState.page, isState.isLoadingScroll]);




    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
                <div className="flex md:flex-row flex-col justify-between">
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Quản lý chuyến</h1>
                </div>
                <ScrollArea
                    ref={scrollContainerRef}
                    className={`${isState.dataTrips?.length > 0 &&
                        isVisibleMobile ? isState.dataTrips?.length > 4 ? 'h-[680px]' : 'h-auto' :
                        isVisibleTablet ? isState.dataTrips?.length > 4 ? 'h-[980px]' : 'h-auto' : isState.dataTrips?.length >= 3 ? 'h-[780px]' : 'h-[670px]'} lg:pr-6 pr-3`}
                >
                    <div className='flex flex-col gap-4'>
                        {isState.isLoadingCar ?
                            [...Array(4)].map((_, index) => {
                                return (
                                    <div key={index} className="flex flex-col rounded-lg border divide-y">
                                        <div className="flex md:flex-row flex-col md:gap-4 gap-6 items-center justify-between md:p-8 p-4">
                                            <div className="flex flex-col gap-6 md:w-[75%] w-full md:order-none order-2">
                                                <Skeleton className="h-8 w-full" />
                                                <Skeleton className="h-8 w-full" />
                                                <Skeleton className="h-8 w-full" />
                                            </div>
                                            <div className="flex md:flex-col flex-row items-center gap-2 md:w-[25%] w-full">
                                                <Skeleton className="md:size-20 size-10 rounded-full" />
                                                <Skeleton className="h-8 lg:w-1/2 w-full" />
                                            </div>
                                        </div>
                                        <div className="flex md:flex-row items-center justify-between md:px-8 px-4 md:pt-4 pt-2 md:pb-8 pb-4 gap-2">
                                            <div className="md:w-[75%] w-full">
                                                <Skeleton className="h-8 w-1/2" />
                                            </div>
                                            <Skeleton className="h-8 w-1/2" />
                                        </div>
                                    </div>
                                )
                            })
                            :
                            isState.dataTrips?.length > 0 ? isState.dataTrips.map((e: any, index: number) => {
                                return (
                                    <div key={e.id} className="flex flex-col  rounded-lg border divide-y">
                                        <div className="flex md:flex-row flex-col md:gap-0 gap-6 items-center justify-between md:p-8 p-4">
                                            <div className="flex flex-col gap-6 md:w-[75%] w-full md:order-none order-2">
                                                <div className="flex items-center gap-2">
                                                    <h1 className='text-[#8C93A3] font-medium lg:text-base text-sm leading-4'>
                                                        Bắt đầu:
                                                    </h1>
                                                    <h1 className='text-[#3E424E] font-medium lg:text-base text-sm leading-5'>
                                                        {e.starTime && moment(e.starTime).format("HH:mm, ")}<span className="capitalize">{moment(e.starTime).format("dddd, DD/MM/YYYY")}</span>
                                                    </h1>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <h1 className='text-[#8C93A3] font-medium lg:text-base text-sm leading-4'>
                                                        Kết thúc:
                                                    </h1>
                                                    <h1 className='text-[#3E424E] font-medium lg:text-base text-sm leading-5'>
                                                        {e.endTime && moment(e.endTime).format("HH:mm, ")}<span className="capitalize">{moment(e.endTime).format("dddd, DD/MM/YYYY")}</span>
                                                    </h1>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <h1 className='text-[#8C93A3] font-medium lg:text-base text-sm leading-4'>
                                                        Tổng tiền:
                                                    </h1>
                                                    <h1 className='text-[#2FB9BD] font-[700] lg:text-xl text-lg leading-5'>
                                                        {e.total && FormatNumberToThousands(e.total)}
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="flex md:flex-col flex-row items-center gap-2 md:w-[25%] w-full">
                                                <Avatar className="md:size-20 size-10">
                                                    <AvatarImage src={e.user?.avatar} alt="@shadcn" className="size-full " />
                                                </Avatar>
                                                <h1 className="text-center uppercase text-[#2FB9BD] font-[700] lg:text-base md:text-sm text-xs">{e.user?.name}</h1>
                                            </div>
                                        </div>
                                        <div className="flex md:flex-row items-center justify-between md:px-8 px-4 py-4">
                                            <div className="md:w-[75%] w-full">
                                                <div
                                                    style={{
                                                        backgroundColor: e.status.color
                                                    }}
                                                    className="py-2 px-4 w-fit rounded-full text-xs text-white font-semibold "
                                                >{e.status.name}
                                                </div>
                                            </div>
                                            <h1 className='text-[#3E424E] font-medium lg:text-base text-sm leading-5  md:w-[25%] w-full text-center'>
                                                <span className="capitalize px-1">{moment(e.time).fromNow().split(' ').slice(0, 1).join(' ')}</span>
                                                {moment(e.time).fromNow().split(' ').slice(1).join(' ')}
                                            </h1>
                                        </div>
                                    </div>
                                )
                            }) :
                                <Nodata type='mytrip' />
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
            </div >
        </BackgroundUiVehicle >
    )
}