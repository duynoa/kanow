'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { uuidv4 } from '@/lib/uuid'
import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import SkeletonCarrer from '@/components/skeleton/SkeletonCarrer'

import { useDataListCarrer } from '@/hooks/useDataQueryKey'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { getListCarrer } from '@/services/blog/blog.services'

import { FaUsers } from 'react-icons/fa'
import { FaLocationDot, FaSackDollar } from 'react-icons/fa6'
import { RiPassValidLine } from 'react-icons/ri'
import { PiGenderIntersexBold } from 'react-icons/pi'

import { motion } from 'framer-motion'
import PaginationCustom from '@/components/pagination/PaginationCustom'

type Props = {}

const Career = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const { isStateListCarrer, queryKeyIsStateListCarrer } = useDataListCarrer()

    const param: ReadonlyURLSearchParams = useSearchParams()
    
    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const fetchListBlogNewsAndEvent = async () => {
            try {
                queryKeyIsStateListCarrer({
                    loading: {
                        ...isStateListCarrer.loading,
                        isLoadingListCarrer: true
                    },
                })

                const dataParams = {
                    current_page: isStateListCarrer.params.page,
                    per_page: isStateListCarrer.params.limit
                }
                const { data } = await getListCarrer(dataParams)

                if (data && data.data && data.base && data.meta && data.links) {
                    queryKeyIsStateListCarrer({
                        listCarrer: data.data,
                        loading: {
                            ...isStateListCarrer.loading,
                            isLoadingListCarrer: false
                        },
                        params: {
                            page: isStateListCarrer.params.page,
                            limit: isStateListCarrer.params.limit,
                            next: data.links.next,
                            total_blog: data.meta.total,
                        }
                    })
                } else {
                    queryKeyIsStateListCarrer({
                        loading: {
                            ...isStateListCarrer.loading,
                            isLoadingListCarrer: false
                        },
                    })

                }

            } catch (err) {
                throw err
            }
        }
        if (isMounted) {
            fetchListBlogNewsAndEvent();
        }
    }, [isMounted])

    const handleChangePage = async (page: number) => {
        if (page !== isStateListCarrer?.params?.page) {
            try {
                queryKeyIsStateListCarrer({
                    loading: {
                        ...isStateListCarrer.loading,
                        isLoadingListCarrer: true
                    },
                })

                const dataParams = {
                    current_page: page,
                    per_page: isStateListCarrer.params.limit
                }
                const { data } = await getListCarrer(dataParams)

                if (data && data.data && data.base && data.meta && data.links) {
                    queryKeyIsStateListCarrer({
                        listCarrer: data.data,
                        loading: {
                            ...isStateListCarrer.loading,
                            isLoadingListCarrer: false
                        },
                        params: {
                            ...isStateListCarrer.params,
                            page: page,
                            next: data.links.next,
                            total_blog: data.meta.total,
                        }
                    })
                } else {
                    queryKeyIsStateListCarrer({
                        loading: {
                            ...isStateListCarrer.loading,
                            isLoadingListCarrer: false
                        },
                        params: {
                            ...isStateListCarrer.params,
                            page: isStateListCarrer.params.page,
                            next: data.links.next,
                            total_blog: data.meta.total,
                        }
                    })

                }

            } catch (err) {
                throw err
            } try {
                queryKeyIsStateListCarrer({
                    loading: {
                        ...isStateListCarrer.loading,
                        isLoadingListCarrer: true
                    },
                })

                const dataParams = {
                    current_page: page,
                    per_page: isStateListCarrer.params.limit
                }
                const { data } = await getListCarrer(dataParams)

                console.log("data current_page", data);
                if (data && data.data && data.base && data.meta && data.links) {
                    queryKeyIsStateListCarrer({
                        listCarrer: data.data,
                        loading: {
                            ...isStateListCarrer.loading,
                            isLoadingListCarrer: false
                        },
                        params: {
                            page: page,
                            limit: isStateListCarrer.params.limit,
                            next: data.links.next,
                            total_blog: data.meta.total,
                        }
                    })
                } else {
                    queryKeyIsStateListCarrer({
                        loading: {
                            ...isStateListCarrer.loading,
                            isLoadingListCarrer: false
                        },
                    })

                }

            } catch (err) {
                throw err
            }
        }
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className='custom-container flex flex-col gap-8 xl:py-10 py-6'>
            <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl text-[26px] leading-tight capitalize font-bold md:max-w-[85%] max-w-full text-[#101010]'>
                Tuyển dụng
            </div>
            {
                isStateListCarrer?.loading?.isLoadingListCarrer ?
                    <SkeletonCarrer />
                    :
                    <>
                        <div className='grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-6 gap-4 justify-start h-full w-full'>
                            {
                                isStateListCarrer?.listCarrer.length > 0 && isStateListCarrer?.listCarrer?.map((item) => (
                                    <motion.div
                                        key={`news-${item.id}`}
                                        initial={false}
                                        animate={"rest"}
                                        whileTap="press"
                                        variants={{
                                            rest: { scale: 1 },
                                            press: { scale: 1.01 }
                                        }}
                                        className='col-span-1  bg-white h-full w-full'
                                    >
                                        <Link
                                            className='border w-full h-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 group transition duration-200 ease-in-out'
                                            href={`/career/${item.id}?${ConvertToSlug(item?.title)}`}
                                            prefetch={false}
                                        >
                                            <div className='flex flex-col gap-2'>
                                                <div className='3xl:text-xl 2xl:text-[17px] xxl:text-[17px] xl:text-base lg:text-base md:text-xl text-xl  text-[#2FB9BD] font-semibold group-hover:text-[#2FB9BD]/70 duration-500 transition ease-in-out line-clamp-2 capitalize'>
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
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            }
                        </div>
                        {
                            isStateListCarrer?.params?.total_blog > isStateListCarrer?.params?.limit ?
                                <PaginationCustom

                                    current_page={isStateListCarrer?.params?.page}
                                    limit={isStateListCarrer?.params?.limit}
                                    total={isStateListCarrer?.params?.total_blog}
                                    handleChangePage={handleChangePage}
                                />
                                :
                                null
                        }
                    </>
            }
        </div>
    )
}

export default Career