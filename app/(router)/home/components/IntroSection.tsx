import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { TiLocation } from 'react-icons/ti';

import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from '@/components/datePicker/DatePickerWithRange';
import { useResize } from '@/hooks/useResize';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt } from 'react-icons/fa';

import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useDialogAddress, useDialogCalendar } from '@/hooks/useOpenDialog';
import { vi } from 'date-fns/locale';
import { useDataHome } from '@/hooks/useDataQueryKey';

const IntroSection = () => {
    const { isVisibleMobile } = useResize()
    const router = useRouter()
    const { dateReal, numberDay, setOpenDialogCalendar } = useDialogCalendar()
    const { setOpenDialogAddress, valueAddress } = useDialogAddress()

    const { isStateDataHome, queryKeyIsStateDataHome } = useDataHome()

    const tabSearch = [
        {
            id: "232",
            name: "Xe tự lái",
            icon_active: "/icon/home/icon_car_active_1.png",
            icon_no_active: "/icon/home/icon_car_no_active_1.png",
            type: "list-cars-autonomous",
        },
        {
            id: "4343",
            name: "Xe có tài xế",
            icon_active: "/icon/home/icon_car_active_2.png",
            icon_no_active: "/icon/home/icon_car_no_active_2.png",
            type: "list-cars-driver",
        },
        {
            id: "5454",
            name: "Tìm tài xế",
            icon_active: "/icon/home/icon_car_active_3.png",
            icon_no_active: "/icon/home/icon_car_no_active_3.png",
            type: "search-driver",
        },
    ]

    useEffect(() => {
        queryKeyIsStateDataHome({
            ...isStateDataHome,
            tabSearch: {
                tabId: tabSearch[0].id,
                type: tabSearch[0].type
            }
        })
    }, [])

    const handleTabChange = (item: any) => {
        queryKeyIsStateDataHome({
            ...isStateDataHome,
            tabSearch: {
                tabId: item.id,
                type: item.type
            }
        })
    }

    const handleOpenDialog = (type: string) => {
        if (type === 'calendar') {
            setOpenDialogCalendar(true)
        }
    };

    const handleSearchCar = () => {
        if (isStateDataHome.tabSearch.type === 'list-cars-autonomous') {
            router.push('/list-cars-autonomous')
        } else if (isStateDataHome.tabSearch.type === 'list-cars-driver') {
            router.push('/list-cars-driver')
        } else if (isStateDataHome.tabSearch.type === 'search-driver') {
            router.push('/search-driver')
        }
    }

    var heroTitle: string = "KANOW - Đồng hành mọi chuyến đi của bạn";
    var heroPerTitle: { letter: string, id: number }[] = heroTitle.split('').map((letter, index) => ({ letter: letter, id: index + 1 }));

    return (
        <div className='xl:h-[100vh] lg:h-[80vh] md:h-[80svh] h-[100svh] w-full relative '>
            {
                isVisibleMobile ?
                    <>
                        <Image
                            alt="background"
                            width={1920}
                            height={1080}
                            src="/background/cityHomeMobile.png"
                            className='w-full h-auto object-contain absolute'
                            priority
                        />
                        <Image
                            alt="background"
                            width={1920}
                            height={1080}
                            src="/background/line_background_mobile1.png"
                            className='w-full h-auto object-contain absolute -bottom-8 drop-shadow'
                            priority
                        />
                    </>
                    :
                    <>
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
                    </>
            }
            <div
                className='xl:h-[60vh] h-[40vh]'
                style={{ background: "linear-gradient(0deg, rgba(3, 107, 116, 0.04) -75.88%, rgba(0, 0, 0, 0.00) 129.69%), rgba(194, 249, 249, 0.60)" }}
            >
                <div className='custom-container relative'>
                    <div className='3xl:text-[3.75rem] 2xl:text-[3rem] xxl:text-[2.25rem] xl:text-[2.25rem] lg:text-[1.875rem] md:text-[1.5rem] text-[2rem] font-bold md:max-w-[45%] max-w-full 3xl:py-24 2xl:py-16 xl:py-16 py-10 capitalize leading-tight'>
                        {/* KANOW - Đồng hành mọi chuyến đi của bạn */}
                        {
                            heroPerTitle.map(e => (
                                <span
                                    key={e.id.toString()}
                                    data-aos="fade-up"
                                    data-aos-delay={`${e.letter !== "" && e.id * 50}`}>
                                    {e.letter}
                                </span>
                            ))
                        }
                    </div>
                    <div className='flex flex-col xl:w-[500px] md:w-[400px] w-full'>
                        <div className='flex gap-[2px] items-center bg-white/0'>
                            {
                                tabSearch && tabSearch.map((tab) => (
                                    <div
                                        key={tab.id}
                                        className={`${tab.id == isStateDataHome.tabSearch.tabId ? "bg-white" : "bg-[#BEE9EA] hover:bg-[#BEE9EA]/80"} caret-transparent flex items-center gap-2 xl:px-6 xl:py-3 px-4 py-2 rounded-t-xl cursor-pointer`}
                                        // className={`${tab.id == isStateDataHome.tabSearch.tabId ? "bg-white underline underline-offset-[6px] decoration-[3px] decoration-[#2FB9BD]" : "bg-[#BEE9EA] hover:bg-[#BEE9EA]/80"} flex items-center gap-2 xl:px-6 xl:py-3 px-4 py-2 rounded-t-xl cursor-pointer`}
                                        onClick={() => handleTabChange(tab)}
                                    >
                                        <div className='relative flex gap-1 items-center w-fit'>
                                            <div className='w-5 h-full'>
                                                <Image
                                                    alt="icon_active"
                                                    src={tab.id == isStateDataHome.tabSearch.tabId ? (tab.icon_active ? tab.icon_active : "/default/default.png") : (tab.icon_no_active ? tab.icon_no_active : "/default/default.png")}
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            <div className='text-sm text-[#585F71] font-medium'>
                                                {tab.name ? tab.name : ""}
                                            </div>

                                            {tab.id == isStateDataHome.tabSearch.tabId && (
                                                <div className="absolute -bottom-2 left-0 right-0 h-[3px] w-full bg-[#2FB9BD]"></div>
                                            )}
                                        </div>
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
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <TiLocation className="text-xl text-[#1EAAB1]" />
                                    </span>
                                    <div
                                        id="place"
                                        onClick={() => setOpenDialogAddress(true)}
                                        className='pl-10  cursor-pointer pr-2 py-3 w-full 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 border-0 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                    >
                                        {valueAddress ? valueAddress : 'Chọn địa điểm'}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm text-[#6F7689] w-fit' htmlFor="date">
                                    Thời gian thuê
                                </Label>
                                {/* <DatePickerWithRange className='w-full' classNameButton="px-4 py-3" /> */}

                                <div className=''>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            `3xl:py-4 3xl:px-3 px-3 py-3.5 w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs`,
                                            !dateReal && "text-muted-foreground"
                                        )}
                                        onClick={() => handleOpenDialog('calendar')}
                                    >
                                        <FaCalendarAlt className="3xl:mr-4 mr-2 3xl:text-lg text-base text-[#1EAAB1]" />
                                        {dateReal?.from ? (
                                            dateReal.to ? (
                                                <>
                                                    {format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                                    {format(dateReal.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                                </>
                                            ) : (
                                                format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
                                            )
                                        ) : (
                                            <span className='text-[#B4B8C5] font-medium 3xl:text-base text-sm'>Chọn ngày</span>
                                        )}
                                    </Button>
                                </div>

                            </div>


                            <Button
                                type='button'
                                size="basic"
                                className='3xl:text-base text-sm w-full 3xl:py-4 xl:py-3 py-2 text-center uppercase text-white bg-[#FF9900] hover:bg-[#FF9900]/80 font-bold rounded-xl caret-transparent'
                                onClick={() => handleSearchCar()}
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