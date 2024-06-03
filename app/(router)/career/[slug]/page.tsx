"use client"

import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import { useDataDetailCareer } from '@/hooks/useDataQueryKey'
import { useResize } from '@/hooks/useResize'
import { uuidv4 } from '@/lib/uuid'
import { getDetailCarrer, getListBlogNewsAndEvents, getListCarrer } from '@/services/blog/blog.services'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { FaTransgender, FaUsers } from 'react-icons/fa'
import { FaLocationDot, FaSackDollar } from 'react-icons/fa6'
import { IoBook, IoCalendarOutline } from 'react-icons/io5'
import { PiGenderIntersexBold } from 'react-icons/pi'
import { RiPassValidLine } from 'react-icons/ri'
import { TiArrowLeft, TiArrowRight } from 'react-icons/ti'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import SkeletonDetailCareer from '@/components/skeleton/SkeletonDetailCareer'
import { useGeneralKey } from '@/hooks/useGeneralKey'
import { MdMarkEmailRead } from 'react-icons/md'

type Props = {}

const DetailBlogCarrer = (props: Props) => {
    const { isStateDetailCareer, queryKeyIsStateDetailCareer } = useDataDetailCareer()
    const { generalKey, setGeneralKey } = useGeneralKey()

    const swiperRefBlogs = useRef<any>(null);
    const contentRef = useRef<any>(null);
    const params = useParams()
    const idCareer = +params.slug

    const [isMounted, setIsMounted] = useState<boolean>(false)
    // slider banner
    const [sliderStart, setSliderStart] = useState<boolean>(true)
    const [sliderEnd, setSliderEnd] = useState<boolean>(false)

    const { isVisibleMobile } = useResize()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const fetchDetailCareer = async () => {
            try {
                queryKeyIsStateDetailCareer({
                    loading: {
                        ...isStateDetailCareer.loading,
                        isLoadingDataDetail: true,
                    }
                })

                const { data } = await getDetailCarrer(idCareer)

                if (data && data.data) {
                    queryKeyIsStateDetailCareer({
                        dataDetail: data.data,
                        loading: {
                            ...isStateDetailCareer.loading,
                            isLoadingDataDetail: false,
                        }
                    })
                } else {
                    queryKeyIsStateDetailCareer({
                        loading: {
                            ...isStateDetailCareer.loading,
                            isLoadingDataDetail: false,
                        }
                    })
                }

            } catch (err) {
                throw err
            }
        }
        const fetchListCareerRelated = async () => {
            try {
                const dataParams = {
                    id: idCareer,
                    current_page: 1,
                    per_page: 10,
                }

                const { data } = await getListCarrer(dataParams)

                if (data && data.data) {
                    queryKeyIsStateDetailCareer({
                        listCareerRelated: data.data,
                    })
                } else {
                    queryKeyIsStateDetailCareer({
                        listCareerRelated: data.data
                    })
                }

            } catch (err) {
                throw err
            }
        }

        if (isMounted && idCareer) {
            fetchDetailCareer()
            fetchListCareerRelated()
        }
    }, [isMounted, idCareer])

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
        <>
            <div className='flex flex-col pb-10 lg:gap-10 md:gap-8 gap-8 custom-container'>
                {
                    isStateDetailCareer?.loading?.isLoadingDataDetail ?
                        (
                            <SkeletonDetailCareer />
                        )
                        :
                        (
                            isStateDetailCareer?.dataDetail
                                ?
                                <>
                                    <div className='flex flex-col gap-4 3xl:p-16 p-12 bg-[#2FB9BD]/20 rounded-xl'>
                                        <div className='3xl:text-5xl 2xl:text-3xl text-2xl text-[#2FB9BD] font-semibold'>
                                            {isStateDetailCareer?.dataDetail?.title ? isStateDetailCareer?.dataDetail?.title : ""}
                                        </div>

                                        <div className='space-y-1'>
                                            <div className='flex items-center gap-2 3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-sm md:text-base text-base'>
                                                <div className='max-w-[10%]'>
                                                    <RiPassValidLine className='size-4 max-w-4' />
                                                </div>
                                                <div className='space-x-2'>
                                                    <span>Hình thức :</span><span className='font-bold'>{isStateDetailCareer?.dataDetail?.infomation?.working_form}</span>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2 3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-sm md:text-base text-base'>
                                                <div className='max-w-[10%]'>
                                                    <FaUsers className='size-4 max-w-4' />
                                                </div>
                                                <div className='space-x-2'>
                                                    <span>Số lượng tuyển :</span><span className='font-bold'>{isStateDetailCareer?.dataDetail?.infomation?.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-4 3xl:gap-6 gap-4 3xl:p-8 p-6 bg-[#F2F2F2]/80 rounded-xl'>

                                        {
                                            isStateDetailCareer?.dataDetail?.infomation?.gender &&
                                            <div className='col-span-1 flex items-center 3xl:gap-4 gap-3 w-full'>
                                                <div className='max-w-[10%]'>
                                                    <FaTransgender className='size-6 max-w-6 text-[#868686]' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='3xl:text-xs text-[10px] uppercase font-light'>
                                                        Giới tính
                                                    </div>
                                                    <div className='3xl:text-base text-sm'>
                                                        {isStateDetailCareer?.dataDetail?.infomation?.gender}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {
                                            isStateDetailCareer?.dataDetail?.infomation?.experience &&
                                            <div className='col-span-1 flex items-center 3xl:gap-4 gap-3 w-full'>
                                                <div className='max-w-[10%]'>
                                                    <RiPassValidLine className='size-6 max-w-6 text-[#868686]' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='3xl:text-xs text-[10px] uppercase font-light'>
                                                        Kinh nghiệm
                                                    </div>
                                                    <div className='3xl:text-base text-sm'>
                                                        {isStateDetailCareer?.dataDetail?.infomation?.experience ? isStateDetailCareer?.dataDetail?.infomation?.experience : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {
                                            isStateDetailCareer?.dataDetail?.infomation?.degree &&
                                            <div className='col-span-1 flex items-center 3xl:gap-4 gap-3 w-full'>
                                                <div className='max-w-[10%]'>
                                                    <IoBook className='size-6 max-w-6 text-[#868686]' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='3xl:text-xs text-[10px] uppercase font-light'>
                                                        Bằng đại học
                                                    </div>
                                                    <div className='3xl:text-base text-sm'>
                                                        {isStateDetailCareer?.dataDetail?.infomation?.degree}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {
                                            isStateDetailCareer?.dataDetail?.created_at &&
                                            <div className='col-span-1 flex items-center 3xl:gap-4 gap-3 w-full'>
                                                <div className='max-w-[10%]'>
                                                    <IoCalendarOutline className='size-6 max-w-6 text-[#868686]' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='3xl:text-xs text-[10px] uppercase font-light'>
                                                        Ngày đăng
                                                    </div>
                                                    <div className='3xl:text-base text-sm'>
                                                        {moment(isStateDetailCareer?.dataDetail?.created_at).format("DD/MM/YYYY")}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {
                                            isStateDetailCareer?.dataDetail?.infomation?.salary &&
                                            <div className='col-span-1 flex items-center 3xl:gap-4 gap-3 w-full'>
                                                <div className='max-w-[10%]'>
                                                    <FaSackDollar className='size-6 max-w-6 text-[#868686]' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='3xl:text-xs text-[10px] uppercase font-light'>
                                                        Thu nhập
                                                    </div>
                                                    <div className='3xl:text-base text-sm'>
                                                        {isStateDetailCareer?.dataDetail?.infomation?.salary}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {
                                            isStateDetailCareer?.dataDetail?.infomation?.address &&
                                            <div className='col-span-1 flex items-center 3xl:gap-4 gap-3 w-full'>
                                                <div className='max-w-[10%]'>
                                                    <FaLocationDot className='size-6 max-w-6 text-[#868686]' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='3xl:text-xs text-[10px] uppercase font-light'>
                                                        Địa điểm làm việc
                                                    </div>
                                                    <div className='3xl:text-base text-sm'>
                                                        {isStateDetailCareer?.dataDetail?.infomation?.address}
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {
                                            generalKey?.email_recruitment &&
                                            <div className='col-span-1 flex items-center 3xl:gap-4 gap-3 w-full'>
                                                <div className='max-w-[10%]'>
                                                    <MdMarkEmailRead className='size-6 max-w-6 text-[#868686]' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='3xl:text-xs text-[10px] uppercase font-light'>
                                                        Email
                                                    </div>
                                                    <div className='3xl:text-base text-sm'>
                                                        {generalKey?.email_recruitment}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <div className='2xl:text-xl text-xl text-[#000000] font-semibold uppercase'>
                                            Tóm tắt
                                        </div>
                                        <span
                                            dangerouslySetInnerHTML={{ __html: `${isStateDetailCareer?.dataDetail?.descption ? isStateDetailCareer?.dataDetail?.descption : ''}` }}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <div className='2xl:text-xl text-xl text-[#000000] font-semibold uppercase'>
                                            Mô tả công việc
                                        </div>
                                        <span
                                            dangerouslySetInnerHTML={{ __html: `${isStateDetailCareer?.dataDetail?.content ? isStateDetailCareer?.dataDetail?.content : ''}` }}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <div className='2xl:text-xl text-xl text-[#000000] font-semibold uppercase'>
                                            Yêu cầu công việc
                                        </div>
                                        <span
                                            dangerouslySetInnerHTML={{ __html: `${isStateDetailCareer?.dataDetail?.job_requirement ? isStateDetailCareer?.dataDetail?.job_requirement : ''}` }}
                                        />
                                    </div>

                                    <div className='flex flex-col gap-4'>
                                        <div className='2xl:text-xl text-xl text-[#000000] font-semibold uppercase'>
                                            Quyền lợi của bạn
                                        </div>
                                        <div dangerouslySetInnerHTML={{ __html: `${isStateDetailCareer?.dataDetail?.your_benefit ? isStateDetailCareer?.dataDetail?.your_benefit : ''}` }} />
                                    </div>
                                </>
                                :
                                <>No data...</>
                        )
                }

                {
                    isStateDetailCareer?.listCareerRelated ?
                        (
                            <div className='flex flex-col 3xl:gap-8 gap-6'>
                                <div className='2xl:text-xl text-xl text-[#000000] font-semibold uppercase'>
                                    Các công việc tương tự
                                </div>

                                <div className='relative'>
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
                                                slidesPerView: 3,
                                            },
                                            1440: {
                                                slidesPerView: 4,
                                            },
                                            1920: {
                                                slidesPerView: 4,
                                            }
                                        }}
                                        className='custom-swiper grid grid-cols-4'
                                    >
                                        {
                                            isStateDetailCareer?.listCareerRelated.map((item) => (
                                                <SwiperSlide key={`carRelated-${item.id}`} className='col-span-1'>
                                                    <motion.div
                                                        key={`news-${item.id}`}
                                                        initial={false}
                                                        animate={"rest"}
                                                        whileTap="press"
                                                        variants={{
                                                            rest: { scale: 1 },
                                                            press: { scale: 1.01 }
                                                        }}
                                                        className='bg-white border w-full h-full rounded-xl'
                                                    >
                                                        <Link
                                                            className='w-full h-full p-4 flex flex-col gap-2 rounded-xl relative z-0 group transition duration-200 ease-in-out'
                                                            href={`/career/${item.id}?${ConvertToSlug(item?.title)}`}
                                                            prefetch={false}
                                                        >
                                                            <div className='3xl:text-xl 2xl:text-[17px] xxl:text-[17px] xl:text-base lg:text-base md:text-xl text-xl  text-[#272D37] font-semibold group-hover:text-[#272D37]/70 duration-500 transition ease-in-out line-clamp-1 capitalize'>
                                                                {item.title}
                                                            </div>
                                                            <div className='flex items-center gap-2 3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-sm md:text-base text-base text-[#5F6D7E] group-hover:text-[#5F6D7E]/80 duration-500 transition ease-in-out'>
                                                                <div className='max-w-[10%]'>
                                                                    <FaUsers className='size-4 max-w-4' />
                                                                </div>
                                                                <div className='space-x-2'>
                                                                    <span>Số lượng:</span><span className='font-bold'>{item.infomation.quantity}</span><span>người</span>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center gap-2 3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-sm md:text-base text-base text-[#5F6D7E] group-hover:text-[#5F6D7E]/80 duration-500 transition ease-in-out'>
                                                                <div className='max-w-[10%]'>
                                                                    <FaSackDollar className='size-4 max-w-4' />
                                                                </div>
                                                                <div className='space-x-2'>
                                                                    <span>Thu nhập:</span><span className='font-bold'>{item.infomation.salary}</span>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center gap-2 3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-sm md:text-base text-base text-[#5F6D7E] group-hover:text-[#5F6D7E]/80 duration-500 transition ease-in-out'>
                                                                <div className='max-w-[10%]'>
                                                                    <FaLocationDot className='size-4 max-w-4' />
                                                                </div>
                                                                <div className='space-x-2'>
                                                                    <span>Địa điểm làm việc:</span><span className='font-bold'>{item.infomation.address}</span>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center gap-2 3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-sm md:text-base text-base text-[#5F6D7E] group-hover:text-[#5F6D7E]/80 duration-500 transition ease-in-out'>
                                                                <div className='max-w-[10%]'>
                                                                    <RiPassValidLine className='size-4 max-w-4' />
                                                                </div>
                                                                <div className='space-x-2'>
                                                                    <span>Kinh nghiệm:</span><span className='font-bold'>{item.infomation.experience}</span>
                                                                </div>
                                                            </div>
                                                            <div className='flex items-center gap-2 3xl:text-base 2xl:text-sm xxl:text-sm xl:text-sm lg:text-sm md:text-base text-base text-[#5F6D7E] group-hover:text-[#5F6D7E]/80 duration-500 transition ease-in-out'>
                                                                <div className='max-w-[10%]'>
                                                                    <PiGenderIntersexBold className='size-4 max-w-4' />
                                                                </div>
                                                                <div className='space-x-2'>
                                                                    <span>Giới tính:</span><span className='font-bold'>{item.infomation.gender}</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </motion.div>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>

                                    {
                                        isVisibleMobile ?
                                            (null)
                                            :
                                            isStateDetailCareer?.listCareerRelated.length > 4 ?
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
                                </div>
                            </div>
                        )
                        :
                        (null)
                }
            </div>
        </>
    )
}

export default DetailBlogCarrer