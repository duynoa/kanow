import Image from 'next/image'
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const IntroSection = () => {
    const tabSearch = [
        {
            id: uuidv4(),
            name: "Xe tự lái"
        },
        {
            id: uuidv4(),
            name: "Xe có tài xế"
        },
        {
            id: uuidv4(),
            name: "Tìm tài xế"
        },
    ]

    return (
        <div className='h-[100vh] w-full relative'>
            <Image
                alt="background"
                width={1920}
                height={1080}
                src="/background/cityHome.png"
                className='w-full h-auto object-contain absolute'
            />
            <Image
                alt="background"
                width={1920}
                height={1080}
                src="/background/line_background1.png"
                className='w-full h-auto object-contain absolute -bottom-[4px] drop-shadow'
            />
            <div
                className='h-[60vh]'
                style={{ background: "linear-gradient(0deg, rgba(3, 107, 116, 0.04) -75.88%, rgba(0, 0, 0, 0.00) 129.69%), rgba(194, 249, 249, 0.60)" }}
            >
                <div className='custom-container relative'>
                    <div className='text-6xl leading-tight font-bold max-w-[45%] pt-24 pb-24 capitalize'>
                        KANOW - Đồng hành mọi chuyến đi của bạn
                    </div>
                    <div className='flex flex-col  w-[500px] h-[320px]'>
                        <div className='flex items-center bg-white/0'>
                            {tabSearch && tabSearch.map((tab) => (
                                <div key={tab.id} className='px-6 py-3 text-sm text-[#585F71] font-medium bg-[#BEE9EA] rounded-t-xl border-l border-l-[#BEE9EA]'>
                                    {tab.name ? tab.name : ""}
                                </div>
                            ))}
                        </div>
                        <div className='bg-white h-full'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroSection