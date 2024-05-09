"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { IShuttle } from "@/types/VehicleManagement/TalentedRental/IShuttle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {}



export default function TalentedShuttle(props: Props) {

    const initialState: IShuttle = {
        // đưa đón tận nơi trong vòng
        within: {
            max: 500,
            min: 0,
            propose: 0,

        },
        // phí đưa đón
        shuttleFee: {
            max: 5000000,
            min: 0,
            propose: 0,
        },
        // miễn phí đưa đón
        freeShuttle: {
            max: 500,
            min: 0,
            propose: 0,
        }
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

    const [isMount, setIsMount] = useState(false)

    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    const { dataDetail: { data }, idCar, dataOther } = useVehicleManage()

    const { apiUpdateCar } = apiVehicleCommon()

    useEffect(() => {
        setIsMount(true)
    }, [])


    useEffect(() => {
        if (data) {

            form.setValue('shuttle.within', data?.car_talent?.km_delivery_car ?? 0)
            form.setValue('shuttle.shuttleFee', data?.car_talent?.fee_km_delivery_car ?? 0)
            form.setValue('shuttle.freeShuttle', data?.car_talent?.free_km_delivery_car ?? 0)

            queryState({
                within: {
                    ...isState.within,
                    propose: +dataOther.other_talent?.km_delivery_car,
                },
                shuttleFee: {
                    ...isState.shuttleFee,
                    propose: +dataOther.other_talent?.fee_km_delivery_car,
                },
                freeShuttle: {
                    ...isState.freeShuttle,
                    propose: +dataOther.other_talent?.free_km_delivery_car,
                },
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

    if (!isMount) return null
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
                                            value={[+field.value]}
                                            defaultValue={[+field.value]}
                                            min={isState.within.min}
                                            max={isState.within.max}
                                            step={1}
                                            onValueChange={field.onChange}
                                        />
                                    </>
                                </FormControl>
                                <div className={`flex ${isState.within.propose > 0 ? "justify-between" : "justify-end"}`}>
                                    {isState.within.propose > 0 &&
                                        <FormDescription>
                                            Quãng đường đề xuất: {isState.within.propose}Km
                                        </FormDescription>
                                    }
                                    <FormDescription className='font-bold'>
                                        {field.value}Km
                                    </FormDescription>
                                </div>
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
                                            value={[+field.value]}
                                            defaultValue={[+field.value]}
                                            min={isState.shuttleFee.min}
                                            max={isState.shuttleFee.max}
                                            step={1}
                                            onValueChange={field.onChange}
                                        />
                                    </>
                                </FormControl>
                                <div className={`flex ${isState.shuttleFee.propose > 0 ? "justify-between" : "justify-end"}`}>
                                    {isState.shuttleFee.propose > 0 &&
                                        <FormDescription>
                                            Phí đề xuất: {FormatNumberToThousands(isState.shuttleFee.propose)}
                                        </FormDescription>
                                    }
                                    <FormDescription className='font-bold'>
                                        {FormatNumberToThousands(+field.value)}
                                    </FormDescription>
                                </div>
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
                                            value={[+field.value]}
                                            defaultValue={[+field.value]}
                                            min={isState.freeShuttle.min}
                                            max={isState.freeShuttle.max}
                                            step={1}
                                            onValueChange={field.onChange}
                                        />
                                    </>
                                </FormControl>
                                <div className={`flex ${isState.freeShuttle.propose > 0 ? "justify-between" : "justify-end"}`}>
                                    {
                                        isState.freeShuttle.propose > 0 &&
                                        <FormDescription>
                                            Quãng đường đề xuất: {isState.freeShuttle.propose}Km
                                        </FormDescription>
                                    }
                                    <FormDescription className='font-bold'>
                                        {field.value}Km
                                    </FormDescription>
                                </div>
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