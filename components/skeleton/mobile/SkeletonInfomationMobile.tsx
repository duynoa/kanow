import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

type Props = {}

const SkeletonInfomationMobile = (props: Props) => {
    return (
        <div className="space-y-4" >
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {
                    [...Array(7)].map((_, index) => (
                        <div
                            key={`index-${index}`}
                            className='flex flex-col gap-1'
                        >
                            <Skeleton className={`${index % 2 === 0 ?"w-[20%]" : "w-[40%]"} h-5`} />
                            <Skeleton className='w-full h-10' />
                        </div>
                    ))

                }

            </div>
        </div >
    )
}

export default SkeletonInfomationMobile