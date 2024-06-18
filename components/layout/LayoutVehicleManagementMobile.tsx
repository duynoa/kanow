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
import { FaArrowLeft } from 'react-icons/fa6'
import { useLoadSuccess } from '@/hooks/useLoadSuccess'
import { Skeleton } from '../ui/skeleton'

const LayoutVehicleManagementMobile = ({ children }: { children: React.ReactNode }) => {
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

    const { apiDetailCar, apiListOtherAmenitiesCar, apiRentCostPropose } = apiVehicleCommon()

    const { dataDetail, setIdCar, setDataDetail, setDataOther, dataOther } = useVehicleManage()

    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const fetchData = async () => {
        queryKeyIsStateLoadSuccess({
            loading: {
                ...isStateLoadSuccess.loading,
                isSuccessFetchApi: true,
            }
        })

        const { data: db } = await apiDetailCar(id, { type: -1, car_owner: 1 })
        // const { data: db } = await apiDetailCar(id, { type: 1, car_owner: 1 })
        const { data: { other, dtFee, other_talent } } = await apiListOtherAmenitiesCar()


        if (other || dtFee || other_talent) {
            setDataOther({ other, dtFee, other_talent })
        }
        if (!Array.isArray(db?.data)) {
            form.setValue("openSelf", db?.data.type == 1)
            form.setValue("openTalented", db?.data.type_talent == 1)
            setDataDetail(db)
            if (['1', '2'].includes(type)) {
                await fetchRentCost(db)
            }
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isSuccessFetchApi: false,
                }
            })

        } else {
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isSuccessFetchApi: false,
                }
            })
        }

        if (db?.data?.length == 0) {
            router.back()
            toastCore.error('Không có dữ liệu xe')
        }

    }

    const fetchRentCost = async (db: any) => {
        try {
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

            if (data && data.rent_cost_propose) {
                setDataOther(({
                    ...dataOther,
                    rent_cost_propose: data?.rent_cost_propose
                }))
            }
        } catch (err) {
            throw err
        }
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

    // useEffect(() => {
    //     const metaViewport = document.querySelector('meta[name=viewport]');
    //     if (metaViewport) {
    //         metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    //     } else {
    //         const meta = document.createElement('meta');
    //         meta.name = 'viewport';
    //         meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    //         document.head.appendChild(meta);
    //     }
    // }, [pathname]);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='bg-[#F6F6F8]/40'>
            {
                isStateLoadSuccess?.loading?.isSuccessFetchApi ?
                    <Skeleton className='w-full h-[200px]' />
                    :
                    (
                        dataDetail?.base?.base && dataDetail.data.image_car && dataDetail.data.image_car.length > 0 ?
                            <div className='w-full max-w-full h-[200px] bg-white/80 relative'>
                                <Image
                                    src={`${dataDetail?.base?.base}/${dataDetail?.data?.image_car[0]?.name}`}
                                    alt="your_car"
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                                <div className='absolute top-0 w-full h-[200px] bg-[#000000]/30' />
                                <div className={`${href === "/vehicle-management-mobile/menu-mobile" ? "w-[90%] max-w-[90%]" : "w-[80%] max-w-[80%]"} absolute left-5 bottom-4 w-full max-w-[80%] flex items-center `}>
                                    {
                                        href === "/vehicle-management-mobile/menu-mobile" ?
                                            null
                                            :
                                            <div
                                                onClick={() => router.back()}
                                                className='size-5 w-[20%] max-w-[20%] h-full flex flex-col hover:translate-x-2 duration-300 transition'
                                            >
                                                <FaArrowLeft className='size-5 text-white' />
                                            </div>
                                    }
                                    <div className={`${href === "/vehicle-management-mobile/menu-mobile" ? "w-full max-w-full" : "w-[80%] max-w-[80%]"} text-lg  text-center text-white font-semibold line-clamp-4`}>
                                        {dataDetail?.data?.name ? dataDetail?.data?.name : ""}
                                    </div>
                                </div>
                            </div>
                            :
                            null
                    )
            }
            <>
                {children}
            </>
        </div>
    )
}

export default LayoutVehicleManagementMobile