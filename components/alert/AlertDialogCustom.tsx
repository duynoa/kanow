'use client'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '../ui/button'
import { toastCore } from '@/lib/toast'
import { useAlert } from '@/hooks/useAlertDialog'
import apiAddress from '@/services/profile/listAddress/listAddress.services'
import apiDeleteAccount from '@/services/profile/deleteAccount/deleteAccount.services'
import { useCookie } from '@/hooks/useCookie'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

type Props = {
}

interface ITitle {
    title: string
    accept: string
    buttonSubmit: string
    buttonCancel: string
}

const AlertDialogCustom = (props: Props) => {
    const title: ITitle = {
        title: "",
        accept: '',
        buttonSubmit: '',
        buttonCancel: ''
    }
    const router = useRouter()

    const { setInformationUser } = useAuth()

    const { apiDeleteAddress } = apiAddress()

    const { removeCookie, setCookie } = useCookie()

    const { apiLogAccount } = apiDeleteAccount()


    const [isTitle, setIsTitle] = useState<ITitle>(title)


    const { openAlert, type, setOpenAlert, value, setOnFinally } = useAlert()

    const handleClick = async () => {
        switch (type) {
            case 'deleteAddres':
                try {
                    const { data: { result, message } } = await apiDeleteAddress(value)
                    if (result) {
                        toastCore.success(message)
                        setOnFinally(true)
                        setOpenAlert(false)
                        return
                    }
                    toastCore.error(message)
                } catch (error) {
                    throw error
                }
                break;
            case 'delete-account':
                try {
                    const { data: { result, message } } = await apiLogAccount()
                    if (result) {
                        toastCore.success(message)
                        setOpenAlert(false)
                        setInformationUser(undefined)
                        setCookie('token_kanow', 'kanow', { expires: 7 })
                        return
                    }
                    toastCore.error(message)
                } catch (error) {
                    throw error
                } finally {
                    router.push('/')
                }
                break;
            default:
                break;
        }
    }

    const key: any = {
        "deleteAddres": {
            title: 'Bạn có muốn xóa không?',
            accept: 'Xác nhận xóa',
            buttonSubmit: 'Xóa',
            buttonCancel: 'Hủy'
        },
        "delete-account": {
            title: 'Bạn có muốn xóa tài khoản không?',
            accept: 'Xác nhận xóa tài khoản',
            buttonSubmit: 'Xóa',
            buttonCancel: 'Hủy'
        }
    }

    useEffect(() => {
        if (type) {
            setIsTitle(key[type])
        }
    }, [type])


    return (
        <AlertDialog open={openAlert} onOpenChange={() => setOpenAlert(true)}>
            <AlertDialogContent className='max-w-[380px]'>
                <AlertDialogHeader className='text-start'>
                    <AlertDialogTitle>{isTitle.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {isTitle.accept}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row justify-end'>
                    <Button
                        type="button"
                        onClick={() => setOpenAlert(false)}
                        className='3xl:text-base text-sm w-fit py-3 px-6 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                    >
                        {isTitle.buttonCancel}
                    </Button>
                    <AlertDialogAction
                        onClick={handleClick}
                        type="button"
                        className='3xl:text-base text-sm  w-fit py-3 px-6 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-[#2FB9BD]/80 transition-all overflow-hidden bg-[#2FB9BD] text-white'
                    >
                        {isTitle.buttonSubmit}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogCustom