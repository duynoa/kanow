'use client'
import { useResize } from "@/hooks/useResize"
import Image from "next/image"
import { useEffect, useState } from "react"


interface State {
    title: string,
    image: string
}
const Nodata = ({ type, className }: { type: string, className?: string }) => {
    const { isVisibleMobile } = useResize()

    const [data, setData] = useState<State>({ title: '', image: '', })

    const quertyState = (key: any) => setData((prev: State) => ({ ...prev, ...key }))

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        switch (type) {
            case 'account':
                quertyState({ title: 'Không tìm thấy xe nào', image: '/profile/account/nodata.png' })
                break;
            case 'mytrip':
                quertyState({ title: 'Hiện tại bạn chưa có chuyến nào', image: '/profile/mytrip/nodata.png' })
                break;
            case "list-car-favorite":
                quertyState({ title: 'Bạn chưa có xe yêu thích', image: '/profile/car-favorite/nodata.png' })
                break;
            case 'address':
                quertyState({ title: 'Bạn chưa có địa chỉ nào', image: '/profile/address/nodata.png' })
                break;
            case 'list-my-car':
                quertyState({ title: 'Bạn chưa có xe nào', image: '/profile/account/nodata.png' })
                break;
            default:
                break;
        }
    }, [type])

    if (!isMounted) return null

    // return <div className={`${className}  h-fit  flex flex-col items-center`}>
    return <div className={`${className}  flex flex-col gap-4 items-center`}>
        <div className="h-full w-full">
            {/* <div className="lg:h-[472px] h-fit"> */}
            <Image
                src={data.image ? data.image : ""}
                alt='hi'
                width={1280}
                height={1024}
                className={`object-cover
                 ${type == 'list-car-favorite' && (isVisibleMobile ? "size-full" : 'size-[30%]')} 
                 ${type == 'account' && (isVisibleMobile ? "size-full" : 'size-[50%]')}
                 ${type == 'mytrip' && (isVisibleMobile ? "size-full" : 'size-[40%]')}
                 ${type == 'address' && (isVisibleMobile ? "size-full" : 'size-[50%]')}
                 ${type == 'list-my-car' && (isVisibleMobile ? "size-full" : 'size-[50%]')}
                 mx-auto`} />
        </div>
        <h1 className="lg:text-sm text-xs">{data.title}</h1>
    </div>

}
export default Nodata