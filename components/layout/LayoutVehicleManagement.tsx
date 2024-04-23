'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import React, { Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Image from 'next/image'

import { useResize } from '@/hooks/useResize'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { SelectItemNocheck } from '../ui/selectNocheck'
import { useAlertDialogLogout } from '@/hooks/useAlertDialog'
import { Separator } from '../ui/separator'
import { FaCalendarAlt, FaCarSide, FaRegImage, FaSuitcase } from 'react-icons/fa'
import { FileImage } from 'lucide-react'
import { BsCardHeading } from 'react-icons/bs'
import { MdOutlinePriceChange } from 'react-icons/md'
import { IoIosSettings } from 'react-icons/io'
import { GrMap } from "react-icons/gr";
import { TbReportMoney } from 'react-icons/tb'
import { IoNewspaperOutline } from 'react-icons/io5'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Switch } from '../ui/switch'
import { useForm } from 'react-hook-form'

const LayoutVehicleManagement = ({
    children
}: {
    children: React.ReactNode
}) => {
    const href = usePathname()

    const param = useSearchParams()

    const id = param.get('id')

    const pathname = `${href}?id=${id}`

    const router = useRouter()

    const { informationUser } = useAuth()

    const { isVisibleTablet } = useResize()

    const [isMounted, setIsMounted] = useState<boolean>(false)

    const initialState = {
        tab: 1,
        isLoading: false,
    }

    const [isState, sIsState] = useState<any>(initialState)

    const queryState = (key: any) => sIsState((prev: any) => ({ ...prev, ...key }))

    const listNavbar = [
        {
            id: 1,
            lable: 'Thông tin chung',
            list: [
                {
                    id: 1,
                    name: 'Thông tin',
                    link: `/vehicle-management/information?id=${id}`,
                    icon: <FaCarSide className='size-full' />,
                },
                {
                    id: 2,
                    name: 'Hình ảnh',
                    link: `/vehicle-management/images?id=${id}`,
                    icon: <FaRegImage className='size-full' />,
                },
                {
                    id: 3,
                    name: 'Giấy tờ xe',
                    link: `/vehicle-management/registration?id=${id}`,
                    icon: <BsCardHeading className='size-full' />,
                },
                {
                    id: 4,
                    name: 'Quản lý chuyến',
                    link: `/vehicle-management/trip?id=${id}`,
                    icon: <FaSuitcase className='size-full' />,
                },
            ]

        },
        {
            id: 2,
            lable: 'Cho thuê tự lái',
            list: [
                {
                    id: 1,
                    name: 'Giá cho thuê',
                    link: `/vehicle-management/self-rental-price?id=${id}`,
                    icon: <MdOutlinePriceChange className='size-full' />,
                },
                {
                    id: 2,
                    name: 'Thiết lập thời gian cho thuê',
                    link: `/vehicle-management/self-set-time?id=${id}`,
                    icon: <IoIosSettings className='size-full' />,
                },
                {
                    id: 3,
                    name: 'Lịch xe',
                    link: `/vehicle-management/self-calendar?id=${id}`,
                    icon: <FaCalendarAlt className='size-full' />,
                },
                {
                    id: 4,
                    name: 'Giao xe tận nơi',
                    link: `/vehicle-management/selt-vehicle-handing?id=${id}`,
                    icon: <GrMap className='size-full' />,
                },
                {
                    id: 5,
                    name: 'Phụ phí',
                    link: `/vehicle-management/self-surcharge?id=${id}`,
                    icon: <TbReportMoney className='size-full' />,
                },
                {
                    id: 6,
                    name: 'Thủ tục cho thuê',
                    link: `/vehicle-management/selt-procedure?id=${id}`,
                    icon: <IoNewspaperOutline className='size-full' />,
                },
            ]
        },
        {
            id: 3,
            lable: 'Cho thuê có tài xế',
            list: [
                {
                    id: 11,
                    name: 'Giá cho thuê',
                    link: `/vehicle-management/talented-rental-price?id=${id}`,
                    icon: <MdOutlinePriceChange className='size-full' />,
                },
                {
                    id: 12,
                    name: 'Thiết lập thời gian cho thuê',
                    link: `/vehicle-management/talented-set-time?id=${id}`,
                    icon: <IoIosSettings className='size-full' />,
                },
                {
                    id: 13,
                    name: 'Lịch xe',
                    link: `/vehicle-management/talented-calendar?id=${id}`,
                    icon: <FaCalendarAlt className='size-full' />,
                },
                {
                    id: 14,
                    name: 'Đưa đón tận nơi',
                    link: `/vehicle-management/talented-shuttle?id=${id}`,
                    icon: <GrMap className='size-full' />,
                },
                {
                    id: 15,
                    name: 'Thủ tục cho thuê',
                    link: `/vehicle-management/talented-procedure?id=${id}`,
                    icon: <IoNewspaperOutline className='size-full' />,
                },
            ]
        },
    ]

    const form = useForm({
        defaultValues: {
            openSelf: false,
            openTalented: false,
        }
    })

    console.log(['openSelf', 'openTalented'].map((e: any) => {
        return form.getValues(e)
    }));


    useEffect(() => {
        setIsMounted(true)
        queryState({ isLoading: true })
        setTimeout(() => {
            queryState({ isLoading: false })
        }, 500)
    }, [])

    const handleChangeSidebar = (value: any) => {
        router.push(value)
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className='bg-[#F6F6F8]'>
            <div className='w-full max-w-full bg-white/80'>
                <div className='space-x-1 text-start 3xl:text-4xl md:text-3xl text-2xl font-bold text-[#101010] 3xl:py-8 py-6 custom-container'>
                    <span>Xin chào</span>
                    <span className='capitalize text-[#2FB9BD]'>
                        {informationUser?.fullname}!
                    </span>
                </div>
            </div>
            <div className='flex flex-col custom-container py-8'>
                <div className='grid grid-cols-12 xxl:gap-6 xl:gap-4 gap-8'>
                    <div className='xl:col-span-2 lg:col-span-3 col-span-12 flex flex-col 2xl:gap-6 gap-4'>
                        {isVisibleTablet ?
                            <Select
                                value={pathname ? pathname : ""}
                                onValueChange={(value) => handleChangeSidebar(value)}
                            >
                                <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                                    <SelectValue placeholder="Chọn giờ nhận xe" />
                                </SelectTrigger>
                                <SelectContent>
                                    {listNavbar.map((e) => {
                                        return (
                                            <SelectGroup key={`e-${e.id}`}>
                                                <SelectLabel className='flex justify-between'>
                                                    <h1>{e.lable}</h1>
                                                    {e.id != 1 ?
                                                        <Form {...form}>
                                                            <FormField
                                                                control={form.control}
                                                                name={`${e.id == 2 ? "openSelf" : "openTalented"}`}
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem className="">
                                                                            <FormControl>
                                                                                <div className="">
                                                                                    <Switch
                                                                                        className="data-[state=checked]:bg-[#2FB9BD] "
                                                                                        checked={field.value}
                                                                                        onCheckedChange={field.onChange}
                                                                                    />
                                                                                </div>
                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )
                                                                }}
                                                            />
                                                        </Form> : null
                                                    }

                                                </SelectLabel>
                                                {e.list && e.list.map((item) => (
                                                    <SelectItemNocheck
                                                        key={`item-${item.id}`}
                                                        value={`${item.link}`}
                                                        className='flex flex-row items-center'
                                                    >
                                                        <div
                                                            className='flex items-center gap-3 cursor-pointer w-fit hover:opacity-90 duration-200 transition'
                                                        >
                                                            <div className={`${pathname === item.link ? "text-[#1EAAB1]" : "text-[#383A43]"} size-5`}>
                                                                {item.icon}
                                                            </div>
                                                            <div className={`${pathname === item.link ? "text-[#1EAAB1]" : "text-[#383A43]"} 3xl:text-sm text-xs font-semibold`}>
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                    </SelectItemNocheck>
                                                ))}
                                            </SelectGroup>
                                        )
                                    })}

                                </SelectContent>
                            </Select>
                            : listNavbar.map((e, index) => {
                                return (
                                    <div key={`e-${e.id}`} className=''>
                                        <div className='flex flex-col gap-3 caret-transparent'>
                                            <div className='xxl:text-xs text-[11px] uppercase font-semibold text-[#6F7689] flex items-center justify-between'>
                                                <h1>{e.lable}</h1>
                                                {e.id != 1 ?
                                                    <Form {...form}>
                                                        <FormField
                                                            control={form.control}
                                                            name={`${e.id == 2 ? "openSelf" : "openTalented"}`}
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem className="">
                                                                        <FormControl>
                                                                            <div className="">
                                                                                <Switch
                                                                                    className="data-[state=checked]:bg-[#2FB9BD] "
                                                                                    checked={field.value}
                                                                                    onCheckedChange={field.onChange}
                                                                                />
                                                                            </div>
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    </Form> : null
                                                }
                                            </div>
                                            <div className='flex flex-col gap-4'>
                                                {e.list?.map((item) => {
                                                    return <Link
                                                        key={`item-${item.id}`}
                                                        href={item.link}
                                                        className='flex items-center gap-3 cursor-pointer w-fit hover:opacity-90 duration-200 transition'
                                                    >
                                                        <div className={`${pathname === item.link ? "text-[#1EAAB1]" : "text-[#383A43]"} size-5`}>
                                                            {item.icon}
                                                        </div>
                                                        <div className={`${pathname === item.link ? "text-[#1EAAB1]" : "text-[#383A43]"} 3xl:text-sm text-xs font-semibold`}>
                                                            {item.name}
                                                        </div>
                                                    </Link>
                                                })
                                                }
                                            </div>
                                            {index != listNavbar.length - 1 ? <Separator orientation='horizontal' className='my-3' /> : null}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='xl:col-span-10 lg:col-span-9 col-span-12 w-full h-auto'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutVehicleManagement