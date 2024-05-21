
import moment from "moment"
import React, { useEffect, useRef, useState } from "react"

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
import { getListNotifications, postReadAllNotifications, postReadSingleNotification } from "@/services/notification/notification.services";
import Nodata from "../image/Nodata";
import LoadingData from "../loadingData/LoadingData";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


const DropdownHeaderNotification = ({ children }: any) => {
    const { isVisibleMobile } = useResize()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const router = useRouter()

    const {
        isStateNotification,
        openDropdownNotification,
        setOpenDialogNotification,
        queryKeyIsStateNotification,
        setOpenDropdownNotification,
    } = useNotification()


    // THÊM MỘT HẰNG SỐ ĐỂ ĐỊNH NGHĨA KHOẢNG ĐỘ CHO PHÉP
    const ALLOWED_OFFSET = 20;
    // SỬ DỤNG TRONG SCROLL ĐỂ NGĂN CHẶN VIỆC GỌI API LIÊN TỤC
    const isAtBottomRef = useRef<boolean>(false);
    // CHECK VỊ TRÍ CUỐI CÙNG
    const lastContainerRef = useRef<HTMLDivElement | null>(null);
    let scrollAreaRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleOpenChange = (open: any) => {
        setOpenDropdownNotification(open)
    }

    useEffect(() => {
        const handleWheel = () => {
            const lastScrollCurrentRef = lastContainerRef.current;
            const scrollCurrent = scrollAreaRef.current;


            if (lastScrollCurrentRef && scrollCurrent) {
                const lastRefBottom = Math.floor(lastScrollCurrentRef.getBoundingClientRect().bottom);
                const currentScroll = Math.floor(scrollCurrent.getBoundingClientRect().bottom);

                if ((currentScroll >= (lastRefBottom - ALLOWED_OFFSET)) && !isAtBottomRef.current && isStateNotification.isLoading.isLoadingScroll === false) {

                    // Bạn đã cuộn đến cuối phần ScrollArea
                    if (isStateNotification.dataListNotifications && isStateNotification.next !== null) {
                        queryKeyIsStateNotification({
                            ...isStateNotification,
                            isLoading: {
                                ...isStateNotification.isLoading,
                                isLoadingScroll: true
                            }
                        });
                        const fetchDataListNotifications = async () => {
                            const dataParams = {
                                current_page: isStateNotification.page,
                                per_page: isStateNotification.limit,
                                type: "customer"
                            }
                            const { data } = await getListNotifications(dataParams);
                            if (data && data?.links && data?.data && data?.base) {
                                const newListNotifications = [...isStateNotification.dataListNotifications, ...data.data]
                                queryKeyIsStateNotification({
                                    dataListNotifications: newListNotifications,
                                    page: isStateNotification.page + 1,
                                    next: data?.links?.next
                                });
                                const lastElementIndex = isStateNotification.dataListNotifications.length - 1;
                                // Lấy id của phần tử đầu tiên trong mảng mới
                                const lastElementId = isStateNotification.dataListNotifications && isStateNotification.dataListNotifications.length > 0 ? `card-${isStateNotification.dataListNotifications[lastElementIndex]?.id}` : "";
                                const lastElement = document.getElementById(lastElementId);

                                if (lastElement) {
                                    const newElementTop = lastElement.getBoundingClientRect().bottom + currentScroll + ALLOWED_OFFSET

                                    window.scrollTo({
                                        top: newElementTop,
                                        behavior: "smooth",
                                    });
                                }

                                queryKeyIsStateNotification({
                                    isLoading: {
                                        ...isStateNotification.isLoading,
                                        isLoadingScroll: false
                                    }
                                });
                            } else {
                                queryKeyIsStateNotification({
                                    dataListNotifications: isStateNotification.dataListNotifications,
                                    next: data?.links?.next,
                                    page: data?.links?.next !== null ? isStateNotification.page + 1 : isStateNotification.page,
                                    isLoading: {
                                        ...isStateNotification.isLoading,
                                        isLoadingScroll: false
                                    }
                                });
                            }
                        };
                        setTimeout(() => fetchDataListNotifications(), 500);
                    } else {
                        console.log("check next false");
                    }

                    isAtBottomRef.current = true;
                } else if (currentScroll < lastRefBottom && isAtBottomRef.current) {
                    isAtBottomRef.current = false;
                }
            }
        };

        const scrollCurrent = scrollAreaRef.current;

        scrollCurrent?.addEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel, { passive: true });

        return () => {
            scrollCurrent?.removeEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);
        };
    }, [
        scrollAreaRef,
        isVisibleMobile,
        openDropdownNotification,
        isStateNotification.next,
        isStateNotification.page,
        isStateNotification.dataListNotifications,
        isStateNotification.isLoading.isLoadingScroll,
    ]);

    const handleClickNotification = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, item: INotification) => {
        console.log('item notification:', item);

        event.preventDefault();
        event.isPropagationStopped()
        if (item.is_read === 0) {
            const postReadNotification = async () => {
                try {
                    const dataPost = {
                        notification_id: item.id
                    }
                    const { data } = await postReadSingleNotification(dataPost)
                    if (data && data.result == 1) {
                        const newData: any = isStateNotification?.dataListNotifications.map((e) => {
                            if (item.id == e.id) {
                                return {
                                    ...e,
                                    is_read: 1
                                }
                            }

                            return e
                        })
                        queryKeyIsStateNotification({
                            ...isStateNotification,
                            dataItemNotification: item,
                            dataListNotifications: newData
                        })
                    }
                } catch (err) {
                    throw err
                }
            }
            postReadNotification()

            if (item.json_data.object === "transaction") {
                // setOpenDialogNotification(true)
                router.push(`/info-rental-car/${item?.json_data?.transaction_id}?type=${item?.json_data?.type}`)
            } else if (item.json_data.object === "driving_liscense_client") {
                router.push(`/account`)
            }
        } else {
            queryKeyIsStateNotification({
                ...isStateNotification,
                dataItemNotification: item,
            })
            if (item.json_data.object === "transaction") {
                // setOpenDialogNotification(true)
                router.push(`/info-rental-car/${item?.json_data?.transaction_id}?type=${item?.json_data?.type}`)
            } else if (item.json_data.object === "driving_liscense_client") {
                router.push(`/account`)
            }
        }
    }

    const handleClickAllNotification = async () => {
        try {
            if (isStateNotification.dataListNotifications.some((item: any) => item.is_read == 0)) {
                const { data: { result, message } } = await postReadAllNotifications({ type: "customer" })
                if (result == 1) {
                    const newData: any = isStateNotification?.dataListNotifications.map((e) => {
                        return {
                            ...e,
                            is_read: 1
                        }
                    })
                    queryKeyIsStateNotification({
                        ...isStateNotification,
                        dataListNotifications: newData
                    })
                }
            }
        } catch (err) {
            throw err
        }
    }

    console.log('isStateNotification', isStateNotification);


    if (!isMounted) return null

    return (
        <DropdownMenu
            // open={openDropdownNotification}
            modal={false}
            onOpenChange={handleOpenChange}
        >
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={isVisibleMobile ? "center" : "end"}
                className={`${isVisibleMobile ? "w-[67%]" : "w-[460px]"} p-1 rounded-xl border-0 shadow`}
            >
                <DropdownMenuLabel className='lg:text-xl text-base px-4 py-2 flex items-center justify-between'>
                    <h1>Thông báo</h1>
                    <Button
                        type="button"
                        onClick={() => handleClickAllNotification()}
                        className="bg-transparent text-[#2FB9BD] 2xl:text-sm text-xs     hover:text-[#2FB9BD]/80 px-4 py-1 hover:bg-transparent">
                        Đọc tất cả
                    </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea
                    className={`${isStateNotification.dataListNotifications?.length > 3 ? "[&>[data-radix-scroll-area-viewport]]:max-h-[350px] pr-3" : "h-auto"}`}
                    ref={scrollAreaRef}
                >
                    {
                        isStateNotification.dataListNotifications && isStateNotification.dataListNotifications.length > 0 ?
                            isStateNotification.dataListNotifications?.map((item: any, index: any) => (
                                <div key={`key-${item.id}`} className='m-2'>
                                    {index != 0 && <DropdownMenuSeparator className="my-2" />}
                                    <DropdownMenuItem
                                        onClick={(event) => handleClickNotification(event, item)}
                                        className={`${item.is_read != 1 ? "bg-[#F1FCFC]" : ""} focus:bg-[#64E4E4]/30 flex items-start gap-3 px-2 cursor-pointer`}

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
                            :
                            <Nodata type="list-notifications" className='h-full w-full' />
                    }
                    {
                        isStateNotification.isLoading?.isLoadingScroll && <LoadingData />
                    }
                    <div ref={lastContainerRef} />
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
export default DropdownHeaderNotification