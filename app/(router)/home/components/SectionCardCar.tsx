import Image from 'next/image'
import React from 'react'

const SectionCardCar = () => {
    return (
        <div className='bg-[#FCFDFD] 3xl:py-24 2xl:py-20 py-16'>
            <div className='custom-container flex flex-col justify-center items-center gap-10'>
                <div data-aos='fade-down' className='3xl:text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-2xl text-2xl leading-tight capitalize font-bold max-w-[85%] text-[#101010]'>
                    Xe dành cho bạn
                </div>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-10 xxl:gap-8 gap-6'>
                    {/* {
                        dataCategoryServices && dataCategoryServices.map((service, index) => (
                            <div key={service.id} data-aos='flip-up' data-aos-delay={index * 150} className='col-span-1 bg-white w-full 2xl:px-8 2xl:py-6 px-6 py-4 flex flex-col gap-2 rounded-md'>
                                <div className='flex justify-between items-center'>
                                    <div
                                        className='2xl:w-12 2xl:h-12 w-11 h-11 rounded-full custom-bg-icon flex items-center justify-center'
                                        style={{ background: 'linear-gradient(111deg, #FCD068 3.06%, #FE9B06 54.19%, #F8B12C 54.2%, #EC5601 117.48%)' }}
                                    >
                                        <Image
                                            alt="icon"
                                            src={service?.icon ? service?.icon : '/default/default.svg'}
                                            width={80}
                                            height={80}
                                            className='2xl:w-7 2xl:h-7 w-6 h-6 object-contain'
                                        />
                                    </div>
                                    <Button onClick={() => router.push(`/services/${service.id}?${ConvertToSlug(service.title)}`)} variant="outline" size="detail">
                                        Chi tiết
                                    </Button>
                                </div>

                                <div className='flex items-center justify-between gap-2'>
                                    <div className={`${service.free ? "3xl:max-w-[80%] xxl:max-w-[75%] xl:max-w-[70%] lg:max-w-[65%] max-w-[65%]" : "max-w-full"} 2xl:text-xl xxl:text-lg xl:text-base lg:text-[15px] md:text-base text-base  text-[#272D37] font-semibold group-hover:text-[#272D37]/80 duration-500 transition ease-in-out line-clamp-2`}>
                                        {service?.title ? service?.title : ''}
                                    </div>
                                    {service.free &&
                                        <div
                                            className='text-[#EC0000] xxl:text-[13px] text-xs px-2 py-1 font-semibold w-fit rounded-md'
                                            style={{ background: 'linear-gradient(111deg, rgba(252, 104, 104, 0.12) 3.06%, rgba(254, 51, 6, 0.12) 54.19%, rgba(248, 93, 44, 0.12) 54.2%, rgba(236, 1, 1, 0.12) 117.48%)' }}
                                        >
                                            Miễn phí
                                        </div>
                                    }
                                </div>

                                <div className='3xl:text-base 2xl:text-[15px] xxl:text-sm xl:text-[13px] lg:text-[13px] md:text-sm text-sm text-[#5F6D7E] group-hover:text-[#5F6D7E]/80 duration-500 transition ease-in-out line-clamp-4'>
                                    {service?.description ? service?.description : ''}
                                </div>
                            </div>
                        ))
                    } */}
                </div>
            </div>
        </div >
    )
}

export default SectionCardCar