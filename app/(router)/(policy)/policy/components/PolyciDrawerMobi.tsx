import { useDrawerStore } from '@/stores/drawerStores'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import Nodata from '@/components/image/Nodata'
const PolyciDrawerMobi = () => {
    const { objectData } = useDrawerStore();

    return (
        <div className='h-full'>
            <div className=" flex items-center justify-center pt-4  pb-4 px-11 font-semibold border-b border-gray-200">
                {objectData?.name ?? ""}
            </div>
            {
                objectData?.setup_qa_items?.length > 0
                    ?
                    <Swiper
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className}"></span>`
                            },
                        }}
                        className="w-full max-w-2xl mx-auto  modal-htu"
                    >
                        {
                            objectData?.setup_qa_items && objectData?.setup_qa_items?.map((slide: any, index: any) => (
                                <SwiperSlide key={index} >
                                    <div className="flex flex-col">
                                        <div className="h-[380px] flex items-center justify-center bg-gray-200">
                                            {/* <div className="mockup-modal max-h-full max-w-full w-[216px]">
                                                <div className="relative h-full w-full ">
                                                    <span className="absolute box-border block overflow-hidden w-full h-full bg-none opacity-100 border-0 m-0 p-0 ">
                                                        <Image
                                                            alt={slide?.content}
                                                            src={slide?.image ?? "/nodata/no-data-amico.png"}
                                                            width={1280}
                                                            height={1024}
                                                            className="block absolute inset-0 box-border p-0 border-none m-auto w-0 h-0 min-w-full max-w-full min-h-full max-h-full object-contain"
                                                        />
                                                    </span>
                                                </div>
                                            </div> */}
                                            <Image
                                                alt={slide?.content}
                                                src={slide?.image ?? "/nodata/no-data-amico.png"}
                                                width={1280}
                                                height={1024}
                                                className="size-full object-contain"
                                            />
                                        </div>
                                        <div className="px-6 pb-14 pt-7">
                                            <h2 className="text-lg font-semibold text-start">
                                                {slide?.content}
                                                {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, alias ipsam ab recusandae amet autem, tempora maiores nesciunt quod necessitatibus voluptate accusantium consequatur. Corporis quae architecto amet enim deleniti incidunt. */}
                                                {/* <span className="" dangerouslySetInnerHTML={{ __html: slide?.content ?? "" }}></span> */}
                                            </h2>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                    :
                    <Nodata type='policyMobi' />
            }

            <style jsx global>{`
            .mockup-modal {
            -webkit-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px #334155, 0 0 10px 0px rgba(0, 0, 0, 0.4);
            -moz-box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px #334155, 0 0 10px 0px rgba(0, 0, 0, 0.4);
            box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px #334155, 0 0 10px 0px rgba(0, 0, 0, 0.4);
            background: -webkit-linear-gradient(315deg, #111827 0%, #1e293b 50%, #1e293b 69%, #334155 100%);
            background: -moz-linear-gradient(315deg, #111827 0%, #1e293b 50%, #1e293b 69%, #334155 100%);
            background: -o-linear-gradient(315deg, #111827 0%, #1e293b 50%, #1e293b 69%, #334155 100%);
            background: linear-gradient(135deg, #111827 0%, #1e293b 50%, #1e293b 69%, #334155 100%);
            position: relative;
            margin: 0px auto;
            height: 100%;
            padding: 4px 10px;
        }
            .modal-htu .swiper-pagination-bullets  {
             width: fit-content;
               background-color: rgba(0,0,0,.4);
                               position: relative;
                padding: 1px 12px;
                position: fixed;
                border-radius: 20px;
                bottom: 15px;
                left:50%;
                transform: translateX(-50%);
            }
            .swiper-pagination-bullet-active {
                background-color: #ffffff !important;
            }
            `}</style>
        </div>
    )
}

export default PolyciDrawerMobi