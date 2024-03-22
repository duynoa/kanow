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

import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { Menu, XSquare } from 'lucide-react';
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '../ui/button';
// import { getCategoryServices } from '@/services/service.services';
// import { ICategoryServices } from '@/types/IServices';
// import { DialogModal } from '../dialog/DialogModal';
import { cn } from '@/lib/utils';
import ConvertToSlug from '../convertSlug/ConvertToSlug';
import { DialogLogin } from '../modals/DialogLogin';
import { Separator } from '../ui/separator';

// import { postAutoLoginAccount } from '@/services/account/account.services';
// import { Dropdown } from '../dropdown/Dropdown';
// import { IInfoUser } from '@/types/account/IAccount';
// import Cookies from 'js-cookie'
// import axios from 'axios';
// import instance from '@/utils/axios-customize';
// import { useCategoryServicesStore } from '@/hooks/useService';

const Header = () => {
    const { isVisibleTablet } = useResize()

    const [isZoomAnimated, setIsZoomAnimated] = useState<boolean>(false);

    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [isScrollBlocked, setIsScrollBlocked] = useState<boolean>(false);
    const [showActive, setShowActive] = useState<boolean>(false);
    const [activeService, setActiveService] = useState<boolean>(false)
    const [openModalLogin, setOpenModalLogin] = useState<boolean>(false)
    const [statusModal, setStatusModal] = useState<string>("login")

    const pathname = usePathname()
    // let token = Cookies.get("token")

    const dataHeader = [
        {
            id: uuidv4(),
            name: 'Về chúng tôi',
            link: '/about-us',
            children: false,
            visible: true,
        },
        {
            id: uuidv4(),
            name: 'Trở thành đối tác của Kanow',
            link: '/partner',
            children: true,
            visible: true,
        },
        {
            id: uuidv4(),
            name: 'Chuyến của tôi',
            link: '/search-car',
            children: false,
            visible: false,
        }
    ]

    const dataPartnerKanow = [
        {
            id: uuidv4(),
            title: "Đăng ký thành chủ xe",
            link: '/vehicle-owner'
        },
        {
            id: uuidv4(),
            title: "Đăng ký thành tài xế",
            link: '/driver'
        },
    ]

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleClickToZoom = () => {
        setIsZoomAnimated(true);

        setTimeout(() => {
            setIsZoomAnimated(false);
        }, 200);
    };

    const zoomedStyle = {
        transform: isZoomAnimated ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s",
        willChange: "transform",
    };

    useEffect(() => {
        const body = document.body;
        if (!isScrollBlocked) {
            body.style.overflow = 'auto'; // Cho phép cuộn
        } else {
            body.style.overflow = 'hidden'; // Chặn cuộn
        }
    }, [isScrollBlocked]);

    const _ToogleIsShow = (): void => {
        setIsScrollBlocked(true);
        setShowActive(true)
    }
    const _ToogleIsOff = (): void => {
        setIsScrollBlocked(false);
        setShowActive(false)
    }

    const handleOpenChangeModal = (type: string) => {
        if (type === 'login') {
            setOpenModalLogin(!openModalLogin)

            // dùng setTimeout để quản lí flow modal 
            setTimeout(() => {
                setStatusModal('login')
            }, 200);
        } else if (type === 'signup') {
            setOpenModalLogin(!openModalLogin)
            setStatusModal('signup')
        }
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
        <>
            <header
                className='w-full 3xl:h-[120px] h-[80px] sticky z-40'
                style={{ background: pathname === "/" || pathname === "/home" ? "#D7F9F9" : "linear-gradient(180deg, rgba(194, 249, 249, 0.60) 0%, rgba(194, 249, 249, 0.00) 100%)" }}
            >
                {
                    isVisibleTablet ?
                        // màn hình mobile,tablet
                        <div className="custom-container 3xl:h-[120px] h-[80px] grid grid-cols-4">
                            <Link
                                href="/"
                                className='col-span-2 flex items-center justify-start'
                            >
                                <Image
                                    alt='logo'
                                    src="/logo/logo_kanow.svg"
                                    width={1920}
                                    height={1080}
                                    priority
                                    className='w-[150px] h-[95px] object-contain'
                                />
                            </Link>

                            <div className="col-span-2 flex items-center justify-end">
                                <button onClick={_ToogleIsShow.bind(this)} className='lg:hidden'>
                                    <Menu className='scale-110' />
                                </button>
                            </div>
                            {/* active services */}
                            {
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
                                                        src="/logo/logo_kanow.svg"
                                                        width={800}
                                                        height={600}
                                                        priority
                                                        className='w-[120px] h-[80px] object-contain'
                                                    />
                                                </Link>
                                                <button onClick={_ToogleIsOff.bind(this)} className=''>
                                                    <IoCloseSharp className='text-xl text-[#FA3434]' />
                                                </button>
                                            </div>
                                            <div className='custom-container mt-8 relative flex flex-col items-left h-screen overflow-y-auto'>
                                                {
                                                    dataHeader.map((data) => (
                                                        data.children ?
                                                            <React.Fragment key={data.id}>
                                                                <div
                                                                    className='flex justify-between'
                                                                    onClick={() => setActiveService(!activeService)}
                                                                >
                                                                    <div className={`
                                                                ${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ? 'text-[#0E0E0E] underline underline-offset-8 decoration-2 decoration-[#2FB9BD]' : 'text-[#9D9FA6]'}
                                                                 ${data.children ? "mb-6" : "mb-6"}
                                                                 cursor-pointer text-base w-fit duration-300 transition ease-in-out flex items-center`}>
                                                                        {data.name}
                                                                    </div>
                                                                    <IoIosArrowDown className={`${activeService ? 'rotate-180 transform transition duration-700 ease-in-out text-[#2FB9BD]' : ''} md:w-[10%] w-[15%] items-start`} />
                                                                </div>

                                                                <div className={`${activeService ? "mb-6" : ""} flex flex-col gap-2`}>
                                                                    {
                                                                        activeService && dataPartnerKanow && dataPartnerKanow.map((item) => (
                                                                            <Link
                                                                                key={item.id}
                                                                                onClick={_ToogleIsOff}
                                                                                href={`/partner/${item.link}`}
                                                                                className={`${(item.link === '/' && pathname === '/') || (pathname.includes(item.link) && item.link !== '/') ? 'bg-[#C2F9F9]' : ''} flex flex-row items-center gap-3 group hover:bg-[#F6F6F6] py-2 px-8 rounded-lg cursor-pointer`}
                                                                            >
                                                                                <div className={`max-w-full font-medium 3xl:text-lg xxl:text-base xl:text-sm lg:text-[13px] text-sm hover:text-[#0E0E0E] transition-all duration-500 ease-in-out line-clamp-2`}>
                                                                                    {item?.title ? item?.title : ''}
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
                                                                className={`${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ? 'text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]' : 'text-[#9D9FA6]'} mb-6 text-base w-fit duration-300 transition ease-in-out flex items-center`}
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
                            }
                        </div>
                        :
                        // màn hình laptop
                        <div className="custom-container 3xl:h-[120px] h-[80px] grid 3xl:grid-cols-12 grid-cols-11 items-center justify-center">
                            <Link
                                href="/"
                                className='col-span-2 w-full h-auto'
                            >
                                <Image
                                    alt='logo'
                                    src="/logo/logo_kanow.svg"
                                    width={800}
                                    height={600}
                                    priority
                                    className='w-full h-auto object-cover'
                                />
                            </Link>
                            <div className='3xl:col-span-2 col-span-1   ' />
                            <NavigationMenu className='2xl:col-span-6 col-span-6 3xl:space-x-10 2xl:space-x-6 xl:space-x-4'>
                                {
                                    dataHeader && dataHeader.map((data, i) => (
                                        <div key={data.id} className='p-2'>
                                            {
                                                data.children ?
                                                    <ActionTooltip
                                                        side="bottom"
                                                        align="end"
                                                        label={(
                                                            <div className='flex flex-col gap-2'>
                                                                {
                                                                    dataPartnerKanow && dataPartnerKanow?.map((item) => (
                                                                        <Link
                                                                            key={item.id}
                                                                            href={`/partner/${item.link}`}
                                                                            className={`${(item.link === '/' && pathname === '/') || (pathname.includes(item.link) && item.link !== '/') ? 'bg-[#C2F9F9]' : ''} focus:scale-105 flex flex-row items-center gap-3 group hover:bg-[#C2F9F9] py-2 px-8 rounded-xl cursor-pointer`}
                                                                            style={zoomedStyle}
                                                                            onClick={handleClickToZoom}
                                                                        >

                                                                            <div className={`max-w-full font-medium 3xl:text-lg xxl:text-base xl:text-sm lg:text-[13px] text-sm hover:text-[#0E0E0E] transition-all duration-300 ease-in-out line-clamp-2`}>
                                                                                {item?.title ? item?.title : ''}
                                                                            </div>
                                                                        </Link>
                                                                        // <Link
                                                                        //     key={item.id}
                                                                        //     href={`/partner/${item.link}`}
                                                                        //     className={`${pathname.includes(`/partner/${item.link}`) ? 'bg-[#C2F9F9]' : ''} flex flex-row items-center gap-3 group hover:bg-[#C2F9F9] py-2 px-8 rounded-xl cursor-pointer`}
                                                                        // >

                                                                        //     <div className={`max-w-full font-medium 3xl:text-lg xxl:text-base xl:text-sm lg:text-[13px] text-sm hover:text-[#0E0E0E] transition-all duration-300 ease-in-out line-clamp-2`}>
                                                                        //         {item?.title ? item?.title : ''}
                                                                        //     </div>
                                                                        // </Link>
                                                                    ))
                                                                }
                                                            </div>
                                                        )}
                                                    >
                                                        <div
                                                            className={`${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ?
                                                                'text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]' :
                                                                'text-[#0E0E0E]/80'}
                                                            flex gap-2 items-center cursor-pointer font-medium col-span-1 3xl:text-lg xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] transition-all`}
                                                        >
                                                            <span>{data.name}</span>
                                                            <IoIosArrowDown className='2xl:text-2xl text-xl text-[#2FB9BD]' />
                                                        </div>
                                                    </ActionTooltip>
                                                    :
                                                    (
                                                        data.visible ?
                                                            <Link
                                                                href={data.link}
                                                                className={`${(data.link === '/' && pathname === '/') || (pathname.includes(data.link) && data.link !== '/') ? 'text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]' : 'text-[#0E0E0E]/80'} text-center font-medium col-span-1 3xl:text-lg xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] transition-all`}
                                                            >
                                                                {data.name}
                                                            </Link>
                                                            :
                                                            null
                                                    )
                                            }
                                        </div>
                                    ))
                                }
                            </NavigationMenu>
                            <div className='col-span-2 flex justify-end 3xl:gap-4 gap-2'>
                                <DialogLogin
                                    openModal={openModalLogin}
                                    statusModal={statusModal}
                                    setStatusModal={setStatusModal}
                                    handleOpenChangeModal={() => handleOpenChangeModal('signup')}
                                >
                                    <Button
                                        type="button"
                                        className='3xl:text-base text-sm 3xl:px-10 3xl:py-4 2xl:px-8 2xl:py-3 px-8 py-3 w-fit 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                                    >
                                        Đăng Ký
                                    </Button>
                                </DialogLogin>
                                <Separator orientation="vertical" className='bg-[#B4B8C5] h-auto my-1' />
                                <DialogLogin
                                    openModal={openModalLogin}
                                    statusModal={statusModal}
                                    setStatusModal={setStatusModal}
                                    handleOpenChangeModal={() => handleOpenChangeModal('login')}
                                >
                                    <Button
                                        type="button"
                                        className='3xl:text-base text-sm 3xl:px-10 3xl:py-4 2xl:px-8 2xl:py-3 px-8 py-3 w-fit 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-[#14555B]/80 transition-all overflow-hidden bg-[#14555B] text-white'
                                    >
                                        Đăng nhập
                                    </Button>
                                </DialogLogin>
                            </div>
                        </div>
                }
            </header>
        </>
    )
}

export default Header