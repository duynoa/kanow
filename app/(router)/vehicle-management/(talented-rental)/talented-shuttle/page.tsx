"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";

type Props = {}


export default function TalentedShuttle(props: Props) {
    const param: ReadonlyURLSearchParams = useSearchParams()

    const id: string | null = param.get("id") || ''

    const initialState: any = {
        // đưa đón tận nơi trong vòng
        within: "100",
        // phí đưa đón
        shuttleFee: "100",
        // miễn phí đưa đón
        freeShuttle: "100"
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


    const { dataDetail: { data }, idCar } = useVehicleManage()


    const findValue = form.getValues()


    useEffect(() => {
        if (data) {
            console.log(data, idCar);
            [
                ["shuttle.within", 20],
                ["shuttle.shuttleFee", 20],
                ["shuttle.freeShuttle", 20],
            ].map(([name, value]: any) => form.setValue(name, value))
            return
        }
        form.reset()
    }, [data])


    const onSubmit = async (value: any) => {
        // const convertArray = Object.entries(value.shuttle).map(([key, value]) => ({ key, value }))

        // let formData = new FormData();

        // convertArray.map(({ key, value }, index) => {
        //     formData.append(key, value as string)
        // })

        toastCore.error('Chức năng đang phát triển')
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