import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';

import { FaInstagram, FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
import { FormatPhoneNumber } from '../format/FormatNumber';

const Footer = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])


    const socialMedia = [
        {
            id: uuidv4(),
            icon: <FaInstagram className='text-xl text-[#B4B8C5] hover:scale-105 transition-colors duration-200 ease-in-out cursor-pointer' />,
            link: '#'
        },
        {
            id: uuidv4(),
            icon: <FaFacebook className='text-xl text-[#B4B8C5] hover:scale-105 transition-colors duration-200 ease-in-out cursor-pointer' />,
            link: '#'
        },
        {
            id: uuidv4(),
            icon: <FaLinkedinIn className='text-xl text-[#B4B8C5] hover:scale-105 transition-colors duration-200 ease-in-out cursor-pointer' />,
            link: '#'
        },
        {
            id: uuidv4(),
            icon: <FaTwitter className='text-xl text-[#B4B8C5] hover:scale-105 transition-colors duration-200 ease-in-out cursor-pointer' />,
            link: '#'
        },
    ]

    const dataFooter = [
        {
            id: uuidv4(),
            title: 'Chính sách',
            list: [
                {
                    id: uuidv4(),
                    name: 'Chính sách và quy định',
                    link: '/policy-regulations'
                },
                {
                    id: uuidv4(),
                    name: 'Quy chế hoạt động',
                    link: '/operating-regulations'
                },
                {
                    id: uuidv4(),
                    name: 'Bảo mật thông tin',
                    link: '/security-info'
                },
                {
                    id: uuidv4(),
                    name: 'Giải quyết tranh chấp',
                    link: '/dispute-resolution'
                },
            ]
        },
        {
            id: uuidv4(),
            title: '',
            list: [
                {
                    id: uuidv4(),
                    name: 'Chính sách huỷ chuyến',
                    link: '/dispute-resolution'
                },
                {
                    id: uuidv4(),
                    name: 'Hướng dẫn đặt xe',
                    link: '/dispute-resolution'
                },
                {
                    id: uuidv4(),
                    name: 'Hướng dẫn thanh toán',
                    link: '/dispute-resolution'
                },
                {
                    id: uuidv4(),
                    name: 'Câu hỏi thường gặp',
                    link: '/dispute-resolution'
                },
            ]
        },
        {
            id: uuidv4(),
            title: '',
            list: [
                {
                    id: uuidv4(),
                    name: 'Về KANOW',
                    link: '/about-us'
                },
                {
                    id: uuidv4(),
                    name: 'Tuyển dụng',
                    link: '/dispute-resolution'
                },
                {
                    id: uuidv4(),
                    name: 'Tin tức và hoạt động',
                    link: '/dispute-resolution'
                },
                {
                    id: uuidv4(),
                    name: 'Bài viết',
                    link: '/dispute-resolution'
                },
            ]
        },
    ]

    if (!isMounted) {
        return null;
    }

    return (
        <footer className='bg-[#FFFFFF] pt-16 pb-10 w-full overflow-hidden border border-t border-x-0 border-b-0'>
            <div className='custom-container grid lg:grid-cols-12 grid-cols-1 lg:gap-2 gap-6 pb-10'>
                <div className='lg:col-span-2 col-span-1 w-full flex flex-col 2xl:gap-5 gap-3'>
                    <Image

                        alt='logo'
                        src="/logo/logo.svg"
                        width={800}
                        height={600}
                        className='w-full h-auto object-contain'
                    />

                    <div className='mt-1'>
                        <div className='text-[#B4B8C5] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            Tổng đài hỗ trợ
                        </div>
                        <div className='text-[#383A43] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            {FormatPhoneNumber('0843999999')}
                        </div>
                    </div>
                    <div className='mt-1'>
                        <div className='text-[#B4B8C5] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            Hòm thư
                        </div>
                        <div className='text-[#383A43] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            kanow.vn@gmail.com
                        </div>
                    </div>
                </div>
                <div className='col-span-1' />
                {
                    dataFooter.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div className='lg:col-span-2 col-span-1 flex flex-col lg:gap-4 gap-2'>
                                {
                                    item.title ?
                                        <div className='text-[#000000] 2xl:text-2xl xl:text-[22px] lg:text-[19px] text-xl font-semibold capitalize'>
                                            {item.title}
                                        </div>
                                        :
                                        <div className='text-[#000000] 2xl:text-2xl xl:text-[22px] lg:text-[19px] text-xl font-semibold capitalize py-4' />
                                }
                                <div className='flex flex-col lg:gap-3 gap-1'>
                                    {
                                        item.list.map((e) => (
                                            <div key={e.id} className='w-fit'>
                                                <Link
                                                    href={e.link}
                                                    className='text-[#484D5C]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal mt-1 hover:scale-[1.01] hover:font-medium transition-colors'
                                                >
                                                    {e.name}
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
                <div className='col-span-1' />
                <div className='lg:col-span-2 col-span-1 flex flex-wrap flex-col lg:gap-4 gap-2'>
                    <div className='text-[#000000] 2xl:text-2xl xl:text-[22px] lg:text-[19px] text-xl font-semibold'>
                        Đối tác
                    </div>
                    <div className='flex flex-col lg:gap-3 gap-1 w-fit'>
                        <Link
                            href="/partner/vehicle-owner"
                            className='text-[#484D5C]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal mt-1 hover:scale-[1.01] hover:font-medium transition-colors'
                        >
                            Đăng ký thành chủ xe
                        </Link>
                        <Link
                            href="/partner/driver"
                            className='text-[#484D5C]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal mt-1 hover:scale-[1.01] hover:font-medium transition-colors'
                        >
                            Đăng ký thành tài xế
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-[#F6F7F8]/80 py-6'>
                <div className='custom-container grid lg:grid-cols-12 grid-cols-1 lg:gap-2 gap-6'>
                    <div className='text-[#000000] font-bold lg:col-span-2 col-span-1 w-full flex flex-col 2xl:gap-5 gap-3'>
                        © CÔNG TY TNHH KANOW
                    </div>
                    <div className='col-span-1' />
                    <div className='text-[#484D5C] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal lg:col-span-2 col-span-1 w-full flex lg:gap-4 gap-2 '>
                        Số GCNĐKKD: {FormatPhoneNumber('0318312360')}
                    </div>
                    <div className='text-[#484D5C] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal lg:col-span-2 col-span-1 w-full flex lg:gap-4 gap-2 '>
                        Ngày cấp: 23-02-24
                    </div>
                    <div className='text-[#484D5C] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal lg:col-span-3 col-span-1 w-full flex lg:gap-4 gap-2 '>
                        Nơi cấp: Sở Kế hoạch và Đầu tư TPHCM
                    </div>
                </div>
            </div>
            <div className='custom-container grid lg:grid-cols-12 grid-cols-1 lg:gap-2 gap-6 pt-6 items-center'>
                <div className='lg:col-span-2 col-span-1 w-full flex flex-col 2xl:gap-5 gap-3'>
                    <Image
                        alt='logo'
                        src="/logo/logo_register.png"
                        width={800}
                        height={600}
                        className='w-full h-auto object-contain'
                    />
                </div>
                <div className='col-span-1' />
                <div className='lg:col-span-5 col-span-1 w-full flex flex-col'>
                    <div className='text-[#484D5C] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                        84 Tôn Thất Tùng, Phường Bến Thành, Quận 1, TP.HCM
                    </div>
                </div>
                <div className='col-span-2' />
                <div className='col-span-2 flex gap-6 items-center'>
                    {socialMedia && socialMedia.map((social) => (
                        <React.Fragment key={social.id}>
                            {social.icon}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </footer >
    )
}

export default Footer