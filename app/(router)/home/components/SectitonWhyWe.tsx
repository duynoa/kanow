import Image from 'next/image'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

type Props = {}

const SectitonWhyWe = (props: Props) => {
    const dataServicesWhyMe = [
        {
            id: uuidv4(),
            icon: "/icon/icon_map.svg",
            title: "Thủ tục đơn giản",
            content: "Chỉ cần có Thẻ Căn cước / CMND/ CCCD gắn chip (Hoặc Passport) & Giấy phép lái xe là bạn đã đủ điều kiện thuê xe trên KANOW."
        },
        {
            id: uuidv4(),
            icon: "/icon/icon_support.svg",
            title: "Hỗ trợ 24/7",
            content: "Chúng tôi luôn sẵn sàng hỗ trợ khách hàng đặt xe trong mọi thời gian không kể nghỉ lễ tết. Đa dạng hình thức thanh toán: ATM, thẻ Visa & Ví điện tử"
        },
        {
            id: uuidv4(),
            icon: "/icon/icon_building.svg",
            title: "An tâm đặt xe",
            content: "Không tính phí huỷ chuyến trong vòng 1h sau khi đặt cọc. Hoàn cọc và bồi thường 100% nếu chủ xe huỷ chuyến trong vòng 7 ngày trước chuyến đi."
        },
    ]

    return (
        <div className="relative flex lg:bg-[url('/background/why_background.png')] bg-[url('/background/why_background_mobile.png')] bg-cover drop-shadow 3xl:pt-56 3xl:pb-32 2xl:pt-44 2xl:pb-28 xl:pt-40 xl:pb-24 md:pt-36 md:pb-24 py-20">
            <div className='custom-container z-20 flex flex-col md:items-center items-start 3xl:gap-4 gap-2 w-full'>
                <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-[26px] text-[26px] leading-tight capitalize font-bold text-[#101010]'>
                    Vì sao chọn chúng tôi
                </div>
                <div className='3xl:text-base xl:text-sm md:text-xs text-sm text-[#8C93A3] font-normal '>
                    Chúng tôi luôn cố gắng để giúp bạn dễ dàng hơn khi thuê xe
                </div>
                <div className='mt-6 grid md:grid-cols-3 grid-cols-1 md:gap-4 gap-10'>
                    {
                        dataServicesWhyMe && dataServicesWhyMe.map((item) => (
                            <div key={item.id} className='col-span-1 w-full flex flex-col gap-3 items-center text-center'>
                                <Image
                                    width={600}
                                    height={600}
                                    alt="image_card"
                                    src={item.icon ? item.icon : '/default/default.png'}
                                    className='w-[64px] h-[64px] object-cover rounded-xl'
                                />
                                <div className='3xl:text-2xl text-xl font-semibold xl:max-w-[70%] lg:max-w-[80%] md:max-w-[95%] max-w-full mt-2'>
                                    {item.title}
                                </div>
                                <div className='3xl:text-base text-sm font-normal text-[#595C68]/80 xl:max-w-[60%] lg:max-w-[75%] md:max-w-[95%] max-w-full'>
                                    {item.content}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <Image
                alt="cloud1"
                width={1920}
                height={1080}
                src="/icon/cloud.svg"
                className='xxl:w-[140px] xxl:h-[60px] w-[100px] h-[50px] object-contain absolute top-[45%] -left-[3%] -rotate-6'
                loading="lazy"
            />
            <Image
                alt="cloud2"
                width={1920}
                height={1080}
                src="/icon/cloud.svg"
                className='xxl:w-[140px] xxl:h-[60px] w-[100px] h-[50px] object-contain absolute md:bottom-12 bottom-5 md:left-[20%] left-[10%]'
                loading="lazy"
            />
            <Image
                alt="cloud3"
                width={1920}
                height={1080}
                src="/icon/cloud.svg"
                className='xxl:w-[140px] xxl:h-[60px] w-[100px] h-[50px] object-contain absolute md:top-[30%] top-[20%] xxl:right-[25%] xl:right-[20%] lg:right-[15%] md:right-[10%] right-0 -rotate-6'
                loading="lazy"
            />
            <Image
                alt="cloud3"
                width={1920}
                height={1080}
                src="/icon/cloud.svg"
                className='xxl:w-[110px] xxl:h-[50px] w-[80px] h-[40px] object-contain absolute md:bottom-[5%] bottom-[22%] right-[5%] -rotate-2'
                loading="lazy"
            />
            <Image
                alt="cloud3"
                width={1920}
                height={1080}
                src="/background/line_background3.svg"
                className='w-full h-auto object-contain absolute top-0 right-0'
                loading="lazy"
            />
        </div>
    )
}

export default SectitonWhyWe