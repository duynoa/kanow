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
    const [dateReal, setDateReal] = React.useState<DateRange | undefined>({
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
                            `${classNameButton} w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-sm text-xs`,
                            !dateReal && "text-muted-foreground"
                        )}
                    >
                        <FaCalendarAlt className="3xl:mr-4 mr-2 3xl:text-lg text-base text-[#1EAAB1]" />
                        {dateReal?.from ? (
                            dateReal.to ? (
                                <>
                                    {format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                    {format(dateReal.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                </>
                            ) : (
                                format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
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
                        defaultMonth={dateReal?.from}
                        selected={dateReal}
                        onSelect={setDateReal}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
