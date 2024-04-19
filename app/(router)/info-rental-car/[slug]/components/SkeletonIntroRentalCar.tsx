import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useResize } from '@/hooks/useResize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDataInfoRentalCar } from '@/hooks/useDataQueryKey';
import { PiCheckBold } from 'react-icons/pi';

const SkeletonIntroRentalCar = () => {
    const { isVisibleTablet, isVisibleMobile } = useResize()
    const dataStep = [
        {
            id: 1212,
            title: "Gửi yêu cầu",
            icon: <PiCheckBold className='size-5' />,
            status: 0,
            index: 0,
        },
        {
            id: 1214142,
            title: "Duyệt yêu cầu",
            icon: <PiCheckBold className='size-5' />,
            status: 1,
            index: 1,
        },
        {
            id: 121552,
            title: "Thanh toán cọc",
            icon: <PiCheckBold className='size-5' />,
            status: 2,
            index: 2,
        },
        {
            id: 1214442,
            title: "Khởi hành",
            icon: <PiCheckBold className='size-5' />,
            status: 3,
            index: 3
        },
        {
            id: 1212555,
            title: "Kết thúc",
            icon: <PiCheckBold className='size-5' />,
            status: 4,
            index: 4
        },
    ]

    const { isStateInfoRentalCar } = useDataInfoRentalCar()

    return (
        <div>
            <div className='w-full max-w-full bg-white/50'>
                <div className='3xl:pt-8 3xl:pb-16 pt-6 pb-12 custom-container flex md:gap-3 gap-2 items-center justify-center caret-transparent md:overflow-hidden overflow-auto'>
                    {
                        dataStep?.map((step, index) => {
                            return (
                                <div key={step.id} className='flex items-center md:gap-3 gap-2'>
                                    <Skeleton className='3xl:size-12 size-10 3xl:max-w-12 max-w-10 rounded-full border' />

                                    {
                                        isVisibleMobile ?
                                            null
                                            :
                                            <Skeleton className='h-6 w-28' />
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='custom-container 3xl:mt-8 mt-4 flex lg:flex-row flex-col gap-6'>
                <div className='flex flex-col gap-6 xxl:w-[70%] xxl:max-w-[70%] lg:w-[65%] lg:max-w-[65%] w-full max-w-full h-full pb-16 lg:order-none order-2'>
                    <div className='flex md:flex-row flex-col md:items-center 3xl:gap-4 gap-4 3xl:pb-6 pb-4 border-b'>
                        <div className='md:w-56 md:h-36 w-full h-52'>
                            <Skeleton className='h-full w-full' />
                        </div>

                        <div className='flex flex-col justify-between gap-3 h-full'>
                            <Skeleton className='h-6 w-32' />
                            <Skeleton className='h-6 w-52' />
                            <Skeleton className='h-6 w-60' />
                            <Skeleton className='h-6 w-40' />
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

export default SkeletonIntroRentalCar;
