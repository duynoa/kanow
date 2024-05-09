
import moment from "moment"
import React, { useEffect, useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ScrollArea } from "../ui/scroll-area"

import { FcCancel } from "react-icons/fc";
import { IoMdNotificationsOutline } from "react-icons/io"

import { useNotification } from "@/hooks/useNotification"
import { useResize } from "@/hooks/useResize"
import { INotification } from "@/types/Notification/INotification";
import { postReadSingleNotification } from "@/services/notification/notification.services";


const DropdownHeaderNotification = ({ children }: any) => {
    const { isVisibleMobile } = useResize()
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const {
        dataListNotifications,
        openDropdownNotification,
        openDialogNotification,
        setDataItemNotification,
        setDataListNotifications,
        setOpenDialogNotification,
        setOpenDropdownNotification,
        setIsLoadingNotification
    } = useNotification()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    console.log('dataListNotifications', dataListNotifications);

    const handleClickNotification = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: INotification) => {
        event.preventDefault();
        event.isPropagationStopped()
        console.log('item', item);


        if (item.is_read === 0) {
            const postReadNotification = async () => {
                try {
                    const dataPost = {
                        notification_id: item.id
                    }

                    const { data } = await postReadSingleNotification(dataPost)
                    console.log('data', data);
                    if (data && data.result == 1) {
                        const newData: any = dataListNotifications.map((e) => {
                            if (item.id == e.id) {
                                return {
                                    ...e,
                                    is_read: 1
                                }
                            }

                            return e
                        })

                        console.log('newData', newData);
                        setDataItemNotification(item)
                        setDataListNotifications(newData)
                        setOpenDialogNotification(true)
                    }
                } catch (err) {
                    throw err
                }
            }

            postReadNotification()
        } else {
            setDataItemNotification(item)
            setOpenDialogNotification(true)
        }
    }


    if (!isMounted) return null

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={isVisibleMobile ? "center" : "end"}
                className={`${isVisibleMobile ? "w-[67%]" : "w-[460px]"} p-1 rounded-xl border-0 shadow`}
            >
                <DropdownMenuLabel className='lg:text-xl text-base px-4 py-2'>
                    Thông báo
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className={`${dataListNotifications?.length > 3 ? "h-[350px] pr-3" : "h-auto"}`}>
                    {
                        dataListNotifications && dataListNotifications?.map((item: any, index: any) => (
                            <div key={`key-${item.id}`} className='m-2'>
                                {index != 0 && <DropdownMenuSeparator className="my-2" />}
                                <DropdownMenuItem
                                    onClick={(event) => handleClickNotification(event, item)}
                                    className={`${item.is_read != 1 ? "bg-[#F1FCFC]" : ""} hover:bg-[#64E4E4]/30 flex items-start gap-3 px-2 cursor-pointer`}
                                >
                                    {
                                        item.object_type != "2" && item.object_type != 4 ?
                                            <div className='bg-[#2FB9BD] rounded-full p-2 w-fit h-fit'>
                                                <IoMdNotificationsOutline className='text-white text-2xl' />
                                            </div>
                                            :
                                            <div className='bg-[#D50000]/20 rounded-full p-2 w-fit h-fit'>
                                                <FcCancel className='text-white text-2xl' />
                                            </div>
                                    }

                                    <div className="flex items-center gap-2 w-full">
                                        <div className="flex flex-col gap-2 w-[95%]">
                                            <h1 className='lg:text-base text-sm font-semibold leading-5 text-[#16171B]'>
                                                {item.title ? item.title : ""}
                                            </h1>
                                            <div className="flex flex-col">
                                                <h1 className='lg:text-sm text-xs font-light leading-5 text-wrap'>
                                                    {item.content ? item.content : ""}
                                                </h1>
                                                <h1 className='lg:text-xs text-xs text-gray-400 font-semibold'>
                                                    {
                                                        moment().subtract(1, "days").isSame(moment(item?.created_at, "DD/MM/YYYY"), "day")
                                                            ? `Hôm qua lúc ${moment(item?.created_at).format("HH:mm")}`
                                                            : moment(item?.created_at).fromNow()
                                                    }
                                                </h1>
                                            </div>
                                        </div>

                                        {
                                            item.is_read != 1 ?
                                                <div className="w-[5%]">
                                                    <div className='size-2 mx-auto bg-[#2FB9BD] rounded-full'></div>
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </DropdownMenuItem>
                            </div>
                        ))
                    }
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default DropdownHeaderNotification