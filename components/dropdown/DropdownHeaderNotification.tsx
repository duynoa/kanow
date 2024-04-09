import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { ScrollArea } from "../ui/scroll-area"
import Link from "next/link"
import { IoMdNotificationsOutline } from "react-icons/io"
import moment from "moment"
import { useNotification } from "@/hooks/useNotification"
import { Button } from "../ui/button"
import { useResize } from "@/hooks/useResize"
const DropdownHeaderNotification = ({ children }: any) => {
    const { isVisibleMobile } = useResize()
    const { dataNotification: data, setOpenNotification, openNotification } = useNotification()

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isVisibleMobile ? "center" : "end"} className={`${isVisibleMobile ? "w-[67%]" : "w-[500px]"} rounded-xl border-0 shadow`}>
                <DropdownMenuLabel className='lg:text-xl text-base py-4'> Thông báo</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className={`${data?.length > 3 ? "h-[350px]" : "h-auto"}`}>
                    {
                        data && data?.map((item: any, index: any) => (
                            <>
                                {index != 0 && <DropdownMenuSeparator />}
                                <DropdownMenuItem key={item.id}>
                                    <Link
                                        href={item.link}
                                        // onClick={() => setOpenNotification(false)}
                                        className='flex items-start gap-4 '
                                    >
                                        <div className='bg-[#2FB9BD] rounded-full p-2 w-fit h-fit'>
                                            <IoMdNotificationsOutline className='text-white text-2xl' />
                                        </div>
                                        <div className="flex items-center gap-2 w-full">
                                            <div className="flex flex-col gap-2 w-[95%]">
                                                <h1 className='font-medium lg:text-base text-sm leading-5 text-[#16171B]'>{item.title}</h1>
                                                <div className="">
                                                    <h1 className='lg:text-sm text-xs font-normal leading-5 text-wrap'>{item.desription}</h1>
                                                    <h1 className='lg:text-sm text-xs text-gray-400'>{
                                                        moment().subtract(1, "days").isSame(moment(item?.time, "DD/MM/YYYY"), "day")
                                                            ? `Hôm qua lúc ${moment(item?.time).format("HH:mm")}`
                                                            : moment(item?.time).fromNow()
                                                    }</h1>
                                                </div>
                                            </div>
                                            <div className="w-[5%]">
                                                <div className='size-2 mx-auto bg-[#2FB9BD] rounded-full'></div>
                                            </div>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        ))
                    }
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default DropdownHeaderNotification