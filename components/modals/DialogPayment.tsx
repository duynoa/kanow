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

import { X } from "lucide-react";
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

type Props = {};

const dataListPayment = [
    {
        id: "1",
        method: "Chuyển khoản ngân hàng",
        image: "/icon/payment/financial.png"
    },
    {
        id: "2",
        method: "ViettelPay",
        image: "/icon/payment/viettelpay.png"
    },
]

export function DialogPayment({ }: Props) {
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()
    const [method, setMethod] = useState<string>(dataListPayment[0].id)

    const form = useForm({
        defaultValues: {
            //don gia thue mac dinh
            price: "0",
            nameBank: "0",
            sundayPrice: "0",
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
        setMethod(item.id)
    }
    const handleContinue = () => {
        if (method === "1") {
            setTypeModal("bank")
        } else if (method === "2") {
            setTypeModal("viettel")
        }
    }

    console.log('method :', method);
    console.log('typemodal :', typeModal);


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
                                    defaultValue={method}
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
                                                    <div className='text-center'>{item.method}</div>
                                                </Label>
                                                {/* <div className='max-w-[90%] w-full h-full flex flex-col items-center gap-1 border rounded-lg py-4 px-8'>
                                        <div className='size-16 max-w-16'>
                                            <Image
                                                src={item.image}
                                                alt="image"
                                                width={200}
                                                height={200}
                                                className='w-full h-full object-contain'
                                            />
                                        </div>
                                        <Label
                                            htmlFor={item.id}
                                            className='text-center'
                                        >
                                            {item.method}
                                        </Label>
                                    </div> */}
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

                            <div className='space-y-2'>
                                <div className='text-sm text-[#545454]'>
                                    Với trách nhiệm thuộc về Tôi/Chúng tôi, đề nghị Quý Công ty ghi nợ tài khoản của Tôi/Chúng tôi để thực hiện chuyển tiền theo nội dung sau:
                                </div>
                            </div>

                            <Form  {...form} >
                                {
                                    typeModal === "bank" &&
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            rules={{
                                                required: "Vui lòng nhập số tiền!",
                                            }}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-semibold text-[#545454] dark:text-secondary/70 space-x-1">
                                                            <span>Số tiền</span>
                                                            <span className="text-[#F15A5A]">(*)</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                maxLength={10}
                                                                // disabled={isLoading}
                                                                className={`${fieldState?.invalid && fieldState?.error
                                                                    ? "border rounded-lg border-[#F15A5A]"
                                                                    : "border-b rounded-lg border-[#D8DAE5]"
                                                                    } bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 3xl:py-3 py-2`}
                                                                placeholder="Số tiền"
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

                                        <FormField
                                            control={form.control}
                                            name="nameBank"
                                            rules={{
                                                required: "Vui lòng chọn ngân hàng thụ hưởng!",
                                            }}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-semibold text-[#545454] dark:text-secondary/70 space-x-1">
                                                            <span>Ngân hàng thụ hưởng</span>
                                                            <span className="text-[#F15A5A]">(*)</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                // disabled={isLoading}
                                                                className={`${fieldState?.invalid && fieldState?.error
                                                                    ? "border rounded-lg border-[#F15A5A]"
                                                                    : "border-b rounded-lg border-[#D8DAE5]"
                                                                    } bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0 3xl:py-3 py-2`}
                                                                placeholder="Chọn ngân hàng thụ hưởng"
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
                                    </>
                                }
                                {
                                    typeModal === "viettel" && <>Hello viettel</>
                                }
                                <div className='flex flex-col gap-2'>
                                    <Button
                                        type="button"
                                        className='text-white font-semibold bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 rounded-lg h-14 3xl:text-base text-sm'
                                        onClick={form.handleSubmit((values) => onSubmit(values))}
                                    >
                                        Xác nhận
                                    </Button>
                                </div>
                            </Form>
                        </>
                }
            </DialogContent>
        </Dialog>
    );
}
