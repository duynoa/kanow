"use client"
import Image from "next/image";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
type Props = {}

export default function VehicleInfomation(props: Props) {
    const initialState: IStateVehicleInfomation = {
        loadFeature: false,
        dataFeature: [],
    }

    const param: ReadonlyURLSearchParams = useSearchParams()

    const id: string | null = param.get("id") || ''

    const form = useForm({
        defaultValues: {
            //tên xe
            nameCar: "",
            // biển số xe
            licensePlates: "",
            // địa chỉ xe
            address: "",
            // số ghế
            seats: "",
            // truyền động
            move: "",
            // loại nhiên liệu
            feuelType: "",
            // mức tiêu thụ nhiên liệu
            fuelConsumptionLevel: "",
            // mô tả
            describe: "",
            // tính năng
            feature: []
        }
    })

    const { apiDetailCar } = apiVehicleCommon()

    const { apiListFeature } = apiMyCar()

    const { dataDetail: { data }, idCar } = useVehicleManage()


    const [isState, setIsState] = useState(initialState)

    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    const fetListFeature = async () => {
        queryState({ loadFeature: true })
        try {
            const { data } = await apiListFeature()
            if (data?.data) {
                queryState({ dataFeature: data?.data })
            }
        } catch (error) {
            throw error
        } finally {
            queryState({ loadFeature: false })
        }
    }

    useEffect(() => {
        fetListFeature()
    }, [])


    useEffect(() => {
        if (data) {
            console.log(data, idCar);
            const { name, number_car, location, number_seat, transmission, type_fuel, fuel_consumption, detail, other_amenities_car } = data;
            const arr = [
                ['nameCar', name],
                ['licensePlates', number_car],
                ['address', location.address],
                ['seats', number_seat],
                ['move', transmission],
                ['feuelType', type_fuel],
                ['fuelConsumptionLevel', fuel_consumption],
                ['describe', detail],
                ['feature', other_amenities_car?.map((e: any) => e.id)]
            ]
            arr.forEach(([key, value]) => form.setValue(key, value))
            return
        }
        form.reset()
    }, [data])


    const onSubmit = async (value: any) => {
        console.log(value)
        toastCore.error('Chức năng đang phát triển')
    }


    return (
        <BackgroundUiVehicle className="flex flex-col gap-4 ">
            <div>
                <div className="flex md:flex-row flex-col justify-between">
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Thông tin xe</h1>
                </div>
            </div>
            <Form {...form}>
                <div className="space-y-4" >
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="nameCar"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Tên xe
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập tên xe"
                                                type={'text'}
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
                            name="licensePlates"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Biển số xe
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập biển số xe"
                                                type={'text'}
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
                    </div>
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Địa chỉ xe
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <SearchAddress onChange={(e: any) => field.onChange(e)} >
                                                <Input
                                                    type="text"
                                                    className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs  disabled:border-gray-300 disabled:border-2  focus:border-[#2FB9BD]
                                                                            w-full border-[#E6E8EC] border-2 2xl:py-3 lg:py-2 md:py-2 py-2 rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                    placeholder="Nhập địa chỉ của bạn"
                                                    {...field}
                                                />
                                            </SearchAddress>

                                        </>
                                    </FormControl>

                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            );
                        }}
                    />
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="seats"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Số ghế
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập số ghế"
                                                type={'text'}
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
                            name="move"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Truyền động
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập truyền động"
                                                type={'text'}
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
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <FormField
                            control={form.control}
                            name="feuelType"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Loại nhiên liệu
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập loại nhiên liệu"
                                                type={'text'}
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
                            name="fuelConsumptionLevel"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Mức tiêu thụ nhiên liệu (Lít/100km)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập mức tiêu thụ nhiên liệu"
                                                type={'text'}
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
                    </div>
                    <FormField
                        control={form.control}
                        name="describe"
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Mô tả
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2 min-h-[120px]  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                            placeholder="Nhập mô tả"
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
                        name="feature"
                        render={({ field, fieldState }: any) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Tính năng
                                    </FormLabel>
                                    <FormControl>
                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3">
                                            {isState.loadFeature ?
                                                <>
                                                    {
                                                        [...Array(5)].map((_, index) => {
                                                            return <Skeleton key={index} className='h-[90px] w-full' />
                                                        })
                                                    }
                                                </>
                                                : isState.dataFeature.map((item) => {
                                                    return (
                                                        <Label
                                                            htmlFor={item.id as string}
                                                            key={item.id}
                                                            className={`flex ${field.value.includes(item.id) ? 'border-[#2FB9BD] text-[#2FB9BD]' : ''}
                                                             items-center justify-center gap-2 border-2  py-8 col-span-1 rounded-lg cursor-pointer md:text-sm text-xs`}
                                                        >
                                                            <div className="size-6">
                                                                <Image src={item.image} alt="" width={1280} height={1024} className="object-cover size-full" />
                                                            </div>
                                                            <Checkbox
                                                                checked={field.value.includes(item.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item.id])
                                                                        : field.onChange(field.value?.filter((value: any) => value !== item.id))
                                                                }}
                                                                hidden
                                                                id={item.id as string}
                                                            />
                                                            {item.name}
                                                        </Label>
                                                    )
                                                })}
                                        </div>
                                    </FormControl>

                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            );
                        }}
                    />
                </div>
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    <ButtonSaveForm title="Lưu thông tin" onClick={form.handleSubmit((values) => onSubmit(values))} />
                </div>
            </Form>
        </BackgroundUiVehicle>
    )
}