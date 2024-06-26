"use client"
import ButtonLoading from "@/components/button/ButtonLoading";
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const CustomQuill = dynamic(() => import("@/components/quill/CustomQuill"), { ssr: false });

type Props = {}

export default function TalentedProcedure(props: Props) {

    const form = useForm({
        defaultValues: {
            // điều khoản
            rules: "",
            desc: ''
        }
    })

    const { dataDetail: { data }, idCar } = useVehicleManage()
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const { apiUpdateCar } = apiVehicleCommon()

    const onSubmit = async (value: any) => {
        try {
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isLoadingButton: true
                }
            })

            let formData = new FormData()
            formData.append('car_id', idCar)
            formData.append('rules_talent', value.rules)
            const { data: db } = await apiUpdateCar(formData)
            if (db.result) {
                queryKeyIsStateLoadSuccess({
                    loading: {
                        ...isStateLoadSuccess.loading,
                        isLoadingButton: false
                    }
                })
                toastCore.success('Lưu thông tin thành công')
            } else {
                queryKeyIsStateLoadSuccess({
                    loading: {
                        ...isStateLoadSuccess.loading,
                        isLoadingButton: false
                    }
                })
                toastCore.error(db.message)
            }
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        if (!Array.isArray(data) && data) {
            form.setValue("rules", data?.car_talent?.rules)
            return
        }
        form.reset()
    }, [data])

    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className='text-[#3E424E] text-xl uppercase font-bold'>Thủ tục cho thuê</h1>
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
                                <FormLabel className="text-base font-semibold text-[#16171B]">Điều khoản thuê xe </FormLabel>
                                <FormDescription className="text-sm text-gray-400">
                                    Thiết lập các yêu cầu khi thuê xe {data?.name}
                                </FormDescription>
                                <FormControl>
                                    {/* <Textarea
                                        className={`disabled:bg-[#E6E8EC] text-base disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                      focus:border-[#2FB9BD] border-2 min-h-[150px]  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                        placeholder="Nhập các điều khoản"
                                        {...field}
                                    /> */}
                                    <>
                                        <CustomQuill
                                            field={field}
                                            placeholder="Nhập các điều khoản"
                                        />
                                    </>
                                </FormControl>
                                {
                                    fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )
                                }
                            </FormItem>
                        )
                    }}
                />
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    {/* <ButtonSaveForm title="Lưu thông tin" onClick={form.handleSubmit((values) => onSubmit(values))} /> */}

                    <ButtonLoading
                        title="Lưu thông tin"
                        type="button"
                        onClick={form.handleSubmit((values) => onSubmit(values))}
                        className="flex items-center gap-2 md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                                border-2 h-14 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                        disabled={isStateLoadSuccess.loading.isLoadingButton}
                        isStateloading={isStateLoadSuccess.loading.isLoadingButton}
                    />
                </div>
            </Form>
        </BackgroundUiVehicle>
    )
}