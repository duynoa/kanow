"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleSurcharge from "@/services/vehicle-management/surcharge.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { ISTateSurcharge } from "@/types/VehicleManagement/SelfDriveRental/ISurcharge";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {}

export default function SelftSurcharge(props: Props) {
    const form = useForm({
        defaultValues: {
            // giới hạn số km
            limitedKilometers: {
                open: false,
                maximumKilometers: "",
                overLimitFee: ""
            },
            arraySurcharge: [
                {
                    open: true,
                    value: 0
                }
            ]
        }
    })

    const initialState: ISTateSurcharge = {
        isLoading: false,
        // gioi han so km
        limitedKilometers: {
            maximumKilometers: 0,
            overLimitFee: 0
        },
        arraySurcharge: []
    }

    const { apiListSurchargeCar } = apiVehicleSurcharge()

    const [isState, setIsState] = useState(initialState)


    const queryState = (key: ISTateSurcharge) => setIsState((prev: ISTateSurcharge) => ({ ...prev, ...key }))


    const { dataDetail: { data }, idCar } = useVehicleManage()


    const findValue = form.getValues()


    // dnah sách phụ phí
    const fetchListSurcharge = async () => {
        queryState({ isLoading: true })
        try {

            const { data } = await apiListSurchargeCar({ type: 1 })

            queryState({ arraySurcharge: data.data })

            form.setValue('arraySurcharge', data.data.map((x: any) => ({ ...x, open: true, value: 20 })))

        } catch (error) {
            throw error
        } finally {
            queryState({ isLoading: false })
        }
    }

    useEffect(() => {
        fetchListSurcharge()
    }, [])


    useEffect(() => {
        if (data) {
            form.setValue('limitedKilometers.open', true)
            form.setValue('limitedKilometers.maximumKilometers', data?.total_km_day)

            queryState({
                limitedKilometers: {
                    ...isState.limitedKilometers,
                    maximumKilometers: data?.total_km_day,
                    overLimitFee: 100
                },
            })
            return
        }
        form.reset()
    }, [data])

    const onSubmit = async (value: any) => {
        console.log(value.arraySurcharge.map((x: any) => {
            return {
                ...x,
                value: x.value[0]
            }
        }))
        toastCore.error('Chức năng đang phát triển')
    }


    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Phụ phí</h1>
            </div>
            <Form {...form}>
                <div className="grid grid-cols-1 gap-6">
                    <FormField
                        control={form.control}
                        name="limitedKilometers.open"
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem className="">
                                    <FormControl>
                                        <div className="flex items-center gap-2">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Giới hạn số Km
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
                                                name="limitedKilometers.maximumKilometers"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                Số Km tối đa trong 1 ngày
                                                            </FormLabel>
                                                            <FormControl>
                                                                <>
                                                                    <CustomSlider
                                                                        defaultValue={[400]} max={isState.limitedKilometers && isState.limitedKilometers.maximumKilometers} step={1}
                                                                        onValueChange={field.onChange}
                                                                    />
                                                                </>
                                                            </FormControl>
                                                            <div className="flex justify-between">
                                                                <FormDescription>
                                                                    Số Km đề xuất: {400}Km
                                                                </FormDescription>
                                                                <FormDescription className='font-bold'>
                                                                    {field.value}Km
                                                                </FormDescription>
                                                            </div>
                                                            {fieldState?.invalid && fieldState?.error && (
                                                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                            )}
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="limitedKilometers.overLimitFee"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                Vượt phí giới hạn (tính mỗi Km)
                                                            </FormLabel>
                                                            <FormControl>
                                                                <>
                                                                    <CustomSlider
                                                                        defaultValue={[3]} max={isState.limitedKilometers && isState.limitedKilometers.overLimitFee} step={1}
                                                                        onValueChange={field.onChange}
                                                                    />
                                                                </>
                                                            </FormControl>
                                                            <div className="flex justify-between">
                                                                <FormDescription>
                                                                    Phí đề xuất: {3}k
                                                                </FormDescription>
                                                                <FormDescription className='font-bold'>
                                                                    {field.value}k
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
                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            );
                        }}
                    />
                    {isState.isLoading ? [...Array(3)].map((x, index) => {
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
                    }) : isState.arraySurcharge && isState.arraySurcharge.map((item, index: any) => {
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
                                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
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
                                                                                    defaultValue={[100]} max={item.max} min={item.min} step={1}
                                                                                    onValueChange={field.onChange}
                                                                                />
                                                                            </>
                                                                        </FormControl>
                                                                        <div className="flex justify-between">
                                                                            <FormDescription>
                                                                                Phí đề xuất: {100}K
                                                                            </FormDescription>
                                                                            <FormDescription className='font-bold'>
                                                                                {field.value > 100 ? FormatNumberToThousands(field.value) : `${field.value}K`}
                                                                                {/* {field.value ? FormatNumberToThousands(field.value) : '0K'} */}
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
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        )
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    <ButtonSaveForm title="Lưu thông tin" onClick={form.handleSubmit((values) => onSubmit(values))} />
                </div>
            </Form>
        </BackgroundUiVehicle>
    )
}