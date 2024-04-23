import { Skeleton } from '@/components/ui/skeleton';

const SkeletonDialogPromotions = () => {
    return (
        <div className='flex flex-col gap-4 md:px-6 px-3'>
            <Skeleton className='h-12 w-full' />

            <div className='flex items-center justify-between w-full'>
                <div className='flex gap-3'>
                    <Skeleton className='size-16' />

                    <div className='flex flex-col gap-2'>
                        <Skeleton className='h-7 w-12' />
                        <Skeleton className='h-7 w-52' />
                    </div>
                </div>
                <div>
                    <Skeleton className='h-12 w-24' />
                </div>
            </div>
            <div className='flex items-center justify-between w-full'>
                <div className='flex gap-3'>
                    <Skeleton className='size-16' />

                    <div className='flex flex-col gap-2'>
                        <Skeleton className='h-7 w-12' />
                        <Skeleton className='h-7 w-52' />
                    </div>
                </div>
                <div>
                    <Skeleton className='h-12 w-24' />
                </div>
            </div>
        </div>
    );
}

export default SkeletonDialogPromotions;
