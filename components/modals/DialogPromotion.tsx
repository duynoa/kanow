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
import { TbDiscount2 } from "react-icons/tb";

import { X } from "lucide-react"

import Image from "next/image";
import { useDialogPromotion } from "@/hooks/useOpenDialog";
import { Input } from "../ui/input";
import { PiWarningCircleBold } from "react-icons/pi";
import { FormatNumberToThousands } from "../format/FormatNumber";
import { Button } from "../ui/button";

type Props = {
}

export function DialogPromotion({ }: Props) {
    const { openDialogPromotion, setOpenDialogPromotion, dataPromotion, setDataPromotion } = useDialogPromotion()

    const handleOpenChangeModal = () => {
        setOpenDialogPromotion(!openDialogPromotion)
        setTimeout(() => {
            setDataPromotion([])
        }, 200);
    }

    return (
        <Dialog modal open={openDialogPromotion} onOpenChange={handleOpenChangeModal}>
            <DialogOverlay />
            <DialogContent className="px-0 lg:max-w-[520px] md:max-w-[480px] w-full max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <DialogClose
                    onClick={handleOpenChangeModal}
                    className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                >
                    <X className="size-8 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader className='flex items-center justify-center w-full border-b pb-4'>
                    <DialogTitle className='text-2xl capitalize'>
                        Khuyến mãi
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6">
                    <Input
                        placeholder="Nhập mã khuyến mãi"
                        className='py-3 rounded-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'
                    />
                </div>
                <div className='flex flex-col gap-3 md:px-6 px-3'>
                    {
                        dataPromotion && dataPromotion.map((item) => (
                            <div key={item.id} className='flex items-center justify-between'>
                                {
                                    item.expireTime === 0 ?
                                        <>
                                            <div className='flex items-center gap-2 cursor-not-allowed'>
                                                <TbDiscount2 className='text-6xl text-[#E0E0E0]' />
                                                <div className='flex flex-col'>
                                                    <div className='text-sm uppercase font-semibold text-[#E0E0E0]'>
                                                        {item.code ? item.code : ''}
                                                    </div>
                                                    <div className='text-sm text-[#E0E0E0]'>
                                                        {item.discountPercent === 0 ? `Giảm ${FormatNumberToThousands(item.discountMax)}` : `Giảm ${item.discountPercent} (tối đa ${FormatNumberToThousands(item.discountMax)})`}
                                                    </div>
                                                    <div className='flex items-center gap-1 text-[#E0E0E0] '>
                                                        <PiWarningCircleBold className='size-4 min-w-[16px]' />
                                                        <div className="text-xs">
                                                            {item.expireTimeDescription ? item.expireTimeDescription : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    disabled
                                                    className='py-3 px-6 rounded-lg bg-[#E0E0E0] hover:bg-[#E0E0E0]/80 text-[#7698BP] caret-transparent'
                                                >
                                                    Áp dụng
                                                </Button>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className='flex items-center gap-2'>
                                                <TbDiscount2 className='text-6xl min-w-[60px] text-[#2FB9BD]' />
                                                <div className='flex flex-col'>
                                                    <div className='text-sm uppercase font-semibold'>
                                                        {item.code ? item.code : ''}
                                                    </div>
                                                    <div className='text-sm'>
                                                        {item.discountPercent === 0 ? `Giảm ${FormatNumberToThousands(item.discountMax)}` : `Giảm ${item.discountPercent} (tối đa ${FormatNumberToThousands(item.discountMax)})`}
                                                    </div>
                                                    <div className='flex items-center gap-1 text-[#FA3434] '>
                                                        <PiWarningCircleBold className='size-4 min-w-[16px]' />
                                                        <div className="text-xs">
                                                            {item.expireTimeDescription ? item?.expireTimeDescription : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <Button className='py-3 px-6 rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80'>Áp dụng</Button>
                                            </div>
                                        </>
                                }
                            </div>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
