import { useEffect, useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Check, X } from "lucide-react"

import { useDialogCalendar, useDialogPromotion } from "@/hooks/useOpenDialog";
import { addDays, addMonths, differenceInCalendarDays, differenceInDays, differenceInHours, differenceInMinutes, endOfDay, endOfMonth, format, getMonth, getYear, isAfter, isBefore, isSameDay, isSameMinute, isSameMonth, isSameYear, parseISO, setHours, setMinutes, startOfDay, startOfMonth, sub } from "date-fns";
import { DateRange } from "react-day-picker";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from 'uuid';
import { Label } from "../ui/label";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Button } from "../ui/button";

import * as SelectPrimitive from "@radix-ui/react-select"
import { useParams, usePathname } from "next/navigation";
import { toastCore } from "@/lib/toast";
import { CalendarCustom } from "../ui/calendarCustom";
import { getListCalendarPriceMonth } from "@/services/cars/calendar.services";
import { useDataDetailCar, useDataListCarAutonomous, useDataListCarsDriver } from "@/hooks/useDataQueryKey";
import { useGeneralKey } from "@/hooks/useGeneralKey";
import { Calendar } from "../ui/calendar";

type Props = {
}

export function DialogCalendar({ }: Props) {
    const pathname = usePathname()
    const slug = useParams();
    const { generalKey } = useGeneralKey()

    const dataTimeCustom = [
        {
            id: uuidv4(),
            time: '00:00',
            value: '00:00'
        },
        {
            id: uuidv4(),
            time: '00:30',
            value: '00:30'
        },
        {
            id: uuidv4(),
            time: '01:00',
            value: '01:00'
        },
        {
            id: uuidv4(),
            time: '01:30',
            value: '01:30'
        },
        {
            id: uuidv4(),
            time: '02:00',
            value: '02:00'
        },
        {
            id: uuidv4(),
            time: '02:30',
            value: '02:30'
        },
        {
            id: uuidv4(),
            time: '03:00',
            value: '03:00'
        },
        {
            id: uuidv4(),
            time: '03:30',
            value: '03:30'
        },
        {
            id: uuidv4(),
            time: '04:00',
            value: '04:00'
        },
        {
            id: uuidv4(),
            time: '04:30',
            value: '04:30'
        },
        {
            id: uuidv4(),
            time: '05:00',
            value: '05:00'
        },
        {
            id: uuidv4(),
            time: '05:30',
            value: '05:30'
        },
        {
            id: uuidv4(),
            time: '06:00',
            value: '06:00'
        },
        {
            id: uuidv4(),
            time: '06:30',
            value: '06:30'
        },
        {
            id: uuidv4(),
            time: '07:00',
            value: '07:00'
        },
        {
            id: uuidv4(),
            time: '07:30',
            value: '07:30'
        },
        {
            id: uuidv4(),
            time: '08:00',
            value: '08:00'
        },
        {
            id: uuidv4(),
            time: '08:30',
            value: '08:30'
        },
        {
            id: uuidv4(),
            time: '09:00',
            value: '09:00'
        },
        {
            id: uuidv4(),
            time: '09:30',
            value: '09:30'
        },
        {
            id: uuidv4(),
            time: '10:00',
            value: '10:00'
        },
        {
            id: uuidv4(),
            time: '10:30',
            value: '10:30'
        },
        {
            id: uuidv4(),
            time: '11:00',
            value: '11:00'
        },
        {
            id: uuidv4(),
            time: '11:30',
            value: '11:30'
        },
        {
            id: uuidv4(),
            time: '12:00',
            value: '12:00'
        },
        {
            id: uuidv4(),
            time: '12:30',
            value: '12:30'
        },
        {
            id: uuidv4(),
            time: '13:00',
            value: '13:00'
        },
        {
            id: uuidv4(),
            time: '13:30',
            value: '13:30'
        },
        {
            id: uuidv4(),
            time: '14:00',
            value: '14:00'
        },
        {
            id: uuidv4(),
            time: '14:30',
            value: '14:30'
        },
        {
            id: uuidv4(),
            time: '15:00',
            value: '15:00'
        },
        {
            id: uuidv4(),
            time: '15:30',
            value: '15:30'
        },
        {
            id: uuidv4(),
            time: '16:00',
            value: '16:00'
        },
        {
            id: uuidv4(),
            time: '16:30',
            value: '16:30'
        },
        {
            id: uuidv4(),
            time: '17:00',
            value: '17:00'
        },
        {
            id: uuidv4(),
            time: '17:30',
            value: '17:30'
        },
        {
            id: uuidv4(),
            time: '18:00',
            value: '18:00'
        },
        {
            id: uuidv4(),
            time: '18:30',
            value: '18:30'
        },
        {
            id: uuidv4(),
            time: '19:00',
            value: '19:00'
        },
        {
            id: uuidv4(),
            time: '19:30',
            value: '19:30'
        },
        {
            id: uuidv4(),
            time: '20:00',
            value: '20:00'
        },
        {
            id: uuidv4(),
            time: '20:30',
            value: '20:30'
        },
        {
            id: uuidv4(),
            time: '21:00',
            value: '21:00'
        },
        {
            id: uuidv4(),
            time: '21:30',
            value: '21:30'
        },
        {
            id: uuidv4(),
            time: '22:00',
            value: '22:00'
        },
        {
            id: uuidv4(),
            time: '22:30',
            value: '22:30'
        },
        {
            id: uuidv4(),
            time: '23:00',
            value: '23:00'
        },
        {
            id: uuidv4(),
            time: '23:30',
            value: '23:30'
        },
    ]

    const initialDateTime = {
        dataTimeLeft: dataTimeCustom,
        dataTimeRight: dataTimeCustom
    }
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [dateTimeComponent, setDateTimeComponent] = useState<any>()
    const [numberDayComponent, setNumberDayComponent] = useState<any>()
    const [hoursBetWeenDays, setHoursBetWeenDays] = useState<number>(0)
    const [dataTime, setDateTime] = useState<any>(initialDateTime)

    const { isStateDetailCar, queryKeyIsStateDetailCar } = useDataDetailCar()
    const { isStateListCarAutonomous, queryKeyIsStateListCarAutonomous } = useDataListCarAutonomous()
    const { isStateListCarsDriver, queryKeyIsStateListCarsDriver } = useDataListCarsDriver()

    // Xác định ngày hiện tại
    const toDate = new Date();
    // Xác định ngày kết thúc (chỉ hiển thị từ tháng hiện tại đến 4 tháng sau)
    const endMonth = addMonths(toDate, 3);
    // Xác định các ngày cần vô hiệu hóa (ngày trước ngày hiện tại)

    const {
        dateReal,
        dateTemp,
        dateStart,
        dateEnd,
        numberDay,
        openDialogCalendar,
        setDateReal,
        setDateTemp,
        setDateStart,
        setDateEnd,
        setOpenDialogCalendar,
        setNumberDay,
        dataCalendar,
        setDataCalendar,
        statusDate,
        validateDateSubmit,
        setValidateDateSubmit,
        flagSubmit,
        setFlagSubmit
    } = useDialogCalendar()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // khoá các ngày phía trước của ngày hiện tại lịch mặc định
    const disabledDays = (date: Date) => {
        return isBefore(date, startOfDay(toDate));
    };


    const handleCloseModal = (type: string) => {
        if (validateDateSubmit && type === "close1" || flagSubmit && type === "close1") {
            // không có hoạt động gì để tránh người dùng tạo bug khi click ra ngoài
        } else if (validateDateSubmit && type === "close2" || flagSubmit && type === "close2") {
            toastCore.warning("Vui lòng nhấn áp dụng vì bạn đã thay đổi ngày hoặc giờ!")
        } else {
            setOpenDialogCalendar(false)
        }
    }

    // change date in calender default
    const handleDateChange = (newDate: any) => {
        // Check if new date range is not null
        console.log('newDate', newDate);

        // console.log('newDate', newDate);
        // if (pathname.startsWith('/detail-car/')) {
        //     // Check if new date range is not null
        //     if (newDate && newDate.from && newDate.to) {
        //         // Check if the new from date is different from the current from date
        //         if (!isSameDay(dateTemp?.from, newDate.from) && dateTemp?.from) {
        //             // If it's different, keep the time of the current from date and update the date
        //             newDate.from.setHours(dateTemp?.from.getHours(), dateTemp?.from.getMinutes(), dateTemp?.from.getSeconds());
        //         }
        //         // Check if the new to date is different from the current to date
        //         if (!isSameDay(dateTemp?.to, newDate.to) && dateTemp?.to) {
        //             // If it's different, keep the time of the current to dateTemp and update the dateTemp
        //             newDate.to.setHours(dateTemp?.to.getHours(), dateTemp?.to.getMinutes(), dateTemp?.to.getSeconds());
        //         }
        //         // Update the state with the new date range
        //         // setDateTemp(newDate);
        //         setDateTimeComponent(newDate);
        //     } else if (newDate && newDate.from) {
        //         // setDateTemp(newDate);
        //         setDateTimeComponent(newDate);
        //     }

        // } else {
        //     // Check if new date range is not null
        //     if (newDate && newDate.from && newDate.to) {
        //         // Check if the new from date is different from the current from date
        //         if (!isSameDay(dateReal?.from, newDate.from) && dateReal?.from) {
        //             // If it's different, keep the time of the current from date and update the date
        //             newDate.from.setHours(dateReal?.from.getHours(), dateReal?.from.getMinutes(), dateReal?.from.getSeconds());
        //         }
        //         // Check if the new to date is different from the current to date
        //         if (!isSameDay(dateReal?.to, newDate.to) && dateReal?.to) {
        //             // If it's different, keep the time of the current to dateReal and update the dateReal
        //             newDate.to.setHours(dateReal?.to.getHours(), dateReal?.to.getMinutes(), dateReal?.to.getSeconds());
        //         }
        //         // Update the state with the new date range
        //         // setDateReal(newDate);
        //         setDateTimeComponent(newDate);
        //     } else if (newDate && newDate.from) {
        //         // setDateReal(newDate);
        //         setDateTimeComponent(newDate);
        //     }
        // }


        const isAfterInSameYearAndMonth = (date: any, compareDate: any) => {
            return (
                (isSameYear(date, compareDate) || (getYear(date) > getYear(compareDate))) &&
                ((isSameMonth(date, compareDate) || (getMonth(date) > getMonth(compareDate))) &&
                    isAfter(date, compareDate))
            )
        };

        // trước ngày dateStart
        const isBeforeInSameYearAndMonth = (date: any, compareDate: any) => {
            return (
                (isSameYear(date, compareDate) || (getYear(date) < getYear(compareDate))) &&
                ((isSameMonth(date, compareDate) || (getMonth(date) < getMonth(compareDate))) &&
                    isBefore(date, compareDate))
            )
        };

        if (newDate && dateTimeComponent.from && dateTimeComponent.to) {
            if (isBeforeInSameYearAndMonth(newDate.from, dateTimeComponent.from)) {
                newDate?.from?.setHours(dateTimeComponent.from?.getHours(), dateTimeComponent.from?.getMinutes(), dateTimeComponent.from?.getSeconds());

                setDateTimeComponent((prevState: any) => ({
                    from: newDate.from,
                    to: undefined
                }))
                setFlagSubmit(true)
            } else if (isAfterInSameYearAndMonth(newDate.from, dateTimeComponent.from)) {
                newDate?.from?.setHours(dateTimeComponent.from?.getHours(), dateTimeComponent.from?.getMinutes(), dateTimeComponent.from?.getSeconds());

                setDateTimeComponent((prevState: any) => ({
                    from: newDate.from,
                    to: undefined
                }))
                setFlagSubmit(true)
            } else {
                newDate?.to?.setHours(dateTimeComponent.from?.getHours(), dateTimeComponent.from?.getMinutes(), dateTimeComponent.from?.getSeconds());
                setDateTimeComponent({
                    from: newDate.to,
                    to: undefined
                })
                setFlagSubmit(true)
            }

        } else if (newDate && dateTimeComponent.from && !dateTimeComponent.to) {
            if (isBeforeInSameYearAndMonth(newDate.from, dateTimeComponent.from)) {
                newDate.from.setHours(dateTimeComponent.from?.getHours(), dateTimeComponent.from?.getMinutes(), dateTimeComponent.from?.getSeconds());

                setDateTimeComponent((prevState: any) => ({
                    from: newDate.from,
                    to: newDate.to
                }))
                setFlagSubmit(true)
            } else if (isAfterInSameYearAndMonth(newDate.from, dateTimeComponent.from)) {
                newDate.to.setHours(dateTimeComponent.from?.getHours(), dateTimeComponent.from?.getMinutes(), dateTimeComponent.from?.getSeconds());

                setDateTimeComponent((prevState: any) => ({
                    ...prevState,
                    to: newDate.to
                }))
                setFlagSubmit(true)
            } else {
                newDate.to.setHours(dateTimeComponent.from?.getHours(), dateTimeComponent.from?.getMinutes(), dateTimeComponent.from?.getSeconds());

                setDateTimeComponent((prevState: any) => ({
                    ...prevState,
                    to: newDate.to
                }))
                setFlagSubmit(true)
            }
        } else {
            setDateTimeComponent((prevState: any) => ({
                from: prevState.from,
                to: undefined
            }))
        }
    }


    // change time in calender default
    const handleTimeChange = (value: string, type: string) => {
        if (dateTimeComponent) {
            if (dateTimeComponent.from && type === 'from') {
                const updatedDate = {
                    ...dateTimeComponent,
                    from: new Date(dateTimeComponent?.from.setHours(+value?.split(":")[0], +value.split(":")[1])),
                };

                setFlagSubmit(true)
                setDateTimeComponent(updatedDate);
            } else if (dateTimeComponent.to && type === 'to') {
                const updatedDate = {
                    ...dateTimeComponent,
                    to: new Date(dateTimeComponent?.to.setHours(+value?.split(":")[0], +value.split(":")[1])),
                };

                setFlagSubmit(true)
                setDateTimeComponent(updatedDate);
            }

        }

    };

    // change time in calender custotm
    const handleTimeChangeCustom = (value: string, type: string) => {
        if (dateStart && dateEnd) {
            if (dateStart && type === 'from') {
                const updatedDateStart: any = new Date(dateStart.setHours(+value?.split(":")[0], +value.split(":")[1]))
                // setDateTemp(updatedDate);
                setFlagSubmit(true)
                setDateStart(updatedDateStart);
            } else if (dateEnd && type === 'to') {
                const updatedDateEnd = new Date(dateEnd.setHours(+value?.split(":")[0], +value.split(":")[1]))
                setFlagSubmit(true)
                setDateEnd(updatedDateEnd);
            }
        }
    };

    const handleSubmitDateTime = () => {
        // Nếu tất cả điều kiện đều đúng, tiến hành setDate và setNumberDay
        try {
            if (pathname.startsWith('/detail-car/')) {
                queryKeyIsStateDetailCar({
                    ...isStateDetailCar,
                    onSuccess: {
                        onSuccessPage: true
                    }
                })

                console.log('check ?? : ',);


                if (
                    isStateDetailCar?.dataDetailCar?.price?.number_day &&
                    isStateDetailCar?.infoPromotion?.activePromotion?.number_day &&
                    numberDayComponent < isStateDetailCar.infoPromotion.activePromotion.number_day
                ) {
                    queryKeyIsStateDetailCar({
                        ...isStateDetailCar,
                        infoPromotion: {
                            ...isStateDetailCar?.infoPromotion,
                            activePromotion: null
                        },
                    })
                }

                setDateTemp({
                    from: dateStart,
                    to: dateEnd,
                });
                setFlagSubmit(false)
            } else {
                queryKeyIsStateListCarAutonomous({
                    ...isStateListCarAutonomous,
                    onSuccess: {
                        onSuccessPage: true
                    }
                })

                queryKeyIsStateListCarsDriver({
                    ...isStateListCarsDriver,
                    onSuccess: {
                        onSuccessPage: true
                    }
                })

                setDateReal(dateTimeComponent);
                setFlagSubmit(false)
            }

            setNumberDay(numberDayComponent);
            setOpenDialogCalendar(false)
        } catch (err) {
            throw err
        }
    };

    useEffect(() => {
        setDateTemp(dateReal)
        setDateStart(dateReal?.from)
        setDateEnd(dateReal?.to)
        setNumberDay(numberDayComponent)
        setDateTimeComponent(dateReal)
    }, [slug])

    useEffect(() => {
        if (pathname.startsWith('/detail-car/')) {
            const filterDatesByRange = (dataCalendar: any[], startDate: Date, endDate: Date) => {
                const dataBetweens = dataCalendar?.map((item: any) => {
                    return {
                        ...item,
                        price_detail: item.price_detail.filter((detail: any) => {
                            const date = new Date(detail.date);
                            const startOfDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                            const endOfDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999);
                            // Kiểm tra xem ngày có nằm trong khoảng thời gian đã chọn không
                            const withinDateRange = date >= startOfDay && date <= endOfDay;
                            // Kiểm tra xem status có phù hợp không
                            return withinDateRange;
                        })
                    };
                })

                return dataBetweens
            }

            // Hàm kiểm tra xem có ngày nào trong khoảng thời gian có status là 2 hoặc 3 không
            const validateDates = (dataCalendar: any[], startDate: Date, endDate: Date) => {
                const filteredDates = filterDatesByRange(dataCalendar, startDate, endDate);

                return filteredDates.some((item: any) => {
                    return item.price_detail.some((detail: any) => {
                        return detail.status === 2 || detail.status === 3;
                    });
                });
            }

            if (dateStart && dateEnd) {
                //    validate ngày
                const isValid = validateDates(dataCalendar, dateStart, dateEnd)

                setValidateDateSubmit(isValid);

                // state chọn số ngày thuê
                const daysDifference = differenceInCalendarDays(dateEnd, dateStart);
                const hoursDifference = differenceInHours(dateEnd, dateStart);
                const minutesDifference = differenceInMinutes(dateEnd, dateStart);
                const isDateEndAfter = isAfter(dateEnd, dateStart);
                const timeDate = Math.ceil(minutesDifference / 1440)
                let minTimeInDay = hoursDifference >= +generalKey.hour_min_car

                console.log('timeDate', timeDate);

                if (daysDifference > 0 && isDateEndAfter) {

                    setNumberDayComponent(timeDate);
                } else if (minutesDifference >= 1440 && isDateEndAfter) {
                    setNumberDayComponent(timeDate);
                } else {

                    setHoursBetWeenDays(hoursDifference)
                    setNumberDayComponent(1);
                }

                // lọc giờ trong modal
                if (isStateDetailCar?.dataDetailCar?.hour_receive_car?.length > 0 && isStateDetailCar?.dataDetailCar?.hour_back_car?.length > 0) {
                    const filterByHourRange = (dataTime: any[], hourStart: string, hourEnd: string) =>
                        dataTime.filter((item) => (
                            (item.value >= hourStart) &&
                            (item.value <= hourEnd)
                        ));

                    const newDataTimeReceiveCar = filterByHourRange(
                        dataTime.dataTimeLeft,
                        isStateDetailCar?.dataDetailCar?.hour_receive_car[0].hour_start,
                        isStateDetailCar?.dataDetailCar?.hour_receive_car[0].hour_end
                    );

                    const newDataTimeBackCar = filterByHourRange(
                        dataTime.dataTimeRight,
                        isStateDetailCar?.dataDetailCar?.hour_back_car[0]?.hour_start,
                        isStateDetailCar?.dataDetailCar?.hour_back_car[0]?.hour_end
                    );

                    setDateTime({
                        dataTimeLeft: newDataTimeReceiveCar,
                        dataTimeRight: newDataTimeBackCar
                    })
                }

            } else if (!dateEnd) {
                // setHoursBetWeenDays(0)
                setNumberDayComponent(1)
                setValidateDateSubmit(false)
            }
        } else {
            // giờ trong lịch mặc định 
            setDateTime(initialDateTime)
            const daysDifference = differenceInCalendarDays(`${dateTimeComponent?.to}`, `${dateTimeComponent?.from}`);
            if (dateTimeComponent?.to && dateTimeComponent?.from && daysDifference) {
                console.log("Số ngày thuê:", daysDifference);
                setNumberDayComponent(daysDifference)
            } else if (dateTimeComponent?.to || dateTimeComponent?.from) {
                setNumberDayComponent(1)
            }
        }
    }, [
        dateStart,
        dateEnd,
        slug,
        dataCalendar,
        dateTimeComponent?.from,
        dateTimeComponent?.to,
        numberDayComponent
    ])

    useEffect(() => {
        if (pathname.startsWith('/detail-car/')) {
            // setDateStart(dateTemp?.from)
            // setDateEnd(dateTemp?.to)
            setDateTimeComponent(dateTemp)
        } else {
            setDateTimeComponent(dateReal)
        }
    }, [openDialogCalendar, pathname])

    return (
        <Dialog modal open={openDialogCalendar} onOpenChange={() => handleCloseModal('close1')}>
            <DialogPortal >
                <DialogOverlay className='z-40' />
                <DialogContent className={`${pathname.startsWith('/detail-car/') ? "h-[95vh]" : ""} p-0 lg:max-w-[800px] md:max-w-[480px] w-fit max-h-[95vh] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}>
                    <DialogClose
                        onClick={() => handleCloseModal('close2')}
                        className="size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                    >
                        <X className="size-6 text-[#000000]" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    <DialogHeader className='flex items-center justify-center w-full border-b py-4'>
                        <DialogTitle className='text-2xl capitalize'>
                            Thời gian
                        </DialogTitle>
                    </DialogHeader>

                    <div className='flex flex-col gap-2 overflow-auto'>
                        {
                            pathname.startsWith('/detail-car/') ?
                                <div className='px-2 border m-2 rounded-lg drop-shadow-md max-w-[760px]'>
                                    <CalendarCustom />
                                </div>
                                :
                                <div className='px-2 border m-2 rounded-lg drop-shadow-md'>
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={dateTimeComponent?.from}
                                        selected={dateTimeComponent}
                                        onSelect={(newDate: any) => handleDateChange(newDate)}
                                        numberOfMonths={2}
                                        fromMonth={toDate}
                                        toMonth={endMonth}
                                        disabled={disabledDays}
                                    />
                                </div>
                        }
                        {
                            pathname.startsWith('/detail-car/') ?
                                <div className='flex flex-row items-center gap-2 px-2 w-full'>
                                    <div className='flex flex-col gap-1 w-[50%]'>
                                        <Label>Giờ nhận xe</Label>
                                        <Select
                                            value={(dateStart ? format(dateStart, 'HH:mm') : '')}
                                            onValueChange={(value) => handleTimeChangeCustom(value, 'from')}
                                            defaultValue={`${(dateStart ? format(dateStart, 'HH:mm') : '00:00')}`}
                                        >
                                            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                                                <SelectValue placeholder="Chọn giờ nhận xe" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        dataTime.dataTimeLeft && dataTime.dataTimeLeft.map((item: any) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.value}
                                                                className='flex flex-row items-center'
                                                            >
                                                                <div>
                                                                    {item.time ? item.time : ''}
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className='flex items-end pb-2 h-full'>
                                        <BsFillArrowRightCircleFill className='size-6 text-[#1EAAB1]' />
                                    </div>
                                    <div className='flex flex-col gap-1 w-[50%]'>
                                        <Label>Giờ trả xe</Label>
                                        <Select
                                            value={(dateEnd ? format(dateEnd, 'HH:mm') : '')}
                                            onValueChange={(value) => handleTimeChangeCustom(value, 'to')}
                                            defaultValue={`${(dateEnd ? format(dateEnd, 'HH:mm') : '00:00')}`}
                                        >
                                            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                                                <SelectValue placeholder="Chọn giờ trả xe" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        dataTime.dataTimeRight && dataTime.dataTimeRight.map((item: any) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.value}
                                                            >
                                                                {item.time ? item.time : ''}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                :
                                <div className='flex flex-row items-center gap-2 px-2 w-full'>
                                    <div className='flex flex-col gap-1 w-[50%]'>
                                        <Label>Giờ nhận xe</Label>
                                        <Select
                                            value={(dateTimeComponent?.from ? format(dateTimeComponent?.from, 'HH:mm') : '')}
                                            onValueChange={(value) => handleTimeChange(value, 'from')}
                                            defaultValue={`${(dateTimeComponent?.from ? format(dateTimeComponent?.from, 'HH:mm') : '00:00')}`}
                                        >
                                            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                                                <SelectValue placeholder="Chọn giờ nhận xe" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        dataTime.dataTimeLeft && dataTime.dataTimeLeft.map((item: any) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.value}
                                                                className='flex flex-row items-center'
                                                            >
                                                                <div>
                                                                    {item.time ? item.time : ''}
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className='flex items-end pb-2 h-full'>
                                        <BsFillArrowRightCircleFill className='size-6 text-[#1EAAB1]' />
                                    </div>
                                    <div className='flex flex-col gap-1 w-[50%]'>
                                        <Label>Giờ trả xe</Label>
                                        <Select
                                            value={(dateTimeComponent?.to ? format(dateTimeComponent?.to, 'HH:mm') : '')}
                                            onValueChange={(value) => handleTimeChange(value, 'to')}
                                            defaultValue={`${(dateTimeComponent?.to ? format(dateTimeComponent?.to, 'HH:mm') : '00:00')}`}
                                        >
                                            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                                                <SelectValue placeholder="Chọn giờ trả xe" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        dataTime.dataTimeRight && dataTime.dataTimeRight.map((item: any) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.value}
                                                            >
                                                                {item.time ? item.time : ''}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                        }

                        {
                            pathname.startsWith('/detail-car/') && isStateDetailCar?.dataDetailCar?.hour_receive_car && isStateDetailCar?.dataDetailCar?.hour_receive_car.length > 0 &&
                                isStateDetailCar?.dataDetailCar?.hour_back_car && isStateDetailCar?.dataDetailCar?.hour_back_car.length > 0 ?
                                <div className='px-2 mt-4'>
                                    <div className='bg-[#EDEDED]/40 flex flex-col p-3 rounded-lg'>
                                        <div className='flex items-center justify-between w-full'>
                                            <div className='3xl:text-base text-sm text-[#000000] font-light'>
                                                Thời gian nhận xe
                                            </div>
                                            <div className='3xl:text-base text-sm text-[#000000] font-medium'>
                                                {isStateDetailCar?.dataDetailCar?.hour_receive_car[0]?.hour_start} - {isStateDetailCar?.dataDetailCar?.hour_receive_car[0]?.hour_end}
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between w-full'>
                                            <div className='3xl:text-base text-sm text-[#000000] font-light'>
                                                Thời gian trả xe
                                            </div>
                                            <div className='3xl:text-base text-sm text-[#000000] font-medium'>
                                                {isStateDetailCar?.dataDetailCar?.hour_back_car[0]?.hour_start} - {isStateDetailCar?.dataDetailCar?.hour_back_car[0]?.hour_end}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                        }

                        {
                            pathname.startsWith('/detail-car/') && validateDateSubmit ?
                                // validateDateSubmit || statusDate == 2 || statusDate == 3 ?
                                <div className='px-2 mt-4'>
                                    <div className='3xl:text-base text-sm font-normal text-[#FF0000]'>
                                        * Xe bận trong khoảng thời gian trên. Vui lòng đặt xe khác hoặc thay đổi lịch trình thích hợp.
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            pathname.startsWith('/detail-car/') && !dateEnd || !pathname.startsWith('/detail-car/') && !dateTimeComponent?.to ?
                                <div className='px-2 mt-4'>
                                    <div className='3xl:text-base text-sm font-normal text-[#2FB9BD]'>
                                        * Vui lòng chọn ngày kết thúc
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            pathname.startsWith('/detail-car/') && hoursBetWeenDays && (hoursBetWeenDays < +generalKey.hour_min_car) ?
                                <div className='px-2 mt-4'>
                                    <div className='3xl:text-base text-sm font-normal text-[#2FB9BD]'>
                                        * Vui lòng chọn thời gian trả xe lớn hơn thời gian nhận xe {+generalKey.hour_min_car} giờ
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>

                    <div className='flex items-center justify-between border-t drop-shadow-md py-6 px-4 bg-white rounded-b-lg'>
                        <div className='flex flex-col'>
                            {
                                pathname.startsWith('/detail-car/') ?
                                    <div className='text-base font-semibold'>
                                        {dateStart ? format(dateStart, 'HH:mm, dd/MM') : ""}{dateEnd ? ` - ${format(dateEnd, 'HH:mm, dd/MM')}` : ''}
                                    </div>
                                    :
                                    <div className='text-base font-semibold'>
                                        {dateTimeComponent?.from ? format(dateTimeComponent?.from, 'HH:mm, dd/MM') : ""}{dateTimeComponent?.to ? ` - ${format(dateTimeComponent?.to, 'HH:mm, dd/MM')}` : ''}
                                    </div>
                            }

                            <div>
                                Số ngày thuê: {numberDayComponent} ngày
                            </div>
                        </div>

                        <div>
                            <Button
                                disabled={
                                    pathname.startsWith('/detail-car/') && dataCalendar.length === 0 ||
                                        pathname.startsWith('/detail-car/') && validateDateSubmit ||
                                        pathname.startsWith('/detail-car/') && !dateEnd ||
                                        !pathname.startsWith('/detail-car/') && !dateTimeComponent?.to
                                        ?
                                        true
                                        :
                                        false
                                }
                                onClick={() => handleSubmitDateTime()}
                                className='xl:px-6 xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 caret-transparent'
                            >
                                Áp dụng
                            </Button>
                        </div>
                    </div>
                </DialogContent >
            </DialogPortal>
        </Dialog >
    )
}
