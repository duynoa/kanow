import { useEffect, useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
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
import { Calendar } from "../ui/calendar";
import { addDays, differenceInCalendarDays, differenceInDays, format, isSameDay, isSameMinute } from "date-fns";
import { DateRange } from "react-day-picker";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from 'uuid';
import { Label } from "../ui/label";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Button } from "../ui/button";

import * as SelectPrimitive from "@radix-ui/react-select"
import { useParams, usePathname } from "next/navigation";

type Props = {
}

export function DialogCalendar({ }: Props) {
    const pathname = usePathname()
    const slug = useParams();

    const {
        dateReal,
        dateTemp,
        numberDay,
        openDialogCalendar,
        setDateReal,
        setDateTemp,
        setOpenDialogCalendar,
        setNumberDay
    } = useDialogCalendar()

    const dataTime = [
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

    const handleOpenChangeModal = () => {
        setOpenDialogCalendar(!openDialogCalendar)
    }

    // change date in calender 
    const handleDateChange = (newDate: any) => {
        if (pathname.startsWith('/detail-car/')) {
            // Check if new date range is not null
            if (newDate && newDate.from && newDate.to) {
                // Check if the new from date is different from the current from date
                if (!isSameDay(dateTemp?.from, newDate.from) && dateTemp?.from) {
                    // If it's different, keep the time of the current from date and update the date
                    newDate.from.setHours(dateTemp?.from.getHours(), dateTemp?.from.getMinutes(), dateTemp?.from.getSeconds());
                }
                // Check if the new to date is different from the current to date
                if (!isSameDay(dateTemp?.to, newDate.to) && dateTemp?.to) {
                    // If it's different, keep the time of the current to dateTemp and update the dateTemp
                    newDate.to.setHours(dateTemp?.to.getHours(), dateTemp?.to.getMinutes(), dateTemp?.to.getSeconds());
                }
                // Update the state with the new date range
                setDateTemp(newDate);
            } else if (newDate && newDate.from) {
                setDateTemp(newDate);
            }

        } else {
            // Check if new date range is not null
            if (newDate && newDate.from && newDate.to) {
                // Check if the new from date is different from the current from date
                if (!isSameDay(dateReal?.from, newDate.from) && dateReal?.from) {
                    // If it's different, keep the time of the current from date and update the date
                    newDate.from.setHours(dateReal?.from.getHours(), dateReal?.from.getMinutes(), dateReal?.from.getSeconds());
                }
                // Check if the new to date is different from the current to date
                if (!isSameDay(dateReal?.to, newDate.to) && dateReal?.to) {
                    // If it's different, keep the time of the current to dateReal and update the dateReal
                    newDate.to.setHours(dateReal?.to.getHours(), dateReal?.to.getMinutes(), dateReal?.to.getSeconds());
                }
                // Update the state with the new date range
                setDateReal(newDate);
            } else if (newDate && newDate.from) {
                setDateReal(newDate);
            }
        }
    }

    // change time in calender
    const handleTimeChange = (value: string, type: string) => {
        if (pathname.startsWith('/detail-car/')) {
            if (dateTemp) {
                if (dateTemp.from && type === 'from') {
                    const updatedDate = {
                        ...dateTemp,
                        from: new Date(dateTemp?.from.setHours(+value?.split(":")[0], +value.split(":")[1])),
                    };

                    setDateTemp(updatedDate);
                } else if (dateTemp.to && type === 'to') {
                    const updatedDate = {
                        ...dateTemp,
                        to: new Date(dateTemp?.to.setHours(+value?.split(":")[0], +value.split(":")[1])),
                    };

                    setDateTemp(updatedDate);
                }

            }
        } else {
            if (dateReal) {
                if (dateReal.from && type === 'from') {
                    const updatedDate = {
                        ...dateReal,
                        from: new Date(dateReal?.from.setHours(+value?.split(":")[0], +value.split(":")[1])),
                    };

                    setDateReal(updatedDate);
                } else if (dateReal.to && type === 'to') {
                    const updatedDate = {
                        ...dateReal,
                        to: new Date(dateReal?.to.setHours(+value?.split(":")[0], +value.split(":")[1])),
                    };

                    setDateReal(updatedDate);
                }

            }
        }
    };

    useEffect(() => {
        if (pathname.startsWith('/detail-car/')) {
            const daysDifference = differenceInCalendarDays(`${dateTemp?.to}`, `${dateTemp?.from}`);
            if (dateTemp?.to && dateTemp?.from && daysDifference) {
                console.log("Số ngày thuê:", daysDifference);
                setNumberDay(daysDifference)
            } else if (dateTemp?.to || dateTemp?.from) {
                setNumberDay(1)
            }


        } else {
            const daysDifference = differenceInCalendarDays(`${dateReal?.to}`, `${dateReal?.from}`);
            if (dateReal?.to && dateReal?.from && daysDifference) {
                console.log("Số ngày thuê:", daysDifference);
                setNumberDay(daysDifference)
            } else if (dateReal?.to || dateReal?.from) {
                setNumberDay(1)
            }
        }
    }, [slug, dateReal?.from, dateReal?.to, dateTemp?.from, dateTemp?.to])

    useEffect(() => {
        setDateTemp(dateReal)
    }, [slug])


    const handleSubmitDateTime = () => {

    }

    console.log('dateTemp', dateTemp);

    return (
        <Dialog modal open={openDialogCalendar} onOpenChange={handleOpenChangeModal}>
            <DialogOverlay />
            <DialogContent className="px-0 pb-0 lg:max-w-[800px] md:max-w-[480px] w-fit max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <DialogClose
                    onClick={handleOpenChangeModal}
                    className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                >
                    <X className="size-8 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader className='flex items-center justify-center w-full border-b pb-4'>
                    <DialogTitle className='text-2xl capitalize'>
                        Thời gian
                    </DialogTitle>
                </DialogHeader>

                <div className='flex flex-col gap-2'>
                    <div className='px-2 border m-2 rounded-lg drop-shadow-md'>
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateTemp && pathname.startsWith('/detail-car/') ? dateTemp?.from : dateReal?.from}
                            selected={dateTemp && pathname.startsWith('/detail-car/') ? dateTemp : dateReal}
                            onSelect={(newDate: any) => handleDateChange(newDate)}
                            numberOfMonths={2}
                        />
                    </div>
                    <div className='flex flex-row items-center gap-2 px-2 w-full'>
                        <div className='flex flex-col gap-1 w-[50%]'>
                            <Label>Giờ nhận xe</Label>
                            <Select
                                value={pathname.startsWith('/detail-car/') ?
                                    (dateTemp?.from ? format(dateTemp?.from, 'HH:mm') : '')
                                    :
                                    (dateReal?.from ? format(dateReal?.from, 'HH:mm') : '')
                                }
                                onValueChange={(value) => handleTimeChange(value, 'from')}
                                defaultValue={`${pathname.startsWith('/detail-car/') ?
                                    (dateTemp?.from ? format(dateTemp?.from, 'HH:mm') : '00:00')
                                    :
                                    (dateReal?.from ? format(dateReal?.from, 'HH:mm') : '00:00')}
                                    `}
                            >
                                <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                                    <SelectValue placeholder="Chọn giờ nhận xe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            dataTime && dataTime.map((item) => (
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
                                value={pathname.startsWith('/detail-car/') ?
                                    (dateTemp?.to ? format(dateTemp?.to, 'HH:mm') : '')
                                    :
                                    (dateReal?.to ? format(dateReal?.to, 'HH:mm') : '')
                                }
                                onValueChange={(value) => handleTimeChange(value, 'to')}
                                defaultValue={`${pathname.startsWith('/detail-car/') ?
                                    (dateTemp?.to ? format(dateTemp?.to, 'HH:mm') : '00:00')
                                    :
                                    (dateReal?.to ? format(dateReal?.to, 'HH:mm') : '00:00')}
                                    `}
                            >
                                <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                                    <SelectValue placeholder="Chọn giờ trả xe" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            dataTime && dataTime.map((item) => (
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
                </div>

                <div className='flex items-center justify-between border-t drop-shadow-md py-6 px-4 mt-10 bg-white'>
                    <div className='flex flex-col'>
                        {
                            pathname.startsWith('/detail-car/') ?
                                <div className='text-base font-semibold'>
                                    {dateTemp?.from ? format(dateTemp?.from, 'HH:mm, dd/MM') : ""}{dateTemp?.to ? ` - ${format(dateTemp?.to, 'HH:mm, dd/MM')}` : ''}
                                </div>
                                :
                                <div className='text-base font-semibold'>
                                    {dateReal?.from ? format(dateReal?.from, 'HH:mm, dd/MM') : ""}{dateReal?.to ? ` - ${format(dateReal?.to, 'HH:mm, dd/MM')}` : ''}
                                </div>
                        }
                        <div>
                            Số ngày thuê: {numberDay} ngày
                        </div>
                    </div>

                    <div>
                        <Button
                            onClick={() => handleSubmitDateTime()}
                            className='xl:px-6 xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80'
                        >
                            Áp dụng
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
