'use client'

import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import React, { useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Pagination } from 'swiper/modules'

import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';
import { useResize } from '@/hooks/useResize';

type Props = {}

const SectionBannerPromotion = (props: Props) => {
    const dataBanner = [
        {
            id: uuidv4(),
            image: '/other/banner/banner6.png',
        },
        {
            id: uuidv4(),
            image: '/other/banner/banner7.png',
        },
        {
            id: uuidv4(),
            image: '/other/banner/banner6.png',
        },
        {
            id: uuidv4(),
            image: '/other/banner/banner7.png',
        },
        {
            id: uuidv4(),
            image: '/other/banner/banner6.png',
        },
    ]
    const { isVisibleMobile } = useResize()
    const swiperRefBanner = useRef<any>(null);
    // slider banner
    const [sliderStartBanner, setSliderStartBanner] = useState<boolean>(true)
    const [sliderEndBanner, setSliderEndBanner] = useState<boolean>(false)

    const handlePrev = (e: any, type: string) => {
        if (swiperRefBanner.current && !sliderStartBanner && type === 'banner') {
            swiperRefBanner?.current?.slidePrev();
            setSliderStartBanner(swiperRefBanner.current.isBeginning)
            setSliderEndBanner(swiperRefBanner.current.isEnd)
        }
    };

    const handleNext = (e: any, type: string) => {
        if (swiperRefBanner.current && !sliderEndBanner && type === 'banner') {
            swiperRefBanner?.current?.slideNext();
            setSliderStartBanner(swiperRefBanner.current.isBeginning)
            setSliderEndBanner(swiperRefBanner.current.isEnd)
        }
    };

    // const handlePaginationClick = (index: number) => {
    //     // Chuyển slider đến vị trí tương ứng với bullet được click
    //     swiperRefBanner.current?.slideTo(index);
    // };

    const customPaginationBanner = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<span class=${className}></span>`
        },

    }

    return (
        <div className="relative z-20 md:bg-[url('/background/banner_background.png')] bg-[url('/background/banner_background_mobile.png')] bg-cover bg-right-bottom drop-shadow flex flex-col gap-2 w-full 3xl:pb-72 3xl:pt-20 2xl:pb-44 2xl:pt-20 xl:pb-40 xl:pt-14 lg:pt-12 lg:pb-28 md:pt-32 md:pb-16 pt-16 pb-28">
            <div className='custom-container flex flex-col 3xl:gap-8 gap-6'>
                <div className='flex flex-col gap-2'>
                    <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl text-[26px] leading-tight capitalize font-bold md:max-w-[85%] max-w-full text-[#101010]'>
                        Chương trình khuyến mãi
                    </div>
                    <div className='3xl:text-base xl:text-sm md:text-xs text-sm text-[#8C93A3] font-medium'>
                        Khám phá ngay những ưu đãi mới nhất từ KANOW
                    </div>
                </div>

                <div className='relative'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        modules={[Pagination,Autoplay]}
                        onSwiper={(swiper) => {
                            swiperRefBanner.current = swiper;
                        }}
                        autoplay={true}
                        speed={800}
                        pagination={customPaginationBanner}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1920: {
                                slidesPerView: 3,
                            }
                        }}
                        className='custom-swiper-banner xxl:h-[360px] h-[320px]'
                    >
                        {
                            dataBanner.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                    <Image
                                        width={560}
                                        height={320}
                                        alt='image banner'
                                        src={item.image}
                                        className='w-full 3xl:h-[320px] xxl:h-[260px] xl:h-[240px] lg:h-[220px] object-cover rounded-xl cursor-pointer'
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>

                    {
                        isVisibleMobile ?
                            null
                            :
                            <div className='flex gap-2 absolute 3xl:-top-24 xl:top-[-22%] lg:top-[-22%] md:top-[-22%] top-[-18%] right-0 disable-selection'>
                                <TiArrowLeft
                                    onClick={(e) => handlePrev(e, 'banner')}
                                    className={`${sliderStartBanner ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                                />
                                <TiArrowRight
                                    onClick={(e) => handleNext(e, 'banner')}
                                    className={`${sliderEndBanner ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                                />
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SectionBannerPromotion