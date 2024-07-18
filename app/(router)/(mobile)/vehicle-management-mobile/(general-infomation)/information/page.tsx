"use client"
import ButtonLoading from "@/components/button/ButtonLoading";
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import SelectCombobox from "@/components/combobox/SelectCombobox";
// import CustomQuill from "@/components/quill/CustomQuill";
import SearchAddress from "@/components/searchAddress/SearchAddress";
import SkeletonInfomationMobile from "@/components/skeleton/mobile/SkeletonInfomationMobile";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { useDialogAddress } from "@/hooks/useOpenDialog";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiAddress from "@/services/profile/listAddress/listAddress.services";
import apiMyCar from "@/services/profile/listMyCar/listMyCar.services";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { IStateVehicleInfomation } from "@/types/VehicleManagement/GeneralInfomation/IInfomation";
import { debounce } from "lodash";
import { ChevronsUpDown } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CustomQuill = dynamic(() => import("@/components/quill/CustomQuill"), { ssr: false });

type Props = {}

export default function VehicleInfomation(props: Props) {
    const initialState: IStateVehicleInfomation = {
        loadFeature: false,
        dataFeature: [],
        typeOpenCombobox: "",
        dataCity: [],
        dataDistrict: [],
        dataWards: []
    }
    const { setOpenBoxSearch } = useDialogAddress()
    const checkValueArray = (array: any[], field: any) => {
        return array.find((x: any) => x.value === field.value)?.label
    }

    const [isMouse, setIsMouse] = useState<boolean>(false)

    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    useEffect(() => {
        setIsMouse(true)
    }, [])

    const form = useForm({
        defaultValues: {
            //tên xe
            nameCar: "",
            // biển số xe
            licensePlates: "",
            // địa chỉ xe
            address: {
                city: "",
                district: "",
                wards: "",
                street: ""
            },
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

    const { apiUpdateCar } = apiVehicleCommon()

    const { coordinates, setCoordinates } = useDialogAddress()

    const { apiListFeature } = apiMyCar()

    const { apiListCity, apiListDistrict, apiListWard } = apiAddress()


    const { dataDetail: { data }, idCar } = useVehicleManage()

    const [isState, setIsState] = useState(initialState)

    const queryState = (key: IStateVehicleInfomation) => setIsState((prev: IStateVehicleInfomation) => ({ ...prev, ...key }))


    const valuesForm = form.getValues()

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
        fetchListCity("")
    }, [])


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
            const { data } = await apiListDistrict({ 'search': search, "province_id": valuesForm.address.city })
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
            const { data } = await apiListWard({ 'search': search, "district_id": valuesForm.address.district })
            if (data?.data) {
                const newData = data?.data.map((e: any) => ({ label: e.name, value: e.wards_id }))
                queryState({ dataWards: newData })
            }
        } catch (error) {
            throw error
        }
    }


    useEffect(() => {
        if (isState.typeOpenCombobox === 'city') {
            fetchListCity("")
        }
    }, [isState.openCombobox])

    useEffect(() => {
        if (valuesForm.address.city) {
            fetchDistrict('')
        }
    }, [isState.openCombobox, valuesForm.address.city])


    useEffect(() => {
        if (valuesForm.address.district) {
            fetchWards('')
        }
    }, [isState.openCombobox, valuesForm.address.district])

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



    useEffect(() => {
        if (!Array.isArray(data) && data) {
            setCoordinates({
                lat: data?.location?.latitude,
                lng: data?.location?.longitude
            })

            const arr = [
                ['nameCar', data?.name],
                ['licensePlates', data?.number_car],
                ['address.street', data?.location.address || data?.address],
                ['address.city', data?.location.province_id],
                ['address.district', data?.location.district_id],
                ['address.wards', data?.location.wards_id],
                ['seats', data?.number_seat],
                ['move', data?.transmission],
                ['feuelType', data?.type_fuel],
                ['fuelConsumptionLevel', data?.fuel_consumption],
                ['describe', data?.detail],
                ['feature', data?.other_amenities_car?.map((e: any) => e.id)]
            ]
            arr.forEach(([key, value]) => form.setValue(key, value))
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
            let formData = new FormData();

            formData.append('car_id', idCar)

            formData.append('province_id', value?.address?.city)
            formData.append('district_id', value?.address?.district)
            formData.append('wards_id', value?.address?.wards)
            formData.append('address', value?.address?.street)
            formData.append('fuel_consumption', value?.fuelConsumptionLevel)

            formData.append('name', value?.nameCar)
            formData.append('number_car', value?.licensePlates)
            formData.append('latitude', `${coordinates?.lat}`)
            formData.append('longitude', `${coordinates?.lng}`)
            formData.append('number_seat', value?.seats)
            formData.append('transmission_id', data?.transmission_id)
            formData.append('detail', value?.describe)
            formData.append('other_amenities_car', `${value?.feature?.map((x: any) => x).join(',')}`);

            const { data: db } = await apiUpdateCar(formData)
            if (db.result) {
                toastCore.success('Lưu thông tin thành công')
                return
            }
            toastCore.error(db.message)
        } catch (err) {
            throw err
        } finally {
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isLoadingButton: false
                }
            })
        }
    }

    if (!isMouse) return null


    return (
        <BackgroundUiVehicle className="flex flex-col gap-4 ">
            <div>
                <div className="flex md:flex-row flex-col justify-between">
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl uppercase font-bold'>Thông tin xe</h1>
                </div>
            </div>
            {
                isStateLoadSuccess.loading.isSuccessFetchApi ?
                    <SkeletonInfomationMobile />
                    :
                    <Form {...form}>
                        <div className="space-y-4" >
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <FormField
                                    control={form.control}
                                    name="nameCar"
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="text-base font-semibold text-[#16171B]">
                                                    Tên xe
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled
                                                        className={`disabled:bg-[#E6E8EC] text-base disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
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
                                                <FormLabel className="text-base font-semibold text-[#16171B]">
                                                    Biển số xe
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled
                                                        className={`disabled:bg-[#E6E8EC] text-base disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
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
                            <div className="md:col-span-2 col-span-1">
                                {/* Địa chỉ xe */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem className="flex flex-col justify-between space-y-2">
                                                <FormLabel className="text-base uppercase font-bold text-[#16171B]">
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
                                                        name="address.city"
                                                        render={({ field }) => {
                                                            const checkValue = checkValueArray(isState.dataCity, field)
                                                            return (
                                                                <FormItem>
                                                                    <FormLabel className="text-base font-semibold text-[#16171B]">
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
                                                                                        className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 text-base  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
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
                                                                                            form.setValue('address.district', '')
                                                                                            form.setValue('address.wards', '')
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
                                                        name="address.district"
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
                                                                    <FormLabel className="text-base font-semibold text-[#16171B]">
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
                                                                                        className="2xl:py-3  w-full lg:py-2 md:py-2 py-2 px-3 text-base  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
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
                                                                                            form.setValue('address.wards', '')
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
                                                        name="address.wards"
                                                        render={({ field }) => {
                                                            const checkValue = checkValueArray(isState.dataWards, field)
                                                            return (
                                                                <FormItem>
                                                                    <FormLabel className="text-base font-semibold text-[#16171B]">
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
                                                                                        className="2xl:py-3  w-full lg:py-2 md:py-2 py-2 px-3 text-base  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
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
                                                        name="address.street"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem>
                                                                    <FormLabel className="text-base font-semibold text-[#16171B]">
                                                                        Tên đường <span className="text-red-500">*</span>
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <SearchAddress field={field} onChange={(e: any) => field.onChange(e)} >
                                                                            <Input
                                                                                type="text"
                                                                                className={`disabled:bg-[#E6E8EC] text-base  disabled:border-gray-300 disabled:border-2  focus:border-[#2FB9BD]
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
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                <FormField
                                    control={form.control}
                                    name="seats"
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="text-base font-semibold text-[#16171B]">
                                                    Số ghế
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled
                                                        className={`disabled:bg-[#E6E8EC] text-base disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
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
                                                <FormLabel className="text-base font-semibold text-[#16171B]">
                                                    Truyền động
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled
                                                        className={`disabled:bg-[#E6E8EC] text-base disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
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
                                                <FormLabel className="text-base font-semibold text-[#16171B]">
                                                    Loại nhiên liệu
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled
                                                        className={`disabled:bg-[#E6E8EC] text-base disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
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
                                                <FormLabel className="text-base font-semibold text-[#16171B]">
                                                    Mức tiêu thụ nhiên liệu (Lít/100km)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className={`disabled:bg-[#E6E8EC] text-base disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
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
                                            <FormLabel className="text-base font-semibold text-[#16171B]">
                                                Mô tả
                                            </FormLabel>
                                            <FormControl>
                                                <>
                                                    <CustomQuill
                                                        field={field}
                                                        placeholder="Nhập mô tả"
                                                    />
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
                                name="feature"
                                render={({ field, fieldState }: any) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="text-base font-semibold text-[#16171B]">
                                                Tính năng
                                            </FormLabel>
                                            <FormControl>
                                                <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3">
                                                    {
                                                        isState.loadFeature ?
                                                            <>
                                                                {
                                                                    [...Array(5)].map((_, index) => {
                                                                        return <Skeleton key={index} className='h-[90px] w-full' />
                                                                    })
                                                                }
                                                            </>
                                                            :
                                                            (
                                                                isState.dataFeature && isState.dataFeature.map((item) => {
                                                                    return (
                                                                        <Label
                                                                            htmlFor={item.id as string}
                                                                            key={item.id}
                                                                            className={`${field.value.includes(item.id) ? 'border-[#2FB9BD]' : ''}
                                                             flex items-center hover:scale-105 transition-all duration-150 ease-linear gap-2 border-2  py-6 px-3 col-span-1 rounded-lg cursor-pointer text-base`}
                                                                        >
                                                                            <div className="w-full h-6 max-w-[20%]">
                                                                                <Image
                                                                                    src={item.image}
                                                                                    alt="icon"
                                                                                    width={1280}
                                                                                    height={1024}
                                                                                    className="object-contain size-full"
                                                                                />
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

                                                                            <span className='max-w-[90%]'>
                                                                                {item.name}
                                                                            </span>
                                                                        </Label>
                                                                    )
                                                                })
                                                            )
                                                    }
                                                </div>
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
                        </div>
                        <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                            {/* <ButtonSaveForm
                                title="Lưu thông tin"
                                onClick={form.handleSubmit((values) => onSubmit(values))}
                            /> */}
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
            }
        </BackgroundUiVehicle>
    )
}