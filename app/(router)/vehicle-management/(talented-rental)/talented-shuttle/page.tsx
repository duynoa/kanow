"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";

type Props = {}


export default function TalentedShuttle(props: Props) {

    const initialState: any = {
        // đưa đón tận nơi trong vòng
        within: "0",
        // phí đưa đón
        shuttleFee: "0",
        // miễn phí đưa đón
        freeShuttle: "0"
    }

    const form = useForm({
        defaultValues: {
            shuttle: {
                // đưa đón tận nơi trong vòng
                within: "",
                // phí đưa đón
                shuttleFee: "",
                // miễn phí đưa đón
                freeShuttle: ""
            },
        }
    })

    const [isState, setIsState] = useState(initialState)

    const checkValueArray = (array: any[], field: ControllerRenderProps<any, any>) => {
        return array.find((x: any) => x.value === field.value)?.label
    }

    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))


    const { dataDetail: { data }, idCar, dataOther } = useVehicleManage()


    const findValue = form.getValues()

    const { apiUpdateCar } = apiVehicleCommon()


    useEffect(() => {
        if (!Array.isArray(data) && data) {
            console.log(data, idCar);
            console.log("dataOther", dataOther);
            [
                ["shuttle.within", data?.car_talent?.km_delivery_car],
                ["shuttle.shuttleFee", data?.car_talent?.fee_km_delivery_car],
                ["shuttle.freeShuttle", data?.car_talent?.free_km_delivery_car],
            ].map(([name, value]: any) => form.setValue(name, value))
            queryState({
                shuttleFee: +dataOther.other?.fee_km_delivery_car,
                freeShuttle: +dataOther.other?.free_km_delivery_car,
                within: +dataOther.other?.km_delivery_car,
            })
            return
        }
        form.reset()
    }, [data])


    const onSubmit = async (value: any) => {
        // đưa đón tận nơi: km_delivery_car_talent
        // Phí đưa đón: fee_km_delivery_car_talent
        // miễn phi đưa đón: free_km_delivery_car_talent
        let formData = new FormData()
        formData.append('car_id', idCar)
        formData.append('km_delivery_car_talent', value.shuttle.within)
        formData.append('fee_km_delivery_car_talent', value.shuttle.shuttleFee)
        formData.append('free_km_delivery_car_talent', value.shuttle.freeShuttle)

        const { data: db } = await apiUpdateCar(formData)
        if (db.result) {
            toastCore.success('Lưu thông tin thành công')
            return
        }
        toastCore.error(db.message)
    }


    return (
        <BackgroundUiVehicle className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-2">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Đưa đón tận nơi</h1>
            </div>
            <Form  {...form}>
                <FormField
                    control={form.control}
                    name="shuttle.within"
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem>
                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                    Đưa đón tận nơi trong vòng
                                </FormLabel>
                                <FormControl>
                                    <>
                                        <CustomSlider
                                            defaultValue={[20]} max={isState.within && isState.within} step={1}
                                            onValueChange={field.onChange}
                                        />
                                    </>
                                </FormControl>
                                <div className="flex justify-between">
                                    <FormDescription>
                                        Quãng đường đề xuất: {20}Km
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
                    name="shuttle.shuttleFee"
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem>
                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                    Phí đưa đón cho mỗi Km
                                </FormLabel>
                                <FormControl>
                                    <>
                                        <CustomSlider
                                            defaultValue={[20]} max={isState.shuttleFee && isState.shuttleFee} step={1}
                                            onValueChange={field.onChange}
                                        />
                                    </>
                                </FormControl>
                                <div className="flex justify-between">
                                    <FormDescription>
                                        Phí đề xuất: {20}K
                                    </FormDescription>
                                    <FormDescription className='font-bold'>
                                        {field.value}K
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
                    name="shuttle.freeShuttle"
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem>
                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                    Miễn  phí đưa đón trong vòng
                                </FormLabel>
                                <FormControl>
                                    <>
                                        <CustomSlider
                                            defaultValue={[20]} max={isState.freeShuttle && isState.freeShuttle} step={1}
                                            onValueChange={field.onChange}
                                        />
                                    </>
                                </FormControl>
                                <div className="flex justify-between">
                                    <FormDescription>
                                        Quãng đường đề xuất: {20}Km
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
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    <ButtonSaveForm title="Lưu thông tin" onClick={form.handleSubmit((values) => onSubmit(values))} />
                </div>
            </Form>
        </BackgroundUiVehicle>
    )
}