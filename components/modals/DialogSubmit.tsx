import { useEffect, useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { X } from "lucide-react";
import { Label } from "../ui/label";
import { toastCore } from "@/lib/toast";
import { Checkbox } from "../ui/checkbox";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useCookie } from "@/hooks/useCookie";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import useAuthenticationAPI from "@/services/auth/auth.services";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { jwtDecode } from "jwt-decode";
import { usePathname } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useDialogLogin, useDialogSubmit } from "@/hooks/useOpenDialog";
import { FormatNumberToThousands, FormatPhoneNumber } from "../format/FormatNumber";
import { regexPatterns } from "@/lib/regex";
import { NumericFormatCore } from "@/lib/numericFormat";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { putPriceSingleDate } from "@/services/cars/calendar.services";

type Props = {};

export function DialogSubmit({ }: Props) {
    const { dataOther } = useVehicleManage()

    const form = useForm({
        defaultValues: {
            //don gia thue mac dinh
            unitPrice: "0",
        }
    })

    const {
        openDialogSubmit,
        typeDialogSubmit,
        typeCar,
        dataItem,
        setOpenDialogSubmit,
        setTypeDialogSubmit,
    } = useDialogSubmit()

    const handleOpenChangeModal = (value: boolean) => {
        setOpenDialogSubmit(value)
    }

    // useEffect(() => {
    //     form.setValue("unitPrice", "0")

    //     form.reset()
    // }, [form])

    const onSubmit = async (value: any) => {
        // Xử lý dữ liệu form khi submit
        console.log("value submit: ", value);
        try {
            console.log('dataItem', dataItem);

            const dataSubmit = {
                type: typeCar,
                price_detail_id: dataItem.id,
                price_new: value.unitPrice === "0" ? "100" : `${value.unitPrice}000`
            }

            const { data } = await putPriceSingleDate(dataSubmit)

            console.log('data', data);


        } catch (err) {
            throw err
        }
    };

    console.log('openDialogSubmit', openDialogSubmit);

    return (
        <Dialog
            modal
            open={openDialogSubmit}
            onOpenChange={(value) => handleOpenChangeModal(value)}
        >
            <DialogOverlay />
            <DialogContent className={`lg:max-w-[420px] max-w-[95%] max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}>
                <DialogClose
                    onClick={() => setOpenDialogSubmit(false)}
                    className="size-8 border flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-4 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader className="flex items-center justify-center w-full 3xl:mt-6 mt-3">
                    <DialogTitle className={` capitalize text-2xl`}>
                        {typeDialogSubmit === "price_single" && "Tuỳ chỉnh giá"}
                    </DialogTitle>
                </DialogHeader>

                {
                    typeDialogSubmit === "price_single" &&
                    <Form  {...form} >
                        <div className='flex flex-col gap-2'>
                            <FormField
                                control={form.control}
                                name="unitPrice"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng nhập đơn giá thuê',
                                    },
                                    validate: {
                                        function: (value: any) => {
                                            try {
                                                let message = ''
                                                if (value < 0) {
                                                    message = 'Vui lòng không nhập số âm!'
                                                }
                                                return message || true;
                                            } catch (error) {
                                                throw error;
                                            }
                                        }
                                    }
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <FormItem className="space-y-0 flex flex-col gap-2">
                                            <FormLabel>
                                                <h1 className="text-xs font-medium text-gray-400">
                                                    Nhập giá truỳ chỉnh cho ngày này. Nhập 0 nếu muốn dùng giá mặc định
                                                </h1>
                                            </FormLabel>
                                            <FormControl>
                                                <div className='flex gap-2 items-center'>
                                                    <NumericFormatCore
                                                        className={`w-[60%] max-w-[60%] disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2 focus:border-[#2FB9BD] outline-none border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-lg px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0`}
                                                        placeholder="Nhập đơn giá thuê"
                                                        thousandSeparator={','}
                                                        maxLength={10}
                                                        {...field}
                                                    />
                                                    <span>k</span>
                                                </div>
                                            </FormControl>
                                            {
                                                dataOther?.rent_cost_propose > 0 &&
                                                <h1 className="text-xs font-medium text-gray-400">
                                                    <span>Giá đề xuất</span>
                                                    <span className="px-1">{FormatNumberToThousands(dataOther?.rent_cost_propose)}</span>
                                                </h1>
                                            }

                                            {fieldState?.invalid && fieldState?.error && (
                                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                            <Button
                                type="button"
                                className='text-white font-semibold bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 rounded-lg h-14 3xl:text-base text-sm'
                                onClick={form.handleSubmit((values) => onSubmit(values))}
                            >
                                Xác nhận
                            </Button>
                        </div>
                    </Form>
                }
            </DialogContent>
        </Dialog>
    );
}
