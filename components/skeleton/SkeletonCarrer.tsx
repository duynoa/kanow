import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const SkeletonCarrer = (props: Props) => {
    return (
        <div className='flex flex-col gap-8'>
            <div className='grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-6 gap-4 justify-start h-full w-full'>
                {
                    [...Array(8)].map((_, index) => (
                        <div
                            key={`index-${index}`}
                            className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 group hover:scale-[1.02] transition duration-200 ease-in-out'
                        >
                            <Skeleton className='w-[60%] h-6' />
                            <Skeleton className='w-[40%] h-6' />
                            <Skeleton className='w-[80%] h-6' />
                            <Skeleton className='w-[100%] h-6' />
                            <Skeleton className='w-[50%] h-6' />
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

export default SkeletonCarrer