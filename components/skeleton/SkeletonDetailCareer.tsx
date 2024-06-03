import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const SkeletonDetailCareer = (props: Props) => {
    return (
        <>
            <Skeleton className="w-full h-52 bg-cover bg-no-repeat bg-center rounded-xl flex justify-center items-center" />
            <Skeleton className="w-full h-44 bg-cover bg-no-repeat bg-center rounded-xl flex justify-center items-center" />

            <div className='flex flex-col gap-4'>
                <Skeleton className='w-60 h-12' />
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-full h-6' />
                    <Skeleton className='w-[60%] h-6' />
                    <Skeleton className='w-[30%] h-6' />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <Skeleton className='w-72 h-12' />
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-full h-6' />
                    <Skeleton className='w-[60%] h-6' />
                    <Skeleton className='w-[30%] h-6' />
                    <Skeleton className='w-[50%] h-6' />
                    <Skeleton className='w-[40%] h-6' />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <Skeleton className='w-44 h-12' />
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-[80%] h-6' />
                    <Skeleton className='w-[50%] h-6' />
                    <Skeleton className='w-[40%] h-6' />
                    <Skeleton className='w-[80%] h-6' />
                    <Skeleton className='w-[20%] h-6' />
                    <Skeleton className='w-[30%] h-6' />
                    <Skeleton className='w-[60%] h-6' />
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <Skeleton className='w-52 h-12' />
                <div className='flex flex-col gap-2'>
                  
                <Skeleton className='w-[80%] h-6' />
                    <Skeleton className='w-[20%] h-6' />
                    <Skeleton className='w-[40%] h-6' />
                    <Skeleton className='w-[50%] h-6' />
                    <Skeleton className='w-[30%] h-6' />
                    <Skeleton className='w-[80%] h-6' />
                    <Skeleton className='w-[60%] h-6' />
                </div>
            </div>
        </>
    )
}

export default SkeletonDetailCareer