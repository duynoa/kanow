import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const SkeletonDetailNewsEvents = (props: Props) => {
    return (
        <>
            <Skeleton className="md:mt-14 mt-10 w-full md:h-[50dvh] h-[30dvh] bg-cover bg-no-repeat bg-center rounded-xl flex justify-center items-center" />

            <div className='flex flex-col gap-3 custom-container'>
                <Skeleton className='w-full h-14' />
                <div className='flex flex-col gap-2 mt-6'>
                    <Skeleton className='w-full h-6' />
                    <Skeleton className='w-[60%] h-6' />
                    <Skeleton className='w-[30%] h-6' />
                    <Skeleton className='w-[20%] h-6' />
                    <Skeleton className='w-[50%] h-6' />
                    <Skeleton className='w-[40%] h-6' />
                    <Skeleton className='w-[80%] h-6' />
                    <Skeleton className='w-[50%] h-6' />
                    <Skeleton className='w-[40%] h-6' />
                    <Skeleton className='w-[80%] h-6' />
                    <Skeleton className='w-[20%] h-6' />
                    <Skeleton className='w-[30%] h-6' />
                    <Skeleton className='w-[60%] h-6' />
                </div>
            </div>
        </>
    )
}

export default SkeletonDetailNewsEvents