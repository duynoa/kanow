import { useEffect, useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"

import { X } from "lucide-react"

import { useDialogAnswerPolicy } from "@/hooks/useOpenDialog";
import { IInitialStateDetailCar } from "@/types/Initial/IInitial";
import { useDataPolicy } from "@/hooks/useDataQueryKey";

type Props = {}

export function DialogAnswerPolicy({ }: Props) {
    const { openDialogAnswerPolicy, setOpenDialogAnswerPolicy, type } = useDialogAnswerPolicy()
    const { isStatePolicy } = useDataPolicy()

    const handleOpenChangeModal = () => {
        setOpenDialogAnswerPolicy(!openDialogAnswerPolicy)
    }

    return (
        <Dialog
            modal
            open={openDialogAnswerPolicy}
            onOpenChange={() => handleOpenChangeModal()}
        >
            <DialogOverlay />
            <DialogContent className="px-0 py-0 lg:max-w-[720px] md:max-w-[620px] max-w-[95%] w-full max-h-[95vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <DialogClose
                    onClick={() => handleOpenChangeModal()}
                    className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                >
                    <X className="size-8 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader className='flex items-center justify-center w-full border-b drop-shadow-sm py-4'>
                    <DialogTitle className='text-2xl capitalize max-w-[70%] caret-transparent'>
                        {type === "car_rental_policy" && "Giấy tờ thuê xe"}
                        {type === "car_collateral_policy" && "Tài sản thế chấp"}
                        {type === "car_price_policy" && "Đơn giá thuê xe"}
                        {type === "car_insurance_policy" && "Bảo hiểm thuê xe"}
                        {type === "cancellation_policy" && "Thủ tục hoàn tiền & đền cọc"}
                    </DialogTitle>
                </DialogHeader>

                <div className='flex flex-col gap-2 p-4'>
                    {
                        type === "car_rental_policy" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_rental_policy ? isStatePolicy?.dataPolicy?.car_rental_policy : ''}` }} />
                    }
                    {
                        type === "car_collateral_policy" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_collateral_policy ? isStatePolicy?.dataPolicy?.car_collateral_policy : ''}` }} />
                    }
                    {
                        type === "car_price_policy" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_price_policy ? isStatePolicy?.dataPolicy?.car_price_policy : ''}` }} />
                    }
                    {
                        type === "car_insurance_policy" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_insurance_policy ? isStatePolicy?.dataPolicy?.car_insurance_policy : ''}` }} />
                    }
                    {
                        type === "cancellation_policy" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund ? isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund : ''}` }} />
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
