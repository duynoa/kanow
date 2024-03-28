import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import moment from "moment";
import StarRatings from 'react-star-ratings';
import { v4 as uuidv4 } from 'uuid'

import { FaRegQuestionCircle, FaStar } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti'

import { useResize } from '@/hooks/useResize'

import Map from '@/components/map/Maps'
import { Badge } from '@/components/ui/badge'
import { FormatNumberHundred, FormatNumberToDecimal } from '@/components/format/FormatNumber'
import { IInitialStateDetailCar } from '@/types/Cars/ICars';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { format, formatDistanceToNow, isYesterday, parseISO } from 'date-fns';
// import { vi } from 'date-fns/locale';
import "moment/locale/vi";
import { vi } from 'date-fns/locale';
import { ActionTooltip } from '@/components/tooltip/ActionTooltip';
import { useDialogAnswerPolicy } from '@/hooks/useOpenDialog';
import { postUpdateFavoriteHeartCar } from '@/services/cars/cars.services';

type Props = {
    isState: IInitialStateDetailCar,
    queryKeyIsState: (key: any) => void,
    params: {
        slug: string
    }
}

const InfomationCar = ({
    isState,
    queryKeyIsState,
    params
}: Props) => {
    const { setOpenDialogAnswerPolicy } = useDialogAnswerPolicy()
    const [expandedItems, setExpandedItems] = useState<boolean>(false);

    const handleToggleExpand = () => {
        setExpandedItems(!expandedItems);
    };

    const { isVisibleMobile, isVisibleTablet } = useResize()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    // Sử dụng useState để theo dõi trạng thái của header thứ hai

    const latitude = 10.796455918645478; // Thay đổi giá trị này bằng vĩ độ thực tế
    const longitude = 106.63445664322627; // Thay đổi giá trị này bằng kinh độ thực tế

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
            content: "Dịch vụ tốt",
            rating: 5
        },
        {
            id: uuidv4(),
            fullName: 'Phạm thị minh phượng',
            createdTime: '2 tuần trước',
            content: "Dịch vụ tốt, nhưng nói hơi nhiều!",
            rating: 4.5
        },
        {
            id: uuidv4(),
            fullName: 'Phạm thị minh phượng',
            createdTime: '2 tuần trước',
            content: "Không chịu chở động vật",
            rating: 4
        },
        {
            id: uuidv4(),
            fullName: 'Phạm thị minh phượng',
            createdTime: '2 tuần trước',
            content: "Dịch vụ tốt 232",
            rating: 5
        },
        {
            id: uuidv4(),
            fullName: 'Phạm thị minh phượng',
            createdTime: '2 tuần trước',
            content: "Dịch vụ tốt",
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

    const handleClickFavorite = async (e: any) => {
        e.stopPropagation()
        e.preventDefault();

        try {
            const dataParams = {
                car_id: params.slug,
                status: 1
            }

            const { data } = await postUpdateFavoriteHeartCar(dataParams)
            if (data.result) {

            } else {

            }

        } catch (err) {
            throw err
        }
    }

    // function formatDate(item: string) {
    //     if (!item) {
    //         return '';
    //     }

    //     const date = parseISO(item)
    //     // const date = item;

    //     console.log('date :', date);


    //     if (isYesterday(date)) {
    //         return `Hôm qua lúc ${format(date, 'HH:mm')}`;
    //     }

    //     return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    // }

    if (!isMounted) {
        return null
    }

    return (
        <div className='flex flex-col gap-6 xxl:w-[70%] xxl:max-w-[70%] lg:w-[65%] lg:max-w-[65%] w-full max-w-full h-full pb-16 lg:order-none order-2'>
            <div className='flex flex-row items-center justify-between 3xl:pb-6 pb-4 border-b-2'>
                <div className='flex flex-col gap-2'>
                    <div className='3xl:text-4xl md:text-3xl text-xl uppercase text-[#09080D] font-bold'>
                        {isState?.dataDetailCar?.name_car ? isState?.dataDetailCar?.name_car : ""}
                    </div>
                    <div className='flex md:flex-row flex-col gap-3 md:items-center items-start'>
                        <div className='flex gap-3 md:items-center items-start'>
                            {
                                isState?.dataDetailCar?.type?.mortgage ?
                                    <Badge className='bg-[#000000]/50 font-normal cursor-default md:text-xs text-[10px] py-1 px-3'>
                                        Miễn thế chấp
                                    </Badge>
                                    :
                                    null
                            }
                            {
                                isState?.dataDetailCar?.type?.book_car_flash ?
                                    <Badge className='bg-[#000000]/50 font-normal cursor-default md:text-xs text-[10px] py-1 px-3'>
                                        Đặt xe nhanh
                                    </Badge>
                                    :
                                    null
                            }
                            {
                                isState?.dataDetailCar?.type?.delivery_car ?
                                    <Badge className='bg-[#F9ECC9]/35 hover:bg-[#F9ECC9]/50 text-[#FF9900] 3xl:text-sm text-xs font-medium cursor-default'>
                                        Giao tận nơi
                                    </Badge>
                                    :
                                    null
                            }
                        </div>

                        <div className='flex gap-3 md:items-center items-start caret-transparent'>
                            {
                                isState?.dataDetailCar?.point_star ?
                                    <div className='flex items-center gap-1'>
                                        <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#FF9900]' />
                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-medium      '>
                                            {isState?.dataDetailCar?.point_star ? (FormatNumberToDecimal(isState?.dataDetailCar?.point_star, 1)) : 0}
                                        </div>
                                    </div>
                                    :
                                    null
                            }

                            {
                                isState?.dataDetailCar?.total_trip ?
                                    <div className='flex items-center gap-1'>
                                        <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#3AC996]' />
                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                            {isState?.dataDetailCar?.total_trip ? FormatNumberHundred(isState?.dataDetailCar?.total_trip, 100) : 0} Chuyến
                                        </div>
                                    </div>
                                    :
                                    <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                        Chưa có chuyến
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div
                    onClick={(event) => handleClickFavorite(event)}
                    className='bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out'
                >
                    <TiHeartFullOutline className={`${isState?.dataDetailCar?.favourite_car ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                </div>
            </div>

            <div id="section-1" className='flex flex-col gap-2 3xl:pb-6 pb-4 border-b-2'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Đặc điểm
                </div>
                <div className='flex flex-row justify-between items-center lg:max-w-[80%] max-w-full'>

                    <div className='flex md:flex-row flex-col items-center gap-4'>
                        <div className='3xl:w-14 3xl:min-w-14 3xl:h-14 w-12 min-w-12 h-12'>
                            <Image
                                src={"/icon/icon_feature1.png"}
                                alt="icon"
                                width={100}
                                height={100}
                                className='3xl:w-14 3xl:h-14 w-12 h-12 object-contain'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='uppercase 3xl:text-sm text-xs text-[#6F7689]'>
                                Truyền động
                            </div>
                            <div className='3xl:text-base text-sm text-[#3E424E] font-semibold text-center'>
                                {isState?.dataDetailCar?.type?.transmission_search ? isState?.dataDetailCar?.type?.transmission_search : ""}
                            </div>
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col items-center gap-4'>
                        <div className='3xl:w-14 3xl:min-w-14 3xl:h-14 w-12 min-w-12 h-12'>
                            <Image
                                src={"/icon/icon_feature2.png"}
                                alt="icon"
                                width={100}
                                height={100}
                                className='3xl:w-14 3xl:h-14 w-12 h-12 object-contain'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='uppercase 3xl:text-sm text-xs text-[#6F7689]'>
                                Số ghế
                            </div>
                            <div className='3xl:text-base text-sm text-[#3E424E] font-semibold text-center'>
                                {isState?.dataDetailCar?.trait_car?.number_seat ? isState?.dataDetailCar?.trait_car?.number_seat : 0}
                            </div>
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col items-center gap-4'>
                        <div className='3xl:w-14 3xl:min-w-14 3xl:h-14 w-12 min-w-12 h-12'>
                            <Image
                                src={"/icon/icon_feature3.png"}
                                alt="icon"
                                width={100}
                                height={100}
                                className='3xl:w-14 3xl:h-14 w-12 h-12 object-contain'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='uppercase 3xl:text-sm text-xs text-[#6F7689]'>
                                Nhiên liệu
                            </div>
                            <div className='3xl:text-base text-sm text-[#3E424E] font-semibold text-center '>
                                {isState?.dataDetailCar?.trait_car?.type_fuel ? isState?.dataDetailCar?.trait_car?.type_fuel : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2 3xl:pb-6 pb-4 border-b-2'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Mô tả
                </div>

                <div className="flex flex-col gap-2 w-full" >
                    {
                        expandedItems ?
                            <>
                                <div className='3xl:text-base text-sm text-[#585F71] group-hover:text-[#585F71]/80 duration-500 transition ease-in-out'>
                                    <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.describe_car ? isState?.dataDetailCar?.describe_car : ''}` }} />
                                </div>
                                <div
                                    onClick={() => handleToggleExpand()}
                                    className='3xl:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out w-fit caret-transparent'
                                >
                                    Ẩn...
                                </div>
                            </>
                            :
                            <>
                                <div className='3xl:text-base text-sm text-[#585F71] group-hover:text-[#585F71]/80 duration-500 transition ease-in-out'>
                                    <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.describe_car ? isState?.dataDetailCar?.describe_car?.slice(0, 500) : ''}` }} />
                                </div>
                                {isState?.dataDetailCar?.describe_car?.length > 500 && (
                                    <div
                                        onClick={() => handleToggleExpand()}
                                        className='3xl:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out w-fit caret-transparent'
                                    >
                                        Xem thêm
                                    </div>
                                )}
                            </>
                    }
                </div>
            </div>

            <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Tiện nghi trên xe
                </div>
                <div className='grid md:grid-cols-4 grid-cols-2 gap-2'>
                    {
                        isState?.dataDetailCar?.other_amenities_car && isState?.dataDetailCar?.other_amenities_car?.map((item) => (
                            <div key={`amenities-car-${item.id}`} className='flex gap-2 items-center w-fit pr-2 py-1 caret-transparent'>
                                <Image
                                    src={item.image}
                                    alt='icon'
                                    width={80}
                                    height={80}
                                    className='3xl:w-6 3xl:min-w-6 3xl:h-6 w-5 min-w-5 h-5 object-contain'
                                />
                                <div className='text-[#585F71] 3xl:text-base text-sm'>{item.name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* api thiếu data */}
            <div id="section-2" className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Chủ xe
                </div>
                <div className='bg-[#F6F6F8] p-4 flex md:flex-row flex-col md:items-center items-start justify-between gap-4 rounded-xl w-full'>
                    <div className='flex items-center gap-4 3xl:max-w-[30%] lg:max-w-[50%] md:max-w-[50%] max-w-full'>
                        <div className='3xl:w-16 3xl:h-16 3xl:min-w-16 w-14 min-w-14 h-14 rounded-full border-[3px] border-[#ffffff] drop-shadow'>
                            <Avatar className='w-full h-full shadow'>
                                <AvatarImage
                                    src={isState?.dataDetailCar?.car_owner?.avatar ? isState?.dataDetailCar?.car_owner?.avatar : '/avatar/avatar_default.png'}
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
                            <div className='uppercase text-[#16171B] font-semibold 3xl:text-base text-sm'>
                                {isState?.dataDetailCar?.car_owner?.fullname ? isState?.dataDetailCar?.car_owner?.fullname : ""}
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-1'>
                                    <FaStar className='3xl:text-base text-sm text-[#FF9900]' />
                                    <div className='3xl:text-sm text-xs text-[#484D5C] font-medium      '>
                                        4.9
                                    </div>
                                </div>

                                <div className='flex items-center gap-1'>
                                    <FaCircleCheck className='3xl:text-base text-sm text-[#3AC996]' />
                                    <div className='3xl:text-sm text-xs text-[#484D5C] font-semibold'>
                                        {FormatNumberHundred(19, 100)} Chuyến
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='3xl:text-base text-sm text-[#6F7689] 3xl:max-w-[70%] lg:max-w-[50%] md:max-w-[50%] max-w-full'>
                        Chủ xe 5 sao có thời gian phản hồi nhanh chóng, tỉ lệ đồng ý cao, mức giá cạnh tranh và dịch vụ nhận được nhiều đánh giá tốt từ khách hàng
                    </div>
                </div>
                <div className='grid grid-cols-3 md:gap-20 gap-4 md:mt-0 mt-2'>
                    <div className='col-span-1 flex flex-col items-center gap-1'>
                        <div className='3xl:text-base text-sm text-[#6F7689]'>
                            Tỉ lệ phản hồi
                        </div>
                        <div className='3xl:text-lg text-sm text-[#000000] font-semibold'>
                            100%
                        </div>
                    </div>
                    <div className='col-span-1 flex flex-col items-center gap-1'>
                        <div className='3xl:text-base text-sm text-[#6F7689]'>
                            Tỉ lệ đồng ý
                        </div>
                        <div className='3xl:text-lg text-sm text-[#000000] font-semibold'>
                            100%
                        </div>
                    </div>
                    <div className='col-span-1 flex flex-col items-center gap-1'>
                        <div className='3xl:text-base text-sm text-[#6F7689]'>
                            Phản hồi trong
                        </div>
                        <div className='3xl:text-lg text-sm text-[#000000] font-semibold'>
                            5 phút
                        </div>
                    </div>
                </div>
            </div>

            {/* chưa có toạ độ google maps */}
            <div id="section-3" className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Vị trí xe
                </div>
                <div className='flex gap-1 items-center'>
                    <TiLocation className='text-base text-[#FA3434] w-[16px] max-w-[16px]' />
                    <div className='3xl:text-base text-sm text-[#8C93A3] font-medium max-w-full'>
                        Quận Hồ Tây, Hà Nội, Việt Nam
                    </div>
                </div>
                <div className='w-full h-full'>
                    <Map latitude={latitude} longitude={longitude} data={dataMaps} />
                </div>
            </div>

            <div className='flex flex-col gap-4 3xl:pb-6 pb-4 border-b-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col gap-1'>
                        <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                            Đánh giá
                        </div>
                        <div className='flex items-center gap-2'>
                            {
                                isVisibleMobile ?
                                    <StarRatings
                                        rating={isState?.dataDetailCar?.info_review_car?.star ? isState?.dataDetailCar?.info_review_car?.star : 0}
                                        starRatedColor="#FCC43E"
                                        starHoverColor='#FCC43E'
                                        starDimension='16px'
                                        starSpacing='0px'
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                    :
                                    <StarRatings
                                        rating={isState?.dataDetailCar?.info_review_car?.star ? isState?.dataDetailCar?.info_review_car?.star : 0}
                                        starRatedColor="#FCC43E"
                                        starHoverColor='#FCC43E'
                                        starDimension='16px'
                                        starSpacing='2px'
                                        numberOfStars={5}
                                        name='rating'
                                    />
                            }
                            <div className='3xl:text-base text-sm text-[#FF9900] font-semibold'>
                                {isState?.dataDetailCar?.info_review_car?.star ? (FormatNumberToDecimal(isState?.dataDetailCar?.info_review_car?.star, 1)) : 0}/5
                            </div>
                            {
                                isState?.dataDetailCar?.info_review_car?.total_review_car !== 0 ?
                                    <div className='3xl:text-base text-sm text-[#6F7689]'>
                                        ({isState?.dataDetailCar?.info_review_car?.total_review_car ? isState?.dataDetailCar?.info_review_car?.total_review_car : 0} đánh giá)
                                    </div>
                                    :
                                    <div className='3xl:text-base text-sm text-[#6F7689]'>
                                        Chưa có đánh giá
                                    </div>
                            }
                        </div>
                    </div>
                    {
                        isState?.dataDetailCar?.info_review_car?.review_car?.length > 5 &&
                        <div className='3xl:text-lg md:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out'>
                            Xem tất cả
                        </div>
                    }
                </div>
                {
                    isState?.dataDetailCar?.info_review_car?.review_car && isState?.dataDetailCar?.info_review_car?.review_car?.slice(0, 5)?.map((item, index) => (
                        <div key={item.id} className={`${index !== isState?.dataDetailCar?.info_review_car?.review_car?.length - 1 ? "border-b pb-3" : ""} flex flex-col`}>
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
                                    <div className='capitalize 3xl:text-base text-sm text-[#484D5C] font-semibold'>
                                        {item.customer_name ? item.customer_name : ''}
                                    </div>
                                    <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                        {
                                            moment().subtract(1, "days").isSame(moment(item?.date, "DD/MM/YYYY"), "day")
                                                ? `Hôm qua lúc ${moment(item?.date).format("HH:mm")}`
                                                : moment(item?.date).fromNow()
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='3xl:text-base text-sm text-[#585F71] mt-2'>
                                {item.content ? item.content : ''}
                            </div>
                            <div className='flex items-center'>
                                {
                                    isVisibleMobile ?
                                        <StarRatings
                                            rating={item.star ? item.star : 0}
                                            starRatedColor="#FCC43E"
                                            starHoverColor='#FCC43E'
                                            starDimension='14px'
                                            starSpacing='0px'
                                            numberOfStars={5}
                                            name='rating'
                                        />
                                        :
                                        <StarRatings
                                            rating={item.star ? item.star : 0}
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

            <div id="section-4" className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
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
                                    <div className='flex flex-col gap-1 text-center justify-center max-w-[240px]'>
                                        <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.policy?.car_rental_policy ? isState?.dataDetailCar?.policy?.car_rental_policy : ''}` }} />
                                    </div>
                                )}
                            >
                                <div>
                                    <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                </div>
                            </ActionTooltip>
                    }

                </div>
                <div className='3xl:text-base text-sm text-[#484D5C] 3xl:mb-0 mb-3'>
                    Vui lòng chuẩn bị 2 loại giấy tờ:
                </div>
                <div className='flex flex-col w-full gap-4'>
                    <div className='flex flex-row items-center w-full gap-8'>
                        <div className='w-8 min-w-8 h-8 flex items-center justify-center text-base rounded-full font-bold bg-[#14868E] text-white'>
                            1
                        </div>
                        <div className='w-full p-4 border-2 rounded-2xl flex items-center gap-6'>
                            <div className='w-[140px] max-w-[140px] h-auto'>
                                <Image
                                    src="/other/info/driverLicense.png"
                                    alt="driver_license"
                                    width={600}
                                    height={600}
                                    className='w-full h-auto object-contain'
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <div className='3xl:text-base text-sm text-[#3561FF] font-semibold'>
                                    Giấy phép lái xe
                                </div>
                                <div className='3xl:text-base text-sm text-[#585F71]'>
                                    Chủ xe đối chiếu và gửi lại bạn
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-8'>
                        <div className='w-8 min-w-8 h-8 flex items-center justify-center text-base rounded-full font-bold bg-[#14868E] text-white'>
                            2
                        </div>
                        <div className='w-full p-4 border-2 rounded-2xl flex flex-col gap-2'>
                            <div className='flex items-center gap-6'>
                                <div className='w-[140px] max-w-[140px] h-auto'>
                                    <Image
                                        src="/other/info/citizenCard.png"
                                        alt="citizen_card"
                                        width={600}
                                        height={600}
                                        className='w-full h-auto object-contain'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-1'>
                                    <div className='3xl:text-base text-sm text-[#3561FF] font-semibold'>
                                        CCCD có gắn chip
                                    </div>
                                    <div className='3xl:text-base text-sm text-[#585F71]'>
                                        Chủ xe đối chiếu và gửi lại bạn
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-6'>
                                <div className='uppercase text-[#FF9900] 3xl:text-base text-sm font-semibold'>
                                    Hoặc
                                </div>
                                <div className='border-b w-full' />
                            </div>
                            <div className='flex items-center gap-6'>
                                <div className='w-[140px] max-w-[140px] h-auto'>
                                    <Image
                                        src="/other/info/passport.png"
                                        alt="passport"
                                        width={600}
                                        height={600}
                                        className='w-full h-auto object-contain'
                                    />
                                </div>
                                <div className='w-full flex flex-col gap-1'>
                                    <div className='3xl:text-base text-sm text-[#3561FF] font-semibold'>
                                        Hộ chiếu
                                    </div>
                                    <div className='3xl:text-base text-sm text-[#585F71]'>
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
                                    <div className='flex flex-col gap-1 text-center justify-center max-w-[240px]'>
                                        <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.policy?.car_collateral_policy ? isState?.dataDetailCar?.policy?.car_collateral_policy : ''}` }} />
                                    </div>
                                )}
                            >
                                <div>
                                    <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                </div>
                            </ActionTooltip>
                    }
                </div>
                <div className='3xl:text-base text-sm text-[#585F71]'>
                    {isState?.dataDetailCar?.collateral_car?.note_mortgage ? isState?.dataDetailCar?.collateral_car?.note_mortgage : ""}
                </div>
            </div>

            <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Phụ phí có thể phát sinh
                </div>
                <div className='flex flex-col gap-4'>
                    {
                        isState?.dataDetailCar?.surcharge_car && isState?.dataDetailCar?.surcharge_car?.map((item) => (
                            <div key={`id-${item.id}`} className='flex items-center justify-between gap-2 p-6 bg-[#F6F6F8] rounded-xl'>
                                <div className='w-[70%] max-w-[70%] flex flex-col gap-1'>
                                    <div className='3xl:text-base text-sm text-[#16171B] font-semibold'>
                                        {item.name ? item.name : ""}
                                    </div>
                                    <div className='3xl:text-base text-sm text-[#585F71]'>
                                        {item.note ? item.note : ""}
                                    </div>
                                </div>
                                <div className='3xl:text-base text-sm w-[20%] max-w-[20%] flex justify-end text-[#FA3434] font-medium'>
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
                <div className='3xl:text-base text-sm text-[#585F71]'>
                    {isState?.dataDetailCar?.cancel_trip?.title_cancel_trip ? isState?.dataDetailCar?.cancel_trip?.title_cancel_trip : ""}
                </div>

                {
                    isState?.dataDetailCar?.cancel_trip?.policy_cancel_trip?.length > 0 ?
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
                                isState?.dataDetailCar?.cancel_trip?.policy_cancel_trip && isState?.dataDetailCar?.cancel_trip?.policy_cancel_trip?.map((item, index) => (
                                    <div key={`cancel-${item.id}`} className={`${isState?.dataDetailCar?.cancel_trip?.policy_cancel_trip.length - 1 == index ? "border-b" : ""} row-span-1 grid grid-cols-3`}>
                                        <div className="col-span-1 p-4 border border-b-0 border-r-0">
                                            <div className='3xl:text-base text-sm font-medium'>
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
                    <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.cancel_trip?.note_cancel_trip ? isState?.dataDetailCar?.cancel_trip?.note_cancel_trip : ''}` }} />
                </div>

                <div className="flex items-end gap-2">
                    <div className='3xl:text-base text-sm text-[#585F71] group-hover:text-[#585F71]/80 duration-500 transition ease-in-out'>
                        <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.cancel_trip?.compensation_refund ? isState?.dataDetailCar?.cancel_trip?.compensation_refund : ''}` }} />
                    </div>
                    {
                        isState?.dataDetailCar?.cancel_trip?.compensation_refund ?

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
                                            <div className='flex flex-col gap-1 text-center justify-center max-w-[240px]'>
                                                <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.cancel_trip?.compensation_refund ? isState?.dataDetailCar?.cancel_trip?.compensation_refund : ''}` }} />
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
                {/* <div className='3xl:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out w-fit'>
                    Xem thêm
                </div> */}
            </div>
        </div >
    )
}

export default InfomationCar