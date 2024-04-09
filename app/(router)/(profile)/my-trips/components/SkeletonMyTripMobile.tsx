import { Skeleton } from "@/components/ui/skeleton"

const SkeletonMyTripMobile = ({ checkStyle }: any) => {
    return <div className={`flex flex-wrap gap-2  bg-white border-[#D7D9E0] ${checkStyle ? 'border-b-0' : 'border-b'} w-full pb-4  relative z-0`}>
        <Skeleton className='w-[43%] h-[112px] relative' />
        <div className='w-[54%] flex flex-col gap-3'>
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
            <Skeleton className='w-full h-4' />
        </div>
        <Skeleton className='w-full h-4' />

    </div>
}
export default SkeletonMyTripMobile