'use client'

import ConvertToSlug from '@/components/convertSlug/ConvertToSlug';
import { FormatNumber } from '@/components/format/FormatNumber';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaStar } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti';
import { v4 as uuidv4 } from 'uuid';

const SectionCardCar = () => {
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
            address: 'Quận 3, TP.Hồ Chí Minh, Việt Nam',
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
            address: 'Quận 1, TP.Hồ Chí Minh, Việt Nam',
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
            address: 'Quận 1, TP.Hồ Chí Minh, Việt Nam',
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
            address: 'Quận 1, TP.Hồ Chí Minh, Việt Nam',
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
            address: 'Quận 1, TP.Hồ Chí Minh, Việt Nam',
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
            address: 'Quận 1, TP.Hồ Chí Minh, Việt Nam',
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
            address: 'Quận 1, TP.Hồ Chí Minh, Việt Nam',
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
            address: 'Quận 1, TP.Hồ Chí Minh, Việt Nam',
            promotion: '25%',
            priceBeforePromotion: 322000,
            priceAfterPromotion: 282000,
            point: 5,
            quantityTrips: 30
        },
    ]

    const handleClickFavorite = (e: any) => {
        e.stopPropagation()
        e.preventDefault();
        console.log('check');
    }

    return (
        <div className='bg-[#FCFDFD] 2xl:py-24 py-16'>
            <div className='custom-container flex flex-col justify-center items-center gap-10'>
                <div data-aos='fade-down' className='3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-xl leading-tight capitalize font-bold max-w-[85%] text-[#101010]'>
                    Xe dành cho bạn
                </div>
                <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-8 gap-6 justify-start w-full h-full'>
                    {
                        dataListCardCars && dataListCardCars.map((card, index) => (
                            <Link
                                key={card.id}
                                data-aos='flip-up'
                                data-aos-delay={index * 150}
                                className='col-span-1 bg-white shadow-md w-full p-4 flex flex-col gap-4 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                href="/#"
                                onClick={(e) => { e.stopPropagation() }}
                            >
                                <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-0.5 text-sm font-semibold text-white z-10'>
                                    - {card.promotion}
                                </div>
                                <div className='w-full h-[230px] relative'>
                                    <Image
                                        width={600}
                                        height={600}
                                        alt="image_card"
                                        src={card.image ? card.image : '/default/default.png'}
                                        className='w-full h-full object-cover rounded-xl'
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
                                                <Badge className='bg-[#000000]/50 font-normal cursor-default'>
                                                    Miễn thế chấp
                                                </Badge>
                                                :
                                                null
                                        }
                                        {
                                            card.type.orderFastCar ?
                                                <Badge className='bg-[#000000]/50 font-normal cursor-default'>
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
                                            <Badge className='bg-[#C9DCF9]/35 hover:bg-[#C9DCF9]/50 text-[#3561FF] text-sm font-medium cursor-default'>
                                                Số tự động
                                            </Badge>
                                            :
                                            null
                                    }
                                    {
                                        card.type.doorstepDelivery ?
                                            <Badge className='bg-[#F9ECC9]/35 hover:bg-[#F9ECC9]/50 text-[#FF9900] text-sm font-medium cursor-default'>
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
                                    <TiLocation className='text-xl text-[#FA3434]' />
                                    <div className='3xl:text-base text-sm text-[#8C93A3] font-medium'>
                                        {card.address ? card.address : ''}
                                    </div>
                                </div>
                                <div className='border border-[#D7D9E0]/50' />
                                <div className='flex items-center gap-4'>
                                    <div className='flex items-center gap-1'>
                                        <div className='3xl:text-lg text-base text-[#D7D9E0] font-medium line-through'>
                                            {card.priceBeforePromotion ? FormatNumber(card.priceBeforePromotion) : 0}
                                        </div>
                                        <div className='flex'>
                                            <span className='3xl:text-lg text-base text-[#1AC5CA] font-medium'>
                                                {card.priceAfterPromotion ? FormatNumber(card.priceAfterPromotion) : 0}
                                            </span>
                                            <span className='text-[13px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                /ngày
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-1'>
                                        <FaStar className='text-base text-[#FFC118]' />
                                        <div className='text-sm text-[#484D5C] font-semibold'>
                                            {card.point ? card.point : ''}
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-1'>
                                        <FaCircleCheck className='text-base text-[#3AC996]' />
                                        <div className='text-sm text-[#484D5C] font-semibold'>
                                            {card.quantityTrips ? card.quantityTrips : 0} Chuyến
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default SectionCardCar