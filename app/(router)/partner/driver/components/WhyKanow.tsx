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
            style={{ background: "linear-gradient(180deg, #FCFDFD 0%, #C2F9F9 118.27%)" }}
            className='pt-10'
        >
            <div className='custom-container grid grid-cols-2'>
                <div className='col-span-1 flex flex-col gap-8'>
                    <div className='flex flex-col gap-4'>
                        <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-[26px] text-[26px] capitalize font-bold text-[#101010] max-w-[70%]'>
                            Lý do bạn nên đến với KANOW
                        </div>
                        <div className='3xl:text-base text-sm text-[#757B8A] font-medium max-w-[70%]'>
                            Tự do kiếm thêm thu nhập, lái xe với sự tự tin
                        </div>
                        <div className="w-[580px] h-[740px]">
                            <Image
                                src="/background/step_background.png"
                                alt="image"
                                width={800}
                                height={600}
                                className="w-full h-full object-cover object-left-bottom rounded-t-xl"
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col pt-10'>
                    {
                        reasonsList && reasonsList.map((reason, index) => (
                            <div key={reason.id} className='flex flex-row gap-6'>
                                <div className='flex flex-col w-[10%] max-w-[10%] items-center'>
                                    <div className={`bg-[#1EAAB1] group-hover:scale-105 duration-300 transition-colors 3xl:text-lg text-base text-white size-14 flex items-center justify-center rounded-full`}>
                                        <Image
                                            width={80}
                                            height={80}
                                            src={reason.icon ? reason.icon : '/default/default.png'}
                                            className='size-6 object-contain'
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