import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

import { ScrollArea } from "../ui/scroll-area";

import { TITLE_REVICE_DELIVER_ADDRESS } from "@/constants/DialogContants";

import { useEffect, useState } from "react";
import { useDialogStore } from "@/stores/dialogStores";
import ReviceDeliverAddress from "./status-modals/ReviceDeliverAddress";

import { AnimatePresence, motion } from 'framer-motion'
import AnimateOnScroll from "../animation/AnimateOnScroll";
import { variantSlideZoomOut } from "@/utils/variants-animation/Variants-Animation";
import AnimateOnModal from "../animation/AnimateOnModal";
import { useDialogAddress } from "@/hooks/useOpenDialog";

type Props = {};

const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 50 }
};

export function DialogCustom({ }: Props) {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const {
        openDialogCustom,
        statusDialog,
        setOpenDialogCustom,
        setStatusDialog
    } = useDialogStore()

    const handleCloseDialog = (value: boolean) => {
        if (!['stage_booking'].includes(statusDialog)) {
            setOpenDialogCustom(value)
            setStatusDialog("")
        } else {
            setOpenDialogCustom(true)
        }
    }

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog
            modal
            open={openDialogCustom}
            onOpenChange={(value: boolean) => handleCloseDialog(value)}
        >
            <DialogOverlay className="bg-[#161515]/50" />
            <AnimatePresence mode="wait">
                {
                    openDialogCustom &&
                    <AnimateOnModal
                        isVisible={openDialogCustom}
                        variants={variantSlideZoomOut}
                    >
                        <DialogContent
                            className={`p-0 bg-white border-none rounded-xl lg:max-w-[680px] max-w-[95%] max-h-[95vh] overflow-hidden 
                            focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}
                        >
                            <DialogClose
                                onClick={() => handleCloseDialog(false)}
                                className="absolute right-4 top-4 z-20 flex items-center justify-center size-8 p-2 border rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 
                                    focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                            >
                                <X className="size-4 text-black" />
                                <span className="sr-only">Close</span>
                            </DialogClose>

                            <DialogHeader className="flex items-center justify-center w-full">
                                <DialogTitle className={`text-black capitalize 2xl:text-[28px] text-2xl font-semibold`}>
                                    {statusDialog === "revice_deliver_address" && TITLE_REVICE_DELIVER_ADDRESS}
                                </DialogTitle>
                            </DialogHeader>

                            <ScrollArea
                                type="hover"
                                className={`max-h-[93dvh] overflow-y-auto`}
                            >
                                {statusDialog === "revice_deliver_address" && <ReviceDeliverAddress />}
                            </ScrollArea>
                        </DialogContent>
                    </AnimateOnModal>
                }
            </AnimatePresence>
        </Dialog >
    );
}
