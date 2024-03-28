'use client'


import { useAuth } from '@/hooks/useAuth'
import { uuidv4 } from '@/lib/uuid'
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { useCookie } from '@/hooks/useCookie'
import { useRouter } from 'next/navigation'
import useAuthenticationAPI from '@/services/auth/auth.services'
import { toastCore } from '@/lib/toast'
const LayoutProfile = ({
    children
}: {
    children: React.ReactNode
}) => {

    const router = useRouter()

    const { removeCookie } = useCookie()

    const { apiLogout } = useAuthenticationAPI()

    const { informationUser, setInformationUser } = useAuth()

    const [isMounted, setIsMounted] = useState<boolean>(false)

    const initialState = {
        tab: 1
    }

    const [isState, sIsState] = useState<any>(initialState)

    const queryState = (key: any) => sIsState((prev: any) => ({ ...prev, ...key }))

    const listTab = [
        {
            id: 1,
            name: 'Tài khoản của tôi',
            icon: ''
        },
        {
            id: 2,
            name: 'Xe yêu thích',
            icon: ''
        },
        {
            id: 3,
            name: 'Xe của tôi',
            icon: ''
        },
        {
            id: 4,
            name: 'Chuyến của tôi',
            icon: ''
        },
        {
            id: 5,
            name: 'Đăng xuất',
            icon: ''
        }
    ]

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleLogout = async () => {
        const { data } = await apiLogout()
        if (data?.result) {
            router.push('/')
            setInformationUser("")
            removeCookie("myCookie")
            toastCore.success(data?.message)
        } else {
            toastCore.error(data?.message)
        }
    }

    if (!isMounted) {
        return null;
    }
    return (
        <div className='flex flex-col custom-container'>
            <div className='py-6 xl:w-[30%] xl:max-w-[30%] lg:w-[25%] lg:max-w-[25%] w-full max-w-full lg:text-start text-center text-2xl font-bold text-[#101010]'>
                Xin chào <span className='capitalize text-[#2FB9BD]'>{informationUser?.fullname}</span>
            </div>
            <div className='grid grid-cols-12 gap-2'>
                <div className='col-span-4'>
                    {listTab.map((e: any, index: number) => {
                        return (
                            <div key={e.id} onClick={() => queryState({ tab: e.id })} className='w-full group hover:bg-gray-50 transition-all duration-200 ease-linear'>
                                {e.id == 5 ?
                                    <AlertDialog>
                                        <AlertDialogTrigger
                                            className={`${isState?.tab == e.id ? 'bg-gray-50 text-[#2FB9BD]' : 'text-black'} outline-none border-t w-full  text-left group-hover:text-[#2FB9BD] py-4 pl-1 font-medium transition-all duration-200 ease-linear`}>
                                            {e.name}
                                        </AlertDialogTrigger>
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
                                    </AlertDialog>
                                    :
                                    <button type='button'
                                        className={`${isState?.tab == e.id ? 'bg-gray-50 text-[#2FB9BD]' : 'text-black'} outline-none border-t w-full  text-left group-hover:text-[#2FB9BD] py-4 pl-1 font-medium transition-all duration-200 ease-linear`}
                                    >
                                        {e.name}
                                    </button>
                                }
                            </div>
                        )
                    })}
                </div>
                <div className='col-span-8 w-full h=full'>
                    {children}
                </div>
            </div>
        </div>


    )
}

export default LayoutProfile