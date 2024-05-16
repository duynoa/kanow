"use client"

import * as React from "react"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DropdownProps } from "react-day-picker"
import { Calendar } from "../ui/calendar"

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

// Mở rộng CalendarProps với thuộc tính form
export type Form = CalendarProps & {
    form?: (e: any) => void;
};
function DatePickerShowYear({ className, classNames, showOutsideDays = true, form, ...props }: Form) {
    return (
        <Calendar
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                vhidden: "w-[100%] flex item-center justify-center",
                caption_label: "text-sm font-medium",
                caption_dropdowns: "flex flex-wrap justify-center gap-1",
            }}
            components={{
                Dropdown: ({ value, onChange, children, ...props }: DropdownProps) => {
                    const options = React.Children.toArray(children) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[]
                    const selected = options.find((child) => child.props.value === value)
                    const handleChange = (value: string) => {
                        const changeEvent = {
                            target: { value },
                        } as React.ChangeEvent<HTMLSelectElement>
                        onChange?.(changeEvent)
                    }
                    return (
                        <Select
                            value={value?.toString()}
                            onValueChange={(value) => {
                                handleChange(value)
                                form?.(value)
                            }}

                        >
                            <SelectTrigger className="pr-1.5 focus:ring-0 w-[40%]">
                                <SelectValue>{selected?.props?.children}</SelectValue>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <ScrollArea className="h-80">
                                    {options.map((option, id: number) => (
                                        <SelectItem key={`${option.props.value}-${id}`} value={option.props.value?.toString() ?? ""}>
                                            {option.props.children}
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>
                    )
                },
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
            }}
            {...props}
        />
    )
}
DatePickerShowYear.displayName = "Calendar"

export { DatePickerShowYear }