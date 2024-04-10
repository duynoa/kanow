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

export function DatePickerWithRange({
    className, classNameButton
}: Props) {
    const [dateReal, setDateReal] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            `${classNameButton} w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0`,
                            !dateReal && "text-muted-foreground"
                        )}
                    >
                        <FaCalendarAlt className="mr-4 text-lg text-[#1EAAB1]" />
                        {
                            dateReal?.from ? (
                                dateReal.to ? (
                                    <>
                                        {format(dateReal.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                                        {format(dateReal.to, "dd/MM/yyyy", { locale: vi })}
                                    </>
                                ) : (
                                    format(dateReal.from, "dd/MM/yyyy", { locale: vi })
                                )
                            ) : (
                                <span className='text-[#B4B8C5] font-medium'>Chọn ngày</span>
                            )
                        }
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
