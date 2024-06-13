import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { ChevronsUpDown, X } from "lucide-react";
import { useForm } from "react-hook-form";

import { useDialogPayment } from "@/hooks/useOpenDialog";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { AnimatePresence, motion } from "framer-motion"
import Backdrop from "../backdrop/Backdrop";
import { uuidv4 } from "@/lib/uuid";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { NumericFormatCore } from "@/lib/numericFormat";
import SelectCombobox from "../combobox/SelectCombobox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormatNumberDot } from "../format/FormatNumber";
import ButtonLoading from "../button/ButtonLoading";

type Props = {};

const dataListPayment = [
    {
        id: "1",
        paymentMethod: "Chuyển khoản ngân hàng",
        image: "/icon/payment/financial.png"
    },
    {
        id: "2",
        paymentMethod: "ViettelPay",
        image: "/icon/payment/viettelpay.png"
    },
]

export function DialogPayment({ }: Props) {
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()
    const [paymentMethod, setPaymentMethod] = useState<string>(dataListPayment[0].id)

    const form = useForm({
        defaultValues: {
            //don gia thue mac dinh
            price: "",
            nameBank: "",
            numberBank: "",
            nameCustomer: "",
            numberPhone: "",
        }
    })

    const {
        typeModal,
        openDialogPayment,
        setOpenDialogPayment,
        setTypeModal,
    } = useDialogPayment()

    const handleOpenChangeModal = (value: boolean) => {
        setOpenDialogPayment(value)
    }

    const onSubmit = async (value: any) => {
        // Xử lý dữ liệu form khi submit
        console.log("value submit: ", value);
        try {


        } catch (err) {
            throw err
        }
    }

    const handleSelectedMethod = (item: any) => {
        setPaymentMethod(item.id)
    }
    const handleContinue = () => {
        if (paymentMethod === "1") {
            setTypeModal("bank")
        } else if (paymentMethod === "2") {
            setTypeModal("viettel")
        }
    }

    return (
        <Dialog
            modal

            open={openDialogPayment}
            onOpenChange={(value) => handleOpenChangeModal(value)}
        >
            <DialogOverlay />
            <DialogContent className={`lg:max-w-[520px] max-w-[95%] max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}>
                <DialogClose
                    onClick={() => setOpenDialogPayment(false)}
                    className="size-8 border flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-4 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                {
                    typeModal === "selected_method" ?
                        <>
                            <DialogHeader className="flex items-center justify-center w-full 3xl:mt-6 mt-3">
                                <DialogTitle className={` capitalize text-2xl`}>
                                    Chọn phương thức rút tiền
                                </DialogTitle>
                            </DialogHeader>

                            <div className='space-y-2'>
                                <div className='text-sm text-[#545454]'>
                                    Lựa chọn một trong hai hình thức rút tiền từ ví Kanow
                                </div>
                                <RadioGroup
                                    defaultValue={paymentMethod}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    {
                                        dataListPayment && dataListPayment?.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="flex space-x-2 col-span-1 w-full h-full"
                                            >
                                                <RadioGroupItem
                                                    value={item.id}
                                                    id={item.id}
                                                    className='[&[data-state=checked]]:border-[#2FB9BD] max-w-[15%] text-[#2FB9BD] border-[#545454] size-4'
                                                />
                                                <Label
                                                    onClick={() => handleSelectedMethod(item)}
                                                    htmlFor={item.id}
                                                    className='max-w-[85%] w-full h-full cursor-pointer hover:bg-[#545454]/[0.05] duration-300 transition flex flex-col items-center gap-1 border rounded-lg py-4 px-8'
                                                >
                                                    <div className='size-16 max-w-16'>
                                                        <Image
                                                            src={item.image}
                                                            alt="image"
                                                            width={200}
                                                            height={200}
                                                            className='w-full h-full object-contain'
                                                        />
                                                    </div>
                                                    <div className='text-center'>{item.paymentMethod}</div>
                                                </Label>
                                            </div>
                                        ))
                                    }
                                </RadioGroup>
                            </div>

                            <Button
                                type="button"
                                className='text-white font-semibold bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 rounded-lg h-14 3xl:text-base text-sm'
                                onClick={handleContinue}
                            >
                                Tiếp tục
                            </Button>
                        </>
                        :
                        <>
                            <DialogHeader className="flex items-center justify-center w-full 3xl:mt-6 mt-3">
                                <DialogTitle className={` capitalize text-2xl`}>
                                    Yêu cầu rút tiền
                                </DialogTitle>
                            </DialogHeader>

                            <div className='space-y-4'>
                                <div className='text-sm text-[#545454]'>
                                    Với trách nhiệm thuộc về Tôi/Chúng tôi, đề nghị Quý Công ty ghi nợ tài khoản của Tôi/Chúng tôi để thực hiện chuyển tiền theo nội dung sau:
                                </div>

                                <Form  {...form}>
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        rules={{
                                            required: "Vui lòng nhập số tiền!",
                                        }}
                                        render={({ field, fieldState }) => {
                                            console.log('fieldvalue: ', field.value);


                                            return (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel className="text-sm font-semibold text-[#545454] dark:text-secondary/70 space-x-1">
                                                        <span>Số tiền</span>
                                                        <span className="text-[#F15A5A]">(*)</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <NumericFormatCore
                                                            className={`${fieldState?.invalid && fieldState?.error ? "border rounded-lg border-[#F15A5A]" : "border rounded-lg border-[#D8DAE5]"} 
                                                                    bg-white  text-[#545454]/80 placeholder:text-[#B3B8C2]/80 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none disabled:bg-[#545454]/10 focus:border-[#2FB9BD] drop-shadow-none 2xl:py-3 py-2 rounded-lg px-3 font-normal `}
                                                            placeholder="Nhập đơn giá thuê"
                                                            allowLeadingZeros={false}
                                                            thousandSeparator={','}
                                                            suffix={'đ'}
                                                            maxLength={16}
                                                            disabled={field.value !== "" ? true : false}
                                                            {...field}
                                                        />
                                                    </FormControl>

                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                    )}
                                                </FormItem>
                                            );
                                        }}
                                    />

                                    {
                                        typeModal === "bank" &&
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="nameBank"
                                                rules={{
                                                    required: "Vui lòng chọn ngân hàng thụ hưởng!",
                                                }}
                                                render={({ field, fieldState }) => {
                                                    return (
                                                        <FormItem className='flex flex-col'>
                                                            <FormLabel className="text-sm font-semibold text-[#545454] dark:text-secondary/70 space-x-1">
                                                                <span>Ngân hàng thụ hưởng</span>
                                                                <span className="text-[#F15A5A]">(*)</span>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Popover
                                                                // open={isState.typeOpenCombobox === 'carCompany' && isState.openCombobox}
                                                                // onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'carCompany' })}
                                                                >
                                                                    <PopoverTrigger asChild>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            className={`${fieldState?.invalid && fieldState?.error ? "border rounded-lg border-[#F15A5A]" : "border rounded-lg border-[#D8DAE5]"} 
                                                                            flex items-center justify-between text-base text-[#B3B8C2] hover:text-[#B3B8C2]/80 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-[#545454]/10 focus:border-[#2FB9BD] 2xl:py-3 py-2 rounded-lg px-3 font-normal `}
                                                                        >
                                                                            {"Chọn ngân hàng"}
                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                        </Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-[520px] max-w-[470px]">
                                                                        {/* <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-full"> */}
                                                                        <SelectCombobox
                                                                            // data={isState.dataCarCompany}
                                                                            data={[]}
                                                                            field={field}
                                                                            onChange={(e: any) => {
                                                                                field.onChange(e)
                                                                                // queryState({ openCombobox: false })
                                                                                // form.setValue('stepInformation.sampleCar', '')
                                                                                // form.setValue('stepInformation.nameCar', '')
                                                                            }}
                                                                            onValueChange={(e: any) => { }}
                                                                            // onValueChange={(e: any) => handleSearchApi(e, 'carCompany')}
                                                                            placeholderInput="Tìm kiếm hãng xe"

                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </FormControl>

                                                            {fieldState?.invalid && fieldState?.error && (
                                                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                            )}
                                                        </FormItem>
                                                    );
                                                }}
                                            />

                                            <div className='space-y-2'>
                                                <div className="text-base uppercase font-semibold text-[#2FB9BD] dark:text-secondary/70 space-x-1">
                                                    <span>Người thụ hưởng</span>
                                                    <span className="text-[#F15A5A]">(*)</span>
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="numberBank"
                                                    rules={{
                                                        required: "Vui lòng nhập số tài khoản!",
                                                    }}
                                                    render={({ field, fieldState }) => {
                                                        console.log('fieldvalue: ', field.value);


                                                        return (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel className="text-sm font-semibold text-[#545454] dark:text-secondary/70 space-x-1">
                                                                    <span>Số tài khoản</span>
                                                                    <span className="text-[#F15A5A]">(*)</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <NumericFormatCore
                                                                        className={`${fieldState?.invalid && fieldState?.error ? "border rounded-lg border-[#F15A5A]" : "border rounded-lg border-[#D8DAE5]"} 
                                                                    bg-white  text-[#545454] placeholder:text-[#B3B8C2]/80 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none disabled:bg-[#545454]/10 focus:border-[#2FB9BD] drop-shadow-none 2xl:py-3 py-2 rounded-lg px-3 font-normal `}
                                                                        placeholder="Nhập số tài khoản ngân hàng"
                                                                        maxLength={16}
                                                                        {...field}
                                                                    />
                                                                </FormControl>

                                                                {
                                                                    fieldState?.invalid && fieldState?.error && (
                                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                    )
                                                                }
                                                            </FormItem>
                                                        );
                                                    }}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="nameCustomer"
                                                    rules={{
                                                        required: "Vui lòng nhập tên người thụ hưởng!",
                                                    }}
                                                    render={({ field, fieldState }) => {
                                                        console.log('fieldvalue: ', field.value);


                                                        return (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel className="text-sm font-semibold text-[#545454] dark:text-secondary/70 space-x-1">
                                                                    <span>Tên người thụ hưởng</span>
                                                                    <span className="text-[#F15A5A]">(*)</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        className={`${fieldState?.invalid && fieldState?.error ? "border rounded-lg border-[#F15A5A]" : "border rounded-lg border-[#D8DAE5]"} 
                                                                        bg-white  text-[#545454] placeholder:text-[#B3B8C2]/80 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none disabled:bg-[#545454]/10 focus:border-[#2FB9BD] drop-shadow-none 2xl:py-3 py-2 rounded-lg px-3 font-normal `}
                                                                        placeholder="Nhập tên người thụ hưởng"
                                                                        type={"text"}
                                                                        {...field}
                                                                    />
                                                                </FormControl>

                                                                {
                                                                    fieldState?.invalid && fieldState?.error && (
                                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                    )
                                                                }
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            </div>

                                            <div className="text-base uppercase font-semibold text-[#2FB9BD] dark:text-secondary/70 space-x-1">
                                                <span>Phí chuyển tiền</span>
                                                <span className="text-[#f08080] font-bold">({`${FormatNumberDot(11000)}VND`})</span>
                                            </div>
                                        </>
                                    }
                                    {
                                        typeModal === "viettel" &&
                                        <>
                                            <div className='space-y-2'>
                                                <FormField
                                                    control={form.control}
                                                    name="numberPhone"
                                                    rules={{
                                                        required: "Vui lòng nhập số điện thoại!",
                                                    }}
                                                    render={({ field, fieldState }) => {
                                                        console.log('fieldvalue: ', field.value);


                                                        return (
                                                            <FormItem className="flex flex-col">
                                                                <FormLabel className="text-sm font-semibold text-[#545454] dark:text-secondary/70 space-x-1">
                                                                    <span>Số điện thoại</span>
                                                                    <span className="text-[#F15A5A]">(*)</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <NumericFormatCore
                                                                        className={`${fieldState?.invalid && fieldState?.error ? "border rounded-lg border-[#F15A5A]" : "border rounded-lg border-[#D8DAE5]"} 
                                                                    bg-white  text-[#545454] placeholder:text-[#B3B8C2]/80 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none disabled:bg-[#545454]/10 focus:border-[#2FB9BD] drop-shadow-none 2xl:py-3 py-2 rounded-lg px-3 font-normal `}
                                                                        placeholder="Nhập số điện thoại"
                                                                        maxLength={16}
                                                                        {...field}
                                                                    />
                                                                </FormControl>

                                                                {
                                                                    fieldState?.invalid && fieldState?.error && (
                                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                    )
                                                                }
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </>
                                    }
                                    <div className='flex flex-col gap-2'>
                                        <ButtonLoading
                                            title=" Gửi yêu cầu"
                                            type="button"
                                            onClick={form.handleSubmit((values) => onSubmit(values))}
                                            className="flex items-center gap-2 w-full text-white border-[#2FB9BD] rounded-xl
                                border-2 h-14 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                                            disabled={isStateLoadSuccess.loading.isLoadingButtonSecond}
                                            isStateloading={isStateLoadSuccess.loading.isLoadingButtonSecond}
                                        />
                                    </div>
                                </Form>
                            </div>

                        </>
                }
            </DialogContent>
        </Dialog>
    );
}
