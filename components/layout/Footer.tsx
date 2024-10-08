'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';

import { FaInstagram, FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
import { FormatPhoneNumber } from '../format/FormatNumber';
import usePolicyApi from '@/services/policy/policy.services';
import { ScrollToSection } from '@/utils/scroll/ScrollToSection';
import { useRouter } from 'next/navigation';

const initDataFooter = [
    {
        id: "1",
        title: 'Xe tự lái',
        list: [
            // {
            //     id: uuidv4(),
            //     name: 'Chính sách và quy định',
            //     link: '/policy-regulations?type=1'
            // },
            // {
            //     id: uuidv4(),
            //     name: 'Quy chế hoạt động',
            //     link: '/operating-regulations?type=1'
            // },
            // {
            //     id: uuidv4(),
            //     name: 'Bảo mật thông tin',
            //     link: '/security-info?type=1'
            // },
            // {
            //     id: uuidv4(),
            //     name: 'Giải quyết tranh chấp',
            //     link: '/dispute-resolution?type=1'
            // },
            // {
            //     id: uuidv4(),
            //     name: 'Chính sách huỷ chuyến',
            //     link: '/cancel-policy?type=1'
            // },
        ]
    },
    {
        id: "2",
        title: 'Tài xế lái xe hộ',
        list: [
            // {
            //     id: uuidv4(),
            //     name: 'Chính sách và quy định',
            //     link: '/policy-regulations?type=2'
            // },
            // {
            //     id: uuidv4(),
            //     name: 'Quy chế hoạt động',
            //     link: '/operating-regulations?type=2'
            // },
            // {
            //     id: uuidv4(),
            //     name: 'Bảo mật thông tin',
            //     link: '/security-info?type=2'
            // },
            // {
            //     id: uuidv4(),
            //     name: 'Giải quyết tranh chấp',
            //     link: '/dispute-resolution?type=2'
            // },
            // {
            //     id: uuidv4(),
            //     name: 'Chính sách huỷ chuyến',
            //     link: '/cancel-policy?type=2'
            // },
        ]
    },
    {
        id: uuidv4(),
        title: 'Tìm Hiểu Thêm',
        list: [
            {
                id: uuidv4(),
                title: 'Hướng dẫn chung',
                link: '/general-guide'
            },
            {
                id: uuidv4(),
                title: 'Hướng dẫn đặt xe',
                link: '/book-guide'
            },
            {
                id: uuidv4(),
                title: 'Hướng dẫn thanh toán',
                link: '/payment-guide'
            },
            {
                id: uuidv4(),
                title: 'Câu hỏi thường gặp',
                link: '/faq'
            },
        ]
    },
    {
        id: uuidv4(),
        title: '',
        list: [
            {
                id: uuidv4(),
                title: 'Về KANOW',
                link: '/about-us'
            },
            {
                id: uuidv4(),
                title: 'Tuyển dụng',
                link: '/career'
            },
            {
                id: uuidv4(),
                title: 'Tin tức và hoạt động',
                link: '/news-events'
            },
            // {
            //     id: uuidv4(),
            //     name: 'Bài viết',
            //     link: '/dispute-resolution'
            // },
        ]
    },
]

const Footer = () => {
    const router = useRouter()
    const { apiPolicyList } = usePolicyApi()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [dataFooter, setDataFooter] = useState<any>(initDataFooter)

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

    useEffect(() => {
        const fetchPolicies = async () => {
            const [selfDrivingPolicy, driverPolicy] = await Promise.all([
                apiPolicyList("1"),
                apiPolicyList("2")
            ]);

            if (selfDrivingPolicy.data && driverPolicy.data) {
                const newData = dataFooter.map((e: any) => {
                    if (e.id == "1") {
                        const list = selfDrivingPolicy?.data?.map((i: any) => {
                            return {
                                ...i,
                                link: `/policy?type=${i?.type}&id=${i?.id}`,
                            }
                        });
                        return {
                            ...e,
                            list: [...e.list, ...list]
                        }
                    }
                    if (e.id == "2") {
                        const list = driverPolicy?.data?.map((i: any) => {
                            return {
                                ...i,
                                link: `/policy?type=${i?.type}&id=${i?.id}`,
                            }
                        });
                        return {
                            ...e,
                            list: [...e.list, ...list]
                        }
                    }
                    return e
                });
                setDataFooter(newData);
            }
        }
        fetchPolicies();
    }, [])


    if (!isMounted) {
        return null;
    }

    return (
        <footer className='bg-[#FFFFFF] pt-16 pb-10 w-full overflow-hidden border border-t border-x-0 border-b-0'>
            <div className='custom-container grid lg:grid-cols-11 grid-cols-1 lg:gap-2 gap-6 pb-10'>
                <div className='lg:col-span-2 col-span-1 w-full flex flex-col 2xl:gap-5 gap-3 h-fit'>
                    <div className='lg:w-full md:w-[40%] w-full h-full'>
                        <Image
                            alt='logo'
                            src="/logo/logo.svg"
                            width={800}
                            height={600}
                            className='w-full h-full object-contain'
                        />
                    </div>

                    <div className='mt-1'>
                        <div className='text-[#B4B8C5] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            Tổng đài hỗ trợ
                        </div>
                        <Link href="tel:1900252228" className='text-[#383A43] hover:text-[#383A43]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            {FormatPhoneNumber('1900252228')}
                        </Link>
                    </div>
                    <div className='mt-1'>
                        <div className='text-[#B4B8C5] 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            Hòm thư
                        </div>
                        <Link href="mailto:contact@kanow.vn" className='text-[#383A43] hover:text-[#383A43]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal'>
                            contact@kanow.vn
                        </Link>
                    </div>
                </div>
                <div className='col-span-1' />
                {
                    dataFooter.map((item: any, index: any) => (
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
                                        item.list.map((e: any) => (
                                            <div key={e.id} className='w-fit'>
                                                <Link
                                                    href={e.link}
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        router.push(e.link)
                                                        // ScrollToSection('policy')
                                                    }}
                                                    className='text-[#484D5C]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal mt-1 hover:scale-[1.01] hover:font-medium transition-colors'
                                                    prefetch={false}
                                                >
                                                    {e.title}
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
                {/* <div className='col-span-1' /> */}
                {/* <div className='lg:col-span-2 col-span-1 flex flex-wrap flex-col lg:gap-4 gap-2'>
                    <div className='text-[#000000] 2xl:text-2xl xl:text-[22px] lg:text-[19px] text-xl font-semibold'>
                        Đối tác
                    </div>
                    <div className='flex flex-col lg:gap-3 gap-1 w-fit'>
                        <Link
                            href="/partner/vehicle-owner"
                            prefetch={false}
                            className='text-[#484D5C]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal mt-1 hover:scale-[1.01] hover:font-medium transition-colors'
                        >
                            Đăng ký thành chủ xe
                        </Link>
                        <Link
                            href="/partner/driver"
                            prefetch={false}
                            className='text-[#484D5C]/80 2xl:text-base xl:text-[15px] lg:text-sm text-base font-normal mt-1 hover:scale-[1.01] hover:font-medium transition-colors'
                        >
                            Đăng ký thành tài xế
                        </Link>
                    </div>
                </div> */}
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
                    {/* <Image
                        alt='logo'
                        src="/logo/logo_register.png"
                        width={800}
                        height={600}
                        className='w-full h-auto object-contain'
                    /> */}
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