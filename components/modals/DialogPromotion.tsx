import { useEffect, useState, useMemo } from "react"

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
import { IInitialStateDetailCar } from "@/types/Cars/ICars";
import { getListPromotions } from "@/services/cars/promotion.services";

type Props = {
    isState: IInitialStateDetailCar,
    queryKeyIsState: (key: any) => void
}

export function DialogPromotion({ isState, queryKeyIsState }: Props) {
    const { openDialogPromotion, setOpenDialogPromotion, dataPromotions, setDataPromotions } = useDialogPromotion()

    const memoizedDataPromotions = useMemo(() => dataPromotions, [dataPromotions])

    const handleOpenChangeModal = () => {
        setOpenDialogPromotion(!openDialogPromotion)
    }

    // const fetchListPromotions = async () => {
    //     try {
    //         const data = {
    //             code: ""
    //         }
    //         const res = await getListPromotions(data)

    //         console.log('res : ', res);

    //     } catch (err) {
    //         throw err
    //     }
    // }

    // useEffect(() => {

    //     fetchListPromotions()
    // }, [])



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
                        dataPromotions && dataPromotions.map((item, index) => {
                            // Lấy ngày hiện tại
                            const currentDate = new Date();

                            // Chuyển đổi chuỗi ngày bắt đầu và ngày kết thúc sang đối tượng Date
                            const startDate = new Date(item.date_start);
                            const endDate = new Date(item.date_end);

                            // So sánh xem currentDate có nằm trong khoảng từ startDate đến endDate không
                            const isCurrentDateWithinRange = item.date_start && item.date_start ? currentDate >= startDate && currentDate <= endDate : true
                            console.log('isCurrentDateWithinRange', isCurrentDateWithinRange);
                            console.log('index', index);


                            return (
                                <div key={item.id} className='flex items-center justify-between'>
                                    {
                                        item.indefinite == 1 || item.indefinite == 0 && isCurrentDateWithinRange ?
                                            <>
                                                <div className='flex items-center gap-3'>
                                                    <TbDiscount2 className='text-6xl min-w-[60px] text-[#2FB9BD]' />
                                                    <div className='flex flex-col'>
                                                        <div className='text-sm uppercase font-semibold'>
                                                            {item.code ? item.code : ''}
                                                        </div>
                                                        <div className='text-sm'>
                                                            {item.type === 1 ? `Giảm ${FormatNumberToThousands(item.cash)}` : `Giảm ${item.percent} (tối đa ${FormatNumberToThousands(item.cash)})`}
                                                        </div>
                                                        <div className='flex items-center gap-1 text-[#FA3434] '>
                                                            <PiWarningCircleBold className='size-4 min-w-[16px]' />
                                                            <div className="text-xs">
                                                                {item.detail ? item?.detail : ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button className='py-3 px-6 rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80'>Áp dụng</Button>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className='flex items-center gap-3 cursor-not-allowed'>
                                                    <TbDiscount2 className='text-6xl text-[#E0E0E0]' />
                                                    <div className='flex flex-col'>
                                                        <div className='text-sm uppercase font-semibold text-[#E0E0E0]'>
                                                            {item.code ? item.code : ''}
                                                        </div>
                                                        <div className='text-sm text-[#E0E0E0]'>
                                                            {item.type === 1 ? `Giảm ${FormatNumberToThousands(item.cash)}` : `Giảm ${item.percent}% (tối đa ${FormatNumberToThousands(item.cash)})`}
                                                        </div>
                                                        <div className='flex items-center gap-1 text-[#E0E0E0] '>
                                                            <PiWarningCircleBold className='size-4 min-w-[16px]' />
                                                            <div className="text-xs">
                                                                {item.detail ? item.detail : ''}
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

                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
