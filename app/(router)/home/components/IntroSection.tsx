import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { TiLocation } from 'react-icons/ti';

import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from '@/components/datePicker/DatePickerWithRange';

const IntroSection = () => {
    const tabSearch = [
        {
            id: "232",
            name: "Xe tự lái"
        },
        {
            id: "4343",
            name: "Xe có tài xế"
        },
        {
            id: "5454",
            name: "Tìm tài xế"
        },
    ]

    const [tabId, setTabId] = useState<string>("")

    useEffect(() => {
        setTabId(tabSearch[0].id)
    }, [])

    const handleTabChange = (id: string) => {
        setTabId(id)
    }

    console.log('tabId', tabId);


    return (
        <div className='h-[100vh] w-full relative'>
            <Image
                alt="background"
                width={1920}
                height={1080}
                src="/background/cityHome.png"
                className='w-full h-auto object-contain absolute'
                priority
            />
            <Image
                alt="background"
                width={1920}
                height={1080}
                src="/background/line_background1.png"
                className='w-full h-auto object-contain absolute -bottom-[4px] drop-shadow'
                priority
            />
            <div
                className='h-[60vh]'
                style={{ background: "linear-gradient(0deg, rgba(3, 107, 116, 0.04) -75.88%, rgba(0, 0, 0, 0.00) 129.69%), rgba(194, 249, 249, 0.60)" }}
            >
                <div className='custom-container relative'>
                    <div className='text-6xl leading-tight font-bold max-w-[45%] pt-24 pb-24 capitalize'>
                        KANOW - Đồng hành mọi chuyến đi của bạn
                    </div>
                    <div className='flex flex-col w-[500px]'>
                        <div className='flex gap-[2px] items-center bg-white/0'>
                            {tabSearch && tabSearch.map((tab) => {
                                console.log('tab dsds: ', tab);

                                return (
                                    <div
                                        key={tab.id}
                                        className={`${tab.id == tabId ? "bg-white underline underline-offset-[6px] decoration-[3px] decoration-[#2FB9BD]" : "bg-[#BEE9EA] hover:bg-[#BEE9EA]/80"} px-6 py-3 text-sm text-[#585F71] font-medium rounded-t-xl cursor-pointer`}
                                        onClick={() => handleTabChange(tab.id)}
                                    >
                                        {tab.name ? tab.name : ""}
                                    </div>
                                )
                            })}
                        </div>
                        <div className='flex flex-col gap-4 bg-white w-full h-full rounded-tr-xl rounded-b-xl px-6 py-4'>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                    Địa điểm
                                </Label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                        <TiLocation className="text-xl text-[#1EAAB1]" />
                                    </span>
                                    <Input
                                        id="place"
                                        type='text'
                                        placeholder='Nhập địa điểm'
                                        className='pl-12 rounded-xl bg-[#F6F6F8]/70 border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#B4B8C5] placeholder:font-medium' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm text-[#6F7689] w-fit' htmlFor="date">
                                    Thời gian thuê
                                </Label>
                                <DatePickerWithRange className='w-full' />
                            </div>
                            <Button
                                type='button'
                                size="basic"
                                className='text-base w-full py-4 text-center uppercase text-white bg-[#FF9900] hover:bg-[#FF9900]/80 font-bold rounded-xl'
                            >
                                <span>Tìm xe</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroSection