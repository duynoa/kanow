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

export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
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
                            "w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <FaCalendarAlt className="mr-4 text-lg text-[#1EAAB1]" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                                    {format(date.to, "dd/MM/yyyy", { locale: vi })}
                                </>
                            ) : (
                                format(date.from, "dd/MM/yyyy", { locale: vi })
                            )
                            // date.to ? (
                            //     <>
                            //         {format(date.from, "LLL dd, y")} -{" "}
                            //         {format(date.to, "LLL dd, y")}
                            //     </>
                            // ) : (
                            //     format(date.from, "LLL dd, y")
                            // )
                        ) : (
                            <span className='text-[#B4B8C5] font-medium'>Pick a date</span>
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
                        locale={vi}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
