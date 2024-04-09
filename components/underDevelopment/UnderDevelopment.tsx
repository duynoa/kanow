import Image from "next/image"

const UnderDevelopment = ({ className, ...props }: { className?: string }) => {
    return (
        <div {...props} className={` ${className}
         w-full h-screen flex flex-col gap-12 items-center justify-center`}
        >
            <div className="h-auto animate-bounce">
                <Image src={'/underDeveloper/not.png'} width={1280} height={1024} alt="" className="size-full object-cover" />
            </div>
            <div className="text-center flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-[#2FB9BD] leading-6">
                    Chức năng đang trong quá trình phát triển
                </h1>
                <h5 className="italic text-sm leading-5 font-light">
                    This position is in the process of development
                </h5>
            </div>
        </div>

    )
}
export default UnderDevelopment