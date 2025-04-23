import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerOverlay
} from "@/components/ui/drawer"
import { useDrawerStore } from '@/stores/drawerStores'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import PolyciDrawerMobi from "@/app/(router)/(policy)/policy/components/PolyciDrawerMobi"

const DrawerCustom = () => {
    const { openDrawer, setOpenDrawer, statusDrawer } = useDrawerStore()

    const stringMap = {
        "policyMobi": <PolyciDrawerMobi />
    } as any

    return (
        <div>
            <Drawer open={openDrawer} dismissible={false}>
                {
                    openDrawer && (
                        <DrawerOverlay
                            className={'bg-[#3A404A99] dark:bg-[#3A404A]/60 z-10'}
                            onClick={() => setOpenDrawer(true)} />
                    )
                }
                <DrawerContent className={'h-[100svh] dark:bg-[#040B24] dark-mode border-none focus:outline-none  rounded-tr-2xl rounded-tl-2xl'}>
                    {/* <DrawerContent data-vaul-no-drag className={'h-[90svh] dark:bg-[#040B24] dark-mode border-none focus:outline-none  rounded-tr-2xl rounded-tl-2xl'}> */}
                    <div className="relative">
                        {stringMap[statusDrawer]}
                        <DrawerClose onClick={() => setOpenDrawer(false)} className='absolute top-4 right-3'>
                            <Button variant="outline" className='border-none'>
                                <X size={28} />
                            </Button>
                        </DrawerClose>
                    </div>
                </DrawerContent>

            </Drawer>

        </div>
    )
}

export default DrawerCustom