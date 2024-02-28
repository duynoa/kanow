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

const SectionBannerPromotion = (props: Props) => {
    const dataBanner = [
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
        <div className="relative z-20 bg-[url('/background/banner_background1.png')] bg-cover bg-right-bottom drop-shadow flex flex-col gap-2 w-full 3xl:pb-72 3xl:pt-20 py-16">
            <div className='custom-container flex flex-col gap-8'>
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
                        modules={[Pagination, A11y]}
                        onSwiper={(swiper) => {
                            swiperRefBanner.current = swiper;
                        }}
                        pagination={customPaginationBanner}
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
                                slidesPerView: 3,
                                allowTouchMove: false
                            },
                            1920: {
                                slidesPerView: 3,
                                allowTouchMove: false
                            }
                        }}
                        className='custom-swiper-banner h-[360px]'
                    >
                        {
                            dataBanner.map((item, index) => (
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
                            onClick={(e) => handlePrev(e, 'banner')}
                            className={`${sliderStartBanner ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                        />
                        <TiArrowRight
                            onClick={(e) => handleNext(e, 'banner')}
                            className={`${sliderEndBanner ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                        />
                    </div>
                </div>
            </div>
        </div>
        // <div className='relative flex flex-col gap-2 2xl:pt-[160px] 2xl:pb-44 py-16'>
        //     <div className='custom-container z-20 flex flex-col gap-8'>
        //         <div data-aos='fade-down' className='3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-xl leading-tight capitalize font-bold max-w-[85%] text-[#101010]'>
        //             Chương trình khuyến mãi
        //         </div>
        //         <div data-aos='fade-down' className='3xl:text-base text-sm text-[#8C93A3] font-medium'>
        //             Khám phá ngay những ưu đãi mới nhất từ KANOW
        //         </div>

        //         <div className='relative'>
        //             <Swiper
        //                 slidesPerView={3}
        //                 spaceBetween={20}
        //                 modules={[Pagination, A11y]}
        //                 onSwiper={(swiper) => {
        //                     swiperRefBanner.current = swiper;
        //                 }}
        //                 pagination={customPaginationBanner}
        //                 breakpoints={{
        //                     320: {
        //                         slidesPerView: 1,
        //                         allowTouchMove: true
        //                     },
        //                     640: {
        //                         slidesPerView: 1,
        //                         allowTouchMove: true
        //                     },
        //                     768: {
        //                         slidesPerView: 1,
        //                         allowTouchMove: true
        //                     },
        //                     1024: {
        //                         slidesPerView: 3,
        //                         allowTouchMove: false
        //                     },
        //                     1920: {
        //                         slidesPerView: 3,
        //                         allowTouchMove: false
        //                     }
        //                 }}
        //                 className='custom-swiper-banner h-[360px]'
        //             >
        //                 {
        //                     dataBanner.map((item, index) => (
        //                         <SwiperSlide key={item.id}>
        //                             <Image
        //                                 width={800}
        //                                 height={800}
        //                                 alt='image banner'
        //                                 src={item.image}
        //                                 className='w-full h-[320px] object-cover rounded-xl cursor-pointer'
        //                             />
        //                         </SwiperSlide>
        //                     ))
        //                 }
        //             </Swiper>
        //             <div className='flex gap-2 absolute 3xl:-top-24 xl:top-[-16%] lg:top-[-18%] md:top-[-18%] top-[-18%] right-0 disable-selection'>
        //                 <TiArrowLeft
        //                     onClick={(e) => handlePrev(e, 'banner')}
        //                     className={`${sliderStartBanner ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
        //                 />
        //                 <TiArrowRight
        //                     onClick={(e) => handleNext(e, 'banner')}
        //                     className={`${sliderEndBanner ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
        //                 />
        //             </div>
        //         </div>
        //     </div>

        //     <Image
        //         alt="background"
        //         width={1920}
        //         height={1080}
        //         src="/background/banner_background.png"
        //         className='w-full h-[850px] object-fill absolute bottom-0 drop-shadow z-[2]'
        //     />
        // </div>
    )
}

export default SectionBannerPromotion