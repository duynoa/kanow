import Image from 'next/image';
import React from 'react'

type Props = {}

const SectionTripCarServices = (props: Props) => {
    return (
        <div className='2xl:py-20 py-16'>
            <div className='custom-container z-20 flex gap-32 relative'>
                <Image
                    alt="background"
                    width={1920}
                    height={1080}
                    src="/background/trip_car.png"
                    className='w-[50%] max-w-[50%] h-full object-cover'
                    loading="lazy"
                />

                {/* phần này absolute */}
                <Image
                    alt="background"
                    width={1920}
                    height={1080}
                    src="/background/icon_the_best.png"
                    className='w-[200px] h-[200px] object-contain absolute top-56 left-[45%]'
                    loading="lazy"
                />
                <div className='flex flex-col gap-2 absolute top-20 left-[40%]'>
                    <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-xl text-xl leading-tight capitalize font-bold text-[#101010]'>
                        Hành Trình Của Bạn Luôn Được Bảo Vệ
                    </div>
                    <div className='3xl:text-base xl:text-sm text-xs text-[#8C93A3] font-medium'>
                        Chuyến đi trên KANOW được bảo vệ với Gói bảo hiểm thuê xe tự lái.
                        <br />
                        Khách thuê sẽ chỉ bồi thường tối đa 2,000,000VNĐ trong trường hợp có sự cố ngoài ý muốn.
                    </div>
                </div>
                <div className='flex flex-col gap-8 mt-60 w-[500px] max-w-[500px]'>
                    <div className='flex justify-end w-full'>
                        <Image
                            alt="background"
                            width={600}
                            height={400}
                            src="/sponsor/pvi.png"
                            className='w-[300px] h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                    <div className='flex justify-center w-full'>
                        <Image
                            alt="background"
                            width={600}
                            height={400}
                            src="/sponsor/global_care.png"
                            className='w-[300px] h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                    <div className='flex justify-start w-full'>
                        <Image
                            alt="background"
                            width={600}
                            height={400}
                            src="/sponsor/vni.png"
                            className='w-[300px] h-auto object-contain'
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SectionTripCarServices