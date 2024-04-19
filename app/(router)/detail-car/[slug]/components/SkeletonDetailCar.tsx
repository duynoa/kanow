import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useResize } from '@/hooks/useResize';
import { Swiper, SwiperSlide } from 'swiper/react';

const SkeletonDetailCar = () => {
    const { isVisibleTablet, isVisibleMobile } = useResize()

    return (
        <div>
            {
                <div className='custom-container'>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
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
                        className='custom-swiper-detail-car w-full 3xl:h-[330px] xl:h-[280px] lg:h-[240px] md:h-[380px] h-[240px]'
                    >
                        {
                            [...Array(3)].map((_, index) => (
                                <SwiperSlide key={`carDetail-${index}`}>
                                    <div className='w-full 3xl:h-[300px] xl:h-[240px] lg:h-[200px] md:h-[380px] h-[240px] lg:rounded-2xl cursor-pointer'>
                                        <Skeleton className='h-full w-full' />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            }

            <div className='custom-container flex lg:flex-row flex-col gap-6'>
                <div className='flex flex-col gap-6 xxl:w-[70%] xxl:max-w-[70%] lg:w-[65%] lg:max-w-[65%] w-full max-w-full h-full pb-16 lg:order-none order-2'>
                    <div className='flex flex-row items-center justify-between 3xl:pb-6 pb-4 border-b'>
                        <div className='flex flex-col gap-2 w-full'>
                            <Skeleton className='h-12 w-full' />

                            <div className='flex md:flex-row flex-col gap-3 md:items-center items-start'>
                                <Skeleton className='h-6 w-32' />
                                <Skeleton className='h-6 w-32' />
                            </div>
                        </div>
                    </div>

                    <div id="section-1" className='flex flex-col gap-2 3xl:pb-6 pb-4 border-b'>
                        <Skeleton className='h-12 w-32' />
                        <div className='flex flex-row justify-between gap-4 items-center max-w-full'>
                            <Skeleton className='h-14 w-full' />
                            <Skeleton className='h-14 w-full' />
                            <Skeleton className='h-14 w-full' />
                            <Skeleton className='h-14 w-full' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 3xl:pb-6 pb-4 border-b'>
                        <Skeleton className='h-12 w-32' />
                        <Skeleton className='h-20 w-full' />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Skeleton className='h-12 w-32' />
                        <div className='grid md:grid-cols-4 grid-cols-2 gap-2'>
                            {
                                [...Array(8)].map((_, index) => (
                                    <Skeleton key={`carDetail-${index}`} className='col-span-1 h-8 w-full' />
                                ))
                            }
                        </div>
                    </div>
                </div >

                <div className='flex flex-col 3xl:gap-4 lg:gap-2 gap-4 xxl:w-[30%] xxl:max-w-[30%] lg:w-[35%] lg:max-w-[35%] w-full max-w-full h-full lg:order-none order-1'>
                    <div className='flex flex-col gap-2 rounded-2xl '>
                        <Skeleton className='h-12 w-full' />
                        <Skeleton className='h-20 w-full' />
                        <Skeleton className='h-12 w-full' />
                    </div>

                    <div className='flex flex-col 3xl:gap-6 gap-4 xl:p-6 p-4 bg-white border rounded-2xl'>
                        <Skeleton className='h-12 w-full' />
                        <Skeleton className='h-44 w-full' />
                        <Skeleton className='h-12 w-full' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkeletonDetailCar;
