import { FormatCurrency } from "@/components/format/FormatNumber"
import Nodata from "@/components/image/Nodata"
import { useResize } from "@/hooks/useResize"
import { IArrayMyTripCar } from "@/types/Profile/IMyTrips"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { GoClock } from "react-icons/go"
import SkeletonMyTrip from "./SkeletonMyTrip"
import SkeletonMyTripMobile from "./SkeletonMyTripMobile"

const MyTripSelfDrivingCar = ({ isState }: any) => {
    const { isVisibleMobile } = useResize()
    return <>
        {isState.isLoadingCar ?
            <>
                {[...Array(4)].map((_, index) => {
                    return <React.Fragment key={index}>
                        {
                            isVisibleMobile ?
                                <SkeletonMyTripMobile checkStyle={index === 3} /> :
                                <SkeletonMyTrip checkStyle={index === 3} />
                        }
                    </React.Fragment>
                })}
            </>
            :
            isState.dataMyTrips?.length > 0 ? isState.dataMyTrips.map((e: IArrayMyTripCar, index: number) => {
                return <React.Fragment key={e.id}>
                    {isVisibleMobile ?
                        <Link
                            href={`/info-rental-car/${e.id}?type=${isState.tab}`}
                            id={`card-${e.id}`}
                            className={`flex flex-wrap gap-2 group bg-white border-[#D7D9E0] ${index === isState.dataMyTrips?.length - 1 ? 'border-b-0' : 'border-b'} pb-4 w-full relative z-0`}
                        >
                            <div
                                // href={`/detail-car/${e.id}?${ConvertToSlug(e?.car.name)}`}
                                className='w-[43%] h-[112px] relative overflow-hidden rounded-xl'>
                                <Image
                                    src={e?.car.image ? e?.car.image : '/default/default.png'}
                                    alt="image_card"
                                    width={1280}
                                    height={1024}
                                    className=' h-full w-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear'
                                />
                                <div style={{
                                    backgroundColor: e.status.color
                                }} className={`w-full py-1 absolute top-0 text-center mx-auto text-[#FFFFFF] font-semibold text-xs rounded-tl-xl rounded-tr-xl`}>
                                    {e.status.name ? e.status.name : ""}
                                </div>
                            </div>
                            <div className='w-[53%] flex flex-col justify-between '>
                                <div className='text-base truncate text-[#1D1D1D] font-bold uppercase'>
                                    {e.car.name ? e.car.name : ''}
                                </div>
                                <div className='flex items-start gap-2'>
                                    <h1 className='text-[#8C93A3] font-medium text-xs leading-4'>
                                        Thời gian thuê:
                                    </h1>
                                    <div className="flex flex-col">
                                        <h1 className='text-[#585F71] font-semibold text-[10px] leading-5 truncate'>
                                            {e.date_start && `${moment(e.date_start).format('h')}h${moment(e.date_start).format('mm')} ${moment(e.date_start).format('DD/MM/YYYY')}`}
                                        </h1>
                                        <h1 className='text-[#585F71] font-semibold text-[10px] leading-5 truncate'>
                                            {e.date_end && `${moment(e.date_end).format('h')}h${moment(e.date_end).format('mm')} ${moment(e.date_end).format('DD/MM/YYYY')}`}
                                        </h1>
                                    </div>
                                </div>
                                <div className='flex  gap-2 items-center w-full'>
                                    <h1 className='text-[#8C93A3] font-medium  text-xs leading-4'>
                                        Tổng tiền:
                                    </h1>
                                    <h1 className='text-[#2FB9BD] font-[700] text-sm leading-5 ml-auto'>
                                        {e.grand_total && FormatCurrency(e.grand_total)}
                                    </h1>
                                </div>
                            </div>
                            <div className='w-full flex items-center gap-2 mt-2'>
                                <div className='flex items-center gap-1'>
                                    <div className='w-[15px] h-3'>
                                        <Image src={'/profile/mytrip/myTripMy.png'} alt='' width={1280} height={1024} className='size-full' />
                                    </div>
                                    <h1 className='text-[11px] text-[#3561FF] font-medium'>
                                        Xe tự lái
                                    </h1>
                                </div>
                                <div className='size-1 rounded-full bg-[#D7D9E0]'></div>
                                <div className='flex items-center gap-1'>
                                    <GoClock style={{
                                        color: e.status.color
                                    }} className='size-3' />
                                    <div style={{
                                        color: e.status.color,
                                    }} className='text-[11px] font-medium'>
                                        {e.status.date_status ?
                                            `${e.status.name} lúc ${moment(e.status.date_status).format('h')}h${moment(e.status.date_status).format('mm')} ${moment(e.status.date_status).format('DD/MM/YY')}` :
                                            e.status.name
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>
                        :
                        <Link
                            href={`/info-rental-car/${e.id}?type=${isState.tab}`}
                            id={`card-${e.id}`}
                            className={`flex lg:items-center lg:flex-nowrap group items-start flex-wrap lg:gap-6 gap-3  bg-white border-[#D7D9E0]  ${index === isState.dataMyTrips?.length - 1 ? 'border-b-0' : 'border-b'} pb-5 w-full relative z-0`}
                        >
                            <div

                                // href={`/detail-car/${e.id}?${ConvertToSlug(e?.car.name)}`}
                                className='lg:w-[20%] w-[35%] h-[170px] relative overflow-hidden rounded-xl'>
                                <Image
                                    src={e?.car.image ? e?.car.image : '/default/default.png'}
                                    alt="image_card"
                                    width={1280}
                                    height={1024}
                                    className=' h-full w-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear'
                                />
                                <div style={{
                                    backgroundColor: e.status.color
                                }} className={`w-full py-2 absolute top-0 text-center mx-auto text-[#FFFFFF] font-semibold text-sm rounded-tl-xl rounded-tr-xl`}>
                                    {e.status.name ? e.status.name : ""}
                                </div>
                            </div>
                            <div className='lg:w-[35%] w-[60%] flex flex-col 3xl:gap-2 xxl:gap-2.5 2xl:gap-2 xl:gap-2 lg:gap-2 gap-3'>
                                <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase'>
                                    {e.car.name ? e.car.name : ''}
                                </div>
                                <div className='flex items-center gap-1'>
                                    <div className='w-[15px] h-3'>
                                        <Image src={'/profile/mytrip/myTripMy.png'} alt='' width={1280} height={1024} className='size-full' />
                                    </div>
                                    <h1 className='text-sm text-[#3561FF] font-medium'>
                                        Xe tự lái
                                    </h1>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <GoClock style={{
                                        color: e.status.color
                                    }} className='size-[15px]' />
                                    <div style={{
                                        color: e.status.color,
                                    }} className='text-sm font-medium'>
                                        {e.status.date_status ?
                                            `${e.status.name} lúc ${moment(e.status.date_status).format('h')}h${moment(e.status.date_status).format('mm')} ${moment(e.status.date_status).format('DD/MM/YY')}` :
                                            e.status.name
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-[45%] w-full flex lg:justify-end justify-between  lg:gap-12 gap-8 lg:mt-0 mt-2'>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-[#8C93A3] font-medium lg:text-[13px] text-xs leading-4'>
                                        Bắt đầu
                                    </h1>
                                    <h1 className='text-[#3E424E] font-medium lg:text-base text-sm leading-5'>
                                        {e.date_start && `${moment(e.date_start).format('h')}h${moment(e.date_start).format('mm')} ${moment(e.date_start).format('DD/MM/YYYY')}`}
                                    </h1>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-[#8C93A3] font-medium lg:text-[13px] text-xs leading-4'>
                                        Kết thúc
                                    </h1>
                                    <h1 className='text-[#3E424E] font-medium lg:text-base text-sm leading-5'>
                                        {e.date_end && `${moment(e.date_end).format('h')}h${moment(e.date_end).format('mm')} ${moment(e.date_end).format('DD/MM/YYYY')}`}
                                    </h1>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-[#8C93A3] font-medium lg:text-[13px] text-xs leading-4'>
                                        Tổng tiền:
                                    </h1>
                                    <h1 className='text-[#2FB9BD] font-[700] lg:text-base text-sm leading-5'>
                                        {e.grand_total && FormatCurrency(e.grand_total)}
                                    </h1>
                                </div>
                            </div>
                        </Link>
                    }

                </React.Fragment>
            }) :
                <Nodata type='mytrip' />
        }
    </>
}
export default MyTripSelfDrivingCar
