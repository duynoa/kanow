import { useState } from "react"

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
import { addDays, format, isSameDay, isSameMinute } from "date-fns";
import { DateRange } from "react-day-picker";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from 'uuid';
import { Label } from "../ui/label";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Button } from "../ui/button";

import * as SelectPrimitive from "@radix-ui/react-select"

type Props = {
}

export function DialogCalendar({ }: Props) {
    const { openDialogCalendar, date, setDate, setOpenDialogCalendar } = useDialogCalendar()

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

    const handleDateChange = (newDate: any) => {
        console.log('newDate', newDate);
        setDate(newDate);
        // if (newDate == undefined) {
        //     console.log('check lần 1');
        //     setDate(newDate)
        // } else if (newDate.from && !newDate.to) {
        //     console.log('check lần 2');
        //     setDate(newDate)
        // } else if (isSameDay(newDate.from, newDate.to)) {
        //     console.log('check lần 3');
        //     setDate(newDate)
        // } else {
        //     const newTimeTo = format(newDate.to, 'HH:mm');
        //     handleTimeChange(newTimeTo, 'to')
        //     console.log('check lần 4', newTimeTo);
        //     setDate(newDate)
        // }
    }

    const handleTimeChange = (value: string, type: string) => {
        if (date) {
            if (date.from && type === 'from') {
                const updatedDate = {
                    ...date,
                    from: new Date(date?.from.setHours(+value?.split(":")[0], +value.split(":")[1])),
                };

                setDate(updatedDate);
            } else if (date.to && type === 'to') {
                const updatedDate = {
                    ...date,
                    to: new Date(date?.to.setHours(+value?.split(":")[0], +value.split(":")[1])),
                };

                setDate(updatedDate);
            }
        }
    };

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
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={(newDate: any) => handleDateChange(newDate)}
                            numberOfMonths={2}
                        />
                    </div>
                    <div className='flex flex-row items-center gap-2 px-2 w-full'>
                        <div className='flex flex-col gap-1 w-[50%]'>
                            <Label>Giờ nhận xe</Label>
                            <Select
                                value={date?.from ? format(date?.from, 'HH:mm') : ''}
                                onValueChange={(value) => handleTimeChange(value, 'from')}
                                defaultValue={`${date?.from ? format(date?.from, 'HH:mm') : '00:00'}`}
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
                                value={date?.to ? format(date?.to, 'HH:mm') : ''}
                                onValueChange={(value) => handleTimeChange(value, 'to')}
                                defaultValue={`${date?.to ? format(date?.to, 'HH:mm') : '00:00'}`}
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
                        <div className='text-base font-semibold'>
                            {date?.from ? format(date?.from, 'HH:mm, dd/MM') : ""}{date?.to ? ` - ${format(date?.to, 'HH:mm, dd/MM')}` : ''}
                        </div>
                        <div>
                            Số ngày thuê: 20 ngày
                        </div>
                    </div>

                    <div>
                        <Button className='xl:px-6 xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80'>
                            Áp dụng
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
