import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';

import { FaInstagram, FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";

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
                    name: 'Chính sách và quy định'
                },
                {
                    id: uuidv4(),
                    name: 'Quy chế hoạt động'
                },
                {
                    id: uuidv4(),
                    name: 'Bảo mật thông tin'
                },
                {
                    id: uuidv4(),
                    name: 'Giải quyết tranh chấp'
                },
            ]
        },
        {
            id: uuidv4(),
            title: '',
            list: [
                {
                    id: uuidv4(),
                    name: 'Hướng dẫn chung'
                },
                {
                    id: uuidv4(),
                    name: 'Hướng dẫn đặt xe'
                },
                {
                    id: uuidv4(),
                    name: 'Hướng dẫn thanh toán'
                },
                {
                    id: uuidv4(),
                    name: 'Câu hỏi thường gặp'
                },
            ]
        },
        {
            id: uuidv4(),
            title: '',
            list: [
                {
                    id: uuidv4(),
                    name: 'Về KANOW'
                },
                {
                    id: uuidv4(),
                    name: 'Tuyển dụng'
                },
                {
                    id: uuidv4(),
                    name: 'Tin tức và hoạt động'
                },
                {
                    id: uuidv4(),
                    name: 'Bài viết'
                },
            ]
        },
    ]

    if (!isMounted) {
        return null;
    }

    return (
        <footer className='bg-[#FFFFFF] pt-16 pb-10 w-full overflow-hidden'>
            <div className='custom-container grid lg:grid-cols-12 grid-cols-1 lg:gap-2 gap-6 pb-10'>
                <div className='lg:col-span-2 col-span-1 w-full flex flex-col 2xl:gap-5 gap-3'>
                    <Image
                        data-aos='fade-right'
                        alt='logo'
                        src="/logo/logo.svg"
                        width={800}
                        height={600}
                        className='w-full h-auto object-contain'
                    />

                    <div className='mt-1'>
                        <div data-aos='fade-right' className='text-[#B4B8C5] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            Tổng đài hỗ trợ
                        </div>
                        <div data-aos='fade-right' className='text-[#383A43] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            1900 1090
                        </div>
                    </div>
                    <div className='mt-1'>
                        <div data-aos='fade-right' className='text-[#B4B8C5] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            Hòm thư
                        </div>
                        <div data-aos='fade-right' className='text-[#383A43] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            kanow@gmail.com
                        </div>
                    </div>
                </div>
                <div className='col-span-1' />
                {
                    dataFooter.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <div data-aos='fade-left' className='lg:col-span-2 col-span-1 w-full flex flex-col lg:gap-4 gap-2'>
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
                                            <React.Fragment key={e.id}>
                                                <div className='text-[#484D5C]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal mt-1'>
                                                    {e.name}
                                                </div>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
                <div className='col-span-1' />
                <div data-aos='fade-left' className='lg:col-span-2 col-span-1 flex flex-wrap flex-col lg:gap-4 gap-2'>
                    <div className='text-[#000000] 2xl:text-2xl xl:text-[22px] lg:text-[19px] text-xl font-semibold'>
                        Đối tác
                    </div>
                    <div className='flex flex-col lg:gap-3 gap-1'>
                        <div className='text-[#484D5C]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal mt-1'>
                            Đăng ký chủ xe Kanow
                        </div>
                        <div className='text-[#484D5C]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal mt-1'>
                            Đăng ký GPS MITRACK4G
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#F6F7F8]/80 py-6'>
                <div className='custom-container grid lg:grid-cols-12 grid-cols-1 lg:gap-2 gap-6'>
                    <div className='text-[#000000] font-bold lg:col-span-2 col-span-1 w-full flex flex-col 2xl:gap-5 gap-3'>
                        © Công ty Cổ Phần KANOW
                    </div>
                    <div className='col-span-1' />
                    <div data-aos='fade-left' className='text-[#484D5C] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal lg:col-span-2 col-span-1 w-full flex lg:gap-4 gap-2 '>
                        Số GCNĐKKD: 0317307544
                    </div>
                    <div data-aos='fade-left' className='text-[#484D5C] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal lg:col-span-2 col-span-1 w-full flex lg:gap-4 gap-2 '>
                        Ngày cấp: 24-05-22
                    </div>
                    <div data-aos='fade-left' className='text-[#484D5C] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal lg:col-span-3 col-span-1 w-full flex lg:gap-4 gap-2 '>
                        Nơi cấp: Sở Kế hoạch và Đầu tư TPHCM
                    </div>
                </div>
            </div>
            <div className='custom-container grid lg:grid-cols-12 grid-cols-1 lg:gap-2 gap-6 pt-6 items-center'>
                <div className='lg:col-span-2 col-span-1 w-full flex flex-col 2xl:gap-5 gap-3'>
                    <Image
                        data-aos='fade-right'
                        alt='logo'
                        src="/logo/logo_register.png"
                        width={800}
                        height={600}
                        className='w-full h-auto object-contain'
                    />
                </div>
                <div className='col-span-1' />
                <div className='lg:col-span-5 col-span-1 w-full flex flex-col'>
                    <div data-aos='fade-left' className='text-[#484D5C] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                        Địa chỉ: Văn phòng 02, Tầng 08, Tòa nhà Pearl Plaza, Số 561A Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam.
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