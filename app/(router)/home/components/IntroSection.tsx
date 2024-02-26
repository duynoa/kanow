import Image from 'next/image'
import React from 'react'

const IntroSection = () => {
    return (
        <div className='h-[100vh] w-full relative bg-[#FCFDFD]'>
            <Image
                alt="background"
                width={1920}
                height={1080}
                src="/background/cityHome.png"
                className='w-full h-auto object-contain absolute top-32'
            />
            <Image
                alt="icon"
                width={1920}
                height={1080}
                src="/icon/icon_four_point_star.svg"
                className='w-[45px] h-[45px] object-contain absolute left-[64%] top-[22%]'
            />
            <Image
                alt="icon"
                width={1920}
                height={1080}
                src="/icon/icon_four_point_star.svg"
                className='w-[25px] h-[25px] object-contain absolute left-[62%] top-[28%]'
            />
            <Image
                alt="background"
                width={1920}
                height={1080}
                src="/background/line_background.png"
                className='w-full h-auto object-contain absolute -bottom-[126px]'
            />
            <div
                className='h-[60vh] pt-[100px]'
                style={{ background: "linear-gradient(0deg, rgba(3, 107, 116, 0.04) -75.88%, rgba(0, 0, 0, 0.00) 129.69%), rgba(194, 249, 249, 0.60)" }}
            >
                <div className='custom-container relative'>
                    <div className='text-6xl leading-tight font-bold max-w-[45%] pt-24 pb-24 capitalize'>
                        KANOW - Đồng hành mọi chuyến đi của bạn
                    </div>
                    <div className='bg-white w-[500px] h-[320px] z-50'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroSection