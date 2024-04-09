import { Skeleton } from "@/components/ui/skeleton"

const SkeletonMyTrip = ({ checkStyle }: any) => {
    return <div
        className={` flex lg:items-center lg:flex-nowrap items-start flex-wrap lg:gap-6 gap-3  bg-white border-[#D7D9E0] ${checkStyle ? 'border-b-0' : 'border-b'} w-full pb-6  relative z-0`}
    >
        <Skeleton className='lg:w-[20%] w-[35%] lg:h-[170px] h-[140px] relative' />
        <div className='lg:w-[35%] w-[60%] flex flex-col 3xl:gap-2 xxl:gap-2.5 2xl:gap-2 xl:gap-2 lg:gap-2 gap-3'>
            <Skeleton className='w-full h-5' />
            <Skeleton className='w-full h-5' />
            <Skeleton className='w-full h-5' />
        </div>
        <div className='lg:w-[45%] w-full flex lg:justify-end justify-between  lg:gap-12 gap-8 lg:mt-0 mt-2'>
            <div className='flex flex-col gap-2 w-full'>
                <Skeleton className='w-full h-5' />
                <Skeleton className='w-full h-5' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <Skeleton className='w-full h-5' />
                <Skeleton className='w-full h-5' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <Skeleton className='w-full h-5' />
                <Skeleton className='w-full h-5' />
            </div>
        </div>
    </div>
}
export default SkeletonMyTrip