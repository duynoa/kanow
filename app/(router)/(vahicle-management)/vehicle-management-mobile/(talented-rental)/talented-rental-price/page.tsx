"use client"
import ButtonLoading from "@/components/button/ButtonLoading";
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { NumericFormatCore } from "@/lib/numericFormat";
import { toastCore } from "@/lib/toast";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
type Props = {}

export default function TalentedRentalPrice(props: Props) {
    const form = useForm({
        defaultValues: {
            //don gia thue mac dinh
            unitPrice: "",
        }
    })

    const { apiUpdateCar } = apiVehicleCommon()

    const { dataDetail: { data }, idCar, dataOther } = useVehicleManage()
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const findValue = form.getValues()

    useEffect(() => {
        if (!Array.isArray(data) && data) {
            form.setValue('unitPrice', `${data?.car_talent?.rent_cost > 0 ? data?.car_talent?.rent_cost : ""}`)
            return
        }
        form.reset()
    }, [data])

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
            formData.append('rent_cost_talent', value.unitPrice)
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


    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className='text-[#3E424E] text-xl uppercase font-bold'>Giá cho thuê</h1>
            </div>
            <Form  {...form}>
                <FormField
                    control={form.control}
                    name="unitPrice"
                    rules={{
                        required: {
                            value: true,
                            message: 'Vui lòng nhập đơn giá thuê',
                        },
                        validate: {
                            fn: (value: any) => {
                                try {
                                    let mss = ''
                                    if (value == 0) {
                                        mss = 'Đơn giá thuê phải lớn hơn 0'
                                    }
                                    return mss || true;
                                } catch (error) {
                                    throw error;
                                }
                            }
                        }
                    }}
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="space-y-0 flex flex-col gap-2">
                                <FormLabel className="text-base font-semibold text-[#16171B]">
                                    <span>Đơn giá thuê mặc định</span><span className="text-red-500">*</span>
                                    <h1 className="text-sm text-gray-400">Đơn giá thuê mặc định được áp dụng nếu ngày đó không có tùy chỉnh khác về giá</h1>
                                    {

                                        dataOther?.rent_cost_propose > 0 &&
                                        <h1 className="text-sm text-gray-400">
                                            <span>Giá đề xuất</span>
                                            <span className="px-1">{FormatNumberToThousands(dataOther?.rent_cost_propose)}</span>
                                        </h1>
                                    }
                                </FormLabel>
                                <FormControl>
                                    <NumericFormatCore
                                        className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full 
                                                 focus:border-[#2FB9BD] ${fieldState?.invalid && fieldState?.error ? 'border-[#2FB9BD]' : 'border-[#E6E8EC]'} outline-none border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                        placeholder="Nhập đơn giá thuê"
                                        thousandSeparator={','}
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