import { Button } from '@/components/ui/button'
import { useResize } from '@/hooks/useResize'
import Image from 'next/image'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { MdArrowOutward } from "react-icons/md";
import { useDialogRegisterOwnerDriver } from '@/hooks/useOpenDialog'


type Props = {}

const SectionSignUpVehicleOwner = (props: Props) => {
    const { isVisibleMobile, isVisibleTablet } = useResize()
    const { setOpenDialogRegisterOwnerDriver } = useDialogRegisterOwnerDriver();

    const dataProcessSignUp = [
        {
            id: uuidv4(),
            icon: '/icon/vehicleOwner/icon_phone.png',
            step: "Bước 1",
            title: "Tải app và điền thông tin",
            description: "Tải app KANOW, vào mục Xe của tôi và đăng kí xe theo hướng dẫn.",
        },
        {
            id: uuidv4(),
            icon: '/icon/vehicleOwner/icon_laptop.png',
            step: "Bước 2",
            title: "Xác nhận thông tin",
            description: "Nhân viên Kanow liên hệ chủ xe tư vấn thủ tục & quy trình cho thuê xe trong vòng 1 ngày sau khi nhận được thông tin.",
        },
        {
            id: uuidv4(),
            icon: '/icon/vehicleOwner/icon_like.png',
            step: "Bước 3",
            title: "Duyệt xe",
            description: "Bắt đầu cho thuê xe trên Kanow sau khi nhận thông báo xe đã được phê duyệt.",
        }
    ]

    return (
        <>
            <div className='bg-[#F1FCFC] relative z-10 -mt-[1px]'>
                <div className='custom-container py-20 flex flex-col gap-10 '>
                    <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010] lg:max-w-[50%] max-w-full md:text-start text-center'>
                        Quy trình đăng ký xe trên KANOW
                    </div>
                    <div className='grid lg:grid-cols-4 grid-cols-1 2xl:gap-10 lg:gap-8'>
                        {
                            dataProcessSignUp && dataProcessSignUp.map((item, index) => (
                                <div key={item.id} data-aos="flip-down" data-aos-delay={index * 150} className='col-span-1 flex flex-col justify-center items-center'>
                                    <div className='lg:w-full md:w-[50%] w-full h-full hover:bg-white hover:drop-shadow-md flex flex-col items-center md:p-4 p-6 xl:gap-6 gap-4 rounded-2xl duration-300 transition ease-in-out relative group'>
                                        <div className='3xl:w-14 w-10 3xl:min-h-24 min-h-16 flex items-center'>
                                            <Image
                                                width={800}
                                                height={600}
                                                alt="icon"
                                                src={item.icon ? item.icon : "/default/default.png"}
                                                className='w-full h-auto object-contain'
                                            />
                                        </div>
                                        <div className='flex flex-col justify-center items-center gap-2'>
                                            <div className='3xl:text-base text-sm uppercase text-[#222222] font-semibold text-center'>
                                                {item.step ? item.step : ""}
                                            </div>
                                            <div className='3xl:text-lg xxl:text-base xl:text-base lg:text-[15px] md:text-base text-lg text-[#1EAAB1] font-semibold text-center'>
                                                {item.title ? item.title : ""}
                                            </div>
                                            <div className='3xl:text-base 2xl:text-[15px] xxl:text-sm xl:text-sm lg:text-sm md:text-sm text-base text-[#545454] font-normal text-center max-w-[90%]'>
                                                {item.description ? item.description : ""}
                                            </div>
                                        </div>

                                        {/* Giao diện laptop đến màn 1024 sẽ hiển thị icon arrow */}
                                        {
                                            index !== dataProcessSignUp.length - 1 && !isVisibleTablet ?
                                                <div className='xl:w-10 w-8 xl:h-10 h-8 rounded-full absolute lg:flex hidden xl:right-[-20px] right-[-15px] bottom-[50%] z-[10]'>
                                                    <Image
                                                        width={800}
                                                        height={600}
                                                        alt="icon"
                                                        src={"/icon/vehicleOwner/icon_arrow_right.png"}
                                                        className='xl:w-10 w-8 xl:h-10 h-8 object-contain rounded-full bg-[#E5DFC7]'
                                                    />
                                                </div>
                                                :
                                                null
                                        }
                                    </div>

                                    {/* Giao diện tablet đến màn mobile sẽ hiển thị icon arrow */}
                                    {
                                        index !== dataProcessSignUp.length - 1 && isVisibleTablet ?
                                            <div className='md:w-8 w-10 md:h-8 h-10 rounded-full my-4'>
                                                <Image
                                                    width={800}
                                                    height={600}
                                                    alt="icon"
                                                    src={"/icon/vehicleOwner/icon_arrow_right.png"}
                                                    className='md:w-8 w-10 md:h-8 h-10 object-contain flex rounded-full bg-[#E5DFC7] rotate-90'
                                                />
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            ))
                        }
                        <div className='col-span-1 h-full flex flex-col gap-4 justify-center items-center lg:mt-0 mt-6'>
                            <div className='flex items-center gap-1 3xl::max-w-[90%] xxl:max-w-[60%] md:max-w-[70%] max-w-full'>
                                <div className='3xl:text-base 2xl:text-sm xxl:text-sm xl:text-[13px] lg:text-[13px] md:text-sm text-base text-[#FF9900] font-semibold text-center'>
                                    Trở thành đối tác chủ xe của KANOW
                                </div>
                                <MdArrowOutward className='size-5 min-w-[20px] text-[#FF9900]' />
                            </div>
                            <div className='w-full flex justify-center'>
                                <Button type='button' onClick={() => setOpenDialogRegisterOwnerDriver(true)} className='md:w-fit w-full 3xl:text-lg text-base px-9 py-3 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105 hover:bg-[#2FB9BD]/80 uppercase transition-all overflow-hidden bg-[#2FB9BD] text-white uppercases'>
                                    Đăng ký ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-24 bg-[#23393C]">
                <div className="custom-container grid grid-cols-2 3xl:gap-20 lg:gap-14 gap-10">
                    <div className="lg:col-span-1 col-span-2 h-full relative">
                        <Image
                            src="/background/image_test.png"
                            alt="image"
                            width={1536}
                            height={800}
                            className='w-full h-auto object-contain rounded-xl'
                        />
                        <Image
                            src="/logo/logo_kanow.png"
                            alt="image"
                            width={500}
                            height={500}
                            className='md:w-[200px] w-[140px] h-auto object-contain rounded-xl absolute md:top-8 md:left-8 top-6 left-6'
                        />
                        <Image
                            src="/icon/vehicleOwner/icon_path.png"
                            alt="image"
                            width={500}
                            height={500}
                            className='3xl:w-[140px] xxl:w-[120px] md:w-[100px] w-[70px] h-auto object-contain rounded-xl absolute lg:right-12 md:right-14 right-10 3xl:top-24 xxl:top-20 xl:top-16 lg:top-12 md:top-28 top-12'
                        />
                    </div>
                    <div className='lg:col-span-1 col-span-2 h-full flex flex-col justify-center xl:gap-8 lg:gap-6 gap-6'>
                        <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#FCFDFD]'>
                            Trở thành đối tác chủ xe của KANOW
                        </div>

                        <div className='3xl:text-base xl:text-sm lg:text-[13px] md:text-sm text-base text-white font-normal'>
                            Cho thuê xe trên KANOW để gia tăng thu nhập hàng tháng và gặp gỡ nhiều bạn bè mới!
                        </div>

                        <div className='w-full'>
                            <Button type='button' onClick={() => setOpenDialogRegisterOwnerDriver(true)} className='md:w-fit w-full 3xl:text-lg text-base 3xl:px-12 3xl:py-4 px-10 py-3 3xl:gap-2 gap-1 rounded-xl cursor-pointer uppercase hover:scale-105 hover:bg-[#2FB9BD]/80 transition-all overflow-hidden bg-[#2FB9BD] text-white'>
                                Đăng ký ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionSignUpVehicleOwner