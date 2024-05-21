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
import { useRouter } from "next/navigation";

type Props = {
}

export function DialogValidate({ }: Props) {
    const router = useRouter()
    const { openDialogValidate, setOpenDialogValidate } = useDialogValidate();

    const handleCloseModal = () => {
        setOpenDialogValidate(false)
    }

    const handleSubmit = () => {
        router.push('/account')
        setOpenDialogValidate(false)
    }

    return (
        <Dialog
            modal
            open={openDialogValidate}
            onOpenChange={handleCloseModal}
        >
            <DialogOverlay />
            <DialogContent className="lg:max-w-[420px] max-w-[95%] max-h-[95vh] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
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
                    </div>
                    <div className='text-sm text-[#6F7689]'>
                        Bạn cần xác thực GPLX và số điện thoại mới có thể đặt xe
                    </div>
                    <Button
                        onClick={handleSubmit}
                        className='3xl:text-base text-sm text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full px-6 py-4 rounded-xl uppercase caret-transparent'
                    >
                        Đồng ý
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
