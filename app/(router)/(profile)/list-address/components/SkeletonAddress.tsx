import { Skeleton } from "@/components/ui/skeleton"

const SkeletonAddress = () => {
    return (
        <div className={`flex w-full items-center gap-6 2xl:py-6 lg:py-4 py-6 px-4 rounded-3xl border `}>
            <Skeleton className="lg:size-7 size-6 w-[10%]" />
            <div className="w-[90%] flex flex-col gap-2">
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-full h-5" />
            </div>
            <div className="w-[10%] flex items-center justify-center">
                <Skeleton className="size-5" />
            </div>
        </div>
    )
}

export default SkeletonAddress