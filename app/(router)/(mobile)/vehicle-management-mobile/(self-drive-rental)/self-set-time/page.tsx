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
import { StateSeltSetTime } from "@/types/VehicleManagement/SelfDriveRental/ISetTime";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {}


export default function SelftSetTime(props: Props) {

    const generateTimeSlots = () => {
        let timeSlots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) { // Tăng thêm 15 phút
                let formattedHour = hour.toString().padStart(2, '0'); // Định dạng giờ
                let formattedMinute = minute.toString().padStart(2, '0'); // Định dạng phút
                timeSlots.push({
                    value: `${formattedHour}:${formattedMinute}`,
                    label: `${formattedHour}:${formattedMinute}`
                });
            }
        }
        return timeSlots
    };

    const initialState: StateSeltSetTime = {

        // Đặt xe nhanh
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
        // giao  xe
        deliver: generateTimeSlots(),
        receive: generateTimeSlots()

    }

    const { apiUpdateCar } = apiVehicleCommon()


    const checkValueArray = (array: any[], field: any) => {
        return array.find((x: any) => x.value === field.value)?.label
    }

    const [isState, setIsState] = useState(initialState)

    const queryState = (key: StateSeltSetTime) => setIsState((prev: StateSeltSetTime) => ({ ...prev, ...key }))

    const form = useForm({
        defaultValues: {
            bookCarQuickly: {
                open: false,
                wordLimit: 0,
                until: 0
            },
            //tắt mở thời gian giao nhận xe
            openDeliver: false,
            openReceive: false,
            // giao  xe
            deliver: {
                from: '00:00',
                to: '00:00'
            },
            // nhận xe
            receive: {
                from: '00:00',
                to: '00:00'
            }
        }
    })

    const { dataDetail: { data }, idCar, dataOther } = useVehicleManage()
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const findValue = form.getValues()

    useEffect(() => {
        if (!Array.isArray(data) && data) {
            const arr = [
                ['bookCarQuickly.open', data?.car?.book_car_flash == 1],
                ['bookCarQuickly.wordLimit', data?.car?.from_book_car_flash],
                ['bookCarQuickly.until', data?.car?.to_book_car_flash],
                ["deliver.from", data?.hour_receive_car[0]?.hour_start],
                ["deliver.to", data?.hour_receive_car[0]?.hour_end],
                ["receive.from", data?.hour_back_car[0]?.hour_start],
                ["receive.to", data?.hour_back_car[0]?.hour_end],
                ["openDeliver", data?.type_hour == 1],
                ["openReceive", data?.type_hour_new == 1],
            ]
            arr.forEach(([key, value]) => {
                form.setValue(key, value)
            })
            return
        }
        form.reset()
    }, [data])

    const onSubmit = async (value: any) => {
        try {
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isLoadingButton: true
                }
            })

            let formData = new FormData()
            formData.append('car_id', idCar)
            formData.append('book_car_flash', `${value.bookCarQuickly.open ? 1 : 0}`)
            formData.append('from_book_car_flash', value.bookCarQuickly.wordLimit)
            formData.append('to_book_car_flash', value.bookCarQuickly.until)
            formData.append('type_hour', `${value.openDeliver ? 1 : 0}`)
            formData.append('type_hour_new', `${value.openReceive ? 1 : 0}`)
            if (value.openDeliver) {
                // giao xe
                formData.append('hour_start', value.deliver.from)
                formData.append('hour_end', value.deliver.to)
            }
            if (value.openReceive) {
                // nhan xe
                formData.append('hour_start_new', value.receive.from)
                formData.append('hour_end_new', value.receive.to)
            }

            const { data: db } = await apiUpdateCar(formData)
            if (db?.result) {
                toastCore.success('Lưu thông tin thành công')
                return
            }
            toastCore.error(db?.message)

        } catch (err) {
            throw err
        } finally {
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isLoadingButton: true
                }
            })
        }

    }

    const revertTime = (e: string, type: string) => {
        const [hour, minute] = e.split(':').map(Number);
        if (hour === undefined || minute === undefined) {
            throw new Error('Invalid time format');
        }
        let time: string = '';
        const timeDiff = type === 'add' ? 4 : -4;

        if (minute === 30) {
            if (hour + timeDiff >= 0) {
                time = '0' + String((hour + timeDiff) % 24) + ':00';
                return time;
            } else {
                time = String(24 + (hour + timeDiff)) + ':00';
            }
        } else {
            if (hour + timeDiff >= 0) {
                time = '0' + String((hour + timeDiff) % 24) + ':' + String(minute + 30);
            } else {
                time = String(24 + (hour + timeDiff)) + ':' + String(minute + 30);
            }
        }
        return time;
    }

    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className='text-[#3E424E] text-xl uppercase font-bold'>Thiết lập thời gian cho thuê</h1>
            </div>
            <Form  {...form}>
                {/* <FormField
                    control={form.control}
                    name="bookCarQuickly.open"
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="">
                                <FormControl>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-4">
                                            <FormLabel className="text-base font-semibold text-[#16171B]">
                                                Đặt xe nhanh
                                            </FormLabel>
                                            <Switch
                                                className="data-[state=checked]:bg-[#2FB9BD] "
                                                checked={field.value}
                                                onCheckedChange={(e) => {
                                                    field.onChange(e)
                                                    form.setValue('bookCarQuickly.wordLimit', 0)
                                                    form.setValue('bookCarQuickly.until', 0)
                                                }}
                                            />
                                        </div>
                                        <h1 className="text-sm text-gray-400">Tự động đồng ý đối với tất cả yêu cầu thuê xe trong khoảng thời gian cài đặt</h1>

                                    </div>
                                </FormControl>
                                {
                                    field.value &&
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="bookCarQuickly.wordLimit"
                                            render={({ field }) => {
                                                const checkValue = checkValueArray(isState.bookCarQuickly.wordLimit, field)
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="text-base font-semibold text-[#16171B]">
                                                            Giới hạn từ
                                                        </FormLabel>
                                                        <FormControl>
                                                            <>
                                                                <Popover
                                                                >
                                                                    <PopoverTrigger asChild>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 text-base  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
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
                                                            </>
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
                                            render={({ field }) => {
                                                const checkValue = checkValueArray(isState.bookCarQuickly.until, field)
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="text-base font-semibold text-[#16171B]">
                                                            Cho đến
                                                        </FormLabel>
                                                        <FormControl>
                                                            <>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            className="2xl:py-3  w-full lg:py-2 md:py-2 py-2 px-3 text-base  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
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
                                {
                                    fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )
                                }
                            </FormItem>
                        );
                    }}
                />
                <h1 className="text-base font-semibold text-[#16171B]">
                    Thời gian giao xe
                </h1>
                <div className="grid grid-cols-2 items-center gap-4">
                    <FormField
                        control={form.control}
                        name="deliver.from"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng chọn thời gian băt đầu giao xe',
                            },
                            validate: {
                                checkTime: (value: any, d: any) => {
                                    if (value === d.deliver.to) return false || 'Khoảng thời gian không được giống nhau'
                                }
                            }
                        }}
                        render={({ field, fieldState }) => {
                            const checkValue = checkValueArray(isState.deliver, field)
                            return (
                                <FormItem className="space-y-0 flex flex-col gap-2">
                                    <FormLabel className="text-base font-semibold text-[#16171B]">
                                        <span>Giao xe từ</span><span className="text-red-500  px-1">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 text-base  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                    >
                                                        {checkValue ? checkValue : "00:00"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                    <SelectCombobox
                                                        data={isState.deliver}
                                                        field={field}
                                                        onChange={(e: any) => {
                                                            field.onChange(e)
                                                            const toTime: any = revertTime(e, 'add')
                                                            console.log(toTime);

                                                            form.setValue('deliver.to', toTime);
                                                        }}
                                                    />

                                                </PopoverContent>
                                            </Popover>
                                        </>
                                    </FormControl>
                                    {
                                        fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )
                                    }
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="deliver.to"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng chọn mốc thời gian đến',
                            },
                            validate: {
                                checkTime: (value: any, d: any) => {
                                    if (value === d.deliver.from) return false || 'Khoảng thời gian không được giống nhau'
                                }
                            }
                        }}
                        render={({ field, fieldState }) => {
                            const checkValue = checkValueArray(isState.receive, field)
                            return (
                                <FormItem className="space-y-0 flex flex-col gap-2">
                                    <FormLabel className="text-base font-semibold text-[#16171B]">
                                        Cho đến<span className="text-red-500 px-1">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 text-base  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                    >
                                                        {checkValue ? checkValue : "00:00"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                    <SelectCombobox
                                                        data={isState.receive}
                                                        field={field}
                                                        onChange={(e: any) => {
                                                            field.onChange(e)
                                                            const toTime: any = revertTime(e, 'minus')
                                                            form.setValue('deliver.from', toTime);
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
                <h1 className="text-base font-semibold text-[#16171B]">
                    Thời gian nhận xe
                </h1>
                <div className="grid grid-cols-2 items-center gap-4">
                    <FormField
                        control={form.control}
                        name="receive.from"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng chọn thời gian băt đầu nhận xe',
                            },
                            validate: {
                                checkTime: (value: any, d: any) => {
                                    if (value === d.receive.to) return false || 'Khoảng thời gian không được giống nhau'
                                }
                            }
                        }}
                        render={({ field, fieldState }) => {
                            const checkValue = checkValueArray(isState.receive, field)
                            return (
                                <FormItem className="space-y-0 flex flex-col gap-2">
                                    <FormLabel className="text-base font-semibold text-[#16171B]">
                                        Nhận xe từ<span className="text-red-500  px-1">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 text-base  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                    >
                                                        {checkValue ? checkValue : "00:00"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                    <SelectCombobox
                                                        data={isState.receive}
                                                        field={field}
                                                        onChange={(e: any) => {
                                                            field.onChange(e)
                                                            const toTime: any = revertTime(e, 'add')
                                                            form.setValue('receive.to', toTime);
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
                    <FormField
                        control={form.control}
                        name="receive.to"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng chọn mốc thời gian đến',
                            },
                            validate: {
                                checkTime: (value: any, d: any) => {
                                    if (value === d.receive.from) return false || 'Khoảng thời gian không được giống nhau'
                                }
                            }
                        }}
                        render={({ field, fieldState }) => {
                            const checkValue = checkValueArray(isState.receive, field)
                            return (
                                <FormItem className="space-y-0 flex flex-col gap-2">
                                    <FormLabel className="text-base font-semibold text-[#16171B]">
                                        Cho đến<span className="text-red-500 px-1">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 text-base  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                    >
                                                        {checkValue ? checkValue : "00:00"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                    <SelectCombobox
                                                        data={isState.receive}
                                                        field={field}
                                                        onChange={(e: any) => {
                                                            field.onChange(e)
                                                            const toTime: any = revertTime(e, 'minus')
                                                            form.setValue('receive.from', toTime);
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
                <h1>newss </h1> */}
                <FormField
                    control={form.control}
                    name="bookCarQuickly.open"
                    render={({ field, fieldState }) => {
                        return (
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
                                                    form.setValue('bookCarQuickly.wordLimit', 0)
                                                    form.setValue('bookCarQuickly.until', 0)

                                                }}
                                            />
                                        </div>
                                        <h1 className="text-xs text-gray-400">Tự động đồng ý đối với tất cả yêu cầu thuê xe trong khoảng thời gian cài đặt</h1>

                                    </div>
                                </FormControl>
                                {field.value &&
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="bookCarQuickly.wordLimit"
                                            render={({ field }) => {
                                                const checkValue = checkValueArray(isState.bookCarQuickly.wordLimit, field)
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                            Giới hạn từ
                                                        </FormLabel>
                                                        <FormControl>
                                                            <>
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
                                                            </>
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
                                            render={({ field }) => {
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
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="openDeliver"
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="">
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Thời gian giao xe
                                        </FormLabel>
                                        <Switch
                                            className="data-[state=checked]:bg-[#2FB9BD] "
                                            checked={field.value}
                                            onCheckedChange={(e) => {
                                                field.onChange(e)
                                                form.setValue('deliver.from', '00:00')
                                                form.setValue('deliver.to', '00:00')
                                            }}
                                        />
                                    </div>
                                </FormControl>
                                {field.value &&
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="col-span-2">
                                            <div className="grid grid-cols-2 items-center gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="deliver.from"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng chọn thời gian băt đầu giao xe',
                                                        },
                                                        validate: {
                                                            checkTime: (value: any, d: any) => {
                                                                if (value === d.deliver.to) return false || 'Khoảng thời gian không được giống nhau'
                                                            }
                                                        }
                                                    }}
                                                    render={({ field, fieldState }) => {
                                                        const checkValue = checkValueArray(isState.deliver, field)
                                                        return (
                                                            <FormItem className="space-y-0 flex flex-col gap-2">
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Giao xe từ<span className="text-red-500  px-1">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {checkValue ? checkValue : "00:00"}
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={isState.deliver}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        field.onChange(e)
                                                                                        const toTime: any = revertTime(e, 'add')
                                                                                        console.log(toTime);

                                                                                        form.setValue('deliver.to', toTime);
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
                                                <FormField
                                                    control={form.control}
                                                    name="deliver.to"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng chọn mốc thời gian đến',
                                                        },
                                                        validate: {
                                                            checkTime: (value: any, d: any) => {
                                                                if (value === d.deliver.from) return false || 'Khoảng thời gian không được giống nhau'
                                                            }
                                                        }
                                                    }}
                                                    render={({ field, fieldState }) => {
                                                        const checkValue = checkValueArray(isState.receive, field)
                                                        return (
                                                            <FormItem className="space-y-0 flex flex-col gap-2">
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Cho đến<span className="text-red-500 px-1">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {checkValue ? checkValue : "00:00"}
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={isState.receive}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        field.onChange(e)
                                                                                        const toTime: any = revertTime(e, 'minus')
                                                                                        form.setValue('deliver.from', toTime);
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
                                        </div>
                                    </div>
                                }
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name="openReceive"
                    render={({ field, fieldState }) => {
                        return (
                            <FormItem className="">
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Thời gian nhận xe
                                        </FormLabel>
                                        <Switch
                                            className="data-[state=checked]:bg-[#2FB9BD] "
                                            checked={field.value}
                                            onCheckedChange={(e) => {
                                                field.onChange(e)
                                                form.setValue('receive.from', '00:00')
                                                form.setValue('receive.to', '00:00')
                                            }}
                                        />
                                    </div>
                                </FormControl>
                                {field.value &&
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="col-span-2">
                                            <div className="grid grid-cols-2 items-center gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="receive.from"
                                                    rules={{
                                                        required: {
                                                            value: field.value,
                                                            message: 'Vui lòng chọn thời gian băt đầu nhận xe',
                                                        },
                                                        validate: {
                                                            checkTime: (value: any, d: any) => {
                                                                if (value === d.receive.to) return false || 'Khoảng thời gian không được giống nhau'
                                                            }
                                                        }
                                                    }}
                                                    render={({ field, fieldState }) => {
                                                        const checkValue = checkValueArray(isState.receive, field)
                                                        return (
                                                            <FormItem className="space-y-0 flex flex-col gap-2">
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Nhận xe từ<span className="text-red-500  px-1">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {checkValue ? checkValue : "00:00"}
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={isState.receive}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        field.onChange(e)
                                                                                        const toTime: any = revertTime(e, 'add')
                                                                                        form.setValue('receive.to', toTime);
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
                                                <FormField
                                                    control={form.control}
                                                    name="receive.to"
                                                    rules={{
                                                        required: {
                                                            value: field.value,
                                                            message: 'Vui lòng chọn mốc thời gian đến',
                                                        },
                                                        validate: {
                                                            checkTime: (value: any, d: any) => {
                                                                if (value === d.receive.from) return false || 'Khoảng thời gian không được giống nhau'
                                                            }
                                                        }
                                                    }}
                                                    render={({ field, fieldState }) => {
                                                        const checkValue = checkValueArray(isState.receive, field)
                                                        return (
                                                            <FormItem className="space-y-0 flex flex-col gap-2">
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Cho đến<span className="text-red-500 px-1">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {checkValue ? checkValue : "00:00"}
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={isState.receive}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        field.onChange(e)
                                                                                        const toTime: any = revertTime(e, 'minus')
                                                                                        form.setValue('receive.from', toTime);
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
                                        </div>
                                    </div>
                                }
                                {fieldState?.invalid && fieldState?.error && (
                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                )}
                            </FormItem>
                        );
                    }}
                />
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    {/* <ButtonSaveForm title="Lưu thông tin" onClick={form.handleSubmit((values) => onSubmit(values))} /> */}

                    <ButtonLoading
                        title="Lưu thông tin"
                        type="button"
                        onClick={form.handleSubmit((values) => onSubmit(values))}
                        className="flex items-center gap-2 md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                                border-2 h-14 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                        disabled={isStateLoadSuccess.loading.isLoadingButton}
                        isStateloading={isStateLoadSuccess.loading.isLoadingButton}
                    />
                </div>
            </Form>
        </BackgroundUiVehicle>
    )
}