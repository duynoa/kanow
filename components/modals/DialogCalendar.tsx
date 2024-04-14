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
import { addDays, differenceInCalendarDays, differenceInDays, differenceInHours, endOfDay, format, isAfter, isSameDay, isSameMinute, parseISO, startOfDay } from "date-fns";
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

type Props = {
}

export function DialogCalendar({ }: Props) {
    const pathname = usePathname()
    const slug = useParams();

    const [dateTimeComponent, setDateTimeComponent] = useState<any>()
    const [numberDayComponent, setNumberDayComponent] = useState<any>()

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

    const data = [
        {
            "id": 13,
            "car": {
                "id": 23,
                "name": "MAZDA CX8 LUXURY 2021"
            },
            "month": "04",
            "year": "2024",
            "price_detail": [
                {
                    "id": 365,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-01",
                    "date_word": "Mon",
                    "day": 1,
                    "status": 0
                },
                {
                    "id": 366,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-02",
                    "date_word": "Tue",
                    "day": 2,
                    "status": 0
                },
                {
                    "id": 367,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-03",
                    "date_word": "Wed",
                    "day": 3,
                    "status": 0
                },
                {
                    "id": 368,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-04",
                    "date_word": "Thu",
                    "day": 4,
                    "status": 0
                },
                {
                    "id": 369,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-05",
                    "date_word": "Fri",
                    "day": 5,
                    "status": 0
                },
                {
                    "id": 370,
                    "price_month_car_id": 13,
                    "price": 1600000,
                    "date": "2024-04-06",
                    "date_word": "Sat",
                    "day": 6,
                    "status": 1
                },
                {
                    "id": 371,
                    "price_month_car_id": 13,
                    "price": 1600000,
                    "date": "2024-04-07",
                    "date_word": "Sun",
                    "day": 7,
                    "status": 1
                },
                {
                    "id": 372,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-08",
                    "date_word": "Mon",
                    "day": 8,
                    "status": 0
                },
                {
                    "id": 373,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-09",
                    "date_word": "Tue",
                    "day": 9,
                    "status": 0
                },
                {
                    "id": 374,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-10",
                    "date_word": "Wed",
                    "day": 10,
                    "status": 0
                },
                {
                    "id": 375,
                    "price_month_car_id": 13,
                    "price": 1600000,
                    "date": "2024-04-11",
                    "date_word": "Thu",
                    "day": 11,
                    "status": 1
                },
                {
                    "id": 376,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-12",
                    "date_word": "Fri",
                    "day": 12,
                    "status": 0
                },
                {
                    "id": 377,
                    "price_month_car_id": 13,
                    "price": 1600000,
                    "date": "2024-04-13",
                    "date_word": "Sat",
                    "day": 13,
                    "status": 1
                },
                {
                    "id": 378,
                    "price_month_car_id": 13,
                    "price": 1600000,
                    "date": "2024-04-14",
                    "date_word": "Sun",
                    "day": 14,
                    "status": 1
                },
                {
                    "id": 379,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-15",
                    "date_word": "Mon",
                    "day": 15,
                    "status": 2
                },
                {
                    "id": 380,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-16",
                    "date_word": "Tue",
                    "day": 16,
                    "status": 2
                },
                {
                    "id": 381,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-17",
                    "date_word": "Wed",
                    "day": 17,
                    "status": 0
                },
                {
                    "id": 382,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-18",
                    "date_word": "Thu",
                    "day": 18,
                    "status": 0
                },
                {
                    "id": 383,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-19",
                    "date_word": "Fri",
                    "day": 19,
                    "status": 0
                },
                {
                    "id": 384,
                    "price_month_car_id": 13,
                    "price": 1600000,
                    "date": "2024-04-20",
                    "date_word": "Sat",
                    "day": 20,
                    "status": 1
                },
                {
                    "id": 385,
                    "price_month_car_id": 13,
                    "price": 1600000,
                    "date": "2024-04-21",
                    "date_word": "Sun",
                    "day": 21,
                    "status": 1
                },
                {
                    "id": 386,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-22",
                    "date_word": "Mon",
                    "day": 22,
                    "status": 0
                },
                {
                    "id": 387,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-23",
                    "date_word": "Tue",
                    "day": 23,
                    "status": 0
                },
                {
                    "id": 388,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-24",
                    "date_word": "Wed",
                    "day": 24,
                    "status": 0
                },
                {
                    "id": 389,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-25",
                    "date_word": "Thu",
                    "day": 25,
                    "status": 0
                },
                {
                    "id": 390,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-26",
                    "date_word": "Fri",
                    "day": 26,
                    "status": 2
                },
                {
                    "id": 391,
                    "price_month_car_id": 13,
                    "price": 1600000,
                    "date": "2024-04-27",
                    "date_word": "Sat",
                    "day": 27,
                    "status": 2
                },
                {
                    "id": 392,
                    "price_month_car_id": 13,
                    "price": 1600000,
                    "date": "2024-04-28",
                    "date_word": "Sun",
                    "day": 28,
                    "status": 2
                },
                {
                    "id": 393,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-29",
                    "date_word": "Mon",
                    "day": 29,
                    "status": 0
                },
                {
                    "id": 394,
                    "price_month_car_id": 13,
                    "price": 1580000,
                    "date": "2024-04-30",
                    "date_word": "Tue",
                    "day": 30,
                    "status": 0
                }
            ]
        },
        {
            "id": 14,
            "car": {
                "id": 23,
                "name": "MAZDA CX8 LUXURY 2021"
            },
            "month": "05",
            "year": "2024",
            "price_detail": [
                {
                    "id": 395,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-01",
                    "date_word": "Wed",
                    "day": 1,
                    "status": 0
                },
                {
                    "id": 396,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-02",
                    "date_word": "Thu",
                    "day": 2,
                    "status": 0
                },
                {
                    "id": 397,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-03",
                    "date_word": "Fri",
                    "day": 3,
                    "status": 0
                },
                {
                    "id": 398,
                    "price_month_car_id": 14,
                    "price": 1600000,
                    "date": "2024-05-04",
                    "date_word": "Sat",
                    "day": 4,
                    "status": 1
                },
                {
                    "id": 399,
                    "price_month_car_id": 14,
                    "price": 1600000,
                    "date": "2024-05-05",
                    "date_word": "Sun",
                    "day": 5,
                    "status": 1
                },
                {
                    "id": 400,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-06",
                    "date_word": "Mon",
                    "day": 6,
                    "status": 0
                },
                {
                    "id": 401,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-07",
                    "date_word": "Tue",
                    "day": 7,
                    "status": 0
                },
                {
                    "id": 402,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-08",
                    "date_word": "Wed",
                    "day": 8,
                    "status": 0
                },
                {
                    "id": 403,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-09",
                    "date_word": "Thu",
                    "day": 9,
                    "status": 0
                },
                {
                    "id": 404,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-10",
                    "date_word": "Fri",
                    "day": 10,
                    "status": 0
                },
                {
                    "id": 405,
                    "price_month_car_id": 14,
                    "price": 1600000,
                    "date": "2024-05-11",
                    "date_word": "Sat",
                    "day": 11,
                    "status": 1
                },
                {
                    "id": 406,
                    "price_month_car_id": 14,
                    "price": 1600000,
                    "date": "2024-05-12",
                    "date_word": "Sun",
                    "day": 12,
                    "status": 1
                },
                {
                    "id": 407,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-13",
                    "date_word": "Mon",
                    "day": 13,
                    "status": 0
                },
                {
                    "id": 408,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-14",
                    "date_word": "Tue",
                    "day": 14,
                    "status": 0
                },
                {
                    "id": 409,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-15",
                    "date_word": "Wed",
                    "day": 15,
                    "status": 0
                },
                {
                    "id": 410,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-16",
                    "date_word": "Thu",
                    "day": 16,
                    "status": 0
                },
                {
                    "id": 411,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-17",
                    "date_word": "Fri",
                    "day": 17,
                    "status": 0
                },
                {
                    "id": 412,
                    "price_month_car_id": 14,
                    "price": 1600000,
                    "date": "2024-05-18",
                    "date_word": "Sat",
                    "day": 18,
                    "status": 1
                },
                {
                    "id": 413,
                    "price_month_car_id": 14,
                    "price": 1600000,
                    "date": "2024-05-19",
                    "date_word": "Sun",
                    "day": 19,
                    "status": 1
                },
                {
                    "id": 414,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-20",
                    "date_word": "Mon",
                    "day": 20,
                    "status": 0
                },
                {
                    "id": 415,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-21",
                    "date_word": "Tue",
                    "day": 21,
                    "status": 0
                },
                {
                    "id": 416,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-22",
                    "date_word": "Wed",
                    "day": 22,
                    "status": 0
                },
                {
                    "id": 417,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-23",
                    "date_word": "Thu",
                    "day": 23,
                    "status": 0
                },
                {
                    "id": 418,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-24",
                    "date_word": "Fri",
                    "day": 24,
                    "status": 0
                },
                {
                    "id": 419,
                    "price_month_car_id": 14,
                    "price": 1600000,
                    "date": "2024-05-25",
                    "date_word": "Sat",
                    "day": 25,
                    "status": 1
                },
                {
                    "id": 420,
                    "price_month_car_id": 14,
                    "price": 1600000,
                    "date": "2024-05-26",
                    "date_word": "Sun",
                    "day": 26,
                    "status": 1
                },
                {
                    "id": 421,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-27",
                    "date_word": "Mon",
                    "day": 27,
                    "status": 0
                },
                {
                    "id": 422,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-28",
                    "date_word": "Tue",
                    "day": 28,
                    "status": 0
                },
                {
                    "id": 423,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-29",
                    "date_word": "Wed",
                    "day": 29,
                    "status": 0
                },
                {
                    "id": 424,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-30",
                    "date_word": "Thu",
                    "day": 30,
                    "status": 0
                },
                {
                    "id": 425,
                    "price_month_car_id": 14,
                    "price": 1580000,
                    "date": "2024-05-31",
                    "date_word": "Fri",
                    "day": 31,
                    "status": 0
                }
            ]
        },
        {
            "id": 15,
            "car": {
                "id": 23,
                "name": "MAZDA CX8 LUXURY 2021"
            },
            "month": "06",
            "year": "2024",
            "price_detail": [
                {
                    "id": 426,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-01",
                    "date_word": "Sat",
                    "day": 1,
                    "status": 1
                },
                {
                    "id": 427,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-02",
                    "date_word": "Sun",
                    "day": 2,
                    "status": 1
                },
                {
                    "id": 428,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-03",
                    "date_word": "Mon",
                    "day": 3,
                    "status": 0
                },
                {
                    "id": 429,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-04",
                    "date_word": "Tue",
                    "day": 4,
                    "status": 0
                },
                {
                    "id": 430,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-05",
                    "date_word": "Wed",
                    "day": 5,
                    "status": 0
                },
                {
                    "id": 431,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-06",
                    "date_word": "Thu",
                    "day": 6,
                    "status": 0
                },
                {
                    "id": 432,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-07",
                    "date_word": "Fri",
                    "day": 7,
                    "status": 0
                },
                {
                    "id": 433,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-08",
                    "date_word": "Sat",
                    "day": 8,
                    "status": 1
                },
                {
                    "id": 434,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-09",
                    "date_word": "Sun",
                    "day": 9,
                    "status": 1
                },
                {
                    "id": 435,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-10",
                    "date_word": "Mon",
                    "day": 10,
                    "status": 0
                },
                {
                    "id": 436,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-11",
                    "date_word": "Tue",
                    "day": 11,
                    "status": 0
                },
                {
                    "id": 437,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-12",
                    "date_word": "Wed",
                    "day": 12,
                    "status": 0
                },
                {
                    "id": 438,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-13",
                    "date_word": "Thu",
                    "day": 13,
                    "status": 0
                },
                {
                    "id": 439,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-14",
                    "date_word": "Fri",
                    "day": 14,
                    "status": 0
                },
                {
                    "id": 440,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-15",
                    "date_word": "Sat",
                    "day": 15,
                    "status": 1
                },
                {
                    "id": 441,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-16",
                    "date_word": "Sun",
                    "day": 16,
                    "status": 1
                },
                {
                    "id": 442,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-17",
                    "date_word": "Mon",
                    "day": 17,
                    "status": 0
                },
                {
                    "id": 443,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-18",
                    "date_word": "Tue",
                    "day": 18,
                    "status": 0
                },
                {
                    "id": 444,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-19",
                    "date_word": "Wed",
                    "day": 19,
                    "status": 0
                },
                {
                    "id": 445,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-20",
                    "date_word": "Thu",
                    "day": 20,
                    "status": 0
                },
                {
                    "id": 446,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-21",
                    "date_word": "Fri",
                    "day": 21,
                    "status": 0
                },
                {
                    "id": 447,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-22",
                    "date_word": "Sat",
                    "day": 22,
                    "status": 1
                },
                {
                    "id": 448,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-23",
                    "date_word": "Sun",
                    "day": 23,
                    "status": 1
                },
                {
                    "id": 449,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-24",
                    "date_word": "Mon",
                    "day": 24,
                    "status": 0
                },
                {
                    "id": 450,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-25",
                    "date_word": "Tue",
                    "day": 25,
                    "status": 0
                },
                {
                    "id": 451,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-26",
                    "date_word": "Wed",
                    "day": 26,
                    "status": 0
                },
                {
                    "id": 452,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-27",
                    "date_word": "Thu",
                    "day": 27,
                    "status": 0
                },
                {
                    "id": 453,
                    "price_month_car_id": 15,
                    "price": 1580000,
                    "date": "2024-06-28",
                    "date_word": "Fri",
                    "day": 28,
                    "status": 0
                },
                {
                    "id": 454,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-29",
                    "date_word": "Sat",
                    "day": 29,
                    "status": 1
                },
                {
                    "id": 455,
                    "price_month_car_id": 15,
                    "price": 1600000,
                    "date": "2024-06-30",
                    "date_word": "Sun",
                    "day": 30,
                    "status": 1
                }
            ]
        }
    ]

    // change date in calender 
    const handleDateChange = (newDate: any) => {
        console.log('newDate', newDate);


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
                // setDateTemp(newDate);
                setDateTimeComponent(newDate);
            } else if (newDate && newDate.from) {
                // setDateTemp(newDate);
                setDateTimeComponent(newDate);
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
                // setDateReal(newDate);
                setDateTimeComponent(newDate);
            } else if (newDate && newDate.from) {
                // setDateReal(newDate);
                setDateTimeComponent(newDate);
            }
        }
    }

    // change time in calender
    // const handleTimeChange = (value: string, type: string) => {
    //     if (dateTimeComponent) {
    //         if (dateTimeComponent.from && type === 'from') {
    //             const updatedDate = {
    //                 ...dateTimeComponent,
    //                 from: new Date(dateTimeComponent?.from.setHours(+value?.split(":")[0], +value.split(":")[1])),
    //             };

    //             // setDateTemp(updatedDate);
    //             setDateTimeComponent(updatedDate);
    //         } else if (dateTimeComponent.to && type === 'to') {
    //             const updatedDate = {
    //                 ...dateTimeComponent,
    //                 to: new Date(dateTimeComponent?.to.setHours(+value?.split(":")[0], +value.split(":")[1])),
    //             };

    //             // setDateTemp(updatedDate);
    //             setDateTimeComponent(updatedDate);
    //         }

    //     }

    // };

    const handleTimeChange = (value: string, type: string) => {
        if (dateStart && dateEnd) {
            if (dateStart && type === 'from') {
                const updatedDateStart: any = new Date(dateStart.setHours(+value?.split(":")[0], +value.split(":")[1]))
                // setDateTemp(updatedDate);
                setDateStart(updatedDateStart);
            } else if (dateEnd && type === 'to') {
                const updatedDateEnd = new Date(dateEnd.setHours(+value?.split(":")[0], +value.split(":")[1]))
                setDateEnd(updatedDateEnd);
            }

        }

    };

    useEffect(() => {
        const daysDifference = differenceInCalendarDays(`${dateEnd}`, `${dateStart}`);
        if (dateEnd && dateStart && daysDifference) {
            console.log("Số ngày thuê:", daysDifference);
            // setNumberDay(daysDifference)
            setNumberDayComponent(daysDifference)
        } else if (dateEnd || dateStart) {
            // setNumberDay(1)
            setNumberDayComponent(1)
        }
    }, [slug, dateStart, dateEnd])

    useEffect(() => {
        setDateTemp(dateReal)
        setNumberDay(numberDayComponent)
        setDateTimeComponent(dateReal)
    }, [slug])

    const isSubmitAllowed = (from: Date | string, to: Date | string): boolean => {
        const fromDate = typeof from === 'string' ? parseISO(from) : from;
        const toDate = typeof to === 'string' ? parseISO(to) : to;

        // Tính số giờ và số ngày giữa 'from' và 'to'
        const diffHours = differenceInHours(toDate, fromDate);
        console.log('diffHours : ', diffHours);

        // số giờ ít hơn 5, không cho phép submit
        if (diffHours <= 5) {
            return false;
        } else {
            return true;
        }

    };

    const handleSubmitDateTime = () => {
        const { from, to } = dateTimeComponent;
        console.log('isSubmitAllowed', isSubmitAllowed(from, to));


        if (!from || !to) {
            toastCore.error("Vui lòng chọn cả ngày và giờ trả xe!");
            return;
        }

        if (isAfter(from, to)) {
            toastCore.error("Vui lòng chọn giờ trả xe sau giờ nhận xe trong ngày!");
            return;
        }

        if (!isSubmitAllowed(from, to)) {
            toastCore.error("Giờ nhận xe phải trước giờ trả xe ít nhất 5 giờ!");
            return;
        }

        // Nếu tất cả điều kiện đều đúng, tiến hành setDate và setNumberDay
        if (pathname.startsWith('/detail-car/')) {
            setDateTemp(dateTimeComponent);
        } else {
            setDateReal(dateTimeComponent);
        }
        setNumberDay(numberDayComponent);
    };

    useEffect(() => {
        if (pathname.startsWith('/detail-car/')) {
            // setNumberDayComponent(numberDay)
            setDateTimeComponent(dateTemp)
        } else {
            setDateTimeComponent(dateReal)
        }
    }, [openDialogCalendar])


    console.log('dateTimeComponent', dateTimeComponent);

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
                    <div className='px-2 border m-2 rounded-lg drop-shadow-md max-w-[760px]'>
                        <CalendarCustom
                            initialFocus
                            priceData={data}
                            mode="range"
                            // dateStart={dateTimeComponent?.from}
                            // dateEnd={dateTimeComponent?.to}
                            defaultMonth={dateTimeComponent?.from}
                            selected={dateTimeComponent}
                            onSelect={(newDate: any) => handleDateChange(newDate)}
                        />
                    </div>
                    <div className='flex flex-row items-center gap-2 px-2 w-full'>
                        <div className='flex flex-col gap-1 w-[50%]'>
                            <Label>Giờ nhận xe</Label>
                            <Select
                                value={(dateStart ? format(dateStart, 'HH:mm') : '')}
                                onValueChange={(value) => handleTimeChange(value, 'from')}
                                defaultValue={`${(dateStart ? format(dateStart, 'HH:mm') : '00:00')}`}
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
                                value={(dateEnd ? format(dateEnd, 'HH:mm') : '')}
                                onValueChange={(value) => handleTimeChange(value, 'to')}
                                defaultValue={`${(dateEnd ? format(dateEnd, 'HH:mm') : '00:00')}`}
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
                            {dateStart ? format(dateStart, 'HH:mm, dd/MM') : ""}{dateEnd ? ` - ${format(dateEnd, 'HH:mm, dd/MM')}` : ''}
                        </div>
                        <div>
                            Số ngày thuê: {numberDayComponent} ngày
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
