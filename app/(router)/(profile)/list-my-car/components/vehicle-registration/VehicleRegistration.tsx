"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { StepRegister } from "./components/StepRegister"
import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment"
import { toastCore } from "@/lib/toast"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { useSignal } from '@preact/signals-react';
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronsUpDown } from "lucide-react"
import SelectCombobox from "@/components/combobox/SelectCombobox"
import { MdNavigateNext } from "react-icons/md";
import { GrLinkNext } from "react-icons/gr";
import { ISteps, IVehicleRegistration } from "@/types/Profile/mycar/IMyCar"
import StepInfoMation from "./components/StepInfoMation"
import { id } from "date-fns/locale"
import apiMyCar from "@/services/profile/listMyCar/listMyCar.services"

type Props = {

}


const VehicleRegistration = (props: Props) => {

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
        stateInformation: {
            openCarCompany: false,
            openCarModel: false,
            openSeats: false,
            openYearOfManufacture: false,
            openMove: false,
            openFeuelType: false,
            dataCarCompany: [],
            dataCarModel: [],
            dataSeats: [],
            dataYearOfManufacture: [],
            dataMove: [],
            dataFeuelType: [],
            dataFeature: [],
        }
    }

    const form = useForm({
        defaultValues: {
            stepInformation: {
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
                // chueyern động
                move: "",
                // Loại nhiên liệu,
                feuelType: "",
                // Mức tiêu thụ nhiên nhiệu
                fuelConsumptionLevel: "",
                // mô tả
                describe: "",
                // tính năng
                feature: [],
            }
        }
    })

    const { apiListFeature } = apiMyCar()

    const [isState, setIsState] = useState(initialState)

    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))


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


    const fetListFeature = async () => {
        try {
            // const { data } = await apiListFeature()
            // if (data?.data) {
            //     console.log("Res", data?.data);
            //     queryState({
            //         stateInformation: {
            //             ...isState.stateInformation,
            //             dataFeature: data?.data
            //         }
            //     })
            // }
        } catch (error) {
            throw error

        }

    }



    const onSubmit = async (value: any, step: string) => {
        console.log("value", value);
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
    };

    useEffect(() => {
        fetListFeature()
    }, [])

    return (
        <>
            <Tabs defaultValue={isState.step}
                onValueChange={(step) => { form.handleSubmit((values) => onSubmit(values, step))() }}
                value={isState.step}
                className="w-full flex flex-col gap-4">
                <TabsList className="flex items-center w-full bg-transparent  mt-10">
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
                                        ${(isState.step === e.value || index < registerTabIndex) ? "border-[#2FB9BD] text-[#2FB9BD]" : "border-gray-500"
                                                } rounded-full p-3 font-semibold text-xs leading-[17px] lg:size-[90px] md:size-[80px] size-[70px]`}
                                        >
                                            {e.name}
                                        </TabsTrigger>
                                    </div>

                                    {index != dataSteps.length - 1 &&
                                        <div className="w-full flex items-center">
                                            <div
                                                style={{ backgroundColor: isState.step === e.value || index < registerTabIndex ? "#2FB9BD" : "gray" }}
                                                className="h-[2px] w-full "
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
                    <StepInfoMation form={form} isState={isState} queryState={queryState} />
                    <div className="flex items-center justify-end gap-2 mt-2">
                        <Button
                            onClick={() => form.handleSubmit((values) => onSubmit(values, 'lease'))()}
                            type="button"
                            className={`w-fit text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                            Kế tiếp
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value={'lease'} className="lg:mt-4 mt-5">
                    <UnderDevelopment />
                    <div className="flex items-center justify-end gap-2 mt-2">
                        <Button
                            onClick={() => handlePrevStep()}
                            type="button" value="information"
                            className={`w-fit text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                            Quay lại
                        </Button>
                        <Button
                            onClick={() => {
                                form.handleSubmit((values) => onSubmit(values, 'images'))()
                            }}
                            type="button"
                            className={`w-fit text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                            Kế tiếp
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value={'images'} className="lg:mt-4 mt-5">
                    <UnderDevelopment />
                    <div className="flex items-center justify-end gap-2 mt-2">
                        <Button
                            onClick={() => handlePrevStep()}
                            type="button" value="information"
                            className={`w-fit text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-10 py-3 bg-[#2FB9BD] font-semibold lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
                            Quay lại
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </>

    )
}

export default VehicleRegistration