import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import moment from "moment";
import StarRatings from 'react-star-ratings';
import { v4 as uuidv4 } from 'uuid'

import { FaRegQuestionCircle, FaStar } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { TiLocation } from 'react-icons/ti'

import { useResize } from '@/hooks/useResize'

import { FormatNumberHundred, FormatPhoneNumber, FormatPointStar } from '@/components/format/FormatNumber'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// import { vi } from 'date-fns/locale';
import "moment/locale/vi";
import { vi } from 'date-fns/locale';
import { ActionTooltip } from '@/components/tooltip/ActionTooltip';
import { useDialogAnswerPolicy } from '@/hooks/useOpenDialog';
import { PiShieldCheckFill } from 'react-icons/pi';
import { HiClock } from 'react-icons/hi';
import { IInitialStateInfoRentalCar } from '@/types/Initial/IInitial';
import { Badge } from '@/components/ui/badge';
import { useDataInfoRentalCar, useDataPolicy } from '@/hooks/useDataQueryKey';

type Props = {

    params: {
        slug: string
    },
}

const Information = ({

    params,
}: Props) => {
    const { setOpenDialogAnswerPolicy } = useDialogAnswerPolicy()
    const { isStateInfoRentalCar } = useDataInfoRentalCar()
    const { isStatePolicy } = useDataPolicy()

    const [expandedItems, setExpandedItems] = useState<boolean>(false);

    const handleToggleExpand = () => {
        setExpandedItems(!expandedItems);
    };

    const { isVisibleMobile, isVisibleTablet } = useResize()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    // Sử dụng useState để theo dõi trạng thái của header thứ hai

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const featuresCar = [
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_1.svg",
            name: 'Bản đồ',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_2.svg",
            name: 'Camera hành trình',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_3.svg",
            name: 'Cảm biến lốp',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_4.svg",
            name: 'Cảnh báo tốc độ',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_5.svg",
            name: 'Bluetooth',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_6.svg",
            name: 'ETC',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_7.svg",
            name: 'Khe cắm USB',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_8.svg",
            name: 'Màn hình DVD',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_9.svg",
            name: 'Camera lùi',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_10.svg",
            name: 'Định vị GPS',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_11.svg",
            name: 'Túi khí an toàn',
        },
        {
            id: uuidv4(),
            icon: "/icon/iconTest/icon_12.svg",
            name: 'Cảm biến va chạm',
        },
    ]

    const listComment = [
        {
            id: uuidv4(),
            fullName: 'Phạm thị minh phượng',
            createdTime: '2 tuần trước',
            content: "Goodjob",
            rating: 5
        },
    ]

    const listSurcharge = [
        {
            id: uuidv4(),
            title: 'Phí vượt giới hạn',
            description: "Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 900km khi thuê xe 3 ngày",
            money: "5k/km"
        },
        {
            id: uuidv4(),
            title: 'Phụ phí khác',
            description: "Phụ phí phát sinh nếu trả xe trễ, xe không đảm bảo vệ sinh hoặc bị ám mùi",
            money: "5k/km"
        },
    ]

    const dataMaps = {
        google_map_link: ""
    }

    if (!isMounted) {
        return null
    }

    return (
        <div className='flex flex-col gap-6 xxl:w-[70%] xxl:max-w-[70%] lg:w-[65%] lg:max-w-[65%] w-full max-w-full h-full pb-16 lg:order-none order-2'>
            <div className='flex md:flex-row flex-col md:items-center 3xl:gap-4 gap-4 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                <div className='md:w-56 md:h-36 w-full h-52'>
                    <Image
                        alt="image"
                        width={400}
                        height={400}
                        className='w-full h-full object-cover rounded-lg'
                        src={isStateInfoRentalCar?.detailRentalCar && isStateInfoRentalCar?.detailRentalCar?.car ? isStateInfoRentalCar?.detailRentalCar?.car?.image : "/default/default.png"}
                    />
                </div>

                <div className='flex flex-col justify-between gap-3 h-full'>
                    <div className='3xl:text-base lg:text-sm md:text-base text-sm font-bold uppercase'>
                        {isStateInfoRentalCar?.detailRentalCar?.car?.name ? isStateInfoRentalCar?.detailRentalCar?.car?.name : ""}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='space-x-2'>
                            <span className='3xl:text-sm text-xs text-[#8C93A3] font-normal'>Mã số xe:</span>
                            <span className='3xl:text-sm text-xs text-[#585F71] font-semibold'>
                                {isStateInfoRentalCar?.detailRentalCar?.car?.number_car ? isStateInfoRentalCar?.detailRentalCar?.car?.number_car : ""}
                            </span>
                            <Badge className='px-3 py-1 bg-[#000000]/50 rounded-xl text-white 3xl:text-sm text-xs'>
                                Mã số chuyến: {isStateInfoRentalCar?.detailRentalCar?.car?.reference_no ? isStateInfoRentalCar?.detailRentalCar?.car?.reference_no : ""}
                            </Badge>
                        </div>
                        <div className='flex items-center gap-4'>
                            {/* <div className='flex items-center gap-1'>
                                <FaStar className='3xl:text-base lg:text-sm md:text-base text-sm text-[#FF9900]' />
                                <div className='3xl:text-sm text-xs text-[#484D5C] font-medium'>
                                    4.9
                                </div>
                            </div> */}

                            <div className='flex items-center gap-1'>
                                <FaCircleCheck className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3AC996]' />
                                <div className='3xl:text-sm text-xs text-[#484D5C] font-semibold'>
                                    {
                                        isStateInfoRentalCar?.detailRentalCar && isStateInfoRentalCar?.detailRentalCar?.customer?.total_trip !== 0 ?
                                            `${FormatNumberHundred(isStateInfoRentalCar?.detailRentalCar?.customer?.total_trip, 100)} Chuyến`
                                            :
                                            "Chưa có chuyến"
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='px-4 py-2 flex items-center gap-2 border border-[#64E4E4] rounded-lg bg-[#F1FCFC] w-fit caret-transparent'>
                        <span className='3xl:text-base lg:text-sm md:text-base text-sm font-semibold text-[#3E424E]'>Bảo hiểm thuê xe MIC</span>
                        <PiShieldCheckFill
                            onClick={() => console.log('check')}
                            className='text-[#2FB9BD] text-xl cursor-pointer'
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                <div className='3xl:text-2xl text-xl font-semibold'>
                    Thông tin thuê xe
                </div>

                <div className='flex md:flex-row flex-col md:items-center justify-between md:gap-0 gap-4'>
                    <div className='md:w-1/2 md:max-w-[50%] w-full flex flex-col'>
                        <div className='flex items-center gap-2'>
                            <div className='min-w-5'>
                                <HiClock className='size-5 text-[#2FB9BD]' />
                            </div>
                            <div className="3xl:text-sm text-xs text-[#6F7689] font-normal">
                                Thời gian thuê
                            </div>
                        </div>
                        <div className='pl-7 mt-1 flex items-center gap-1'>
                            <div className="3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] font-medium">
                                Từ:
                            </div>
                            <div className="3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-medium">
                                {moment(isStateInfoRentalCar?.detailRentalCar?.date_time?.date_start).format("HH[h]MM dd/mm/YYYY")}
                            </div>
                        </div>
                        <div className='pl-7 flex items-center gap-1'>
                            <div className="3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] font-medium">
                                Đến:
                            </div>
                            <div className="3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-medium">
                                {moment(isStateInfoRentalCar?.detailRentalCar?.date_time?.date_end).format("HH[h]MM dd/mm/YYYY")}
                            </div>
                        </div>
                    </div>

                    <div className='md:w-1/2 md:max-w-[50%] w-full flex flex-col'>
                        <div className='flex items-center gap-2'>
                            <div className='min-w-5'>
                                <TiLocation className='text-[#FA3434] size-5' />
                            </div>
                            <div className="3xl:text-sm text-xs text-[#6F7689] font-normal">
                                Nhận xe ở địa điểm của chủ xe
                            </div>
                        </div>
                        <div className='pl-7 mt-1 3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-medium'>
                            {isStateInfoRentalCar?.detailRentalCar?.address?.full_address}
                            {/* 12 Hoàn Kiếm Hà Nội */}
                        </div>
                        <div className='pl-7 3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-medium cursor-pointer w-fit duration-200 transition caret-transparent'>
                            Xem bản đồ
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Chủ xe
                </div>

                <div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-4'>
                    <div className='flex items-center gap-4 md:max-w-[50%] max-w-full bg-[#F6F6F8] p-4 w-full rounded-xl    '>
                        <div className='3xl:w-16 3xl:h-16 3xl:min-w-16 w-14 min-w-14 h-14 rounded-full border-[3px] border-[#ffffff] drop-shadow'>
                            <Avatar className='w-full h-full shadow'>
                                <AvatarImage
                                    // src={'/avatar/avatar_default.png'}
                                    src={isStateInfoRentalCar?.detailRentalCar?.customer?.avatar ? isStateInfoRentalCar?.detailRentalCar?.customer?.avatar : '/avatar/avatar_default.png'}
                                    alt="@kanow"
                                />
                                <AvatarFallback >
                                    <Image
                                        src="/avatar/avatar_default.png"
                                        alt="avatar"
                                        width={100}
                                        height={100}
                                        className='w-full h-full object-contain rounded-full'
                                    />
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className='flex flex-col 3xl:gap-2 gap-1'>
                            <div className='uppercase text-[#16171B] font-semibold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                {isStateInfoRentalCar?.detailRentalCar?.customer?.fullname ? isStateInfoRentalCar?.detailRentalCar?.customer?.fullname : ""}
                            </div>
                            {
                                isStateInfoRentalCar?.detailRentalCar?.status && (isStateInfoRentalCar?.detailRentalCar?.status?.status === 2 || isStateInfoRentalCar?.detailRentalCar?.status?.status === 3 || isStateInfoRentalCar?.detailRentalCar?.status?.status === 4) &&
                                <div className='3xl:text-sm text-xs text-[#484D6C] font-medium'>
                                    SĐT: {FormatPhoneNumber(`${isStateInfoRentalCar?.detailRentalCar?.customer?.phone}`)}
                                </div>
                            }
                            <div className='flex items-center gap-4'>
                                {
                                    isStateInfoRentalCar?.detailRentalCar && isStateInfoRentalCar?.detailRentalCar?.customer?.total_star ?
                                        <div className='flex items-center gap-1'>
                                            <FaStar className='3xl:text-base lg:text-sm md:text-base text-sm text-[#FF9900]' />
                                            <div className='3xl:text-sm text-xs text-[#484D5C] font-medium'>
                                                {isStateInfoRentalCar?.detailRentalCar?.customer?.total_star ? (FormatPointStar(isStateInfoRentalCar?.detailRentalCar?.customer?.total_star, 1)) : 0}
                                            </div>
                                        </div>
                                        :
                                        null
                                }

                                {/* <div className='flex items-center gap-1'>
                                    <FaCircleCheck className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3AC996]' />
                                    <div className='3xl:text-sm text-xs text-[#484D5C] font-semibold'>
                                        {FormatNumberHundred(19, 100)} Chuyến
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#6F7689] md:max-w-[50%] max-w-full'>
                        Nhằm bảo mật thông tin, Chúng tôi sẽ gửi thông tin liên hệ của chủ xe sau khi hoàn tất thanh toán cho ứng dụng
                    </div>
                </div>
            </div>

            {
                isStateInfoRentalCar?.detailRentalCar?.status && isStateInfoRentalCar?.detailRentalCar?.status?.status === 4 &&
                <div className='flex flex-col gap-4 3xl:pb-6 pb-4 border-b'>
                    <div className='flex items-center justify-between'>
                        <div className='flex flex-col gap-1'>
                            <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                                Đánh giá
                            </div>
                        </div>
                    </div>
                    {
                        listComment?.map((item, index) => (
                            <div key={item.id} className={`${index !== listComment?.length - 1 ? "border-b pb-3" : ""} flex flex-col`}>
                                <div className='flex items-center gap-3'>
                                    <div className='3xl:w-14 3xl:h-14 3xl:max-w-14 w-12 h-12 max-w-12 rounded-full drop-shadow'>
                                        <Image
                                            src="/avatar/avatar1.png"
                                            alt="avatar"
                                            width={100}
                                            height={100}
                                            className='w-full h-full object-contain rounded-full'
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <div className='capitalize 3xl:text-base lg:text-sm md:text-base text-sm text-[#484D5C] font-semibold'>
                                            Trần Thị Minh Phượng
                                        </div>
                                        <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                            {/* {
                                                moment().subtract(1, "days").isSame(moment(item?.date, "DD/MM/YYYY"), "day")
                                                    ? `Hôm qua lúc ${moment(item?.date).format("HH:mm")}`
                                                    : moment(item?.date).fromNow()
                                            } */}
                                            2 tuần trước
                                        </div>
                                    </div>
                                </div>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#585F71] mt-2'>
                                    {item.content ? item.content : ''}
                                </div>
                                <div className='flex items-center'>
                                    {
                                        isVisibleMobile ?
                                            <StarRatings
                                                rating={4}
                                                // rating={item.star ? item.star : 0}
                                                starRatedColor="#FCC43E"
                                                starHoverColor='#FCC43E'
                                                starDimension='14px'
                                                starSpacing='0px'
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                            :
                                            <StarRatings
                                                rating={4}
                                                // rating={item.star ? item.star : 0}s
                                                starRatedColor="#FCC43E"
                                                starHoverColor='#FCC43E'
                                                starDimension='14px'
                                                starSpacing='2px'
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            }

            <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                <div className='flex flex-row items-center gap-2'>
                    <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                        Giấy tờ thuê xe
                    </div>
                    {
                        isVisibleTablet ?
                            <div onClick={() => setOpenDialogAnswerPolicy(true, "car_rental_policy")}>
                                <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                            </div>
                            :
                            <ActionTooltip
                                side="bottom"
                                align="center"
                                label={(
                                    <div className='flex flex-col gap-1 max-w-[240px]'>
                                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_rental_policy ? isStatePolicy?.dataPolicy?.car_rental_policy : ''}` }} />
                                    </div>
                                )}
                            >
                                <div>
                                    <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                </div>
                            </ActionTooltip>
                    }

                </div>
                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#484D5C] 3xl:mb-0 mb-3'>
                    Vui lòng chuẩn bị 2 loại giấy tờ:
                </div>
                <div className='grid grid-cols-12 w-full gap-4'>
                    <div className='3xl::col-span-3 xxl:col-span-4 col-span-12 flex flex-row items-center w-full h-full gap-4'>
                        <div className='w-8 min-w-8 h-8 flex items-center justify-center text-base rounded-full font-bold bg-[#14868E] text-white'>
                            1
                        </div>
                        <div className='w-full h-full p-4 border-2 rounded-2xl flex flex-col gap-6'>
                            <div className='w-[140px] max-w-[140px] h-[90px]'>
                                <Image
                                    src="/other/info/driverLicense.png"
                                    alt="driver_license"
                                    width={600}
                                    height={600}
                                    className='w-full h-full object-contain'
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3561FF] font-semibold'>
                                    Giấy phép lái xe
                                </div>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#585F71]'>
                                    Chủ xe đối chiếu và gửi lại bạn
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='3xl::col-span-9 xxl:col-span-8 col-span-12 flex flex-row items-center w-full h-full gap-4'>
                        <div className='w-8 min-w-8 h-8 flex items-center justify-center text-base rounded-full font-bold bg-[#14868E] text-white'>
                            2
                        </div>
                        <div className='w-full p-4 border-2 rounded-2xl flex md:flex-row flex-col gap-4'>
                            <div className='flex flex-col gap-6 md:max-w-[45%] max-w-full'>
                                <div className='w-[140px] max-w-[140px] h-[90px]'>
                                    <Image
                                        src="/other/info/citizenCard.png"
                                        alt="citizen_card"
                                        width={600}
                                        height={600}
                                        className='w-full h-full object-contain'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-1'>
                                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3561FF] font-semibold'>
                                        CCCD có gắn chip
                                    </div>
                                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#585F71]'>
                                        Chủ xe đối chiếu và gửi lại bạn
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-6 md:max-w-[10%] max-w-full'>
                                <div className='uppercase text-[#FF9900] 3xl:text-base lg:text-sm md:text-base text-sm font-semibold'>
                                    Hoặc
                                </div>
                            </div>
                            <div className='flex flex-col gap-6 md:max-w-[45%] max-w-full'>
                                <div className='w-[140px] max-w-[140px] h-[90px]'>
                                    <Image
                                        src="/other/info/passport.png"
                                        alt="passport"
                                        width={600}
                                        height={600}
                                        className='w-full h-full object-contain'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-1'>
                                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3561FF] font-semibold'>
                                        Hộ chiếu
                                    </div>
                                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#585F71]'>
                                        Chủ xe đối chiếu, giữ lại và hoàn trả khi bạn trả xe
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                <div className='flex flex-row items-center gap-2'>
                    <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                        Tài sản thế chấp
                    </div>
                    {
                        isVisibleTablet ?
                            <div onClick={() => setOpenDialogAnswerPolicy(true, "car_collateral_policy")}>
                                <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                            </div>
                            :
                            <ActionTooltip
                                side="bottom"
                                align="center"
                                label={(
                                    <div className='flex flex-col gap-1 max-w-[240px]'>
                                        {/* <span dangerouslySetInnerHTML={{ __html: `` }} /> */}
                                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_collateral_policy ? isStatePolicy?.dataPolicy?.car_collateral_policy : ''}` }} />
                                    </div>
                                )}
                            >
                                <div>
                                    <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                </div>
                            </ActionTooltip>
                    }
                </div>
                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#585F71]'>
                    {isStateInfoRentalCar?.detailRentalCar?.car?.note_mortgage ? isStateInfoRentalCar?.detailRentalCar?.car?.note_mortgage : ""}
                </div>
            </div>

            <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Phụ phí có thể phát sinh
                </div>
                <div className='flex flex-col gap-4'>
                    {/* {
                        listSurcharge && listSurcharge?.map((item) => (
                            <div key={`id-${item.id}`} className='flex items-center justify-between gap-2 p-6 bg-[#F6F6F8] rounded-xl'>
                                <div className='w-[70%] max-w-[70%] flex flex-col gap-1'>
                                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-semibold'>
                                        {item.title ? item.title : ""}
                                    </div>
                                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#585F71]'>
                                        {item.description ? item.description : ""}
                                    </div>
                                </div>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm w-[20%] max-w-[20%] flex justify-end text-[#FA3434] font-medium'>
                                    {item.money ? item.money : ""}
                                </div>
                            </div>
                        ))
                    } */}
                    {
                        isStateInfoRentalCar?.detailRentalCar?.surcharge_car && isStateInfoRentalCar?.detailRentalCar?.surcharge_car?.map((item) => (
                            <div key={`id-${item.id}`} className='flex items-center justify-between gap-2 p-6 bg-[#F6F6F8] rounded-xl'>
                                <div className='w-[70%] max-w-[70%] flex flex-col gap-1'>
                                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-semibold'>
                                        {item.name ? item.name : ""}
                                    </div>
                                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#585F71]'>
                                        {item.note ? item.note : ""}
                                    </div>
                                </div>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm w-[20%] max-w-[20%] flex justify-end text-[#FA3434] font-medium'>
                                    {item.value ? item.value : ""}
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className='flex flex-col 3xl:gap-4 gap-2'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Chính sách huỷ chuyến
                </div>

                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#585F71]'>
                    {isStatePolicy?.dataPolicy?.cancel_trip?.title_cancel_trip ? isStatePolicy?.dataPolicy?.cancel_trip?.title_cancel_trip : ""}
                </div>

                {/* phần này xử lí khi có api */}
                {
                    isStatePolicy?.dataPolicy?.cancel_trip?.policy_cancel_trip && isStatePolicy?.dataPolicy?.cancel_trip?.policy_cancel_trip?.length > 0 ?
                        <div className='grid grid-rows-1'>
                            <div className='row-span-1 grid grid-cols-3'>
                                <div className="col-span-1 p-5 border border-b-0 border-r-0 rounded-tl-xl">
                                    <div className='3xl:text-lg text-base font-semibold'>
                                        Thời điểm huỷ chuyến
                                    </div>
                                </div>
                                <div className="col-span-1 p-5 border border-b-0 border-r-0 text-center">
                                    <div className='3xl:text-lg text-base font-semibold'>
                                        Khách thuê huỷ chuyến
                                    </div>
                                </div>
                                <div className="col-span-1 p-5 border border-b-0 rounded-tr-xl text-center">
                                    <div className='3xl:text-lg text-base font-semibold'>
                                        Chủ xe huỷ chuyến
                                    </div>
                                </div>
                            </div>

                            {
                                isStatePolicy?.dataPolicy?.cancel_trip?.policy_cancel_trip && isStatePolicy?.dataPolicy?.cancel_trip?.policy_cancel_trip?.map((item: any, index: number) => (
                                    <div key={`cancel-${item.id}`} className={`${isStatePolicy?.dataPolicy?.cancel_trip?.policy_cancel_trip && isStatePolicy?.dataPolicy?.cancel_trip?.policy_cancel_trip.length - 1 == index ? "border-b" : ""} row-span-1 grid grid-cols-3`}>
                                        <div className="col-span-1 p-4 border border-b-0 border-r-0">
                                            <div className='3xl:text-base lg:text-sm md:text-base text-sm font-medium'>
                                                {item?.name ? item?.name : ""}
                                            </div>
                                        </div>
                                        <div className="col-span-1 p-4 border border-b-0 border-r-0 text-center">
                                            <div className='3xl:text-sm text-[13px]'>
                                                {item?.guest_cancel ? item?.guest_cancel : ""}
                                            </div>
                                        </div>
                                        <div className="col-span-1 p-4 border border-b-0 text-center">
                                            <div className='3xl:text-sm text-[13px]'>
                                                {item?.owen_cancel ? item?.owen_cancel : ""}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        null
                }

                <div className='text-sm text-[#585F71] group-hover:text-[#585F71]/80 duration-500 transition ease-in-out'>
                    <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.cancel_trip?.note_cancel_trip ? isStatePolicy?.dataPolicy?.cancel_trip?.note_cancel_trip : ''}` }} />
                </div>

                <div className="flex items-end gap-2">
                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#585F71] group-hover:text-[#585F71]/80 duration-500 transition ease-in-out'>
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund ? isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund : ''}` }} />
                    </div>
                    {
                        isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund ?

                            isVisibleTablet ?
                                (
                                    <div onClick={() => setOpenDialogAnswerPolicy(true, "cancellation_policy")}>
                                        <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                    </div>
                                )
                                :
                                (
                                    <ActionTooltip
                                        side="bottom"
                                        align="center"
                                        label={(
                                            <div className='flex flex-col gap-1 max-w-[240px]'>
                                                <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund ? isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund : ''}` }} />
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                        </div>
                                    </ActionTooltip>
                                )
                            :
                            null
                    }
                </div>
            </div>
        </div >
    )
}

export default Information