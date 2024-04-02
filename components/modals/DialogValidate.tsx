import Image from "next/image";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
} from "@/components/ui/dialog"

import { X } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

import { useDialogImage } from "@/hooks/useDialogImage";
import { useDialogValidate } from "@/hooks/useOpenDialog";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
}

export function DialogValidate({ }: Props) {
    const { openDialogValidate, setOpenDialogValidate } = useDialogValidate();

    const handleCloseModal = () => {
        setOpenDialogValidate(false)
    }

    return (
        <Dialog modal open={openDialogValidate} onOpenChange={handleCloseModal} >
            <DialogOverlay />
            <DialogContent className="lg:max-w-[420px] max-w-[95%] max-h-[95vh] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                {/* <DialogClose
                    onClick={handleCloseModal}
                    className="3xl:size-10 size-8 border flex items-center justify-center p-2 rounded-full absolute lg:-right-10 md:-right-12 right-4 3xl:-top-12 lg:-top-10 md:-top-12 -top-14 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                >
                    <X className="size-8 text-white" />
                    <span className="sr-only">Close</span>
                </DialogClose> */}
                <div className='flex flex-col gap-4'>
                    <div className="w-12 h-12">
                        <Image
                            alt="warning"
                            width={100}
                            height={100}
                            src="/icon/dialog/icon_warning.png"
                            className='w-full h-full object-contain'
                        />
                    </div>
                    <div className='text-2xl text-[#141522] font-semibold'>
                        Lưu ý
                    </div>
                    <div className='text-sm text-[#6F7689]'>
                        Bạn cần xác thực GPLX và số điện thoại mới có thể đặt xe
                    </div>
                    <Link href="/account" onClick={handleCloseModal}>
                        <Button className='3xl:text-base text-sm text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full px-6 py-4 rounded-xl uppercase caret-transparent'>
                            Đồng ý
                        </Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    )
}
