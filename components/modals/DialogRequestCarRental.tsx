
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useCookie } from "@/hooks/useCookie";
import { useDialogAnswerPolicy, useDialogLogin, useDialogRequestCarRental } from "@/hooks/useOpenDialog";
import Image from "next/image";
import { FaRegQuestionCircle, FaStar } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FormatNumberDot, FormatNumberHundred } from "../format/FormatNumber";
import { PiShieldCheckFill } from "react-icons/pi";
import { HiClock } from "react-icons/hi2";
import { TiLocation } from "react-icons/ti";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { ScrollArea } from "../ui/scroll-area";
import { ActionTooltip } from "../tooltip/ActionTooltip";
import { useResize } from "@/hooks/useResize";

type Props = {};

export function DialogRequestCarRental({ }: Props) {
    const { isVisibleTablet } = useResize()
    const { setOpenDialogAnswerPolicy } = useDialogAnswerPolicy()
    const { openDialogRequestCarRental, dataListRequestCarRental, setOpenDialogRequestCarRental } = useDialogRequestCarRental()

    const form = useForm({
        defaultValues: {
            note: ""
        },
    });

    console.log('dataListRequestCarRental', dataListRequestCarRental);
    console.log('openDialogRequestCarRental', openDialogRequestCarRental);
    const onSubmit = async (values: any) => {
        try {


        } catch (err) {
            throw err
        }
    }

    return (
        <Dialog modal open={openDialogRequestCarRental} onOpenChange={() => setOpenDialogRequestCarRental(false)}>
            <DialogOverlay />
            <DialogContent className={`lg:max-w-[1024px] max-w-[95%] py-0 px-4 max-h-[95vh] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}>
                <DialogClose
                    onClick={() => setOpenDialogRequestCarRental(false)}
                    className="z-20 size-8 border flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-4 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <DialogHeader className="flex items-start w-full px-4 py-6 absolute bg-white rounded-t-lg">
                    <DialogTitle className={`text-2xl capitalize font-bold`}>
                        Xác nhận đặt xe
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
                        <ScrollArea className='pb-4 pr-4 mt-[80px] h-[calc(95vh-100px)] overflow-auto'>
                            <div className='flex flex-col 3xl:gap-6 gap-4 3xl:pb-6'>
                                <div className='flex items-center 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                                    <div className='w-56 h-36'>
                                        <Image
                                            alt="image"
                                            width={400}
                                            height={400}
                                            className='w-full h-full object-cover rounded-lg'
                                            src={dataListRequestCarRental?.dataDetailCar && dataListRequestCarRental?.dataDetailCar?.image_car ? dataListRequestCarRental?.dataDetailCar?.image_car[0]?.name : "/default/default.png"}
                                        />
                                    </div>

                                    <div className='flex flex-col h-full py-1 justify-between'>
                                        <div className='3xl:text-base text-sm font-bold uppercase'>
                                            {dataListRequestCarRental?.dataDetailCar?.name_car ? dataListRequestCarRental?.dataDetailCar?.name_car : ""}
                                        </div>

                                        <div className='flex flex-col'>
                                            <div className='space-x-2'>
                                                <span className='3xl:text-sm text-xs text-[#8C93A3] font-normal'>Mã số xe:</span>
                                                <span className='3xl:text-sm text-xs text-[#585F71] font-semibold'>
                                                    {dataListRequestCarRental?.dataDetailCar?.trait_car?.number_car ? dataListRequestCarRental?.dataDetailCar?.trait_car?.number_car : ""}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-4'>
                                                <div className='flex items-center gap-1'>
                                                    <FaStar className='3xl:text-base text-sm text-[#FF9900]' />
                                                    <div className='3xl:text-sm text-xs text-[#484D5C] font-medium      '>
                                                        4.9
                                                    </div>
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    <FaCircleCheck className='3xl:text-base text-sm text-[#3AC996]' />
                                                    <div className='3xl:text-sm text-xs text-[#484D5C] font-semibold'>
                                                        {FormatNumberHundred(19, 100)} Chuyến
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='px-4 py-2 flex items-center gap-2 border border-[#64E4E4] rounded-lg bg-[#F1FCFC] w-fit'>
                                            <span className='3xl:text-base text-sm font-semibold text-[#3E424E]'>Bảo hiểm thuê xe MIC</span>
                                            <PiShieldCheckFill
                                                onClick={() => console.log('check')}
                                                className='text-[#2FB9BD] text-xl cursor-pointer'
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4 border border-b border-x-0 border-t-0'>
                                    <div className='3xl:text-2xl text-xl font-semibold'>
                                        Thông tin thuê xe
                                    </div>

                                    <div className='flex items-center justify-between'>
                                        <div className='w-1/2 max-w-[50%] flex flex-col'>
                                            <div className='flex items-center gap-2'>
                                                <div className='min-w-5'>
                                                    <HiClock className='size-5 text-[#2FB9BD]' />
                                                </div>
                                                <div className="3xl:text-base text-sm text-[#6F7689] font-normal">
                                                    Thời gian thuê
                                                </div>
                                            </div>
                                            <div className='pl-7'>
                                                <div className='flex items-center gap-1'>
                                                    <div className="3xl:text-base text-sm text-[#2FB9BD] font-medium">
                                                        Từ:
                                                    </div>
                                                    <div className="3xl:text-base text-sm text-[#16171B] font-medium">
                                                        12h00 12/12/24
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='pl-7'>
                                                <div className='flex items-center gap-1'>
                                                    <div className="3xl:text-base text-sm text-[#2FB9BD] font-medium">
                                                        Đến:
                                                    </div>
                                                    <div className="3xl:text-base text-sm text-[#16171B] font-medium">
                                                        12h00 12/12/24
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-1/2 max-w-[50%] flex flex-col'>
                                            <div className='flex items-center gap-2'>
                                                <div className='min-w-5'>
                                                    <TiLocation className='3xl:text-base text-sm text-[#FA3434] size-5' />
                                                </div>
                                                <div className="3xl:text-base text-sm text-[#6F7689] font-normal">
                                                    Nhận xe ở địa điểm của chủ xe
                                                </div>
                                            </div>
                                            <div className='pl-7 3xl:text-base text-sm text-[#16171B] font-medium'>
                                                12 Hoàn Kiếm Hà Nội
                                            </div>
                                            <div className='pl-7 3xl:text-base text-sm text-[#2FB9BD] font-medium cursor-pointer w-fit'>
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
                                                <div className='flex items-center gap-4'>
                                                    <div className='flex items-center gap-1'>
                                                        <FaStar className='3xl:text-base text-sm text-[#FF9900]' />
                                                        <div className='3xl:text-sm text-xs text-[#484D5C] font-medium      '>
                                                            4.9
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center gap-1'>
                                                        <FaCircleCheck className='3xl:text-base text-sm text-[#3AC996]' />
                                                        <div className='3xl:text-sm text-xs text-[#484D5C] font-semibold'>
                                                            {FormatNumberHundred(19, 100)} Chuyến
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='3xl:text-base text-sm text-[#6F7689] md:max-w-[50%] max-w-full'>
                                            Nhằm bảo mật thông tin, Chúng tôi sẽ gửi thông tin liên hệ của chủ xe sau khi hoàn tất thanh toán cho ứng dụng
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <Label className='text-base text-[#000000] font-semibold'>Nội dung</Label>
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
                                                        <FormLabel className="3xl:text-base text-sm text-[#49495C] font-medium">
                                                            Ghi chú
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
                                                            <span dangerouslySetInnerHTML={{ __html: `${dataListRequestCarRental?.dataDetailCar?.policy?.car_rental_policy ? dataListRequestCarRental?.dataDetailCar?.policy?.car_rental_policy : ''}` }} />
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
                                        <div className='col-span-4 flex flex-row items-center w-full gap-8'>
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
                                        <div className='col-span-8 flex flex-row items-center gap-8'>
                                            <div className='w-8 min-w-8 h-8 flex items-center justify-center text-base rounded-full font-bold bg-[#14868E] text-white'>
                                                2
                                            </div>
                                            <div className='w-full p-4 border-2 rounded-2xl flex gap-4'>
                                                <div className='flex flex-col gap-6 max-w-[45%]'>
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
                                                <div className='flex items-center gap-6 max-w-[10%]'>
                                                    <div className='uppercase text-[#FF9900] 3xl:text-base text-sm font-semibold'>
                                                        Hoặc
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-6 max-w-[45%]'>
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
                                                                    <span dangerouslySetInnerHTML={{ __html: `${dataListRequestCarRental?.dataDetailCar?.policy?.car_price_policy ? dataListRequestCarRental?.dataDetailCar?.policy?.car_price_policy : ''}` }} />
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
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.rent_cost_day ? dataListRequestCarRental?.dataDetailCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span>
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
                                                                    <span dangerouslySetInnerHTML={{ __html: `${dataListRequestCarRental?.dataDetailCar?.policy?.car_insurance_policy ? dataListRequestCarRental?.dataDetailCar?.policy?.car_insurance_policy : ''}` }} />
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
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.price_insurance_day ? dataListRequestCarRental?.dataDetailCar?.price?.price_insurance_day : 0)}<span>đ/ngày</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* tổng tạm tính */}
                                    <div className='flex justify-between items-center'>
                                        <div className='3xl:text-base text-sm text-[#3E424E] font-medium'>
                                            Tổng tạm tính
                                        </div>
                                        <div className='text-[#3E424E] font-semibold 3xl:text-base text-sm'>
                                            {FormatNumberDot(dataListRequestCarRental?.dataDetailCar.price?.temp_total_amount ? dataListRequestCarRental?.dataDetailCar.price?.temp_total_amount : 0)}<span>đ/ngày</span>
                                        </div>
                                    </div>

                                    <div className='border w-full' />

                                    {/* thành tiền */}
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex justify-between items-center font-bold'>
                                            <div className='3xl:text-base text-sm text-[#3E424E] font-bold'>
                                                Thành tiền
                                            </div>
                                            <div className='text-[#3E424E] font-bold 3xl:text-base text-sm'>
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.total_amount ? dataListRequestCarRental?.dataDetailCar?.price?.total_amount : 0)}<span>đ/ngày</span>
                                            </div>
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <div className='3xl:text-base text-sm text-[#3E424E]'>
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
                                                                    <span dangerouslySetInnerHTML={{ __html: `${dataListRequestCarRental?.dataDetailCar?.policy?.car_price_policy ? dataListRequestCarRental?.dataDetailCar?.policy?.car_price_policy : ''}` }} />
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
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.rent_cost_day ? dataListRequestCarRental?.dataDetailCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span>
                                            </div>
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <div className='flex flex-row items-center gap-2'>
                                                <div className='3xl:text-base text-sm text-[#3E424E]'>
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
                                                                    <span dangerouslySetInnerHTML={{ __html: `${dataListRequestCarRental?.dataDetailCar?.policy?.car_price_policy ? dataListRequestCarRental?.dataDetailCar?.policy?.car_price_policy : ''}` }} />
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
                                                {FormatNumberDot(dataListRequestCarRental?.dataDetailCar?.price?.rent_cost_day ? dataListRequestCarRental?.dataDetailCar?.price?.rent_cost_day : 0)}<span>đ/ngày</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col 3xl:gap-4 gap-2 3xl:pb-6 pb-4'>
                                    <div className='3xl:text-2xl text-xl text-[#16171B] font-semibold'>
                                        Tài sản thế chấp
                                    </div>

                                    <div className='3xl:text-base text-sm text-[#3E424E]'>
                                        Không yêu cầu khách thuê thế chấp tài sản
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
