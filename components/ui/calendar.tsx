import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { format } from 'date-fns';
import { DateFormatter, DayPicker } from 'react-day-picker';
import { vi } from "date-fns/locale";


export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
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

    console.log('props', props);

    return (
        <>
            <DayPicker
                showOutsideDays={showOutsideDays}
                formatters={{ formatCaption }}
                footer
                locale={vi}
                className={cn("p-3", className)}
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
                    Footer: (props) => {
                        console.log('propssss : ', props);

                        return (
                            <input
                                type="time"
                                className='w-full'
                            />
                        )
                    }
                }}
                {...props}
            />
            {/* <div className='flex w-full justify-end items-center p-2'>
        <Button onClick={() => props.onSelect()} className='xxl:text-base xl:text-sm lg:text-[13px] text-sm px-6 py-3 w-fit 3xl:gap-2 gap-1 rounded-md cursor-pointer hover:scale-105 hover:bg-[#14555B]/80 transition-all overflow-hidden bg-[#14555B] text-white'>
          Áp dụng
        </Button>
      </div> */}
        </>

    )
}
Calendar.displayName = "Calendar"

export { Calendar }
