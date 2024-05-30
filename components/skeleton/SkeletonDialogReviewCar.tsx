import { Skeleton } from '@/components/ui/skeleton';

const SkeletonDialogReviewCar = () => {
    return (
        <div className='flex flex-col gap-4 md:px-6 px-3'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <Skeleton className='h-6 w-36' />
                    <div className='flex items-center gap-1'>
                        {
                            [...Array(5)].map((_, index) => (
                                <Skeleton key={index} className='size-6' />
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-row flex-wrap gap-2'>
                    <Skeleton className='h-10 w-28 rounded-3xl' />
                    <Skeleton className='h-10 w-28 rounded-3xl' />
                    <Skeleton className='h-10 w-28 rounded-3xl' />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <Skeleton className='h-40 w-full rounded-lg' />
            </div>

            <Skeleton className='h-14 w-full rounded-xl' />
        </div >
    );
}

export default SkeletonDialogReviewCar;
