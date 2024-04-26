"use client"
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, useFormField, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import { uuidv4 } from "@/lib/uuid";
import apiVehicleSurcharge from "@/services/vehicle-management/surcharge.services";
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { toastCore } from "@/lib/toast";
type Props = {}

type ArraySurcharge = {
    open: boolean;
    value: number;
    name: string;
    note: string,
    max: number,
    min: number
}[];
interface ISTate {
    limitedKilometers: {
        maximumKilometers: number;
        overLimitFee: number;
    };
    arraySurcharge: ArraySurcharge
}
// type ValidNameType = "limitedKilometers" | "arraySurcharge" | "limitedKilometers.open" | "limitedKilometers.maximumKilometers" | "limitedKilometers.overLimitFee" | `arraySurcharge.${number}` | `arraySurcharge.${number}.open` | `arraySurcharge.${number}.value`;

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
            // arraySurcharge: [
            //     {
            //         value: 0,
            //         open: true,
            //         check_fee: 0,
            //         created_at: '',
            //         max: 0,
            //         min: 0,
            //         name: "",
            //         note: "",
            //         type: 0,
            //         updated_at: ""
            //     }
            // ]
        }
    })
    const initialState: ISTate = {
        // gioi han so km
        limitedKilometers: {
            maximumKilometers: 0,
            overLimitFee: 0
        },
        arraySurcharge: [
        ]
    }

    const { apiListSurchargeCar } = apiVehicleSurcharge()

    const [isState, setIsState] = useState(initialState)


    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))


    const { dataDetail: { data }, idCar } = useVehicleManage()


    const findValue = form.getValues()


    // dnah sách phụ phí
    const fetchListSurcharge = async () => {
        const { data } = await apiListSurchargeCar({ type: 1 })
        queryState({
            arraySurcharge: data.data
        })
        form.setValue('arraySurcharge', data.data.map((x: any) => ({ ...x, open: true, value: 0 })))
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
                }
            })
            return
        }
        form.reset()
    }, [data])

    const onSubmit = async (value: any) => {
        console.log(value.arraySurcharge.map((x: any) => x.value).flat())
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
                                                Giới hạn số km
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
                                                                Số km tối đa trong 1 ngày
                                                            </FormLabel>
                                                            <FormControl>
                                                                <>
                                                                    <CustomSlider
                                                                        defaultValue={[400]} max={isState.limitedKilometers.maximumKilometers} step={1}
                                                                        onValueChange={field.onChange}
                                                                    />
                                                                </>
                                                            </FormControl>
                                                            <div className="flex justify-between">
                                                                <FormDescription>
                                                                    Số km đề xuất: {400}km
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
                                                name="limitedKilometers.overLimitFee"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                Vượt phí giới hạn (tính mỗi km)
                                                            </FormLabel>
                                                            <FormControl>
                                                                <>
                                                                    <CustomSlider
                                                                        defaultValue={[3]} max={isState.limitedKilometers.overLimitFee} step={1}
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
                    {isState.arraySurcharge.map((item, index: any) => {
                        return (
                            <div key={index}>
                                <Controller
                                    name={`arraySurcharge.${index}.open`}
                                    // name={`arraySurcharge[${index}].open` as ValidNameType}
                                    control={form.control}
                                    rules={{ required: false }}
                                    render={({ field, fieldState }: any) => {
                                        return (
                                            <FormItem className="">
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
                                                            // name={`arraySurcharge[${index}].value` as ValidNameType}
                                                            render={({ field }: any) => {
                                                                return (
                                                                    <FormItem>
                                                                        <FormLabel className="text-xs text-gray-400">
                                                                            {item.note}
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <>
                                                                                <CustomSlider
                                                                                    defaultValue={[400]} max={item.max} min={item.min} step={1}
                                                                                    onValueChange={field.onChange}
                                                                                />
                                                                            </>
                                                                        </FormControl>
                                                                        <div className="flex justify-between">
                                                                            <FormDescription>
                                                                                Phí đề xuất: {400}K
                                                                            </FormDescription>
                                                                            <FormDescription className='font-bold'>
                                                                                {field.value ? FormatNumberToThousands(field.value) : '0K'}
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
                    })
                    }
                </div>
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    <ButtonSaveForm title="Lưu thông tin" onClick={form.handleSubmit((values) => onSubmit(values))} />
                </div>
            </Form>
        </BackgroundUiVehicle>
    )
}