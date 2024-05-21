import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'
import { vi } from 'date-fns/locale'
import { format } from 'date-fns'

import { TiArrowSortedUp, TiLocation } from 'react-icons/ti'
import { PiShieldCheckFill } from "react-icons/pi";
import { FaCalendarAlt, FaRegQuestionCircle } from 'react-icons/fa'

import {
    useDialogAddress,
    useDialogAnswerPolicy,
    useDialogCalendar,
    useDialogLogin,
    useDialogPromotion,
    useDialogReportCar,
    useDialogRequestCarRental,
    useDialogValidate
} from '@/hooks/useOpenDialog'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormatDistance, FormatNumberDot, FormatNumberToDecimal, FormatNumberToThousands } from '@/components/format/FormatNumber'
import { ActionTooltip } from '@/components/tooltip/ActionTooltip'
import { useResize } from '@/hooks/useResize'

import { FaDeleteLeft } from 'react-icons/fa6'
import { useCookie } from '@/hooks/useCookie'
import { IInitialStateDetailCar } from '@/types/Initial/IInitial'
import { useDataDetailCar, useDataPolicy } from '@/hooks/useDataQueryKey'
import { usePathname, useSearchParams } from 'next/navigation'
import { toastCore } from '@/lib/toast'
import Map from '@/components/map/Maps'
import { useAuth } from '@/hooks/useAuth'

type Props = {}

const PaymentCar = ({ }: Props) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const typeCarDetail = searchParams.get('type')

    const {
        dateReal,
        dateTemp,
        numberDay,
        validateDateSubmit,
        dataCalendar,
        openDialogCalendar,
        setOpenDialogCalendar,
        setTypeCarCalendar,
    } = useDialogCalendar()

    const { setOpenDialogPromotion } = useDialogPromotion()
    const { setOpenDialogReportCar } = useDialogReportCar()
    const { setOpenDialogAnswerPolicy } = useDialogAnswerPolicy()
    const { setOpenDialogLogin } = useDialogLogin()
    const { isStatePolicy } = useDataPolicy()
    const { setDataListRequestCarRental, setOpenDialogRequestCarRental } = useDialogRequestCarRental()
    const { isStateDetailCar, queryKeyIsStateDetailCar } = useDataDetailCar()
    const { informationUser } = useAuth()
    const { openDialogValidate, setOpenDialogValidate } = useDialogValidate();

    const {
        valueAddressPickup,
        valueAddressDestination,
        indexAddressDestination,
        setType,
        setOpenDialogAddress,
        setIndexAddressDestination,
    } = useDialogAddress()

    const { getCookie } = useCookie()
    const { isVisibleTablet } = useResize()

    const latitude = 10.796455918645478; // Thay đổi giá trị này bằng vĩ độ thực tế
    const longitude = 106.63445664322627; // Thay đổi giá trị này bằng kinh độ thực tế
    const dataMaps = {
        google_map_link: ""
    }

    const handleOpenDialog = async (type: string, typeTime?: string) => {
        if (type === 'custom_promotion') {
            setOpenDialogPromotion(true)
        } else if (type === 'calendar') {
            if (typeTime && typeCarDetail == "1") {
                setOpenDialogCalendar(true)
                setTypeCarCalendar('calendar_car_autonomous')
            } else if (typeTime && typeCarDetail == "2") {
                setOpenDialogCalendar(true)
                setTypeCarCalendar('calendar_car_driver')
            }
        }
    }

    const handleChangePromotions = () => {
        queryKeyIsStateDetailCar({
            infoPromotion: {
                ...isStateDetailCar?.infoPromotion,
                selectPromotion: "0",
                activePromotion: null
            },
            dataDetailCar: {
                ...isStateDetailCar?.dataDetailCar,
                price: {
                    ...isStateDetailCar?.dataDetailCar?.price,
                    total_amount: isStateDetailCar?.dataDetailCar?.price?.temp_total_amount - isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion
                }
            }
        })
    }

    const handleRemoveDiscount = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event?.preventDefault()

        if (isStateDetailCar?.dataDetailCar?.promotion?.length > 0) {
            queryKeyIsStateDetailCar({
                dataDetailCar: {
                    ...isStateDetailCar?.dataDetailCar,
                    price: {
                        ...isStateDetailCar?.dataDetailCar?.price,
                        total_amount: isStateDetailCar?.dataDetailCar?.price?.temp_total_amount - isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion,
                        price_depoist: (isStateDetailCar?.dataDetailCar?.price?.temp_total_amount - isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion) * (isStateDetailCar?.dataDetailCar?.price?.percent_deposit / 100),
                        cash_on_delivery: ((isStateDetailCar?.dataDetailCar?.price?.temp_total_amount - isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion)) - ((isStateDetailCar?.dataDetailCar?.price?.temp_total_amount - isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion) * (isStateDetailCar?.dataDetailCar?.price?.percent_deposit / 100)),
                    }
                },
                infoPromotion: {
                    selectPromotion: "0",
                    activePromotion: null
                }
            })
        } else {
            queryKeyIsStateDetailCar({
                dataDetailCar: {
                    ...isStateDetailCar?.dataDetailCar,
                    price: {
                        ...isStateDetailCar?.dataDetailCar?.price,
                        total_amount: isStateDetailCar?.dataDetailCar?.price?.temp_total_amount,
                        price_depoist: (isStateDetailCar?.dataDetailCar?.price?.temp_total_amount) * (isStateDetailCar?.dataDetailCar?.price?.percent_deposit / 100),
                        cash_on_delivery: ((isStateDetailCar?.dataDetailCar?.price?.temp_total_amount)) - ((isStateDetailCar?.dataDetailCar?.price?.temp_total_amount) * (isStateDetailCar?.dataDetailCar?.price?.percent_deposit / 100)),
                    }
                },
                infoPromotion: {
                    selectPromotion: "0",
                    activePromotion: null
                }
            })

        }
    }

    const handleSubmitCar = () => {
        if (dataCalendar.length === 0 && getCookie !== "kanow" && getCookie !== undefined) {
            toastCore.error("Vui lòng chọn lại bộ lịch!")
        } else if (validateDateSubmit && getCookie !== "kanow" && getCookie !== undefined) {
            toastCore.error("Xe bận trong khoảng thời gian trên. Vui lòng đặt xe khác hoặc thay đổi lịch trình thích hợp!")
        } else if (
            informationUser?.id === isStateDetailCar?.dataDetailCar?.car_owner?.id &&
            getCookie !== "kanow" &&
            getCookie !== undefined
        ) {
            toastCore.error("Chủ xe không thể đặt xe của chính mình!")
        } else if ((informationUser?.drivingLiscense?.status == 0 || informationUser?.drivingLiscense?.status == 2) && getCookie !== "kanow" && getCookie !== undefined) {
            setOpenDialogValidate(true)
        } else if (getCookie !== "kanow" && getCookie !== undefined) {
            setDataListRequestCarRental(isStateDetailCar)
            setOpenDialogRequestCarRental(true)
        } else {
            setOpenDialogLogin(true)
        }
    }

    console.log('isStateDetailCar', isStateDetailCar);


    const handleOpenDialogAddress = (type: string, index?: number) => {
        setOpenDialogAddress(true)
        setType(type)
        if (index) {
            setIndexAddressDestination(index)
        }
    }

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
                        isStateDetailCar?.dataDetailCar?.promotion?.length > 0 ?
                            <div className='3xl:text-4xl md:text-3xl text-2xl text-[#D7D9E0] font-medium line-through'>
                                {isStateDetailCar?.dataDetailCar?.price?.price_before_promotion ? FormatNumberToThousands(isStateDetailCar?.dataDetailCar?.price?.price_before_promotion) : ""}
                            </div>
                            :
                            null
                    }
                    <div className='flex'>
                        <span className='3xl:text-4xl md:text-3xl text-2xl text-[#1AC5CA] font-bold'>
                            {isStateDetailCar?.dataDetailCar?.price?.price_after_promotion ? FormatNumberToThousands(isStateDetailCar?.dataDetailCar?.price?.price_after_promotion) : ""}
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
                        {
                            dateTemp ?
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        `${validateDateSubmit ? "border border-red-500" : "border-0 "}  px-4 py-3 w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70  3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-sm text-xs`,
                                        !dateTemp && "text-muted-foreground"
                                    )}
                                    onClick={() => handleOpenDialog('calendar', 'dateTemp')}
                                >
                                    <FaCalendarAlt className="3xl:mr-4 mr-2 3xl:text-lg text-base text-[#1EAAB1]" />
                                    {dateTemp?.from ? (
                                        dateTemp.to ? (
                                            <>
                                                {format(dateTemp.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                                {format(dateTemp.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                            </>
                                        ) : (
                                            format(dateTemp.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
                                        )
                                    ) : (
                                        <span className='text-[#B4B8C5] font-medium 3xl:text-base text-sm'>Chọn ngày</span>
                                    )}
                                </Button>
                                :
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                        `px-4 py-3 w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-sm text-xs`,
                                        !dateReal && "text-muted-foreground"
                                    )}
                                    onClick={() => handleOpenDialog('calendar', 'dateTemp')}
                                >
                                    <FaCalendarAlt className="3xl:mr-4 mr-2 3xl:text-lg text-base text-[#1EAAB1]" />
                                    {dateReal?.from ? (
                                        dateReal.to ? (
                                            <>
                                                {format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                                {format(dateReal.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                            </>
                                        ) : (
                                            format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
                                        )
                                    ) : (
                                        <span className='text-[#B4B8C5] font-medium 3xl:text-base text-sm'>Chọn ngày</span>
                                    )}
                                </Button>
                        }
                    </div>

                    {
                        validateDateSubmit ?
                            <div className='px-2 mt-4'>
                                <div className='3xl:text-base text-sm font-normal text-[#FF0000]'>
                                    * Xe bận trong khoảng thời gian trên. Vui lòng đặt xe khác hoặc thay đổi lịch trình thích hợp.
                                </div>
                            </div>
                            :
                            null
                    }

                    {/* <div className='flex flex-col'>
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
                    </div> */}
                </div>
                {
                    typeCarDetail == "2" ?
                        <div className='flex flex-col gap-2 bg-[#2FB9BD]/10 p-4 rounded-lg'>
                            <div className='3xl:text-base text-sm text-[#16171B] font-semibold'>
                                Lộ trình
                            </div>

                            <div className='flex flex-row items-center gap-1'>
                                <div className='3xl:text-sm text-xs text-[#767676]'>
                                    Di chuyển liên tỉnh, trả khách tại điểm đón.
                                </div>
                                {
                                    isVisibleTablet ?
                                        <div onClick={() => setOpenDialogAnswerPolicy(true, "setting_price_car")}>
                                            <FaRegQuestionCircle className='text-[#767676] text-lg cursor-pointer' />
                                        </div>
                                        :
                                        <ActionTooltip
                                            side="bottom"
                                            align="center"
                                            label={(
                                                <div className='2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                    {/* <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy ? isStatePolicy?.dataPolicy?.setting_price_car : ''}` }} /> */}
                                                    chưa có
                                                </div>
                                            )}
                                        >
                                            <div>
                                                <FaRegQuestionCircle className='text-[#767676] lg:text-lg text-base cursor-pointer' />
                                            </div>
                                        </ActionTooltip>
                                }
                            </div>

                            <div className='w-full h-full'>
                                <Map latitude={latitude} longitude={longitude} data={dataMaps} />
                            </div>


                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                        Địa điểm đón
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <TiLocation className="text-xl text-[#1EAAB1]" />
                                        </span>
                                        <div
                                            id="place"
                                            onClick={() => handleOpenDialogAddress('address_pickup')}
                                            className='pl-10  cursor-pointer pr-2 py-3 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 border-0 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                        >
                                            {
                                                isStateDetailCar.map.valueAddressPickup ?
                                                    (isStateDetailCar.map.valueAddressPickup ? isStateDetailCar.map.valueAddressPickup : 'Chọn địa điểm đón')
                                                    :
                                                    (valueAddressPickup ? valueAddressPickup : 'Chọn địa điểm đón')
                                            }
                                        </div>
                                    </div>
                                </div>

                                {
                                    isStateDetailCar.map.coordinates.latTo != 0 && isStateDetailCar.map.coordinates.lngTo != 0 ?
                                        isStateDetailCar.map.valueAddressDestination && isStateDetailCar.map.valueAddressDestination?.map((destination, index) => (
                                            <div className='flex flex-col gap-2 w-full' key={index}>
                                                <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                                    Địa điểm đến {isStateDetailCar.map.valueAddressDestination.length === 1 ? "" : index + 1}
                                                </Label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <TiLocation className="text-xl text-[#1EAAB1]" />
                                                    </span>
                                                    <div
                                                        id="place"
                                                        onClick={() => handleOpenDialogAddress('address_destination', index)}
                                                        className='pl-10  cursor-pointer pr-2 py-3 w-full 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 border-0 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                                    >
                                                        {
                                                            isStateDetailCar.map.valueAddressDestination[index].valueAddress
                                                                ?
                                                                isStateDetailCar.map.valueAddressDestination[index].valueAddress
                                                                :
                                                                'Chọn địa điểm đến'
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        valueAddressDestination && valueAddressDestination?.map((destination, index) => (
                                            <div className='flex flex-col gap-2 w-full' key={index}>
                                                <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                                    Địa điểm đến {valueAddressDestination.length === 1 ? "" : index + 1}
                                                </Label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <TiLocation className="text-xl text-[#1EAAB1]" />
                                                    </span>
                                                    <div
                                                        id="place"
                                                        onClick={() => handleOpenDialogAddress('address_destination', index)}
                                                        className='pl-10  cursor-pointer pr-2 py-3 w-full 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 border-0 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                                    >
                                                        {
                                                            valueAddressDestination[indexAddressDestination].valueAddress ?
                                                                valueAddressDestination[indexAddressDestination].valueAddress
                                                                :
                                                                'Chọn địa điểm đến'
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>

                            <div className='3xl:text-base text-sm text-[#16171B] font-semibold'>
                                Thông tin lộ trình
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-row items-center justify-between'>
                                    <div className='3xl:text-base text-sm text-[#16171B] font-thin'>
                                        Tổng lộ trình
                                    </div>
                                    <div className='3xl:text-base text-sm text-[#3E424E] font-semibold'>
                                        {isStateDetailCar?.map?.totalDistance ? FormatDistance(isStateDetailCar?.map?.totalDistance) : "0 km"}
                                    </div>
                                </div>

                                {/* Tổng số km được đi */}
                                <div className='flex flex-row items-center justify-between'>
                                    <div className='flex flex-row items-center gap-1'>
                                        <div className='3xl:text-base text-sm text-[#16171B] font-thin'>
                                            Số km được đi
                                        </div>
                                        {
                                            isVisibleTablet ?
                                                <div onClick={() => setOpenDialogAnswerPolicy(true, "total_km_car_talent")}>
                                                    <FaRegQuestionCircle className='text-[#767676] text-lg cursor-pointer' />
                                                </div>
                                                :
                                                <ActionTooltip
                                                    side="bottom"
                                                    align="center"
                                                    label={(
                                                        <div className='max-w-[320px]'>
                                                            <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_talent?.total_km_car_talent ? isStatePolicy?.dataPolicy?.car_talent?.total_km_car_talent : ''}` }} />
                                                        </div>
                                                    )}
                                                >
                                                    <div>
                                                        <FaRegQuestionCircle className='text-[#767676] lg:text-lg text-base cursor-pointer' />
                                                    </div>
                                                </ActionTooltip>
                                        }
                                    </div>
                                    <div className='3xl:text-base text-sm text-[#3E424E] font-semibold'>
                                        {isStateDetailCar?.dataDetailCar?.price?.total_km_day ? `${isStateDetailCar?.dataDetailCar?.price?.total_km_day} km/ngày` : "0 km"}
                                    </div>
                                </div>
                                {
                                    isStateDetailCar?.dataDetailCar?.surcharge_car && isStateDetailCar?.dataDetailCar?.surcharge_car.length > 0 ?
                                        <>
                                            {
                                                isStateDetailCar?.dataDetailCar?.surcharge_car?.map((item) => (
                                                    <div key={`id-${item.id}`} className='flex flex-row items-center justify-between'>
                                                        <div className='3xl:text-base text-sm text-[#16171B] font-thin'>
                                                            {item.name ? item.name : ""}
                                                        </div>
                                                        <div className='3xl:text-base text-sm text-[#3E424E] font-semibold'>
                                                            {item.value ? `${FormatNumberToDecimal(item.value, 3)} đ/ngày` : ""}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </>
                                        :
                                        null
                                }
                            </div>

                        </div>
                        :
                        null
                }


                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2 pb-3 border-b'>
                        <div className='flex justify-between items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base text-sm text-[#3E424E]'>
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
                                                <div className='2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
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

                            <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                                {FormatNumberDot(isStateDetailCar?.dataDetailCar?.price?.rent_cost_day ? isStateDetailCar?.dataDetailCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span>
                            </div>
                        </div>

                        <div className='flex justify-between items-center'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='3xl:text-base text-sm text-[#3E424E]'>
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
                                                <div className='2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
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
                            <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                                {FormatNumberDot(isStateDetailCar?.dataDetailCar?.price?.price_insurance_day ? isStateDetailCar?.dataDetailCar?.price?.price_insurance_day : 0)}đ/ngày
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className='3xl:text-base text-sm text-[#3E424E] font-medium'>
                            Tổng tạm tính
                        </div>
                        <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                            {FormatNumberDot(isStateDetailCar?.dataDetailCar?.price?.temp_total_amount)}{numberDay && numberDay === 1 ? <span>đ/ngày</span> : <span>đ/{numberDay} ngày</span>}
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
                            value={isStateDetailCar?.infoPromotion?.selectPromotion}
                        >
                            {
                                isStateDetailCar?.dataDetailCar?.promotion?.length > 0 ?
                                    <div className="flex items-center space-x-2 caret-transparent">
                                        <RadioGroupItem
                                            id="0"
                                            value={isStateDetailCar?.infoPromotion?.selectPromotion}
                                            checked={isStateDetailCar?.infoPromotion?.selectPromotion === "0" ? true : false}
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
                                                    Giảm {FormatNumberDot(isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion ? isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion : 0)}đ trên đơn giá
                                                </div>
                                            </div>
                                            {
                                                isStateDetailCar?.infoPromotion?.selectPromotion === "0" ?
                                                    <div className='3xl:text-base xl:text-sm text-xs text-[#2FB9BD] font-semibold'>
                                                        -{FormatNumberDot(isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion ? isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion : 0)}đ
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </Label>
                                    </div>
                                    :
                                    null
                            }
                            <div className="flex items-center space-x-2 caret-transparent">
                                {
                                    isStateDetailCar?.infoPromotion?.activePromotion ?
                                        <>
                                            <RadioGroupItem
                                                value={isStateDetailCar?.infoPromotion?.selectPromotion}
                                                checked={isStateDetailCar?.infoPromotion?.selectPromotion === "1" ? true : false}
                                                className='w-5 h-5 border-[#D7D9E0] data-[state=checked]:text-[#2FB9BD] data-[state=checked]:border-[#2FB9BD]'
                                            />
                                            <Label className='flex flex-row items-center justify-between gap-2 w-full cursor-pointer'>
                                                <div className='flex flex-col'>
                                                    <div className='flex items-center gap-1'>
                                                        <Image
                                                            src='/icon/icon_ticket_discount_green.svg'
                                                            alt="ticket"
                                                            width={80}
                                                            height={80}
                                                            className='3xl:w-6 3xl:max-w-6 3xl:h-6 w-5 max-w-5 h-5 object-contain fill-[#2FB9BD]'
                                                        />
                                                        <div className='w-[90%] max-w-[90%] flex items-center gap-2'>
                                                            <div className='xl:text-base text-sm'>
                                                                <span className='font-normal'>Mã</span> <span className='font-semibold uppercase'>{isStateDetailCar?.infoPromotion?.activePromotion?.code}</span>
                                                            </div>
                                                            <div onClick={(event) => handleRemoveDiscount(event)}>
                                                                <FaDeleteLeft className="size-5 text-rose-500" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    isStateDetailCar?.infoPromotion?.activePromotion?.percent !== 0 ?
                                                        <div className='3xl:text-base xl:text-sm text-xs text-[#2FB9BD] font-semibold'>
                                                            -{FormatNumberDot(isStateDetailCar?.dataDetailCar?.price?.max_money_discount ? isStateDetailCar?.dataDetailCar?.price?.max_money_discount : 0)}đ
                                                        </div>
                                                        :
                                                        <div className='3xl:text-base xl:text-sm text-xs text-[#2FB9BD] font-semibold'>
                                                            -{FormatNumberDot(isStateDetailCar?.infoPromotion?.activePromotion?.cash ? isStateDetailCar?.infoPromotion?.activePromotion?.cash : 0)}đ
                                                        </div>
                                                }
                                            </Label>
                                        </>
                                        :
                                        <>
                                            <RadioGroupItem
                                                id="1"
                                                value={isStateDetailCar?.infoPromotion?.selectPromotion}
                                                checked={isStateDetailCar?.infoPromotion?.selectPromotion === "1" ? true : false}
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
                                        </>
                                }
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='border w-full' />
                    <div className='flex justify-between items-center'>
                        <div className='3xl:text-base text-sm text-[#3E424E] font-medium'>
                            Thành tiền
                        </div>
                        <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                            {FormatNumberDot(isStateDetailCar?.dataDetailCar?.price?.total_amount ? isStateDetailCar?.dataDetailCar?.price?.total_amount : 0)}{numberDay === 1 ? <span>đ/ngày</span> : <span>đ/{numberDay} ngày</span>}
                        </div>
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={handleSubmitCar}
                    className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                >
                    Chọn thuê
                </Button>

            </div>

            <div className='flex w-full items-center justify-center'>
                {
                    getCookie !== "kanow" && getCookie !== undefined ?
                        <div onClick={() => setOpenDialogReportCar(true)} className='3xl:text-base text-sm text-[#FA3434] hover:text-[#FA3434]/80 duration-300 transition-all font-semibold cursor-pointer w-fit text-center caret-transparent'>
                            Báo cáo xe này
                        </div>
                        :
                        <div onClick={() => setOpenDialogLogin(true)} className='3xl:text-base text-sm text-[#FA3434] hover:text-[#FA3434]/80 duration-300 transition-all font-semibold cursor-pointer w-fit text-center caret-transparent'>
                            Báo cáo xe này
                        </div>
                }
            </div>
        </div>
    )
}

export default PaymentCar