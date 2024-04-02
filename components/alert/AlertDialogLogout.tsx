
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useCookie } from '@/hooks/useCookie'
import { useRouter } from 'next/navigation'
import useAuthenticationAPI from '@/services/auth/auth.services'
import { toastCore } from '@/lib/toast'
import { useAlertDialogLogout } from '@/hooks/useAlertDialog'
import { Button } from '../ui/button'

type Props = {}

const AlertDialogLogout = (props: Props) => {
    const router = useRouter()
    const { removeCookie, getCookie, setCookie } = useCookie()
    const { setInformationUser } = useAuth()
    const { openAlertDialogLogout, setOpenAlertDialogLogout } = useAlertDialogLogout()
    const { apiLogout } = useAuthenticationAPI()

    console.log('openAlertDialogLogout', openAlertDialogLogout);

    const handleLogout = async () => {
        const { data } = await apiLogout()
        if (data?.result) {
            router.push('/')
            setInformationUser("")
            if (getCookie == 'kanow') {
                removeCookie("token_kanow")
            } else {
                setCookie("token_kanow", "kanow", { expires: 7 })
            }
            toastCore.success(data?.message)
        } else {
            toastCore.error(data?.message)
        }
    }

    return (
        <AlertDialog open={openAlertDialogLogout} onOpenChange={() => setOpenAlertDialogLogout(false)}>
            <AlertDialogOverlay className='bg-black/20' />
            <AlertDialogContent className='max-w-[380px]'>
                <AlertDialogHeader className='text-start'>
                    <AlertDialogTitle>Bạn có muốn đăng xuất không?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Xác nhận đăng xuất
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='flex flex-row justify-end'>
                    <Button
                        type="button"
                        onClick={() => setOpenAlertDialogLogout(false)}
                        className='3xl:text-base text-sm w-fit py-2 px-4 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                    >
                        Hủy
                    </Button>
                    <AlertDialogAction
                        onClick={handleLogout}
                        type="button"
                        className='3xl:text-base text-sm  w-fit py-2 px-4 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-[#2FB9BD]/80 transition-all overflow-hidden bg-[#2FB9BD] text-white'
                    >
                        Đăng xuất
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertDialogLogout