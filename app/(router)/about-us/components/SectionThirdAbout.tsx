import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Marquee from 'react-fast-marquee'
import { v4 as uuidv4 } from 'uuid'

type Props = {}

const SectionThirdAbout = (props: Props) => {
    const imageSlider = [
        {
            id: uuidv4(),
            image: "/other/about/image_slider5.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider6.png"
        },
    ]

    return (
        <>
            <div className='bg-[#F1FCFC]'>
                <div className='custom-container-no-right xl:pt-24 xl:pb-48 pt-20 pb-40 grid xl:grid-cols-3 grid-cols-5 3xl:gap-20 xl:gap-12 gap-8'>
                    <div className='xl:col-span-1 lg:col-span-2 col-span-5 lg:mx-0 md:mr-10 mr-6 flex flex-col 3xl:gap-8 gap-4 h-full'>
                        <div className='3xl:w-[280px] xl:w-[200px] md:w-[160px] w-[200px] h-auto'>
                            <Image
                                alt="logo"
                                src="/logo/logo_kanow_black.png"
                                width={300}
                                height={100}
                                className='w-full h-auto object-contain'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='w-[18px] min-w-[18px] h-auto'>
                                    <Image
                                        alt="logo"
                                        src="/icon/about/icon_path.png"
                                        width={60}
                                        height={60}
                                        className='w-full h-auto object-contain'
                                    />
                                </div>
                                <div className='3xl:text-xl text-lg text-[#16171B] font-semibold'>
                                    Trách nhiệm với Xã hội và môi trường
                                </div>
                            </div>
                            <div className='3xl:text-base xl:text-sm lg:text-[13px] md:text-sm text-base text-[#6F7689] font-medium'>
                                Chúng tôi tin rằng, việc thực hiện tốt các trách nhiệm xã hội và môi trường không chỉ mang lại lợi ích cho doanh nghiệp mà còn góp phần xây dựng một xã hội tốt đẹp hơn cho thế hệ tương lai.
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row items-center gap-2'>
                                <div className='w-[18px] min-w-[18px] h-auto'>
                                    <Image
                                        alt="logo"
                                        src="/icon/about/icon_path.png"
                                        width={60}
                                        height={60}
                                        className='w-full h-auto object-contain'
                                    />
                                </div>
                                <div className='3xl:text-xl text-lg text-[#16171B] font-semibold'>
                                    Trách nhiệm với Khách hàng
                                </div>
                            </div>
                            <div className='3xl:text-base xl:text-sm lg:text-[13px] md:text-sm text-base text-[#6F7689] font-medium'>
                                KANOW luôn cam kết với khách hàng những dịch vụ tốt nhất với sự an toàn, tiện lợi và chuyên nghiệp. Chúng tôi ý thức được trách nhiệm của mình trong việc cung cấp dịch vụ cho thuê xe ô tô chất lượng cao và đảm bảo sự an toàn cho khách hàng.
                            </div>
                        </div>
                    </div>
                    <div className='xl:col-span-2 lg:col-span-3 col-span-5 h-full'>
                        <Marquee
                            speed={60}
                            pauseOnHover
                            autoFill={true}
                            gradient={false}
                            className='md:rounded-tl-xl md:rounded-bl-xl rounded-tl-lg rounded-bl-lg'
                        >
                            {
                                imageSlider.map((item, index) => (
                                    <div key={item.id} className={`3xl:w-[560px] xl:w-[500px] md:w-[480px] w-[380px] h-full md:px-2 px-1`}>
                                        <Image
                                            alt='image'
                                            src={`${item.image}`}
                                            width={1920}
                                            height={1024}
                                            className='w-full h-full object-cover md:rounded-xl rounded-lg'
                                        />
                                    </div>
                                ))
                            }
                        </Marquee>
                    </div>
                </div>
            </div>
            <div className="md:bg-[url('/background/about_background_3.png')] bg-[url('/background/about_mobile_test_3.png')] bg-cover bg-top md:drop-shadow-2xl drop-shadow-sm 2xl:pt-40 xl:pt-28 xl:pb-20 md:pt-24 pt-44 pb-16 lg:-mt-[120px] md:-mt-[80px] -mt-[180px]">
                <div className='custom-container flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010] lg:max-w-[50%] max-w-full'>
                            Bắt đầu ngay hôm nay
                        </div>
                        <div className='3xl:text-base xl:text-sm lg:text-[13px] md:text-sm text-base text-[#6F7689] font-medium 3xl:max-w-[40%] lg:max-w-[50%] max-w-full'>
                            We&apos;ll get right to the point: we&apos;re asking you to help support Khan Academy. We&apos;re a nonprofit that relies on support from people like you. relies on support
                        </div>
                    </div>
                    <div className='grid grid-cols-2 3xl:gap-10 gap-8 3xl:mt-10 mt-6'>
                        <div className='md:col-span-1 col-span-2 h-full'>
                            <div className='flex flex-col gap-4 justify-between bg-[#C2F9F9] 3xl:p-12 xl:p-8 lg:p-6 p-4 3xl:rounded-3xl rounded-xl h-full'>
                                <div className='flex flex-col gap-2'>
                                    <div className='3xl:text-2xl xl:text-xl text-lg text-[#16171B] font-semibold'>
                                        Xe đã sẵn sàng, bắt đầu hành trình ngay!
                                    </div>
                                    <div className='3xl:text-base xl:text-sm lg:text-[13px] md:text-sm text-base text-[#6F7689] font-medium xl:max-w-[55%] lg:max-w-[80%] max-w-full'>
                                        Tự tay cầm lái chiếc xe mà bạn yêu thích cho hành trình thêm hứng khởi.
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='w-full'>
                                        <Button className='3xl:text-lg xl:text-base text-sm 3xl:px-12 3xl:py-3 2xl:px-8 2xl:py-3 px-8 py-3 w-fit 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-[#2FB9BD]/80 transition-all overflow-hidden bg-[#2FB9BD] text-white'>
                                            Thuê xe tự lái
                                        </Button>
                                    </div>
                                    <div className='w-full 3xl:h-[300px] xl:h-[260px] lg:h-[200px] h-[180px]'>
                                        <Image
                                            alt="image"
                                            src="/other/about/test_image_2.png"
                                            width={800}
                                            height={600}
                                            className='w-full h-full object-cover 3xl:rounded-3xl rounded-xl'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='md:col-span-1 col-span-2 h-full'>
                            <div className='flex flex-col gap-4 justify-between bg-[#14555B] 3xl:p-12 xl:p-8 lg:p-6 p-4 3xl:rounded-3xl rounded-xl h-full'>
                                <div className='flex flex-col gap-2'>
                                    <div className='3xl:text-2xl xl:text-xl text-lg text-white font-semibold'>
                                        Tài xế của bạn đã đến
                                    </div>
                                    <div className='3xl:text-base xl:text-sm lg:text-[13px] md:text-sm text-base text-[#D7D9E0] font-medium xl:max-w-[55%] lg:max-w-[80%] max-w-full'>
                                        Chuyến đi thêm thú vị cùng các bác tài 5* trên KANOW.
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='w-full'>
                                        <Button className='3xl:text-lg xl:text-base text-sm 3xl:px-12 3xl:py-3 2xl:px-8 2xl:py-3 px-8 py-3 w-fit 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-[#2FB9BD]/80 transition-all overflow-hidden bg-[#2FB9BD] text-white'>
                                            Thuê xe có tài xế
                                        </Button>
                                    </div>
                                    <div className='w-full 3xl:h-[300px] xl:h-[260px] lg:h-[200px] h-[180px]'>
                                        <Image
                                            alt="image"
                                            src="/other/about/test_image_3.png"
                                            width={800}
                                            height={600}
                                            className='w-full h-full object-cover 3xl:rounded-3xl rounded-xl'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionThirdAbout