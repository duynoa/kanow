'use client'
import Image from "next/image"
import { useEffect, useState } from "react"


interface State {
    title: string,
    image: string
}
const Nodata = ({ type, className }: { type: string, className?: string }) => {

    const [data, setData] = useState<State>({ title: '', image: '', })

    const quertyState = (key: any) => setData((prev: State) => ({ ...prev, ...key }))

    useEffect(() => {
        switch (type) {
            case 'account':
                quertyState({ title: 'Không tìm thấy xe nào', image: '/listAddress/nodata.png' })
                break;
            case 'mytrip':
                quertyState({ title: 'Bạn chưa có chuyến', image: '/mytrip/nodata.png' })
                break;
            case "list-car-favorite":
                quertyState({ title: 'Bạn chưa có xe yêu thích', image: '/listAddress/nodata.png' })
                break;
            case 'listAddress':
                quertyState({ title: 'Bạn chưa có địa chỉ nào', image: '/listAddress/nodata.png' })
                break;
            default:
                break;
        }
    }, [type])

    // return <div className={`${className}  h-fit  flex flex-col items-center`}>
    return (
        <div className={`${className}  flex flex-col items-center`}>
            <div className="h-fit">
                {/* <div className="lg:h-[472px] h-fit"> */}
                <Image src={data.image} alt='' width={1280} height={1024} className='object-cover size-full' />
            </div>
            <h1 className="text-[#6F7689] lg:text-base text-sm font-normal leading-6">
                {data.title}
            </h1>
        </div>
    )
}
export default Nodata