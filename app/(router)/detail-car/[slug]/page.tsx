'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

import { FaStar } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti'

import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useResize } from '@/hooks/useResize'
import { useDialogImage } from '@/hooks/useDialogImage'

import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FormatNumberHundred, FormatNumberToThousands } from '@/components/format/FormatNumber'
import { DialogReviewImage } from '@/components/modals/DialogReviewImage'
import { DialogPromotion } from '@/components/modals/DialogPromotion'
import { DialogCalendar } from '@/components/modals/DialogCalendar'

import PaymentCar from './components/PaymentCar'
import InfomationCar from './components/InfomationCar';
import { getDataDetailCar } from '@/services/cars/cars.services'
import { CustomDataDetailCar } from '@/custom/CustomData'

type Props = {
    params: {
        slug: string
    }
}

const DetailCar = ({ params }: Props) => {
    const { isVisibleMobile, isVisibleTablet } = useResize()
    const { setOpenDialogReview, setDataImage, setIndexImage } = useDialogImage();
    const [isMounted, setIsMounted] = useState<boolean>(false)
    // Sử dụng useState để theo dõi trạng thái của header thứ hai
    const [showSecondHeader, setShowSecondHeader] = useState(false);

    const initialState: any = {
        dataDetailCar: {},
        onSuccess: {
            onSuccessPage: false
        }
    };

    const [isState, setIsState] = useState<any>(initialState)
    const queryKeyIsState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const fetchDataDetailCar = async () => {
            try {
                queryKeyIsState({
                    onSuccess: {
                        onSuccessPage: true
                    }
                })
                const { data } = await getDataDetailCar(params.slug)

                console.log("data", data);
                if (data && data.data && data.base.base) {
                    let { customDataDetailCar } = CustomDataDetailCar(data)
                    console.log('customDataDetailCar :', customDataDetailCar);

                    queryKeyIsState({
                        dataDetailCar: customDataDetailCar,
                        onSuccess: {
                            onSuccessPage: false
                        }
                    })
                }
            } catch (err) {
                throw err
            }

        }

        fetchDataDetailCar()
    }, [])



    const imageCard = [
        {
            id: uuidv4(),
            image: "/other/car/car1.png"
        },
        {
            id: uuidv4(),
            image: "/other/car/car2.png"
        },
        {
            id: uuidv4(),
            image: "/other/car/car3.png"
        },
        {
            id: uuidv4(),
            image: "/other/car/car2.png"
        },
        {
            id: uuidv4(),
            image: "/background/why_background.png"
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
    ]

    const handleClickFavorite = (e: any) => {
        e.stopPropagation()
        e.preventDefault();
    }

    // Định nghĩa một hàm xử lý sự kiện cuộn trang
    const handleScroll = () => {
        // Lấy vị trí cuộn của trang
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Kiểm tra nếu vị trí cuộn vượt qua một ngưỡng nhất định, ví dụ 100px
        if (scrollPosition > 100) {
            // Nếu vượt qua ngưỡng, hiển thị header thứ hai
            setShowSecondHeader(true);
        } else {
            // Nếu không, ẩn nó đi
            setShowSecondHeader(false);
        }
    }

    // Sử dụng useEffect để đăng ký sự kiện cuộn khi component được mount
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Cleanup: đảm bảo gỡ bỏ sự kiện cuộn khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Click vào chuyển đến id trong header2
    const handleClickToId = (itemId: number | string, index?: number | string) => {
        // Tìm phần tử có id tương ứng
        const targetElement = document.getElementById(`section-${itemId}`);

        // Nếu tìm thấy, cuộn trang đến vị trí của phần tử
        if (targetElement) {
            // Tính toán vị trí cuộn mới
            const scrollToPosition = targetElement.offsetTop;

            window.scrollTo({
                top: scrollToPosition, // Đặt vị trí đầu tiên của phần tử mục tiêu ở đầu trang
                behavior: "smooth", // Hiệu ứng cuộn mượt
            });
        }
    };

    const customPagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<span class=${className}></span>`
        },
    }

    const handleOpenReviewImage = (id: number | string, index: number) => {
        setOpenDialogReview(true)
        setIndexImage(index)
        setDataImage(isState?.dataDetailCar?.image_car)
    }

    if (!isMounted) {
        return null
    }

    return (
        <div className='relative'>
            <div
                className={`${showSecondHeader ? "block" : "hidden"} 3xl:h-[120px] w-full h-[80px] z-40 fixed top-0 bg-white`}
            // style={{ background: "linear-gradient(180deg, rgba(194, 249, 249, 0.60) 0%, rgba(194, 249, 249, 0.00) 100%)" }}
            >
                <div className='custom-container h-full flex flex-row items-center gap-10'>
                    <div
                        onClick={() => handleClickToId(1)}
                        className='3xl:text-lg text-base font-semibold cursor-pointer'
                    >
                        Đặc điểm
                    </div>
                    <div
                        onClick={() => handleClickToId(2)}
                        className='3xl:text-lg text-base font-semibold cursor-pointer'
                    >
                        Chủ xe
                    </div>
                    <div
                        onClick={() => handleClickToId(3)}
                        className='3xl:text-lg text-base font-semibold cursor-pointer'
                    >
                        Vị trí xe
                    </div>
                    <div
                        onClick={() => handleClickToId(4)}
                        className='3xl:text-lg text-base font-semibold cursor-pointer'
                    >
                        Giấy tờ thuê xe
                    </div>
                </div>
            </div>
            {
                isVisibleTablet ?
                    <div className=''>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={20}
                            modules={[Autoplay, Pagination, A11y]}
                            allowTouchMove={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    allowTouchMove: true,
                                },
                                640: {
                                    slidesPerView: 1,
                                    allowTouchMove: true,
                                },
                                768: {
                                    slidesPerView: 1,
                                    allowTouchMove: true
                                },
                                1024: {
                                    slidesPerView: 3,
                                    allowTouchMove: true
                                }
                            }}
                            autoplay={true}
                            pagination={customPagination}
                            className='custom-swiper-detail-car w-full md:h-[380px] h-[240px] lg:px-2'
                        >
                            {
                                isState?.dataDetailCar && isState?.dataDetailCar?.image_car && isState?.dataDetailCar?.image_car.map((carDetail: any, index: number) => (
                                    <SwiperSlide key={carDetail.car_id} onClick={() => handleOpenReviewImage(carDetail.car_id, index)}>
                                        <div className='w-full md:h-[380px] h-[240px] cursor-pointer'>
                                            <Image
                                                src={carDetail.name ? carDetail.name : '/default/default.png'}
                                                alt="car"
                                                width={800}
                                                height={600}
                                                className='w-full h-full object-cover lg:rounded-2xl'
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                    :
                    <div className='custom-container'>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={20}
                            modules={[Autoplay, Pagination, A11y]}
                            allowTouchMove={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    allowTouchMove: true,
                                    spaceBetween: "auto"
                                },
                                640: {
                                    slidesPerView: 1,
                                    allowTouchMove: true,
                                    spaceBetween: "auto"
                                },
                                768: {
                                    slidesPerView: 1,
                                    allowTouchMove: true
                                },
                                1024: {
                                    slidesPerView: 3,
                                    allowTouchMove: true
                                }
                            }}
                            autoplay={true}
                            pagination={customPagination}
                            className='custom-swiper-detail-car w-full 3xl:h-[330px] xl:h-[280px] lg:h-[240px] md:h-[380px] h-[240px] lg:px-2'
                        >
                            {
                                isState?.dataDetailCar && isState?.dataDetailCar?.image_car && isState?.dataDetailCar?.image_car.map((carDetail: any, index: number) => (
                                    <SwiperSlide key={carDetail.car_id} onClick={() => handleOpenReviewImage(carDetail.car_id, index)}>
                                        <div className='w-full 3xl:h-[300px] xl:h-[240px] lg:h-[200px] md:h-[380px] h-[240px] cursor-pointer'>
                                            <Image
                                                src={carDetail.name ? carDetail.name : '/default/default.png'}
                                                alt="car"
                                                width={800}
                                                height={600}
                                                className='w-full h-full object-cover lg:rounded-2xl'
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
            }

            <div className='custom-container 3xl:mt-8 mt-4 flex lg:flex-row flex-col gap-6'>
                <InfomationCar
                    isState={isState}
                    queryKeyIsState={queryKeyIsState}
                />

                <PaymentCar
                    isState={isState}
                    queryKeyIsState={queryKeyIsState}
                />
            </div>

            <div className='bg-[#F6F6F8] md:py-20 py-10'>
                <div className='custom-container flex flex-col 3xl:gap-10 gap-6'>
                    <div className='3xl:text-4xl text-3xl capitalize text-[#09080D] font-bold'>
                        Xe tương tự
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
                                pagination={customPagination}
                                className='custom-swiper-intro w-full h-[420px]'
                            >
                                {
                                    dataListCardCars && dataListCardCars.map((carDetail, index) => (
                                        <SwiperSlide key={carDetail.id}>
                                            <Link
                                                key={carDetail.id}
                                                className='col-span-1 bg-white border w-full 3xl:p-4 p-3 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                                href={`/detail-car/${carDetail.id}?${ConvertToSlug(carDetail?.title)}`}
                                            >
                                                <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                                    - {carDetail.promotion}
                                                </div>
                                                <div className='w-full 3xl:h-[230px] xxl:h-[200px] xl:h-[200px] h-[200px] relative'>
                                                    <Image
                                                        width={600}
                                                        height={600}
                                                        alt="image_card"
                                                        src={carDetail.image ? carDetail.image : '/default/default.png'}
                                                        className='w-full h-full object-cover rounded-xl'
                                                    />
                                                    <div
                                                        onClick={handleClickFavorite}
                                                        className='absolute right-2 top-2 bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out z-20'
                                                    >
                                                        <TiHeartFullOutline className={`${carDetail.favorite ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                                                    </div>
                                                    <div className='flex gap-2 absolute bottom-[10px] left-[10px]'>
                                                        {
                                                            carDetail.type.mortgageFree ?
                                                                <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                    Miễn thế chấp
                                                                </Badge>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            carDetail.type.orderFastCar ?
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
                                                        carDetail.type.automaticNumber ?
                                                            <Badge className='bg-[#C9DCF9]/35 hover:bg-[#C9DCF9]/50 text-[#3561FF] 3xl:text-sm text-xs font-medium cursor-default'>
                                                                Số tự động
                                                            </Badge>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        carDetail.type.doorstepDelivery ?
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
                                                                src={carDetail.avatar ? carDetail.avatar : '/default/default.png'}
                                                                alt="@kanow"
                                                            />
                                                            <AvatarFallback >
                                                                KN
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                    <div className='flex flex-col gap-1 w-[80%] max-w-[80%]'>
                                                        <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase line-clamp-1'>
                                                            {carDetail.title ? carDetail.title : ''}
                                                        </div>
                                                        <div className='flex gap-1 items-center'>
                                                            <TiLocation className='text-base text-[#FA3434] w-[16px] min-w-[16px]' />
                                                            <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%] line-clamp-1'>
                                                                {carDetail.address ? carDetail.address : ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='border-b border-[#D7D9E0]/50' />
                                                <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2 bg-[#F2FCF7] p-2 rounded-lg'>
                                                    <div className='flex items-center gap-1'>
                                                        <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#FFC118]' />
                                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                            {carDetail.point ? carDetail.point : ''}
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center gap-1'>
                                                        <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#3AC996]' />
                                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                            {carDetail.quantityTrips ? FormatNumberHundred(carDetail.quantityTrips, 100) : 0} Chuyến
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center gap-1'>
                                                        <div className='3xl:text-lg 2xl:text-base xxl:text-sm text-[15px] text-[#D7D9E0] font-medium line-through'>
                                                            {carDetail.priceBeforePromotion ? FormatNumberToThousands(carDetail.priceBeforePromotion) : 0}
                                                        </div>
                                                        <div className='flex'>
                                                            <span className='3xl:text-lg 2xl:text-base xxl:text-sm text-[15px] text-[#1AC5CA] font-medium'>
                                                                {carDetail.priceAfterPromotion ? FormatNumberToThousands(carDetail.priceAfterPromotion) : 0}
                                                            </span>
                                                            <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                /ngày
                                                            </span>
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
                                    dataListCardCars && dataListCardCars.map((carDetail) => (
                                        <Link
                                            key={carDetail.id}
                                            className='col-span-1 bg-white border w-full 3xl:p-4 p-3 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                            href={`/detail-car/${carDetail.id}?${ConvertToSlug(carDetail?.title)}`}
                                        >
                                            <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                                - {carDetail.promotion}
                                            </div>
                                            <div className='w-full 3xl:h-[230px] xxl:h-[200px] xl:h-[200px] h-[180px] relative'>
                                                <Image
                                                    width={600}
                                                    height={600}
                                                    alt="image_card"
                                                    src={carDetail.image ? carDetail.image : '/default/default.png'}
                                                    className='w-full h-full object-cover rounded-xl'
                                                />
                                                <div
                                                    onClick={handleClickFavorite}
                                                    className='absolute right-2 top-2 bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out z-20'
                                                >
                                                    <TiHeartFullOutline className={`${carDetail.favorite ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                                                </div>
                                                <div className='flex gap-2 absolute bottom-[10px] left-[10px]'>
                                                    {
                                                        carDetail.type.mortgageFree ?
                                                            <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                Miễn thế chấp
                                                            </Badge>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        carDetail.type.orderFastCar ?
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
                                                    carDetail.type.automaticNumber ?
                                                        <Badge className='bg-[#C9DCF9]/35 hover:bg-[#C9DCF9]/50 text-[#3561FF] 3xl:text-sm text-xs font-medium cursor-default'>
                                                            Số tự động
                                                        </Badge>
                                                        :
                                                        null
                                                }
                                                {
                                                    carDetail.type.doorstepDelivery ?
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
                                                            src={carDetail.avatar ? carDetail.avatar : '/default/default.png'}
                                                            alt="@kanow"
                                                        />
                                                        <AvatarFallback >
                                                            KN
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className='flex flex-col gap-1 w-[80%] max-w-[80%]'>
                                                    <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase line-clamp-1'>
                                                        {carDetail.title ? carDetail.title : ''}
                                                    </div>
                                                    <div className='flex gap-1 items-center'>
                                                        <TiLocation className='text-base text-[#FA3434] w-[16px] min-w-[16px]' />
                                                        <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%] line-clamp-1'>
                                                            {carDetail.address ? carDetail.address : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='border-b border-[#D7D9E0]/50' />
                                            <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2 bg-[#F2FCF7] p-2 rounded-lg'>
                                                <div className='flex items-center gap-1'>
                                                    <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#FFC118]' />
                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                        {carDetail.point ? carDetail.point : ''}
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#3AC996]' />
                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                        {carDetail.quantityTrips ? FormatNumberHundred(carDetail.quantityTrips, 100) : 0} Chuyến
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <div className='3xl:text-lg 2xl:text-base xxl:text-sm text-[15px] text-[#D7D9E0] font-medium line-through'>
                                                        {carDetail.priceBeforePromotion ? FormatNumberToThousands(carDetail.priceBeforePromotion) : 0}
                                                    </div>
                                                    <div className='flex'>
                                                        <span className='3xl:text-lg 2xl:text-base xxl:text-sm text-[15px] text-[#1AC5CA] font-medium'>
                                                            {carDetail.priceAfterPromotion ? FormatNumberToThousands(carDetail.priceAfterPromotion) : 0}
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
                    }
                </div>
            </div>

            <DialogReviewImage />
            <DialogPromotion />
            <DialogCalendar />
        </div>
    )
}

export default DetailCar