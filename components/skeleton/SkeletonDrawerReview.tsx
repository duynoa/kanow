import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const SkeletonDrawerReview = (props: Props) => {
    return (
        <div className="flex flex-col py-4 w-full max-w-[92%]">
            <div>
                <Skeleton className='h-10 w-64 rounded-lg' />
            </div>

            <div className='flex flex-col h-full justify-between py-4'>
                <div className='h-[85vh] pr-4'>
                    <div className='flex flex-col gap-4 3xl:pb-6 pb-4'>
                        {
                            [...Array(4)].map((_, index) => (
                                <div key={index} className={`${index !== [...Array(4)]?.length - 1 ? "border-b pb-3 px-2" : ""} flex flex-col gap-2`}>
                                    <div className='flex items-center gap-3'>
                                        <div className='3xl:w-14 3xl:h-14 3xl:max-w-14 w-12 h-12 max-w-12 rounded-full drop-shadow'>
                                            <Skeleton className='w-full h-full rounded-full' />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <Skeleton className='h-4 w-32 rounded-lg' />
                                            <Skeleton className='h-4 w-32 rounded-lg' />
                                        </div>
                                    </div>
                                    <Skeleton className='h-10 w-[80%] rounded-lg' />

                                    <div className='flex flex-wrap gap-2'>
                                        {
                                            [...Array(2)]?.map((__, i: any) => (
                                                <Skeleton key={`skeleton-${i}`} className='px-3 py-1 text-xs w-28 h-8 rounded-2xl cursor-default caret-transparent transition duration-200' />
                                            ))
                                        }
                                    </div>

                                    <div className='flex items-center gap-1'>
                                        {
                                            [...Array(5)].map((_, index) => (
                                                <Skeleton key={index} className='size-3 rounded-md' />
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex items-center justify-center py-2'>
                    <Skeleton className='h-12 w-32 rounded-lg' />
                </div>
            </div>
        </div>
    )
}

export default SkeletonDrawerReview