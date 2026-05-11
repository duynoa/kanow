import { useCallback, useEffect, useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { X } from "lucide-react";
import { toastCore } from "@/lib/toast";
import { useForm } from "react-hook-form";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

import { useDialogCalendar, useDialogSubmit } from "@/hooks/useOpenDialog";
import { FormatNumberToThousands, FormatOnlyNumberToThousands, FormatOriginalString } from "../format/FormatNumber";
import { NumericFormatCore } from "@/lib/numericFormat";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { putPriceMultiDate, putPriceSaturdayAndSunday, putPriceSingleDate } from "@/services/cars/calendar.services";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import ButtonLoading from "../button/ButtonLoading";
import { useStateTalentedCalendar } from "@/app/(router)/(mobile)/vehicle-management-mobile/(talented-rental)/talented-calendar/_state/useStateTalentedCalendar";
import { FORMAT_DATE } from "@/constants/FormatDate";
import moment from "moment";

type Props = {};

export function DialogSubmit({ }: Props) {
    const {
        dataCalendar,
        setDataCalendar,
    } = useDialogCalendar()

    const { dataDetail, dataOther } = useVehicleManage()
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const { isStateTalentedCalendar, queryKeyIsStateTalentedCalendar } = useStateTalentedCalendar()

    const param: ReadonlyURLSearchParams = useSearchParams()
    const car_id: string | null = param.get("key") || ''
    const type: string | null = param.get("t") || ''

    const form = useForm({
        defaultValues: {
            //don gia thue mac dinh
            singlePrice: "0",
            saturdayPrice: "0",
            sundayPrice: "0",
            customPriceMultiDay: "0"
        }
    })

    const {
        openDialogSubmit,
        typeDialogSubmit,
        dataItem,
        setOpenDialogSubmit,
        setTypeDialogSubmit,
        setDataItem
    } = useDialogSubmit()

    const handleOpenChangeModal = (value: boolean) => {
        setOpenDialogSubmit(value)

        if (isStateTalentedCalendar?.selectedMultiDates?.length > 0) {
            queryKeyIsStateTalentedCalendar({
                selectedMultiDates: []
            })
        }
    }

    useEffect(() => {
        if (typeDialogSubmit == "price_single" && !Array.isArray(dataItem) && dataItem && openDialogSubmit) {
            [
                ["singlePrice", `${dataItem?.price > 0 ? FormatOnlyNumberToThousands(dataItem?.price) : ""}`],
            ].forEach(([name, value]: any) => {
                form.setValue(name, value)
            })
            return
        } else if (typeDialogSubmit == "price_weekend" && openDialogSubmit) {
            if (type == "1") {
                form.setValue("saturdayPrice", dataDetail?.data?.car?.rent_cost > 0 ? FormatOnlyNumberToThousands(dataDetail?.data?.car?.rent_cost) : "")
                form.setValue("sundayPrice", dataDetail?.data?.car?.rent_cost > 0 ? FormatOnlyNumberToThousands(dataDetail?.data?.car?.rent_cost) : "")
                return
            } else if (type == "2") {
                form.setValue("saturdayPrice", dataDetail?.data?.car_talent?.rent_cost > 0 ? FormatOnlyNumberToThousands(dataDetail?.data?.car_talent?.rent_cost) : "")
                form.setValue("sundayPrice", dataDetail?.data?.car_talent?.rent_cost > 0 ? FormatOnlyNumberToThousands(dataDetail?.data?.car_talent?.rent_cost) : "")
                return
            }
        } else {
            setTimeout(() => {
                form.reset()
            }, 300);
        }

    }, [dataItem, dataOther, typeDialogSubmit, form, openDialogSubmit])

    const onSubmit = async (value: any) => {
        // Xử lý dữ liệu form khi submit
        console.log("value submit: ", value);
        try {
            console.log('dataItem', dataItem);
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isLoadingButtonSecond: true
                },
            })

            if (typeDialogSubmit === "price_single") {
                const dataSubmit = {
                    type: type,
                    price_detail_id: dataItem.id,
                    price_new: value.singlePrice === "0" ? `${dataDetail.data.rent_cost}` : `${FormatOriginalString(value.singlePrice)}000`
                }

                const { data } = await putPriceSingleDate(dataSubmit)

                console.log('data', data);
                if (data && data.result) {
                    toastCore.success("Thay đổi giá thành công!")

                    handleOpenChangeModal(false)

                    setTimeout(() => {
                        queryKeyIsStateLoadSuccess({
                            loading: {
                                ...isStateLoadSuccess.loading,
                                isSuccessFetchApi: true,
                                isLoadingButtonSecond: false
                            }
                        })
                    }, 200);
                } else {
                    toastCore.error(data.message)
                    setTimeout(() => {
                        queryKeyIsStateLoadSuccess({
                            loading: {
                                ...isStateLoadSuccess.loading,
                                isSuccessFetchApi: true,
                                isLoadingButtonSecond: false
                            }
                        })
                    }, 200);
                }

            } else if (typeDialogSubmit === "price_weekend") {
                const dataSubmit = {
                    type: type,
                    car_id: car_id,
                    price_sat: value.saturdayPrice === "0" ? `${dataDetail.data.rent_cost}` : `${FormatOriginalString(value.saturdayPrice)}000`,
                    price_sun: value.sundayPrice === "0" ? `${dataDetail.data.rent_cost}` : `${FormatOriginalString(value.sundayPrice)}000`
                }

                const { data } = await putPriceSaturdayAndSunday(dataSubmit)

                console.log('data', data);
                if (data && data.result) {
                    toastCore.success("Thay đổi giá thành công!")
                    handleOpenChangeModal(false)

                    setTimeout(() => {
                        queryKeyIsStateLoadSuccess({
                            loading: {
                                ...isStateLoadSuccess.loading,
                                isSuccessFetchApi: true,
                                isLoadingButtonSecond: false
                            },
                        })
                    }, 200);
                } else {
                    setTimeout(() => {
                        queryKeyIsStateLoadSuccess({
                            loading: {
                                ...isStateLoadSuccess.loading,
                                isSuccessFetchApi: true,
                                isLoadingButtonSecond: false
                            },
                        })
                    }, 200);
                    toastCore.error(data.message)
                }
            } else if (typeDialogSubmit === "customPriceMultiDay") {
                const dataSubmit = new FormData()
                dataSubmit.append(`type`, type ?? "")
                dataSubmit.append(`car_id`, car_id ?? "")

                dataItem?.forEach((item: any, index: number) => {
                    dataSubmit.append(`arr_id[${index}]`, item.id ?? "")
                });
                dataSubmit.append(`price`, value.customPriceMultiDay === "0" ? `${dataDetail.data.rent_cost}` : `${FormatOriginalString(value.customPriceMultiDay)}000`)

                const { data } = await putPriceMultiDate(dataSubmit)

                console.log('value', value);
                console.log('dataItem', dataItem);
                if (data && data.result) {
                    toastCore.success("Thay đổi giá thành công!")

                    handleOpenChangeModal(false)

                    setTimeout(() => {
                        queryKeyIsStateLoadSuccess({
                            loading: {
                                ...isStateLoadSuccess.loading,
                                isSuccessFetchApi: true,
                                isLoadingButtonSecond: false
                            }
                        })
                    }, 200);
                } else {
                    toastCore.error(data.message)
                    setTimeout(() => {
                        queryKeyIsStateLoadSuccess({
                            loading: {
                                ...isStateLoadSuccess.loading,
                                isSuccessFetchApi: true,
                                isLoadingButtonSecond: false
                            }
                        })
                    }, 200);
                }

            }

        } catch (err) {
            throw err
        }
    }

    const getFirstAndLastDate = (datesArray: any) => {
        if (!datesArray || datesArray.length === 0) return { firstDate: null, lastDate: null };

        // Sắp xếp mảng theo ngày
        const sortedDates = datesArray.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return {
            firstDate: sortedDates[0], // Ngày đầu tiên
            lastDate: sortedDates[sortedDates.length - 1], // Ngày cuối cùng
        };
    };

    const { firstDate, lastDate } = getFirstAndLastDate(isStateTalentedCalendar?.selectedMultiDates || []);

    // console.log('firstDate', firstDate);
    // console.log('lastDate', lastDate);


    return (
        <Dialog
            modal
            open={openDialogSubmit}
            onOpenChange={(value) => handleOpenChangeModal(value)}
        >
            <DialogOverlay />
            <DialogContent className={`lg:max-w-[420px] max-w-[95%] max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}>
                <DialogClose
                    onClick={() => setOpenDialogSubmit(false)}
                    className="size-8 border flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-4 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader className="flex items-center justify-center w-full 3xl:mt-6 mt-3">
                    <DialogTitle className={` capitalize text-2xl`}>
                        {typeDialogSubmit === "price_single" && "Tuỳ chỉnh giá (Single)"}
                        {typeDialogSubmit === "customPriceMultiDay" && "Tuỳ chỉnh giá (Multi)"}
                        {typeDialogSubmit === "price_weekend" && "Tuỳ chỉnh giá ngày cuối tuần"}
                    </DialogTitle>
                </DialogHeader>

                <Form  {...form} >
                    <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
                        {
                            typeDialogSubmit === "price_single" &&
                            <div className='flex flex-col gap-2'>
                                <FormLabel>
                                    <h1 className="text-xs font-medium text-[#AAAAAA]">
                                        Nhập giá truỳ chỉnh cho ngày này. Nhập 0 nếu muốn dùng giá mặc định
                                    </h1>
                                </FormLabel>
                                <FormField
                                    control={form.control}
                                    name="singlePrice"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng nhập đơn giá thuê',
                                        },
                                        validate: {
                                            function: (value: any) => {
                                                try {
                                                    let message = ''
                                                    if (value < 0) {
                                                        message = 'Vui lòng không nhập số âm!'
                                                    }
                                                    return message || true;
                                                } catch (error) {
                                                    throw error;
                                                }
                                            }
                                        }
                                    }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem className="space-y-0 flex flex-col gap-2">
                                                <FormControl>
                                                    <div className='flex gap-2 items-center'>
                                                        <NumericFormatCore
                                                            className={`w-[60%] max-w-[60%] disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2 focus:border-[#2FB9BD] outline-none border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-lg px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0`}
                                                            placeholder="Nhập đơn giá thuê"
                                                            thousandSeparator={','}
                                                            maxLength={10}
                                                            {...field}
                                                        />
                                                        <span>k</span>
                                                    </div>
                                                </FormControl>


                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        );
                                    }}
                                />
                                {
                                    dataOther?.rent_cost_propose > 0 &&
                                    <h1 className="text-xs font-medium text-[#AAAAAA]">
                                        <span>Giá đề xuất</span>
                                        <span className="px-1">{FormatNumberToThousands(dataOther?.rent_cost_propose)}</span>
                                    </h1>
                                }
                                <ButtonLoading
                                    title="Xác nhận"
                                    type="submit"
                                    onClick={() => { }}
                                    className="flex items-center gap-2 w-full text-white border-[#2FB9BD] rounded-xl
                                border-2 h-14 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                                    disabled={isStateLoadSuccess.loading.isLoadingButtonSecond}
                                    isStateloading={isStateLoadSuccess.loading.isLoadingButtonSecond}
                                />
                            </div>
                        }

                        {
                            typeDialogSubmit === "price_weekend" &&
                            <div className='flex flex-col gap-2'>
                                <FormLabel>
                                    <h1 className="text-xs font-medium text-[#AAAAAA]">
                                        Nhập giá truỳ chỉnh cho ngày này. Nhập 0 nếu muốn dùng giá mặc định
                                    </h1>
                                </FormLabel>
                                <FormField
                                    control={form.control}
                                    name="saturdayPrice"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng nhập đơn giá thuê',
                                        },
                                        validate: {
                                            function: (value: any) => {
                                                try {
                                                    let message = ''
                                                    if (value < 0) {
                                                        message = 'Vui lòng không nhập số âm!'
                                                    }
                                                    return message || true;
                                                } catch (error) {
                                                    throw error;
                                                }
                                            }
                                        }
                                    }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem className="space-y-0 flex flex-col">
                                                <FormLabel className="text-xs font-medium text-[#000000]/80">
                                                    Thứ 7
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='flex gap-2 items-center'>
                                                        <NumericFormatCore
                                                            className={`w-[60%] max-w-[60%] disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2 focus:border-[#2FB9BD] outline-none border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-lg px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0`}
                                                            placeholder="Nhập đơn giá thuê"
                                                            thousandSeparator={','}
                                                            maxLength={10}
                                                            {...field}
                                                        />
                                                        <span>k</span>
                                                    </div>
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
                                    name="sundayPrice"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng nhập đơn giá thuê',
                                        },
                                        validate: {
                                            function: (value: any) => {
                                                try {
                                                    let message = ''
                                                    if (value < 0) {
                                                        message = 'Vui lòng không nhập số âm!'
                                                    }
                                                    return message || true;
                                                } catch (error) {
                                                    throw error;
                                                }
                                            }
                                        }
                                    }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem className="space-y-0 flex flex-col">
                                                <FormLabel className="text-xs font-medium text-[#000000]/80">
                                                    Chủ nhật
                                                </FormLabel>
                                                <FormControl>
                                                    <div className='flex gap-2 items-center'>
                                                        <NumericFormatCore
                                                            className={`w-[60%] max-w-[60%] disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2 focus:border-[#2FB9BD] outline-none border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-lg px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0`}
                                                            placeholder="Nhập đơn giá thuê"
                                                            thousandSeparator={','}
                                                            maxLength={10}
                                                            {...field}
                                                        />
                                                        <span>k</span>
                                                    </div>
                                                </FormControl>

                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        );
                                    }}
                                />
                                {
                                    dataOther?.rent_cost_propose > 0 &&
                                    <h1 className="text-xs font-medium text-[#AAAAAA]">
                                        <span>Giá đề xuất: </span>
                                        <span className="px-1 font-bold">{FormatNumberToThousands(dataOther?.rent_cost_propose)}</span>
                                    </h1>
                                }
                                <ButtonLoading
                                    title="Xác nhận"
                                    type="submit"
                                    onClick={() => form.handleSubmit((values) => onSubmit(values))}
                                    className="flex items-center gap-2 w-full text-white border-[#2FB9BD] rounded-xl
                                border-2 h-14 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                                    disabled={isStateLoadSuccess.loading.isLoadingButtonSecond}
                                    isStateloading={isStateLoadSuccess.loading.isLoadingButtonSecond}
                                />
                            </div>
                        }

                        {
                            typeDialogSubmit === "customPriceMultiDay" &&
                            <div className='flex flex-col gap-2'>
                                <FormLabel>
                                    <h1 className="text-xs font-medium text-[#AAAAAA]">
                                        Nhập giá truỳ chỉnh cho ngày <span className='font-bold text-[#2FB9BD]'>{moment(firstDate?.date).format(FORMAT_DATE?.DATE_SLASH_LONG)} đến {moment(lastDate?.date).format(FORMAT_DATE?.DATE_SLASH_LONG)}</span>. Nhập 0 nếu muốn dùng giá mặc định
                                    </h1>
                                </FormLabel>
                                <FormField
                                    control={form.control}
                                    name="customPriceMultiDay"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng nhập đơn giá thuê',
                                        },
                                        validate: {
                                            function: (value: any) => {
                                                try {
                                                    let message = ''
                                                    if (value < 0) {
                                                        message = 'Vui lòng không nhập số âm!'
                                                    }
                                                    return message || true;
                                                } catch (error) {
                                                    throw error;
                                                }
                                            }
                                        }
                                    }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem className="space-y-0 flex flex-col gap-2">
                                                <FormControl>
                                                    <div className='flex gap-2 items-center'>
                                                        <NumericFormatCore
                                                            className={`w-[60%] max-w-[60%] disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2 focus:border-[#2FB9BD] outline-none border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-lg px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0`}
                                                            placeholder="Nhập đơn giá thuê"
                                                            thousandSeparator={','}
                                                            maxLength={10}
                                                            {...field}
                                                        />
                                                        <span>k</span>
                                                    </div>
                                                </FormControl>


                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        );
                                    }}
                                />
                                {
                                    dataOther?.rent_cost_propose > 0 &&
                                    <h1 className="text-xs font-medium text-[#AAAAAA]">
                                        <span>Giá đề xuất</span>
                                        <span className="px-1">{FormatNumberToThousands(dataOther?.rent_cost_propose)}</span>
                                    </h1>
                                }
                                <ButtonLoading
                                    title="Xác nhận"
                                    type="submit"
                                    onClick={() => { }}
                                    className="flex items-center gap-2 w-full text-white border-[#2FB9BD] rounded-xl
                                border-2 h-14 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                                    disabled={isStateLoadSuccess.loading.isLoadingButtonSecond}
                                    isStateloading={isStateLoadSuccess.loading.isLoadingButtonSecond}
                                />
                            </div>
                        }
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
