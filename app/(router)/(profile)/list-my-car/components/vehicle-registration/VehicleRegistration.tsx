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
import React, { useState } from "react"
import { StepRegister } from "./components/StepRegister"
import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment"
import { toastCore } from "@/lib/toast"
import { useForm } from "react-hook-form"

type Props = {

}

const VehicleRegistration = (props: Props) => {
    const initialState: any = {
        tab: "register"
    }

    const form = useForm({
        defaultValues: {
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
        }
    })

    const [isState, setIsState] = useState(initialState)

    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    return (
        <>
            <Tabs defaultValue={isState.tab}
                onValueChange={(value) => {
                    queryState({ tab: value })
                }}
                className="w-full">
                <TabsList className="grid grid-cols-12 items-center w-full bg-transparent">
                    {
                        isState.tab !== 'register' &&
                        <React.Fragment>
                            <TabsTrigger value="information"
                                disabled
                                className={`col-span-2 w-full 
                                    border-2 disabled:opacity-100 data-[state=active]:text-[#2FB9BD] data-[state=active]:bg-[#2FB9BD]/20  ${isState.tab == "lease" || isState.tab == "images" || isState.tab == "information" ? "border-[#2FB9BD] text-[#2FB9BD]" : "border-gray-500"} rounded-full px-6 py-3 font-semibold text-sm leading-[17px]`}>
                                Thông tin
                            </TabsTrigger>
                            <div className="col-span-3 w-full">
                                <div style={{
                                    backgroundColor: `${isState.tab == "lease" || isState.tab == "images" ? "#2FB9BD" : "gray"}`,
                                }} className="h-[2px] w-full"></div>
                            </div>
                            <TabsTrigger value="lease"
                                disabled
                                className={`col-span-2 w-full
                                    border-2 disabled:opacity-100 data-[state=active]:text-[#2FB9BD] data-[state=active]:bg-[#2FB9BD]/20 ${isState.tab == "lease" || isState.tab == "images" ? "border-[#2FB9BD] text-[#2FB9BD]" : "border-gray-500"} rounded-full px-6 py-3 font-semibold text-sm leading-[17px]`}>
                                Cho thuê
                            </TabsTrigger>
                            <div className="col-span-3 w-full">
                                <div style={{
                                    backgroundColor: `${isState.tab == "images" ? "#2FB9BD" : "gray"}`,
                                }} className="h-[2px] w-full"></div>
                            </div>
                            <TabsTrigger value="images"
                                disabled
                                className='col-span-2 w-full 
                                    border-2 disabled:opacity-100 data-[state=active]:text-[#2FB9BD] data-[state=active]:bg-[#2FB9BD]/20 border-gray-500 rounded-full px-6 py-3 font-semibold text-sm leading-[17px]'>
                                Hình ảnh
                            </TabsTrigger>
                        </React.Fragment>
                    }
                </TabsList>

                <div className="flex flex-col gap-6">
                    <TabsContent value="register" className="" >
                        <div className="w-full h-full flex items-center justify-center">
                            <Image src={'/profile/listMyCar/vehicleRegistration/images.png'} alt="" width={1280} height={1024} className="size-[40%] object-cover" />
                        </div>
                    </TabsContent>
                    {isState.tab == 'register' &&
                        <TabsList className=" items-center w-full bg-transparent">
                            <TabsTrigger value="information"
                                className={`col-span-11 w-fit text-white border-[#2FB9BD] rounded-xl
                                    border-2 px-8 py-4 bg-[#2FB9BD] font-semibold text-sm leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
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
                <TabsContent value="information" className="lg:mt-4 mt-5">
                    <UnderDevelopment />
                </TabsContent>
                <TabsContent value="lease" className="lg:mt-4 mt-5">
                    <UnderDevelopment />
                </TabsContent>
                <TabsContent value="images" className="lg:mt-4 mt-5">
                    <UnderDevelopment />
                </TabsContent>
            </Tabs>
        </>

    )
}

export default VehicleRegistration