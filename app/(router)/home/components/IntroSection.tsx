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
        <div className='xl:h-[100vh] lg:h-[80vh] h-[75dvh] w-full relative'>
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
                className='w-full h-auto object-contain absolute 3xl:-bottom-[4px] 2xl:-bottom-[20px] xxl:-bottom-[16px] xl:bottom-0 lg:-bottom-[10px] md:bottom-0 bottom-0 drop-shadow'
                priority
            />
            <div
                className='xl:h-[60vh] h-[40vh]'
                style={{ background: "linear-gradient(0deg, rgba(3, 107, 116, 0.04) -75.88%, rgba(0, 0, 0, 0.00) 129.69%), rgba(194, 249, 249, 0.60)" }}
            >
                <div className='custom-container relative'>
                    <div className='3xl:text-[3.75rem] 2xl:text-[3rem] xxl:text-[2.25rem] xl:text-[2.25rem] lg:text-[1.875rem] text-[1.5rem] font-bold max-w-[45%] 3xl:py-24 2xl:py-16 xl:py-16 py-10 capitalize leading-tight'>
                        {/* <div className='3xl:text-6xl 2xl:text-5xl xxl:text-4xl xl:text-4xl lg:text-3xl text-2xl font-bold max-w-[45%] 3xl:py-24 2xl:py-16 xl:py-16 py-10 capitalize leading-normal'> */}
                        KANOW - Đồng hành mọi chuyến đi của bạn
                    </div>
                    <div className='flex flex-col xl:w-[500px] w-[400px]'>
                        <div className='flex gap-[2px] items-center bg-white/0'>
                            {
                                tabSearch && tabSearch.map((tab) => (
                                    <div
                                        key={tab.id}
                                        className={`${tab.id == tabId ? "bg-white underline underline-offset-[6px] decoration-[3px] decoration-[#2FB9BD]" : "bg-[#BEE9EA] hover:bg-[#BEE9EA]/80"} xl:px-6 xl:py-3 px-4 py-2 text-sm text-[#585F71] font-medium rounded-t-xl cursor-pointer`}
                                        onClick={() => handleTabChange(tab.id)}
                                    >
                                        {tab.name ? tab.name : ""}
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex flex-col gap-4 bg-white w-full h-full rounded-tr-xl rounded-b-xl xl:px-6 xl:py-4 p-4'>
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
                                className='3xl:text-base text-sm w-full 3xl:py-4 xl:py-3 py-2 text-center uppercase text-white bg-[#FF9900] hover:bg-[#FF9900]/80 font-bold rounded-xl'
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