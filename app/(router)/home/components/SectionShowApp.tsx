import Image from 'next/image'
import Link from 'next/link'

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
                    <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010] 2xl:max-w-[75%] xxl:max-w-[80%] max-w-full'>
                        Trải nghiệm ứng dụng KANOW ngay hôm nay
                    </div>
                    <div className='3xl:text-base xl:text-sm md:text-xs text-sm text-[#8C93A3] font-medium 2xl:max-w-[75%] xxl:max-w-[80%] max-w-full'>
                        Trải nghiệm trọn vẹn đầy đủ tính năng trên ứng dụng KANOW và nhận được thật nhiều ưu đãi ngay hôm nay
                    </div>
                    <div className='flex items-center 2xl:gap-8 gap-6'>

                        <Link
                            className='3xl:w-[180px] 2xl:w-[160px] lg:w-[140px] md:w-[120px] w-[150px] h-auto'
                            href="https://apps.apple.com/vn/app/kanow-thu%C3%AA-xe-t%C3%A0i-x%E1%BA%BF/id6503139402"
                        >
                            <Image
                                alt="appStore"
                                src="/icon/icon_appStore.svg"
                                width={200}
                                height={200}
                                className='w-full h-full object-contain drop-shadow'
                                loading="lazy"
                            />
                        </Link>
                        <Link
                            className='3xl:w-[180px] 2xl:w-[160px] lg:w-[140px] md:w-[120px] w-[150px] h-auto'
                            href="https://play.google.com/store/apps/details?id=com.kanow&pcampaignid=web_share"
                        >
                            <Image
                                alt="googlePlay"
                                src="/icon/icon_googlePlay.svg"
                                width={200}
                                height={200}
                                className='w-full h-full object-contain drop-shadow'
                                loading="lazy"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionShowApp