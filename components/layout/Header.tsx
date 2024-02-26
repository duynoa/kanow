import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';

import {
    NavigationMenu,
} from "@/components/ui/navigation-menu"
// import { Input } from '@/components/ui/input';
import { useResize } from '@/hooks/useResize';

import { ActionTooltip } from '../tooltip/ActionTooltip';
// import ConvertToSlug from '../convertSlug/ConvertToSlug';

import { IoSearch } from "react-icons/io5";
import { Menu, XSquare } from 'lucide-react';
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '../ui/button';
// import { getCategoryServices } from '@/services/service.services';
// import { ICategoryServices } from '@/types/IServices';
// import { DialogModal } from '../dialog/DialogModal';
import { cn } from '@/lib/utils';
import ConvertToSlug from '../convertSlug/ConvertToSlug';

// import { postAutoLoginAccount } from '@/services/account/account.services';
// import { Dropdown } from '../dropdown/Dropdown';
// import { IInfoUser } from '@/types/account/IAccount';
// import Cookies from 'js-cookie'
// import axios from 'axios';
// import instance from '@/utils/axios-customize';
// import { useCategoryServicesStore } from '@/hooks/useService';

const Header = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    // const [infoUser, setInfoUser] = useState<IInfoUser | undefined>(undefined)

    // const { dataCategoryServices, setDataCategoryServices } = useCategoryServicesStore();

    const { isVisibleMobile } = useResize()
    const router = useRouter();

    // let token = Cookies.get("token")

    const dataHeader = [
        {
            id: uuidv4(),
            name: 'Về chúng tôi',
            children: false,
            link: '/'
        },
        {
            id: uuidv4(),
            name: 'Trở thành chủ xe',
            link: '/introduction',
            children: false,
        },
        {
            id: uuidv4(),
            name: 'Chuyến của tôi',
            link: '/services',
            children: true,
        }
    ]

    // const dataServices = [
    //     {
    //         id: '1',
    //         icon: '/icon/diamond_icon.svg',
    //         icon_active: '/icon/diamond_icon_active.svg',
    //         title: 'Giám định đá quý - Bán quý',
    //         free: false,
    //     },
    //     {
    //         id: '2',
    //         icon: '/icon/hexagon_icon.svg',
    //         icon_active: '/icon/hexagon_icon_active.svg',
    //         title: 'Giám định cẩm thạch',
    //         free: false,
    //     },
    //     {
    //         id: '3',
    //         icon: '/icon/four_point_star_icon.svg',
    //         icon_active: '/icon/four_point_star_icon_active.svg',
    //         title: 'Giám định ngọc trai',
    //         free: false,
    //     },
    //     {
    //         id: '4',
    //         icon: '/icon/map_trifold_icon.svg',
    //         icon_active: '/icon/map_trifold_icon_active.svg',
    //         title: 'Giám định tại hiện trường',
    //         free: false,
    //     },
    //     {
    //         id: '5',
    //         icon: '/icon/image_icon.svg',
    //         icon_active: '/icon/image_icon_active.svg',
    //         title: 'Giám định tranh đá quý',
    //         free: false,
    //     },
    //     {
    //         id: '6',
    //         icon: '/icon/handshake_icon.svg',
    //         icon_active: '/icon/handshake_icon_active.svg',
    //         title: 'Tư vấn ngọc học',
    //         free: true,
    //     },
    // ]

    const [isScrollBlocked, setIsScrollBlocked] = useState<boolean>(false);
    const [showActive, setShowActive] = useState<boolean>(false);
    // const [activeService, setActiveService] = useState<boolean>(false)
    // const [dataCategoryServices, setDataCategoryServices] = useState<ICategoryServices[]>([])

    const pathname = usePathname()
    useEffect(() => {
        setIsMounted(true)
    }, [])


    useEffect(() => {
        const body = document.body;
        if (!isScrollBlocked) {
            body.style.overflow = 'auto'; // Cho phép cuộn
        } else {
            body.style.overflow = 'hidden'; // Chặn cuộn
        }
    }, [isScrollBlocked]);

    // useEffect(() => {
    //     const fetchCategoryServices = async () => {
    //         const res = await getCategoryServices();
    //         if (res && res.data) {
    //             setDataCategoryServices(res.data)
    //         }

    //     }
    //     fetchCategoryServices()
    // }, [])


    const _ToogleIsShow = (): void => {
        setIsScrollBlocked(true);
        setShowActive(true)
    }
    const _ToogleIsOff = (): void => {
        setIsScrollBlocked(false);
        setShowActive(false)
    }

    // useEffect(() => {
    //     // if (token) {
    //     const fetchAutoLogin = async () => {
    //         const res = await postAutoLoginAccount()
    //         if (res && res.data && res.data.isSuccess) {
    //             setInfoUser(res.data.user)
    //         } else {
    //             Cookies.remove("token")
    //             instance.defaults.headers.common = { 'Authorization': `Bearer undefined` }
    //         }
    //     }
    //     fetchAutoLogin()
    //     // }
    // }, [token])

    if (!isMounted) {
        return null;
    }

    return (
        <header className='w-full h-[120px] fixed z-50 bg-[#D7F9F9]'>
            {
                isVisibleMobile ?
                    // màn hình mobile,tablet
                    <div className="custom-container h-[120px] grid grid-cols-4">
                        {/* <div className="col-span-1 flex items-center">
                            <button onClick={_ToogleIsShow.bind(this)} className='lg:hidden'>
                                <Menu className='scale-110' />
                            </button>
                        </div>
                        <Link
                            href="/"
                            className='col-span-2 flex items-center justify-center'
                        >
                            <Image
                                alt='logo'
                                src="/logo/logo_liulab.png"
                                width={1920}
                                height={1080}
                                priority
                                className='w-[150px] h-[95px] object-contain text-gray-800/50 mix-blend-difference'
                            />
                        </Link>
                        <div className="col-span-1 flex items-center justify-end">
                            <div
                                onClick={() => router.push('http://pm.liulab.edu.vn/clients')}
                                className='h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer group'
                                style={{ background: 'linear-gradient(107deg, #E3A513 1.3%, #D29006 26.77%, #E19118 57.69%, #F7B740 86.19%, #C07402 117.72%)' }}
                            >
                                <IoSearch className='text-2xl text-white group-hover:scale-110 transition-all' />
                            </div>
                        </div> */}
                        {/* active services */}
                        {/* {
                            showActive ?
                                (
                                    <div className={`${showActive ? "translate-x-0" : "translate-x-[100%] hidden"} z-[999] transition duration-300 ease-in-out absolute bg-white h-screen w-screen top-0 left-0`}>
                                        <div className='custom-container h-[80px] pt-8 flex justify-between'>
                                            <Link
                                                href="/"
                                                className='flex items-center justify-center'
                                            >
                                                <Image
                                                    alt='logo'
                                                    src="/logo/logo_liulab.png"
                                                    width={800}
                                                    height={600}
                                                    priority
                                                    className='w-[120px] h-[80px] object-contain text-gray-800/50 mix-blend-difference'
                                                />
                                            </Link>
                                            <button onClick={_ToogleIsOff.bind(this)} className=''>
                                                <XSquare className='scale-125' />
                                            </button>
                                        </div>
                                        <div className='custom-container mt-8 relative flex flex-col items-left h-screen overflow-y-auto'>
                                            <div className='mx-2 my-4'>
                                                {
                                                    token ?
                                                        <Dropdown infoUser={infoUser} />
                                                        :
                                                        <DialogModal title={"Đăng ký / Đăng nhập"} />
                                                }
                                            </div>

                                            {
                                                dataHeader.map((data) => (
                                                    data.children ?
                                                        <React.Fragment key={data.id}>
                                                            <div
                                                                className='flex justify-between'
                                                                onClick={() => setActiveService(!activeService)}
                                                            >
                                                                <div className={`${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ? 'text-[#0E0E0E] underline underline-offset-8 decoration-2 decoration-amber-400' : 'text-[#9D9FA6]'} cursor-pointer mb-6 text-base w-fit duration-300 transition ease-in-out flex items-center`}>
                                                                    {data.name}
                                                                </div>
                                                                <IoIosArrowDown className={`${activeService ? 'rotate-180 transform transition duration-700 ease-in-out text-amber-400' : ''} md:w-[10%] w-[15%] items-start`} />
                                                            </div>

                                                            <div className={`${activeService ? "mb-2" : ""} flex flex-col gap-2`}>
                                                                {
                                                                    activeService && dataCategoryServices && dataCategoryServices.map((item) => (
                                                                        <Link
                                                                            key={item.id}
                                                                            onClick={_ToogleIsOff}
                                                                            href={`/services/${item.id}?${ConvertToSlug(item.title)}`}
                                                                            className={`${pathname.includes(`/services/${item.id}`) ? 'bg-[#F6F6F6]' : ''} flex flex-row items-center gap-3 group hover:bg-[#F6F6F6] py-2 px-8 rounded-lg cursor-pointer`}
                                                                        >
                                                                            <Image
                                                                                width={100}
                                                                                height={100}
                                                                                alt="icon"
                                                                                src={pathname.includes(`/services/${item.id}`) ? item.icon_active : item.icon}
                                                                                className={`${pathname.includes(`/services/${item.id}`) ? '' : 'mix-blend-difference'} w-6 h-6 object-contain`}
                                                                            />
                                                                            <div className='flex items-center justify-between gap-2'>
                                                                                <div className={`${item.free ? "3xl:max-w-[80%] xxl:max-w-[75%] xl:max-w-[70%] lg:max-w-[65%] max-w-[65%]" : "max-w-full"} font-medium 3xl:text-lg xxl:text-base xl:text-sm lg:text-[13px] text-sm hover:text-[#0E0E0E] transition-all duration-500 ease-in-out line-clamp-2`}>
                                                                                    {item?.title ? item?.title : ''}
                                                                                </div>
                                                                                {item.free &&
                                                                                    <div
                                                                                        className='text-[#EC0000] xxl:text-[13px] text-xs px-2 py-1 font-semibold w-fit rounded-md'
                                                                                        style={{ background: 'linear-gradient(111deg, rgba(252, 104, 104, 0.12) 3.06%, rgba(254, 51, 6, 0.12) 54.19%, rgba(248, 93, 44, 0.12) 54.2%, rgba(236, 1, 1, 0.12) 117.48%)' }}
                                                                                    >
                                                                                        Miễn phí
                                                                                    </div>
                                                                                }
                                                                            </div>

                                                                        </Link>
                                                                    ))
                                                                }
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        <Link
                                                            key={data.id}
                                                            href={data.link}
                                                            className={`${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ? 'text-[#0E0E0E] underline underline-offset-8 decoration-2 decoration-amber-400' : 'text-[#9D9FA6]'} mb-6 text-base w-fit duration-300 transition ease-in-out flex items-center`}
                                                            onClick={_ToogleIsOff}
                                                        >
                                                            {data.name}
                                                        </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                                :
                                (null)
                        } */}
                    </div>
                    :
                    // màn hình laptop
                    <div className="custom-container h-[120px] grid grid-cols-12 items-center justify-center">
                        <Link
                            href="/"
                            className='col-span-2 w-full h-auto'
                        >
                            <Image
                                alt='logo'
                                // data-aos='fade-right'
                                src="/logo/logo_kanow.svg"
                                width={800}
                                height={600}
                                priority
                                className='w-full h-auto object-cover'
                            />
                        </Link>
                        <div className='col-span-2' />
                        <NavigationMenu className='col-span-4 3xl:space-x-10 2xl:space-x-6 xl:space-x-4'>
                            {
                                dataHeader.map((data, i) => (
                                    <div key={data.id} className='p-2 flex'>
                                        {
                                            data.children ?
                                                <ActionTooltip
                                                    side="bottom"
                                                    align="start"
                                                    // label="Add a server"
                                                    label={(
                                                        <div className='flex flex-col gap-2'>
                                                            {/* {
                                                                dataCategoryServices && dataCategoryServices?.map((service) => (
                                                                    <Link
                                                                        key={service.id}
                                                                        href={`/services/${service.id}?${ConvertToSlug(service.title)}`}
                                                                        className={`${pathname.includes(`/services/${service.id}`) ? 'bg-[#F6F6F6]' : ''} flex flex-row items-center gap-3 group hover:bg-[#F6F6F6] py-2 px-4 rounded-lg cursor-pointer`}
                                                                    >
                                                                        <Image
                                                                            width={100}
                                                                            height={100}
                                                                            alt="icon"
                                                                            src={pathname.includes(`/services/${service.id}`) ? service.icon_active : service.icon}
                                                                            className={`${pathname.includes(`/services/${service.id}`) ? '' : 'mix-blend-difference'} w-6 h-6 object-contain`}
                                                                        />
                                                                        <div className='flex items-center justify-between gap-2'>
                                                                            <div className={`${service.free ? "3xl:max-w-[80%] xxl:max-w-[75%] xl:max-w-[70%] lg:max-w-[65%] max-w-[65%]" : "max-w-full"} font-medium 3xl:text-lg xxl:text-base xl:text-sm lg:text-[13px] text-sm hover:text-[#0E0E0E] transition-all duration-500 ease-in-out line-clamp-2`}>
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
                                                                    </Link>
                                                                ))
                                                            } */}
                                                            hello
                                                        </div>
                                                    )}
                                                >
                                                    <div
                                                        className={`${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ? 'text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]' : 'text-[#0E0E0E]/80'} flex items-center cursor-pointer font-medium col-span-1 3xl:text-lg xxl:text-base xl:text-sm lg:text-[13px] text-sm hover:text-[#0E0E0E] transition-all`}>
                                                        {data.name}
                                                    </div>
                                                </ActionTooltip>
                                                :
                                                <Link
                                                    href={data.link}
                                                    className={`${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ? 'text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]' : 'text-[#0E0E0E]/80'} font-medium col-span-1 3xl:text-lg xxl:text-base xl:text-sm lg:text-[13px] text-sm hover:text-[#0E0E0E] transition-all`}
                                                >
                                                    {data.name}
                                                </Link>
                                        }
                                    </div>
                                ))
                            }
                        </NavigationMenu>
                        <div className='col-span-2' />
                        <div className='col-span-2 flex justify-end 3xl:gap-4 gap-2'>
                            <Button className='xxl:text-base xl:text-sm lg:text-[13px] text-sm px-10 py-6 w-fit 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-[#14555B]/80 transition-all overflow-hidden bg-[#14555B] text-white'                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
            }
        </header>
    )
}

export default Header