"use client"
import ButtonLoading from "@/components/button/ButtonLoading";
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { StateSelftVehicleHanding } from "@/types/VehicleManagement/SelfDriveRental/IVehicleHanding";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {}

export default function SelftVehicleHanding(props: Props) {
    const initialState: StateSelftVehicleHanding = {
        intersectionSquare: {
            max: 500,
            min: 0,
            propose: 0,
            step: 1
        },
        deliveryFee: {
            max: 5000000,
            min: 0,
            propose: 0,
            step: 1
        },
        freeDelivery: {
            max: 500,
            min: 0,
            propose: 0,
            step: 1
        },
    }

    const { apiUpdateCar } = apiVehicleCommon()


    const [isState, setIsState] = useState(initialState)

    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()


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
            form.setValue('vehicleHanding.open', data?.car?.delivery_car == 1)
            form.setValue('vehicleHanding.deliveryFee', data?.car?.fee_km_delivery_car ?? 0)
            form.setValue('vehicleHanding.freeDelivery', data?.car?.free_km_delivery_car ?? 0)
            form.setValue('vehicleHanding.intersectionSquare', data?.car?.km_delivery_car ?? 0)
            queryState({
                deliveryFee: {
                    ...isState.deliveryFee,
                    propose: +dataOther.other?.fee_km_delivery_car,
                    step: +dataOther.other?.range_fee_km_delivery_car ?? 1
                },
                freeDelivery: {
                    ...isState.freeDelivery,
                    propose: +dataOther.other?.free_km_delivery_car,
                    step: +dataOther.other?.range_free_km_delivery_car ?? 1
                },
                intersectionSquare: {
                    ...isState.intersectionSquare,
                    propose: +dataOther.other?.km_delivery_car,
                    step: +dataOther.other?.range_km_delivery_car ?? 1
                },
            })
            return
        }
        form.reset()
    }, [data])

    const onSubmit = async (value: any) => {
        queryKeyIsStateLoadSuccess({
            loading: {
                ...isStateLoadSuccess.loading,
                isLoadingButton: true
            }
        })
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
        try {
            const { data: db } = await apiUpdateCar(formData)
            if (db.result) {
                toastCore.success('Lưu thông tin thành công')
                return
            }
            toastCore.error(db.message)
        } catch (error) {

        } finally {
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isLoadingButton: false
                }
            })
        }
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
                                                                    defaultValue={[+field.value]}
                                                                    min={isState.intersectionSquare.min}
                                                                    max={isState.intersectionSquare.max}
                                                                    step={isState.intersectionSquare.step}
                                                                    onValueChange={field.onChange}
                                                                />
                                                            </>
                                                        </FormControl>
                                                        <div className={`flex ${isState.intersectionSquare.propose > 0 ? "justify-between" : "justify-end"}`}>
                                                            {
                                                                isState.intersectionSquare.propose > 0 &&
                                                                <FormDescription>
                                                                    Quãng đường đề xuất: {isState.intersectionSquare.propose}Km
                                                                </FormDescription>
                                                            }
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
                                                                    defaultValue={[+field.value]}
                                                                    min={isState.deliveryFee.min}
                                                                    max={isState.deliveryFee.max}
                                                                    step={isState.deliveryFee.step}
                                                                    onValueChange={field.onChange}
                                                                />
                                                            </>
                                                        </FormControl>
                                                        <div className={`flex ${isState.deliveryFee.propose > 0 ? "justify-between" : "justify-end"}`}>
                                                            {
                                                                isState.deliveryFee.propose > 0 &&
                                                                <FormDescription>
                                                                    Phí đề xuất: {FormatNumberToThousands(isState.deliveryFee.propose)}
                                                                </FormDescription>
                                                            }
                                                            <FormDescription className='font-bold'>
                                                                {FormatNumberToThousands(+field.value)}
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
                                                                    defaultValue={[+field.value]}
                                                                    max={isState.freeDelivery.max}
                                                                    min={isState.freeDelivery.min}
                                                                    step={isState.freeDelivery.step}
                                                                    onValueChange={field.onChange}
                                                                />
                                                            </>
                                                        </FormControl>
                                                        <div className={`flex ${isState.freeDelivery.propose > 0 ? "justify-between" : "justify-end"}`}>
                                                            {isState.freeDelivery.propose > 0 &&
                                                                <FormDescription>
                                                                    Quãng đường đề xuất: {isState.freeDelivery.propose}Km
                                                                </FormDescription>
                                                            }
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
                        <ButtonLoading
                            title="Lưu thông tin"
                            type="button"
                            onClick={form.handleSubmit((values) => onSubmit(values))}
                            className="p-4 flex items-center gap-2 md:w-fit w-full text-white border-[#2FB9BD] rounded-xl border-2 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                            disabled={isStateLoadSuccess.loading.isLoadingButton}
                            isStateloading={isStateLoadSuccess.loading.isLoadingButton}
                        />
                    </div>
                }
            </Form>
        </BackgroundUiVehicle>
    )
}