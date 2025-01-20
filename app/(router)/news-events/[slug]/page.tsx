"use client"

import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import SkeletonDetailNewsEvents from '@/components/skeleton/SkeletonDetailNewsEvents'
import SkeletonListRelated from '@/components/skeleton/SkeletonListRelated'
import { useDataDetailNewsEvents } from '@/hooks/useDataQueryKey'
import { useResize } from '@/hooks/useResize'
import { uuidv4 } from '@/lib/uuid'
import { getDetailNewsEvents, getListBlogNewsAndEvents } from '@/services/blog/blog.services'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { TiArrowLeft, TiArrowRight } from 'react-icons/ti'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const DetailBlog = (props: Props) => {
    const { isStateDetailNewsEvents, queryKeyIsStateDetailNewsEvents } = useDataDetailNewsEvents()

    const swiperRefBlogs = useRef<any>(null);
    const contentRef = useRef<any>(null);
    const params = useParams()
    const idBlog = +params.slug

    const [isMounted, setIsMounted] = useState<boolean>(false)
    // slider banner
    const [sliderStart, setSliderStart] = useState<boolean>(true)
    const [sliderEnd, setSliderEnd] = useState<boolean>(false)

    const { isVisibleMobile } = useResize()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const fetchDetailNewsEvents = async () => {
            try {
                queryKeyIsStateDetailNewsEvents({
                    loading: {
                        ...isStateDetailNewsEvents.loading,
                        isLoadingDataDetail: true,
                    }
                })

                const { data } = await getDetailNewsEvents(idBlog)

                if (data && data.data) {
                    queryKeyIsStateDetailNewsEvents({
                        dataDetail: data.data,
                        loading: {
                            ...isStateDetailNewsEvents.loading,
                            isLoadingDataDetail: false,
                        }
                    })
                } else {
                    queryKeyIsStateDetailNewsEvents({
                        loading: {
                            ...isStateDetailNewsEvents.loading,
                            isLoadingDataDetail: false,
                        }
                    })
                }

            } catch (err) {
                throw err
            }
        }
        const fetchListNewsEventsRelated = async () => {
            try {
                const dataParams = {
                    id: idBlog,
                    current_page: 1,
                    per_page: 10,
                }

                const { data } = await getListBlogNewsAndEvents(dataParams)

                if (data && data.data) {
                    queryKeyIsStateDetailNewsEvents({
                        listNewsEventsRelated: data.data,
                    })
                } else {
                    queryKeyIsStateDetailNewsEvents({
                        listNewsEventsRelated: data.data
                    })
                }

            } catch (err) {
                throw err
            }
        }

        if (isMounted && idBlog) {
            fetchDetailNewsEvents()
            fetchListNewsEventsRelated()
        }
    }, [isMounted, idBlog])

    const handlePrev = (e: any) => {
        if (swiperRefBlogs.current && !sliderStart) {
            swiperRefBlogs?.current?.slidePrev();
            setSliderStart(swiperRefBlogs.current.isBeginning)
            setSliderEnd(swiperRefBlogs.current.isEnd)
        }
    };

    const handleNext = (e: any) => {
        if (swiperRefBlogs.current && !sliderEnd) {
            swiperRefBlogs?.current?.slideNext();
            setSliderStart(swiperRefBlogs.current.isBeginning)
            setSliderEnd(swiperRefBlogs.current.isEnd)
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div className='flex flex-col pb-20 lg:gap-20 md:gap-16 gap-10 custom-container'>
            {
                isStateDetailNewsEvents?.loading?.isLoadingDataDetail ?
                    (
                        <SkeletonDetailNewsEvents />
                    )
                    :
                    (
                        isStateDetailNewsEvents?.dataDetail
                            ?
                            <>
                                {/* <div
                                    className="md:mt-14 mt-10 lg:h-[60vh] md:h-[50dvh] h-[30dvh] aspect-video bg-cover bg-no-repeat bg-center rounded-xl flex justify-center items-center"
                                    style={{ backgroundImage: `url(${isStateDetailNewsEvents?.dataDetail?.image ? isStateDetailNewsEvents?.dataDetail?.image : "/defaul/default.png"}` }}
                                /> */}
                                <div className='md:mt-14 mt-10 lg:h-[60vh] md:h-[50dvh] h-[30dvh] aspect-video'>
                                    <Image
                                        alt="image"
                                        src={isStateDetailNewsEvents?.dataDetail?.image ?? "/default/default.png"}
                                        width={1920}
                                        height={1080}
                                        className='size-full object-contain aspect-video'
                                        priority
                                    />
                                </div>

                                <div className='flex flex-col gap-4 custom-container'>
                                    <div className='3xl:text-5xl 2xl:text-3xl text-2xl text-[#000000] font-semibold'>
                                        {isStateDetailNewsEvents?.dataDetail?.title ? isStateDetailNewsEvents?.dataDetail?.title : ""}
                                    </div>
                                    <div
                                        ref={contentRef}
                                        dangerouslySetInnerHTML={{ __html: `${isStateDetailNewsEvents?.dataDetail?.content ? isStateDetailNewsEvents?.dataDetail?.content : ''}` }}
                                        className="
                                            mt-6 text-justify
                                            [&_a_has-[img]]:bg-contain [&_a:has(img)]:w-full [&_a:not(:has(img))]:w-fit 
                                            [&_img]:mx-auto [&_figure]:flex [&_figure]:justify-center
                                            [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-gray-300
                                          [&_th]:bg-gray-100 [&_th]:border [&_th]:border-gray-300 [&_th]:p-1 [&_th]:text-left
                                            [&_td]:border [&_td]:border-gray-300 [&_td]:p-1
                                              [&_strong]:inline [&_span]:inline [&_p]:inline
                                            "
                                    />
                                </div>
                            </>
                            :
                            <>
                                No data...
                            </>
                    )
            }

            <div className='flex flex-col 3xl:gap-8 gap-6'>
                <div className='3xl:text-4xl text-3xl font-medium'>
                    Bài viết liên quan
                </div>

                <div className='relative'>
                    {
                        isStateDetailNewsEvents?.listNewsEventsRelated ?
                            (
                                <>
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={20}
                                        modules={[Pagination]}
                                        onSwiper={(swiper) => {
                                            swiperRefBlogs.current = swiper;
                                        }}
                                        allowTouchMove={true}
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 1,
                                            },
                                            640: {
                                                slidesPerView: 1,
                                            },
                                            768: {
                                                slidesPerView: 2,
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                            },
                                            1920: {
                                                slidesPerView: 4,
                                            }
                                        }}
                                        className='custom-swiper'
                                    >
                                        {
                                            isStateDetailNewsEvents?.listNewsEventsRelated.map((item) => (
                                                <SwiperSlide key={`carRelated-${item.id}`}>
                                                    <Link
                                                        href={`/news-events/${item.id}?${ConvertToSlug(item.title)}`}
                                                        className='bg-white border p-4 flex flex-col gap-4 rounded-xl relative z-0 transition duration-200 ease-in-out group'
                                                    >
                                                        <div className='w-full 3xl:h-[220px] xxl:h-[180px] xl:h-[180px] h-[180px] relative overflow-hidden rounded-xl'>
                                                            <Image
                                                                width={600}
                                                                height={600}
                                                                alt="image_card"
                                                                src={item.image}
                                                                className='w-full h-full object-fill rounded-xl group-hover:scale-[1.03] duration-300 ease-in-out transition'
                                                            />
                                                        </div>
                                                        <div className='flex flex-col gap-2 '>
                                                            <div className='3xl:text-xl 2xl:text-[17px] xxl:text-[17px] xl:text-base lg:text-base md:text-xl text-xl  text-[#272D37] font-semibold group-hover:text-[#272D37]/70 duration-500 transition ease-in-out line-clamp-2 min-h-[56px]'>
                                                                {item.title}
                                                            </div>
                                                            <div className='3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-sm md:text-base text-base text-[#5F6D7E] group-hover:text-[#5F6D7E]/80 duration-500 transition ease-in-out line-clamp-4'>
                                                                <span dangerouslySetInnerHTML={{ __html: `${item?.descption ? item?.descption : ''}` }} className="whitespace-break-spaces"></span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>

                                    {
                                        isVisibleMobile ?
                                            (null)
                                            :
                                            isStateDetailNewsEvents?.listNewsEventsRelated.length > 4 ?
                                                (
                                                    <div className='flex gap-2 absolute 3xl:-top-16 xl:top-[-22%] lg:top-[-22%] md:top-[-22%] top-[-18%] right-0 disable-selection'>
                                                        <TiArrowLeft
                                                            onClick={(e) => handlePrev(e)}
                                                            className={`${sliderStart ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                                                        />
                                                        <TiArrowRight
                                                            onClick={(e) => handleNext(e)}
                                                            className={`${sliderEnd ? 'bg-[#F2F2F4] text-[#B8B8C3] cursor-not-allowed' : 'bg-[#FCB203]/10 text-[#DD9200] cursor-pointer hover:scale-125 duration-500 ease-in-out transition'} p-1 2xl:w-10 2xl:h-10 xl:w-9 xl:h-9 w-8 h-8 rounded-full`}
                                                        />
                                                    </div>
                                                )
                                                :
                                                (null)
                                    }
                                </>
                            )
                            :
                            (null)
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailBlog