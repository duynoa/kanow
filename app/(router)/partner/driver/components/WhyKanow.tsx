import Image from 'next/image'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

type Props = {}

const WhyKanow = (props: Props) => {
    const reasonsList = [
        {
            id: uuidv4(),
            icon: "/icon/whyKanow/icon_shield.svg",
            title: "Được hệ thống tự động hỗ trợ để đảm bảo nhận được cuốc xe phù hợp nhất"
        },
        {
            id: uuidv4(),
            icon: "/icon/whyKanow/icon_money_euro.svg",
            title: "Được tư vấn, đảm bảo an toàn về mặt pháp lý khi tham gia dịch vụ"
        },
        {
            id: uuidv4(),
            icon: "/icon/whyKanow/icon_money_euro.svg",
            title: "Khi trở thành đối tác ViSafe, bạn có tư cách pháp lý ngang hàng cùng KANOW. Cả hai cùng hỗ trợ nhau phát triển"
        },
        {
            id: uuidv4(),
            icon: "/icon/whyKanow/icon_jet_plane_right.svg",
            title: "Thu nhập ổn định tùy theo năng suất"
        },
        {
            id: uuidv4(),
            icon: "/icon/whyKanow/icon_money_euro.svg",
            title: "Không gò bó về mặt thời gian, chính bạn là người quyết định thời gian làm việc"
        },
        {
            id: uuidv4(),
            icon: "/icon/whyKanow/icon_money_euro.svg",
            title: "Thêm cơ hội được giao tiếp và kết nối với những người trong cộng đồng KANOW"
        },
    ]


    return (
        <div
            id="section-whykanow"
            style={{ background: "linear-gradient(180deg, #FCFDFD 0%, #C2F9F9 118.27%)" }}
            className='lg:pt-20 lg:pb-0 md:pt-0 md:pb-36 pt-0 pb-36'
        >
            <div className='custom-container grid grid-cols-2 xxl:gap-0 gap-6'>
                <div className='lg:col-span-1 col-span-2 flex flex-col gap-8'>
                    <div className='flex flex-col 3xl:gap-4 gap-2'>
                        <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010] 3xl:max-w-[70%] xl:max-w-[85%] lg:max-w-[80%] max-w-full'>
                            Lý do bạn nên đến với KANOW
                        </div>
                        <div className='3xl:text-base lg:text-sm text-sm text-[#757B8A] font-medium 3xl:max-w-[70%] lg:max-w-[85%] max-w-full'>
                            Tự do kiếm thêm thu nhập, lái xe với sự tự tin
                        </div>
                    </div>
                    <div className="3xl:w-[580px] 3xl:h-[740px] xxl:w-[520px] xxl:h-[740px] xl:w-[440px] xl:h-[700px] lg:w-[400px] lg:h-[660px] w-full md:h-[600px] h-[480px]">
                        <Image
                            src="/background/step_background.png"
                            alt="image"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover object-center lg:rounded-t-3xl rounded-3xl"
                        />
                    </div>
                </div>
                <div className='lg:col-span-1 col-span-2 flex flex-col pt-10'>
                    {
                        reasonsList && reasonsList.map((reason, index) => (
                            <div key={reason.id} className='flex flex-row gap-6'>
                                <div className='flex flex-col w-[10%] max-w-[10%] items-center'>
                                    <div className={`bg-[#1EAAB1] group-hover:scale-105 duration-300 transition-colors 3xl:text-lg text-base text-white xl:size-14 lg:size-12 size-11 flex items-center justify-center rounded-full`}>
                                        <Image
                                            width={80}
                                            height={80}
                                            src={reason.icon ? reason.icon : '/default/default.png'}
                                            className='xl:size-6 size-5 object-contain'
                                            alt="icon"
                                        />
                                    </div>
                                    {
                                        index === reasonsList.length - 1 ?
                                            null
                                            :
                                            <div className={`border-[#2FB9BD] w-0.5 h-12 border-r border-l-0 border-y-0 border-dashed`} />
                                    }
                                </div>
                                <div className='w-[90%] max-w-[90%]'>
                                    <div className='3xl:text-lg text-base text-[#757B8A] font-medium'>
                                        {reason.title ? reason.title : ''}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default WhyKanow