import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const SkeletonListRelated = (props: Props) => {
    return (
        <div className="grid grid-cols-4 gap-4 w-full">
            {
                [...Array(4)].map((item, index) => (
                    <div
                        key={`index-${index}`}
                        className='bg-white border p-4 flex flex-col gap-4 rounded-xl relative z-0 transition duration-200 ease-in-out group'
                    >
                        <Skeleton className='w-full 3xl:h-[220px] xxl:h-[180px] xl:h-[180px] h-[180px] relative overflow-hidden rounded-xl' />
                        <div className='flex flex-col gap-2'>
                            <Skeleton className='w-full h-10' />
                            <Skeleton className='w-full h-20' />
                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default SkeletonListRelated