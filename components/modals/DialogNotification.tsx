import React, { useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"

import { X } from "lucide-react"

import { useNotification } from "@/hooks/useNotification";

type Props = {}

export function DialogNotification({ }: Props) {
    const {
        openDialogNotification,
        isStateNotification,
        setOpenDialogNotification,
    } = useNotification()


    const handleOpenChangeModal = () => {
        setOpenDialogNotification(!openDialogNotification)
    }

    return (
        <Dialog
            modal
            open={openDialogNotification}
            onOpenChange={handleOpenChangeModal}
        >
            <DialogOverlay className='bg-[#000000]/30' />
            <DialogContent className="px-0 lg:max-w-[520px] md:max-w-[480px] w-full overflow-auto max-h-[90vh] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <DialogClose
                    onClick={handleOpenChangeModal}
                    className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                >
                    <X className="size-8 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader className='flex items-center justify-center w-full border-b pb-4'>
                    <DialogTitle className='text-2xl capitalize'>
                        Thông báo
                    </DialogTitle>
                </DialogHeader>

                {
                    isStateNotification?.dataItemNotification &&
                    <div className='px-4 text-base'>
                        {isStateNotification?.dataItemNotification?.content ? isStateNotification?.dataItemNotification?.content : ''}
                    </div>
                }
            </DialogContent>
        </Dialog>
    )
}
