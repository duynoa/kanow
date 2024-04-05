'use client'

import { useAuth } from '@/hooks/useAuth'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useCookie } from '@/hooks/useCookie'
import { usePathname, useRouter } from 'next/navigation'
import useAuthenticationAPI from '@/services/auth/auth.services'
import { toastCore } from '@/lib/toast'

import { FormatNumberHundred, FormatNumberToDecimal } from '../format/FormatNumber'
import Image from 'next/image'
import { FaCircleCheck } from 'react-icons/fa6'
import { FaStar } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import Link from 'next/link'
import { useResize } from '@/hooks/useResize'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SelectItemNocheck } from '../ui/selectNocheck'
import { useAlertDialogLogout } from '@/hooks/useAlertDialog'
import AlertDialogLogout from '../alert/AlertDialogLogout'
import apiAccount from '@/services/account/account.services'
import moment from 'moment'
import { Skeleton } from '../ui/skeleton'

const LayoutProfile = ({
    children
}: {
    children: React.ReactNode
}) => {
    const pathname = usePathname()
    const router = useRouter()

    const { isVisibleTablet } = useResize()
    const { apiLogout } = useAuthenticationAPI()
    const { informationUser, setInformationUser } = useAuth()
    const { removeCookie, getCookie, setCookie } = useCookie()
    const { openAlertDialogLogout, setOpenAlertDialogLogout } = useAlertDialogLogout()

    const [isMounted, setIsMounted] = useState<boolean>(false)

    const initialState = {
        tab: 1,
        isLoading: false,
    }

    const { apiUpdateInfo } = apiAccount()

    const [isState, sIsState] = useState<any>(initialState)

    const queryState = (key: any) => sIsState((prev: any) => ({ ...prev, ...key }))

    // desktop
    const listSidebarGeneralInformation = [
        {
            id: 1,
            name: 'Tài khoản của tôi',
            icon_inactive: '/icon/account/inactive/user_square.png',
            icon_active: '/icon/account/active/user_square.png',
            link: "/account",
        },
        {
            id: 2,
            name: 'Xe yêu thích',
            icon_inactive: '/icon/account/inactive/heart.png',
            icon_active: '/icon/account/active/heart.png',
            link: "/list-car-favorite",
        },
        {
            id: 3,
            name: 'Xe của tôi',
            icon_inactive: '/icon/account/inactive/driving.png',
            icon_active: '/icon/account/active/driving.png',
            link: "/list-my-car",
        },
        {
            id: 4,
            name: 'Chuyến của tôi',
            icon_inactive: '/icon/account/inactive/radar.png',
            icon_active: '/icon/account/active/radar.png',
            link: "/my-trips",
        },
        // {
        //     id: 5,
        //     name: 'Đơn hàng cho thuê dài hạn',
        //     icon_inactive: '/icon/account/inactive/archive_book.png',
        //     icon_active: '/icon/account/active/archive_book.png',
        //     link: "/list-my-trip",
        // },
        {
            id: 6,
            name: 'Sổ địa chỉ',
            icon_inactive: '/icon/account/inactive/stickynote.png',
            icon_active: '/icon/account/active/stickynote.png',
            link: "/list-address",
        },
    ]
    const listSettingAccount = [
        {
            id: 7,
            name: 'Đổi mật khẩu',
            icon_inactive: '/icon/account/inactive/lock.png',
            icon_active: '/icon/account/active/lock.png',
            link: "/change-password",
        },
        {
            id: 8,
            name: 'Yêu cầu xoá tài khoản',
            icon_inactive: '/icon/account/inactive/trash.png',
            icon_active: '/icon/account/active/trash.png',
            link: "/delete-account",
        },
    ]

    // tablet mobile
    const listSidebar = [
        {
            id: 1,
            name: 'Tài khoản của tôi',
            icon_inactive: '/icon/account/inactive/user_square.png',
            icon_active: '/icon/account/active/user_square.png',
            link: "/account",
        },
        {
            id: 2,
            name: 'Xe yêu thích',
            icon_inactive: '/icon/account/inactive/heart.png',
            icon_active: '/icon/account/active/heart.png',
            link: "/list-car-favorite",
        },
        {
            id: 3,
            name: 'Xe của tôi',
            icon_inactive: '/icon/account/inactive/driving.png',
            icon_active: '/icon/account/active/driving.png',
            link: "/list-my-car",
        },
        {
            id: 4,
            name: 'Chuyến của tôi',
            icon_inactive: '/icon/account/inactive/radar.png',
            icon_active: '/icon/account/active/radar.png',
            link: "/list-my-trip",
        },
        // {
        //     id: 5,
        //     name: 'Đơn hàng cho thuê dài hạn',
        //     icon_inactive: '/icon/account/inactive/archive_book.png',
        //     icon_active: '/icon/account/active/archive_book.png',
        //     link: "/list-my-trip",
        // },
        {
            id: 6,
            name: 'Sổ địa chỉ',
            icon_inactive: '/icon/account/inactive/stickynote.png',
            icon_active: '/icon/account/active/stickynote.png',
            link: "/list-address",
        },
        {
            id: 7,
            name: 'Đổi mật khẩu',
            icon_inactive: '/icon/account/inactive/lock.png',
            icon_active: '/icon/account/active/lock.png',
            link: "/change-password",
        },
        {
            id: 8,
            name: 'Yêu cầu xoá tài khoản',
            icon_inactive: '/icon/account/inactive/trash.png',
            icon_active: '/icon/account/active/trash.png',
            link: "/delete-account",
        },
        {
            id: 9,
            name: 'Đăng xuất',
            icon_inactive: '/icon/account/inactive/trash.png',
            icon_active: '/icon/account/active/trash.png',
            link: "/logout",
        },
    ]

    useEffect(() => {
        setIsMounted(true)
        queryState({ isLoading: true })
        setTimeout(() => {
            queryState({ isLoading: false })
        }, 500)
    }, [])


    const handleChangeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = document.getElementById('avatar') as HTMLInputElement | null;
        let form: any = new FormData();
        // Kiểm tra event.target và event.target.files trước khi truy cập
        if (event.target && event.target.files) {
            form.append('avatar', event.target.files[0] ?? "")
            const { data: { message, result } } = await apiUpdateInfo(form)
            if (result) {
                toastCore.success(message)
                setInformationUser({ ...informationUser, avatar: URL.createObjectURL(event.target.files[0]) });
            } else {
                toastCore.error(message)
            }
        }
    }

    const handleChangeSidebar = (value: any) => {
        console.log('value:', value);
        if (value !== '/logout') {
            router.push(value)
        } else {
            setOpenAlertDialogLogout(true)
        }
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
                        <div className='flex flex-col 2xl:gap-3 gap-2 justify-center items-center caret-transparent'>
                            {isState.isLoading ?
                                <Skeleton className="3xl:w-24 3xl:h-24 w-20 h-20 rounded-full bg-white" />
                                :
                                <div className='3xl:w-24 3xl:h-24 w-20 h-20 rounded-full'>
                                    <Input
                                        onChange={(event) => handleChangeAvatar(event)}
                                        accept="image/*, application/pdf"
                                        id={"avatar"}
                                        type="file"
                                        multiple
                                        className="hidden"
                                    />
                                    <Label htmlFor='avatar' className='relative cursor-pointer group'>
                                        <Avatar className='w-full h-full shadow group-hover:opacity-80 duration-200 transition'>
                                            <AvatarImage
                                                src={informationUser?.avatar ? informationUser?.avatar : '/avatar/avatar_default.png'}
                                                alt="@kanow"
                                            />
                                            <AvatarFallback >
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src='/avatar/avatar_default.png'
                                                    alt="@kanow"
                                                    className='w-full h-full'
                                                />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='absolute 3xl:size-8 size-7 bg-[#1EAAB1] rounded-full bottom-0 right-0 flex justify-center items-center'>
                                            {/* <HiCamera className='size-5 text-white' /> */}
                                            <Image
                                                width={120}
                                                height={120}
                                                src='/icon/account/icon_camera.png'
                                                alt="camera"
                                                className='size-5 object-contain'
                                            />
                                        </div>
                                    </Label>
                                </div>
                            }

                            <div className='3xl:text-sm text-xs text-[#585F71] font-semibold text-center'>
                                Tham gia từ {moment(informationUser?.created_at).format('YYYY')}
                            </div>
                            <div className='flex items-center justify-between xl:gap-4 gap-2'>
                                {informationUser?.total_trip > 0 &&
                                    <div className='flex items-center gap-1'>
                                        <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#FFC118]' />
                                        <div className='3xl:text-sm 2xl:text-xs lg:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                            {FormatNumberToDecimal(informationUser?.point ?? 0, 1)} điểm
                                        </div>
                                    </div>
                                }

                                <div className='flex items-center gap-1'>
                                    {informationUser?.total_trip > 0 && <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#3AC996]' />}
                                    <div className='3xl:text-sm 2xl:text-xs lg:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                        {`${informationUser?.total_trip > 0 ? `${FormatNumberHundred(informationUser?.total_trip ?? 0, 100)} chuyến` : 'Chưa có chuyến'}`}
                                    </div>
                                </div>
                                {/* {
                                    card.point_star ?
                                        <div className='flex items-center gap-1'>
                                            <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#FFC118]' />
                                            <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                {card.point_star ? (FormatNumberToDecimal(card.point_star, 1)) : 0}
                                            </div>
                                        </div>
                                        :
                                        null
                                }

                                {
                                    card.total_trip ?
                                        <div className='flex items-center gap-1'>
                                            <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#3AC996]' />
                                            <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                {card.total_trip ? FormatNumberHundred(card.total_trip, 100) : 0} Chuyến
                                            </div>
                                        </div>
                                        :
                                        <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                            Chưa có chuyến
                                        </div>
                                } */}
                            </div>
                        </div>
                        {
                            isVisibleTablet ?
                                <Select
                                    value={pathname !== 'logout' ? pathname : ""}
                                    onValueChange={(value) => handleChangeSidebar(value)}
                                >
                                    <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Chọn giờ nhận xe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                listSidebar && listSidebar.map((item) => (
                                                    <SelectItemNocheck
                                                        key={item.id}
                                                        value={`${item.link}`}
                                                        className='flex flex-row items-center'
                                                    >
                                                        {
                                                            item.link !== '/logout' ?
                                                                <div
                                                                    key={item.id}
                                                                    className='flex items-center gap-3 cursor-pointer w-fit hover:opacity-90 duration-200 transition'
                                                                >
                                                                    <div className='3xl:size-6 size-5'>
                                                                        <Image
                                                                            width={100}
                                                                            height={100}
                                                                            alt="@kanow"
                                                                            className='w-full h-full'
                                                                            src={pathname === item.link ? item.icon_active : item.icon_inactive}
                                                                        />
                                                                    </div>
                                                                    <div className={`${pathname === item.link ? "text-[#1EAAB1]" : "text-[#383A43]"} 3xl:text-sm text-xs font-semibold`}>
                                                                        {item.name}
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className={`3xl:text-sm text-xs text-[#FA3434] font-semibold w-fit cursor-pointer hover:text-[#FA3434]/80 duration-200 transition`}>
                                                                    Đăng xuất
                                                                </div>
                                                        }
                                                    </SelectItemNocheck>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                :
                                <>
                                    <Separator orientation='horizontal' />

                                    <div className='flex flex-col gap-3 caret-transparent'>
                                        <div className='xxl:text-xs text-[11px] uppercase font-semibold text-[#6F7689]'>
                                            Thông tin chung
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            {
                                                listSidebarGeneralInformation?.map((item, index) => (
                                                    <Link
                                                        key={item.id}
                                                        href={item.link}
                                                        className='flex items-center gap-3 cursor-pointer w-fit hover:opacity-90 duration-200 transition'
                                                    >
                                                        <div className='3xl:size-6 size-5'>
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                alt="@kanow"
                                                                className='w-full h-full'
                                                                src={pathname === item.link ? item.icon_active : item.icon_inactive}
                                                            />
                                                        </div>
                                                        <div className={`${pathname === item.link ? "text-[#1EAAB1]" : "text-[#383A43]"} 3xl:text-sm text-xs font-semibold`}>
                                                            {item.name}
                                                        </div>
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <Separator orientation='horizontal' />

                                    <div className='flex flex-col gap-3 caret-transparent'>
                                        <div className='xxl:text-xs text-[11px] uppercase font-semibold text-[#6F7689]'>
                                            Cài đặt tài khoản
                                        </div>

                                        <div className='flex flex-col gap-4'>
                                            {
                                                listSettingAccount?.map((item, index) => (
                                                    <Link
                                                        key={item.id}
                                                        href={item.link}
                                                        className='flex items-center gap-3 cursor-pointer w-fit hover:opacity-90 duration-200 transition'
                                                    >
                                                        <div className='3xl:size-6 size-5'>
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                alt="@kanow"
                                                                className='w-full h-full'
                                                                src={pathname === item.link ? item.icon_active : item.icon_inactive}
                                                            />
                                                        </div>
                                                        <div className={`${pathname === item.link ? "text-[#1EAAB1]" : "text-[#383A43]"} 3xl:text-sm text-xs font-semibold`}>
                                                            {item.name}
                                                        </div>
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center caret-transparent'>
                                        <div onClick={() => setOpenAlertDialogLogout(true)} className={`3xl:text-sm text-xs text-[#FA3434] font-semibold w-fit cursor-pointer hover:text-[#FA3434]/80 duration-200 transition`}>
                                            Đăng xuất
                                        </div>
                                        {/* <AlertDialog>
                                            <AlertDialogContent className='max-w-[380px]'>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Bạn có muốn đăng xuất không?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Xác nhận đăng xuất
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel
                                                        type="button"
                                                        className='3xl:text-base text-sm w-fit py-2 px-4 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                                                    >
                                                        Hủy
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={handleLogout}
                                                        type="button"
                                                        className='3xl:text-base text-sm  w-fit py-2 px-4 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-[#14555B]/80 transition-all overflow-hidden bg-[#14555B] text-white'
                                                    >
                                                        Đăng xuất
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog> */}
                                    </div>
                                </>
                        }

                    </div>
                    <div className='xl:col-span-10 lg:col-span-9 col-span-12 w-full h-auto'>
                        {/* <div className='xl:col-span-10 lg:col-span-9 col-span-12 w-full h-full'> */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutProfile