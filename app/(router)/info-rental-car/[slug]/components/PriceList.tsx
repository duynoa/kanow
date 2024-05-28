import React from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'

import {
    useDialogAnswerPolicy,
    useDialogCalendar,
    useDialogCancelCar,
    useDialogReviewCar,
    useDialogPromotion
} from '@/hooks/useOpenDialog'

import { FormatNumberDot } from '@/components/format/FormatNumber'
import { ActionTooltip } from '@/components/tooltip/ActionTooltip'
import { useResize } from '@/hooks/useResize'
import { Button } from '@/components/ui/button'
import { useAlertCancel } from '@/hooks/useAlertDialog'
import { IInitialStateInfoRentalCar } from '@/types/Initial/IInitial'
import { PiShieldCheckFill } from 'react-icons/pi'
import Link from 'next/link'
import { useDataInfoRentalCar, useDataPolicy } from '@/hooks/useDataQueryKey'
import Image from 'next/image'
import { FaDeleteLeft } from 'react-icons/fa6'
import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { postChangeStatusRentalCar } from '@/services/cars/cars.services'
import { toastCore } from '@/lib/toast'

type Props = {
    params: {
        slug: string
    },
}

const PriceList = ({
    params
}: Props) => {
    const searchParams = useSearchParams()
    const typeCarDetail = searchParams.get('type')

    const { setOpenDialogReviewCar } = useDialogReviewCar()
    const { setOpenDialogAnswerPolicy } = useDialogAnswerPolicy()
    const { setOpenAlertCancel } = useAlertCancel()
    const { setOpenDialogCancelCar, setDataInfo } = useDialogCancelCar()
    const { isVisibleTablet } = useResize()
    const { isStatePolicy } = useDataPolicy()
    const { isStateInfoRentalCar } = useDataInfoRentalCar()
    const { informationUser } = useAuth()

    const handleOpenModal = (type: string) => {
        if (typeCarDetail) {
            if (type === "cancel_car") {
                setOpenDialogCancelCar(true, typeCarDetail)
                setDataInfo({
                    car_id: isStateInfoRentalCar?.detailRentalCar?.id,
                    status: isStateInfoRentalCar?.detailRentalCar?.status?.status
                })
            } else if (type === "complete_trip") {
                setOpenDialogReviewCar(true)
            } else if (type === "status_finish") {
                handleChangeStatus(type)
                setTimeout(() => {
                    setOpenDialogReviewCar(true)
                }, 500);
            }
        }
    }

    const handleChangeStatus = async (type: string) => {
        // lấy status của trạng thái +1 là ra status truyền lên 
        console.log('type type : ', type);
        try {
            let status;
            if (type === "status-0") {
                status = 1
            } else if (type === "status-2") {
                status = 3
            } else if (type === "status_finish") {
                status = 4
            }

            const dataSubmit = {
                status: status,
                transaction_id: isStateInfoRentalCar?.detailRentalCar?.id,
                type: typeCarDetail,
            }

            const { data } = await postChangeStatusRentalCar(dataSubmit)
            console.log('data data:', data);

            if (data && data.result) {
                toastCore.success(data.message)
            } else {
                toastCore.error(data.message)
            }

        } catch (err) {
            throw err
        }
    }

    return (
        <div className='flex flex-col 3xl:gap-4 lg:gap-2 gap-4 xxl:w-[30%] xxl:max-w-[30%] lg:w-[35%] lg:max-w-[35%] w-full max-w-full h-full lg:order-none order-1'>
            {/* thông tin giữa các step */}
            {
                isStateInfoRentalCar?.detailRentalCar?.status &&
                (isStateInfoRentalCar?.detailRentalCar?.status?.status === 2 || isStateInfoRentalCar?.detailRentalCar?.status?.status === 3 || isStateInfoRentalCar?.detailRentalCar?.status?.status === 4) &&
                <>
                    <div className='border-2 rounded-xl border-[#2FB9BD] bg-[#F1FCFC] flex flex-col gap-1 p-3'>
                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] font-bold'>
                            {isStateInfoRentalCar?.detailRentalCar?.status?.status === 2 && "Chuyến của bạn sắp bắt đầu"}
                            {isStateInfoRentalCar?.detailRentalCar?.status?.status === 3 && "Chuyến của bạn đang khởi hành"}
                            {isStateInfoRentalCar?.detailRentalCar?.status?.status === 4 && "Chuyến của bạn đã kết thúc"}
                        </div>
                        {
                            isStateInfoRentalCar?.detailRentalCar?.status?.status === 2 &&
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
                isStateInfoRentalCar?.detailRentalCar?.status &&
                (isStateInfoRentalCar?.detailRentalCar?.status?.status === 5 || isStateInfoRentalCar?.detailRentalCar?.status?.status === 6 || isStateInfoRentalCar?.detailRentalCar?.status?.status === 7) &&
                <>
                    <div className='border-2 rounded-xl border-[#FFA3A3] bg-[#FFEAEC] flex flex-col gap-1 p-3'>
                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#FA3434] font-bold'>
                            {/* Chủ xe đã huỷ */}
                            {isStateInfoRentalCar?.detailRentalCar?.status?.status === 5 && "Người thuê huỷ"}
                            {isStateInfoRentalCar?.detailRentalCar?.status?.status === 6 && "Chủ xe đã huỷ"}
                            {isStateInfoRentalCar?.detailRentalCar?.status?.status === 7 && "Hệ thống huỷ"}
                        </div>

                        <div className='space-x-1 text-sm text-[#6F7689] font-medium'>
                            <span>Lí do:</span>
                            <span className='text-[#383A43] font-semibold'>
                                {isStateInfoRentalCar?.detailRentalCar?.status?.note}
                            </span>
                        </div>
                    </div>

                    {/* <div className='flex flex-col gap-2'>
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
                    </div> */}
                </>
            }

            {/* Bảng tính giá  */}
            <div className='flex flex-col gap-4 3xl:p-6 p-6 border rounded-xl bg-white'>
                <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                    Bảng tính giá
                </div>

                <div className='flex flex-col gap-2 pb-2 border-b'>
                    <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
                                Đơn giá thuê
                            </div>
                            {
                                isVisibleTablet ?
                                    <div onClick={() => setOpenDialogAnswerPolicy(true, "setting_price_car")}>
                                        <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                    </div>
                                    :
                                    <ActionTooltip
                                        side="bottom"
                                        align="center"
                                        label={(
                                            <div className='flex flex-col gap-1 2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.setting_price_car ? isStatePolicy?.dataPolicy?.setting_price_car : ''}` }} />
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                        </div>
                                    </ActionTooltip>
                            }
                        </div>

                        <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                            {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price?.rent_cost_day ? isStateInfoRentalCar?.detailRentalCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span>
                        </div>
                    </div>

                    <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
                                Bảo hiểm thuê xe
                            </div>
                            {
                                isVisibleTablet ?
                                    <div onClick={() => setOpenDialogAnswerPolicy(true, "setting_insurance_car")}>
                                        <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                    </div>
                                    :
                                    <ActionTooltip
                                        side="bottom"
                                        align="center"
                                        label={(
                                            <div className='flex flex-col gap-1 2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.setting_insurance_car ? isStatePolicy?.dataPolicy?.setting_insurance_car : ''}` }} />
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                        </div>
                                    </ActionTooltip>
                            }
                        </div>
                        <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                            {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price?.price_insurance_day ? isStateInfoRentalCar?.detailRentalCar?.price?.price_insurance_day : 0)}<span>đ/ngày</span>
                        </div>
                    </div>
                </div>

                {/* Tổng tạm tính */}
                <div className='flex justify-between gap-2 items-center pb-4 border-b'>
                    <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#383A43] font-medium'>
                        Tổng tạm tính:
                    </div>
                    <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                        {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price?.temp_total_amount ? isStateInfoRentalCar?.detailRentalCar?.price?.temp_total_amount : 0)}{isStateInfoRentalCar?.detailRentalCar?.price?.number_day === 1 ? <span>đ/ngày</span> : <span>đ/{isStateInfoRentalCar?.detailRentalCar?.price?.number_day} ngày</span>}
                    </div>
                </div>
                {/* khuyến mãi */}
                {
                    isStateInfoRentalCar?.detailRentalCar?.price?.promotion ?
                        <div className='flex flex-row items-center justify-between gap-2 w-full pb-4 border-b'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src='/icon/icon_ticket_discount_green.svg'
                                    alt="ticket"
                                    width={80}
                                    height={80}
                                    className='3xl:w-6 3xl:max-w-6 3xl:h-6 w-5 max-w-5 h-5 object-contain fill-[#2FB9BD]'
                                />
                                <div className='xl:text-base text-sm font-normal'>
                                    Chương trình khuyến mãi
                                </div>
                            </div>
                            <div className='3xl:text-base xl:text-sm text-xs text-[#2FB9BD] font-bold'>
                                -{FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price?.promotion)}đ
                            </div>
                        </div>
                        :
                        null
                }

                {/* Thành tiền */}
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between gap-2 items-center pb-2 border-b'>
                        <div className='3xl:text-lg text-base text-[#383A43] font-bold'>
                            Thành tiền:
                        </div>
                        <div className='text-[#16171B] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                            {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price?.total_amount ? isStateInfoRentalCar?.detailRentalCar?.price?.total_amount : 0)}{isStateInfoRentalCar?.detailRentalCar?.price?.number_day === 1 ? <span>đ/ngày</span> : <span>đ/{isStateInfoRentalCar?.detailRentalCar?.price?.number_day} ngày</span>}
                        </div>
                    </div>

                    <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3E424E]'>
                                Cọc qua ứng dụng
                            </div>
                            {
                                isVisibleTablet ?
                                    <div onClick={() => setOpenDialogAnswerPolicy(true, "document_deposit")}>
                                        <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                    </div>
                                    :
                                    <ActionTooltip
                                        side="bottom"
                                        align="center"
                                        label={(
                                            <div className='flex flex-col gap-1 2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.document_deposit ? isStatePolicy?.dataPolicy?.document_deposit : ''}` }} />
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                        </div>
                                    </ActionTooltip>
                            }
                        </div>

                        <div className='text-[#2FB9BD] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                            {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price?.price_depoist ? isStateInfoRentalCar?.detailRentalCar?.price?.price_depoist : 0)}<span>đ</span>
                        </div>
                    </div>

                    <div className='flex justify-between gap-2 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3E424E]'>
                                Thanh toán khi nhận xe
                            </div>
                            {
                                isVisibleTablet ?
                                    <div onClick={() => setOpenDialogAnswerPolicy(true, "document_payment")}>
                                        <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                    </div>
                                    :
                                    <ActionTooltip
                                        side="bottom"
                                        align="center"
                                        label={(
                                            <div className='flex flex-col gap-1 2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.document_payment ? isStatePolicy?.dataPolicy?.document_payment : ''}` }} />
                                            </div>
                                        )}
                                    >
                                        <div>
                                            <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                        </div>
                                    </ActionTooltip>
                            }
                        </div>

                        <div className='text-[#2FB9BD] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                            {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price?.cash_on_delivery ? isStateInfoRentalCar?.detailRentalCar?.price?.cash_on_delivery : 0)}<span>đ</span>
                        </div>
                    </div>
                </div>

                {/* button */}
                {
                    informationUser?.id !== isStateInfoRentalCar?.detailRentalCar?.customer?.id &&
                        isStateInfoRentalCar?.detailRentalCar?.status &&
                        isStateInfoRentalCar?.detailRentalCar?.status?.status !== 3
                        ?
                        <div className='flex flex-col gap-2'>
                            {
                                isStateInfoRentalCar?.detailRentalCar?.status?.status === 1 &&
                                <Link
                                    href={`/payment-methods/${params.slug}?type=${typeCarDetail}`}
                                    className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                                    prefetch={false}
                                >
                                    Thanh toán cọc
                                </Link>
                            }
                            {
                                isStateInfoRentalCar?.detailRentalCar?.status && isStateInfoRentalCar?.detailRentalCar?.status?.status >= 4 &&
                                <Link
                                    href={`/detail-car/${isStateInfoRentalCar?.detailRentalCar?.car?.id}?type=${typeCarDetail}&${ConvertToSlug(isStateInfoRentalCar?.detailRentalCar?.car?.name)}`}
                                    className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                                >
                                    Đặt lại
                                </Link>
                            }
                            {
                                isStateInfoRentalCar?.detailRentalCar?.status && isStateInfoRentalCar?.detailRentalCar?.status?.status < 3 &&
                                <Button
                                    type="button"
                                    onClick={() => handleOpenModal("cancel_car")}
                                    className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-red-500 bg-white border-2 border-red-500 hover:bg-red-100 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                                >
                                    Huỷ chuyến
                                </Button>
                            }
                        </div>
                        :
                        null
                }
            </div>

            {/* Hiển thị khi là chủ xe vào xem xe của mình được thuê */}
            {
                informationUser?.id === isStateInfoRentalCar?.detailRentalCar?.customer?.id &&
                <div className='flex flex-col gap-4 3xl:p-6 p-6 border rounded-xl bg-white'>
                    <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                        Bảng tính thu nhập chủ xe
                    </div>

                    {/* đơn giá */}
                    <div className='flex flex-col gap-2 pb-2 border-b'>
                        <div className='flex justify-between gap-2 items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
                                    Đơn giá thuê - Chủ xe
                                </div>
                                {
                                    isVisibleTablet ?
                                        <div onClick={() => setOpenDialogAnswerPolicy(true, "rent_cost_owner")}>
                                            <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                        </div>
                                        :
                                        <ActionTooltip
                                            side="bottom"
                                            align="center"
                                            label={(
                                                <div className='flex flex-col gap-1 2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                    <span dangerouslySetInnerHTML={{ __html: `${isStateInfoRentalCar?.detailRentalCar?.policy?.rent_cost_owner ? isStateInfoRentalCar?.detailRentalCar?.policy?.rent_cost_owner : ''}` }} />
                                                </div>
                                            )}
                                        >
                                            <div>
                                                <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                            </div>
                                        </ActionTooltip>
                                }
                            </div>

                            <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price_owner?.rent_cost_day ? isStateInfoRentalCar?.detailRentalCar?.price_owner?.rent_cost_day : 0)}<span>đ/ngày</span>
                            </div>
                        </div>

                        <div className='flex justify-between gap-2 items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
                                    Số ngày thuê
                                </div>
                            </div>
                            <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                {isStateInfoRentalCar?.detailRentalCar?.price_owner?.number_day ? <span>{isStateInfoRentalCar?.detailRentalCar?.price_owner?.number_day} ngày</span> : <span>0 ngày</span>}
                            </div>
                        </div>
                    </div>

                    {/* doanh thu*/}
                    <div className='flex flex-col gap-2 pb-2 border-b'>
                        <div className='flex justify-between gap-2 items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
                                    Doanh thu cho thuê xe
                                </div>
                            </div>
                            <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price_owner?.rent_cost ? isStateInfoRentalCar?.detailRentalCar?.price_owner?.rent_cost : 0)}đ
                            </div>
                        </div>

                        {
                            isStateInfoRentalCar?.detailRentalCar?.price_owner?.amount_km !== 0 ?
                                <div className='flex justify-between gap-2 items-center'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
                                            {typeCarDetail == "1" && "Doanh thu giao nhận xe"}
                                            {typeCarDetail == "2" && "Doanh thu dịch vụ đưa đón"}
                                        </div>
                                    </div>
                                    <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                        {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price_owner?.amount_km ? isStateInfoRentalCar?.detailRentalCar?.price_owner?.amount_km : 0)}đ
                                    </div>
                                </div>
                                :
                                null
                        }
                        {
                            isStateInfoRentalCar?.detailRentalCar?.price_owner?.price_service_owner !== 0 ?
                                <div className='flex justify-between gap-2 items-center'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
                                            Phí dịch vụ - Chủ xe
                                        </div>
                                        {
                                            isVisibleTablet ?
                                                <div onClick={() => setOpenDialogAnswerPolicy(true, "fee_service_owner")}>
                                                    <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                                </div>
                                                :
                                                <ActionTooltip
                                                    side="bottom"
                                                    align="center"
                                                    label={(
                                                        <div className='flex flex-col gap-1 2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                            <span dangerouslySetInnerHTML={{ __html: `${isStateInfoRentalCar?.detailRentalCar?.policy?.fee_service_owner ? isStateInfoRentalCar?.detailRentalCar?.policy?.fee_service_owner : ''}` }} />
                                                        </div>
                                                    )}
                                                >
                                                    <div>
                                                        <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                                    </div>
                                                </ActionTooltip>
                                        }
                                    </div>

                                    <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                        -{FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price_owner?.price_service_owner ? isStateInfoRentalCar?.detailRentalCar?.price_owner?.price_service_owner : 0)}<span>đ</span>
                                    </div>
                                </div>
                                :
                                null
                        }
                    </div>

                    {/* khách thanh toán, số tiền cộng... */}
                    <div className='flex flex-col gap-2 pb-2 border-b'>
                        <div className='flex justify-between gap-2 items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
                                    Thu nhập chủ xe (a)
                                </div>
                            </div>
                            <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price_owner?.revenue_customer ? isStateInfoRentalCar?.detailRentalCar?.price_owner?.revenue_customer : 0)}đ
                            </div>
                        </div>

                        <div className='flex justify-between gap-2 items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
                                    Khách thanh toán cho chủ xe (b)
                                </div>
                            </div>
                            <div className='text-[#3E424E] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price_owner?.payment_recevie ? isStateInfoRentalCar?.detailRentalCar?.price_owner?.payment_recevie : 0)}đ
                            </div>
                        </div>

                        <div className='flex justify-between gap-2 items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-bold'>
                                    Số tiền cộng ví chủ xe (a-b)
                                </div>
                            </div>

                            <div className='text-[#2FB9BD] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                {FormatNumberDot(isStateInfoRentalCar?.detailRentalCar?.price_owner?.amount_receive_owner ? isStateInfoRentalCar?.detailRentalCar?.price_owner?.amount_receive_owner : 0)}<span>đ</span>
                            </div>
                        </div>
                    </div>

                    {/* Thành tiền */}
                    <div className='flex flex-col gap-2'>
                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3E424E] font-semibold'>
                            Lời nhắn riêng:
                        </div>

                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#3E424E]'>
                            {isStateInfoRentalCar?.detailRentalCar?.note ? isStateInfoRentalCar?.detailRentalCar?.note : "Không có lời nhắn"}
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        {
                            isStateInfoRentalCar?.detailRentalCar?.status?.status === 0 &&
                            <Button
                                type="button"
                                className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                                onClick={() => handleChangeStatus("status-0")}
                            >
                                Duyệt yêu cầu
                            </Button>
                        }
                        {
                            (isStateInfoRentalCar?.detailRentalCar?.status?.status === 1 || isStateInfoRentalCar?.detailRentalCar?.status?.status === 2) &&
                            <Button
                                type="button"
                                onClick={() => handleChangeStatus(isStateInfoRentalCar?.detailRentalCar?.status?.status === 2 ? "status-2" : "")}
                                disabled={isStateInfoRentalCar?.detailRentalCar?.status?.status === 1 ? true : false}
                                className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                            >
                                Giao xe
                            </Button>
                        }
                        {
                            isStateInfoRentalCar?.detailRentalCar?.status?.status === 3 &&
                            <Button
                                type="button"
                                onClick={() => handleOpenModal("status_finish")}
                                // onClick={() => handleChangeStatus("status-3")}
                                className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                            >
                                Nhận xe
                            </Button>
                        }
                        {
                            isStateInfoRentalCar?.detailRentalCar?.status && isStateInfoRentalCar?.detailRentalCar?.status?.status < 3 &&
                            <Button
                                type="button"
                                onClick={() => handleOpenModal("cancel_car")}
                                className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-red-500 bg-white border-2 border-red-500 hover:bg-red-100 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                            >
                                Huỷ chuyến
                            </Button>
                        }
                    </div>
                </div>
            }

            {/* <Button
                type="button"
                onClick={() => handleOpenModal("done_car")}
                // className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-red-500 bg-white border-2 border-red-500 hover:bg-red-100 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
            >
                Hoàn thành
            </Button> */}
        </div>
    )
}

export default PriceList