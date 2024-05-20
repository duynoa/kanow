import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const SkeletonCalendar = (props: Props) => {
    return (
        <div className='flex flex-col 3xl:gap-10 gap-8'>
            {
                [...Array(1)].map((item, index) => (
                    <div key={`skeleton-${index}`} className='flex flex-col 3xl:gap-6 gap-4'>
                        <div className='w-full flex items-center justify-center text-xl font-semibold text-[#2FB9BD] uppercase'>
                            <Skeleton className='w-40 3xl:h-14 h-12' />
                        </div>

                        <div className='flex flex-col 3xl:gap-4 gap-2'>
                            <Skeleton className='w-full 3xl:h-14 h-12' />


                            {/* Render các ngày trong tuần */}
                            <div className='grid grid-cols-7 gap-1 items-center border-[#F4F4F4] border-l border-t'>
                                {
                                    [...Array(35)].map((item, index) => (
                                        <Skeleton
                                            key={`index-week-${index}`}
                                            className='col-span-1 border-[#F4F4F4] border 3xl:gap-1 gap-0 w-full 3xl:h-14 h-12 group text-center'
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SkeletonCalendar