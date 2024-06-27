"use client"
import ButtonLoading from "@/components/button/ButtonLoading";
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import Nodata from "@/components/image/Nodata";
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleSurcharge from "@/services/vehicle-management/surcharge.services";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { ISTateSurcharge } from "@/types/VehicleManagement/SelfDriveRental/ISurcharge";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {}

export default function TalentedSurcharge(props: Props) {
    const form = useForm({
        defaultValues: {
            arraySurcharge: [
                {
                    open: true,
                    value: 0
                }
            ]
        }
    })

    const initialState: ISTateSurcharge = {
        isLoading: true,
        arraySurcharge: []
    }

    const { apiListSurchargeCar } = apiVehicleSurcharge()

    const [isState, setIsState] = useState(initialState)


    const queryState = (key: ISTateSurcharge) => setIsState((prev: ISTateSurcharge) => ({ ...prev, ...key }))


    const { dataDetail: { data }, idCar, dataOther } = useVehicleManage()
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const { apiUpdateCar } = apiVehicleCommon()


    const findValue = form.getValues()


    // dnah sách phụ phí
    const fetchListSurcharge = async () => {
        // queryState({ isLoading: true })
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const { data: db } = await apiListSurchargeCar({ type: 2 })

            queryState({ arraySurcharge: db.data })

            if (!Array.isArray(data) && data?.surcharge_car?.length > 0) {
                const arr = db.data.map((e: any) => {
                    const Obj = data?.surcharge_car_talent.find((x: any) => x.id === e.id)
                    return {
                        ...e,
                        value: Obj ? Obj.value : e.value ?? 0,
                        open: !!Obj
                    }
                })
                form.setValue('arraySurcharge', arr)
                return
            }
            form.reset()
        } catch (error) {
            throw error
        } finally {
            queryState({ isLoading: false })
        }
    }

    useEffect(() => {
        if (data?.surcharge_car) {
            fetchListSurcharge()
        }
    }, [data?.surcharge_car])


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
            formData.append('type', '2')
            value.arraySurcharge.forEach((x: any, index: number) => {
                formData.append(`surcharge_car[${index}][id]`, `${x.id}`)
                formData.append(`surcharge_car[${index}][check]`, `${x.open ? 1 : 0}`)
                formData.append(`surcharge_car[${index}][value]`, `${Array.isArray(x.value) ? x.value[0] : x.value}`)
            })
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
                <h1 className='text-[#3E424E] text-xl uppercase font-bold'>Phụ phí</h1>
            </div>
            <Form {...form}>
                <div className="grid grid-cols-1 gap-6">
                    {isState.isLoading ? [...Array(5)].map((x, index) => {
                        return (
                            <div key={index} className="flex flex-col gap-2">
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                                <div className="flex justify-between">
                                    <Skeleton className="h-8 w-full" />
                                    <Skeleton className="h-8 w-full" />
                                </div>
                            </div>
                        )
                    }) : isState.arraySurcharge && isState.arraySurcharge?.length > 0 ? isState.arraySurcharge.map((item, index: any) => {
                        return (
                            <div key={index}>
                                <Controller
                                    name={`arraySurcharge.${index}.open`}
                                    control={form.control}
                                    rules={{ required: false }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem
                                                className="">
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <FormLabel className="text-base font-semibold text-[#16171B]">
                                                            {item.name}
                                                        </FormLabel>
                                                        <Switch
                                                            className="data-[state=checked]:bg-[#2FB9BD] "
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </div>
                                                </FormControl>
                                                {field.value &&
                                                    <div className="flex flex-col gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`arraySurcharge.${index}.value`}
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem>
                                                                        <FormLabel className="text-xs text-gray-400">
                                                                            {item.note}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <>
                                                                                <CustomSlider
                                                                                    defaultValue={[field.value]}
                                                                                    max={item.max}
                                                                                    min={item.min}
                                                                                    step={item?.range}
                                                                                    onValueChange={field.onChange}
                                                                                />
                                                                            </>
                                                                        </FormControl>
                                                                        <div className={`flex ${item?.propose_fee > 0 ? "justify-between" : "justify-end"}`}>
                                                                            {item?.propose_fee > 0 &&
                                                                                <FormDescription>
                                                                                    Phí đề xuất: {FormatNumberToThousands(item?.propose_fee)}
                                                                                </FormDescription>
                                                                            }
                                                                            <FormDescription className='font-bold'>
                                                                                {FormatNumberToThousands(field.value)}
                                                                            </FormDescription>
                                                                        </div>
                                                                        {fieldState?.invalid && fieldState?.error && (
                                                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                        )}
                                                                    </FormItem>
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                }
                                                {
                                                    fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                    )
                                                }
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
                        )
                    })
                        :
                        <Nodata type="vehicle-surcharge" />
                    }
                </div>
                {
                    isState.arraySurcharge && isState.arraySurcharge.length > 0 &&
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
                }
            </Form>
        </BackgroundUiVehicle>
    )
}