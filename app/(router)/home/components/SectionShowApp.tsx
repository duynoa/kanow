import Image from 'next/image'
import React from 'react'

type Props = {}

const SectionShowApp = (props: Props) => {
    return (
        <div className='3xl:pt-24 md:pt-16 pt-20'>
            <div className='custom-container flex md:flex-row md:gap-0 flex-col gap-4'>
                <div className='md:w-[50%] md:max-w-[50%] w-full md:order-none order-2'>
                    <Image
                        alt="app_kanow"
                        src="/background/app_kanow.png"
                        width={1920}
                        height={1080}
                        className='w-full h-auto object-contain'
                        priority
                    />
                </div>
                <div className='md:w-[50%] md:max-w-[50%] w-full lg:pt-16 md:pt-6 flex flex-col lg:gap-6 gap-3 3xl:pl-48 xl:pl-40 lg:pl-28 md:pl-6 md:order-none order-1'>
                    <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl text-[26px] capitalize font-bold text-[#101010] 2xl:max-w-[75%] xxl:max-w-[80%] max-w-full'>
                        Trải nghiệm ứng dụng KANOW ngay hôm nay
                    </div>
                    <div className='3xl:text-base xl:text-sm md:text-xs text-sm text-[#8C93A3] font-medium 2xl:max-w-[75%] xxl:max-w-[80%] max-w-full'>
                        Trải nghiệm trọn vẹn đầy đủ tính năng trên ứng dụng KANOW và nhận được thật nhiều ưu đãi ngay hôm nay
                    </div>
                    <div className='flex items-center 2xl:gap-8 gap-6'>
                        <Image
                            alt="appStore"
                            src="/icon/icon_appStore.svg"
                            width={200}
                            height={200}
                            className='3xl:w-[180px] 2xl:w-[160px] lg:w-[140px] md:w-[120px] w-[150px] h-auto object-contain drop-shadow'
                            loading="lazy"
                        />
                        <Image
                            alt="googlePlay"
                            src="/icon/icon_googlePlay.svg"
                            width={200}
                            height={200}
                            className='3xl:w-[180px] 2xl:w-[160px] lg:w-[140px] md:w-[120px] w-[150px] h-auto object-contain drop-shadow'
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionShowApp