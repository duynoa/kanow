"use client"

import * as React from "react"
import { FaCalendarAlt } from "react-icons/fa";
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
    className?: string
    classNameButton?: string
}

export function DatePickerWithRangeAndTime({
    className, classNameButton
}: Props) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            `${classNameButton} w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0 3xl:text-base 2xl:text-sm xl:text-[13px] text-xs`,
                            !date && "text-muted-foreground"
                        )}
                    >
                        <FaCalendarAlt className="3xl:mr-4 mr-2 3xl:text-lg text-base text-[#1EAAB1]" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                    {format(date.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                </>
                            ) : (
                                format(date.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
                            )
                        ) : (
                            <span className='text-[#B4B8C5] font-medium 3xl:text-base text-sm'>Chọn ngày</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
