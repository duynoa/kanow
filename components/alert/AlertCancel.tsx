
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAlertCancel } from '@/hooks/useAlertDialog'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

type Props = {}

const AlertCancel = (props: Props) => {
    const { openAlertCancel, setOpenAlertCancel } = useAlertCancel()

    console.log('openAlertCancel', openAlertCancel);

    return (
        <AlertDialog open={openAlertCancel} onOpenChange={() => setOpenAlertCancel(false)}>
            <AlertDialogContent className='max-w-[380px]'>
                <AlertDialogHeader className='text-start'>
                    <AlertDialogTitle>Bạn có muốn huỷ chuyến không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Xác nhận huỷ chuyến
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row justify-end'>
                    <Button
                        type="button"
                        onClick={() => setOpenAlertCancel(false)}
                        className='3xl:text-base text-sm w-fit py-3 px-6 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                    >
                        Hủy
                    </Button>
                    <AlertDialogAction
                        type="button"
                        className='3xl:text-base text-sm  w-fit py-3 px-6 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-red-500/80 transition-all overflow-hidden bg-red-500 text-white'
                    >
                        Huỷ chuyến
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertCancel