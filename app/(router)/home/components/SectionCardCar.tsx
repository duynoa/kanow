'use client'

import ConvertToSlug from '@/components/convertSlug/ConvertToSlug';
import { FormatNumberHundred, FormatNumberToDecimal, FormatNumberToThousands } from '@/components/format/FormatNumber';
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
import { useDataHome } from '@/hooks/useDataQueryKey';
import { useCookie } from '@/hooks/useCookie';
import { postUpdateFavoriteHeartCar } from '@/services/cars/cars.services';
import { useDialogLogin } from '@/hooks/useOpenDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SkeletonListCar from '@/components/skeleton/SkeletonListCar';

const SectionCardCar = () => {
    const { isVisibleMobile } = useResize()
    const { isStateDataHome, queryKeyIsStateDataHome } = useDataHome()
    const { getCookie } = useCookie()
    const { setOpenDialogLogin } = useDialogLogin()

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

    const handleClickFavorite = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, car_id?: number | string, index?: number) => {
        e.stopPropagation()
        e.preventDefault();

        if (car_id && index !== undefined) {
            // xử lí sự kiện thả tim trong mảng
            try {
                const dataParams = {
                    car_id: car_id,
                    status: isStateDataHome?.listCardCarsForYou[index]?.favorite_car ? 0 : 1
                }

                const { data } = await postUpdateFavoriteHeartCar(dataParams)

                if (data.result && getCookie !== "kanow" && getCookie !== undefined) {
                    let newDataTest = isStateDataHome?.listCardCarsForYou.map((item: any) => {
                        if (item.id === car_id) {
                            return {
                                ...item,
                                favorite_car: !item.favorite_car
                            }
                        } else {
                            return item
                        }
                    })

                    queryKeyIsStateDataHome({
                        listCardCarsForYou: newDataTest
                    })
                } else {
                    setOpenDialogLogin(true)
                }
            } catch (err) {
                throw err
            }
        }
    };

    const customPaginationBanner = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<span class=${className}></span>`
        },
    }

    return (
        <div className='bg-[#FCFDFD] 2xl:pb-24 lg:pb-16 md:pt-0 md:pb-8 py-16'>
            <div className='custom-container flex flex-col justify-center items-center md:gap-10 gap-6'>
                <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl text-[26px] leading-tight capitalize font-bold md:max-w-[85%] max-w-full text-[#101010]'>
                    Xe dành cho bạn
                </div>

                <div className='grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-6 gap-4 justify-start h-full w-full'>
                    {
                        isStateDataHome.loading.isLoadingListCars ?
                            <>
                                {[...Array(8)].map((_, index) => (
                                    <React.Fragment key={`index-${index}`}>
                                        <SkeletonListCar />
                                    </React.Fragment>
                                ))}
                            </>
                            :
                            (
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
                                        className='custom-swiper-intro w-full h-[450px] px-1'
                                    >
                                        {
                                            isStateDataHome?.listCardCarsForYou && isStateDataHome?.listCardCarsForYou?.slice(0, 8)?.map((card, index) => (
                                                <SwiperSlide key={card.id}>
                                                    <Link
                                                        id={`card-${card.id}`}
                                                        key={card.id}
                                                        className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                                        href={`/detail-car/${card.id}?type=1&${ConvertToSlug(card?.name_car)}`}
                                                        prefetch={false}
                                                    >
                                                        {
                                                            card?.promotion?.length > 0 ?
                                                                <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                                                    Giảm {card?.promotion[0]?.percent}% - {card?.promotion[0]?.name ? card?.promotion[0]?.name : ""}
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                        <div className='w-full 3xl:h-[230px] xxl:h-[200px] xl:h-[180px] h-[180px] relative'>
                                                            <Image
                                                                width={400}
                                                                height={300}
                                                                alt="image_card"
                                                                src={card?.image_car?.length > 0 ? card?.image_car[0]?.name : '/default/default.png'}
                                                                className='w-full h-full object-cover rounded-xl'
                                                            />
                                                            <div
                                                                onClick={(event) => handleClickFavorite(event, card.id, index)}
                                                                className='absolute right-2 top-2 bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out z-20'
                                                            >
                                                                <TiHeartFullOutline className={`${card.favorite_car ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                                                            </div>
                                                            <div className='flex gap-2 absolute bottom-[10px] left-[10px]'>
                                                                {
                                                                    card?.type?.mortgage ?
                                                                        <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                            Miễn thế chấp
                                                                        </Badge>
                                                                        :
                                                                        null
                                                                }
                                                                {
                                                                    card?.type?.book_car_flash ?
                                                                        <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                            Đặt xe nhanh
                                                                        </Badge>
                                                                        :
                                                                        null
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className={`flex items-center ${card?.location?.distance ? 'justify-between' : 'justify-start'} gap-2 mt-2`}>
                                                            <div className='flex items-center gap-2'>
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
                                                            {card?.location?.distance &&
                                                                <div className='text-[#1AC5CA] text-xs font-semibold'>~ {card?.location?.distance} km</div>
                                                            }

                                                        </div>
                                                        <div className='flex gap-3 items-center'>
                                                            <div className='3xl:w-12 3xl:max-w-12 3xl:h-12 w-10 max-w-10 h-10 '>
                                                                <Avatar className='w-full h-full shadow'>
                                                                    <AvatarImage
                                                                        src={card?.customer?.avatar ? card?.customer?.avatar : '/avatar/avatar_default.png'}
                                                                        alt="@kanow"
                                                                    />
                                                                    <AvatarFallback >
                                                                        <Image
                                                                            width={100}
                                                                            height={100}
                                                                            src='/avatar/avatar_default.png'
                                                                            alt="@kanow"
                                                                            className='w-full h-full'
                                                                        />
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            </div>
                                                            <div className='flex flex-col gap-1 w-[80%] max-w-[80%]'>
                                                                <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase line-clamp-1'>
                                                                    {card.name_car ? card.name_car : ''}
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
                                                        <div className='flex items-center justify-between 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2 bg-[#F2FCF7] p-2 rounded-lg'>
                                                            <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2'>
                                                                {
                                                                    card.point_star ?
                                                                        <div className='flex items-center gap-1'>
                                                                            <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#FFC118]' />
                                                                            <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                                {card.point_star ? (FormatNumberToDecimal(card.point_star, 1)) : 0}
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        null
                                                                }

                                                                {
                                                                    card.total_trip ?
                                                                        <div className='flex items-center gap-1'>
                                                                            <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#3AC996]' />
                                                                            <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                                {card.total_trip ? FormatNumberHundred(card.total_trip, 100) : 0} Chuyến
                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                                            Chưa có chuyến
                                                                        </div>
                                                                }
                                                            </div>

                                                            <div className='flex items-center gap-1'>
                                                                {
                                                                    card?.promotion?.length > 0 ?
                                                                        <>
                                                                            <div className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#D7D9E0] font-medium line-through'>
                                                                                {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                            </div>
                                                                            <div className='flex'>
                                                                                <span className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#1AC5CA] font-medium'>
                                                                                    {card.price_after_promotion ? FormatNumberToThousands(card.price_after_promotion) : 0}
                                                                                </span>
                                                                                <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                                    /ngày
                                                                                </span>
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <div className='flex'>
                                                                            <span className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#1AC5CA] font-medium'>
                                                                                {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                            </span>
                                                                            <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                                /ngày
                                                                            </span>
                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                    :
                                    isStateDataHome?.listCardCarsForYou && isStateDataHome?.listCardCarsForYou?.slice(0, 8)?.map((card: any, index: number) => (
                                        <Link
                                            id={`card-${card.id}`}
                                            key={card.id}
                                            className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                            href={`/detail-car/${card.id}?type=1&${ConvertToSlug(card?.name_car)}`}
                                            prefetch={false}
                                        >
                                            {
                                                card?.promotion?.length > 0 ?
                                                    <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                                        Giảm {card?.promotion[0]?.percent}% - {card?.promotion[0]?.name ? card?.promotion[0]?.name : ""}
                                                    </div>
                                                    :
                                                    null
                                            }
                                            <div className='w-full 3xl:h-[230px] xxl:h-[200px] xl:h-[180px] h-[180px] relative'>
                                                <Image
                                                    width={400}
                                                    height={300}
                                                    alt="image_card"
                                                    src={card?.image_car?.length > 0 ? card?.image_car[0]?.name : '/default/default.png'}
                                                    className='w-full h-full object-cover rounded-xl'
                                                />
                                                <div
                                                    onClick={(event) => handleClickFavorite(event, card.id, index)}
                                                    className='absolute right-2 top-2 bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out z-20'
                                                >
                                                    <TiHeartFullOutline className={`${card.favorite_car ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                                                </div>
                                                <div className='flex gap-2 absolute bottom-[10px] left-[10px]'>
                                                    {
                                                        card?.type?.mortgage ?
                                                            <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                Miễn thế chấp
                                                            </Badge>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        card?.type?.book_car_flash ?
                                                            <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                Đặt xe nhanh
                                                            </Badge>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                            <div className={`flex items-center ${card?.location?.distance ? 'justify-between' : 'justify-start'} gap-2 mt-2`}>
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
                                                {card?.location?.distance &&
                                                    <div className='text-[#1AC5CA] text-xs font-semibold'>~ {card?.location?.distance} km</div>
                                                }

                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <div className='3xl:w-12 3xl:max-w-12 3xl:h-12 w-10 max-w-10 h-10 '>
                                                    <Avatar className='w-full h-full shadow'>
                                                        <AvatarImage
                                                            src={card?.customer?.avatar ? card?.customer?.avatar : '/avatar/avatar_default.png'}
                                                            alt="@kanow"
                                                        />
                                                        <AvatarFallback >
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                src='/avatar/avatar_default.png'
                                                                alt="@kanow"
                                                                className='w-full h-full'
                                                            />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className='flex flex-col gap-1 w-[80%] max-w-[80%]'>
                                                    <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase line-clamp-1'>
                                                        {card.name_car ? card.name_car : ''}
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
                                            <div className='flex items-center justify-between 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2 bg-[#F2FCF7] p-2 rounded-lg'>
                                                <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2'>
                                                    {
                                                        card.point_star ?
                                                            <div className='flex items-center gap-1'>
                                                                <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#FFC118]' />
                                                                <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                    {card.point_star ? (FormatNumberToDecimal(card.point_star, 1)) : 0}
                                                                </div>
                                                            </div>
                                                            :
                                                            null
                                                    }

                                                    {
                                                        card.total_trip ?
                                                            <div className='flex items-center gap-1'>
                                                                <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#3AC996]' />
                                                                <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                    {card.total_trip ? FormatNumberHundred(card.total_trip, 100) : 0} Chuyến
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                                Chưa có chuyến
                                                            </div>
                                                    }
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    {
                                                        card?.promotion?.length > 0 ?
                                                            <>
                                                                <div className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#D7D9E0] font-medium line-through'>
                                                                    {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                </div>
                                                                <div className='flex'>
                                                                    <span className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#1AC5CA] font-medium'>
                                                                        {card.price_after_promotion ? FormatNumberToThousands(card.price_after_promotion) : 0}
                                                                    </span>
                                                                    <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                        /ngày
                                                                    </span>
                                                                </div>
                                                            </>
                                                            :
                                                            <div className='flex'>
                                                                <span className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#1AC5CA] font-medium'>
                                                                    {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                </span>
                                                                <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                    /ngày
                                                                </span>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                            )

                    }

                </div>
            </div>
        </div >
    )
}

export default SectionCardCar