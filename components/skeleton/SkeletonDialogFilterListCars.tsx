import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    type: string
}

const SkeletonDialogFilterListCars = ({ type }: Props) => {
    return (
        <>
            {
                type === "type_car_search" &&
                // className này theo ở ngoài
                <>
                    {[...Array(6)].map((_, index) => (
                        <React.Fragment key={`index-${index}`}>
                            <Skeleton className='col-span-1 w-full h-40 rounded-xl' />
                        </React.Fragment>
                    ))}
                </>
            }
            {
                type === "company_car_search" &&
                <div className='grid grid-cols-2 gap-6 w-full'>
                    {[...Array(10)].map((_, index) => (
                        <div key={`index-${index}`} className='col-span-1 flex items-center space-x-3 group'>
                            <Skeleton className='w-4 h-4 rounded-full' />
                            <Skeleton className='w-44 h-8 rounded-full' />
                        </div>
                    ))}
                </div>
            }
        </>
    );
}

export default SkeletonDialogFilterListCars;
