import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const SkeletonNewsEvents = (props: Props) => {
    return (
        <div className='custom-container flex flex-col gap-8 xl:py-10 py-6'>
            <Skeleton className='w-64 h-12' />

            <div className='grid grid-cols-3 3xl:gap-8 xl:gap-6 gap-4 w-full h-full'>
                <div className='w-full lg:col-span-2 col-span-3 3xl:h-[532px] 2xl:h-[480px] xxl:h-[480px] xl:h-[464px] lg:h-[416px] md:h-[320px] h-[200px]'>
                    <Skeleton className='w-full h-full' />
                </div>

                <div className='w-full lg:col-span-1 col-span-3 grid grid-rows-2 3xl:h-[532px] 2xl:h-[480px] xxl:h-[480px] xl:h-[464px] lg:h-[416px] md:h-[656px] h-[416px] 3xl:gap-8 xl:gap-6 gap-4'>
                    {
                        [...Array(2)].map((_, index) => (
                            <Skeleton
                                key={`index1212-${index}`}
                                className='col-span-1 border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 group hover:scale-[1.02] '
                            />

                        ))
                    }
                </div>
            </div>

            <div className='grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-6 gap-4 justify-start h-full w-full'>
                {
                    [...Array(4)].map((_, index) => (
                        <div
                            key={`index-${index}`}
                            className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 group hover:scale-[1.02] transition duration-200 ease-in-out'
                        >
                            <Skeleton className='w-full 3xl:h-[220px] xxl:h-[180px] xl:h-[180px] h-[180px]' />
                            <div className='flex flex-col gap-2'>
                                <Skeleton className='w-56 h-10' />
                                <Skeleton className='w-full h-20' />
                            </div>
                        </div>

                    ))
                }
            </div>

            <div className='flex justify-center items-center gap-2'>
                {
                    [...Array(5)].map((_, index) => (
                        <Skeleton key={`pagination-${index}`} className='size-10' />
                    ))
                }
            </div>
        </div>
    )
}

export default SkeletonNewsEvents