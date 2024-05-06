"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { StateSelftVehicleHanding } from "@/types/VehicleManagement/SelfDriveRental/IVehicleHanding";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {}

export default function SelftVehicleHanding(props: Props) {
    const param: ReadonlyURLSearchParams = useSearchParams()

    const id: string | null = param.get("id") || ''

    const initialState: StateSelftVehicleHanding = {
        intersectionSquare: 0,
        deliveryFee: 0,
        freeDelivery: 0,
    }

    const { apiUpdateCar } = apiVehicleCommon()


    const [isState, setIsState] = useState(initialState)

    const queryState = (key: any) => setIsState((prev: StateSelftVehicleHanding) => ({ ...prev, ...key }))

    const form = useForm({
        defaultValues: {
            vehicleHanding: {
                open: false,
                intersectionSquare: '',
                deliveryFee: "",
                freeDelivery: "",
            }
        }
    })

    const { dataDetail: { data }, idCar, dataOther } = useVehicleManage()


    const findValue = form.getValues()


    useEffect(() => {
        if (data) {
            console.log(data);
            form.setValue('vehicleHanding.open', data?.car?.delivery_car == 1)
            form.setValue('vehicleHanding.deliveryFee', data?.car?.fee_km_delivery_car)
            form.setValue('vehicleHanding.freeDelivery', data?.car?.free_km_delivery_car)
            form.setValue('vehicleHanding.intersectionSquare', data?.car?.km_delivery_car)
            queryState({
                deliveryFee: +dataOther.other?.fee_km_delivery_car,
                freeDelivery: +dataOther.other?.free_km_delivery_car,
                intersectionSquare: +dataOther.other?.km_delivery_car,
            })
            return
        }
        form.reset()
    }, [data])

    const onSubmit = async (value: any) => {
        let formData = new FormData()
        formData.append('car_id', idCar)
        // nut tắt mở
        formData.append('delivery_car', `${value.vehicleHanding.open ? 1 : 0}`)
        // quang duong giao xe tối đa
        formData.append('km_delivery_car', value.vehicleHanding.intersectionSquare)
        // phi giao nhan xe
        formData.append("fee_km_delivery_car", value.vehicleHanding.deliveryFee)
        // mien phi
        formData.append("free_km_delivery_car", value.vehicleHanding.freeDelivery)
        const { data: db } = await apiUpdateCar(formData)
        if (db.result) {
            toastCore.success('Lưu thông tin thành công')
            return
        }
        toastCore.error(db.message)
    }
    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Giao xe tận nơi</h1>
            </div>
            <Form  {...form}>
                <FormField
                    control={form.control}
                    name="vehicleHanding.open"
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="">
                                <FormControl>
                                    <div className="flex items-center gap-2">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giao xe tận nơi
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
                                            name="vehicleHanding.intersectionSquare"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                            Quãng đường giao xe tối đa
                                                        </FormLabel>
                                                        <FormControl>
                                                            <>
                                                                <CustomSlider
                                                                    defaultValue={[+field.value]} max={isState.intersectionSquare} step={1}
                                                                    onValueChange={field.onChange}
                                                                />
                                                            </>
                                                        </FormControl>
                                                        <div className="flex justify-between">
                                                            <FormDescription>
                                                                Quãng đường đề xuất: {10}Km
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
                                            name="vehicleHanding.deliveryFee"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                            Phí giao nhận xe 2 chiều (Tính theo Km)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <>
                                                                <CustomSlider
                                                                    defaultValue={[+field.value]} max={100} step={1}
                                                                    onValueChange={field.onChange}
                                                                />
                                                            </>
                                                        </FormControl>
                                                        <div className="flex justify-between">
                                                            <FormDescription>
                                                                Phí đề xuất: {10}K
                                                            </FormDescription>
                                                            <FormDescription className='font-bold'>
                                                                {+field.value > 100 ? FormatNumberToThousands(+field.value) : `${field.value}K`}
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
                                            name="vehicleHanding.freeDelivery"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                            Miễn phí giao nhận xe trong vòng
                                                        </FormLabel>
                                                        <FormControl>
                                                            <>
                                                                <CustomSlider
                                                                    defaultValue={[+field.value]} max={100} step={1}
                                                                    onValueChange={field.onChange}
                                                                />
                                                            </>
                                                        </FormControl>
                                                        <div className="flex justify-between">
                                                            <FormDescription>
                                                                Quãng đường đề xuất {10}Km
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
                                    </div>
                                }
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        );
                    }}
                />
                {findValue.vehicleHanding.open &&
                    <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                        <ButtonSaveForm title="Lưu thông tin" onClick={form.handleSubmit((values) => onSubmit(values))} />
                    </div>
                }
            </Form>
        </BackgroundUiVehicle>
    )
}