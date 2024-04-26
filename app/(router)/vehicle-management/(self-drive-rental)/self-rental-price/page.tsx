"use client"
import Image from "next/image";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import SearchAddress from "@/components/searchAddress/SearchAddress";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Map from "@/components/map/Maps";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import apiMyCar from "@/services/profile/listMyCar/listMyCar.services";
import { Skeleton } from "@/components/ui/skeleton";
import { toastCore } from "@/lib/toast";
import { IStateVehicleInfomation } from "@/types/VehicleManagement/GeneralInfomation/IInfomation";
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { CustomSlider } from "@/components/ui/customSlider";
import { Switch } from "@/components/ui/switch";
type Props = {}


export default function SeflRentalPrice(props: Props) {
    const param: ReadonlyURLSearchParams = useSearchParams()

    const id: string | null = param.get("id") || ''

    const form = useForm({
        defaultValues: {
            //don gia thue mac dinh
            unitPrice: "390",
            discount: {
                open: false,
                value: "",
                dataDiscount: 0,
                defaultValue: 0
            }
        }
    })

    const { dataDetail: { data }, idCar } = useVehicleManage()


    const findValue = form.getValues()


    useEffect(() => {
        if (data) {
            console.log(data, idCar);
            form.setValue('discount.dataDiscount', 100)
            form.setValue('discount.defaultValue', 5)
            form.setValue('discount.value', '5')
            form.setValue('discount.open', true)
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
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Giá cho thuê</h1>
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
                    }}
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="space-y-0 flex flex-col gap-2">
                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                    Đơn giá thuê mặc định<span className="text-red-500">*</span>
                                    <h1 className="text-xs text-gray-400">Đơn giá thuê mặc định được áp dụng nếu ngày đó không có tùy chỉnh khác về giá</h1>
                                    <h1 className="text-xs text-gray-400">Giá đề xuất 390k</h1>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        inputMode="numeric"
                                        className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                        placeholder="Nhập đơn giá thuê"
                                        type={'number'}
                                        min={0}
                                        {...field}
                                    />
                                </FormControl>

                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="discount.open"
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="">
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giảm giá
                                        </FormLabel>
                                        <Switch
                                            className="data-[state=checked]:bg-[#2FB9BD] "
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                                {field.value &&
                                    <FormField
                                        control={form.control}
                                        name="discount.value"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                        Giảm giá cho thuê tuần (% trên đơn giá)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <>
                                                            <CustomSlider
                                                                defaultValue={[findValue.discount.defaultValue]} max={findValue.discount.dataDiscount} step={1}
                                                                onValueChange={field.onChange}
                                                            />
                                                        </>
                                                    </FormControl>
                                                    <div className="flex justify-between">
                                                        <FormDescription>
                                                            Giảm đề xuất {findValue.discount.defaultValue}%
                                                        </FormDescription>
                                                        <FormDescription className='font-bold'>
                                                            {field.value}%
                                                        </FormDescription>
                                                    </div>
                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                    )}
                                                </FormItem>
                                            );
                                        }}
                                    />}
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