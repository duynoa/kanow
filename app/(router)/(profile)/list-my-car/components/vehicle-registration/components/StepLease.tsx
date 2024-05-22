import SelectCombobox from "@/components/combobox/SelectCombobox"
import { FormatNumberToThousands } from "@/components/format/FormatNumber"
import SearchAddress from "@/components/searchAddress/SearchAddress"
import { Button } from "@/components/ui/button"
import { CustomSlider } from "@/components/ui/customSlider"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useDialogAddress } from "@/hooks/useOpenDialog"
import { NumericFormatCore } from "@/lib/numericFormat"
import apiAddress from "@/services/profile/listAddress/listAddress.services"
import apiMyCar from "@/services/profile/listMyCar/listMyCar.services"
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services"
import { IStateLease, TComboboxApi } from "@/types/Profile/mycar/IMyCar"
import { debounce } from "lodash"
import { ChevronsUpDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Props = {
    form: any,
    checkValueArray: (array: any[], field: any) => any
    converArray: (arr: TComboboxApi[]) => TComboboxApi[]
}
const StepLease = ({ form, checkValueArray }: Props) => {
    const [isMount, setIsMount] = useState(false)
    const { apiListMoveEndFeuelType } = apiMyCar()
    const { apiListCity, apiListDistrict, apiListWard } = apiAddress()
    const { apiRentCostPropose } = apiVehicleCommon()
    const { setOpenBoxSearch } = useDialogAddress()
    const initialState: IStateLease = {
        rentCostPropose: 0,
        openCombobox: false,
        typeOpenCombobox: "",
        dataCity: [],
        dataDistrict: [],
        dataWards: [],
        dataWordLimit: [],
        dataUntil: [],
        //giao xe tận tơi
        vehicleHanding: {
            // // quảng đường giao 
            // intersectionSquare: 0,
            // /// phí giao nhận xe cho mỗi km
            // deliveryFee: 0,
            // // miễn phí giao
            // freeDelivery: 0
            intersectionSquare: {
                max: 500,
                min: 0,
                propose: 0
            },
            deliveryFee: {
                max: 5000000,
                min: 0,
                propose: 0
            },
            freeDelivery: {
                max: 500,
                min: 0,
                propose: 0
            },
        },
        discount: 0,
        // Giới hạn số km
        limitedKilometers: {
            //số km tối đa trong 1 ngày
            maximumKilometers: {
                max: 0,
                min: 0,
                propose: 0
            },
            // phí vượt giới hạn
            overLimitFee: {
                max: 0,
                min: 0,
                propose: 0
            }
        },

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

    }

    const valuesForm = form.getValues()


    const [isState, setIsState] = useState(initialState)


    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    useEffect(() => {
        setIsMount(true)
    }, [])

    const fetchListOther = async () => {
        try {
            const { data: { other, dtFee, other_talent } } = await apiListMoveEndFeuelType()
            if (other || dtFee || other_talent) {
                queryState({
                    vehicleHanding: {
                        ...isState.vehicleHanding,
                        intersectionSquare: {
                            ...isState.vehicleHanding.intersectionSquare,
                            propose: +other?.km_delivery_car
                        },
                        deliveryFee: {
                            ...isState.vehicleHanding.deliveryFee,
                            propose: +other?.fee_km_delivery_car
                        },
                        freeDelivery: {
                            ...isState.vehicleHanding.freeDelivery,
                            propose: +other?.free_km_delivery_car
                        },
                    },
                    discount: +other?.percent_discount,
                    limitedKilometers: {
                        ...isState.limitedKilometers,
                        maximumKilometers: {
                            ...isState.limitedKilometers.maximumKilometers,
                            max: 5000,
                            propose: +other?.limit_km_day

                        },
                        overLimitFee: {
                            ...isState.limitedKilometers.overLimitFee,
                            max: +dtFee?.max,
                            min: +dtFee?.min,
                            propose: +dtFee?.propose_fee
                        }
                    }
                })
                const db = [
                    { name: 'stepLease.vehicleHanding.intersectionSquare', value: +other?.km_delivery_car },
                    { name: 'stepLease.vehicleHanding.freeDelivery', value: +other?.free_km_delivery_car },
                    { name: 'stepLease.vehicleHanding.deliveryFee', value: +other?.fee_km_delivery_car },
                    { name: 'stepLease.discount.value', value: +other?.percent_discount },
                    { name: 'stepLease.limitedKilometers.maximumKilometers', value: +other?.limit_km_day },
                    { name: 'stepLease.limitedKilometers.overLimitFeeId', value: dtFee?.id },
                    { name: 'stepLease.limitedKilometers.overLimitFee', value: +dtFee?.propose_fee },
                ]
                db.forEach((item: any) => {
                    form.setValue(item.name, item.value);
                });
            }
        } catch (error) {
            throw error
        }
    }


    const fetchRentCost = async () => {
        let formData = new FormData()
        // "type" : 1, 1 xe tự lái, 2 xe có tài
        // "year":2018, năm sản xuất
        // "company_car":1, hãng xe
        // "model_car":1 ,mẫu xe
        formData.append('type', "1")
        formData.append('year', valuesForm.stepInformation.yearOfmManufacture)
        formData.append('company_car', valuesForm.stepInformation.carCompany)
        formData.append('model_car', valuesForm.stepInformation.sampleCar)
        const { data } = await apiRentCostPropose(formData)
        queryState({ rentCostPropose: data?.rent_cost_propose ?? 0 })

    }

    const fetchListCity = async (search: any) => {
        try {
            const { data } = await apiListCity({ 'search': search })
            if (data?.data) {
                const newData = data?.data.map((e: any) => ({ label: e.name, value: e.province_id }))
                queryState({ dataCity: newData })
            }
        } catch (error) {
            throw error
        }
    }


    const fetchDistrict = async (search: any) => {
        try {
            const { data } = await apiListDistrict({ 'search': search, "province_id": valuesForm.stepLease.vehicleAddress.city })
            if (data?.data) {
                const newData = data?.data.map((e: any) => ({ label: e.name, value: e.district_id }))
                queryState({ dataDistrict: newData })
            }
        } catch (error) {
            throw error
        }
    }

    const fetchWards = async (search: any) => {
        try {
            const { data } = await apiListWard({ 'search': search, "district_id": valuesForm.stepLease.vehicleAddress.district })
            if (data?.data) {
                const newData = data?.data.map((e: any) => ({ label: e.name, value: e.wards_id }))
                queryState({ dataWards: newData })
            }
        } catch (error) {
            throw error

        }
    }

    useEffect(() => {
        fetchListCity("")
        fetchListOther()
        fetchRentCost()
    }, [])

    useEffect(() => {
        if (isState.typeOpenCombobox === 'city') {
            fetchListCity("")
        }
    }, [isState.openCombobox])

    useEffect(() => {
        if (valuesForm.stepLease.vehicleAddress.city) {
            fetchDistrict('')
        }
    }, [isState.openCombobox, valuesForm.city])


    useEffect(() => {
        if (valuesForm.stepLease.vehicleAddress.district) {
            fetchWards('')
        }
    }, [isState.openCombobox, valuesForm.district])

    const handleSearchApi = debounce((value, type) => {
        switch (type) {
            case 'city':
                fetchListCity(value)
                break;
            case 'district':
                fetchDistrict(value)
                break;
            case 'wards':
                fetchWards(value)
                break;
            default:
                break;
        }
    }, 700)

    if (!isMount) return null

    return (
        <>
            <Form  {...form}>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className='text-[#3E424E] text-base font-medium'>Thông tin thuê xe </h1>
                    </div>
                    <div className="grid md:grid-cols-2 col-span-1 grid-rows-1 md:gap-6 gap-4">
                        <div className="md:col-span-2 col-span-1">
                            <FormField
                                control={form.control}
                                name="stepLease.unitPrice"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng nhập đơn giá thuê',
                                    },
                                    validate: {
                                        fn: (value) => {
                                            try {
                                                let mss = ''
                                                if (value == 0) {
                                                    mss = 'Đơn giá thuê phải lớn hơn 0'
                                                }
                                                return mss || true;
                                            } catch (error) {
                                                throw error;
                                            }
                                        }
                                    }
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <FormItem className="space-y-0 flex flex-col gap-2">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Đơn giá thuê mặc định<span className="text-red-500">*</span>
                                                {isState?.rentCostPropose > 0 &&
                                                    <h1 className="text-xs text-gray-400">Giá đề xuất
                                                        <span className="px-1">{FormatNumberToThousands(isState?.rentCostPropose)}</span>
                                                    </h1>
                                                }
                                            </FormLabel>
                                            <FormControl>
                                                <NumericFormatCore
                                                    className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full 
                                                 focus:border-[#2FB9BD] ${fieldState?.invalid && fieldState?.error ? 'border-[#2FB9BD]' : 'border-[#E6E8EC]'} outline-none border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                    placeholder="Nhập đơn giá thuê"
                                                    thousandSeparator={','}
                                                    {...field}
                                                    getInputRef={(ref: HTMLInputElement) => {
                                                        if (ref) {
                                                            field.ref({
                                                                focus: () => ref.focus(),
                                                            })
                                                        }
                                                    }}
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
                        <div className="md:col-span-2 col-span-1">
                            {/* Địa chỉ xe */}
                            <FormField
                                control={form.control}
                                name="stepLease.vehicleAddress"
                                render={({ field, fieldState }) => {
                                    return (
                                        <FormItem className="flex flex-col justify-between space-y-0">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Địa chỉ xe
                                            </FormLabel>
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng chọn tỉnh thành',
                                                        },
                                                    }}
                                                    name="stepLease.vehicleAddress.city"
                                                    render={({ field }) => {
                                                        const checkValue = checkValueArray(isState.dataCity, field)
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Tỉnh/ Thành phố <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover
                                                                            open={isState.typeOpenCombobox === 'city' && isState.openCombobox}
                                                                            onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'city' })}
                                                                        >
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {checkValue ? checkValue : "Chọn tỉnh thành"}
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={isState.dataCity}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        field.onChange(e)
                                                                                        queryState({ openCombobox: false })
                                                                                        form.setValue('stepLease.vehicleAddress.district', '')
                                                                                        form.setValue('stepLease.vehicleAddress.wards', '')
                                                                                    }}
                                                                                    onValueChange={(e: any) => handleSearchApi(e, 'city')}
                                                                                    placeholderInput="Tìm kiếm tỉnh thành"

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
                                                    name="stepLease.vehicleAddress.district"
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng chọn quận huyện',
                                                        },
                                                    }}
                                                    render={({ field }) => {
                                                        const checkValue = checkValueArray(isState.dataDistrict, field)
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Quận/ huyện <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover
                                                                            open={isState.typeOpenCombobox === 'district' && isState.openCombobox}
                                                                            onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'district' })}
                                                                        >
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3  w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {checkValue ? checkValue : "Chọn quận huyện"}
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={isState.dataDistrict}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        field.onChange(e)
                                                                                        queryState({ openCombobox: false })
                                                                                        form.setValue('stepLease.vehicleAddress.wards', '')
                                                                                    }}
                                                                                    onValueChange={(e: any) => handleSearchApi(e, 'district')}
                                                                                    placeholderInput="Tìm kiếm quận huyện"
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
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng chọn phường/ xã',
                                                        },
                                                    }}
                                                    name="stepLease.vehicleAddress.wards"
                                                    render={({ field }) => {
                                                        const checkValue = checkValueArray(isState.dataWards, field)
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Phường/ xã <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover
                                                                            open={isState.typeOpenCombobox === 'wards' && isState.openCombobox}
                                                                            onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'wards' })}
                                                                        >
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3  w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {checkValue ? checkValue : "Chọn phường xã"}
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={isState.dataWards}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        field.onChange(e)
                                                                                        queryState({ openCombobox: false })
                                                                                    }}
                                                                                    onValueChange={(e: any) => handleSearchApi(e, 'wards')}
                                                                                    placeholderInput="Tìm kiếm phường xã"

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
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: 'Vui lòng nhập tên đường',
                                                        }
                                                    }}
                                                    name="stepLease.vehicleAddress.street"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Tên đường <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <SearchAddress field={field} onChange={(e: any) => field.onChange(e)} >
                                                                        <Input
                                                                            type="text"
                                                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs  disabled:border-gray-300 disabled:border-2  focus:border-[#2FB9BD]
                                                                            w-full border-[#E6E8EC] border-2 2xl:py-3 lg:py-2 md:py-2 py-2 rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                                            placeholder="Nhập địa chỉ của bạn"
                                                                            {...field}
                                                                            // onClick={() => setOpenBoxSearch(true)}
                                                                            // onBlur={() => setOpenBoxSearch(false)}
                                                                            onChange={(e: any) => {
                                                                                field.onChange(e)
                                                                                setOpenBoxSearch(true)
                                                                            }}
                                                                            onClick={() => setOpenBoxSearch(true)}
                                                                            onBlur={() => setOpenBoxSearch(false)}

                                                                        />
                                                                    </SearchAddress>
                                                                </FormControl>
                                                                {fieldState?.invalid && fieldState?.error && (
                                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                )}
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        {/* Giảm giá */}
                        <FormField
                            control={form.control}
                            name="stepLease.discount.open"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giảm giá
                                            <h1 className="text-xs text-gray-400">Bật tính năng</h1>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="">
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
                                                name="stepLease.discount.value"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                Giảm giá cho thuê tuần (% trên đơn giá)
                                                            </FormLabel>
                                                            <FormControl>
                                                                <>
                                                                    <CustomSlider
                                                                        value={[+field.value]}
                                                                        defaultValue={[+field.value]}
                                                                        min={0}
                                                                        max={100}
                                                                        step={1}
                                                                        onValueChange={field.onChange}
                                                                    />
                                                                </>
                                                            </FormControl>
                                                            <div className={`flex ${isState.discount > 0 ? "justify-between" : "justify-end"}`}>
                                                                {isState.discount > 0 &&
                                                                    <FormDescription>
                                                                        Giảm đề xuất: {isState.discount}%
                                                                    </FormDescription>}
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
                        {/* Đặt xe nhanh */}
                        <FormField
                            control={form.control}
                            name="stepLease.bookCarQuickly.open"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Đặt xe nhanh
                                            <h1 className="text-xs text-gray-400">Bật tính năng</h1>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="">
                                                <Switch
                                                    className="data-[state=checked]:bg-[#2FB9BD] "
                                                    checked={field.value}
                                                    onCheckedChange={(e) => {
                                                        field.onChange(e)
                                                        form.setValue('stepLease.bookCarQuickly.wordLimit', '')
                                                        form.setValue('stepLease.bookCarQuickly.until', '')

                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                        {field.value &&
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="stepLease.bookCarQuickly.wordLimit"
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
                                                                            <PopoverContent className="3xl:w-[300px] xxl:w-[280px] 2xl:w-[250px] xl:w-[200px] lg:w-[150px] md:w-[160px] w-auto">
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
                                                    name="stepLease.bookCarQuickly.until"
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
                                                                            <PopoverContent className="3xl:w-[300px] xxl:w-[280px] 2xl:w-[250px] xl:w-[200px] lg:w-[150px] md:w-[160px] w-auto">
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
                        {/* // giao xe tận nơi*/}
                        <FormField
                            control={form.control}
                            name="stepLease.vehicleHanding.open"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giao xe tận nơi
                                            <h1 className="text-xs text-gray-400">Bật tính năng</h1>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="">
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
                                                    name="stepLease.vehicleHanding.intersectionSquare"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Quãng đường giao xe tối đa
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            defaultValue={[+field.value]}
                                                                            value={[+field.value]}
                                                                            min={isState.vehicleHanding.intersectionSquare.min}
                                                                            max={isState.vehicleHanding.intersectionSquare.max}
                                                                            step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className={`flex ${isState.vehicleHanding.intersectionSquare.propose > 0 ? "justify-between" : "justify-end"}`}>
                                                                    {isState.vehicleHanding.intersectionSquare.propose > 0 &&
                                                                        <FormDescription>
                                                                            Quãng đường đề xuất: {isState.vehicleHanding.intersectionSquare.propose}Km
                                                                        </FormDescription>}
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
                                                    name="stepLease.vehicleHanding.deliveryFee"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Vượt phí giới hạn (tính mỗi Km)
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            value={[+field.value]}
                                                                            defaultValue={[+field.value]}
                                                                            min={isState.vehicleHanding.deliveryFee.min}
                                                                            max={isState.vehicleHanding.deliveryFee.max}
                                                                            step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className={`flex ${isState.vehicleHanding.deliveryFee.propose > 0 ? "justify-between" : "justify-end"}`}>
                                                                    {isState.vehicleHanding.deliveryFee.propose > 0 &&
                                                                        <FormDescription>
                                                                            Phí đề xuất: {FormatNumberToThousands(isState.vehicleHanding.deliveryFee.propose)}
                                                                        </FormDescription>
                                                                    }
                                                                    <FormDescription className='font-bold'>
                                                                        {FormatNumberToThousands(+field.value)}
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
                                                    name="stepLease.vehicleHanding.freeDelivery"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Miễn phí giao nhận xe trong vòng
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            value={[+field.value]}
                                                                            defaultValue={[+field.value]}
                                                                            min={isState.vehicleHanding.freeDelivery.min}
                                                                            max={isState.vehicleHanding.freeDelivery.max}
                                                                            step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className={`flex ${isState.vehicleHanding.freeDelivery.propose > 0 ? "justify-between" : "justify-end"}`}>
                                                                    {
                                                                        isState.vehicleHanding.freeDelivery.propose > 0 &&
                                                                        <FormDescription>
                                                                            Quãng đường đề xuất: {isState.vehicleHanding.freeDelivery.propose}Km
                                                                        </FormDescription>
                                                                    }
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
                                            </div>
                                        }
                                        {fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                        {/* //gioi han so km */}
                        <FormField
                            control={form.control}
                            name="stepLease.limitedKilometers.open"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giới hạn số Km
                                            <h1 className="text-xs text-gray-400">Bật tính năng</h1>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="">
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
                                                    name="stepLease.limitedKilometers.maximumKilometers"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Số Km tối đa trong 1 ngày
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            defaultValue={[+field.value]}
                                                                            value={[+field.value]}
                                                                            min={0}
                                                                            max={isState.limitedKilometers.maximumKilometers.max}
                                                                            step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className={`flex ${isState.limitedKilometers.maximumKilometers.propose > 0 ? "justify-between" : "justify-end"}`}>
                                                                    {
                                                                        isState.limitedKilometers.maximumKilometers.propose > 0 &&
                                                                        <FormDescription>
                                                                            Số Km đề xuất: {isState.limitedKilometers.maximumKilometers.propose}Km
                                                                        </FormDescription>
                                                                    }
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
                                                    name="stepLease.limitedKilometers.overLimitFee"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Vượt phí giới hạn (tính mỗi Km)
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            value={[+field.value]}
                                                                            defaultValue={[+field.value]}
                                                                            min={isState.limitedKilometers.overLimitFee.min}
                                                                            max={isState.limitedKilometers.overLimitFee.max}
                                                                            step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className={`flex ${isState.limitedKilometers.overLimitFee.propose > 0 ? "justify-between" : "justify-end"}`}>
                                                                    {isState.limitedKilometers.overLimitFee.propose > 0 &&
                                                                        <FormDescription>
                                                                            Phí đề xuất: {FormatNumberToThousands(isState.limitedKilometers.overLimitFee.propose)}
                                                                        </FormDescription>
                                                                    }
                                                                    <FormDescription className='font-bold'>
                                                                        {FormatNumberToThousands(+field.value)}
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
                        {/* thế chấp */}
                        <FormField
                            control={form.control}
                            name="stepLease.mortgage.open"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Thế chấp thuê xe
                                            <h1 className="text-xs text-gray-400">Bật tính năng</h1>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="">
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
                                                    name="stepLease.mortgage.value"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Ghi chú thế chấp
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        className={`disabled:bg-[#E6E8EC] min-h-[85px] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                                                    focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                                        placeholder="Nhập ghi chú thế chấp"
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
                            name="stepLease.carRentalConditions"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Điều khoản thuê xe
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className={`disabled:bg-[#E6E8EC] min-h-[170px] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                                focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập rõ các yêu cầu để khách có thể thuê xe."
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
                </div>
            </Form>
        </>
    )
}
export default StepLease