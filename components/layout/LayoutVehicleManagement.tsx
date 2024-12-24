'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


import { useResize } from '@/hooks/useResize'
import { useVehicleManage } from '@/hooks/useVehicleManage'
import apiVehicleCommon from '@/services/vehicle-management/vehicle-common.services'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { SelectItemNocheck } from '../ui/selectNocheck'
import { Separator } from '../ui/separator'
import { Switch } from '../ui/switch'
import { toastCore } from '@/lib/toast'
import { useDialogCalendar } from '@/hooks/useOpenDialog'
import toast from 'react-hot-toast'

const LayoutVehicleManagement = ({ children }: { children: React.ReactNode }) => {
    const href = usePathname()

    const param: ReadonlyURLSearchParams = useSearchParams()

    const id: string | null = param.get("key") || ''

    const type: string | null = param.get("t") || ''

    const pathname: string = `${href}?key=${id}&t=${type}`

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
                    link: `/vehicle-management/information?key=${id}&t=0`,
                    icon: 'infomation.png',
                },
                {
                    id: 2,
                    name: 'Hình ảnh',
                    link: `/vehicle-management/images?key=${id}&t=0`,
                    icon: 'images.png',
                },
                {
                    id: 3,
                    name: 'Giấy tờ xe',
                    link: `/vehicle-management/registration?key=${id}&t=0`,
                    icon: 'registration.png',
                },
                {
                    id: 4,
                    name: 'Quản lý chuyến',
                    link: `/vehicle-management/trip?key=${id}&t=0`,
                    icon: 'trip.png',
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
                    link: `/vehicle-management/self-rental-price?key=${id}&t=1`,
                    icon: 'rental-price.png',
                },
                {
                    id: 2,
                    name: 'Thiết lập thời gian cho thuê',
                    link: `/vehicle-management/self-set-time?key=${id}&t=1`,
                    icon: 'set-time.png',
                },
                {
                    id: 3,
                    name: 'Lịch xe',
                    link: `/vehicle-management/self-calendar?key=${id}&t=1`,
                    icon: 'calendar.png',
                },
                {
                    id: 4,
                    name: 'Giao xe tận nơi',
                    link: `/vehicle-management/selt-vehicle-handing?key=${id}&t=1`,
                    icon: 'vehicle-handing.png',
                },
                {
                    id: 5,
                    name: 'Phụ phí',
                    link: `/vehicle-management/self-surcharge?key=${id}&t=1`,
                    icon: 'surcharge.png',
                },
                {
                    id: 6,
                    name: 'Thủ tục cho thuê',
                    link: `/vehicle-management/selt-procedure?key=${id}&t=1`,
                    icon: 'procedure.png',
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
                    link: `/vehicle-management/talented-rental-price?key=${id}&t=2`,
                    icon: 'rental-price.png',
                },
                {
                    id: 12,
                    name: 'Thiết lập thời gian cho thuê',
                    link: `/vehicle-management/talented-set-time?key=${id}&t=2`,
                    icon: 'set-time.png',
                },
                {
                    id: 13,
                    name: 'Lịch xe',
                    link: `/vehicle-management/talented-calendar?key=${id}&t=2`,
                    icon: 'calendar.png',
                },
                {
                    id: 14,
                    name: 'Đưa đón tận nơi',
                    link: `/vehicle-management/talented-shuttle?key=${id}&t=2`,
                    icon: 'vehicle-handing.png',
                },
                {
                    id: 15,
                    name: 'Phụ phí',
                    link: `/vehicle-management/talented-surcharge?key=${id}&t=2`,
                    icon: 'surcharge.png',
                },
                {
                    id: 16,
                    name: 'Thủ tục cho thuê',
                    link: `/vehicle-management/talented-procedure?key=${id}&t=2`,
                    icon: 'procedure.png',
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

    const { apiDetailCar, apiListOtherAmenitiesCar, apiOpenSwitchLayout, apiRentCostPropose } = apiVehicleCommon()

    const { dataDetail, setIdCar, setDataDetail, setDataOther, dataOther } = useVehicleManage()

    const fetchData = async () => {
        const { data: db } = await apiDetailCar(id, { type: -1, car_owner: 1 })
        // const { data: db } = await apiDetailCar(id, { type: 1, car_owner: 1 })
        const { data: { other, dtFee, other_talent } } = await apiListOtherAmenitiesCar()

        if (other || dtFee || other_talent) {
            setDataOther({ other, dtFee, other_talent })
        }
        if (!Array.isArray(db?.data)) {
            console.log("db?.data", db?.data);

            form.setValue("openSelf", db?.data?.status?.id == 1)
            // form.setValue("openSelf", db?.data.type == 1)
            form.setValue("openTalented", db?.data?.type_talent == 1)
            setDataDetail(db)
            if (['1', '2'].includes(type)) {
                await fetchRentCost(db)
            }
            return
        }
        if (db?.data?.length == 0) {
            router.back()
            toastCore.error('Không có dữ liệu xe')
        }
    }

    const fetchRentCost = async (db: any) => {
        let formData = new FormData()
        // "type" : 1, 1 xe tự lái, 2 xe có tài
        // "year":2018, năm sản xuất
        // "company_car":1, hãng xe
        // "model_car":1 ,mẫu xe
        formData.append('type', type)
        formData.append('year', db?.data?.year_manu)
        formData.append('company_car', db?.data?.model_car?.company_car_id)
        formData.append('model_car', db?.data?.model_car?.id)

        const { data } = await apiRentCostPropose(formData)

        setDataOther(({
            ...dataOther,
            rent_cost_propose: data?.rent_cost_propose
        }))
    }


    useEffect(() => {
        if (id) {
            fetchData()
            setIdCar(id)
        }
    }, [id, pathname])

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

    const onSubmit = async (value: any, type: any) => {
        let formData = new FormData()
        formData.append('car_id', id)
        formData.append('type', type)
        if (type == 1) {
            formData.append('status', `${value?.openSelf ? 0 : 1}`)
        } else {
            formData.append('status', `${value?.openTalented ? 0 : 1}`)
        }

        const { data: db } = await apiOpenSwitchLayout(formData)
        if (db.result) {
            toastCore.success('Lưu trạng thái thành công')
            return
        }
        toastCore.error(db.message)

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
                        {
                            isVisibleTablet ?
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
                                                                                            onCheckedChange={(value) => {
                                                                                                if (e?.id == 2) {
                                                                                                    field.onChange(value)
                                                                                                    form.handleSubmit(value => onSubmit(value, e?.id == 2 ? 1 : 2))()
                                                                                                } else {
                                                                                                    toast.error("Vui lòng liên hệ quản trị viên Kanow để được hỗ trợ!")
                                                                                                }
                                                                                            }}
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
                                                                <div className="size-5">
                                                                    <Image
                                                                        width={100}
                                                                        height={100}
                                                                        alt="@kanow"
                                                                        className='w-full h-full'
                                                                        src={`/vehicle/tab/${pathname === item.link ? 'active' : 'noactive'}/${item.icon}`}
                                                                    />
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
                                :
                                listNavbar.map((e, index) => {
                                    return (
                                        <div key={`e-${e.id}`} className=''>
                                            <div className='flex flex-col gap-3 caret-transparent'>
                                                <div className='xxl:text-xs text-[11px] uppercase font-semibold text-[#6F7689] flex items-center justify-between'>
                                                    <h1 className='text-xs'>{e.lable}</h1>
                                                    {
                                                        e.id != 1 ?
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
                                                                                            onCheckedChange={(value) => {
                                                                                                if (e?.id == 2) {
                                                                                                    field.onChange(value)
                                                                                                    form.handleSubmit(value => onSubmit(value, e?.id == 2 ? 1 : 2))()
                                                                                                } else {
                                                                                                    toast.error("Vui lòng liên hệ quản trị viên Kanow để được hỗ trợ!")
                                                                                                }
                                                                                            }}
                                                                                        // disabled={e?.id == 3 ? true : false}
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
                                                    {
                                                        e.list?.map((item) => {
                                                            return <Link
                                                                key={`item-${item.id}`}
                                                                href={item.link}
                                                                className='flex items-center gap-3 cursor-pointer w-fit hover:opacity-90 duration-200 transition'
                                                            >
                                                                <div className="size-6">
                                                                    <Image
                                                                        width={100}
                                                                        height={100}
                                                                        alt="@kanow"
                                                                        className='w-full h-full object-cover'
                                                                        src={`/vehicle/tab/${pathname === item.link ? 'active' : 'noactive'}/${item.icon}`}
                                                                    />
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