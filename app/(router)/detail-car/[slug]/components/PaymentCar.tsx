import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { vi } from 'date-fns/locale'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

import { TiArrowSortedUp } from 'react-icons/ti'
import { PiShieldCheckFill } from "react-icons/pi";
import { FaCalendarAlt, FaRegQuestionCircle } from 'react-icons/fa'

import { useDialogAnswerPolicy, useDialogCalendar, useDialogPromotion } from '@/hooks/useOpenDialog'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormatNumberDot, FormatNumberToThousands } from '@/components/format/FormatNumber'
import { IInitialStateDetailCar } from '@/types/Cars/ICars'
import { ActionTooltip } from '@/components/tooltip/ActionTooltip'
import { useResize } from '@/hooks/useResize'
import { getListPromotions } from '@/services/cars/promotion.services'


type Props = {
    isState: IInitialStateDetailCar,
    queryKeyIsState: (key: any) => void
}

const PaymentCar = ({
    isState,
    queryKeyIsState
}: Props) => {
    const { dataPromotions, setOpenDialogPromotion, setDataPromotions } = useDialogPromotion()
    const { date, setOpenDialogCalendar } = useDialogCalendar()
    const { setOpenDialogAnswerPolicy } = useDialogAnswerPolicy()
    const { isVisibleTablet } = useResize()

    const handleOpenDialog = async (type: string) => {
        if (type === 'custom_promotion') {
            setOpenDialogPromotion(true)
            if (dataPromotions.length === 0) {
                try {
                    const dataSearch = {
                        code: ""
                    }
                    const { data } = await getListPromotions(dataSearch)
                    if (data && data.data) {
                        setDataPromotions(data?.data)
                    }
                } catch (err) {
                    throw err
                }
            }

        } else if (type === 'calendar') {
            setOpenDialogCalendar(true)
        }
    }

    const handleChangePromotions = () => {
        queryKeyIsState({
            infoPromotion: {
                selectPromotion: "0"
            },
            dataDetailCar: {
                ...isState?.dataDetailCar,
                price: {
                    ...isState?.dataDetailCar?.price,
                    total_amount: isState?.dataDetailCar?.price?.temp_total_amount - isState?.dataDetailCar?.promotion[0]?.price_promotion
                }
            }
        })
    }

    console.log("isState... : ", isState)

    return (
        <div className='flex flex-col 3xl:gap-4 lg:gap-2 gap-4 xxl:w-[30%] xxl:max-w-[30%] lg:w-[35%] lg:max-w-[35%] w-full max-w-full h-full lg:order-none order-1'>
            <div className='flex flex-col gap-2 xl:px-6 xl:py-4 p-4 bg-[#C2F9F9]/[63] rounded-2xl '>
                <div className='flex flex-row items-center gap-2'>
                    <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                        Bảo hiểm thuê xe
                    </div>
                    <PiShieldCheckFill
                        onClick={() => console.log('check')}
                        className='text-[#3561FF] 3xl:text-2xl text-xl cursor-pointer'
                    />
                </div>
                <div className='3xl:text-base text-sm text-[#585F71]'>
                    Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa 2 triệu đồng trong trường hợp có sự cố ngoài ý muốn
                </div>
                <div className='3xl:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-semibold cursor-pointer duration-300 transition ease-in-out'>
                    Xem chi tiết
                </div>
            </div>

            <div className='flex flex-col 3xl:gap-6 gap-4 xl:p-6 p-4 bg-white border rounded-2xl'>
                <div className='flex items-center gap-1'>
                    {
                        isState?.dataDetailCar?.promotion?.length > 0 ?
                            <div className='3xl:text-4xl md:text-3xl text-2xl text-[#D7D9E0] font-medium line-through'>
                                {isState?.dataDetailCar?.price?.price_before_promotion ? FormatNumberToThousands(isState?.dataDetailCar?.price?.price_before_promotion) : ""}
                            </div>
                            :
                            null
                    }
                    <div className='flex'>
                        <span className='3xl:text-4xl md:text-3xl text-2xl text-[#1AC5CA] font-bold'>
                            {isState?.dataDetailCar?.price?.price_after_promotion ? FormatNumberToThousands(isState?.dataDetailCar?.price?.price_after_promotion) : ""}
                        </span>
                        <span className='3xl:text-base md:text-sm text-xs text-[#585F71] flex justify-start font-semibold capitalize'>
                            /ngày
                        </span>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='3xl:text-base text-sm text-[#16171B] font-semibold'>
                        Nhu cầu thuê xe
                    </div>
                    <Label className='3xl:text-base text-sm text-[#6F7689] w-fit' htmlFor="date">
                        Thời gian thuê
                    </Label>

                    <div>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                `px-4 py-3 w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-sm text-xs`,
                                !date && "text-muted-foreground"
                            )}
                            onClick={() => handleOpenDialog('calendar')}
                        >
                            <FaCalendarAlt className="3xl:mr-4 mr-2 3xl:text-lg text-base text-[#1EAAB1]" />
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                        {format(date.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                    </>
                                ) : (
                                    format(date.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
                                )
                            ) : (
                                <span className='text-[#B4B8C5] font-medium 3xl:text-base text-sm'>Chọn ngày</span>
                            )}
                        </Button>
                    </div>
                    {/* <DatePickerWithRangeAndTime className='w-full' classNameButton='px-4 py-3' /> */}

                    <div className='flex w-full justify-end text-[#3561FF] 3xl:text-base text-sm font-medium'>
                        Thuê tháng giảm 8%
                    </div>

                    <div className='flex flex-col'>
                        <div className='3xl:text-base text-sm text-[#FA3434] font-medium'>
                            Xe đã được thuê:
                        </div>
                        <li className='3xl:text-base text-sm text-[#FA3434] font-medium'>
                            Từ 7h30 12/3/2024 đến 7h30 14/3/2024
                        </li>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='3xl:text-base text-sm text-[#6F7689]'>
                            Địa điểm giao nhận xe
                        </div>
                        <div className="flex items-center gap-4 bg-[#F6F6F8]/70 p-4 rounded-xl w-full">
                            <Checkbox disabled id="terms" className='w-5 h-5 text-white border-[#9EA1AE] data-[state=checked]:border-[#2FB9BD] data-[state=checked]:bg-[#2FB9BD] data-[state=checked]:text-white' />
                            <label
                                htmlFor="terms"
                                className="flex flex-col 3xl:text-sm text-xs font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full caret-transparent"
                            >
                                <span className='3xl:text-sm text-xs text-[#484D5C]'>
                                    Giao xe tận nơi
                                </span>
                                <span className='3xl:text-base text-sm text-[#16171B] font-medium'>
                                    12 Hoàn Kiếm Hà Nội
                                </span>
                            </label>
                        </div>
                        <div className='3xl:text-base text-sm text-[#FA3434] font-medium'>
                            Rất tiếc, chủ xe chưa hỗ trợ giao xe tận nơi
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className="flex items-center gap-4 bg-[#F6F6F8]/70 p-4 rounded-xl w-full border border-[#1EAAB1]">
                            <Checkbox id="terms-2" className='w-5 h-5 text-white border-[#9EA1AE] data-[state=checked]:border-[#2FB9BD] data-[state=checked]:bg-[#2FB9BD] data-[state=checked]:text-white' />
                            <label
                                htmlFor="terms-2"
                                className="flex flex-col 3xl:text-sm text-xs font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full caret-transparent"
                            >
                                <span className='3xl:text-sm text-xs text-[#484D5C]'>
                                    Tự đến lấy xe
                                </span>
                                <span className='3xl:text-base text-sm text-[#16171B] font-medium'>
                                    12 Hoàn Kiếm Hà Nội
                                </span>
                            </label>
                        </div>
                        {/* <div className='text-base text-[#FA3434] font-medium'>
                        Rất tiếc, chủ xe chưa hỗ trợ giao xe tận nơi
                    </div> */}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2 pb-3 border-b'>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base text-sm text-[#3E424E]'>
                                    Đơn giá thuê
                                </div>
                                {
                                    isVisibleTablet ?
                                        <div onClick={() => setOpenDialogAnswerPolicy(true, "car_price_policy")}>
                                            <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                        </div>
                                        :
                                        <ActionTooltip
                                            side="bottom"
                                            align="center"
                                            label={(
                                                <div className='flex flex-col gap-1 text-center justify-center 2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                    <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.policy?.car_price_policy ? isState?.dataDetailCar?.policy?.car_price_policy : ''}` }} />
                                                </div>
                                            )}
                                        >
                                            <div>
                                                <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                            </div>
                                        </ActionTooltip>
                                }
                            </div>

                            <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                                {FormatNumberDot(isState?.dataDetailCar?.price?.rent_cost_day ? isState?.dataDetailCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span>
                            </div>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base text-sm text-[#3E424E]'>
                                    Bảo hiểm thuê xe
                                </div>
                                {
                                    isVisibleTablet ?
                                        <div onClick={() => setOpenDialogAnswerPolicy(true, "car_insurance_policy")}>
                                            <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                        </div>
                                        :
                                        <ActionTooltip
                                            side="bottom"
                                            align="center"
                                            label={(
                                                <div className='flex flex-col gap-1 text-center justify-center 2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                    <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.policy?.car_insurance_policy ? isState?.dataDetailCar?.policy?.car_insurance_policy : ''}` }} />
                                                </div>
                                            )}
                                        >
                                            <div>
                                                <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                            </div>
                                        </ActionTooltip>
                                }
                            </div>
                            <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                                {FormatNumberDot(isState?.dataDetailCar?.price?.price_insurance_day ? isState?.dataDetailCar?.price?.price_insurance_day : 0)}<span>đ/ngày</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className='3xl:text-base text-sm text-[#3E424E] font-medium'>
                            Tổng tạm tính
                        </div>
                        <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                            {FormatNumberDot(isState?.dataDetailCar?.price?.temp_total_amount)}<span>đ/ngày</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-2 bg-[#F9F9FA] rounded-xl p-4'>
                        <div className='3xl:text-lg xl:text-base text-sm text-[#2C2F31] font-semibold'>
                            Khuyến mãi
                        </div>

                        <RadioGroup
                            className='flex flex-col gap-3'
                            value={isState?.infoPromotion?.selectPromotion}
                        >
                            {
                                isState?.dataDetailCar?.promotion?.length > 0 ?
                                    <div className="flex items-center space-x-2 caret-transparent">
                                        <RadioGroupItem
                                            id="0"
                                            value={isState?.infoPromotion?.selectPromotion}
                                            checked={isState?.infoPromotion?.selectPromotion === "0" ? true : false}
                                            onClick={() => handleChangePromotions()}
                                            className='w-5 h-5 border-[#D7D9E0] data-[state=checked]:text-[#2FB9BD] data-[state=checked]:border-[#2FB9BD]'
                                        />
                                        <Label htmlFor="0" className='flex flex-row items-center justify-between gap-2 w-full cursor-pointer'>
                                            <div className='flex flex-col'>
                                                <div className='flex items-center gap-1'>
                                                    <Image
                                                        src='/icon/icon_ticket_discount_red.svg'
                                                        alt="ticket"
                                                        width={80}
                                                        height={80}
                                                        className='3xl:w-6 3xl:max-w-6 3xl:h-6 w-5 max-w-5 h-5 object-contain'
                                                    />
                                                    <div className='w-[90%] max-w-[90%] 3xl:text-lg xl:text-base text-sm'>
                                                        Chương trình giảm giá
                                                    </div>
                                                </div>
                                                <div className='text-[#6F7689] 3xl:text-base xl:text-sm text-xs'>
                                                    Giảm {FormatNumberDot(isState?.dataDetailCar?.promotion[0]?.price_promotion ? isState?.dataDetailCar?.promotion[0]?.price_promotion : 0)}đ trên đơn giá
                                                </div>
                                            </div>
                                            <div className='3xl:text-base xl:text-sm text-xs text-[#2FB9BD] font-semibold'>
                                                -{FormatNumberDot(isState?.dataDetailCar?.promotion[0]?.price_promotion ? isState?.dataDetailCar?.promotion[0]?.price_promotion : 0)}đ
                                            </div>
                                        </Label>
                                    </div>
                                    :
                                    null
                            }
                            <div className="flex items-center space-x-2 caret-transparent">
                                <RadioGroupItem
                                    id="1"
                                    value={isState?.infoPromotion?.selectPromotion}
                                    checked={isState?.infoPromotion?.selectPromotion === "1" ? true : false}
                                    onClick={() => handleOpenDialog('custom_promotion')}
                                    className='w-5 h-5 border-[#D7D9E0] data-[state=checked]:text-[#2FB9BD] data-[state=checked]:border-[#2FB9BD]'
                                />
                                <Label htmlFor="1" className='flex flex-row items-center justify-between gap-2 w-full cursor-pointer'>
                                    <div className='flex flex-col'>
                                        <div className='flex items-center gap-1'>
                                            <Image
                                                src='/icon/icon_ticket_discount_green.svg'
                                                alt="ticket"
                                                width={80}
                                                height={80}
                                                className='3xl:w-6 3xl:max-w-6 3xl:h-6 w-5 max-w-5 h-5 object-contain fill-[#2FB9BD]'
                                            />
                                            <div className='w-[90%] max-w-[90%] 3xl:text-lg xl:text-base text-sm '>
                                                Chương trình giảm giá
                                            </div>
                                        </div>
                                    </div>
                                    <TiArrowSortedUp className='3xl:text-2xl text-xl text-[#16171B] rotate-90' />
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='border w-full' />
                    <div className='flex justify-between items-center'>
                        <div className='3xl:text-base text-sm text-[#3E424E] font-medium'>
                            Thành tiền
                        </div>
                        <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                            {FormatNumberDot(isState?.dataDetailCar?.price?.total_amount ? isState?.dataDetailCar?.price?.total_amount : 0)}<span>đ/ngày</span>
                        </div>
                    </div>
                </div>

                <Button className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-2xl'>
                    Chọn thuê
                </Button>

            </div>

            <div className='flex w-full items-center justify-center'>
                <div className='3xl:text-base text-sm text-[#FA3434] hover:text-[#FA3434]/80 duration-300 transition-all font-semibold cursor-pointer w-fit text-center caret-transparent'>
                    Báo cáo xe này
                </div>
            </div>
        </div>
    )
}

export default PaymentCar