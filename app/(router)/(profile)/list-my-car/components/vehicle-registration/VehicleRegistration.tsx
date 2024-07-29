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
import { useDataProfileMyCar } from "@/hooks/useDataQueryKey"
type Props = {
}


const VehicleRegistration = ({ }: Props) => {
    const { isStateProfileMyCar, queryKeyIsStateProfileMyCar } = useDataProfileMyCar()
    const { openBoxSearch } = useDialogAddress()

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
                // mẫu xe
                sampleCar: "",
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
                    open: true,
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

    const [isStateChild, setIsStateChild] = useState(initialState)

    const { apiAddCar } = apiMyCar()

    const queryStateChild = (key: any) => setIsStateChild((prev: any) => ({ ...prev, ...key }))


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
        const currentIndex = dataSteps.findIndex(x => x.value === isStateChild.step);
        if (currentIndex > 0) {
            const prevStep = dataSteps[currentIndex - 1].value;
            queryStateChild({ step: prevStep });
        }
    };

    const onScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    const onSubmit = async (value: any, step?: string) => {
        if (step != 'submit') {
            const currentIndex = dataSteps.findIndex(x => x.value === isStateChild.step);
            const nextIndex = dataSteps.findIndex(x => x.value === step);

            if (currentIndex === 0 && nextIndex === dataSteps.length - 1) {
                // Ngăn chặn chuyển từ tab "infomation" đến tab cuối cùng
                return;
            }
            if (currentIndex === dataSteps.length - 1) {
                handlePrevStep();
                return;
            }
            onScrollTop()
            queryStateChild({ step });
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
            formData.append("model_car_id", value.stepInformation.sampleCar)
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
                queryKeyIsStateProfileMyCar({ tab: 1, page: 1 })
                toastCore.success(message)
                return
            }
            toastCore.error(message)

        }
    };

    // useEffect(() => {
    //     if (isStateProfileMyCar.tab != 4) return
    //     var element = document.getElementById('infomation');
    //     if (element && typeof element !== 'undefined') {
    //         element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //     }
    // }, [isStateProfileMyCar.tab])

    const shareProps: any = { isStateChild, queryStateChild, form, checkValueArray, converArray }

    return (
        <>
            <Tabs
                defaultValue={isStateChild.step}
                onValueChange={(step) => {

                    // form.handleSubmit((values) => onSubmit(values, 'information'))()
                    // queryStateChild({ step: 'information' })
                    if (isStateChild.step != 'lease' && isStateChild.step != 'images') {
                        queryStateChild({ step: 'information' })
                    }
                }}
                value={isStateChild.step}
                className="w-full h-full">
                {isStateChild.step !== 'register' &&
                    <TabsList className={`flex items-center lg:w-1/2 md:w-[75%] w-[100%] mx-auto bg-transparent  ${isStateChild.step != 'register' ? 'mt-10' : ''}`}>
                        {dataSteps.map((e, index) => {
                            const registerTabIndex = dataSteps.findIndex(step => step.value === isStateChild.step)
                            return <React.Fragment key={index}>
                                <div className="relative">
                                    <TabsTrigger
                                        value={e.value}
                                        className={`border-2
                                        disabled:opacity-100 data-[state=active]:text-[#2FB9BD] 
                                        data-[state=active]:bg-[#2FB9BD]/20 
                                        ${(isStateChild.step === e.value || index < registerTabIndex) ? "border-[#2FB9BD] text-[#2FB9BD]" : "border-[#9ca3af] text-[#9ca3af]"}
                                                } rounded-full p-3 font-semibold md:text-xl text-lg leading-[17px] lg:size-[70px] md:size-[60px] size-[65px] cursor-default`}
                                    >
                                        {index + 1}
                                    </TabsTrigger>
                                    <h1 className={`${(isStateChild.step === e.value || index < registerTabIndex) ? " text-[#2FB9BD]" : "text-[#9ca3af]"
                                        } uppercase whitespace-nowrap block absolute -bottom-[40%] ${index != 0 ? 'left-1/2' : 'left-[45%]'} -translate-x-1/2 w-full text-center lg:text-sm md:text-xs text-[11px] font-semibold`}>{e.name}</h1>
                                </div>

                                {index != dataSteps.length - 1 &&
                                    <div className="w-full flex items-center">
                                        <div
                                            style={{ backgroundColor: isStateChild.step === e.value || index < registerTabIndex ? "#2FB9BD" : "#9ca3af" }}
                                            className="h-[1px] w-full "
                                        ></div>
                                    </div>
                                }

                            </React.Fragment>
                        })}
                    </TabsList>
                }
                <TabsContent value="register" className="lg:mt-10 mt-8 flex flex-col gap-4 ">
                    {isStateChild.step == 'register' &&
                        <TabsList id="information" className=" items-center w-full bg-transparent">
                            <TabsTrigger value="information"
                                className={`col-span-11 w-fit text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-8 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                                Đăng ký xe tự lái
                            </TabsTrigger>
                        </TabsList>
                    }
                    <h1 className="text-[#3E424E] lg:text-xl text-base font-semibold md:text-center text-start">Gia tăng thu nhập hàng tháng ngay với KANOW!</h1>
                    <div className="w-full flex items-center justify-center">
                        <div className="bg-gray-100 rounded-xl shadow p-5 flex flex-col gap-2">
                            <h1 className="text-[#3E424E] text-base font-semibold md:text-center text-start my-4">Thủ tục đăng ký 4 bước đơn giản & nhanh chóng:</h1>
                            <StepRegister />
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value={"information"} className="lg:mt-4 mt-5 flex flex-col gap-4">
                    <StepInfoMation {...shareProps}>
                        <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                            <Button
                                onClick={() => form.handleSubmit((values) => onSubmit(values, 'lease'))()}
                                type="button"
                                className={`md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                                Kế tiếp
                            </Button>
                        </div>
                    </StepInfoMation>
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
                            disabled={openBoxSearch}
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
                            disabled={openBoxSearch}
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