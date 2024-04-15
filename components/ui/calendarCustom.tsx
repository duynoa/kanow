import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { differenceInDays, format, getMonth, getYear, isAfter, isBefore, isSameDay, isSameMonth, isSameYear, isWithinInterval } from 'date-fns';
import { DateFormatter, DayPicker, Modifiers, Months } from 'react-day-picker';
import { vi } from "date-fns/locale";
import { FormatNumberToThousands } from "../format/FormatNumber";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDialogCalendar } from "@/hooks/useOpenDialog";


export type CalendarProps = React.ComponentProps<typeof DayPicker>

function CalendarCustom({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps & { priceData: any[] }) {
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
                },
            ]
        }
    ]


    const seasonEmoji: Record<string, string> = {
        winter: '⛄️',
        spring: '🌸',
        summer: '🌻',
        autumn: '🍂'
    };

    const getSeason = (month: Date): string => {
        const monthNumber = month.getMonth();
        if (monthNumber >= 0 && monthNumber < 3) return 'winter';
        if (monthNumber >= 3 && monthNumber < 6) return 'spring';
        if (monthNumber >= 6 && monthNumber < 9) return 'summer';
        else return 'autumn';
    };

    const formatCaption: DateFormatter = (month, options) => {
        const season = getSeason(month);

        return (
            <>
                <span role="img" aria-label={season}>
                    {seasonEmoji[season]}
                </span>{' '}
                {format(month, 'LLLL, yyyy', { locale: options?.locale })}
            </>
        );
    };


    // custom tháng + day
    const CustomMonth = () => {
        // slider place
        const swiperRefPlace = React.useRef<any>(null);
        const [sliderStartPlace, setSliderStartPlace] = React.useState<boolean>(true)
        const [sliderEndPlace, setSliderEndPlace] = React.useState<boolean>(false)

        const handlePrev = (e: any) => {
            if (swiperRefPlace.current && !sliderStartPlace) {
                swiperRefPlace?.current?.slidePrev();
                setSliderStartPlace(swiperRefPlace.current.isBeginning)
                setSliderEndPlace(swiperRefPlace.current.isEnd)
            }
        };

        const handleNext = (e: any) => {
            if (swiperRefPlace.current && !sliderEndPlace) {
                swiperRefPlace?.current?.slideNext();
                setSliderStartPlace(swiperRefPlace.current.isBeginning)
                setSliderEndPlace(swiperRefPlace.current.isEnd)
            }
        };

        const customPagination = {
            clickable: true,

            renderBullet: function (index: number, className: string) {
                return `<span class=${className}></span>`
            },

        }

        const currentDate = new Date(); // Lấy ngày hiện tại
        const currentMonth = `0${currentDate.getMonth()}`.slice(-2); // Lấy tháng hiện tại với định dạng 2 chữ số
        const currentYear = currentDate.getFullYear(); // Lấy năm hiện tại

        // Tạo dữ liệu cho các tháng từ data
        const monthData = data.filter(item => +item.year === currentYear);

        const customDataDate = monthData.map((item) => ({
            ...item,
            price_detail: item.price_detail.map((itemDate) => ({
                ...itemDate,
                month: item.month,
                year: item.year
            }))
        }))

        // Tạo giao diện cho từng tháng dựa trên dữ liệu
        const monthComponents = customDataDate.map((monthItem, index) => {
            const month: any = monthItem.month; // Tháng
            const daysInMonth = monthItem.price_detail.length; // Số ngày trong tháng

            // Tạo các component cho từng ngày trong tháng
            const dayComponents: any[] = [];
            const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
            // Tìm thứ của ngày đầu tiên trong tháng
            // const firstDayOfMonth = new Date(currentYear, month - 1, 1).getDay(); 

            // Tìm ngày đầu tiên của tháng và ngày cuối của tháng
            // Lưu ý: month phải trừ đi 1 vì months trong JavaScript bắt đầu từ 0 (tháng 1 là tháng 0)
            const firstDayOfMonth = new Date(currentYear, month - 1, 1);
            const lastDayOfMonth = new Date(currentYear, month, 1);

            // Xác định ngày đầu tiên của tuần và ngày cuối cùng của tuần
            const firstDayOfWeek = firstDayOfMonth.getDay();
            const lastDayOfWeek = lastDayOfMonth.getDay();

            // Xác định ngày bắt đầu và kết thúc của tuần trước và tuần sau
            const startOfPreviousWeek = new Date(firstDayOfMonth);
            startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - firstDayOfWeek);

            const endOfNextWeek = new Date(lastDayOfMonth);
            endOfNextWeek.setDate(endOfNextWeek.getDate() + (6 - lastDayOfWeek));

            // Render các ngày của tháng trước
            for (let d = new Date(startOfPreviousWeek); d < firstDayOfMonth; d.setDate(d.getDate() + 1)) {
                dayComponents.push(
                    <div key={`prev-${d}`} className='col-span-1 text-center font-normal text-slate-400 3xl:text-[15px] text-sm'>
                        {/* Hiển thị ngày của tháng trước */}
                        {d.getDate()}
                    </div>
                );
            }

            // Render các ngày trong tháng
            monthItem.price_detail.forEach((dayData, i) => {
                const currentDate = new Date(dayData.date);
                const dayOfWeek = currentDate.getDay();
                // console.log('currentDate', currentDate);


                dayComponents.push(
                    <div key={`current-${i}`} className='col-span-1'>
                        <CustomDay
                            date={currentDate}
                            dataAll={dayData}
                            dayOfWeek={dayOfWeek}
                            index={i}
                        />
                    </div>
                );
            });

            // Render các ngày của tháng sau
            for (let d = new Date(lastDayOfMonth); d <= endOfNextWeek; d.setDate(d.getDate() + 1)) {
                dayComponents.push(
                    <div key={`next-${d}`} className='col-span-1 text-center font-normal text-slate-400 3xl:text-[15px] text-sm'>
                        {/* Hiển thị ngày của tháng sau */}
                        {d.getDate()}
                    </div>
                );
            }
            // console.log('firstDayOfMonth', firstDayOfMonth);


            return (
                <SwiperSlide key={index} className="flex flex-col gap-2 p-0 max-w-[400px]">
                    <div className="w-full text-center text-base font-bold mt-4 mb-2 text-[#166A71]">
                        Tháng {month}, {currentYear}
                    </div>
                    <div className="Month-grid grid grid-cols-7 text-center text-sm font-semibold">
                        {/* Render các ngày trong tuần */}
                        {
                            daysOfWeek.map((item, index) => (
                                <div key={`index-week-${index}`}>
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                    {/* Render các ngày trong tháng */}
                    <div className='grid grid-cols-7 items-center '>
                        {dayComponents}
                    </div>
                </SwiperSlide>
            );
        });
        return (
            <>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    modules={[Pagination, A11y]}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                    onSwiper={(swiper) => {
                        swiperRefPlace.current = swiper;
                    }}
                    allowTouchMove={false}
                    pagination={customPagination}
                    className='custom-swiper-calendar flex h-full'
                >

                    {/* Hiển thị các tháng */}
                    {monthComponents}
                    {/* các nút chuyển lịch */}
                    <div className='flex gap-2 absolute top-2 z-30 left-0 px-4 justify-between w-full disable-selection'>
                        <IoIosArrowBack
                            onClick={(e) => handlePrev(e)}
                            className={`${sliderStartPlace ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#2FB9BD]/10 text-[#2FB9BD] cursor-pointer hover:scale-105 duration-500 ease-in-out transition'}  p-1 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 w-8 h-8 rounded-lg`}
                        />
                        <IoIosArrowForward
                            onClick={(e) => handleNext(e)}
                            className={`${sliderEndPlace ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#2FB9BD]/10 text-[#2FB9BD] cursor-pointer hover:scale-105 duration-500 ease-in-out transition'}  p-1 2xl:w-8 2xl:h-8 xl:w-8 xl:h-8 w-8 h-8 rounded-lg`}
                        />
                    </div>
                </Swiper>
            </>
        );
    };
    // Component Day tùy chỉnh
    const CustomDay = ({ date, dataAll, dayOfWeek, index, ...props }: any) => {
        // const dayData = data.flatMap(item => item.price_detail).find(d => new Date(d.date).toDateString() === date.toDateString());

        const daysBetweenDates = (startDate: Date, endDate: Date): number => {
            const oneDay = 24 * 60 * 60 * 1000;
            const firstDate = new Date(startDate);
            const secondDate = new Date(endDate);
            const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
            return diffDays;
        };

        const datesBetweenDates = (startDate: Date, endDate: Date): Date[] => {
            const dates: Date[] = [];
            const numberOfDays = daysBetweenDates(startDate, endDate);

            for (let i = 1; i < numberOfDays; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                date.setHours(0, 0, 0, 0);
                dates.push(date);
            }

            return dates;
        };

        const checkDateInBetween = (dateToCheck: Date, datesInBetween: Date[]): boolean => {
            return datesInBetween.some((date) => {
                return dateToCheck.getTime() === date.getTime();
            });
        };

        const handleChangeDate = (item: any) => {
            const date = new Date(Number(item?.year), Number(item?.month) - 1, item?.day);

            const dateYear = date ? date?.getFullYear() : 0;
            const dateMonth = date ? date?.getMonth() : 0;
            const dateDay = date ? date?.getDate() : 0;

            const dateStartYear = dateStart ? dateStart?.getFullYear() : 0;
            const dateStartMonth = dateStart ? dateStart?.getMonth() : 0;
            const dateStartDay = dateStart ? dateStart?.getDate() : 0;

            const dateEndYear = dateEnd ? dateEnd?.getFullYear() : 0;
            const dateEndMonth = dateEnd ? dateEnd?.getMonth() : 0;
            const dateEndDay = dateEnd ? dateEnd?.getDate() : 0;

            const dayDifferenceDateStart = differenceInDays(date, dateStart ? dateStart : "");

            // Check if the new from date is different from the current from date

            // Update the state with the new date range


            // dateYear === dateStartYear ||
            //     (dateYear === dateStartYear && dateMonth === dateStartMonth) ||
            //     (dateYear === dateStartYear && dateMonth === dateStartMonth && dateDay > dateStartDay)


            // Check if the new to date is different from the current to date
            // console.log('dateYear', dateYear);
            // console.log('dateStartYear', dateStartYear);
            // console.log('dateMonth', dateMonth);
            // console.log('dateStartMonth', dateStartMonth);
            // console.log('dateDay', dateDay);
            // console.log('dateStartDay', dateStartDay);
            console.log('dateStart', dateStart);
            console.log('dateEnd', dateEnd);

            // kiểm tra nếu cùng ngày hoặc ngày sau ngày dateStart
            // cùng tháng và sau ngày dateStart
            // lớn hơn tháng và sau ngày dateStart
            const isSameInSameYearAndMonth = (date: any, compareDate: any) => {
                return (
                    isSameYear(date, compareDate) &&
                    isSameMonth(date, compareDate) &&
                    isSameDay(date, compareDate)
                )
            };
            const isAfterInSameYearAndMonth = (date: any, compareDate: any) => {
                return (
                    (isSameYear(date, compareDate) || (getYear(date) > getYear(compareDate))) &&
                    ((isSameMonth(date, compareDate) || (getMonth(date) > getMonth(compareDate))) &&
                        isAfter(date, compareDate))
                )
            };
            const isBeforeInSameYearAndMonth = (date: any, compareDate: any) => {
                return (
                    (isSameYear(date, compareDate) || (getYear(date) < getYear(compareDate))) &&
                    ((isSameMonth(date, compareDate) || (getMonth(date) < getMonth(compareDate))) &&
                        isBefore(date, compareDate))
                )
            };


            // if (!dateStart) {
            //     setDateStart(date);

            //     console.log('date 11123', date);


            // } else if (!dateEnd) {
            //     if (dateYear < dateStartYear ||
            //         (dateYear == dateStartYear && dateMonth < dateStartMonth) ||
            //         (dateYear == dateStartYear && dateMonth == dateStartMonth && dateDay < dateStartDay)
            //     ) {
            //         if (!isSameDay(dateStart ? dateStart : "", date) && dateStart) {
            //             // If it's different, keep the time of the current to dateReal and update the dateReal
            //             date.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());
            //         }
            //         setDateStart(date);
            //         console.log('date 2', date);
            //     } else {
            //         setDateEnd(date);
            //         console.log('date 3', date);
            //     }
            // } else if (dateStart && dateEnd) {
            //     if (!isSameDay(dateStart, date) && dateStart) {
            //         // If it's different, keep the time of the current from date and update the date
            //         date.setHours(dateStart.getHours(), dateStart.getMinutes(), dateStart.getSeconds());
            //     }
            //     console.log('date 4', date);

            //     setDateStart(date);
            //     setDateEnd(undefined);
            // }


            if (dateStart && dateEnd) {
                if (isAfterInSameYearAndMonth(date, dateStart) && !isSameDay(dateEnd ? dateEnd : "", date) && dayDifferenceDateStart > 2 && dayDifferenceDateStart > 0) {
                    // If it's different, keep the time of the current to dateReal and update the dateReal
                    date.setHours(dateEnd?.getHours(), dateEnd?.getMinutes(), dateEnd?.getSeconds());
                    setDateEnd(date)
                } else {
                    // If it's different, keep the time of the current to dateReal and update the dateReal
                    date.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());
                    if (isSameDay(date, dateStart) || isSameDay(date, dateEnd)) {
                        setDateStart(date)
                        setDateEnd(undefined)
                    } else {
                        setDateStart(date)
                    }
                }
            } else if (dateStart && !dateEnd) {
                date.setHours(dateStart?.getHours(), dateStart?.getMinutes(), dateStart?.getSeconds());
                if (isBeforeInSameYearAndMonth(date, dateStart)) {
                    setDateStart(date)
                } else if (isAfterInSameYearAndMonth(date, dateStart)) {
                    setDateEnd(date)
                } else {
                    setDateEnd(date)
                }
            } else {
                console.log('check123');
            }
        };

        const datesInBetween = dateStart && dateEnd ? datesBetweenDates(dateStart, dateEnd) : [];

        const firstDate = new Date(Number(dataAll?.year), Number(dataAll?.month) - 1, dataAll.day)
        const dayData = data.flatMap(item => item.price_detail).find(d => d.date == date.toISOString().split('T')[0]);

        const secondDate = new Date();
        const firstYear = firstDate.getFullYear();
        const firstMonth = firstDate.getMonth();
        const firstDay = firstDate.getDate();
        const secondYear = secondDate.getFullYear();
        const secondMonth = secondDate.getMonth();
        const secondDay = secondDate.getDate();


        const dateStartYear = dateStart?.getFullYear();
        const dateStartMonth = dateStart?.getMonth();
        const dateStartDay = dateStart?.getDate();

        const dateEndYear = dateEnd?.getFullYear();
        const dateEndMonth = dateEnd?.getMonth();
        const dateEndDay = dateEnd?.getDate();

        // ngày phía trước
        const isEarlier = dataAll?.day !== -1 ?
            firstYear < secondYear ||
            (firstYear === secondYear && firstMonth < secondMonth) ||
            (firstYear === secondYear && firstMonth === secondMonth && firstDay < secondDay)
            :
            false;

        const isPicked = dataAll?.day !== -1 ? (
            (firstYear === dateStartYear && firstMonth === dateStartMonth && firstDay === dateStartDay) ||
            (firstYear === dateEndYear && firstMonth === dateEndMonth && firstDay === dateEndDay) ||
            ((dateStartYear && dateEndYear && dateStartMonth && dateEndMonth && dateStartDay && dateEndDay) &&
                (firstYear === dateStartYear && firstYear === dateEndYear &&
                    firstMonth === dateStartMonth && firstMonth === dateEndMonth &&
                    firstDay >= dateStartDay && firstDay <= dateEndDay))
        ) : false;

        // ngày trùng khi click chọn 1 ngày
        const isMatched = dataAll?.day !== -1 ?
            firstYear == dateStartYear &&
            firstYear == dateEndYear &&
            firstMonth == dateStartMonth &&
            firstMonth == dateEndMonth &&
            firstDay == dateStartDay &&
            firstDay == dateEndDay
            :
            false;

        // ngày trong khoảng cách
        const isInRange = dataAll?.day !== -1 && (dateStart && dateEnd) && (
            (firstDate >= dateStart && firstDate <= dateEnd) ||
            (secondDate >= dateStart && secondDate <= dateEnd) ||
            (firstDate <= dateStart && secondDate >= dateEnd)
        ) && checkDateInBetween(firstDate, datesInBetween);

        console.log('dataAll', dataAll);


        if (dayData) {
            return (
                <div
                    onClick={isEarlier ? () => { } : () => handleChangeDate(dataAll)}
                    className={`
                         ${isPicked ? "bg-[#2FB9BD] text-white hover:bg-[#2FB9BD]/80 hover:text-white cursor-pointer" : ""}
                        ${isEarlier ? "text-slate-400 !cursor-default" : ""}
                        ${isInRange ? "bg-[#C2F9F9] !text-[#2FB9BD]" : ""}
                        ${dataAll?.status === 0 && !isEarlier && isInRange ? "border-2 border-[#C2F9F9] !bg-[#F6F6F7] !text-[#D3D3D3] hover:!text-[#D3D3D3]" : ""}
                        ${dataAll?.status === 0 && !isEarlier && !isPicked ? "!bg-[#F6F6F7] !text-[#D3D3D3] hover:!bg-[#F6F6F7]/80 hover:!text-[#D3D3D3]" : ""}
                        ${dataAll?.status === 0 && !isEarlier && isPicked ? "border-2 border-[#2FB9BD] !bg-[#F6F6F7] !text-[#D3D3D3] hover:!bg-[#F6F6F7]/80 hover:!text-[#D3D3D3]" : ""}
                        hover:bg-[#2FB9BD]/80 hover:text-white rounded-sm flex flex-col justify-center items-center w-10 h-10 p-2 m-1 cursor-pointer group
                `}

                // className={`
                // ${isPicked && "bg-[#2FB9BD] text-white hover:bg-[#2FB9BD]/80 hover:text-white cursor-pointer"} 
                // ${isEarlier && "text-slate-400 !cursor-default"} 
                // ${isInRange && "bg-[#C2F9F9] !text-[#2FB9BD]"}
                // ${dataAll?.status == 0 && !isEarlier && isInRange && "border-2 border-[#C2F9F9] !bg-[#F6F6F7] !text-[#D3D3D3] hover:!text-[#D3D3D3]"}
                // ${dataAll?.status == 0 && !isEarlier && !isPicked && " !bg-[#F6F6F7] !text-[#D3D3D3] hover:!bg-[#F6F6F7]/80 hover:!text-[#D3D3D3]"}
                // ${dataAll?.status == 0 && !isEarlier && isPicked && "border-2 border-[#2FB9BD] !bg-[#F6F6F7] !text-[#D3D3D3] hover:!bg-[#F6F6F7]/80 hover:!text-[#D3D3D3]"}
                // hover:bg-[#2FB9BD]/80 hover:text-white rounded-sm flex flex-col justify-center items-center w-10 h-10 p-2 m-1 cursor-pointer group`
                // }
                >
                    <div className='3xl:text-[15px] text-sm font-medium'>
                        {dayData.day}
                    </div>
                    {
                        isEarlier || dataAll?.status == 0 && !isEarlier || dataAll?.status == 0 && !isEarlier && isInRange ?
                            null
                            :
                            <div
                                className={`
                                ${isPicked && "text-white group-hover:!text-white"}
                                ${isInRange && "!text-[#2FB9BD]"}
                                ${dataAll?.status === 0 && !isEarlier && " !text-[#D3D3D3] group-hover:!text-[#D3D3D3]"}
                                text-[#2FB9BD] group-hover:bg-[#2FB9BD]/80 group-hover:text-white
                                text-[10px] font-normal
                            `}
                            // className={`
                            //     ${isPicked && "text-white group-hover:!text-white"}
                            //     ${isInRange && "!text-[#2FB9BD]"}
                            //     ${dataAll?.status == 0 && !isEarlier && " !text-[#D3D3D3] group-hover:!text-[#D3D3D3]"}
                            //     text-[#2FB9BD] group-hover:bg-[#2FB9BD]/80 group-hover:text-white
                            //     text-[10px] font-normal
                            //      `}
                            >
                                {FormatNumberToThousands(dayData.price)}
                            </div>
                    }
                </div>
            );
        }

        return (
            <div>
                {date.getDate()}
            </div>
        )
    };

    return (
        <>
            <DayPicker
                showOutsideDays={showOutsideDays}
                formatters={{ formatCaption }}
                footer
                locale={vi}
                className={cn("py-3 caret-transparent", className)}
                classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-semibold",
                    nav: "space-x-1 flex items-center",
                    nav_button: cn(
                        buttonVariants({ variant: "outline" }),
                        "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-none"
                    ),
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-12 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-12 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: cn(
                        buttonVariants({ variant: "ghost" }),
                        "h-9 w-12 p-0 font-normal aria-selected:opacity-100"
                    ),
                    day_range_end: "day-range-end",
                    day_selected: "bg-[#1EAAB1] text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-[#1EAAB1] focus:text-primary-foreground",
                    // day_today: "bg-accent text-accent-foreground",
                    day_range_start: "bg-[#1EAAB1]",
                    day_outside:
                        "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle:
                        "aria-selected:bg-accent aria-selected:text-accent-foreground",
                    day_hidden: "invisible",
                    ...classNames,
                }}
                components={{
                    IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                    IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                    Months: CustomMonth,
                }}
                {...props}
            />
        </>

    )
}
CalendarCustom.displayName = "CalendarCustom"

export { CalendarCustom }
