'use client'

import Image from 'next/image'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import React, { useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation, Pagination } from 'swiper/modules'

import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';
import { IoMdQuote } from "react-icons/io";
import { FormatNumberDot } from '@/components/format/FormatNumber';

type Props = {}

const SectionPlaceProminent = (props: Props) => {
    const dataProminentPlace = [
        {
            id: uuidv4(),
            image: '/other/place/hanoi.png',
            name: 'Hà Nội',
            quantityCar: 8342,
        },
        {
            id: uuidv4(),
            image: '/other/place/haiphong.png',
            name: 'Hải Phòng',
            quantityCar: 7231,
        },
        {
            id: uuidv4(),
            image: '/other/place/saigon.png',
            name: 'TP.HCM',
            quantityCar: 8342,
        },
        {
            id: uuidv4(),
            image: '/other/place/cantho.png',
            name: 'Cần Thơ',
            quantityCar: 82342,
        },
        {
            id: uuidv4(),
            image: '/other/place/cantho.png',
            name: 'Lâm Đồng',
            quantityCar: 8342,
        },
    ]

    // slider place
    const swiperRefPlace = useRef<any>(null);
    const [sliderStartPlace, setSliderStartPlace] = useState<boolean>(true)
    const [sliderEndPlace, setSliderEndPlace] = useState<boolean>(false)

    const handlePrev = (e: any, type: string) => {
        if (swiperRefPlace.current && !sliderStartPlace && type === 'place') {
            swiperRefPlace?.current?.slidePrev();
            setSliderStartPlace(swiperRefPlace.current.isBeginning)
            setSliderEndPlace(swiperRefPlace.current.isEnd)
        }
    };

    const handleNext = (e: any, type: string) => {
        if (swiperRefPlace.current && !sliderEndPlace && type === 'place') {
            swiperRefPlace?.current?.slideNext();
            setSliderStartPlace(swiperRefPlace.current.isBeginning)
            setSliderEndPlace(swiperRefPlace.current.isEnd)
        }
    };

    return (
        <div className='relative flex flex-col gap-2 2xl:pt-0 2xl:pb-60 py-16'>
            <div className='custom-container z-20 flex flex-col justify-center items-center gap-2'>
                <div data-aos='fade-down' className='3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-xl leading-tight capitalize font-bold max-w-[85%] text-[#101010]'>
                    Khám phá địa điểm nổi bật
                </div>
                <div data-aos='fade-down' className='3xl:text-base text-sm text-[#8C93A3] font-medium'>
                    KANOW đã có mặt tại tất cả các tỉnh thành trên toàn quốc
                </div>

                <div className='relative w-full mt-20'>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        modules={[A11y]}
                        onSwiper={(swiper) => {
                            swiperRefPlace.current = swiper;
                        }}
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
                            1024: {
                                slidesPerView: 4,
                                allowTouchMove: false
                            },
                            1920: {
                                slidesPerView: 4,
                                allowTouchMove: false
                            }
                        }}
                        className='custom-swiper-place w-full'
                    >
                        {
                            dataProminentPlace && dataProminentPlace.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                    <div className='flex items-center cursor-pointer gap-4 w-fit'>
                                        <div className='w-[90px] max-w-[90px] h-[90px]'>
                                            <Image
                                                width={800}
                                                height={800}
                                                alt='image banner'
                                                src={item.image}
                                                className='w-[90px] max-w-[90px] h-[90px] object-cover rounded-full'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-3 max-w-[90%]'>
                                            <div className="w-full font-semibold 3xl:text-base text-sm">
                                                {item.name ? item.name : ""}
                                            </div>
                                            <div className='bg-[#D7D9E0]/40 rounded-[32px] py-1 px-3 text-sm'>
                                                {FormatNumberDot(item.quantityCar)} xe
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className='flex gap-2 absolute 3xl:-bottom-32 right-[50%] disable-selection'>
                        <TiArrowLeft
                            onClick={(e) => handlePrev(e, 'place')}
                            className={`${sliderStartPlace ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'}  p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                        />
                        <TiArrowRight
                            onClick={(e) => handleNext(e, 'place')}
                            className={`${sliderEndPlace ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'}  p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                        />
                    </div>
                </div>
            </div>

            <Image
                alt="background"
                width={1920}
                height={1080}
                src="/background/line_background2.png"
                className='w-full h-auto object-contain absolute bottom-[-90px] right-12 drop-shadow z-[1]'
                loading="lazy"
            />
            <Image
                alt="background"
                width={1920}
                height={1080}
                src="/background/triangle.png"
                className='w-[300px] h-[300px] object-contain absolute -bottom-40 -right-20 z-[1]'
                loading="lazy"
            />
        </div >
    )
}

export default SectionPlaceProminent