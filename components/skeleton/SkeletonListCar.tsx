import { Skeleton } from '@/components/ui/skeleton';

const SkeletonListCar = () => {
    return (
        <div className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'>
            <div className='w-full 3xl:h-[230px] xxl:h-[160px] xl:h-[180px] h-[180px] relative'>
                <Skeleton className='h-full w-full' />
            </div>
            <div className='flex items-center gap-2 mt-2'>
                <Skeleton className='h-6 w-full' />
            </div>
            <div className='flex gap-3 items-center'>
                <div className='3xl:w-12 3xl:max-w-12 3xl:h-12 w-10 max-w-10 h-10 '>
                    <Skeleton className='h-full w-full rounded-full' />
                </div>
                <div className='flex flex-col gap-1 w-[80%] max-w-[80%]'>
                    <Skeleton className='h-6 w-full' />
                    <Skeleton className='h-6 w-full' />
                </div>
            </div>
            <div className='border-b border-[#D7D9E0]/50' />
            <Skeleton className='h-6 w-full' />
        </div>
    );
}

export default SkeletonListCar;
