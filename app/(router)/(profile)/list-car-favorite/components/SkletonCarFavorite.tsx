import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const SkeletonCarFavorite = () => {
    return (
        <div
            className='flex lg:flex-nowrap flex-wrap lg:gap-6 gap-2 xl:items-start lg:items-center items-start bg-white border-[#D7D9E0] border w-full p-4 rounded-xl relative z-0'
        >
            <Link
                href={'#'}
                prefetch={false}
                className='3xl:w-[30%] xxl:w-[35%]  2xl:w-[35%] xl:w-[40%] lg:w-[45%] w-full 3xl:h-[210px] xxl:h-[190px] 2xl:h-[190px] xl:h-[175px] lg:h-[170px] md:h-[280px] h-[200px] relative'>
                <Skeleton className='rounded-xl h-full w-full object-cover' />
            </Link>
            <div className='3xl:w-[50%] xxl:w-[45%] 2xl:w-[45%] xl:w-[40%] lg:w-[45%] w-full flex flex-col 3xl:gap-2 xxl:gap-2.5 2xl:gap-2 xl:gap-2 lg:gap-2 gap-2'>
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
                <Skeleton className='h-6 w-full' />
            </div>
            <div className='3xl:w-[20%] xxl:w-[20%] 2xl:w-[20%] xl:w-[20%] lg:w-[15%] w-full flex lg:flex-col flex-row justify-start items-center lg:gap-2 gap-4  mt-2'>
                <Skeleton className="lg:size-11 size-10 lg:block hidden rounded-full" />
                <Skeleton className='w-full h-6' />
                <Skeleton className='w-full h-6' />
            </div>
        </div >
    );
}

export default SkeletonCarFavorite;
