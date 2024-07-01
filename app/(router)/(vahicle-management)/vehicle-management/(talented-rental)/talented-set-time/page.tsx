"use client"
import ButtonLoading from "@/components/button/ButtonLoading";
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import SelectCombobox from "@/components/combobox/SelectCombobox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { OBJSlect } from "@/types/VehicleManagement/ICommon";
import { ITalentedSetTime } from "@/types/VehicleManagement/TalentedRental/ISetTime";
import { ChevronsUpDown } from "lucide-react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";

type Props = {}


export default function TalentedSetTime(props: Props) {
    const initialState: ITalentedSetTime = {
        bookCarQuickly: {
            // giới hạn từ
            wordLimit: [
                {
                    value: 6,
                    label: '6 tiếng tới'
                }
            ],
            // cho đến
            until: [
                {
                    value: 7 * 24,
                    label: '1 tuần tới'
                },
                {
                    value: 14 * 24,
                    label: '2 tuần tới'
                },
                {
                    value: 21 * 24,
                    label: '3 tuần tới'
                },
                {
                    value: 28 * 24,
                    label: '4 tuần tới'
                },
            ],
        },
    }

    const form = useForm({
        defaultValues: {
            bookCarQuickly: {
                open: false,
                wordLimit: '',
                until: ''
            },
        }
    })

    const { apiUpdateCar } = apiVehicleCommon()


    const [isState, setIsState] = useState(initialState)

    const checkValueArray = (array: OBJSlect[], field: ControllerRenderProps<any, any>) => {
        return array.find((x: OBJSlect) => x.value === field.value)?.label
    }

    const queryState = (key: ITalentedSetTime) => setIsState((prev: ITalentedSetTime) => ({ ...prev, ...key }))

    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const { dataDetail: { data }, idCar } = useVehicleManage()


    const findValue = form.getValues()


    useEffect(() => {
        if (!Array.isArray(data) && data) {
            form.setValue("bookCarQuickly.open", data?.car_talent?.book_car_flash == 1)
            form.setValue("bookCarQuickly.wordLimit", data?.car_talent?.from_book_car_flash)
            form.setValue("bookCarQuickly.until", data?.car_talent?.to_book_car_flash)
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
        formData.append('book_car_flash_talent', `${value.bookCarQuickly.open ? 1 : 0}`)
        formData.append('from_book_car_flash_talent', value.bookCarQuickly.wordLimit)
        formData.append('to_book_car_flash_talent', value.bookCarQuickly.until)
        const { data: db } = await apiUpdateCar(formData)
        queryKeyIsStateLoadSuccess({
            loading: {
                ...isStateLoadSuccess.loading,
                isLoadingButton: false
            }
        })
        if (db.result) {
            toastCore.success('Lưu thông tin thành công')
            return
        }
        toastCore.error(db.message)
    }

    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Thiết lập thời gian cho thuê</h1>
            </div>
            <Form  {...form}>
                <FormField
                    control={form.control}
                    name="bookCarQuickly.open"
                    render={({ field }) => {
                        return (
                            <>
                                <FormItem className="">
                                    <FormControl>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-4">
                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                    Đặt xe nhanh
                                                </FormLabel>
                                                <Switch
                                                    className="data-[state=checked]:bg-[#2FB9BD] "
                                                    checked={field.value}
                                                    onCheckedChange={(e) => {
                                                        field.onChange(e)
                                                        form.setValue('bookCarQuickly.wordLimit', '')
                                                        form.setValue('bookCarQuickly.until', '')
                                                    }}
                                                />
                                            </div>
                                            <h1 className="text-xs text-gray-400">Tự động đồng ý đối với tất cả yêu cầu thuê xe trong khoảng thời gian cài đặt</h1>

                                        </div>
                                    </FormControl>
                                </FormItem>
                                {field.value &&
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="bookCarQuickly.wordLimit"
                                            rules={{
                                                required: {
                                                    value: !!field.value,
                                                    message: 'Vui lòng chọn mốc thời gian'
                                                },
                                            }}
                                            render={({ field, fieldState }) => {
                                                const checkValue = checkValueArray(isState.bookCarQuickly.wordLimit, field)
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                            Giới hạn từ
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Popover
                                                            >
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                    >
                                                                        {checkValue ? checkValue : " Giới hạn từ"}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                                    <SelectCombobox
                                                                        data={isState.bookCarQuickly.wordLimit}
                                                                        field={field}
                                                                        onChange={(e: any) => {
                                                                            field.onChange(e)
                                                                        }}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
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
                                            name="bookCarQuickly.until"
                                            rules={{
                                                required: {
                                                    value: !!field.value,
                                                    message: 'Vui lòng chọn mốc thời gian'
                                                }
                                            }}
                                            render={({ field, fieldState }) => {
                                                const checkValue = checkValueArray(isState.bookCarQuickly.until, field)
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                            Cho đến
                                                        </FormLabel>
                                                        <FormControl>
                                                            <>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            className="2xl:py-3  w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                        >
                                                                            {checkValue ? checkValue : "Cho đến"}
                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                        </Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                                        <SelectCombobox
                                                                            data={isState.bookCarQuickly.until}
                                                                            field={field}
                                                                            onChange={(e: any) => {
                                                                                field.onChange(e)
                                                                            }}

                                                                        />
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </>
                                                        </FormControl>
                                                        {fieldState?.invalid && fieldState?.error && (
                                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                        )}
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </div>
                                }
                            </>

                        );
                    }}
                />
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    <ButtonLoading
                        title="Lưu thông tin"
                        type="button"
                        onClick={form.handleSubmit((values) => onSubmit(values))}
                        className="flex items-center gap-2 md:w-fit w-full text-white border-[#2FB9BD] rounded-xl border-2 h-14 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                        disabled={isStateLoadSuccess.loading.isLoadingButton}
                        isStateloading={isStateLoadSuccess.loading.isLoadingButton}
                    />
                </div>
            </Form>
        </BackgroundUiVehicle>
    )
}