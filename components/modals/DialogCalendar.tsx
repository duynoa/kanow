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

import { X } from "lucide-react"

import { useDialogCalendar, useDialogPromotion } from "@/hooks/useOpenDialog";
import { Calendar } from "../ui/calendar";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Input } from "../ui/input";

type Props = {
}

export function DialogCalendar({ }: Props) {
    const { openDialogCalendar, date, setDate, setOpenDialogCalendar } = useDialogCalendar()

    // const [date, setDate] = useState<DateRange | undefined>({
    //     from: new Date(),
    //     to: addDays(new Date(), 20),
    // })

    const handleOpenChangeModal = () => {
        setOpenDialogCalendar(!openDialogCalendar)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const newTime = e.target.value;
        console.log('newTime :', newTime);

        if (date) {
            if (date.from && type === 'from') {
                const updatedDate = {
                    ...date,
                    from: new Date(date?.from.setHours(+newTime?.split(":")[0], +newTime.split(":")[1])),
                };

                setDate(updatedDate);
            } else if (date.to && type === 'to') {
                const updatedDate = {
                    ...date,
                    to: new Date(date?.to.setHours(+newTime?.split(":")[0], +newTime.split(":")[1])),
                };
                console.log('date?.to', date?.to);

                setDate(updatedDate);
            }
        }
    };

    return (
        <Dialog modal open={openDialogCalendar} onOpenChange={handleOpenChangeModal}>
            <DialogOverlay />
            <DialogContent className="px-0 lg:max-w-[800px] md:max-w-[480px] w-fit max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
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
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                    <div className='flex flex-row items-center gap-2 px-2'>
                        <Input
                            type="time"
                            value={date?.from ? date?.from.toLocaleTimeString('vi-VN', { hour12: false }) : ''}
                            onChange={(e) => handleTimeChange(e, 'from')}
                        />
                        <Input
                            type="time"
                            value={date?.to ? date?.to.toLocaleTimeString('vi-VN', { hour12: false }) : ''}
                            onChange={(e) => handleTimeChange(e, 'to')}
                        />
                        {/* <Input
                            type="time"
                            value={date?.from ? date?.from.toLocaleTimeString('vi-VN', { hour12: false }) : ''}
                            onChange={(e) => handleTimeChange(e, 'from')}
                        />
                        <Input
                            type="time"
                            value={date?.to ? date?.to.toLocaleTimeString('vi-VN', { hour12: false }) : ''}
                            onChange={(e) => handleTimeChange(e, 'to')}
                        /> */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
