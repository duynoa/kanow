'use client'

import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import React, { useRef, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Autoplay, Pagination } from 'swiper/modules'

import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';
import { useResize } from '@/hooks/useResize';
import SliderMarquee from './ui/SliderMarquee';

type Props = {}

const dataFeedbackCustomer = [
    {
        id: "232323",
        image: '/feedbackCustomer/feedback1.jpg',
    },
    {
        id: "4344343",
        image: '/feedbackCustomer/feedback2.jpg',
    },
    {
        id: "54545464",
        image: '/feedbackCustomer/feedback3.jpg',
    },
    {
        id: "545235322",
        image: '/feedbackCustomer/feedback4.jpg',
    },
    {
        id: "65497965656",
        image: '/feedbackCustomer/feedback5.jpg',
    },
    {
        id: "23269696323",
        image: '/feedbackCustomer/feedback6.jpg',
    },
    {
        id: "439797944343",
        image: '/feedbackCustomer/feedback7.jpg',
    },
    {
        id: "545458787464",
        image: '/feedbackCustomer/feedback8.jpg',
    },
    {
        id: "545237575322",
        image: '/feedbackCustomer/feedback9.jpg',
    },
    {
        id: "654665655656",
        image: '/feedbackCustomer/feedback10.jpg',
    },
    {
        id: "6546425255656",
        image: '/feedbackCustomer/feedback11.jpg',
    },
    {
        id: "65465424656",
        image: '/feedbackCustomer/feedback12.jpg',
    },
]

const SectionFeedbackCustomer = (props: Props) => {

    
    return (
        <div className="relative z-20 bg-cover bg-right-bottom drop-shadow flex flex-col gap-2 w-full 2xl:py-20 xl:py-14 lg:py-12 py-16">
            <div className='flex flex-col 3xl:gap-8 gap-6'>
                <div className='custom-container flex flex-col items-center justify-center gap-2'>
                    <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl text-[26px] leading-tight capitalize font-bold md:max-w-[85%] max-w-full text-[#101010]'>
                        Đánh giá khách hàng
                    </div>
                </div>

                <SliderMarquee dataMarque={dataFeedbackCustomer || []} />
            </div>
        </div>
    )
}

export default SectionFeedbackCustomer