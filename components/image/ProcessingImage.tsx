import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Progress } from '../ui/progress'

type Props = {
    processing: number
    className?: string
}
const ProcessingImage = ({ processing, className, ...props }: Props) => {
    return (
        <Skeleton className={`${className} col-span-1 flex justify-center text-sm items-center h-full text-black`}>
            <div className="flex flex-col gap-1">
                Hình ảnh đang được xử lý...
                <div className="flex items-center gap-2">
                    <Progress value={processing} className="w-full h-2 bg-gray-400" />
                    {processing}%
                </div>
            </div>
        </Skeleton>
    )
}

export default ProcessingImage