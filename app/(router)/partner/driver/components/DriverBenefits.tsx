import Image from 'next/image';
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

type Props = {}

const DriverBenefits = (props: Props) => {
    const benefitsList = [
        {
            id: uuidv4(),
            icon: "/icon/benefits/benefit1.png",
            title: 'Công việc tự do, văn minh, hiện tại'
        },
        {
            id: uuidv4(),
            icon: "/icon/benefits/benefit2.png",
            title: 'Nguồn khách hàng đa dạng, tự động, sẵn có và không giới hạn'
        },
        {
            id: uuidv4(),
            icon: "/icon/benefits/benefit3.png",
            title: 'Môi trường giao lưu chia sẻ kinh nghiệm từ anh em tài xế'
        },
        {
            id: uuidv4(),
            icon: "/icon/benefits/benefit4.png",
            title: 'Trải nghiệm công nghệ và dịch vụ chuyên nghiệp'
        },
        {
            id: uuidv4(),
            icon: "/icon/benefits/benefit5.png",
            title: 'Hoàn toàn chủ động trong thời gian lái xe'
        },
        {
            id: uuidv4(),
            icon: "/icon/benefits/benefit6.png",
            title: 'Đồng hành, phát triền cùng KANOW'
        },
        {
            id: uuidv4(),
            icon: "/icon/benefits/benefit7.png",
            title: 'Kết nối cộng đồng tài xế trên mọi nẻo đường'
        },
        {
            id: uuidv4(),
            icon: "/icon/benefits/benefit8.png",
            title: 'Minh bạch trong thanh toán và thu nhập'
        },
    ]

    return (
        <div className="bg-[url('/background/benefit_background1.png')] bg-cover h-full -mt-[120px] relative z-10">
            <div className='custom-container pt-40 pb-36 flex flex-col gap-10'>
                <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-[26px] text-[26px] capitalize font-bold text-[#101010]'>
                    Những quyền lợi của tài xế
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        benefitsList && benefitsList.map((benefit) => (
                            <div key={benefit.id} className='col-span-1 p-6 flex items-center gap-4 border border-[#64E4E4] hover:bg-[#9DF2EE] bg-[#F1FCFC] rounded-xl duration-200 transition ease-in-out'>
                                <div className='w-16 min-w-16 h-auto'>
                                    <Image
                                        src={benefit.icon ? benefit.icon : '/default/default.png'}
                                        alt="icon"
                                        width={80}
                                        height={80}
                                        className='w-full h-auto object-contain'
                                    />
                                </div>
                                <div className='3xl:text-lg text-base text-[#1C1212] font-medium cursor-default'>
                                    {benefit?.title ? benefit?.title : ''}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DriverBenefits