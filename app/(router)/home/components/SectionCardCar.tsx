'use client'

import ConvertToSlug from '@/components/convertSlug/ConvertToSlug';
import { FormatNumberHundred, FormatNumberToThousands } from '@/components/format/FormatNumber';
import BlurImage from '@/components/image/BlurImage';
import { Badge } from '@/components/ui/badge';
import { useResize } from '@/hooks/useResize';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaStar } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';
import { A11y, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'

const SectionCardCar = () => {
    const { isVisibleMobile } = useResize()
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
            title: "Mitsubishi xpander 2024",
            address: 'Quận 1, TP.Hồ Chí Minh',
            promotion: '25%',
            priceBeforePromotion: 322000,
            priceAfterPromotion: 282000,
            point: 5,
            quantityTrips: 101
        },
    ]

    const handleClickFavorite = (e: any) => {
        e.stopPropagation()
        e.preventDefault();
    }

    const customPaginationBanner = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<span class=${className}></span>`
        },
    }

    return (
        <div className='bg-[#FCFDFD] 2xl:pb-24 lg:pb-16 md:pt-0 md:pb-8 py-16'>
            <div className='custom-container flex flex-col justify-center items-center md:gap-10 gap-6'>
                <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-[26px] text-[26px] leading-tight capitalize font-bold md:max-w-[85%] max-w-full text-[#101010]'>
                    Xe dành cho bạn
                </div>
                {
                    isVisibleMobile ?
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            modules={[Pagination, A11y]}
                            allowTouchMove={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    allowTouchMove: true
                                },
                                640: {
                                    slidesPerView: 1,
                                    allowTouchMove: true
                                },
                                768: {
                                    slidesPerView: 1,
                                    allowTouchMove: true
                                },
                            }}
                            pagination={customPaginationBanner}
                            className='custom-swiper-intro w-full h-[450px] px-2'
                        >
                            {
                                dataListCardCars && dataListCardCars.map((card, index) => (
                                    <SwiperSlide key={card.id}>
                                        <Link
                                            key={card.id}
                                            className='col-span-1 bg-white shadow-md w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 lg:hover:scale-105 transition duration-200 ease-in-out'
                                            href="#"
                                        >
                                            <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                                - {card.promotion}
                                            </div>
                                            <div className='w-full h-[220px] relative'>
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
                                            <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase'>
                                                {card.title ? card.title : ''}
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                <TiLocation className='text-base text-[#FA3434] w-[16px] max-w-[16px]' />
                                                <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%]'>
                                                    {card.address ? card.address : ''}
                                                </div>
                                            </div>
                                            <div className='border-b     border-[#D7D9E0]/50' />
                                            <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 md:gap-2 gap-4'>
                                                <div className='flex items-center gap-1'>
                                                    <div className='3xl:text-lg md:text-base text-lg text-[#D7D9E0] font-medium line-through'>
                                                        {card.priceBeforePromotion ? FormatNumberToThousands(card.priceBeforePromotion) : 0}
                                                    </div>
                                                    <div className='flex'>
                                                        <span className='3xl:text-lg md:text-base text-lg text-[#1AC5CA] font-medium'>
                                                            {card.priceAfterPromotion ? FormatNumberToThousands(card.priceAfterPromotion) : 0}
                                                        </span>
                                                        <span className='3xl:text-[13px] md:text-[11px] text-xs text-[#585F71] flex justify-start font-semibold capitalize'>
                                                            /ngày
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <FaStar className='3xl:text-base md:text-sm text-base text-[#FFC118]' />
                                                    <div className='3xl:text-sm md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                        {card.point ? card.point : ''}
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <FaCircleCheck className='3xl:text-base md:text-sm text-base text-[#3AC996]' />
                                                    <div className='3xl:text-sm md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                        {card.quantityTrips ? FormatNumberHundred(card.quantityTrips) : 0} Chuyến
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        :
                        <div className='grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-8 gap-6 justify-start w-full h-full'>
                            {
                                dataListCardCars && dataListCardCars.map((card, index) => (
                                    <Link
                                        key={card.id}
                                        className='col-span-1 bg-white shadow-md w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                        href="#"
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
                                        <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase'>
                                            {card.title ? card.title : ''}
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <TiLocation className='text-base text-[#FA3434] w-[16px] max-w-[16px]' />
                                            <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%]'>
                                                {card.address ? card.address : ''}
                                            </div>
                                        </div>
                                        <div className='border-b     border-[#D7D9E0]/50' />
                                        <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg: gap-2'>
                                            <div className='flex items-center gap-1'>
                                                <div className='3xl:text-lg text-base text-[#D7D9E0] font-medium line-through'>
                                                    {card.priceBeforePromotion ? FormatNumberToThousands(card.priceBeforePromotion) : 0}
                                                </div>
                                                <div className='flex'>
                                                    <span className='3xl:text-lg text-base text-[#1AC5CA] font-medium'>
                                                        {card.priceAfterPromotion ? FormatNumberToThousands(card.priceAfterPromotion) : 0}
                                                    </span>
                                                    <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                        /ngày
                                                    </span>
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-1'>
                                                <FaStar className='3xl:text-base text-sm text-[#FFC118]' />
                                                <div className='3xl:text-sm text-xs text-[#484D5C] font-semibold'>
                                                    {card.point ? card.point : ''}
                                                </div>
                                            </div>

                                            <div className='flex items-center gap-1'>
                                                <FaCircleCheck className='3xl:text-base text-sm text-[#3AC996]' />
                                                <div className='3xl:text-sm text-xs text-[#484D5C] font-semibold'>
                                                    {card.quantityTrips ? FormatNumberHundred(card.quantityTrips) : 0} Chuyến
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                }
            </div>
        </div >
    )
}

export default SectionCardCar