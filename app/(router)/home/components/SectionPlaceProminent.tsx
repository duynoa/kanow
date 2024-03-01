'use client'

import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import React, { useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Pagination } from 'swiper/modules'

import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';
import { FormatNumberDot } from '@/components/format/FormatNumber';
import { useResize } from '@/hooks/useResize';

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

    const { isVisibleMobile } = useResize()

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

    const customPagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<span class=${className}></span>`
        },

    }

    return (
        <div className='relative flex flex-col gap-2 2xl:pt-0 2xl:pb-60 xxl:pb-52 xl:pb-44 md:pb-36 pb-0'>
            <div className='custom-container z-20 flex flex-col justify-center md:items-center items-start gap-2'>
                <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-[26px] text-[26px] leading-tight capitalize font-bold md:max-w-[85%] max-w-full text-[#101010]'>
                    Khám phá địa điểm nổi bật
                </div>
                <div className='3xl:text-base xl:text-sm md:text-xs text-sm text-[#8C93A3] font-medium'>
                    KANOW đã có mặt tại tất cả các tỉnh thành trên toàn quốc
                </div>

                <div className='relative w-full 3xl:mt-20 2xl:mt-16 lg:mt-14 lg:pt-0 pt-4'>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        modules={[Pagination, A11y]}
                        onSwiper={(swiper) => {
                            swiperRefPlace.current = swiper;
                        }}
                        allowTouchMove
                        pagination={customPagination}
                        breakpoints={{
                            320: {
                                slidesPerView: 3,
                            },
                            640: {
                                slidesPerView: 3,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1920: {
                                slidesPerView: 4,
                            }
                        }}
                        className='custom-swiper-place w-full md:h-full h-[170px]'
                    >
                        {
                            dataProminentPlace && dataProminentPlace.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                    <div className='flex md:flex-row flex-col items-center cursor-pointer 2xl:gap-4 gap-2 w-fit'>
                                        <div className='3xl:w-[90px] 3xl:max-w-[90px] 3xl:h-[90px] xl:w-[80px] xl:max-w-[80px] xl:h-[80px] lg:w-[70px] lg:max-w-[70px] lg:h-[70px] w-[60px] max-w-[60px] h-[60px]'>
                                            <Image
                                                width={800}
                                                height={800}
                                                alt='image banner'
                                                src={item.image}
                                                className='3xl:w-[90px] 3xl:max-w-[90px] 3xl:h-[90px] xl:w-[80px] xl:max-w-[80px] xl:h-[80px] lg:w-[70px] lg:max-w-[70px] lg:h-[70px] w-[60px] max-w-[60px] h-[60px] object-cover rounded-full'
                                            />
                                        </div>
                                        <div className='flex flex-col lg:gap-3 gap-1 md:max-w-[90%] max-w-full'>
                                            <div className="text-center w-full font-semibold xxl:text-base lg:text-[15px] text-sm">
                                                {item.name ? item.name : ""}
                                            </div>
                                            <div className='bg-[#D7D9E0]/40 rounded-[32px] py-1 px-3 3xl:text-sm lg:text-xs text-[12px] w-fit'>
                                                {FormatNumberDot(item.quantityCar)} xe
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    {
                        isVisibleMobile ?
                            null
                            :
                            <div className='flex gap-2 absolute 2xl:-bottom-32 xxl:-bottom-24 lg:-bottom-20 -bottom-16 lg:right-[50%] right-[45%] disable-selection'>
                                <TiArrowLeft
                                    onClick={(e) => handlePrev(e, 'place')}
                                    className={`${sliderStartPlace ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'}  p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                                />
                                <TiArrowRight
                                    onClick={(e) => handleNext(e, 'place')}
                                    className={`${sliderEndPlace ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'}  p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                                />
                            </div>
                    }
                </div>
            </div>
            {
                isVisibleMobile ?
                    null
                    :
                    <>
                        <Image
                            alt="background"
                            width={1920}
                            height={1080}
                            src="/background/line_background2.png"
                            className='w-full h-auto object-contain absolute 3xl:-bottom-[90px] lg:-bottom-[70px] md:bottom-0 bottom-14 3xl:right-12 xl:right-8 lg:-right-0 -right-0 drop-shadow z-[1]'
                            loading="lazy"
                        />
                        <Image
                            alt="background"
                            width={1920}
                            height={1080}
                            src="/background/triangle.png"
                            className='3xl:w-[300px] 3xl:h-[300px] xl:w-[260px] xl:h-[260px] lg:w-[220px] lg:h-[220px] w-[200px] h-[200px] object-contain absolute 3xl:-bottom-56 2xl:-bottom-44 xxl:-bottom-44 xl:-bottom-44 lg:-bottom-40 -bottom-32 -right-20 z-[1]'
                            loading="lazy"
                        />
                    </>
            }

        </div >
    )
}

export default SectionPlaceProminent