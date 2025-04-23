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
            case 'list-cars':
                quertyState({ title: 'Hiện chưa có danh sách xe', image: '/nodata/no-data-amico.png' })
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
            case "vehicle-surcharge":
                quertyState({ title: 'Bạn chưa có phụ phí', image: '/profile/mytrip/nodata.png' })
                break;
            case "list-notifications":
                quertyState({ title: 'Chưa có thông báo', image: '/profile/address/nodata.png' })
                break;
            case "list-calendar":
                quertyState({ title: 'Chưa có lịch xe!', image: '/nodata/no-data-calendar.png' })
                break;
            case "policyMobi":
                quertyState({ title: 'Không có dữ liệu', image: '/nodata/no-data-amico.png' })
                break;
            case "policy":
                quertyState({ title: 'Không có dữ liệu', image: '/nodata/no-data-amico.png' })
                break;
            default:
                break;
        }
    }, [type])

    if (!isMounted) return null

    return (
        <div className={`${className}  flex flex-col gap-2 items-center`}>
            <div className={` h-full w-full`}>
                <Image
                    src={data.image ? data.image : ""}
                    alt='nodata'
                    width={1280}
                    height={1024}
                    className={`
                object-contain
                 ${type == 'list-cars' && (isVisibleMobile ? "size-full" : 'w-full h-[400px] ')} 
                 ${type == 'list-car-favorite' && (isVisibleMobile ? "size-full" : 'size-[30%]')} 
                 ${type == 'vehicle-surcharge' && (isVisibleMobile ? "size-full" : 'size-[80%] h-[600px]')} 
                 ${type == 'account' && (isVisibleMobile ? "size-full" : 'size-[50%]')}
                 ${type == 'mytrip' && (isVisibleMobile ? "size-full" : 'size-[50%]')}
                 ${type == 'address' && (isVisibleMobile ? "size-full" : 'size-[50%]')}
                 ${type == 'list-my-car' && (isVisibleMobile ? "size-full" : 'size-[50%]')}
                 ${type == 'list-notifications' && (isVisibleMobile ? "size-full" : 'size-[80%]')}
                 ${type == 'list-calendar' && (isVisibleMobile ? "size-full" : 'size-[45%]')}
                 ${type == 'policy' && (isVisibleMobile ? "size-full" : 'size-[45%]')}
                 mx-auto`} />
            </div>
            <h1 className="3xl:text-lg lg:text-sm text-base font-medium">{data.title}</h1>
        </div>
    )

}
export default Nodata