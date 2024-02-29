import Image from 'next/image';
import React from 'react'

type Props = {}

const SectionTripCarServices = (props: Props) => {
    return (
        <div className='2xl:pt-20 pt-16'>
            <div className='custom-container z-20 flex 3xl:gap-32 gap-16 relative'>
                <Image
                    alt="background"
                    width={1920}
                    height={1080}
                    src="/background/trip_car.png"
                    className='2xl:w-[50%] 2xl:max-w-[50%] xxl:w-[55%] xxl:max-w-[55%] w-[60%] max-w-[60%] h-full object-cover'
                    loading="lazy"
                />

                {/* phần này absolute */}
                <Image
                    alt="background"
                    width={1920}
                    height={1080}
                    src="/background/icon_the_best.png"
                    className='3xl:w-[200px] 3xl:h-[200px] 2xl:w-[160px] 2xl:h-[160px] xl:w-[160px] xl:h-[160px] w-[140px] h-[140px] object-contain absolute 3xl:top-56 2xl:top-40 top-40 xxl:left-[45%] left-[50%]'
                    loading="lazy"
                />
                <div className='flex flex-col gap-2 absolute 3xl:top-20 2xl:top-10 top-10 left-[40%]'>
                    <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-xl text-xl leading-tight capitalize font-bold text-[#101010]'>
                        Hành Trình Của Bạn Luôn Được Bảo Vệ
                    </div>
                    <div className='3xl:text-base xl:text-sm text-xs text-[#8C93A3] font-normal'>
                        Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái.
                        <br />
                        Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.
                    </div>
                </div>
                <div className='flex flex-col 2xl:gap-8 gap-6 3xl:mt-60 mt-48 3xl:w-[500px] 3xl:max-w-[500px] 2xl:w-[380px] 2xl:max-w-[380px] xxl:w-[360px] xxl:max-w-[360px] w-[400px] max-w-[400px]'>
                    <div className='flex justify-end w-full'>
                        <Image
                            alt="background"
                            width={600}
                            height={400}
                            src="/sponsor/pvi.png"
                            className='3xl:w-[300px] 2xl:w-[240px] xxl:w-[240px] xl:w-[240px] w-[200px] h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                    <div className='flex justify-center w-full'>
                        <Image
                            alt="background"
                            width={600}
                            height={400}
                            src="/sponsor/global_care.png"
                            className='3xl:w-[300px] 2xl:w-[240px] xxl:w-[240px] xl:w-[240px] w-[200px] h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                    <div className='flex justify-start w-full'>
                        <Image
                            alt="background"
                            width={600}
                            height={400}
                            src="/sponsor/vni.png"
                            className='3xl:w-[300px] 2xl:w-[240px] xxl:w-[240px] xl:w-[240px] w-[200px] h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SectionTripCarServices