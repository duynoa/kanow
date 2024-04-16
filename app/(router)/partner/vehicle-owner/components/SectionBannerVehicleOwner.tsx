import { Button } from '@/components/ui/button'
import { useDialogRegisterOwnerDriver } from '@/hooks/useOpenDialog';
import React from 'react'

type Props = {}

const SectionBannerVehicleOwner = (props: Props) => {
    const { setOpenDialogRegisterOwnerDriver } = useDialogRegisterOwnerDriver();
    return (
        <div className="custom-container 3xl:h-[55vh] md:h-[60dvh] h-[45dvh] bg-[url('/other/banner/banner_vehicle_owner.png')] bg-cover bg-center rounded-lg p-10 flex flex-col gap-6 md:justify-end justify-between items-start">
            <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-white 3xl:max-w-[35%] xxl:max-w-[40%] xl:max-w-[45%] lg:max-w-[50%] max-w-full'>
                Cho Thuê Xe Trên KANOW -Thu Nhập Đến 10tr/Tháng!
            </div>
            <div className=''>
                <Button type='button' onClick={() => setOpenDialogRegisterOwnerDriver(true)} className='px-12 xxl:py-4 py-3 flex items-center gap-2 font-bold text-[#000000] bg-[#9DF2EE] hover:bg-[#9DF2EE]/90 group-hover:translate-x-2'>
                    <span className='3xl:text-base lg:text-sm md:text-base text-base uppercase'>Đăng ký ngay</span>
                </Button>
            </div>
        </div>
    )
}

export default SectionBannerVehicleOwner