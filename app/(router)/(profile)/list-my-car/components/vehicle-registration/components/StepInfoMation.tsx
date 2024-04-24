import Image from "next/image"
import { debounce } from "lodash"
import { useEffect, useState } from "react"
import { ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import SelectCombobox from "@/components/combobox/SelectCombobox"
import { IStateInfomation, TComboboxApi } from "@/types/Profile/mycar/IMyCar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import apiMyCar from "@/services/profile/listMyCar/listMyCar.services"
import SkeletonFeature from "../../Skeleton/SkeletonFeature"
import { useWatch } from "react-hook-form"

type Props = {
    form: any,
    isStateChild: any,
    checkValueArray: (array: any[], field: any) => any,
    converArray: (arr: TComboboxApi[]) => TComboboxApi[],
    children: React.ReactNode
}
const StepInfoMation = ({ form, checkValueArray, converArray, isStateChild: { typePage }, children }: Props) => {
    const [isMount, setIsMount] = useState(false)
    useEffect(() => {
        setIsMount(true)
    }, [])

    // danh sách số ghế
    const handleSearchApi = debounce((value, type) => {
        switch (type) {
            case 'carCompany':
                // hãng xe
                fetListCarCompany(value)
                break;
            case 'carModel':
                // loại xe
                fetListCarModel(value)
                break;
            case 'sampleCar':
                // mẫu xe
                fetListSampleCar(value)
                break;
            default:
                break;
        }
    }, 700)


    const listSeats: TComboboxApi[] = [...Array(17)].map((_, i) => ({
        label: `${i + 4}`,
        value: i + 4
    }));

    // danh sách năm sản xuất
    const currentYear = new Date().getFullYear();
    const yearArray: TComboboxApi[] = [...Array(currentYear - 2004)].map((_, i) => ({
        label: `${2005 + i}`,
        value: 2005 + i,
    }));

    const initialState: IStateInfomation = {
        loadFeature: false,
        openCombobox: false,
        typeOpenCombobox: "",
        dataCarCompany: [],
        dataCarModel: [],
        dataSeats: listSeats,
        dataYearOfManufacture: yearArray,
        dataMove: [],
        dataFeuelType: [],
        dataFeature: [],
        dataSampleCar: []
    }

    const { apiListFeature, apiListCarCompany, apiListCarModel, apiListMoveEndFeuelType, apiListSampleCar } = apiMyCar()

    const [isState, setIsState] = useState(initialState)

    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    const findValue = form.getValues()

    //Danh sách hãng xe
    const fetListCarCompany = async (value: any) => {
        try {
            const { data } = await apiListCarCompany(value, typePage)
            if (data?.data) {
                queryState({ dataCarCompany: converArray(data?.data) })
            }
        } catch (error) {
            throw error
        }
    }
    // danh sách mẫu xe
    const fetListSampleCar = async (value: any) => {
        try {
            const { data } = await apiListSampleCar(value, findValue.stepInformation.carCompany)
            if (data?.data) {
                queryState({ dataSampleCar: converArray(data?.data) })
            }
        } catch (error) {
            throw error
        }
    }

    // danh sách loại xe
    const fetListCarModel = async (value: any) => {
        try {
            const { data } = await apiListCarModel(value, typePage)
            if (data?.data) {
                queryState({ dataCarModel: converArray(data?.data) })
            }
        } catch (error) {
            throw error
        }
    }
    // danh sách tính năng, chuyển động, loại nhiên liệu
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

    // danh sách chuyển động và loại nhiên liệu
    const fetListMoveEndFeuelType = async () => {
        try {
            const { data: { dtTransmission, dtTypeFuel } } = await apiListMoveEndFeuelType()
            if (dtTransmission || dtTypeFuel) {
                queryState({ dataMove: converArray(dtTransmission), dataFeuelType: converArray(dtTypeFuel), })
            }
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        const value = checkValueArray(isState.dataSampleCar, { value: findValue.stepInformation.sampleCar })
        if (findValue && value) {
            form.setValue('stepInformation.nameCar', value + ' ' + findValue.stepInformation.yearOfmManufacture ?? "")
        }
    }, [findValue])

    useEffect(() => {
        fetListFeature()
        fetListMoveEndFeuelType()
        fetListCarCompany('')
        // fetListCarModel('')
    }, [])

    useEffect(() => {
        if (!isState.openCombobox) return
        switch (isState.typeOpenCombobox) {
            case 'carCompany':
                fetListCarCompany('')
                break;
            case 'carModel':
                fetListCarModel('')
                break;
            case 'sampleCar':
                // mẫu xe
                if (!findValue.stepInformation.carCompany) return
                fetListSampleCar('')
                break;
            default:
                break;
        }

    }, [isState.openCombobox])

    if (!isMount) return null

    return (
        <>
            <Form  {...form}>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className='text-[#3E424E] text-base font-medium'>Thông tin cơ bản  <span className="text-red-500 text-xs font-semibold">(Lưu ý: Thông tin cơ bản không thể thay đổi sau khi đăng kí)</span></h1>
                        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
                            <div className="md:col-span-2 col-span-1">
                                <FormField
                                    control={form.control}
                                    name="stepInformation.nameCar"
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                    Tên xe <span className="text-red-500">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled
                                                        className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                        placeholder="Vui lòng chọn mẫu xe và năm sản xuất"
                                                        type={'text'}
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="stepInformation.licensePlates"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng nhập biển số xe',
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Biển số xe phải có ít nhất 8 ký tự",
                                    },
                                    maxLength: {
                                        value: 9,
                                        message: "Biển số xe tối đa 9 ký tự",
                                    }
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Biển số xe <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
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
                            <FormField
                                control={form.control}
                                name="stepInformation.carCompany"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn hãng xe',
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    const checkValue = checkValueArray(isState.dataCarCompany, field)
                                    return (
                                        <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Hãng xe <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.typeOpenCombobox === 'carCompany' && isState.openCombobox}
                                                    onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'carCompany' })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : "Chọn hãng xe"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-full">
                                                        <SelectCombobox
                                                            data={isState.dataCarCompany}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryState({ openCombobox: false })
                                                                form.setValue('stepInformation.sampleCar', '')
                                                                form.setValue('stepInformation.nameCar', '')
                                                            }}
                                                            onValueChange={(e: any) => handleSearchApi(e, 'carCompany')}
                                                            placeholderInput="Tìm kiếm hãng xe"

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
                                name="stepInformation.sampleCar"
                                rules={{
                                    required: {
                                        value: true,
                                        message: findValue.stepInformation.carCompany === '' ? 'Vui lòng chọn hãng xe trước' : 'Vui lòng chọn mẫu xe',
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    const checkValue = checkValueArray(isState.dataSampleCar, field)
                                    return (
                                        <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Mẫu xe <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.typeOpenCombobox === 'sampleCar' && isState.openCombobox}
                                                    onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'sampleCar' })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            disabled={findValue.stepInformation.carCompany === '' ? true : false}
                                                            className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : findValue.stepInformation.carCompany === '' ? 'Vui lòng chọn hãng xe trước' : "Chọn mẫu xe"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-full">
                                                        <SelectCombobox
                                                            data={isState.dataSampleCar}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryState({ openCombobox: false })
                                                            }}
                                                            onValueChange={(e: any) => handleSearchApi(e, 'sampleCar')}
                                                            placeholderInput="Tìm kiếm mẫu xe"

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
                                name="stepInformation.carModel"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn loại xe',
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    const checkValue = checkValueArray(isState.dataCarModel, field)
                                    return (
                                        <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Loại xe <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.typeOpenCombobox === 'carModel' && isState.openCombobox}
                                                    onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'carModel' })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : "Chọn loại xe"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-full">
                                                        <SelectCombobox
                                                            data={isState.dataCarModel}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryState({ openCombobox: false })
                                                            }}
                                                            onValueChange={(e: any) => handleSearchApi(e, 'carModel')}
                                                            placeholderInput="Tìm kiếm loại xe"

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
                                name="stepInformation.seats"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn số ghế',
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    const checkValue = checkValueArray(isState.dataSeats, field)
                                    return (
                                        <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Số ghế<span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.typeOpenCombobox === 'seats' && isState.openCombobox}
                                                    onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'seats' })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : "Chọn số ghế"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-full">
                                                        <SelectCombobox
                                                            data={isState.dataSeats}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryState({ openCombobox: false })
                                                            }}
                                                            onValueChange={(e: any) => { }}
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
                            {/* <div className="grid grid-cols-1 md:grid-cols-3 col-span-2 gap-4"> */}
                            <FormField
                                control={form.control}
                                name="stepInformation.yearOfmManufacture"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn năm sản xuất',
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    const checkValue = checkValueArray(isState.dataYearOfManufacture, field)
                                    return (
                                        <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Năm sản xuất <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.typeOpenCombobox === 'yearOfmManufacture' && isState.openCombobox}
                                                    onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'yearOfmManufacture' })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : "Chọn năm sản xuất"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-full">
                                                        <SelectCombobox
                                                            data={isState.dataYearOfManufacture}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryState({ openCombobox: false })
                                                            }}
                                                            onValueChange={(e: any) => { }}
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
                                name="stepInformation.move"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn truyền động',
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    const checkValue = checkValueArray(isState.dataMove, field)
                                    return (
                                        <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Truyền động <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.typeOpenCombobox === 'move' && isState.openCombobox}
                                                    onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'move' })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : "Chọn truyền động"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-full">
                                                        <SelectCombobox
                                                            data={isState.dataMove}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryState({ openCombobox: false })
                                                            }}
                                                            onValueChange={(e: any) => { }}
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
                                name="stepInformation.feuelType"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn loại nhiên liệu',
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    const checkValue = checkValueArray(isState.dataFeuelType, field)
                                    return (
                                        <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Loại nhiên liệu <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.typeOpenCombobox === 'feuelType' && isState.openCombobox}
                                                    onOpenChange={() => queryState({ openCombobox: !isState.openCombobox, typeOpenCombobox: 'feuelType' })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : "Chọn loại nhiên liệu"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-full">
                                                        <SelectCombobox
                                                            data={isState.dataFeuelType}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryState({ openCombobox: false })
                                                            }}
                                                            onValueChange={(e: any) => { }}
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
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className='text-[#3E424E] text-base font-medium'>Thông tin xe</h1>
                        <FormField
                            control={form.control}
                            name="stepInformation.fuelConsumptionLevel"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng nhập mức tiêu thụ nhiên liệu',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Mức tiêu thụ nhiên liệu  <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập số lít nhiên liệu cho quãng đường 100km. "
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
                            name="stepInformation.describe"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Mô tả
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập mô tả"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="stepInformation.feature"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Tính năng
                                        </FormLabel>
                                        <FormControl >
                                            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3">
                                                {isState.loadFeature ?
                                                    <>
                                                        {
                                                            [...Array(5)].map((_, index) => {
                                                                return <SkeletonFeature key={index} />
                                                            })
                                                        }
                                                    </>
                                                    : isState.dataFeature.map((item: any) => {
                                                        return (
                                                            <Label htmlFor={`${item.id}`} key={item.id}
                                                                className={`flex ${field.value?.includes(item.id) ? 'border-[#2FB9BD] text-[#2FB9BD]' : ''}
                                                             items-center justify-center gap-2 border-2  py-8 col-span-1 rounded-lg cursor-pointer md:text-sm text-xs`}
                                                            >
                                                                <div className="size-6">
                                                                    <Image src={item.image} alt="" width={1280} height={1024} className="object-cover size-full" />
                                                                </div>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value: any) => value !== item.id
                                                                                )
                                                                            )
                                                                    }}
                                                                    hidden
                                                                    id={`${item.id}`}
                                                                />
                                                                {item.name}
                                                            </Label>
                                                        )
                                                    })}
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                </div>

            </Form>
            {children}
        </>
    )
}
export default StepInfoMation