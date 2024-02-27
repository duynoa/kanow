import Image from 'next/image'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

type Props = {}

const SectitonWhyWe = (props: Props) => {
    const dataServicesWhyMe = [
        {
            id: uuidv4(),
            icon: "/sponsor/pvi.png",
            title: "Thủ tục đơn giản",
            content: "Chỉ cần có Thẻ Căn cước / CMND/ CCCD gắn chip (Hoặc Passport) & Giấy phép lái xe là bạn đã đủ điều kiện thuê xe trên KANOW."
        },
        {
            id: uuidv4(),
            icon: "/sponsor/pvi.png",
            title: "Hỗ trợ 24/7",
            content: "Chúng tôi luôn sẵn sàng hỗ trợ khách hàng đặt xe trong mọi thời gian không kể nghỉ lễ tết. Đa dạng hình thức thanh toán: ATM, thẻ Visa & Ví điện tử"
        },
        {
            id: uuidv4(),
            icon: "/sponsor/pvi.png",
            title: "An tâm đặt xe",
            content: "Không tính phí huỷ chuyến trong vòng 1h sau khi đặt cọc. Hoàn cọc và bồi thường 100% nếu chủ xe huỷ chuyến trong vòng 7 ngày trước chuyến đi."
        },
    ]

    return (
        <div className="relative flex bg-[url('/background/why_background.png')] bg-cover 3xl:pb-24 3xl:pt-52 py-16">
            <div className='custom-container z-20 flex flex-col items-center gap-4 w-full'>
                <div data-aos='fade-down' className='3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-xl leading-tight capitalize font-bold text-[#101010]'>
                    Vì sao chọn chúng tôi
                </div>
                <div data-aos='fade-down' className='3xl:text-base text-sm text-[#8C93A3] font-medium'>
                    Chúng tôi luôn cố gắng để giúp bạn dễ dàng hơn khi thuê xe
                </div>
                <div className='mt-6 grid grid-cols-3 gap-4'>
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
                                <div className='3xl:text-2xl text-xl font-semibold max-w-[70%] mt-2'>
                                    {item.title}
                                </div>
                                <div className='3xl:text-base text-sm font-normal text-[#595C68]/80 max-w-[60%]'>
                                    {item.content}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        // <div className="relative flex h-[720px] bg-[url('/background/background_contact.png')]">
        //     <div className='custom-container z-20 flex flex-col items-center gap-4 3xl:pt-44 3xl:pb-32 py-16 w-full'>
        //         <div data-aos='fade-down' className='3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-xl leading-tight capitalize font-bold text-[#101010]'>
        //             Vì sao chọn chúng tôi
        //         </div>
        //         <div data-aos='fade-down' className='3xl:text-base text-sm text-[#8C93A3] font-medium'>
        //             Chúng tôi luôn cố gắng để giúp bạn dễ dàng hơn khi thuê xe
        //         </div>
        //     </div>

        //     <Image
        //         alt="background"
        //         width={1920}
        //         height={1080}
        //         src="/background/why_background.png"
        //         className='w-full h-[720px] object-fill absolute bottom-0 drop-shadow z-[2]'
        //     />
        // </div>
    )
}

export default SectitonWhyWe