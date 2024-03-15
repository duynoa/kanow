import { useResize } from '@/hooks/useResize';
import Image from 'next/image';
import React from 'react'

type Props = {}

const SectionTripCarServices = (props: Props) => {
    const {isVisibleMobile} = useResize()

    return (
        <div className='2xl:pt-20 md:pt-16 md:pb-0 py-16'>
            <div className='custom-container z-20 flex md:flex-row flex-col 3xl:gap-32 lg:gap-16 gap-2 relative'>
                <Image
                    alt="background"
                    width={1920}
                    height={1080}
                    src="/background/trip_car.png"
                    className='2xl:w-[50%] 2xl:max-w-[50%] xxl:w-[55%] xxl:max-w-[55%] lg:w-[60%] lg:max-w-[60%] md:w-[70%] md:max-w-[70%] w-full max-w-full h-full object-cover md:order-none order-2'
                    loading="lazy"
                />

                {/* phần này absolute */}
                <Image
                    alt="background"
                    width={1920}
                    height={1080}
                    src="/background/icon_the_best.png"
                    className='3xl:w-[200px] 3xl:h-[200px] xl:w-[160px] xl:h-[160px] lg:w-[140px] lg:h-[140px] md:w-[100px] md:h-[100px] w-[120px] h-[120px] object-contain absolute 3xl:top-56 lg:top-40 md:top-[150px] top-48 xxl:left-[45%] lg:left-[50%] left-[58%]'
                    loading="lazy"
                />
                <div className='flex flex-col gap-2 md:absolute 3xl:top-20 2xl:top-10 lg:top-10 top-4 left-[40%] md:order-none order-1'>
                    <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl text-[26px] leading-tight capitalize font-bold text-[#101010]'>
                        Hành Trình Của Bạn Luôn Được Bảo Vệ
                    </div>
                    <div className='3xl:text-base xl:text-sm md:text-xs text-sm text-[#8C93A3] font-normal'>
                        Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái.
                        <br />
                        Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.
                    </div>
                </div>
                <div className='flex flex-col 2xl:gap-8 lg:gap-6 gap-4 3xl:mt-60 lg:mt-48 md:mt-40 3xl:w-[500px] 3xl:max-w-[500px] 2xl:w-[380px] 2xl:max-w-[380px] xxl:w-[360px] xxl:max-w-[360px] md:w-[400px] md:max-w-[400px] w-full md:order-none order-3'>
                    <div className='flex md:justify-end w-full'>
                        <Image
                            alt="background"
                            width={600}
                            height={400}
                            src="/sponsor/pvi.png"
                            className='3xl:w-[300px] 2xl:w-[240px] xxl:w-[240px] xl:w-[240px] lg:w-[200px] md:w-[160px] w-full h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                    <div className='flex md:justify-center w-full'>
                        <Image
                            alt="background"
                            width={600}
                            height={400}
                            src="/sponsor/global_care.png"
                            className='3xl:w-[300px] 2xl:w-[240px] xxl:w-[240px] xl:w-[240px] lg:w-[200px] md:w-[160px] w-full h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                    <div className='flex md:justify-start w-full'>
                        <Image
                            alt="background"
                            width={600}
                            height={400}
                            src="/sponsor/vni.png"
                            className='3xl:w-[300px] 2xl:w-[240px] xxl:w-[240px] xl:w-[240px] lg:w-[200px] md:w-[160px] w-full h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SectionTripCarServices