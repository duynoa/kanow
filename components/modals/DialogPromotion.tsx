import React, { useEffect, useState, useMemo } from "react"

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

import { debounce } from "lodash";
import { IInfoPromotion } from "@/types/Cars/IPromotions";

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

    const handleClickSubmit = (item: IInfoPromotion) => {
        console.log('item', item);

        queryKeyIsState({
            infoPromotion: {
                selectPromotion: "1"
            },
            dataDetailCar: {
                ...isState?.dataDetailCar,
                price: {
                    ...isState?.dataDetailCar?.price,
                    total_amount: isState?.dataDetailCar?.price?.temp_total_amount - item?.cash
                }
            }
        })

        setOpenDialogPromotion(false)
    }

    const handleSearchPromotion = debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const dataSearch = {
                code: event.target.value
            }
            const { data } = await getListPromotions(dataSearch)
            console.log('data :', data);
            if (data && data.data) {
                setDataPromotions(data?.data)
            }
        } catch (err) {
            throw err
        }

    }, 300)

    console.log('dataPromotions', dataPromotions);



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
                        onChange={(event) => handleSearchPromotion(event)}
                        placeholder="Nhập mã khuyến mãi"
                        className='py-3 rounded-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0'
                    />
                </div>
                <div className='flex flex-col gap-3 md:px-6 px-3'>
                    {
                        dataPromotions && dataPromotions.map((item, index) => {
                            // Lấy ngày hiện tại
                            const currentDate: Date | any = new Date();

                            // Chuyển đổi chuỗi ngày bắt đầu và ngày kết thúc sang đối tượng Date
                            const startDate: Date | any = new Date(item.date_start);
                            const endDate: Date | any = new Date(item.date_end);

                            // So sánh xem currentDate có nằm trong khoảng từ startDate đến endDate không
                            const isCurrentDateWithinRange = item.date_start && item.date_start ? currentDate >= startDate && currentDate <= endDate : true

                            // Tính số ngày còn lại đến ngày hết hạn
                            const daysUntilExpiration = item.date_end && item.date_start ? Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)) : null

                            // Chuỗi thông báo hiển thị số ngày còn lại đến ngày hết hạn
                            let expirationMessage = '';

                            if (daysUntilExpiration && daysUntilExpiration === 0) {
                                expirationMessage = 'Hết hạn hôm nay';
                            } else if (daysUntilExpiration && daysUntilExpiration === 1) {
                                expirationMessage = 'Hết hạn sau 1 ngày';
                            } else if (daysUntilExpiration && daysUntilExpiration <= 30) {
                                expirationMessage = `Hết hạn sau ${daysUntilExpiration} ngày`;
                            }

                            return (
                                <React.Fragment key={item.id}>
                                    {
                                        item.indefinite == 1 || item.indefinite == 0 && isCurrentDateWithinRange ?
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-3'>
                                                    <TbDiscount2 className='text-5xl min-w-[60px] text-[#2FB9BD]' />
                                                    <div className='flex flex-col'>
                                                        <div className='text-sm uppercase font-semibold'>
                                                            {item.code ? item.code : ''}
                                                        </div>
                                                        <div className='text-xs mt-1'>
                                                            {item.detail ? item?.detail : ''}
                                                        </div>
                                                        {
                                                            daysUntilExpiration !== null && daysUntilExpiration <= 30 ?
                                                                <div className='flex items-center gap-1 text-[#FA3434] '>
                                                                    <PiWarningCircleBold className='size-4 min-w-[16px]' />
                                                                    <div className="text-xs">
                                                                        {expirationMessage}
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button
                                                        onClick={() => handleClickSubmit(item)}
                                                        className='py-3 px-6 rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 caret-transparent'
                                                    >
                                                        Áp dụng
                                                    </Button>
                                                </div>
                                            </div>
                                            :
                                            <div className='flex items-center justify-between cursor-not-allowed'>
                                                <div className='flex items-center gap-3'>
                                                    <TbDiscount2 className='text-5xl min-w-[60px] text-[#E0E0E0]' />
                                                    <div className='flex flex-col'>
                                                        <div className='text-sm uppercase font-semibold text-[#E0E0E0]'>
                                                            {item.code ? item.code : ''}
                                                        </div>
                                                        <div className='text-xs text-[#E0E0E0] mt-1'>
                                                            {item.detail ? item.detail : ''}
                                                        </div>
                                                        <div className='flex items-center gap-1 text-[#E0E0E0] '>
                                                            <PiWarningCircleBold className='size-4 min-w-[16px]' />
                                                            <div className="text-xs">
                                                                Mã khuyến mãi không khả dụng
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
                                            </div>

                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
