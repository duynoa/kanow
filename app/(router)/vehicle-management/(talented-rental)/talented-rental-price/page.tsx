"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import { CustomSlider } from "@/components/ui/customSlider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { toastCore } from "@/lib/toast";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
type Props = {}

export default function TalentedRentalPrice(props: Props) {
    const param: ReadonlyURLSearchParams = useSearchParams()

    const id: string | null = param.get("id") || ''

    const form = useForm({
        defaultValues: {
            // giá cơ bản
            basicPrice: "1200",

            // phí vượt km
            overageFee: "7",
            // phí vượt giờ
            overtimeFee: '60'
        }
    })


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
                <Label className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                    Đơn giá thuê mặc định
                </Label>
                <FormDescription>
                    <h1 className="text-xs text-gray-400">Đơn giá áp dụng cho tất cả các ngày.
                        Bạn có thể tùy chỉnh giá khác cho các ngày đặc biệt (cuối tuần, lễ, tết,...) trong mục quản lý xe sau khi đăng ký</h1>
                </FormDescription>
                <FormField
                    control={form.control}
                    name="basicPrice"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                    Giá cơ bản (Lộ trình 8 tiếng/100km)
                                </FormLabel>
                                <FormControl>
                                    <>
                                        <CustomSlider
                                            defaultValue={[1200]} max={10000000} step={1}
                                            onValueChange={field.onChange}
                                        />
                                    </>
                                </FormControl>
                                <div className="flex justify-between">
                                    <FormDescription>
                                        Giá đề xuất: {1200}K
                                    </FormDescription>
                                    <FormDescription className='font-bold'>
                                        {field.value}K
                                    </FormDescription>
                                </div>
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="overageFee"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                    Phí phụ thu vượt Km
                                </FormLabel>
                                <FormControl>
                                    <>
                                        <CustomSlider
                                            defaultValue={[7]} max={100} step={1}
                                            onValueChange={field.onChange}
                                        />
                                    </>
                                </FormControl>
                                <div className="flex justify-between">
                                    <FormDescription>
                                        Giá đề xuất: {7}K
                                    </FormDescription>
                                    <FormDescription className='font-bold'>
                                        {field.value}K
                                    </FormDescription>
                                </div>
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="overtimeFee"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                    Phí phụ thu vượt giờ
                                </FormLabel>
                                <FormControl>
                                    <>
                                        <CustomSlider
                                            defaultValue={[60]} max={120} step={1}
                                            onValueChange={field.onChange}
                                        />
                                    </>
                                </FormControl>
                                <div className="flex justify-between">
                                    <FormDescription>
                                        Giá đề xuất: {60}K

                                    </FormDescription>
                                    <FormDescription className='font-bold'>
                                        {+field.value > 100 ? FormatNumberToThousands(+field.value) : `${field.value}K`}
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