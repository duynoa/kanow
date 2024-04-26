"use client"
"use client"
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import Nodata from "@/components/image/Nodata";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useResize } from "@/hooks/useResize";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { uuidv4 } from "@/lib/uuid";
import apiMyTrips from "@/services/profile/myTrips/myTrips.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { IStateGeneralTrip } from "@/types/VehicleManagement/GeneralInfomation/ITrip";
import moment from "moment";
import "moment/locale/vi";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {}


export default function VehicleTripManagement(props: Props) {

    const param: ReadonlyURLSearchParams = useSearchParams()

    const id: string | null = param.get("id") || ''

    const form = useForm({
        defaultValues: {}
    })

    const findValue = form.getValues()

    const { dataDetail: { data, base }, idCar } = useVehicleManage()

    const initialDataMyTrips = [
        {
            id: uuidv4(),
            starTime: new Date(),
            endTime: new Date(),
            total: 900000,
            status: {
                id: 1,
                name: "Khách thuê đã hủy",
                color: "#ef4444",
            },
            user: {
                name: "Minh Quang",
                avatar: "/avatar/avatar_default.png"
            },
            time: new Date(),
        },
        {
            id: uuidv4(),
            starTime: new Date(),
            endTime: new Date(),
            total: 900000,
            status: {
                id: 1,
                name: "Hoàn thành",
                color: "#22c55e",
            },
            user: {
                name: "Huy Tran",
                avatar: "/avatar/avatar_default.png"
            },
            time: new Date(),
        },
        {
            id: uuidv4(),
            starTime: new Date(),
            endTime: new Date(),
            total: 900000,
            status: {
                id: 1,
                name: "Hoàn thành",
                color: "#22c55e",
            },
            user: {
                name: "Trần Văn Nam",
                avatar: "/avatar/avatar_default.png"
            },
            time: new Date(),
        },
        {
            id: uuidv4(),
            starTime: new Date(),
            endTime: new Date(),
            total: 900000,
            status: {
                id: 1,
                name: "Đã kết thúc",
                color: "#f97316",
            },
            user: {
                name: "Trần Văn Khánh",
                avatar: "/avatar/avatar_default.png"
            },
            time: new Date(),
        },
    ]

    const initialState: IStateGeneralTrip = {
        isLoadingCar: false,
        dataMyTrips: initialDataMyTrips,
        page: 1,
        limit: 4,
        favourite: "1",
        next: "",
        totalDrivingCar: 0,
        status_search: -1,
        isLoadingScroll: false,
    }

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const { apiListMyTrips, apiListFilterMyTrips } = apiMyTrips()

    const lastContainerRef = useRef<HTMLDivElement | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isState, sIsState] = useState<any>(initialState)

    const queryState = (key: any) => sIsState((prev: IStateGeneralTrip) => ({ ...prev, ...key }))


    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
                <div className="flex md:flex-row flex-col justify-between">
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Quản lý chuyến</h1>
                </div>
                <ScrollArea
                    ref={scrollContainerRef}
                    className={`${isState.dataMyTrips?.length > 0 &&
                        isVisibleMobile ? isState.dataMyTrips?.length > 4 ? 'h-[680px]' : 'h-auto' :
                        isVisibleTablet ? isState.dataMyTrips?.length > 4 ? 'h-[980px]' : 'h-auto' : isState.dataMyTrips?.length >= 3 ? 'h-[780px]' : 'h-[550px]'} lg:pr-6 pr-3`}
                >
                    <div className='flex flex-col gap-4'>
                        {isState.isLoadingCar ?
                            <>
                                {[...Array(4)].map((_, index) => {
                                    return <React.Fragment key={index}>
                                        <></>
                                    </React.Fragment>
                                })}
                            </>
                            :
                            isState.dataMyTrips?.length > 0 ? isState.dataMyTrips.map((e: any, index: number) => {
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
                                        <div className="flex md:flex-row items-center justify-between md:px-8 px-4 md:pt-4 pt-2 md:pb-8 pb-4 ">
                                            <div className="md:w-[75%] w-full">
                                                <div
                                                    style={{
                                                        backgroundColor: e.status.color
                                                    }}
                                                    className="py-2 px-4 w-fit rounded-full text-xs text-white font-semibold "
                                                >{e.status.name}
                                                </div>
                                            </div>
                                            <h1 className='text-[#3E424E] font-medium lg:text-base text-sm leading-5 normal-case md:w-[25%] w-full text-center'>
                                                {moment(e.createdAt).fromNow()}
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