import { Skeleton } from '@/components/ui/skeleton';

const SkeletonDialogCancelCar = () => {
    return (
        <div className='flex flex-col gap-4 md:px-6 px-3'>
            <div className='flex flex-col gap-2'>
                <Skeleton className='h-6 w-36' />
                <div className='flex flex-row flex-wrap gap-2'>
                    <Skeleton className='h-10 w-28 rounded-3xl' />
                    <Skeleton className='h-10 w-28 rounded-3xl' />
                    <Skeleton className='h-10 w-28 rounded-3xl' />
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <Skeleton className='h-6 w-24' />
                <Skeleton className='h-40 w-full rounded-lg' />
            </div>
            <div className='flex flex-row justify-end items-center gap-2'>
                <Skeleton className='h-12 w-24 rounded-2xl' />
                <Skeleton className='h-12 w-32 rounded-2xl' />
            </div>
        </div>
    );
}

export default SkeletonDialogCancelCar;
