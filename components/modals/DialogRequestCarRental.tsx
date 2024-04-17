
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { memo, useEffect, useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

import { FaRegQuestionCircle, FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { PiShieldCheckFill } from "react-icons/pi";
import { HiClock } from "react-icons/hi2";
import { TiLocation } from "react-icons/ti";

import { FormatNumberDot, FormatNumberHundred, FormatNumberToDecimal, FormatPointStar } from "../format/FormatNumber";
import { ActionTooltip } from "../tooltip/ActionTooltip";

import { useResize } from "@/hooks/useResize";
import { useDialogAnswerPolicy, useDialogCalendar, useDialogRequestCarRental } from "@/hooks/useOpenDialog";

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useDataPolicy } from "@/hooks/useDataQueryKey";
import moment from "moment";
import { postRequestRentalCar } from "@/services/cars/cars.services";
import { toastCore } from "@/lib/toast";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

export const DialogRequestCarRental = memo(({ }: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const { isVisibleTablet } = useResize()
    const { setOpenDialogAnswerPolicy } = useDialogAnswerPolicy()
    const { isStatePolicy } = useDataPolicy()
    const { openDialogRequestCarRental, dataListRequestCarRental, setOpenDialogRequestCarRental } = useDialogRequestCarRental()
    const { dateReal, numberDay, dateTemp } = useDialogCalendar()

    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [checkPolicy, setCheckPolicy] = useState<boolean>(true)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // tác dụng nếu qua page khác thì sẽ tắt dialog này
    useEffect(() => {
        if (!pathname.startsWith('/detail-car/')) {
            setOpenDialogRequestCarRental(false)
        }
    }, [pathname])

    const form = useForm({
        defaultValues: {
            note: ""
        },
    });

    const onSubmit = async (values: any) => {
        try {

            const dataRequest: any = {
                data: {
                    car_id: dataListRequestCarRental?.dataDetailCar?.id,
                    date_start: dateTemp ? moment(dateTemp?.from).format("YYYY-MM-DD HH:mm") : moment(dateReal?.from).format("YYYY-MM-DD HH:mm"),
                    date_end: dateTemp ? moment(dateTemp?.to).format("YYYY-MM-DD HH:mm") : moment(dateReal?.from).format("YYYY-MM-DD HH:mm"),
                    rent_cost: dataListRequestCarRental?.dataDetailCar?.price?.rent_cost,
                    quantity: numberDay,
                    promotion_car_id: !dataListRequestCarRental?.infoPromotion?.activePromotion && dataListRequestCarRental?.dataDetailCar?.promotion && dataListRequestCarRental?.dataDetailCar?.promotion?.length > 0 ? dataListRequestCarRental?.dataDetailCar?.promotion[0]?.id : 0,
                }
            }
            if (dataListRequestCarRental?.infoPromotion?.activePromotion) {
                // Nếu có activePromotion, gán promotion_id
                dataRequest.data.promotion_id = dataListRequestCarRental?.infoPromotion?.activePromotion?.id;
            }

            const { data } = await postRequestRentalCar(dataRequest)

            console.log("data", data);
            if (data && data.result) {
                toastCore.success('Gửi yêu cầu thuê xe thành công!')
                setOpenDialogRequestCarRental(false)
                router.push(`/info-rental-car/${data.id}`)
                setCheckPolicy(true)
            } else {
                toastCore.error(data.message)
            }

        } catch (err) {
            throw err
        }
    }

    const handleCloseModal = () => {
        setOpenDialogRequestCarRental(false)
        setCheckPolicy(true)
    }

    if (!isMounted || !openDialogRequestCarRental) {
        return null
    }

    return (
        <Dialog modal open={openDialogRequestCarRental} onOpenChange={handleCloseModal}>
            <DialogOverlay />
            <DialogContent className={`xl:max-w-[1024px] lg:max-w-[820px] max-w-[98%] w-full py-0 px-6 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}>
                <DialogClose
                    onClick={handleCloseModal}
                    className="z-20 size-8 border flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-4 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <DialogHeader className="flex items-start w-full px-6 py-6 absolute bg-white rounded-t-lg">
                    <DialogTitle className={`text-2xl capitalize font-bold`}>
                        Xác nhận đặt xe
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
                        <ScrollArea className='3xl:mb-6 mb-4 md:pr-4 pr-2 mt-[80px] h-[calc(95vh-100px)]'>
                            <div className='flex flex-col 3xl:gap-6 gap-4 pb-2 max-w-full'>
                                <div className='flex md:flex-row flex-col md:items-center 3xl:gap-4 gap-4 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                                    <div className='3xl:w-56 3xl:h-36 md:w-52 md:h-32 w-full h-52'>
                                        <Image
                                            alt="image"
                                            width={400}
                                            height={400}
                                            className='w-full h-full object-cover rounded-lg'
                                            src={dataListRequestCarRental?.dataDetailCar && dataListRequestCarRental?.dataDetailCar?.image_car ? dataListRequestCarRental?.dataDetailCar?.image_car[0]?.name : "/default/default.png"}
                                        />
                                    </div>

                                    <div className='flex flex-col justify-between gap-3 h-full'>
                                        <div className='3xl:text-base text-sm font-bold uppercase'>
                                            {dataListRequestCarRental?.dataDetailCar?.name_car ? dataListRequestCarRental?.dataDetailCar?.name_car : ""}
                                        </div>

                                        <div className='flex flex-col gap-1'>
                                            <div className='space-x-2'>
                                                <span className='3xl:text-sm text-xs text-[#8C93A3] font-normal'>Mã số xe:</span>
                                                <span className='3xl:text-sm text-xs text-[#585F71] font-semibold'>
                                                    {dataListRequestCarRental?.dataDetailCar?.trait_car?.number_car ? dataListRequestCarRental?.dataDetailCar?.trait_car?.number_car : ""}
                                                </span>
                                            </div>
                                            {/* <div className='flex items-center gap-4'>
                                                <div className='flex items-center gap-1'>
                                                    <FaStar className='3xl:text-base text-sm text-[#FF9900]' />
                                                    <div className='3xl:text-sm text-xs text-[#484D5C] font-medium'>
                                                        4.9
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <FaCircleCheck className='3xl:text-base text-sm text-[#3AC996]' />
                                                    <div className='3xl:text-sm text-xs text-[#484D5C] font-semibold'>
                                                        {FormatNumberHundred(19, 100)} Chuyến
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className='flex gap-3 md:items-center items-start caret-transparent'>
                                                {
                                                    dataListRequestCarRental?.dataDetailCar?.total_trip ?
                                                        <div className='flex items-center gap-1'>
                                                            <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs text-sm text-[#3AC996]' />
                                                            <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] text-xs text-[#484D5C] font-semibold'>
                                                                {dataListRequestCarRental?.dataDetailCar?.total_trip ? FormatNumberHundred(dataListRequestCarRental?.dataDetailCar?.total_trip, 100) : 0} Chuyến
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                            Chưa có chuyến
                                                        </div>
                                                }
                                            </div>
                                        </div>

                                        <div className='px-4 py-2 flex items-center gap-2 border border-[#64E4E4] rounded-lg bg-[#F1FCFC] w-fit caret-transparent'>
                                            <span className='3xl:text-base text-sm font-semibold text-[#3E424E]'>Bảo hiểm thuê xe MIC</span>
                                            <PiShieldCheckFill
                                                onClick={() => console.log('check')}
                                                className='text-[#2FB9BD] text-xl cursor-pointer'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* thông tin thuê xe */}
                                <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                                    <div className='3xl:text-2xl text-xl font-semibold'>
                                        Thông tin thuê xe
                                    </div>

                                    <div className='flex md:flex-row flex-col md:items-center justify-between md:gap-0 gap-4'>
                                        <div className='md:w-1/2 md:max-w-[50%] w-full flex flex-col'>
                                            <div className='flex items-center gap-2'>
                                                <div className='min-w-5'>
                                                    <HiClock className='size-5 text-[#2FB9BD]' />
                                                </div>
                                                <div className="3xl:text-sm text-xs text-[#6F7689] font-normal">
                                                    Thời gian thuê
                                                </div>
                                            </div>
                                            <div className='pl-7 mt-1 flex items-center gap-1'>
                                                <div className="3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] font-medium">
                                                    Từ:
                                                </div>
                                                <div className="3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-medium">
                                                    {dateTemp ? moment(dateTemp?.from).format("HH[h]mm DD/MM/YYYY") : moment(dateReal?.from).format("HH[h]mm DD/MM/YYYY")}
                                                </div>
                                            </div>
                                            <div className='pl-7 flex items-center gap-1'>
                                                <div className="3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] font-medium">
                                                    Đến:
                                                </div>
                                                <div className="3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-medium">
                                                    {dateTemp ? moment(dateTemp?.to).format("HH[h]mm DD/MM/YYYY") : moment(dateReal?.to).format("HH[h]mm DD/MM/YYYY")}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='md:w-1/2 md:max-w-[50%] w-full flex flex-col'>
                                            <div className='flex items-center gap-2'>
                                                <div className='min-w-5'>
                                                    <TiLocation className='text-[#FA3434] size-5' />
                                                </div>
                                                <div className="3xl:text-sm text-xs text-[#6F7689] font-normal">
                                                    Nhận xe ở địa điểm của chủ xe
                                                </div>
                                            </div>
                                            <div className='pl-7 mt-1 3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-medium'>
                                                {/* 12 Hoàn Kiếm Hà Nội */}
                                                {dataListRequestCarRental?.dataDetailCar?.address ? dataListRequestCarRental?.dataDetailCar?.address : ""}
                                            </div>
                                            <div className='pl-7 3xl:text-base lg:text-sm md:text-base text-sm text-[#2FB9BD] hover:text-[#2FB9BD]/80 font-medium cursor-pointer w-fit duration-200 transition caret-transparent'>
                                                Xem bản đồ
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                                    <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                                        Chủ xe
                                    </div>

                                    <div className='flex md:flex-row flex-col md:items-center items-start justify-between gap-4'>
                                        <div className='flex items-center gap-4 md:max-w-[50%] max-w-full bg-[#F6F6F8] p-4 w-full rounded-xl    '>
                                            <div className='3xl:w-16 3xl:h-16 3xl:min-w-16 w-14 min-w-14 h-14 rounded-full border-[3px] border-[#ffffff] drop-shadow'>
                                                <Avatar className='w-full h-full shadow'>
                                                    <AvatarImage
                                                        src={dataListRequestCarRental?.dataDetailCar?.car_owner?.avatar ? dataListRequestCarRental?.dataDetailCar?.car_owner?.avatar : '/avatar/avatar_default.png'}
                                                        alt="@kanow"
                                                    />
                                                    <AvatarFallback >
                                                        <Image
                                                            src="/avatar/avatar_default.png"
                                                            alt="avatar"
                                                            width={100}
                                                            height={100}
                                                            className='w-full h-full object-contain rounded-full'
                                                        />
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>

                                            <div className='flex flex-col 3xl:gap-2 gap-1'>
                                                <div className='uppercase text-[#16171B] font-semibold 3xl:text-base text-sm'>
                                                    {dataListRequestCarRental?.dataDetailCar?.car_owner?.fullname ? dataListRequestCarRental?.dataDetailCar?.car_owner?.fullname : ""}
                                                </div>

                                                {
                                                    dataListRequestCarRental?.dataDetailCar?.point_star ?
                                                        <div className='flex items-center gap-1'>
                                                            <FaStar className='3xl:text-base text-sm text-[#FF9900]' />
                                                            <div className='3xl:text-sm text-xs text-[#484D5C] font-medium'>
                                                                {dataListRequestCarRental?.dataDetailCar?.point_star ? (FormatPointStar(dataListRequestCarRental?.dataDetailCar?.point_star, 1)) : 0}
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                            Chưa có đánh giá
                                                        </div>
                                                }
                                            </div>
                                        </div>

                                        <div className='3xl:text-base text-sm text-[#6F7689] md:max-w-[50%] max-w-full'>
                                            Nhằm bảo mật thông tin, Chúng tôi sẽ gửi thông tin liên hệ của chủ xe sau khi hoàn tất thanh toán cho ứng dụng
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <FormField
                                            control={form.control}
                                            name="note"
                                            render={({ field, fieldState }) => {
                                                const handleTextareaChange = (
                                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                                ) => {
                                                    field.onChange(e);
                                                }

                                                return (
                                                    <FormItem>
                                                        <FormLabel className="3xl:text-base text-sm text-[#000000] font-semibold">
                                                            Nội dung ghi chú
                                                        </FormLabel>
                                                        <div>
                                                            <FormControl>
                                                                <Textarea
                                                                    disabled={form.formState.isSubmitting}
                                                                    placeholder="Nhập nội dung"
                                                                    className={`3xl:h-40 h-36 resize border rounded-lg bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0`}
                                                                    onChange={handleTextareaChange}
                                                                />
                                                            </FormControl>
                                                        </div>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                                    <div className='flex flex-row items-center gap-2'>
                                        <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                                            Giấy tờ thuê xe
                                        </div>

                                        {
                                            isVisibleTablet ?
                                                <div onClick={() => setOpenDialogAnswerPolicy(true, "car_rental_policy")}>
                                                    <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                                </div>
                                                :
                                                <ActionTooltip
                                                    side="bottom"
                                                    align="center"
                                                    label={(
                                                        <div className='flex flex-col gap-1 text-center justify-center max-w-[240px]'>
                                                            <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_rental_policy ? isStatePolicy?.dataPolicy?.car_rental_policy : ''}` }} />
                                                        </div>
                                                    )}
                                                >
                                                    <div>
                                                        <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                                    </div>
                                                </ActionTooltip>
                                        }

                                    </div>
                                    <div className='3xl:text-base text-sm text-[#484D5C] 3xl:mb-0 mb-3'>
                                        Vui lòng chuẩn bị 2 loại giấy tờ:
                                    </div>
                                    <div className='grid grid-cols-12 w-full gap-4'>
                                        <div className='lg:col-span-4 col-span-12 flex flex-row items-center w-full lg:gap-8 gap-4'>
                                            <div className='w-8 min-w-8 h-8 flex items-center justify-center text-base rounded-full font-bold bg-[#14868E] text-white'>
                                                1
                                            </div>
                                            <div className='w-full p-4 border-2 rounded-2xl flex flex-col gap-6'>
                                                <div className='w-[140px] max-w-[140px] h-auto'>
                                                    <Image
                                                        src="/other/info/driverLicense.png"
                                                        alt="driver_license"
                                                        width={600}
                                                        height={600}
                                                        className='w-full h-auto object-contain'
                                                    />
                                                </div>
                                                <div className='w-full flex flex-col gap-1'>
                                                    <div className='3xl:text-base text-sm text-[#3561FF] font-semibold'>
                                                        Giấy phép lái xe
                                                    </div>
                                                    <div className='3xl:text-base text-sm text-[#585F71]'>
                                                        Chủ xe đối chiếu và gửi lại bạn
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-8 col-span-12 flex flex-row items-center lg:gap-8 gap-4'>
                                            <div className='w-8 min-w-8 h-8 flex items-center justify-center text-base rounded-full font-bold bg-[#14868E] text-white'>
                                                2
                                            </div>
                                            <div className='w-full p-4 border-2 rounded-2xl flex md:flex-row flex-col gap-4'>
                                                <div className='flex flex-col gap-6 md:max-w-[45%] max-w-full'>
                                                    <div className='w-[140px] max-w-[140px] h-auto'>
                                                        <Image
                                                            src="/other/info/citizenCard.png"
                                                            alt="citizen_card"
                                                            width={600}
                                                            height={600}
                                                            className='w-full h-auto object-contain'
                                                        />
                                                    </div>
                                                    <div className='w-full flex flex-col gap-1'>
                                                        <div className='3xl:text-base text-sm text-[#3561FF] font-semibold'>
                                                            CCCD có gắn chip
                                                        </div>
                                                        <div className='3xl:text-base text-sm text-[#585F71]'>
                                                            Chủ xe đối chiếu và gửi lại bạn
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-6 md:max-w-[10%] max-w-full'>
                                                    <div className='uppercase text-[#FF9900] 3xl:text-base text-sm font-semibold'>
                                                        Hoặc
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-6 md:max-w-[45%] max-w-full'>
                                                    <div className='w-[140px] max-w-[140px] h-auto'>
                                                        <Image
                                                            src="/other/info/passport.png"
                                                            alt="passport"
                                                            width={600}
                                                            height={600}
                                                            className='w-full h-auto object-contain'
                                                        />
                                                    </div>
                                                    <div className='w-full flex flex-col gap-1'>
                                                        <div className='3xl:text-base text-sm text-[#3561FF] font-semibold'>
                                                            Hộ chiếu
                                                        </div>
                                                        <div className='3xl:text-base text-sm text-[#585F71]'>
                                                            Chủ xe đối chiếu, giữ lại và hoàn trả khi bạn trả xe
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
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
                                                        <div onClick={() => setOpenDialogAnswerPolicy(true, "car_price_policy")}>
                                                            <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                                        </div>
                                                        :
                                                        <ActionTooltip
                                                            side="bottom"
                                                            align="center"
                                                            label={(
                                                                <div className='flex flex-col gap-1 text-center justify-center 2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                                    <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_price_policy ? isStatePolicy?.dataPolicy?.car_price_policy : ''}` }} />
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
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.rent_cost_day ? dataListRequestCarRental?.dataDetailCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span>
                                            </div>
                                        </div>

                                        <div className='flex justify-between gap-2 items-center'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#16171B] font-normal'>
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
                                                                    <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_insurance_policy ? isStatePolicy?.dataPolicy?.car_insurance_policy : ''}` }} />
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
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.price_insurance_day ? dataListRequestCarRental?.dataDetailCar?.price?.price_insurance_day : 0)}<span>đ/ngày</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tổng tạm tính */}
                                    <div className='flex justify-between gap-2 items-center'>
                                        <div className='3xl:text-base lg:text-sm md:text-base text-sm text-[#383A43] font-medium'>
                                            Tổng tạm tính:
                                        </div>
                                        <div className='text-[#3E424E] font-semibold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                            {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.temp_total_amount ? dataListRequestCarRental?.dataDetailCar?.price?.temp_total_amount : 0)}{dataListRequestCarRental?.dataDetailCar?.price?.number_day === 1 ? <span>đ/ngày</span> : <span>đ/{dataListRequestCarRental?.dataDetailCar?.price?.number_day} ngày</span>}
                                        </div>
                                    </div>

                                    {/* khuyến mãi */}
                                    {
                                        dataListRequestCarRental?.infoPromotion?.activePromotion === null && dataListRequestCarRental?.dataDetailCar?.promotion && dataListRequestCarRental?.dataDetailCar?.promotion?.length > 0 ?
                                            <div className='flex flex-row items-center justify-between gap-2 w-full'>
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
                                                        Giảm {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.promotion[0]?.price_promotion ? dataListRequestCarRental?.dataDetailCar?.promotion[0]?.price_promotion : 0)}đ trên đơn giá
                                                    </div>
                                                </div>
                                                {
                                                    dataListRequestCarRental?.infoPromotion?.selectPromotion === "0" ?
                                                        <div className='3xl:text-base xl:text-sm text-xs text-[#2FB9BD] font-semibold'>
                                                            -{FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.promotion[0]?.price_promotion ? dataListRequestCarRental?.dataDetailCar?.promotion[0]?.price_promotion : 0)}đ
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        dataListRequestCarRental?.infoPromotion?.activePromotion ?
                                            <div className='flex flex-row items-center justify-between gap-2 w-full'>
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
                                                                <span className='font-normal'>Mã</span> <span className='font-semibold uppercase'>{dataListRequestCarRental?.infoPromotion?.activePromotion?.code}</span>
                                                            </div>
                                                            {/* <div onClick={(event) => handleRemoveDiscount(event)}>
                                                                        <FaDeleteLeft className="size-5 text-rose-500" />
                                                                    </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    dataListRequestCarRental?.infoPromotion?.activePromotion?.percent !== 0 ?
                                                        <div className='3xl:text-base xl:text-sm text-xs text-[#2FB9BD] font-semibold'>
                                                            -{FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.max_money_discount ? dataListRequestCarRental?.dataDetailCar?.price?.max_money_discount : 0)}đ
                                                        </div>
                                                        :
                                                        <div className='3xl:text-base xl:text-sm text-xs text-[#2FB9BD] font-semibold'>
                                                            -{FormatNumberDot(dataListRequestCarRental?.infoPromotion?.activePromotion?.cash ? dataListRequestCarRental?.infoPromotion?.activePromotion?.cash : 0)}đ
                                                        </div>
                                                }
                                            </div>
                                            :
                                            null
                                    }

                                    <div className='border border-x-0 border-b-0 w-full' />

                                    {/* Thành tiền */}
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex justify-between gap-2 items-center pb-2 border-b'>
                                            <div className='3xl:text-lg text-base text-[#383A43] font-bold'>
                                                Thành tiền:
                                            </div>
                                            <div className='text-[#16171B] font-bold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.total_amount ? dataListRequestCarRental?.dataDetailCar?.price?.total_amount : 0)}{dataListRequestCarRental?.dataDetailCar?.price?.number_day === 1 ? <span>đ/ngày</span> : <span>đ/{dataListRequestCarRental?.dataDetailCar?.price?.number_day} ngày</span>}
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
                                                                    <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_deposit_policy ? isStatePolicy?.dataPolicy?.car_deposit_policy : ''}` }} />
                                                                </div>
                                                            )}
                                                        >
                                                            <div>
                                                                <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                                            </div>
                                                        </ActionTooltip>
                                                }
                                            </div>

                                            <div className='text-[#2FB9BD] font-semibold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.price_depoist ? dataListRequestCarRental?.dataDetailCar?.price?.price_depoist : 0)}<span>đ</span>
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
                                                                    <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_payment_policy ? isStatePolicy?.dataPolicy?.car_payment_policy : ''}` }} />
                                                                </div>
                                                            )}
                                                        >
                                                            <div>
                                                                <FaRegQuestionCircle className='text-[#FF9900] lg:text-xl text-lg cursor-pointer' />
                                                            </div>
                                                        </ActionTooltip>
                                                }
                                            </div>

                                            <div className='text-[#2FB9BD] font-semibold 3xl:text-base lg:text-sm md:text-base text-sm'>
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.cash_on_delivery ? dataListRequestCarRental?.dataDetailCar?.price?.cash_on_delivery : 0)}<span>đ</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col 3xl:gap-4 gap-2'>
                                    <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                                        Tài sản thế chấp
                                    </div>

                                    <div className='3xl:text-base text-sm text-[#3E424E]'>
                                        Không yêu cầu khách thuê thế chấp tài sản
                                    </div>
                                </div>

                                <div className='flex md:flex-row flex-col md:items-center md:gap-0 gap-4 justify-between'>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="policy"
                                            className="size-4 text-white border-[#9EA1AE] data-[state=checked]:border-[#2FB9BD] data-[state=checked]:bg-[#2FB9BD] data-[state=checked]:text-white"
                                            checked={checkPolicy}
                                            onCheckedChange={(checked: boolean) => setCheckPolicy(checked)}
                                        />
                                        <Label
                                            htmlFor="policy"
                                            className="flex items-center gap-1 text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 caret-transparent"
                                        >
                                            <span>Tôi đồng ý với</span>
                                            <Link
                                                href="/"
                                                className='text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-200 transition'
                                                onClick={handleCloseModal}
                                            >
                                                chính sách huỷ chuyến
                                            </Link>
                                            <span className="text-[#F15A5A]">*</span>
                                        </Label>
                                    </div>

                                    <div className='flex items-center gap-4'>
                                        <Button
                                            type="button"
                                            className="3xl:text-base text-sm text-[#2FB9BD] border border-[#2FB9BD] bg-white hover:bg-slate-200 w-full px-6 py-3 rounded-xl uppercase caret-transparent"
                                            onClick={handleCloseModal}
                                        >
                                            Huỷ
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={checkPolicy ? false : true}
                                            className="3xl:text-base text-sm text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full px-6 py-3 rounded-xl uppercase caret-transparent"
                                        >
                                            Gửi yêu cầu thuê xe
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
})

DialogRequestCarRental.displayName = "DialogRequestCarRental";
