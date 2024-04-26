"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import SelectCombobox from "@/components/combobox/SelectCombobox";
import { Button } from "@/components/ui/button";
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { StateSelftVehicleHanding } from "@/types/VehicleManagement/SelfDriveRental/IVehicleHanding";
import { ChevronsUpDown } from "lucide-react";
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

    const checkValueArray = (array: any[], field: any) => {
        return array.find((x: any) => x.value === field.value)?.label
    }

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

    const { dataDetail: { data }, idCar } = useVehicleManage()


    const findValue = form.getValues()


    useEffect(() => {
        if (data) {
            console.log(data);
            form.setValue('vehicleHanding.open', data?.delivery_car == 1)
            form.setValue('vehicleHanding.deliveryFee', data?.fee_km_delivery_car)
            form.setValue('vehicleHanding.freeDelivery', data?.free_km_delivery_car)
            form.setValue('vehicleHanding.intersectionSquare', data?.km_delivery_car)
            queryState({
                deliveryFee: +data?.fee_km_delivery_car,
                freeDelivery: +data?.free_km_delivery_car,
                intersectionSquare: +data?.km_delivery_car,
            })
            return
        }
        form.reset()
    }, [data])

    const onSubmit = async (value: any) => {
        console.log(value)
        toastCore.error('Chức năng đang phát triển')
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
                                                                Quãng đường đề xuất: {isState.intersectionSquare}km
                                                            </FormDescription>
                                                            <FormDescription className='font-bold'>
                                                                {field.value}km
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
                                                            Phí giao nhận xe 2 chiều (Tính theo km)
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
                                                                Phí đề xuất: {isState.deliveryFee}k
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
                                                                Quãng đường đề xuất {isState.freeDelivery}km
                                                            </FormDescription>
                                                            <FormDescription className='font-bold'>
                                                                {field.value}km
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