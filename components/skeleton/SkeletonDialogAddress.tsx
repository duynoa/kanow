import { Skeleton } from '@/components/ui/skeleton';

const SkeletonDialogAddress = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <Skeleton className='h-6 w-36' />
                <div className='flex flex-row flex-wrap gap-2'>
                    <Skeleton className='h-11 w-32 rounded-3xl' />
                    <Skeleton className='h-11 w-32 rounded-3xl' />
                    <Skeleton className='h-11 w-32 rounded-3xl' />
                </div>
            </div>
        </div>
    );
}

export default SkeletonDialogAddress;
