"use client"

import ConvertToSlug from "@/components/convertSlug/ConvertToSlug"
import { FormatNumberHundred, FormatNumberToDecimal, FormatNumberToThousands } from "@/components/format/FormatNumber"
import Nodata from "@/components/image/Nodata"
import { Button } from "@/components/ui/button"
import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment"
import { uuidv4 } from "@/lib/uuid"
import BackgroundUiProfile from "@/themes/profile/BackgroundUiProfile"
import { IMyCar } from "@/types/Profile/mycar/IMyCar"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FaStar } from "react-icons/fa"
import { FaCircleCheck } from "react-icons/fa6"
import { TiLocation } from "react-icons/ti"
import SkeletonMyCar from "../Skeleton/SkeletonMyCar"

type Props = {
    isState: IMyCar
}

const MyCar = ({ isState }: Props) => {
    return (
        <>
            {isState.isLoadingCar ?
                [...Array(3)].map((_, index) => (
                    <SkeletonMyCar key={index} />
                ))
                :
                isState.dataMyCar?.length > 0 ? isState.dataMyCar.map((e, index) => (
                    <Link
                        key={e.id}
                        id={`e-${e.id}`}
                        href={`/info-rental-car/${e.id}`}
                        className={`flex lg:flex-nowrap flex-wrap group lg:gap-6 gap-3 xl:items-start lg:items-start items-start bg-white border-[#D7D9E0] border w-full p-4 rounded-xl relative z-0`}
                    >
                        <div
                            className='3xl:w-[30%] xxl:w-[35%]  2xl:w-[35%] xl:w-[40%] lg:w-[45%] w-full 3xl:h-[210px] xxl:h-[185px] 2xl:h-[190px] xl:h-[175px] lg:h-[165px] md:h-[280px] h-[180px] overflow-hidden rounded-xl'>
                            <Image
                                src={e?.image_car?.length > 0 ? e?.image_car[0]?.name : '/default/default.png'}
                                alt="image_e"
                                width={1280}
                                height={1024}
                                className='rounded-xl h-full w-full object-cover group-hover:scale-105 overflow-hidden transition-all duration-500 ease-in-out '
                            />
                        </div>
                        <div className='3xl:w-[50%] xxl:w-[45%] 2xl:w-[45%] xl:w-[40%] lg:w-[45%] w-full flex flex-col 3xl:gap-2 xxl:gap-2.5 2xl:gap-2 xl:gap-2 lg:gap-2 gap-3'>
                            <div style={{
                                backgroundColor: e.status.color
                            }} className={`w-fit py-1 px-4 text-center text-[#FFFFFF] font-semibold text-xs rounded-xl`}>
                                {e.status.name ? e.status.name : ""}
                            </div>
                            <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase'>
                                {e.name_car ? e.name_car : ''}
                            </div>
                            <div className='flex gap-1 items-center'>
                                <TiLocation className='text-base text-[#FA3434] w-[16px] max-w-[16px]' />
                                <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%]'>
                                    {e.address ? e.address : ''}
                                </div>
                            </div>
                            <div className='border-b lg:hidden block border-[#D7D9E0]/50 w-full col-span-12' />
                            <div className={`flex lg:flex-col xl:justify-start lg:justify-center md:justify-between ${e.total_trip ? 'justify-between ' : 'justify-between px-3'} lg:px-0 px-2  flex-row 3xl:gap-2 2xl:gap-2 xxl:gap-2.5 xl:gap-2 lg:gap-2 gap-2  lg:bg-transparent lg:py-0 lg:rounded-none
                                                     rounded-md py-3 bg-[#F2FCF7] `}>
                                <div className='flex lg:flex-col flex-row lg:items-start items-center gap-2'>
                                    {
                                        e.point_star ?
                                            <div className='flex items-center gap-1'>
                                                <div className='flex items-center gap-1'>
                                                    <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#FFC118]' />
                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                        {e.point_star ? (FormatNumberToDecimal(e.point_star, 1)) : 0}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        e.total_trip ?
                                            <>
                                                <div className='size-1 bg-[#B4B8C5] rounded-full md:hidden block'></div>
                                                <div className='flex items-center gap-1'>
                                                    <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#3AC996]' />
                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                        {e.total_trip ? FormatNumberHundred(e.total_trip, 100) : 0} Chuyến
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                Chưa có chuyến
                                            </div>
                                    }
                                </div>
                                <div className='flex items-center gap-1'>
                                    <span className='lg:text-base text-sm text-[#8C93A3] font-medium'>
                                        Giá tự lái:
                                    </span>
                                    <div className='flex'>
                                        <span className='lg:text-xl text-base text-[#1AC5CA] font-medium'>
                                            {e.price.rent_cost ? FormatNumberToThousands(e.price.rent_cost) : 0}
                                        </span>
                                        <span className='text-xs text-[#585F71] flex justify-start font-bold capitalize'>
                                            /ngày
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='3xl:w-[20%] xxl:w-[20%] 2xl:w-[20%] xl:w-[20%] lg:w-[15%] w-full flex lg:flex-col flex-row justify-center items-center gap-4 my-auto'>
                            <Link
                                href={`/vehicle-management/information?id=${e.id}`}
                                className={`bg-[#2FB9BD]/80 hover:bg-[#2FB9BD]/80 text-white border-[#2FB9BD] w-full xl:text-sm lg:text-[9px] text-sm text-center
                                2xl:py-3 xl:py-2.5 lg:py-1.5 py-2.5  rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  lg:border border-[1.5px] uppercases`}>
                                Quản lý xe
                            </Link>
                            <Link
                                href={`/detail-car/${e.id}?type=1&${ConvertToSlug(e?.name_car)}`}
                                className={` hover:bg-[#2FB9BD]/80 text-[#2FB9BD] hover:text-white border-[#2FB9BD] w-full xl:text-sm lg:text-[9px] text-sm text-center
                                 2xl:py-3 xl:py-2.5 lg:py-1.5 py-2.5  rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  lg:border border-[1.5px] uppercases`}>
                                Xem chi tiết
                            </Link>
                        </div>
                    </Link>
                )) :
                    <Nodata type='list-my-car' />
            }
        </>

    )
}

export default MyCar