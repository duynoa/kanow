import Image from 'next/image'
import React from 'react'
import { v4 as uuidv4 } from "uuid"
import Marquee from "react-fast-marquee";

type Props = {}

const IntroSectionAbout = (props: Props) => {
    const imageSlider = [
        {
            id: uuidv4(),
            image: "/other/about/image_slider1.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider2.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider3.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider4.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider3.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider4.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider3.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider4.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider3.png"
        },
        {
            id: uuidv4(),
            image: "/other/about/image_slider4.png"
        },
    ]

    return (
        <div className='3xl:pt-4 xl:pt-10 pt-6 w-full'>
            <div className='custom-container flex flex-col items-center justify-center gap-2'>
                <div className='3xl:text-[3rem] 2xl:text-[2.5rem] xxl:text-[2.25rem] xl:text-[2.25rem] lg:text-[1.875rem] md:text-[1.5rem] text-[2rem] font-bold max-w-full capitalize leading-tight'>
                    <span className='text-[#166A71]'>KANOW</span> - Cùng bạn trên mọi nẻo đường
                </div>
                <div className='3xl:text-base text-sm text-[#585F71] font-normal xl:max-w-[55%] max-w-[65%] text-center'>
                    Mỗi chuyến đi là một hành trình khám phá cuộc sống và thế giới xung quanh, là cơ hội học hỏi và chinh phục những điều mới lạ của mỗi cá nhân để trở nên tốt hơn.
                </div>
            </div>

            <Marquee
                speed={60}
                pauseOnHover
                autoFill={true}
                gradient={false}
                className='3xl:mt-[60px] xl:mt-[82px] lg:mt-[82px] mt-10'
            >
                {
                    imageSlider && imageSlider.map((item, index) => (
                        <div key={item.id} className={`${index % 2 === 0 ? "xl:w-[600px] w-[540px] xl:h-[400px] md:h-[320px] h-full" : "3xl:w-[300px] w-[240px] xl:h-[400px] md:h-[320px] h-full"} px-2`}>
                            <Image
                                alt='image'
                                src={`${item.image}`}
                                width={1920}
                                height={1024}
                                className='w-full h-full object-cover rounded-xl'
                            />
                        </div>
                    ))
                }
            </Marquee>

            <div className='bg-[#F1FCFC]'>
                <div className='custom-container xl:py-20 py-16 grid lg:grid-cols-5 grid-cols-6 xl:gap-8 gap-4'>
                    <div className='lg:col-span-2 col-span-5 flex flex-col gap-2'>
                        <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010] 3xl:max-w-[70%] 2xl:max-w-[55%] lg:max-w-[70%] max-w-full'>
                            Theo bạn đến mọi hành trình
                        </div>
                        <div className='3xl:text-base xl:text-sm lg:text-[13px] md:text-sm text-sm text-[#8C93A3] font-medium lg:max-w-[75%] max-w-full'>
                            Chúng tôi tin rằng với các biện pháp bảo vệ an toàn và hỗ trợ kịp thời, khách hàng sẽ luôn an tâm khi trải nghiệm KANOW.
                        </div>
                    </div>
                    <div className='lg:col-span-1 col-span-2 3xl:space-y-6 space-y-4'>
                        <div className={`bg-[#14868E] group-hover:scale-105 duration-300 transition-colors 3xl:text-lg text-base text-white 3xl:size-14 lg:size-12 size-10 flex items-center justify-center rounded-full`}>
                            <Image
                                width={80}
                                height={80}
                                src={"/icon/about/icon_security_user.png"}
                                className='3xl:size-7 lg:size-6 size-5 object-contain'
                                alt="icon"
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='3xl:text-lg text-base uppercase font-bold'>
                                Bảo vệ an toàn
                            </div>
                            <div className='3xl:text-base xl:text-sm md:text-sm text-sm text-[#8C93A3] font-medium'>
                                Nhiều biện pháp: bảo hiểm, huấn luyện và kiểm tra thường xuyên trình độ tài xế
                            </div>
                        </div>
                    </div>
                    <div className='lg:col-span-1 col-span-2 3xl:space-y-6 space-y-4'>
                        <div className={`bg-[#FF9900] group-hover:scale-105 duration-300 transition-colors 3xl:text-lg text-base text-white 3xl:size-14 lg:size-12 size-10 flex items-center justify-center rounded-full`}>
                            <Image
                                width={80}
                                height={80}
                                src={"/icon/about/icon_timer.png"}
                                className='3xl:size-7 lg:size-6 size-5 object-contain'
                                alt="icon"
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='3xl:text-lg text-base uppercase font-bold'>
                                Hỗ trợ kịp thời
                            </div>
                            <div className='3xl:text-base xl:text-sm md:text-sm text-sm text-[#8C93A3] font-medium'>
                                Chúng tôi luôn sẵn sàng hỗ trợ khách hàng 24/7, bao gồm thứ 7, chủ nhật và lễ tết
                            </div>
                        </div>
                    </div>
                    <div className='lg:col-span-1 col-span-2 3xl:space-y-6 space-y-4'>
                        <div className={`bg-[#383A43] group-hover:scale-105 duration-300 transition-colors 3xl:text-lg text-base text-white 3xl:size-14 lg:size-12 size-10 flex items-center justify-center rounded-full`}>
                            <Image
                                width={80}
                                height={80}
                                src={"/icon/about/icon_star.png"}
                                className='3xl:size-7 lg:size-6 size-5 object-contain'
                                alt="icon"
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='3xl:text-lg text-base uppercase font-bold'>
                                liên tục đổi mới
                            </div>
                            <div className='3xl:text-base xl:text-sm md:text-sm text-sm text-[#8C93A3] font-medium'>
                                Luôn sẵn sàng thích nghi với những thay đổi không ngừng trong quá trình phục vụ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroSectionAbout