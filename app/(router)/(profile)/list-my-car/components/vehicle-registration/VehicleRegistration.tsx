"use client"
import Image from "next/image"
import dynamic from "next/dynamic"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ISteps, IVehicleRegistration, TComboboxApi } from "@/types/Profile/mycar/IMyCar"
import apiMyCar from "@/services/profile/listMyCar/listMyCar.services"
import { debounce } from "lodash"

import StepRegister from "./components/StepRegister"
import StepInfoMation from "./components/StepInfoMation"
import StepLease from "./components/StepLease"
import StepImages from "./components/StepImages"
import { useDialogAddress } from "@/hooks/useOpenDialog"
import { toastCore } from "@/lib/toast"
type Props = {
    queryState: (key: any) => void
}


const VehicleRegistration = ({ queryState: queryStateParent }: Props) => {
    const dataSteps: ISteps[] = [
        {
            name: "Thông tin",
            value: "information"
        },
        {
            name: "Cho thuê",
            value: "lease"
        },
        {
            name: "Hình ảnh",
            value: "images"
        }
    ];


    const initialState: IVehicleRegistration = {
        step: "register",
        typePage: 3,
    }

    const form = useForm({
        defaultValues: {
            stepInformation: {
                //ten xe
                nameCar: "",
                // Biển số xe
                licensePlates: "",
                //Hãng xe
                carCompany: "",
                // Mẫu xe
                carModel: "",
                // số ghế
                seats: "",
                // năm sx
                yearOfmManufacture: "",
                // truyền động
                move: "",
                // Loại nhiên liệu,
                feuelType: "",
                // Mức tiêu thụ nhiên nhiệu
                fuelConsumptionLevel: "",
                // mô tả
                describe: "",
                // tính năng
                feature: [],
            },
            stepLease: {
                // Đơn giá thuê mặc định
                unitPrice: '',
                // bật tắt Giảm giá
                discount: {
                    open: true,
                    value: ''
                },
                // bật tắt Đặt xe nhanh
                bookCarQuickly: {
                    open: false,
                    // giới hạn từ
                    wordLimit: "",
                    // cho đến
                    until: "",
                },
                /// địa chỉ xe
                vehicleAddress: {
                    city: "",
                    district: "",
                    wards: "",
                    street: ""
                },
                //giao xe tận tơi
                vehicleHanding: {
                    open: true,
                    // quảng đường giao 
                    intersectionSquare: "",
                    /// phí giao nhận xe cho mỗi km
                    deliveryFee: "",
                    // miễn phí giao
                    freeDelivery: ""
                },
                // Giới hạn số km
                limitedKilometers: {
                    open: true,
                    //số km tối đa trong 1 ngày
                    maximumKilometers: "",
                    // phí vượt giới hạn
                    overLimitFee: "",
                    overLimitFeeId: ""
                },
                // thế chấp
                mortgage: {
                    open: false,
                    value: ''
                },
                // Điều khoản thuê xe
                carRentalConditions: ""
            },
            stepImages: {
                images: []
            }
        }
    })
    const { coordinates } = useDialogAddress()

    const [isState, setIsState] = useState(initialState)

    const { apiAddCar } = apiMyCar()

    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))


    const checkValueArray = (array: any[], field: any) => {
        return array.find((x: any) => x.value === field.value)?.label
    }

    const converArray = (arr: TComboboxApi[]) => {
        return arr?.map((x: any) => {
            return {
                label: x.name,
                value: x.id
            }
        })
    }


    const handlePrevStep = () => {
        const currentIndex = dataSteps.findIndex(x => x.value === isState.step);
        if (currentIndex > 0) {
            const prevStep = dataSteps[currentIndex - 1].value;
            queryState({ step: prevStep });
        }
    };

    const onScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    const onSubmit = async (value: any, step?: string) => {
        if (step != 'submit') {
            const currentIndex = dataSteps.findIndex(x => x.value === isState.step);
            const nextIndex = dataSteps.findIndex(x => x.value === step);

            if (currentIndex === 0 && nextIndex === dataSteps.length - 1) {
                // Ngăn chặn chuyển từ tab "information" đến tab cuối cùng
                return;
            }
            if (currentIndex === dataSteps.length - 1) {
                handlePrevStep();
                return;
            }
            onScrollTop()
            queryState({ step });
            return
        } else {
            let formData = new FormData()
            formData.append('name', value.stepInformation.nameCar)
            formData.append('number_car', value.stepInformation.licensePlates)
            formData.append('year_manu', value.stepInformation.yearOfmManufacture)
            formData.append('company_car_id', value.stepInformation.carCompany)
            formData.append('type_car_id', value.stepInformation.carModel)
            formData.append('number_seat', value.stepInformation.seats)
            formData.append('fuel_consumption', value.stepInformation.fuelConsumptionLevel)
            formData.append('detail', value.stepInformation.describe)
            formData.append('other_amenities_car', `${value.stepInformation.feature.map((x: any) => x).join(',')}`);
            formData.append('type_fuel', value.stepInformation.feuelType)
            formData.append('transmission_id', value.stepInformation.move)
            formData.append('rent_cost', value.stepLease.unitPrice)
            formData.append('rules', value.stepLease.carRentalConditions)
            formData.append('province_id', value.stepLease.vehicleAddress.city)
            formData.append('district_id', value.stepLease.vehicleAddress.district)
            formData.append('wards_id', value.stepLease.vehicleAddress.wards)
            formData.append('address', value.stepLease.vehicleAddress.street)
            formData.append('latitude', `${coordinates?.lat}`)
            formData.append('longitude', `${coordinates?.lng}`)
            formData.append('limit_km', `${value.stepLease.limitedKilometers.open ? 1 : 0}`)
            formData.append('total_km_day', value.stepLease.limitedKilometers.maximumKilometers)
            formData.append('fee_id', value.stepLease.limitedKilometers.overLimitFeeId)
            formData.append('fee_value', value.stepLease.limitedKilometers.overLimitFee)
            formData.append('discount', `${value.stepLease.discount.open ? 1 : 0}`)
            formData.append('percent_discount', value.stepLease.discount.value)
            formData.append('book_car_flash', `${value.stepLease.bookCarQuickly.open ? 1 : 0}`)
            formData.append('from_book_car_flash', value.stepLease.bookCarQuickly.wordLimit)
            formData.append('to_book_car_flash', value.stepLease.bookCarQuickly.until)
            formData.append("delivery_car", `${value.stepLease.vehicleHanding.open ? 1 : 0}`)
            formData.append("km_delivery_car", value.stepLease.vehicleHanding.intersectionSquare)
            formData.append("fee_km_delivery_car", value.stepLease.vehicleHanding.deliveryFee)
            formData.append("free_km_delivery_car", value.stepLease.vehicleHanding.freeDelivery)
            formData.append("mortgage", `${value.stepLease.mortgage.open ? 1 : 0}`)
            formData.append("note_mortgage", value.stepLease.mortgage.value)
            if (value.stepImages.images?.length > 0) {
                value.stepImages.images.forEach((x: any, index: number) => {
                    formData.append(`image[${index}]`, x)
                })
            }
            const { data: { result, message } } = await apiAddCar(formData)
            if (result) {
                queryStateParent({ tab: 1, page: 1 })
                toastCore.success(message)
                return
            }
            toastCore.error(message)

        }
    };


    const shareProps: any = { isState, queryState, form, checkValueArray, converArray }

    return (
        <>
            <Tabs
                defaultValue={isState.step}
                onValueChange={(step) => {

                    // form.handleSubmit((values) => onSubmit(values, 'information'))()
                    // queryState({ step: 'information' })
                    if (isState.step != 'lease' && isState.step != 'images') {
                        queryState({ step: 'information' })
                    }
                }}
                value={isState.step}
                className="w-full flex flex-col gap-4">
                <TabsList className="flex items-center md:w-1/2 w-[100%] mx-auto bg-transparent  mt-10">
                    {
                        isState.step !== 'register' &&
                        <React.Fragment>
                            {dataSteps.map((e, index) => {
                                const registerTabIndex = dataSteps.findIndex(step => step.value === isState.step)
                                return <React.Fragment key={index}>
                                    <div className="">
                                        <TabsTrigger
                                            value={e.value}
                                            className={`border-2
                                        disabled:opacity-100 data-[state=active]:text-[#2FB9BD] 
                                        data-[state=active]:bg-[#2FB9BD]/20 
                                        ${(isState.step === e.value || index < registerTabIndex) ? "border-[#2FB9BD] text-[#2FB9BD]" : "border-gray-300"
                                                } rounded-full p-3 font-semibold md:text-xs text-[11px] leading-[17px] lg:size-[90px] md:size-[80px] size-[70px] cursor-default`}
                                        >
                                            {index + 1}.{e.name}
                                        </TabsTrigger>
                                    </div>

                                    {index != dataSteps.length - 1 &&
                                        <div className="w-full flex items-center">
                                            <div
                                                style={{ backgroundColor: isState.step === e.value || index < registerTabIndex ? "#2FB9BD" : "gray" }}
                                                className="h-[1px] w-full "
                                            ></div>
                                        </div>
                                    }
                                </React.Fragment>
                            })}
                        </React.Fragment>
                    }
                </TabsList>

                <div className="flex flex-col gap-6">
                    <TabsContent value="register" className="" >
                        <div className="w-full h-full flex items-center justify-center">
                            <Image src={'/profile/listMyCar/vehicleRegistration/images.png'} alt="" width={1280} height={1024} className="size-[40%] object-cover" />
                        </div>
                    </TabsContent>
                    {isState.step == 'register' &&
                        <TabsList className=" items-center w-full bg-transparent">
                            <TabsTrigger value="information"
                                className={`col-span-11 w-fit text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-8 py-4 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                                Đăng ký xe tự lái
                            </TabsTrigger>
                        </TabsList>
                    }
                    <TabsContent value="register" className="flex flex-col gap-4">
                        <h1 className="text-[#3E424E] lg:text-xl text-base font-semibold text-center">Gia tăng thu nhập từ 5-10tr/tháng cùng Kanow</h1>
                        <div className="w-full flex items-center justify-center">
                            <div className="bg-gray-100 rounded-xl shadow p-5 flex flex-col gap-2">
                                <h1 className="text-[#3E424E] text-base font-semibold text-center my-4">Thủ tục đăng ký 4 bước đơn giản & nhanh chóng:</h1>
                                <StepRegister />
                            </div>
                        </div>
                    </TabsContent>
                </div>
                <TabsContent value={"information"} className="lg:mt-4 mt-5 flex flex-col gap-4">
                    <StepInfoMation {...shareProps} />
                    <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                        <Button
                            onClick={() => form.handleSubmit((values) => onSubmit(values, 'lease'))()}
                            type="button"
                            className={`md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                            Kế tiếp
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value={'lease'} className="lg:mt-4 mt-5">
                    <StepLease {...shareProps} />
                    <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                        <Button
                            onClick={() => {
                                onScrollTop()
                                handlePrevStep()
                            }}
                            type="button"
                            className={`md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                            Quay lại
                        </Button>
                        <Button
                            onClick={() => {
                                form.handleSubmit((values) => onSubmit(values, 'images'))()
                            }}
                            type="button"
                            className={`md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                            Kế tiếp
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value={'images'} className="lg:mt-4 mt-5">
                    <StepImages {...shareProps} />
                    <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                        <Button
                            onClick={() => {
                                onScrollTop()
                                handlePrevStep()
                            }}
                            type="button"
                            className={`md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                            Quay lại
                        </Button>
                        <Button
                            onClick={() => {
                                form.handleSubmit((values) => onSubmit(values, 'submit'))()
                            }}
                            type="button"
                            className={`md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                            Đăng ký
                        </Button>
                    </div>
                </TabsContent>
            </Tabs >
        </>

    )
}

export default VehicleRegistration