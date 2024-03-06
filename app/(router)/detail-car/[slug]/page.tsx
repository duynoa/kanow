'use client'

import { FormatNumberDot, FormatNumberHundred, FormatNumberToThousands } from '@/components/format/FormatNumber'
import Map from '@/components/map/Maps'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaRegQuestionCircle, FaStar } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { RiMap2Line } from 'react-icons/ri'
import { TiArrowSortedUp, TiHeartFullOutline, TiLocation } from 'react-icons/ti'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuidv4 } from 'uuid'
import StarRatings from 'react-star-ratings';
import Link from 'next/link'
import BlurImage from '@/components/image/BlurImage'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import { PiShieldCheckFill } from "react-icons/pi";
import { Label } from '@/components/ui/label'
import { DatePickerWithRange } from '@/components/datePicker/DatePickerWithRange'
import { DatePickerWithRangeAndTime } from '@/components/datePicker/DatePickerWithRangeAndTime'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useResize } from '@/hooks/useResize'
import { DialogReviewImage } from '@/components/modals/DialogReviewImage'
import { useDialogImage } from '@/hooks/useDialogImage'


type Props = {}

const DetailCar = (props: Props) => {
    const { isVisibleMobile, isVisibleTablet } = useResize()
    const { setOpenDialogReview, setDataImage, setIndexImage } = useDialogImage();

    const [isMounted, setIsMounted] = useState<boolean>(false)
    // Sử dụng useState để theo dõi trạng thái của header thứ hai
    const [showSecondHeader, setShowSecondHeader] = useState(false);
    const [openModalReview, setOpenModalReview] = useState<boolean>(false)

    const initialState: any = {
    };

    const [isState, setIsState] = useState<any>(initialState)
    const queryKeyIsState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    const latitude = 10.796455918645478; // Thay đổi giá trị này bằng vĩ độ thực tế
    const longitude = 106.63445664322627; // Thay đổi giá trị này bằng kinh độ thực tế

    useEffect(() => {
        setIsMounted(true)
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
            image: "/other/car/car3.png"
        },
    ]

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

    const dataMaps = {
        google_map_link: ""
    }

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
        setDataImage(imageCard)
    }

    if (!isMounted) {
        return null;
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
                            className='custom-swiper-detail-car w-full 3xl:h-[330px] xl:h-[280px] lg:h-[240px] md:h-[380px] h-[240px] lg:px-2'
                        >
                            {
                                imageCard && imageCard.map((card, index) => (
                                    <SwiperSlide key={card.id}>
                                        <div className='w-full 3xl:h-[300px] xl:h-[240px] lg:h-[200px] md:h-[380px] h-[240px] cursor-pointer'>
                                            <Image
                                                src={card.image ? card.image : '/default/default.png'}
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
                                imageCard && imageCard.map((card, index) => (
                                    <SwiperSlide key={card.id} onClick={() => handleOpenReviewImage(card.id, index)}>
                                        <div className='w-full 3xl:h-[300px] xl:h-[240px] lg:h-[200px] md:h-[380px] h-[240px] cursor-pointer'>
                                            <Image
                                                src={card.image ? card.image : '/default/default.png'}
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
                <div className='flex flex-col gap-6 xxl:w-[70%] xxl:max-w-[70%] lg:w-[65%] lg:max-w-[65%] w-full max-w-full h-full pb-16 lg:order-none order-2'>
                    <div className='flex flex-row items-center justify-between 3xl:pb-6 pb-4 border-b-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='3xl:text-4xl md:text-3xl text-xl uppercase text-[#09080D] font-bold'>
                                Mitsubishi xpander 2023
                            </div>
                            <div className='flex md:flex-row flex-col gap-3 md:items-center items-start'>
                                <div className='flex gap-3 md:items-center items-start'>
                                    <Badge className='bg-[#000000]/50 font-normal cursor-default md:text-xs text-[10px] py-1 px-3'>
                                        Miễn thế chấp
                                    </Badge>
                                    <Badge className='bg-[#000000]/50 font-normal cursor-default md:text-xs text-[10px] py-1 px-3'>
                                        Đặt xe nhanh
                                    </Badge>
                                </div>

                                <div className='flex gap-3 md:items-center items-start'>
                                    <div className='flex items-center gap-1'>
                                        <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#FF9900]' />
                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-medium      '>
                                            4.9
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-1'>
                                        <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#3AC996]' />
                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                            {FormatNumberHundred(19)} Chuyến
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={handleClickFavorite}
                            className='bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out'
                        >
                            <TiHeartFullOutline className={`text-white 3xl:text-4xl text-2xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                            {/* <TiHeartFullOutline className={`${card.favorite ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} /> */}
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
                                        Số tự động
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
                                        5 chỗ
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
                                        Xăng
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 3xl:pb-6 pb-4 border-b-2'>
                        <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                            Mô tả
                        </div>
                        <div className='flex flex-col'>
                            <div className='3xl:text-base text-sm text-[#585F71]'>
                                Xe Vin Fast Fadil số tự động xe mới đăng ký tháng 4/2022.
                            </div>
                            <div className='3xl:text-base text-sm text-[#585F71]'>
                                Xe gia đình mới đẹp, bản cao cấp. Nội thất sạch sẽ, bảo dưỡng thường xuyên.
                            </div>
                            <div className='3xl:text-base text-sm text-[#585F71]'>
                                Xe rộng rãi, an toàn, tiện nghi động cơ 1.4 mạnh mẽ khỏe khoắn.
                            </div>
                            <div className='3xl:text-base text-sm text-[#585F71]'>
                                Xe có cảm biến mà camera lùi, camera hành trình
                            </div>
                        </div>
                        <div className='3xl:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out'>
                            Xem thêm
                        </div>
                    </div>

                    <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                        <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                            Tiện nghi trên xe
                        </div>
                        <div className='grid md:grid-cols-4 grid-cols-2 gap-2'>
                            {
                                featuresCar && featuresCar.map((feature) => (
                                    <div key={feature.id} className='flex gap-2 items-center w-fit pr-2 py-1'>
                                        <Image
                                            src={feature.icon}
                                            alt='icon'
                                            width={80}
                                            height={80}
                                            className='3xl:w-6 3xl:max-w-6 3xl:h-6 w-5 max-w-5 h-5 object-contain'
                                        />
                                        <div className='text-[#585F71] 3xl:text-base text-sm'>{feature.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div id="section-2" className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                        <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                            Chủ xe
                        </div>
                        <div className='bg-[#F6F6F8] p-4 flex md:flex-row flex-col md:items-center items-start gap-4 rounded-xl'>
                            <div className='flex items-center gap-4'>
                                <div className='3xl:w-16 3xl:h-16 3xl:min-w-16 w-14 min-w-14 h-14 rounded-full border-[3px] border-[#ffffff] drop-shadow'>
                                    <Image
                                        src="/avatar/avatar1.png"
                                        alt="avatar"
                                        width={100}
                                        height={100}
                                        className='w-full h-full object-contain rounded-full'
                                    />
                                </div>

                                <div className='flex flex-col 3xl:gap-2 gap-1'>
                                    <div className='uppercase text-[#16171B] font-semibold 3xl:text-base text-sm'>
                                        Lan vũ
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <div className='flex items-center gap-1'>
                                            <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#FF9900]' />
                                            <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-medium      '>
                                                4.9
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-1'>
                                            <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#3AC996]' />
                                            <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                {FormatNumberHundred(19)} Chuyến
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='3xl:pl-20 lg:pl-10 md:pl-6 p-0 3xl:text-base text-sm text-[#6F7689] 3xl:max-w-[75%] lg:max-w-[70%] md:max-w-[65%] max-w-full'>
                                Chủ xe 5 sao có thời gian phản hồi nhanh chóng, tỉ lệ đồng ý cao, mức giá cạnh tranh và dịch vụ nhận được nhiều đánh giá tốt từ khách hàng
                            </div>
                        </div>
                        <div className='grid grid-cols-3 md:gap-20 gap-4'>
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
                                                rating={4.5}
                                                starRatedColor="#FCC43E"
                                                starHoverColor='#FCC43E'
                                                starDimension='16px'
                                                starSpacing='0px'
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                            :
                                            <StarRatings
                                                rating={4.5}
                                                starRatedColor="#FCC43E"
                                                starHoverColor='#FCC43E'
                                                starDimension='16px'
                                                starSpacing='2px'
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                    }
                                    <div className='3xl:text-base text-sm text-[#FF9900] font-semibold'>
                                        4.5/5
                                    </div>
                                    <div className='3xl:text-base text-sm text-[#6F7689]'>
                                        (20 đánh giá)
                                    </div>
                                </div>
                            </div>
                            <div className='3xl:text-lg md:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out'>
                                Xem tất cả
                            </div>
                        </div>
                        {
                            listComment && listComment.map((item, index) => (
                                <div key={item.id} className={`${index !== listComment.length - 1 ? "border-b pb-3" : ""} flex flex-col`}>
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
                                                {item.fullName ? item.fullName : ''}
                                            </div>
                                            <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                {item.createdTime}
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
                                                    rating={item.rating ? item.rating : 0}
                                                    starRatedColor="#FCC43E"
                                                    starHoverColor='#FCC43E'
                                                    starDimension='14px'
                                                    starSpacing='0px'
                                                    numberOfStars={5}
                                                    name='rating'
                                                />
                                                :
                                                <StarRatings
                                                    rating={item.rating ? item.rating : 0}
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

                    {/* // */}
                    <div id="section-4" className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                                Giấy tờ thuê xe
                            </div>
                            <FaRegQuestionCircle onClick={() => console.log('check')} className='text-[#FF9900] 3xl:text-2xl text-xl cursor-pointer' />
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
                    {/* // */}
                    {/* <div className='flex flex-col gap-4 3xl:pb-6 pb-4 border-b-2'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='text-2xl text-[#16171B] font-semibold'>
                                Giấy tờ thuê xe
                            </div>
                            <FaRegQuestionCircle onClick={() => console.log('check')} className='text-[#FF9900] text-2xl cursor-pointer' />
                        </div>
                        <div className='text-base text-[#484D5C]'>
                            Vui lòng chuẩn bị 2 loại giấy tờ:
                        </div>
                        <div className='w-full h-auto'>
                            <Image
                                src="/other/info/info1.png"
                                alt="image"
                                width={1920}
                                height={1080}
                                className='w-full h-auto object-contain'
                            />
                        </div>
                        <div className='w-full h-auto'>
                            <Image
                                src="/other/info/info2.png"
                                alt="image"
                                width={1920}
                                height={1080}
                                className='w-full h-auto object-contain'
                            />
                        </div>
                    </div> */}
                    {/* // */}

                    <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                                Tài sản thế chấp
                            </div>
                            <FaRegQuestionCircle onClick={() => console.log('check')} className='text-[#FF9900] 3xl:text-2xl text-xl cursor-pointer' />
                        </div>
                        <div className='3xl:text-base text-sm text-[#585F71]'>
                            15 triệu (tiền mặt hoặc chuyển khoản cho chủ xe khi nhận xe) hoặc xe máy (kèm cà vẹt gốc) giá trị 15 triệu
                        </div>
                    </div>

                    <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border-b-2'>
                        <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                            Phụ phí có thể phát sinh
                        </div>
                        <div className='flex flex-col gap-4'>
                            {
                                listSurcharge && listSurcharge.map((item) => (
                                    <div key={item.id} className='flex items-center justify-between gap-2 p-6 bg-[#F6F6F8] rounded-xl'>
                                        <div className='md:w-[90%] md:max-w-[90%] w-[85%] max-w-[85%] flex flex-col gap-1'>
                                            <div className='3xl:text-base text-sm text-[#16171B] font-semibold'>
                                                {item.title ? item.title : ""}
                                            </div>
                                            <div className='3xl:text-base text-sm text-[#585F71]'>
                                                {item.description ? item.description : ""}
                                            </div>
                                        </div>
                                        <div className='3xl:text-base text-sm w-[10%] max-w-[10%] flex justify-end text-[#FA3434] font-medium'>
                                            {item.money ? item.money : ""}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='mt-2 3xl:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out'>
                            Xem thêm
                        </div>
                    </div>

                    <div className='flex flex-col 3xl:gap-4 gap-2'>
                        <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                            Chính sách huỷ chuyến
                        </div>
                        <div className='3xl:text-base text-sm text-[#585F71]'>
                            An tâm thuê xe, không lo bị hủy chuyến với chính sách hủy chuyến của KANOW
                        </div>
                        <div className='3xl:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out'>
                            Xem thêm
                        </div>
                    </div>
                </div>

                <div className='flex flex-col 3xl:gap-4 lg:gap-2 gap-4 xxl:w-[30%] xxl:max-w-[30%] lg:w-[35%] lg:max-w-[35%] w-full max-w-full h-full lg:order-none order-1'>
                    <div className='flex flex-col gap-2 xl:px-6 xl:py-4 p-4 bg-[#C2F9F9]/[63] rounded-2xl '>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                                Bảo hiểm thuê xe
                            </div>
                            <PiShieldCheckFill
                                onClick={() => console.log('check')}
                                className='text-[#3561FF] 3xl:text-2xl text-xl cursor-pointer'
                            />
                        </div>
                        <div className='3xl:text-base text-sm text-[#585F71]'>
                            Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa 2 triệu đồng trong trường hợp có sự cố ngoài ý muốn
                        </div>
                        <div className='3xl:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out'>
                            Xem chi tiết
                        </div>
                    </div>

                    <div className='flex flex-col 3xl:gap-6 gap-4 xl:p-6 p-4 bg-white border rounded-2xl'>
                        <div className='flex items-center gap-1'>
                            <div className='3xl:text-4xl md:text-3xl text-2xl text-[#D7D9E0] font-medium line-through'>
                                {FormatNumberToThousands(292000)}
                            </div>
                            <div className='flex'>
                                <span className='3xl:text-4xl md:text-3xl text-2xl text-[#1AC5CA] font-bold'>
                                    {FormatNumberToThousands(392000)}
                                </span>
                                <span className='3xl:text-base md:text-sm text-xs text-[#585F71] flex justify-start font-semibold capitalize'>
                                    /ngày
                                </span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='3xl:text-base text-sm text-[#16171B] font-semibold'>
                                Nhu cầu thuê xe
                            </div>
                            <Label className='3xl:text-base text-sm text-[#6F7689] w-fit' htmlFor="date">
                                Thời gian thuê
                            </Label>
                            <DatePickerWithRangeAndTime className='w-full' classNameButton='px-4 py-3' />
                            <div className='flex w-full justify-end text-[#3561FF] 3xl:text-base text-sm font-medium'>
                                Thuê tháng giảm 8%
                            </div>

                            <div className='flex flex-col'>
                                <div className='3xl:text-base text-sm text-[#FA3434] font-medium'>
                                    Xe đã được thuê:
                                </div>
                                <li className='3xl:text-base text-sm text-[#FA3434] font-medium'>
                                    Từ 7h30 12/3/2024 đến 7h30 14/3/2024
                                </li>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='3xl:text-base text-sm text-[#6F7689]'>
                                    Địa điểm giao nhận xe
                                </div>
                                <div className="flex items-center gap-4 bg-[#F6F6F8]/70 p-4 rounded-xl w-full">
                                    <Checkbox disabled id="terms" className='w-5 h-5 text-white border-[#9EA1AE] data-[state=checked]:border-[#2FB9BD] data-[state=checked]:bg-[#2FB9BD] data-[state=checked]:text-white' />
                                    <label
                                        htmlFor="terms"
                                        className="flex flex-col 3xl:text-sm text-xs font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full caret-transparent"
                                    >
                                        <span className='3xl:text-sm text-xs text-[#484D5C]'>
                                            Giao xe tận nơi
                                        </span>
                                        <span className='3xl:text-base text-sm text-[#16171B] font-medium'>
                                            12 Hoàn Kiếm Hà Nội
                                        </span>
                                    </label>
                                </div>
                                <div className='3xl:text-base text-sm text-[#FA3434] font-medium'>
                                    Rất tiếc, chủ xe chưa hỗ trợ giao xe tận nơi
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className="flex items-center gap-4 bg-[#F6F6F8]/70 p-4 rounded-xl w-full border border-[#1EAAB1]">
                                    <Checkbox id="terms-2" className='w-5 h-5 text-white border-[#9EA1AE] data-[state=checked]:border-[#2FB9BD] data-[state=checked]:bg-[#2FB9BD] data-[state=checked]:text-white' />
                                    <label
                                        htmlFor="terms-2"
                                        className="flex flex-col 3xl:text-sm text-xs font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full caret-transparent"
                                    >
                                        <span className='3xl:text-sm text-xs text-[#484D5C]'>
                                            Tự đến lấy xe
                                        </span>
                                        <span className='3xl:text-base text-sm text-[#16171B] font-medium'>
                                            12 Hoàn Kiếm Hà Nội
                                        </span>
                                    </label>
                                </div>
                                {/* <div className='text-base text-[#FA3434] font-medium'>
                                    Rất tiếc, chủ xe chưa hỗ trợ giao xe tận nơi
                                </div> */}
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2 pb-3 border-b'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <div className='3xl:text-base text-sm text-[#3E424E]'>
                                            Đơn giá thuê
                                        </div>
                                        <FaRegQuestionCircle onClick={() => console.log('check')} className='text-[#FF9900] 3xl:text-2xl text-xl cursor-pointer' />
                                    </div>
                                    <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                                        {FormatNumberDot(292000)}<span>đ/ngày</span>
                                    </div>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <div className='3xl:text-base text-sm text-[#3E424E]'>
                                            Bảo hiểm thuê xe
                                        </div>
                                        <FaRegQuestionCircle onClick={() => console.log('check')} className='text-[#FF9900] 3xl:text-2xl text-xl cursor-pointer' />
                                    </div>
                                    <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                                        {FormatNumberDot(52000)}<span>đ/ngày</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between items-center'>
                                <div className='3xl:text-base text-sm text-[#3E424E] font-medium'>
                                    Tổng tạm tính
                                </div>
                                <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                                    {FormatNumberDot(692000)}<span>đ/2 ngày</span>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2 bg-[#F9F9FA] rounded-xl p-4'>
                                <div className='3xl:text-lg xl:text-base text-sm text-[#2C2F31] font-semibold'>
                                    Khuyến mãi
                                </div>

                                <RadioGroup defaultValue="comfortable" className='flex flex-col gap-3'>
                                    <div className="flex items-center space-x-2 caret-transparent">
                                        <RadioGroupItem value="default" id="r1" className='w-5 h-5 border-[#D7D9E0] data-[state=checked]:text-[#2FB9BD] data-[state=checked]:border-[#2FB9BD] ' />
                                        <Label htmlFor="r1" className='flex flex-row items-center justify-between gap-2 w-full'>
                                            <div className='flex flex-col'>
                                                <div className='flex items-center gap-1'>
                                                    <Image
                                                        src='/icon/icon_ticket_discount_red.svg'
                                                        alt="ticket"
                                                        width={80}
                                                        height={80}
                                                        className='3xl:w-6 3xl:max-w-6 3xl:h-6 w-5 max-w-5 h-5 object-contain'
                                                    />
                                                    <div className='w-[90%] max-w-[90%] 3xl:text-lg xl:text-base text-sm'>
                                                        Chương trình giảm giá
                                                    </div>
                                                </div>
                                                <div className='text-[#6F7689] 3xl:text-base xl:text-sm text-xs'>
                                                    Giảm 160k trên đơn giá
                                                </div>
                                            </div>
                                            <div className='3xl:text-base xl:text-sm text-xs text-[#2FB9BD] font-semibold'>
                                                -{FormatNumberToThousands(160000)}
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 caret-transparent">
                                        <RadioGroupItem value="comfortable" id="r2" className='w-5 h-5 border-[#D7D9E0] data-[state=checked]:text-[#2FB9BD] data-[state=checked]:border-[#2FB9BD] ' />
                                        <Label htmlFor="r2" className='flex flex-row items-center justify-between gap-2 w-full'>
                                            <div className='flex flex-col'>
                                                <div className='flex items-center gap-1'>
                                                    <Image
                                                        src='/icon/icon_ticket_discount_green.svg'
                                                        alt="ticket"
                                                        width={80}
                                                        height={80}
                                                        className='3xl:w-6 3xl:max-w-6 3xl:h-6 w-5 max-w-5 h-5 object-contain fill-[#2FB9BD]'
                                                    />
                                                    <div className='w-[90%] max-w-[90%] 3xl:text-lg xl:text-base text-sm '>
                                                        Chương trình giảm giá
                                                    </div>
                                                </div>
                                            </div>
                                            <TiArrowSortedUp className='3xl:text-2xl text-xl text-[#16171B] rotate-90' />
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className='border w-full' />
                            <div className='flex justify-between items-center'>
                                <div className='3xl:text-base text-sm text-[#3E424E] font-medium'>
                                    Thành tiền
                                </div>
                                <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                                    {FormatNumberDot(592000)}<span>đ/2 ngày</span>
                                </div>
                            </div>
                        </div>

                        <Button className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-2xl'>
                            Chọn thuê
                        </Button>

                    </div>

                    <div className='flex w-full items-center justify-center'>
                        <div className='3xl:text-base text-sm text-[#FA3434] hover:text-[#FA3434]/80 duration-300 transition-all font-semibold cursor-pointer w-fit text-center caret-transparent'>
                            Báo cáo xe này
                        </div>
                    </div>
                </div>
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
                                    dataListCardCars && dataListCardCars.map((card, index) => (
                                        <SwiperSlide key={card.id}>
                                            <Link
                                                key={card.id}
                                                className='col-span-1 bg-white border w-full 3xl:p-4 p-3 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                                href={`/detail-car/${card.id}?${ConvertToSlug(card?.title)}`}
                                            >
                                                <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                                    - {card.promotion}
                                                </div>
                                                <div className='w-full 3xl:h-[230px] xxl:h-[200px] xl:h-[200px] h-[200px] relative'>
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
                                                            <TiLocation className='text-base text-[#FA3434] w-[16px] min-w-[16px]' />
                                                            <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%] line-clamp-1'>
                                                                {card.address ? card.address : ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='border-b border-[#D7D9E0]/50' />
                                                <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2 bg-[#F2FCF7] p-2 rounded-lg'>
                                                    <div className='flex items-center gap-1'>
                                                        <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#FFC118]' />
                                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                            {card.point ? card.point : ''}
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center gap-1'>
                                                        <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#3AC996]' />
                                                        <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                            {card.quantityTrips ? FormatNumberHundred(card.quantityTrips) : 0} Chuyến
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center gap-1'>
                                                        <div className='3xl:text-lg 2xl:text-base xxl:text-sm text-[15px] text-[#D7D9E0] font-medium line-through'>
                                                            {card.priceBeforePromotion ? FormatNumberToThousands(card.priceBeforePromotion) : 0}
                                                        </div>
                                                        <div className='flex'>
                                                            <span className='3xl:text-lg 2xl:text-base xxl:text-sm text-[15px] text-[#1AC5CA] font-medium'>
                                                                {card.priceAfterPromotion ? FormatNumberToThousands(card.priceAfterPromotion) : 0}
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
                                    dataListCardCars && dataListCardCars.map((card) => (
                                        <Link
                                            key={card.id}
                                            className='col-span-1 bg-white border w-full 3xl:p-4 p-3 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                            href={`/detail-car/${card.id}?${ConvertToSlug(card?.title)}`}
                                        >
                                            <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                                - {card.promotion}
                                            </div>
                                            <div className='w-full 3xl:h-[230px] xxl:h-[200px] xl:h-[200px] h-[180px] relative'>
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
                                                        <TiLocation className='text-base text-[#FA3434] w-[16px] min-w-[16px]' />
                                                        <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%] line-clamp-1'>
                                                            {card.address ? card.address : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='border-b border-[#D7D9E0]/50' />
                                            <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2 bg-[#F2FCF7] p-2 rounded-lg'>
                                                <div className='flex items-center gap-1'>
                                                    <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#FFC118]' />
                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                        {card.point ? card.point : ''}
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#3AC996]' />
                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                        {card.quantityTrips ? FormatNumberHundred(card.quantityTrips) : 0} Chuyến
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <div className='3xl:text-lg 2xl:text-base xxl:text-sm text-[15px] text-[#D7D9E0] font-medium line-through'>
                                                        {card.priceBeforePromotion ? FormatNumberToThousands(card.priceBeforePromotion) : 0}
                                                    </div>
                                                    <div className='flex'>
                                                        <span className='3xl:text-lg 2xl:text-base xxl:text-sm text-[15px] text-[#1AC5CA] font-medium'>
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
                    }
                </div>
            </div>
            <DialogReviewImage />
        </div>
    )
}

export default DetailCar