// components/SkeletonPayment.tsx
import React from 'react';
import { Skeleton } from '../ui/skeleton';

type Props = {
    type?: "list" | "method" | "money"
}

const SkeletonPayment = ({ type }: Props) => {
    return (
        <>
            {
                type === "list" &&
                <div className="flex flex-col gap-3">
                    {
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="flex flex-col px-4 py-3 bg-white rounded-xl">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="w-14 h-14" />
                                    <Skeleton className="w-full h-10" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            {
                type === "money" &&
                <Skeleton className="w-40 h-9" />
            }
            {
                type === "method" &&
                <Skeleton className="w-full h-10" />
            }
        </>
    );
};

export default SkeletonPayment;
