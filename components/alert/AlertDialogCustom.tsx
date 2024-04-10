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

    const { apiDeleteAddress } = apiAddress()


    const [isTitle, setIsTitle] = useState<ITitle>(title)


    const { openAlert, type, setOpenAlert, value, setOnFinally } = useAlert()

    const handleClick = async () => {
        switch (type) {
            case 'deleteAddres':
                try {
                    const { data } = await apiDeleteAddress(value)
                    if (data?.result) {
                        toastCore.success(data?.message)
                        setOnFinally(true)
                        setOpenAlert(false)
                    } else {
                        toastCore.error(data?.message)
                    }
                } catch (error) {
                    throw error
                }
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        switch (type) {
            case 'deleteAddres':
                setIsTitle({
                    title: 'Bạn có muốn xóa không?',
                    accept: 'Xác nhận xóa',
                    buttonSubmit: 'Xóa',
                    buttonCancel: 'Hủy'
                })
                break;
            default:
                break;
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