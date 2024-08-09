import React, { useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"
import { TbDiscount2 } from "react-icons/tb";

import { X } from "lucide-react"

import { useDialogPromotion } from "@/hooks/useOpenDialog";
import { Input } from "../ui/input";
import { PiWarningCircleBold } from "react-icons/pi";
import { FormatNumberDot } from "../format/FormatNumber";
import { Button } from "../ui/button";
import { getListPromotions } from "@/services/cars/promotion.services";

import { debounce } from "lodash";
import { IInfoPromotion } from "@/types/Cars/IPromotions";
import moment from "moment";
import { IInitialStateDetailCar } from "@/types/Initial/IInitial";
import { useDataDetailCar } from "@/hooks/useDataQueryKey";
import { Skeleton } from "../ui/skeleton";
import SkeletonDialogPromotions from "@/components/skeleton/SkeletonDialogPromotions";

type Props = {}

export function DialogPromotions({ }: Props) {
    const {
        dataPromotions,
        openDialogPromotion,
        isLoadingDataPromotions,
        setOpenDialogPromotion,
        setDataPromotions,
    } = useDialogPromotion()

    const { isStateDetailCar, queryKeyIsStateDetailCar } = useDataDetailCar()

    const [expandedDetailPromotion, setExpandedDetailPromotion] = useState<boolean[]>([]);

    const handleToggleExpand = (id: number) => {
        setExpandedDetailPromotion((prevExpandedDetailPromotion) => {
            const newExpandedDetailPromotion = [...prevExpandedDetailPromotion];

            newExpandedDetailPromotion[id] = !newExpandedDetailPromotion[id];
            return newExpandedDetailPromotion;
        });
    };

    const handleOpenChangeModal = () => {
        setOpenDialogPromotion(!openDialogPromotion)
        setTimeout(() => {
            setExpandedDetailPromotion([])
        }, 200);
    }

    const handleClickSubmit = (item: IInfoPromotion) => {
        if (item.percent !== 0) {
            let maxMoneyDiscount = (isStateDetailCar.price?.temp_total_amount * (item?.percent / 100)) >= item?.money_max ? item?.money_max : (isStateDetailCar.price?.temp_total_amount * (item?.percent / 100))

            queryKeyIsStateDetailCar({
                infoPromotion: {
                    selectPromotion: "1",
                    activePromotion: item
                },
                price: {
                    ...isStateDetailCar.price,
                    total_amount: isStateDetailCar.price?.temp_total_amount - maxMoneyDiscount,
                    price_depoist: (isStateDetailCar.price?.temp_total_amount - maxMoneyDiscount) * (isStateDetailCar.price?.percent_deposit / 100),
                    cash_on_delivery: ((isStateDetailCar.price?.temp_total_amount - maxMoneyDiscount)) - ((isStateDetailCar.price?.temp_total_amount - maxMoneyDiscount) * (isStateDetailCar.price?.percent_deposit / 100)),
                    max_money_discount: maxMoneyDiscount
                }
            })

            setOpenDialogPromotion(false)
            setTimeout(() => {
                setExpandedDetailPromotion([])
            }, 200);
        } else {
            queryKeyIsStateDetailCar({
                infoPromotion: {
                    selectPromotion: "1",
                    activePromotion: item
                },
                price: {
                    ...isStateDetailCar.price,
                    total_amount: isStateDetailCar.price?.temp_total_amount - item?.cash,
                    price_depoist: (isStateDetailCar.price?.temp_total_amount - item?.cash) * (isStateDetailCar.price?.percent_deposit / 100),
                    cash_on_delivery: ((isStateDetailCar.price?.temp_total_amount - item?.cash) - ((isStateDetailCar.price?.temp_total_amount - item?.cash) * (isStateDetailCar.price?.percent_deposit / 100))),

                }
            })

            setOpenDialogPromotion(false)
            setTimeout(() => {
                setExpandedDetailPromotion([])
            }, 200);
        }
    }

    const handleSearchPromotion = debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const dataSearch = {
                code: event.target.value ? event.target.value : null
            }
            const { data } = await getListPromotions(dataSearch)

            if (data && data.data) {
                setDataPromotions(data?.data)
            }
        } catch (err) {
            throw err
        }

    }, 300)

    return (
        <Dialog modal open={openDialogPromotion} onOpenChange={handleOpenChangeModal}>
            <DialogOverlay />
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
                        Khuyến mãi
                    </DialogTitle>
                </DialogHeader>

                {
                    isLoadingDataPromotions ?
                        <SkeletonDialogPromotions />
                        :
                        <>
                            <div className="md:px-6 px-3">
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

                                        endDate.setHours(24);
                                        endDate.setMinutes(0);
                                        endDate.setSeconds(0);

                                        // So sánh xem currentDate có nằm trong khoảng từ startDate đến endDate không
                                        const isCurrentDateWithinRange = item.date_start && item.date_start ? currentDate >= startDate && currentDate <= endDate : true

                                        // Tính số ngày còn lại đến ngày hết hạn
                                        const daysUntilExpiration = item.date_end && item.date_start ? Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)) : null

                                        // Chuỗi thông báo hiển thị số ngày còn lại đến ngày hết hạn
                                        let expirationMessage = '';

                                        if (daysUntilExpiration && daysUntilExpiration === 1) {
                                            expirationMessage = 'Hết hạn trong hôm nay';
                                        } else if (daysUntilExpiration && daysUntilExpiration === 2) {
                                            expirationMessage = 'Hết hạn sau 2 ngày';
                                        } else if (daysUntilExpiration && daysUntilExpiration <= 30) {
                                            expirationMessage = `Hết hạn sau ${daysUntilExpiration} ngày`;
                                        }

                                        return (
                                            <React.Fragment key={`promotion-${index}`}>
                                                {
                                                    (
                                                        item.indefinite == 1 &&
                                                        isStateDetailCar.price?.number_day &&
                                                        isStateDetailCar.price?.number_day >= item.number_day || item.indefinite == 0 &&
                                                        isStateDetailCar.price?.number_day &&
                                                        isStateDetailCar.price?.number_day >= item.number_day
                                                    ) && isCurrentDateWithinRange ?
                                                        <div className='flex flex-col gap-4'>
                                                            <div className='flex items-center justify-between w-full'>
                                                                <div className='flex gap-3'>
                                                                    <TbDiscount2 className='text-5xl min-w-[52px] text-[#2FB9BD]' />
                                                                    <div className='flex flex-col'>
                                                                        <div className='text-sm uppercase font-semibold'>
                                                                            {item.code ? item.code : ''}
                                                                        </div>
                                                                        <div className='text-xs mt-1 space-x-1'>
                                                                            <span>{item.detail ? `${item?.detail}.` : ''}</span>
                                                                            {

                                                                                expandedDetailPromotion[item.id] ?
                                                                                    <span
                                                                                        onClick={() => handleToggleExpand(item.id)}
                                                                                        className='font-normal underline underline-offset-[3px] decoration-solid cursor-pointer text-[#767676] hover:text-[#767676]/80 duration-300 transition caret-transparent'
                                                                                    >
                                                                                        Ẩn chi tiết
                                                                                    </span>
                                                                                    :
                                                                                    <span
                                                                                        onClick={() => handleToggleExpand(item.id)}
                                                                                        className='font-normal underline underline-offset-[3px] decoration-solid cursor-pointer text-[#767676] hover:text-[#767676]/80 duration-300 transition caret-transparent'
                                                                                    >
                                                                                        Chi tiết
                                                                                    </span>
                                                                            }
                                                                        </div>
                                                                        {
                                                                            daysUntilExpiration !== null && daysUntilExpiration <= 30 ?
                                                                                <div className='flex items-center gap-1 text-[#FA3434] cursor-default'>
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

                                                            {

                                                                expandedDetailPromotion[item.id] ?
                                                                    <div className='flex flex-col justify-center items-center gap-2 border rounded-xl p-6'>
                                                                        <div>
                                                                            <TbDiscount2 className='text-7xl min-w-[72px] text-[#2FB9BD]' />
                                                                        </div>

                                                                        <div className='text-base uppercase font-semibold text-center'>
                                                                            {item?.code}
                                                                        </div>
                                                                        <div className='space-y-1 text-center font-normal'>
                                                                            {
                                                                                item?.date_start && item?.date_end ?
                                                                                    <div className='text-base font-normal'>
                                                                                        Áp dụng từ {moment(item?.date_start).format("DD/MM/YYYY")} đến {moment(item?.date_end).format("DD/MM/YYYY")}
                                                                                    </div>
                                                                                    :
                                                                                    null
                                                                            }
                                                                            {
                                                                                item?.percent !== 0 ?
                                                                                    <div className='text-base text-[#2FB9BD] font-medium'>
                                                                                        Ưu đãi {item?.percent}% (tối đa {FormatNumberDot(item?.money_max)}đ)
                                                                                    </div>
                                                                                    :
                                                                                    <div className='text-base text-[#2FB9BD] font-medium'>
                                                                                        Ưu đãi {FormatNumberDot(item?.cash)}đ
                                                                                    </div>
                                                                            }
                                                                        </div>
                                                                        <div className='text-sm text-[#585F71] group-hover:text-[#585F71]/80 duration-500 transition ease-in-out'>
                                                                            <span dangerouslySetInnerHTML={{ __html: `${item?.note ? item?.note : ''}` }} />
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                        :
                                                        <div className='flex flex-col gap-4 w-full'>
                                                            <div className='flex items-center justify-between cursor-not-allowed'>
                                                                <div className='flex gap-3'>
                                                                    <TbDiscount2 className='text-5xl min-w-[52px] text-[#E0E0E0]' />
                                                                    <div className='flex flex-col'>
                                                                        <div className='text-sm uppercase font-semibold text-[#E0E0E0]'>
                                                                            {item.code ? item.code : ''}
                                                                        </div>
                                                                        <div className='text-xs text-[#E0E0E0] mt-1 space-x-1'>
                                                                            <span>{item.detail ? `${item.detail}.` : ''}</span>
                                                                            <span
                                                                                onClick={() => handleToggleExpand(item.id)}
                                                                                className='underline underline-offset-[3px] decoration-solid cursor-pointer hover:text-[#E0E0E0]/80 duration-300 transition caret-transparent'
                                                                            >
                                                                                Chi tiết
                                                                            </span>
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

                                                            {
                                                                expandedDetailPromotion[item.id] ?
                                                                    <div className='flex flex-col justify-center items-center gap-2 border rounded-xl p-6'>
                                                                        <div>
                                                                            <TbDiscount2 className='text-7xl min-w-[72px] text-[#2FB9BD]' />
                                                                        </div>

                                                                        <div className='text-base uppercase font-semibold text-center'>
                                                                            {item?.code ? item?.code : ""}
                                                                        </div>
                                                                        <div className='space-y-1 text-center font-normal'>
                                                                            {
                                                                                item?.date_start && item?.date_end ?
                                                                                    <div className='text-base font-normal'>
                                                                                        Áp dụng từ {moment(item?.date_start).format("DD/MM/YYYY")} đến {moment(item?.date_end).format("DD/MM/YYYY")}
                                                                                    </div>
                                                                                    :
                                                                                    null
                                                                            }
                                                                            <div className='text-base text-[#2FB9BD] font-medium'>
                                                                                {item?.detail ? item?.detail : ""}
                                                                            </div>
                                                                        </div>
                                                                        <div className='text-sm text-[#585F71] group-hover:text-[#585F71]/80 duration-500 transition ease-in-out'>
                                                                            <span dangerouslySetInnerHTML={{ __html: `${item?.note ? item?.note : ''}` }} />
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                }
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </div>
                        </>
                }

            </DialogContent>
        </Dialog>
    )
}
