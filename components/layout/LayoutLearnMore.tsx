'use client'

import { useResize } from '@/hooks/useResize'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    SelectNocheck,
    SelectContentNocheck,
    SelectGroupNocheck,
    SelectItemNocheck,
    SelectTriggerNocheck,
    SelectValueNocheck
} from '../ui/selectNocheck'

const LayoutLearnMore = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const { isVisibleTablet } = useResize()
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const pathname = usePathname()

    const tabsNavigation = [
        {
            id: '1',
            title: "Chính sách huỷ chuyến",
            link: "/cancel-policy"
        },
        {
            id: '2',
            title: "Hướng dẫn đặt xe",
            link: "/book-guide"
        },
        {
            id: '3',
            title: "Hướng dẫn thanh toán",
            link: "/payment-guide"
        },
        {
            id: '4',
            title: "Câu hỏi thường gặp",
            link: "/faq"
        },
    ]

    const handleChangeTab = (value: string) => {
        router.push(value)
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className='flex flex-col lg:gap-20 md:gap-16 gap-10 custom-container'>
            <div className="w-full lg:h-[50vh] md:h-[50dvh] h-[30dvh] bg-[url('/policy/banner_supercar.jpg')] bg-cover bg-center rounded-xl flex justify-center items-center">
                <div className='3xl:text-6xl md:text-5xl text-3xl text-white font-semibold'>
                    Chính sách & quy định
                </div>
            </div>
            <div className='grid grid-cols-5 gap-6'>
                <div className='lg:col-span-1 col-span-5 flex flex-col w-full h-full'>
                    {
                        isVisibleTablet
                            ?
                            <SelectNocheck
                                onValueChange={(value) => handleChangeTab(value)}
                                defaultValue={`${pathname}`}
                            >

                                <div className='w-full flex justify-center'>
                                    <SelectTriggerNocheck className="max-w-[80%] focus:outline-none focus:ring-0 focus:ring-offset-0">
                                        <SelectValueNocheck placeholder="Chọn giờ nhận xe" />
                                    </SelectTriggerNocheck>
                                </div>
                                <SelectContentNocheck>
                                    <SelectGroupNocheck>
                                        {
                                            tabsNavigation && tabsNavigation.map((tab) => (
                                                <SelectItemNocheck
                                                    key={tab.id}
                                                    value={tab.link}
                                                    className='flex flex-row items-center'
                                                >
                                                    {tab.title}
                                                </SelectItemNocheck>
                                            ))
                                        }
                                    </SelectGroupNocheck>
                                </SelectContentNocheck>
                            </SelectNocheck>
                            :

                            tabsNavigation && tabsNavigation.map((tab) => (
                                <div key={tab.id} className='w-full flex flex-col gap-1'>
                                    <Link
                                        href={`${tab.link}`}
                                        className={`${pathname === tab.link ? "bg-[#2FB9BD] text-white rounded-r-3xl font-medium" : "font-light hover:scale-[1.01] hover:font-medium"} w-fit 2xl:text-base text-sm xxl:px-6 xl:px-4 px-2 py-3 `}
                                    >
                                        {tab.title ? tab.title : ""}
                                    </Link>
                                </div>
                            ))

                    }

                </div>
                <div className='lg:col-span-4 col-span-5 w-full h=full'>
                    {children}
                </div>
            </div>
        </div>


    )
}

export default LayoutLearnMore