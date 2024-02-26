'use client'

import Image from 'next/image'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import React, { useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation } from 'swiper/modules'

import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';
import { IoMdQuote } from "react-icons/io";

type Props = {}

const SectionBannerPromotion = (props: Props) => {
    const swiperRef = useRef<any>(null);
    const [sliderStart, setSliderStart] = useState<boolean>(true)
    const [sliderEnd, setSliderEnd] = useState<boolean>(false)

    const handlePrev = (e: any) => {
        if (swiperRef.current && !sliderStart) {
            swiperRef?.current?.slidePrev();
            setSliderStart(swiperRef.current.isBeginning)
            setSliderEnd(swiperRef.current.isEnd)
        }
    };

    const handleNext = (e: any) => {
        if (swiperRef.current && !sliderEnd) {
            swiperRef?.current?.slideNext();
            setSliderStart(swiperRef.current.isBeginning)
            setSliderEnd(swiperRef.current.isEnd)
        }
    };

    const dataBlog = [
        {
            id: uuidv4(),
            image: '/other/banner/banner1.png',
        },
        {
            id: uuidv4(),
            image: '/other/banner/banner2.png',
        },
        {
            id: uuidv4(),
            image: '/other/banner/banner2.png',
        },
        {
            id: uuidv4(),
            image: '/other/banner/banner1.png',
        },
        {
            id: uuidv4(),
            image: '/other/banner/banner1.png',
        },
    ]

    return (
        <div className='relative flex flex-col gap-2 2xl:pt-20 2xl:pb-44 py-16'>
            <div className='custom-container z-20 flex flex-col gap-8'>
                <div data-aos='fade-down' className='3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-xl leading-tight capitalize font-bold max-w-[85%] text-[#101010]'>
                    Chương trình khuyến mãi
                </div>
                <div data-aos='fade-down' className='3xl:text-base text-sm text-[#8C93A3] font-medium'>
                    Khám phá ngay những ưu đãi mới nhất từ KANOW
                </div>

                <div className='relative'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        modules={[A11y]}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 1,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1920: {
                                slidesPerView: 3
                            }
                        }}
                    >
                        {
                            dataBlog.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                    <Image
                                        width={800}
                                        height={800}
                                        alt='image banner'
                                        src={item.image}
                                        className='w-full h-[320px] object-cover rounded-xl cursor-pointer'
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    <div className='flex gap-2 absolute 3xl:-top-24 xl:top-[-16%] lg:top-[-18%] md:top-[-18%] top-[-18%] right-0 disable-selection'>
                        <TiArrowLeft
                            onClick={handlePrev}
                            className={`${sliderStart ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'}  p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                        />
                        <TiArrowRight
                            onClick={handleNext}
                            className={`${sliderEnd ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'}  p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                        />
                    </div>
                </div>

            </div>

            <Image
                alt="background"
                width={1920}
                height={1080}
                src="/background/banner_background8.png"
                className='w-full h-full object-fill absolute bottom-0'
            />
        </div >
    )
}

export default SectionBannerPromotion