import React from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'

import {
    useDialogAnswerPolicy,
    useDialogCalendar,
    useDialogPromotion
} from '@/hooks/useOpenDialog'

import { FormatNumberDot } from '@/components/format/FormatNumber'
import { ActionTooltip } from '@/components/tooltip/ActionTooltip'
import { useResize } from '@/hooks/useResize'
import { Button } from '@/components/ui/button'
import { useAlertCancel } from '@/hooks/useAlertDialog'
import { IInitialStateInfoRentalCar } from '@/types/Cars/IInitial'
import { PiShieldCheckFill } from 'react-icons/pi'
import Link from 'next/link'

type Props = {
    isState: IInitialStateInfoRentalCar,
    queryKeyIsState: (key: any) => void,
    params: {
        slug: string
    },
}

const PriceList = ({
    isState,
    queryKeyIsState,
    params
}: Props) => {
    const { setOpenDialogAnswerPolicy } = useDialogAnswerPolicy()
    const { setOpenAlertCancel } = useAlertCancel()
    const { isVisibleTablet } = useResize()

    const handleOpenAlertCancel = () => {
        setOpenAlertCancel(true)
    }

    return (
        <div className='flex flex-col 3xl:gap-4 lg:gap-2 gap-4 xxl:w-[30%] xxl:max-w-[30%] lg:w-[35%] lg:max-w-[35%] w-full max-w-full h-full lg:order-none order-1'>
            {/* thông tin giữa các step */}
            {
                isState?.detailRentalCar?.status &&
                (isState?.detailRentalCar?.status?.status === 2 || isState?.detailRentalCar?.status?.status === 3 || isState?.detailRentalCar?.status?.status === 4) &&
                <>
                    <div className='border-2 rounded-xl border-[#2FB9BD] bg-[#F1FCFC] flex flex-col gap-1 p-3'>
                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] font-bold'>
                            {isState?.detailRentalCar?.status?.status === 2 && "Chuyến của bạn sắp bắt đầu"}
                            {isState?.detailRentalCar?.status?.status === 3 && "Chuyến của bạn đang khởi hành"}
                            {isState?.detailRentalCar?.status?.status === 4 && "Chuyến của bạn đã kết thúc"}
                        </div>
                        {
                            isState?.detailRentalCar?.status?.status === 2 &&
                            <div className='text-sm text-[#6F7689] font-medium'>
                                13h00 12/12/2024
                            </div>
                        }
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2 w-fit caret-transparent'>
                            <span className='3xl:text-base lg:text-sm md:text-base text-sm font-semibold text-[#383A43]'>
                                Bảo hiểm thuê xe VNI đã kích hoạt
                            </span>
                            <PiShieldCheckFill
                                onClick={() => console.log('check')}
                                className='text-[#3561FF] text-xl cursor-pointer'
                            />
                        </div>
                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-200 transition font-semibold cursor-pointer caret-transparent'>
                            Xem thêm
                        </div>
                    </div>
                </>
            }
            {
                isState?.detailRentalCar?.status &&
                (isState?.detailRentalCar?.status?.status === 5 || isState?.detailRentalCar?.status?.status === 6 || isState?.detailRentalCar?.status?.status === 7) &&
                <>
                    <div className='border-2 rounded-xl border-[#FFA3A3] bg-[#FFEAEC] flex flex-col gap-1 p-3'>
                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#FA3434] font-bold'>
                            {/* Chủ xe đã huỷ */}
                            {isState?.detailRentalCar?.status?.status === 5 && "Người thuê huỷ"}
                            {isState?.detailRentalCar?.status?.status === 6 && "Chủ xe đã huỷ"}
                            {isState?.detailRentalCar?.status?.status === 7 && "Hệ thống huỷ"}
                        </div>

                        <div className='space-x-1 text-sm text-[#6F7689] font-medium'>
                            <span>Lí do:</span>
                            <span className='text-[#383A43] font-semibold'>Xe bận</span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2 w-fit caret-transparent'>
                            <span className='3xl:text-base lg:text-sm md:text-base text-sm font-semibold text-[#383A43]'>
                                Bảo hiểm thuê xe VNI
                            </span>
                            <PiShieldCheckFill
                                onClick={() => console.log('check')}
                                className='text-[#B4B8C5] text-xl cursor-pointer'
                            />
                        </div>
                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-200 transition font-semibold cursor-pointer caret-transparent'>
                            Xem thêm
                        </div>
                    </div>
                </>
            }

            <div className='flex flex-col gap-4 3xl:p-6 p-6 border rounded-xl bg-white'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Bảng tính giá
                </div>

                <div className='flex flex-col gap-2 pb-3 border-b'>
                    <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3E424E]'>
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
                                                <span dangerouslySetInnerHTML={{ __html: `` }} />
                                                {/* <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.policy?.car_price_policy ? isState?.dataDetailCar?.policy?.car_price_policy : ''}` }} /> */}
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                        </div>
                                    </ActionTooltip>
                            }
                        </div>

                        <div className='text-[#3E424E] font-semibold 3xl:text-base lg:text-sm md:text-base text-sm'>
                            {FormatNumberDot(1000000 ? 1000000 : 0)}<span>đ/ngày</span>
                            {/* {FormatNumberDot(isState?.dataDetailCar?.price?.rent_cost_day ? isState?.dataDetailCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span> */}
                        </div>
                    </div>

                    <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3E424E]'>
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
                                                <span dangerouslySetInnerHTML={{ __html: `` }} />
                                                {/* <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.policy?.car_insurance_policy ? isState?.dataDetailCar?.policy?.car_insurance_policy : ''}` }} /> */}
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                        </div>
                                    </ActionTooltip>
                            }
                        </div>
                        <div className='text-[#3E424E] font-semibold 3xl:text-base lg:text-sm md:text-base text-sm'>
                            {FormatNumberDot(1000000 ? 1000000 : 0)}<span>đ/ngày</span>
                            {/* {FormatNumberDot(isState?.dataDetailCar?.price?.price_insurance_day ? isState?.dataDetailCar?.price?.price_insurance_day : 0)}<span>đ/ngày</span> */}
                        </div>
                    </div>
                </div>

                {/* Tổng tạm tính */}
                <div className='flex justify-between gap-2 items-center'>
                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3E424E] font-medium'>
                        Tổng tạm tính:
                    </div>
                    <div className='text-[#3E424E] font-semibold 3xl:text-base lg:text-sm md:text-base text-sm'>
                        {FormatNumberDot(800000 ? 800000 : 0)}<span>đ/ngày</span>
                        {/* {FormatNumberDot(isState?.dataDetailCar?.price?.temp_total_amount ? isState?.dataDetailCar?.price?.temp_total_amount : 0)}<span>đ/ngày</span> */}
                    </div>
                </div>

                <div className='border w-full' />

                {/* Thành tiền */}
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between gap-2 items-center font-bold'>
                        <div className='3xl:text-lg text-base text-[#3E424E] font-bold'>
                            Thành tiền:
                        </div>
                        <div className='text-[#3E424E] font-bold 3xl:text-lg md:text-base text-sm'>
                            {FormatNumberDot(50000000 ? 50000000 : 0)}<span>đ/ngày</span>
                            {/* {FormatNumberDot(isState?.dataDetailCar?.price?.total_amount ? isState?.dataDetailCar?.price?.total_amount : 0)}<span>đ/ngày</span> */}
                        </div>
                    </div>

                    <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3E424E]'>
                                Cọc qua ứng dụng
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
                                                <span dangerouslySetInnerHTML={{ __html: `` }} />
                                                {/* <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.policy?.car_price_policy ? isState?.dataDetailCar?.policy?.car_price_policy : ''}` }} /> */}
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                        </div>
                                    </ActionTooltip>
                            }
                        </div>

                        <div className='text-[#3E424E] font-semibold 3xl:text-base lg:text-sm md:text-base text-sm'>
                            {FormatNumberDot(600000 ? 600000 : 0)}<span>đ/ngày</span>
                            {/* {FormatNumberDot(isState?.dataDetailCar?.price?.rent_cost_day ? isState?.dataDetailCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span> */}
                        </div>
                    </div>

                    <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3E424E]'>
                                Thanh toán khi nhận xe
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
                                                <span dangerouslySetInnerHTML={{ __html: `` }} />
                                                {/* <span dangerouslySetInnerHTML={{ __html: `${isState?.dataDetailCar?.policy?.car_price_policy ? isState?.dataDetailCar?.policy?.car_price_policy : ''}` }} /> */}
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                        </div>
                                    </ActionTooltip>
                            }
                        </div>

                        <div className='text-[#3E424E] font-semibold 3xl:text-base lg:text-sm md:text-base text-sm'>
                            {FormatNumberDot(5000000000 ? 5000000000 : 0)}<span>đ/ngày</span>
                            {/* {FormatNumberDot(isState?.dataDetailCar?.price?.rent_cost_day ? isState?.dataDetailCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span> */}
                        </div>
                    </div>
                </div>

                {/* button */}
                <div className='flex flex-col gap-2'>
                    {
                        isState?.detailRentalCar?.status?.status === 1 &&
                        <Link
                            href={`/payment-methods/${params.slug}`}
                            className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                            prefetch={false}
                        >
                            Thanh toán cọc
                        </Link>
                    }
                    {
                        isState?.detailRentalCar?.status && isState?.detailRentalCar?.status?.status >= 4 &&
                        <Button
                            type="button"
                            onClick={handleOpenAlertCancel}
                            className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                        >
                            Đặt lại
                        </Button>
                    }
                    {
                        isState?.detailRentalCar?.status && isState?.detailRentalCar?.status?.status < 3 &&
                        <Button
                            type="button"
                            onClick={handleOpenAlertCancel}
                            className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-red-500 hover:bg-red-500/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                        >
                            Huỷ chuyến
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default PriceList