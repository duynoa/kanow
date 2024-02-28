import Image from 'next/image'
import React from 'react'

type Props = {}

const SectionShowApp = (props: Props) => {
    return (
        <div className='3xl:pt-24 pt-16'>
            <div className='custom-container flex'>
                <div className='w-[50%] max-w-[50%]'>
                    <Image
                        alt="app_kanow"
                        src="/background/app_kanow.png"
                        width={1920}
                        height={1080}
                        className='w-full h-auto object-contain'
                    />
                </div>
                <div className='w-[50%] max-w-[50%] pt-16 flex flex-col gap-6 pl-48'>
                    <div data-aos='fade-down' className='3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-xl capitalize font-bold text-[#101010] max-w-[75%]'>
                        Trải nghiệm ứng dụng KANOW ngay hôm nay
                    </div>
                    <div data-aos='fade-down' className='3xl:text-base text-sm text-[#8C93A3] font-medium max-w-[75%]'>
                        Trải nghiệm trọn vẹn đầy đủ tính năng trên ứng dụng KANOW và nhận được thật nhiều ưu đãi ngay hôm nay
                    </div>
                    <div className='flex items-center gap-8'>
                        <Image
                            alt="appStore"
                            src="/icon/icon_appStore.svg"
                            width={200}
                            height={200}
                            className='w-[200px] h-[60px] object-cover drop-shadow'
                        />
                        <Image
                            alt="googlePlay"
                            src="/icon/icon_googlePlay.svg"
                            width={200}
                            height={200}
                            className='w-[200px] h-[60px] object-cover drop-shadow'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionShowApp