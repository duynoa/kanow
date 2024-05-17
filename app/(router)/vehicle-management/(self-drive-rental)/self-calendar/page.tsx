"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import SelectCombobox from "@/components/combobox/SelectCombobox";
import { FormatNumberToThousands } from "@/components/format/FormatNumber";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useDataPolicy } from "@/hooks/useDataQueryKey";
import { useDialogSubmit } from "@/hooks/useOpenDialog";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import { getListCalendarPriceMonth } from "@/services/cars/calendar.services";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { StateSeltSetTime } from "@/types/VehicleManagement/SelfDriveRental/ISetTime";
import { isSameDay } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowDown } from "react-icons/md";

type Props = {}

export default function SeflCalendar(props: Props) {
    const { isStatePolicy } = useDataPolicy()
    const [optionRadio, setOptionRadio] = useState<string>("customPrice")
    const [dataCalendar, setDataCalendar] = useState<any[]>([])

    const {
        openDialogSubmit,
        typeDialogSubmit,
        setOpenDialogSubmit,
        setTypeDialogSubmit,
        setTypeCar,
        setDataItem
    } = useDialogSubmit()

    const pathname = usePathname()

    const param: ReadonlyURLSearchParams = useSearchParams()

    const id: string | null = param.get("key") || ''

    const type: string | null = param.get("t") || ''

    // fetch data calendar detail
    const fetchDataListCalendarPriceMonth = async () => {
        try {
            let dataCar = {
                type: (type === "1" || type === "2") ? parseInt(type) : null,
                car_id: id
            }

            const { data } = await getListCalendarPriceMonth(dataCar)

            console.log('data', data);

            if (data && data.data) {
                setDataCalendar(data.data)
            }
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        if (id && type) {
            fetchDataListCalendarPriceMonth()
        }
    }, [pathname, id, type])

    console.log('data calendar :', dataCalendar);


    const form = useForm({
        defaultValues: {
            month: {
                startMonth: undefined,
                endMonth: undefined
            },
        }
    })

    const checkValueArray = (array: any[], field: any) => {
        return array.find((x: any) => x.value === field.value)?.label
    }

    const onSubmit = async (value: any) => {
        console.log('value:', value);
    }

    const handleChangeRadio = (value: any) => {
        setOptionRadio(value)
    }

    const handleSelectDate = (event: React.MouseEvent<HTMLDivElement>, item: any) => {
        if (optionRadio === "customPrice") {
            setOpenDialogSubmit(true)
            setTypeDialogSubmit("price_single")
            setTypeCar(type)
            setDataItem(item)
        } else {

        }
    };

    return (
        <BackgroundUiVehicle className={"min-h-[90vh]"}>
            <div className='flex flex-col gap-4 pb-8 border-b'>
                <div className='3xl:text-2xl text-xl font-semibold'>
                    Thiết lập tháng
                </div>

                <Form  {...form}>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <FormField
                            control={form.control}
                            name="month.startMonth"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="space-y-0 flex flex-col gap-2">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-normal text-[#16171B]">
                                            Bắt đầu từ {/* <span className="text-red-500  px-1">*</span> */}
                                        </FormLabel>
                                        <FormControl>
                                            <>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 w-full h-12 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            <span className='text-[#A7A7A7]'>Hiện tại</span>
                                                            <MdKeyboardArrowDown className="ml-2 text-xl shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
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
                            name="month.endMonth"
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

                                const checkValue = checkValueArray(isStatePolicy?.dataPolicy && isStatePolicy?.dataPolicy?.getListPriceMonth?.length > 0 ? isStatePolicy?.dataPolicy?.getListPriceMonth : [], field)

                                return (
                                    <FormItem className="space-y-0 flex flex-col gap-2">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-normal text-[#16171B]">
                                            Cho đến<span className="text-red-500 px-1">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={`${checkValue ? "justify-between" : "justify-end"} 2xl:py-3 w-full h-12 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent`}
                                                        >
                                                            {checkValue ? checkValue : ""}
                                                            <MdKeyboardArrowDown className="ml-2 text-xl shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="3xl:w-[600px] xxl:w-[560px] 2xl:w-[500px] xl:w-[400px] lg:w-[300px] md:w-[320px] w-auto">
                                                        <SelectCombobox
                                                            data={isStatePolicy?.dataPolicy?.getListPriceMonth}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                // const toTime: any = revertTime(e, 'minus')
                                                                // form.setValue('deliver.from', toTime);
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
                    <div className="flex items-center md:justify-end justify-between gap-2 mt-2">
                        <ButtonSaveForm title="Lưu Thay Đổi" onClick={form.handleSubmit((values) => onSubmit(values))} />
                    </div>
                </Form>
            </div>

            <div className='flex flex-col gap-4 pt-8'>
                <div className='3xl:text-2xl text-xl font-semibold'>
                    Lịch xe
                </div>

                <RadioGroup
                    defaultValue="customPrice"
                    value={optionRadio}
                    onValueChange={(value) => handleChangeRadio(value)}
                    className='flex items-center gap-6 w-full'
                    autoFocus={false}
                >
                    <div key={'option-1'} className='flex items-center space-x-3 group w-fit'>
                        <RadioGroupItem
                            value={`customPrice`}
                            id={`customPrice`}
                            className={`${optionRadio == "customPrice" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
                        />
                        <Label
                            htmlFor={`customPrice`}
                            className="flex items-center gap-4 cursor-pointer"
                        >
                            <div className='text-sm font-normal capitalize'>
                                Tuỳ chỉnh giá
                            </div>
                        </Label>
                    </div>
                    <div key={'option-2'} className='flex items-center space-x-3 group w-fit'>
                        <RadioGroupItem
                            value={`settingCalendarBusy`}
                            id={`settingCalendarBusy`}
                            className={`${optionRadio == "settingCalendarBusy" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
                        />
                        <Label
                            htmlFor={`settingCalendarBusy`}
                            className="flex items-center gap-4 cursor-pointer"
                        >
                            <div className='text-sm font-normal capitalize'>
                                Thiết lập lịch bận
                            </div>
                        </Label>
                    </div>

                </RadioGroup>

                {/* <div className='flex flex-col gap-2 px-6 py-2 bg-[#F7FBFF] rounded-lg'>
                    <div className='grid grid-cols-4'>
                        <div>

                        </div>
                    </div>
                </div> */}

                <div className='flex flex-col gap-6'>
                    {
                        dataCalendar && dataCalendar.map((item: any, index: any) => {
                            // setup tháng
                            const currentDate = new Date(); // Lấy ngày hiện tại
                            const currentYear = currentDate?.getFullYear(); // Lấy năm hiện tại
                            const monthData = dataCalendar?.filter(item => +item?.year === currentYear);

                            const month: any = item?.month;
                            const formattedMonth = parseInt(month, 10)?.toString() // tháng format bỏ số 0

                            const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
                            // Tìm ngày đầu tiên của tháng và ngày cuối của tháng
                            // Lưu ý: month phải trừ đi 1 vì months trong JavaScript bắt đầu từ 0 (tháng 1 là tháng 0)
                            const firstDayOfMonth = new Date(currentYear, month - 1, 1);
                            const lastDayOfMonth = new Date(currentYear, month, 1);

                            // Xác định ngày đầu tiên của tuần và ngày cuối cùng của tuần
                            const firstDayOfWeek = firstDayOfMonth?.getDay();
                            const lastDayOfWeek = lastDayOfMonth?.getDay();

                            // Xác định ngày bắt đầu và kết thúc của tuần trước và tuần sau
                            const startOfPreviousWeek = new Date(firstDayOfMonth);
                            startOfPreviousWeek?.setDate(startOfPreviousWeek?.getDate() - (firstDayOfWeek - 1));

                            const endOfNextWeek = new Date(lastDayOfMonth);
                            endOfNextWeek?.setDate(endOfNextWeek?.getDate() + (7 - lastDayOfWeek));

                            const previousMonthDays = [];
                            for (let d = new Date(startOfPreviousWeek); d < firstDayOfMonth; d.setDate(d.getDate() + 1)) {
                                previousMonthDays.push({
                                    date: new Date(d),
                                    day: d.getDate(),
                                });
                            }

                            const currentMonthDays = item.price_detail.map((dayDataApi: any) => {
                                const currentDate = new Date(dayDataApi.date);
                                return {
                                    ...dayDataApi,
                                    date: currentDate,
                                    day: currentDate.getDate(),
                                    price: dayDataApi.price,
                                };
                            });

                            const nextMonthDays = [];
                            for (let d = new Date(lastDayOfMonth); d <= endOfNextWeek; d.setDate(d.getDate() + 1)) {
                                nextMonthDays.push({
                                    date: new Date(d),
                                    day: d.getDate(),
                                    isNextMonthDay: true,
                                });
                            }

                            const dayComponents = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays].map((dayData, i, arr) => {
                                // So sánh ngày hiện tại với ngày trong danh sách
                                const dayDate = dayData.date;
                                const isPastDay = dayDate < currentDate && !isSameDay(dayDate, currentDate);
                                // Xác định xem ngày hiện tại là thứ mấy
                                const dayOfWeek = dayData.date.getDay(); // 0 là Chủ Nhật, 1 là Thứ 2, ..., 6 là Thứ 7

                                // Kiểm tra xem ngày hiện tại là thứ 7 hay chủ nhật không
                                const isSaturday = dayOfWeek === 6;
                                const isSunday = dayOfWeek === 0;

                                return (
                                    <div
                                        key={`day-${i}`}
                                        onClick={(event) => handleSelectDate(event, dayData)}
                                        className={`col-span-1  border-[#F4F4F4] border-r border-b flex flex-col gap-1 justify-center items-center w-full h-14 group text-center
                                        ${isPastDay ? "text-[#EBEBE4] font-normal cursor-default" : "cursor-pointer"}
                                        ${dayData.status === 2 || dayData.status === 3 ? "bg-[#E0E0E0] cursor-pointer" : ""}
                                        ${isPastDay && dayData.status === 2 || isPastDay && dayData.status === 3 ? "bg-[#E0E0E0] cursor-default" : ""}
                                        ${dayData.isNextMonthDay ? "text-[#EBEBE4] font-normal cursor-default" : ""}
                                        `}
                                    >
                                        <div className='text-xs font-normal'>
                                            {dayData.day}
                                        </div>

                                        <div
                                            className={`text-[13px] 
                                            ${isPastDay ? "font-normal" : "font-semibold"} 
                                        ${(isSaturday && !isPastDay) || (isSunday && !isPastDay) ? 'text-[#2FB9BD]' : ''} 
                                        `}
                                        >
                                            {dayData.price ? FormatNumberToThousands(dayData.price) : ''}
                                        </div>
                                    </div>
                                );
                            });

                            return (
                                <div key={`id-${item.id}`} className='flex flex-col gap-4'>
                                    <div className='w-full flex items-center justify-center text-xl font-semibold text-[#2FB9BD]'>
                                        Tháng {formattedMonth}, {currentYear}
                                    </div>

                                    {/* Render các thứ trong tuần */}
                                    <div className="grid grid-cols-7 text-center text-sm font-light uppercase">
                                        {
                                            daysOfWeek.map((item, index) => (
                                                <div key={`index-week-${index}`}>
                                                    {item}
                                                </div>
                                            ))
                                        }
                                    </div>

                                    {/* Render các ngày trong tuần */}
                                    <div className='grid grid-cols-7 items-center border-[#F4F4F4] border-l border-t'>
                                        {dayComponents}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </BackgroundUiVehicle>
    )
}