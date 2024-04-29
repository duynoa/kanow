"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleSurcharge from "@/services/vehicle-management/surcharge.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { useState } from "react";
import { useForm } from "react-hook-form";
type Props = {}



export default function TalentedProcedure(props: Props) {

    const form = useForm({
        defaultValues: {
            // điều khoản
            rules: ""
        }
    })

    const initialState: any = {

    }

    const { apiListSurchargeCar } = apiVehicleSurcharge()

    const [isState, setIsState] = useState(initialState)


    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))


    const { dataDetail: { data }, idCar } = useVehicleManage()

    console.log("data", data);

    const findValue = form.getValues()

    const onSubmit = async (value: any) => {
        console.log(value)
        toastCore.error('Chức năng đang phát triển')
    }

    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Thủ tục cho thuê</h1>
            </div>
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="rules"
                    rules={{
                        required: {
                            value: true,
                            message: "Vui lòng nhập các điều khoản"
                        }
                    }}
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="space-y-3">
                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">Điều khoản thuê xe <span className="text-red-500 px-1">*</span> </FormLabel>
                                <FormDescription className="text-xs text-gray-400">
                                    Thiết lập các yêu cầu khi thuê xe {data?.name}
                                </FormDescription>
                                <FormControl>
                                    <Textarea
                                        className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                      focus:border-[#2FB9BD] border-2 min-h-[150px]  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                        placeholder="Nhập các điều khoản"
                                        {...field}
                                    />
                                </FormControl>
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        )
                    }}
                />
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    <ButtonSaveForm title="Lưu thông tin" onClick={form.handleSubmit((values) => onSubmit(values))} />
                </div>
            </Form>
        </BackgroundUiVehicle>
    )
}