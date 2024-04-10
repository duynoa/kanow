import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <div className={` w-full h-screen flex flex-col gap-12 items-center justify-center`} >
                <div className="h-auto animate-bounce">
                    <Image src={'/underDeveloper/not.png'} width={1280} height={1024} alt="" className="size-full object-cover" />
                </div>
                <div className="text-center flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-[#2FB9BD] leading-6">
                        Không tìm thấy trang 404
                    </h1>
                    <h5 className="italic text-sm leading-5 font-light">
                        The page could not be found 404
                    </h5>
                </div>
            </div>
        </div>
    )
}