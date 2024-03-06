'use client'

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import BlurImage from '@/components/image/BlurImage';
import { DatePickerWithRange } from '@/components/datePicker/DatePickerWithRange';
import { FormatNumberHundred, FormatNumberToThousands } from '@/components/format/FormatNumber';

import { FaStar } from 'react-icons/fa';
import { LuSettings2 } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { FaCircleCheck } from 'react-icons/fa6';
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import ConvertToSlug from '@/components/convertSlug/ConvertToSlug';
import { useResize } from '@/hooks/useResize';
import { DatePickerWithRangeAndTime } from '@/components/datePicker/DatePickerWithRangeAndTime';

type Props = {}

const SearchCars = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const { isVisibleMobile } = useResize()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const listFilter = [
        {
            id: uuidv4(),
            name: "Bộ lọc"
        },
        {
            id: uuidv4(),
            name: "Hãng xe"
        },
        {
            id: uuidv4(),
            name: "Loại xe"
        },
        {
            id: uuidv4(),
            name: "Chủ xe 5 sao"
        },
        {
            id: uuidv4(),
            name: "Đặt xe nhanh"
        },
        {
            id: uuidv4(),
            name: "Giao xe tận nơi"
        },
        {
            id: uuidv4(),
            name: "Giảm giá"
        },
        {
            id: uuidv4(),
            name: "Miễn thế chấp"
        },
        {
            id: uuidv4(),
            name: "Xe điện"
        },
    ]

    const dataListCardCars = [
        {
            id: uuidv4(),
            image: '/card/card_car1.png',
            favorite: false,
            type: {
                orderFastCar: true,
                mortgageFree: true,
                automaticNumber: true,
                doorstepDelivery: true,
            },
            avatar: "/avatar/avatar1.png",
            title: "Mitsubishi xpander 2023",
            address: 'Quận Phú Nhuận, TP.Hồ Chí Minh',
            promotion: '25%',
            priceBeforePromotion: 392000,
            priceAfterPromotion: 292000,
            point: 4.9,
            quantityTrips: 19
        },
        {
            id: uuidv4(),
            image: '/card/card_car2.png',
            favorite: true,
            type: {
                orderFastCar: true,
                mortgageFree: true,
                automaticNumber: true,
                doorstepDelivery: true,
            },
            avatar: "/avatar/avatar2.png",
            title: "Mitsubishi xpander 2024",
            address: 'Quận 1, TP.Hồ Chí Minh',
            promotion: '25%',
            priceBeforePromotion: 322000,
            priceAfterPromotion: 282000,
            point: 5,
            quantityTrips: 30
        },
        {
            id: uuidv4(),
            image: '/card/card_car2.png',
            favorite: true,
            type: {
                orderFastCar: true,
                mortgageFree: true,
                automaticNumber: true,
                doorstepDelivery: true,
            },
            avatar: "/avatar/avatar3.png",
            title: "Mitsubishi xpander 2024",
            address: 'Quận 1, TP.Hồ Chí Minh',
            promotion: '25%',
            priceBeforePromotion: 322000,
            priceAfterPromotion: 282000,
            point: 5,
            quantityTrips: 30
        },
        {
            id: uuidv4(),
            image: '/card/card_car2.png',
            favorite: true,
            type: {
                orderFastCar: true,
                mortgageFree: true,
                automaticNumber: true,
                doorstepDelivery: true,
            },
            avatar: "/avatar/avatar4.png",
            title: "Mitsubishi xpander 2024",
            address: 'Quận 1, TP.Hồ Chí Minh',
            promotion: '25%',
            priceBeforePromotion: 322000,
            priceAfterPromotion: 282000,
            point: 5,
            quantityTrips: 30
        },
        {
            id: uuidv4(),
            image: '/card/card_car2.png',
            favorite: true,
            type: {
                orderFastCar: true,
                mortgageFree: true,
                automaticNumber: true,
                doorstepDelivery: true,
            },
            avatar: "/avatar/avatar2.png",
            title: "Mitsubishi xpander 2024",
            address: 'Quận 1, TP.Hồ Chí Minh',
            promotion: '25%',
            priceBeforePromotion: 322000,
            priceAfterPromotion: 282000,
            point: 5,
            quantityTrips: 30
        },
        {
            id: uuidv4(),
            image: '/card/card_car2.png',
            favorite: true,
            type: {
                orderFastCar: true,
                mortgageFree: true,
                automaticNumber: true,
                doorstepDelivery: true,
            },
            avatar: "/avatar/avatar3.png",
            title: "Mitsubishi xpander 2024",
            address: 'Quận 1, TP.Hồ Chí Minh',
            promotion: '25%',
            priceBeforePromotion: 322000,
            priceAfterPromotion: 282000,
            point: 5,
            quantityTrips: 30
        },
        {
            id: uuidv4(),
            image: '/card/card_car2.png',
            favorite: true,
            type: {
                orderFastCar: true,
                mortgageFree: true,
                automaticNumber: true,
                doorstepDelivery: true,
            },
            avatar: "/avatar/avatar1.png",
            title: "Mitsubishi xpander 2024",
            address: 'Quận 1, TP.Hồ Chí Minh',
            promotion: '25%',
            priceBeforePromotion: 322000,
            priceAfterPromotion: 282000,
            point: 5,
            quantityTrips: 30
        },
        {
            id: uuidv4(),
            image: '/card/card_car2.png',
            favorite: true,
            type: {
                orderFastCar: true,
                mortgageFree: true,
                automaticNumber: true,
                doorstepDelivery: true,
            },
            avatar: "/avatar/avatar4.png",
            title: "Mitsubishi xpander 2024",
            address: 'Quận 1, TP.Hồ Chí Minh',
            promotion: '25%',
            priceBeforePromotion: 322000,
            priceAfterPromotion: 282000,
            point: 5,
            quantityTrips: 101
        },
    ]

    const swiperRef = useRef<any>(null);
    // slider filter
    const [sliderStart, setSliderStart] = useState<boolean>(true)
    const [sliderEnd, setSliderEnd] = useState<boolean>(false)

    const handlePrev = (e: any, type: string) => {
        if (swiperRef.current && !sliderStart && type === 'filter') {
            swiperRef?.current?.slidePrev();
            setSliderStart(swiperRef.current.isBeginning)
            setSliderEnd(swiperRef.current.isEnd)
        }
    };

    const handleNext = (e: any, type: string) => {
        if (swiperRef.current && !sliderEnd && type === 'filter') {
            swiperRef?.current?.slideNext();
            setSliderStart(swiperRef.current.isBeginning)
            setSliderEnd(swiperRef.current.isEnd)
        }
    };

    const handleClickFavorite = (e: any) => {
        e.stopPropagation()
        e.preventDefault();
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className='custom-container flex lg:flex-row flex-col lg:gap-16 gap-6 items-center lg:justify-start justify-center pt-1'>
                <div className='xl:w-[30%] xl:max-w-[30%] lg:w-[25%] lg:max-w-[25%] w-full max-w-full lg:text-start text-center 3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-[26px] text-[26px] capitalize font-bold text-[#101010]'>
                    Thuê xe tự lái
                </div>
                {
                    isVisibleMobile ?
                        null
                        :
                        <div className='flex gap-4 xl:w-[70%] xl:max-w-[70%] w-[75%] max-w-[75%]'>
                            <div className="relative w-full">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                    <TiLocation className="3xl:text-2xl text-xl text-[#1EAAB1]" />
                                </span>
                                <Input
                                    id="place"
                                    type='text'
                                    placeholder='Nhập địa điểm'
                                    className='3xl:py-4 p-3 pl-12 text-[#16171B] rounded-xl bg-[#F6F6F8]/70 border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#B4B8C5] placeholder:font-medium' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                />
                            </div>
                            <DatePickerWithRangeAndTime className='w-full' classNameButton="px-4 py-3" />
                            <div>
                                <Button className={cn('3xl:p-4 p-3 bg-[#FF9900] hover:bg-[#FF9900]/80 hover:scale-105 rounded-xl text-white duration-200 transiton-colors ease-in-out')}>
                                    <RiSearchLine className='3xl:text-2xl text-xl' />
                                </Button>
                            </div>
                        </div>
                }
            </div>
            <div className='py-4 border-t border-b  w-full'>
                <div className='custom-container'>
                    {/* <div className='p-3 bg-[#F3F3F6] rounded-lg cursor-pointer text-[#06282D] hover:scale-105 hover:bg-[#F3F3F6]/80 duration-200 transition-colors'>
                        <LuSettings2 className='text-2xl' />
                    </div>
                    {
                        listFilter && listFilter.map((item) => (
                            <div key={item.id} className='py-3 px-4 bg-[#F3F3F6] rounded-lg cursor-pointer text-[#06282D] font-medium caret-transparent hover:scale-105 hover:bg-[#F3F3F6]/80 duration-200 transition-colors'>
                                {item.name ? item.name : ''}
                            </div>
                        ))
                    } */}

                    <div className='flex items-center justify-center w-full relative'>
                        <Swiper
                            slidesPerView={"auto"}
                            spaceBetween={0}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            loop={false}
                            allowTouchMove={true}
                            className='flex gap-3 w-fit px-2'
                        >
                            <SwiperSlide className='py-3 px-4 w-fit h-fit bg-[#F3F3F6] rounded-lg cursor-pointer text-[#06282D] hover:scale-105 hover:bg-[#F3F3F6]/80 duration-200 transition-colors'>
                                <LuSettings2 className='3xl:text-2xl text-xl' />
                            </SwiperSlide>
                            {
                                listFilter && listFilter.map((item) => (
                                    <SwiperSlide key={item.id} className='3xl:text-base text-sm mx-2 py-3 px-4 w-fit bg-[#F3F3F6] rounded-lg cursor-pointer text-[#06282D] font-medium caret-transparent hover:scale-105 hover:bg-[#F3F3F6]/80 duration-200 transition-colors'>
                                        {item.name ? item.name : ''}
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        {/* <div className='flex gap-2 absolute 3xl:-top-24 xl:top-[-22%] lg:top-[-22%] md:top-[-22%] top-[-18%] right-0 disable-selection'>
                            <TiArrowLeft
                                onClick={(e) => handlePrev(e, 'filter')}
                                className={`${sliderStart ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                            />
                            <TiArrowRight
                                onClick={(e) => handleNext(e, 'filter')}
                                className={`${sliderEnd ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                            />
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='pb-20 border-b'>
                <div className='custom-container grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-6 gap-4 justify-start h-full'>
                    {
                        dataListCardCars && dataListCardCars.map((card) => (
                            <Link
                                key={card.id}
                                className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                href={`/detail-car/${card.id}?${ConvertToSlug(card?.title)}`}
                            >
                                <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                    - {card.promotion}
                                </div>
                                <div className='w-full 3xl:h-[230px] xxl:h-[200px] xl:h-[200px] h-[180px] relative'>
                                    {/* <Image
                                        width={600}
                                        height={600}
                                        alt="image_card"
                                        src={card.image ? card.image : '/default/default.png'}
                                        className='w-full h-full object-cover rounded-xl'
                                    /> */}
                                    <BlurImage
                                        image={card.image ? card.image : '/default/default.png'}
                                        alt="image_card"
                                        width={600}
                                        height={600}
                                        className='rounded-xl'
                                    />
                                    <div
                                        onClick={handleClickFavorite}
                                        className='absolute right-2 top-2 bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out z-20'
                                    >
                                        <TiHeartFullOutline className={`${card.favorite ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                                    </div>
                                    <div className='flex gap-2 absolute bottom-[10px] left-[10px]'>
                                        {
                                            card.type.mortgageFree ?
                                                <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                    Miễn thế chấp
                                                </Badge>
                                                :
                                                null
                                        }
                                        {
                                            card.type.orderFastCar ?
                                                <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                    Đặt xe nhanh
                                                </Badge>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 mt-2'>
                                    {
                                        card.type.automaticNumber ?
                                            <Badge className='bg-[#C9DCF9]/35 hover:bg-[#C9DCF9]/50 text-[#3561FF] 3xl:text-sm text-xs font-medium cursor-default'>
                                                Số tự động
                                            </Badge>
                                            :
                                            null
                                    }
                                    {
                                        card.type.doorstepDelivery ?
                                            <Badge className='bg-[#F9ECC9]/35 hover:bg-[#F9ECC9]/50 text-[#FF9900] 3xl:text-sm text-xs font-medium cursor-default'>
                                                Giao tận nơi
                                            </Badge>
                                            :
                                            null
                                    }
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <div className='3xl:w-12 3xl:max-w-12 3xl:h-12 w-10 max-w-10 h-10 '>
                                        <Avatar className='w-full h-full shadow'>
                                            <AvatarImage
                                                src={card.avatar ? card.avatar : '/default/default.png'}
                                                alt="@kanow"
                                            />
                                            <AvatarFallback >
                                                KN
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className='flex flex-col gap-1 w-[80%] max-w-[80%]'>
                                        <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase line-clamp-1'>
                                            {card.title ? card.title : ''}
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <TiLocation className='text-base text-[#FA3434] w-[16px] max-w-[16px]' />
                                            <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%] line-clamp-1'>
                                                {card.address ? card.address : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='border-b border-[#D7D9E0]/50' />
                                <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2 bg-[#F2FCF7] p-2 rounded-lg'>
                                    <div className='flex items-center gap-1'>
                                        <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#FFC118]' />
                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                            {card.point ? card.point : ''}
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-1'>
                                        <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#3AC996]' />
                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                            {card.quantityTrips ? FormatNumberHundred(card.quantityTrips) : 0} Chuyến
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-1'>
                                        <div className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#D7D9E0] font-medium line-through'>
                                            {card.priceBeforePromotion ? FormatNumberToThousands(card.priceBeforePromotion) : 0}
                                        </div>
                                        <div className='flex'>
                                            <span className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#1AC5CA] font-medium'>
                                                {card.priceAfterPromotion ? FormatNumberToThousands(card.priceAfterPromotion) : 0}
                                            </span>
                                            <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                /ngày
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchCars