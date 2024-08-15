"use client"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { table } from "console";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const CustomQuill = dynamic(() => import("@/components/quill/CustomQuill"), { ssr: false });

type Props = {}



export default function MenuMobile(props: Props) {
    const [tabTypeId, setTabTypeId] = useState<number>(2)
    const href = usePathname()

    const param: ReadonlyURLSearchParams = useSearchParams()

    const id: string | null = param.get("key") || ''

    const type: string | null = param.get("t") || ''

    const pathname: string = `${href}?key=${id}&t=${type}`

    const router = useRouter()

    const { apiOpenSwitchLayout, apiListOtherAmenitiesCar, apiDetailCar, apiRentCostPropose } = apiVehicleCommon()
    const { dataDetail, setIdCar, setDataDetail, setDataOther, dataOther } = useVehicleManage()
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const form = useForm({
        defaultValues: {
            openSelf: false,
            openTalented: false,
        }
    })

    const tabData = [
        {
            id: 2,
            name: "Xe tự lái"
        },
        {
            id: 3,
            name: "Xe có tài xế"
        },
    ]

    const listNavbar = [
        {
            id: 1,
            lable: 'Thông tin chung',
            list: [
                {
                    id: 1,
                    name: 'Thông tin',
                    link: `/vehicle-management-mobile/information?key=${id}&t=0`,
                    icon: 'infomation.png',
                },
                {
                    id: 2,
                    name: 'Hình ảnh',
                    link: `/vehicle-management-mobile/images?key=${id}&t=0`,
                    icon: 'images.png',
                },
                {
                    id: 3,
                    name: 'Giấy tờ xe',
                    link: `/vehicle-management-mobile/registration?key=${id}&t=0`,
                    icon: 'registration.png',
                },
                {
                    id: 4,
                    name: 'Quản lý chuyến',
                    link: `/vehicle-management-mobile/trip?key=${id}&t=0`,
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
                    link: `/vehicle-management-mobile/self-rental-price?key=${id}&t=1`,
                    icon: 'rental-price.png',
                },
                {
                    id: 2,
                    name: 'Thiết lập thời gian cho thuê',
                    link: `/vehicle-management-mobile/self-set-time?key=${id}&t=1`,
                    icon: 'set-time.png',
                },
                {
                    id: 3,
                    name: 'Lịch xe',
                    link: `/vehicle-management-mobile/self-calendar?key=${id}&t=1`,
                    icon: 'calendar.png',
                },
                {
                    id: 4,
                    name: 'Giao xe tận nơi',
                    link: `/vehicle-management-mobile/selt-vehicle-handing?key=${id}&t=1`,
                    icon: 'vehicle-handing.png',
                },
                {
                    id: 5,
                    name: 'Phụ phí',
                    link: `/vehicle-management-mobile/self-surcharge?key=${id}&t=1`,
                    icon: 'surcharge.png',
                },
                {
                    id: 6,
                    name: 'Thủ tục cho thuê',
                    link: `/vehicle-management-mobile/selt-procedure?key=${id}&t=1`,
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
                    link: `/vehicle-management-mobile/talented-rental-price?key=${id}&t=2`,
                    icon: 'rental-price.png',
                },
                {
                    id: 12,
                    name: 'Thiết lập thời gian cho thuê',
                    link: `/vehicle-management-mobile/talented-set-time?key=${id}&t=2`,
                    icon: 'set-time.png',
                },
                {
                    id: 13,
                    name: 'Lịch xe',
                    link: `/vehicle-management-mobile/talented-calendar?key=${id}&t=2`,
                    icon: 'calendar.png',
                },
                {
                    id: 14,
                    name: 'Đưa đón tận nơi',
                    link: `/vehicle-management-mobile/talented-shuttle?key=${id}&t=2`,
                    icon: 'vehicle-handing.png',
                },
                {
                    id: 15,
                    name: 'Phụ phí',
                    link: `/vehicle-management-mobile/talented-surcharge?key=${id}&t=2`,
                    icon: 'surcharge.png',
                },
                {
                    id: 16,
                    name: 'Thủ tục cho thuê',
                    link: `/vehicle-management-mobile/talented-procedure?key=${id}&t=2`,
                    icon: 'procedure.png',
                },
            ]
        },
    ]

    const fetchData = async () => {
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

    const handleChangeTab = (tab: any) => {
        setTabTypeId(tab.id)
    }

    return (
        <div className="flex flex-col">
            {
                listNavbar.map((e, index) => {
                    return (
                        <div key={`e-${e.id}`}>
                            {
                                (
                                    tabTypeId === e.id ?
                                        (
                                            isStateLoadSuccess?.loading?.isSuccessFetchApi ?
                                                <div className='w-full px-2 py-2 flex items-center justify-between'>
                                                    <Skeleton className='w-[40%] h-5' />
                                                    <Skeleton className='w-[20%] h-7' />
                                                </div>
                                                :
                                                <div className='mx-4 py-4 text-sm uppercase font-semibold text-[#6F7689] flex items-center justify-between'>
                                                    <h1>Trạng thái</h1>
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
                                                                                        // field.onChange(value)
                                                                                        // form.handleSubmit((value) => onSubmit(value, e?.id == 2 ? 1 : 2))()
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
                                                    </Form>
                                                </div>
                                        )
                                        :
                                        (null)
                                )
                            }

                            {
                                e.id == 1 &&
                                <div className='flex flex-col gap-4 mx-4 py-4'>
                                    {
                                        e.list?.map((item) => {
                                            return (
                                                <Link
                                                    key={`item-${item.id}`}
                                                    href={item.link}
                                                    className='py-1.5 flex items-center justify-between cursor-pointer w-full hover:opacity-90 duration-200 transition'
                                                >
                                                    <div className='flex items-center gap-3'>
                                                        <div className="size-6">
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                alt="@kanow"
                                                                className='w-full h-full object-cover'
                                                                src={`/vehicle/tab/${pathname === item.link ? 'active' : 'noactive'}/${item.icon}`}
                                                            />
                                                        </div>
                                                        <div className={`${pathname === item.link ? "text-[#1EAAB1]" : "text-[#383A43]"} text-base font-bold`}>
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                    <div className='size-5'>
                                                        <IoIosArrowForward className='size-5 text-[#707477]/60' />
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            }
                            {
                                index === 0 ?
                                    <div className='bg-[#808080]/10 grid grid-cols-2'>
                                        {tabData?.map((tab) => (
                                            <div
                                                key={tab.id}
                                                className={`${tabTypeId === tab.id ? "text-[#1EAAB1] border-b-2 border-[#1EAAB1]" : "text-[#545454]"} py-3.5 font-medium text-center text-base`}
                                                onClick={() => handleChangeTab(tab)}
                                            >
                                                {tab.name ? tab.name : ""}
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    null
                            }
                            {
                                e.id != 1 && tabTypeId === e.id &&
                                <div className='flex flex-col gap-4 mx-4 py-2'>
                                    {
                                        e.list.length > 0
                                            ? e.list?.map((item) => {
                                                return (
                                                    <Link
                                                        key={`item-${item.id}`}
                                                        href={item.link}
                                                        className='py-1.5 flex items-center justify-between cursor-pointer w-full hover:opacity-90 duration-200 transition'
                                                    >
                                                        <div className='flex items-center gap-3'>
                                                            <div className="size-6">
                                                                <Image
                                                                    width={100}
                                                                    height={100}
                                                                    alt="@kanow"
                                                                    className='w-full h-full object-cover'
                                                                    src={`/vehicle/tab/${pathname === item.link ? 'active' : 'noactive'}/${item.icon}`}
                                                                />
                                                            </div>
                                                            <div className={`${pathname === item.link ? "text-[#1EAAB1]" : "text-[#383A43]"} text-base font-bold`}>
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                        <div className='size-5'>
                                                            <IoIosArrowForward className='size-5 text-[#707477]/60' />
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                            :
                                            null
                                    }
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}