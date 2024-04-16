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
import apiAccount from '@/services/profile/account/account.services'
import moment from 'moment'
import { Skeleton } from '../ui/skeleton'

const LayoutMyCar = ({
    children
}: {
    children: React.ReactNode
}) => {
    const pathname = usePathname()

    const [isMounted, setIsMounted] = useState<boolean>(false)

    const tab = [
        {
            id: "1",
            icon_active: '',
            icon_no_active: "",
            name: 'Danh sách xe',
            link: '/list-my-car/my-car'
        },
        {
            id: "2",
            icon_active: '',
            icon_no_active: "",
            name: 'Hợp đồng mẫu',
            link: '/list-my-car/contract'
        },
        {
            id: "3",
            icon_active: '',
            icon_no_active: "",
            name: 'Ví của tôi',
            link: '/list-my-car/my-wallet'
        },
        {
            id: "4",
            icon_active: '',
            icon_no_active: "",
            name: 'Đăng ký xe',
            link: '/list-my-car/vehicle-registration'
        }
    ]

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <div className='bg-[#F6F6F8] flex flex-col gap-4'>
            <h1 className='text-[#3E424E] p-5 lg:text-2xl text-xl  font-semibold bg-white rounded-xl'>Xe của tôi</h1>
            <div className="flex flex-col">
                <div className="flex gap-[2px] items-center bg-white/0 md:overflow-hidden overflow-auto">
                    {
                        tab && tab.map((e) => (
                            <Link
                                href={e.link}
                                key={e.id}
                                className={`${e.link == pathname ? "bg-white" : "bg-[#BEE9EA] hover:bg-[#BEE9EA]/80"} caret-transparent flex items-center gap-2 xl:px-6 xl:py-3 px-4 py-3 rounded-t-xl cursor-pointer`}
                            >
                                <div className='relative flex gap-1 items-center w-fit'>
                                    {/* <div className='w-5 h-full'>
                                    <Image
                                        alt="icon_active"
                                        src={e.link == pathname ? (e.icon_active ? e.icon_active : "/default/default.png") : (e.icon_no_active ? e.icon_no_active : "/default/default.png")}
                                        width={80}
                                        height={80}
                                        className="w-full h-full object-contain"
                                    />
                                </div> */}
                                    <div className='text-sm text-[#585F71] font-medium truncate'>
                                        {e.name ? e.name : ""}
                                    </div>

                                    {e.link == pathname && (
                                        <div className="absolute -bottom-2 left-0 right-0 h-[3px] w-full bg-[#2FB9BD]"></div>
                                    )}
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className='w-full h-auto'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LayoutMyCar