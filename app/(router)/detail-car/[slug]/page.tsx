'use client'

import { FormatNumberHundred } from '@/components/format/FormatNumber'
import Map from '@/components/map/Maps'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { RiMap2Line } from 'react-icons/ri'
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti'
import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuidv4 } from 'uuid'

type Props = {}

const DetailCar = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const latitude = 10.796455918645478; // Thay đổi giá trị này bằng vĩ độ thực tế
    const longitude = 106.63445664322627; // Thay đổi giá trị này bằng kinh độ thực tế

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const customPaginationBanner = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<span class=${className}></span>`
        },
    }

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

    const dataMaps = {
        google_map_link: ""
    }

    const handleClickFavorite = (e: any) => {
        e.stopPropagation()
        e.preventDefault();
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className='pt-2 custom-container'>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                modules={[Autoplay, Pagination, A11y]}
                allowTouchMove={true}
                breakpoints={{
                    320: {
                        slidesPerView: 3,
                        allowTouchMove: true
                    },
                    640: {
                        slidesPerView: 3,
                        allowTouchMove: true
                    },
                    768: {
                        slidesPerView: 3,
                        allowTouchMove: true
                    },
                }}
                autoplay={true}
                pagination={customPaginationBanner}
                className='custom-swiper-intro w-full h-[320px] px-2'
            >
                {
                    imageCard && imageCard.map((card, index) => (
                        <SwiperSlide key={card.id}>
                            <div className='w-full h-[300px] cursor-pointer'>
                                <Image
                                    src={card.image ? card.image : '/default/default.png'}
                                    alt="car"
                                    width={800}
                                    height={600}
                                    className='w-full h-[300px] object-cover rounded-2xl'
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className='mt-8 flex flex-row gap-6'>
                <div className='flex flex-col gap-6 w-[70%] max-w-[70%] h-full'>
                    <div className='flex flex-row items-center justify-between pb-6 border-b-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='text-4xl uppercase text-[#09080D] font-bold'>
                                Mitsubishi xpander 2023
                            </div>
                            <div className='flex gap-3 items-center'>
                                <Badge className='bg-[#000000]/50 font-normal cursor-default text-xs py-1 px-3'>
                                    Miễn thế chấp
                                </Badge>
                                <Badge className='bg-[#000000]/50 font-normal cursor-default text-xs py-1 px-3'>
                                    Đặt xe nhanh
                                </Badge>

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
                        <div
                            onClick={handleClickFavorite}
                            className='w-[52px] max-w-[52px] bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out'
                        >
                            <TiHeartFullOutline className={`text-white text-4xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                            {/* <TiHeartFullOutline className={`${card.favorite ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} /> */}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 pb-6 border-b-2'>
                        <div className='text-2xl text-[#16171B] font-semibold'>
                            Đặc điểm
                        </div>
                        <div className='flex flex-row justify-between items-center max-w-[80%]'>
                            <div className='flex items-center gap-4'>
                                <div className='w-14 max-w-14 h-14'>
                                    <Image
                                        src={"/icon/icon_feature1.png"}
                                        alt="icon"
                                        width={100}
                                        height={100}
                                        className='w-14 h-14 object-contain'
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='uppercase text-sm text-[#6F7689]'>
                                        Truyền động
                                    </div>
                                    <div className='text-base text-[#3E424E] font-semibold  '>
                                        Số tự động
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='w-14 max-w-14 h-14'>
                                    <Image
                                        src={"/icon/icon_feature2.png"}
                                        alt="icon"
                                        width={100}
                                        height={100}
                                        className='w-14 h-14 object-contain'
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='uppercase text-sm text-[#6F7689]'>
                                        Số ghế
                                    </div>
                                    <div className='text-base text-[#3E424E] font-semibold  '>
                                        5 chỗ
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='w-14 max-w-14 h-14'>
                                    <Image
                                        src={"/icon/icon_feature3.png"}
                                        alt="icon"
                                        width={100}
                                        height={100}
                                        className='w-14 h-14 object-contain'
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='uppercase text-sm text-[#6F7689]'>
                                        Nhiên liệu
                                    </div>
                                    <div className='text-base text-[#3E424E] font-semibold  '>
                                        Xăng
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 pb-6 border-b-2'>
                        <div className='text-2xl text-[#16171B] font-semibold'>
                            Mô tả
                        </div>
                        <div className='flex flex-col'>
                            <div className='text-base text-[#585F71]'>
                                Xe Vin Fast Fadil số tự động xe mới đăng ký tháng 4/2022.
                            </div>
                            <div className='text-base text-[#585F71]'>
                                Xe gia đình mới đẹp, bản cao cấp. Nội thất sạch sẽ, bảo dưỡng thường xuyên.
                            </div>
                            <div className='text-base text-[#585F71]'>
                                Xe rộng rãi, an toàn, tiện nghi động cơ 1.4 mạnh mẽ khỏe khoắn.
                            </div>
                            <div className='text-base text-[#585F71]'>
                                Xe có cảm biến mà camera lùi, camera hành trình
                            </div>
                        </div>
                        <div className='text-base text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-bold cursor-pointer duration-300 transition ease-in-out'>
                            Xem thêm
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 pb-6 border-b-2'>
                        <div className='text-2xl text-[#16171B] font-semibold'>
                            Tiện nghi trên xe
                        </div>
                        <div className='grid grid-cols-4 gap-2'>
                            {
                                featuresCar && featuresCar.map((feature) => (
                                    <div key={feature.id} className='flex gap-2 items-center w-fit bg-white pr-2 py-1'>
                                        <Image
                                            src={feature.icon}
                                            alt='icon'
                                            width={80}
                                            height={80}
                                            className='w-6 max-w-6 h-6 object-contain'
                                        />
                                        <div className='text-[#585F71] text-base'>{feature.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 pb-6 border-b-2'>
                        <div className='text-2xl text-[#16171B] font-semibold'>
                            Chủ xe
                        </div>
                        <div className='bg-[#F6F6F8] p-4 flex items-center gap-4 rounded-xl'>
                            <div className='w-16 h-16 max-w-16 rounded-full border-[3px] border-[#ffffff] drop-shadow'>
                                <Image
                                    src="/avatar/avatar1.png"
                                    alt="avatar"
                                    width={100}
                                    height={100}
                                    className='w-full h-full object-contain rounded-full'
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='uppercase text-[#16171B] font-semibold'>
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

                            <div className='pl-20 text-base text-[#6F7689] max-w-[75%]'>
                                Chủ xe 5 sao có thời gian phản hồi nhanh chóng, tỉ lệ đồng ý cao, mức giá cạnh tranh và dịch vụ nhận được nhiều đánh giá tốt từ khách hàng
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-20'>
                            <div className='col-span-1 flex flex-col items-center gap-1'>
                                <div className='text-base text-[#6F7689]'>
                                    Tỉ lệ phản hồi
                                </div>
                                <div className='text-lg text-[#000000] font-semibold'>
                                    100%
                                </div>
                            </div>
                            <div className='col-span-1 flex flex-col items-center gap-1'>
                                <div className='text-base text-[#6F7689]'>
                                    Tỉ lệ đồng ý
                                </div>
                                <div className='text-lg text-[#000000] font-semibold'>
                                    100%
                                </div>
                            </div>
                            <div className='col-span-1 flex flex-col items-center gap-1'>
                                <div className='text-base text-[#6F7689]'>
                                    Phản hồi trong
                                </div>
                                <div className='text-lg text-[#000000] font-semibold'>
                                    5 phút
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 pb-6 border-b-2'>
                        <div className='text-2xl text-[#16171B] font-semibold'>
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

                    <div className='flex flex-col gap-4 pb-6 border-b-2'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <div className='text-2xl text-[#16171B] font-semibold'>
                                    Đánh giá
                                </div>
                                <div>

                                </div>
                            </div>
                            <div className='text-base text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-bold cursor-pointer duration-300 transition ease-in-out'>
                                Xem tất cả
                            </div>
                        </div>
                    </div>

                </div>
                <div className='bg-orange-500 w-[30%] max-w-[30%] h-[600px]'>
                    dsdsdsd
                </div>
            </div>
        </div>
    )
}

export default DetailCar