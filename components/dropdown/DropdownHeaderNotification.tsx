
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
import { getListNotifications, postReadSingleNotification } from "@/services/notification/notification.services";
import Nodata from "../image/Nodata";
import LoadingData from "../loadingData/LoadingData";


const DropdownHeaderNotification = ({ children }: any) => {
    const { isVisibleMobile } = useResize()
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const {
        isStateNotification,
        setOpenDialogNotification,
        queryKeyIsStateNotification,
    } = useNotification()

    // THÊM MỘT HẰNG SỐ ĐỂ ĐỊNH NGHĨA KHOẢNG ĐỘ CHO PHÉP
    const ALLOWED_OFFSET = 50;
    // SỬ DỤNG TRONG SCROLL ĐỂ NGĂN CHẶN VIỆC GỌI API LIÊN TỤC
    const isAtBottomRef = useRef<boolean>(false);
    // CHECK VỊ TRÍ CUỐI CÙNG
    const lastContainerRef = useRef<HTMLDivElement | null>(null);
    // let scrollAreaRef = useRef<any | null>(null);


    useEffect(() => {
        setIsMounted(true)
    }, [])

    // SCROLL XUỐNG ĐẾN CUỐI MẢNG THÌ SẼ FETCH LẠI DATA ĐỂ THỰC HIỆN SỰ KIỆN LOADMORE
    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        const { currentTarget, deltaY, pageX, pageY } = event;

        console.log('currentTarget', currentTarget)


        if (currentTarget) {
            const isScrollingDown = deltaY > 0;
            const scrollHeight = currentTarget.scrollHeight;
            const scrollTop = currentTarget.scrollTop;
            const clientHeight = currentTarget.clientHeight;
            const clientWidth = currentTarget.clientWidth;

            const isAtBottom =
                scrollTop + clientHeight >= scrollHeight - ALLOWED_OFFSET &&
                pageY >= currentTarget.getBoundingClientRect().bottom - ALLOWED_OFFSET;
            const isAtTop = scrollTop === 0 && pageY <= currentTarget.getBoundingClientRect().top + ALLOWED_OFFSET;
            const isAtRight =
                currentTarget.scrollLeft + clientWidth >= currentTarget.scrollWidth - ALLOWED_OFFSET &&
                pageX >= currentTarget.getBoundingClientRect().right - ALLOWED_OFFSET;
            const isAtLeft =
                currentTarget.scrollLeft === 0 && pageX <= currentTarget.getBoundingClientRect().left + ALLOWED_OFFSET;

            console.log('isScrollingDown', isScrollingDown);

            console.log('scrollHeight', scrollHeight);
            console.log('scrollTop', scrollTop);
            console.log('clientHeight', clientHeight);
            console.log('clientWidth', clientWidth);


            if (isScrollingDown && isAtBottom && !isStateNotification.isLoading.isLoadingScroll) {
                // Bạn đã cuộn đến cuối phần ScrollArea
                // Xử lý logic ở đây
                console.log('1');

            } else if (!isScrollingDown && isAtTop) {
                console.log('2');
                // Bạn đã cuộn đến đầu phần ScrollArea
                // Xử lý logic ở đây nếu cần
            } else if (isAtRight) {
                console.log('3');
                // Bạn đã cuộn đến phía bên phải của ScrollArea
                // Xử lý logic ở đây nếu cần
            } else if (isAtLeft) {
                console.log('4');
                // Bạn đã cuộn đến phía bên trái của ScrollArea
                // Xử lý logic ở đây nếu cần
            }

        }
    };


    // useEffect(() => {
    // const handleWheel = (event: any) => {
    //     const lastScrollCurrentRef = lastContainerRef.current;
    //     console.log('event', event);
    //     console.log('lastScrollCurrentRef', lastScrollCurrentRef);

    //     if (lastScrollCurrentRef) {
    //         const lastRefBottom = Math.floor(lastScrollCurrentRef.getBoundingClientRect().bottom);
    //         const currentScroll = Math.floor(window.scrollY);

    //         if (currentScroll >= lastRefBottom - ALLOWED_OFFSET && !isAtBottomRef.current && isStateNotification.isLoading.isLoadingScroll === false) {
    //             // Bạn đã cuộn đến cuối phần ScrollArea
    //             if (isStateNotification.dataListNotifications && isStateNotification.dataNotify.next !== null) {
    //                 queryKeyIsStateNotification({
    //                     ...isStateNotification,
    //                     isLoading: {
    //                         ...isStateNotification.isLoading,
    //                         isLoadingScroll: true
    //                     }
    //                 });

    //                 const fetchDataListCar = async () => {
    //                     const dataParams = {
    //                         current_page: isStateNotification.page,
    //                         per_page: isStateNotification.limit,
    //                         type: "customer"
    //                     }

    //                     const { data } = await getListNotifications(dataParams);

    //                     if (data && data?.links && data?.data && data?.base) {
    //                         // let { customDataListCars } = CustomDataListCars(data)

    //                         // queryKeyIsStateListCarsDriver({
    //                         //     listCardCars: [...(isStateListCarsDriver.listCardCars || []), ...customDataListCars],
    //                         //     page: isStateListCarsDriver.page + 1,
    //                         //     next: data?.links?.next
    //                         // });

    //                         const lastElementIndex = isStateNotification.dataListNotifications.length - 1;
    //                         // Lấy id của phần tử đầu tiên trong mảng mới
    //                         const lastElementId = isStateNotification.dataListNotifications && isStateNotification.dataListNotifications.length > 0 ? `card-${isStateNotification.dataListNotifications[lastElementIndex]?.id}` : "";
    //                         const lastElement = document.getElementById(lastElementId);

    //                         if (lastElement) {
    //                             const newElementTop = lastElement.getBoundingClientRect().bottom + window.scrollY + ALLOWED_OFFSET

    //                             window.scrollTo({
    //                                 top: newElementTop,
    //                                 behavior: "smooth",
    //                             });
    //                         }

    //                         queryKeyIsStateNotification({
    //                             ...isStateNotification,
    //                             isLoading: {
    //                                 ...isStateNotification.isLoading,
    //                                 isLoadingScroll: false
    //                             }
    //                         });
    //                     } else {

    //                         queryKeyIsStateNotification({
    //                             ...isStateNotification,
    //                             dataListNotifications: isStateNotification.dataListNotifications,
    //                             next: data?.links?.next,
    //                             page: data?.links?.next !== null ? isStateNotification.page + 1 : isStateNotification.page,
    //                             isLoading: {
    //                                 ...isStateNotification.isLoading,
    //                                 isLoadingScroll: false
    //                             }
    //                         });
    //                     }
    //                 };
    //                 setTimeout(() => fetchDataListCar(), 500);
    //             } else {
    //                 console.log("check next false");
    //             }

    //             isAtBottomRef.current = true;
    //         } else if (currentScroll < lastRefBottom && isAtBottomRef.current) {
    //             isAtBottomRef.current = false;
    //         }
    //     }
    // };

    //     const scrollCurrent = scrollAreaRef.current;

    //     console.log('scrollCurrent', scrollCurrent);


    //     scrollCurrent?.addEventListener(isVisibleMobile ? "touchmove" : "scroll", handleWheel);

    //     return () => {
    //         scrollCurrent?.removeEventListener(isVisibleMobile ? "touchmove" : "scroll", handleWheel);
    //     };
    // }, [
    //     scrollAreaRef,
    //     isStateNotification.next,
    //     isStateNotification.dataListNotifications,
    //     isStateNotification.page,
    //     isStateNotification.isLoading.isLoadingScroll,
    //     isVisibleMobile
    // ]);

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

                        setOpenDialogNotification(true)
                    }
                } catch (err) {
                    throw err
                }
            }

            postReadNotification()
        } else {
            queryKeyIsStateNotification({
                ...isStateNotification,
                dataItemNotification: item,
            })

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
                className={`${isVisibleMobile ? "w-[67%]" : "w-[460px]"} p-1 rounded-xl border-0 shadow z-10`}
            >
                <DropdownMenuLabel className='lg:text-xl text-base px-4 py-2'>
                    Thông báo
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea
                    className={`${isStateNotification.dataListNotifications?.length > 3 ? "h-[350px] pr-3" : "h-[350px]"}`}
                    onWheel={(event) => handleWheel(event)}
                >
                    {
                        isStateNotification.dataListNotifications ?
                            isStateNotification.dataListNotifications?.map((item: any, index: any) => (
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
                            :
                            <Nodata type="list-notifications" className='h-full w-full' />
                    }

                    {
                        isStateNotification.isLoading?.isLoadingScroll && (
                            <LoadingData />
                        )
                    }
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
export default DropdownHeaderNotification