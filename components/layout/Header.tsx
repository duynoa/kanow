import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation';

import { useResize } from '@/hooks/useResize';

import { ActionTooltip } from '../tooltip/ActionTooltip';

import { IoCloseSharp } from "react-icons/io5";
import { Menu } from 'lucide-react';
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '../ui/button';
import { DialogLogin } from '../modals/DialogLogin';
import { Separator } from '../ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { CustomDataHeader } from '@/custom/CustomDataHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAuthenticationAPI from '@/services/auth/auth.services';
import { useCookie } from '@/hooks/useCookie';
import { Skeleton } from '../ui/skeleton';
import { TooltipHeader } from '../tooltip/TooltipHeader';
import { useDialogLogin } from '@/hooks/useOpenDialog';




const Header = () => {
    // lấy thông tin user
    const { getCookie } = useCookie()
    const { isVisibleTablet } = useResize()
    const { apiInfoUser } = useAuthenticationAPI()
    const [isLoading, setIsLoading] = useState(false)
    const { informationUser, setInformationUser } = useAuth()
    const [isZoomAnimated, setIsZoomAnimated] = useState<boolean>(false);

    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [isScrollBlocked, setIsScrollBlocked] = useState<boolean>(false);
    const [showActive, setShowActive] = useState<boolean>(false);
    const [activeService, setActiveService] = useState<boolean>(false)
    const [openModalLogin, setOpenModalLogin] = useState<boolean>(false)

    const { openDialogLogin, setOpenDialogLogin } = useDialogLogin()

    const [statusModal, setStatusModal] = useState<string>("login")

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

    ]

    const pathname = usePathname()


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

    useEffect(() => {
        const getInfoUser = async () => {

            const { data: information } = await apiInfoUser();

            if (information?.result) {
                setInformationUser(information?.info);
            } else {
                setInformationUser('')
            }
            setIsLoading(false)
        }
        if (getCookie && getCookie != "kanow" && !informationUser) {
            getInfoUser()
            setIsLoading(true)

        }
    }, [getCookie])


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
            setOpenDialogLogin(!openDialogLogin)

            // dùng setTimeout để quản lí flow modal 
            setTimeout(() => {
                setStatusModal('login')
            }, 200);
        } else if (type === 'signup') {
            setOpenDialogLogin(!openDialogLogin)
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
                                                {informationUser ?
                                                    <div className='flex items-center justify-between mb-6'>
                                                        <div className='flex items-center gap-2'>
                                                            <Link href={'/account'} className='3xl:size-10 3xl:min-w-10 3xl:min-h-10 size-8 min-w-8  min-h-8'>
                                                                <Avatar className='w-full h-full shadow'>
                                                                    <AvatarImage
                                                                        src={informationUser?.avatar ? informationUser?.avatar : '/avatar/avatar_default.png'}
                                                                        alt="@kanow"
                                                                    />
                                                                    <AvatarFallback >
                                                                        <Image
                                                                            width={40}
                                                                            height={40}
                                                                            src='/avatar/avatar_default.png'
                                                                            alt="@kanow"
                                                                            className='w-full h-full'
                                                                        />
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            </Link>
                                                            <Link
                                                                href={'/account'}
                                                                className={`text-[#0E0E0E]/80 flex gap-2 items-center cursor-pointer font-medium col-span-1 3xl:text-lg xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] transition-all`}>
                                                                <span className='capitalize'>{informationUser?.fullname}</span>
                                                                <IoIosArrowDown className='2xl:text-2xl text-xl text-[#2FB9BD]' />
                                                            </Link>
                                                        </div>
                                                        <div className='3xl:min-w-7 3xl:min-h-7 3xl:size-7  min-w-6 min-h-6 size-6' >
                                                            <Image src={'/icon/header/notifications.png'} width={100} height={100} alt='' className='object-contain size-full' />
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='flex gap-2 mb-6'>
                                                        <DialogLogin
                                                            asChild={true}
                                                            statusModal={statusModal}
                                                            setStatusModal={setStatusModal}
                                                            handleOpenChangeModal={() => handleOpenChangeModal('signup')}
                                                        >
                                                            <Button
                                                                type="button"
                                                                className='3xl:text-base text-sm 3xl:py-4 3xl:px-4 lg:p-3 px-4 py-2 w-fit 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                                                            >
                                                                Đăng Ký
                                                            </Button>
                                                        </DialogLogin>
                                                        <Separator orientation="vertical" className='bg-[#B4B8C5] h-auto my-2' />
                                                        <DialogLogin
                                                            asChild={true}
                                                            statusModal={statusModal}
                                                            setStatusModal={setStatusModal}
                                                            handleOpenChangeModal={() => handleOpenChangeModal('login')}
                                                        >
                                                            <Button
                                                                type="button"
                                                                className='3xl:text-base text-sm 3xl:px-10 3xl:py-4 2xl:px-8 2xl:py-3 lg:px-6 lg:py-3 px-4 py-2 w-fit 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-[#14555B]/80 transition-all overflow-hidden bg-[#14555B] text-white'
                                                            >
                                                                Đăng nhập
                                                            </Button>
                                                        </DialogLogin>
                                                    </div>

                                                }
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
                                                                    <div className=' md:w-[10%] w-[15%] flex justify-end'>
                                                                        <IoIosArrowDown className={`${activeService ? 'rotate-180 transform transition duration-700 ease-in-out text-[#2FB9BD]' : ''}`} />
                                                                    </div>
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
                                                {getCookie && informationUser &&
                                                    <Link
                                                        href={'/search-car'}
                                                        className={`${(pathname === '/search-car') ? 'text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]' : 'text-[#9D9FA6]'} mb-6 text-base w-fit duration-300 transition ease-in-out flex items-center`}
                                                        onClick={_ToogleIsOff}
                                                    >
                                                        Chuyến của tôi
                                                    </Link>
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
                        <div className="custom-container 3xl:h-[120px] h-[80px] grid grid-cols-12 items-center justify-center">
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

                            <div className='xxl:col-span-8 col-span-7 flex items-center justify-center 3xl:space-x-10 2xl:space-x-6 xl:space-x-4'>

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
                                {getCookie && informationUser &&
                                    <Link
                                        href={'/search-car'}
                                        className={`${(pathname.includes('/search-car')) ? ' text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]' : ' text-[#0E0E0E]/80'} text-center font-medium col-span-1 3xl:text-lg xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] transition-all`}
                                    >
                                        Chuyến của tôi
                                    </Link>
                                }
                            </div>

                            <div className={`${informationUser ? "items-center" : ""} xxl:col-span-2 col-span-3 flex justify-end 3xl:gap-4 gap-2`}>
                                {
                                    isLoading ?
                                        <Skeleton className="w-[200px] h-[30px] rounded-full" />
                                        :
                                        <>
                                            {informationUser ?
                                                <>

                                                    <div className='3xl:min-w-7 3xl:min-h-7 3xl:size-7  min-w-6 min-h-6 size-6' >
                                                        <Image src={'/icon/header/notifications.png'} width={100} height={100} alt='' className='object-contain size-full' />
                                                    </div>
                                                    <Link href={'/account'} className='3xl:size-10 3xl:min-w-10 3xl:min-h-10 size-8 min-w-8  min-h-8'>
                                                        <Avatar className='w-full h-full shadow'>
                                                            <AvatarImage
                                                                src={informationUser?.avatar ? informationUser?.avatar : '/avatar/avatar_default.png'}
                                                                alt="@kanow"
                                                            />
                                                            <AvatarFallback >
                                                                <Image
                                                                    width={40}
                                                                    height={40}
                                                                    src='/avatar/avatar_default.png'
                                                                    alt="@kanow"
                                                                    className='w-full h-full'
                                                                />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </Link>
                                                    <Link
                                                        href={'/account'}
                                                        className={`text-[#0E0E0E]/80 flex gap-2 items-center cursor-pointer font-medium col-span-1 3xl:text-lg xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] transition-all`}>
                                                        <span className='capitalize'>{informationUser?.fullname}</span>
                                                        <IoIosArrowDown className='2xl:text-2xl text-xl text-[#2FB9BD]' />
                                                    </Link>
                                                </>
                                                :
                                                <>
                                                    <DialogLogin
                                                        asChild={true}
                                                        statusModal={statusModal}
                                                        setStatusModal={setStatusModal}
                                                        handleOpenChangeModal={() => handleOpenChangeModal('signup')}
                                                    >
                                                        <Button
                                                            type="button"
                                                            className='3xl:text-base text-sm 3xl:py-4 3xl:px-4 p-3 w-fit 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                                                        >
                                                            Đăng Ký
                                                        </Button>
                                                    </DialogLogin>
                                                    <Separator orientation="vertical" className='bg-[#B4B8C5] h-auto my-2' />
                                                    <DialogLogin
                                                        asChild={true}
                                                        statusModal={statusModal}
                                                        setStatusModal={setStatusModal}
                                                        handleOpenChangeModal={() => handleOpenChangeModal('login')}
                                                    >
                                                        <Button
                                                            type="button"
                                                            className='3xl:text-base text-sm 3xl:px-10 3xl:py-4 2xl:px-8 2xl:py-3 px-6 py-3 w-fit 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-[#14555B]/80 transition-all overflow-hidden bg-[#14555B] text-white'
                                                        >
                                                            Đăng nhập
                                                        </Button>
                                                    </DialogLogin>
                                                </>
                                            }
                                        </>
                                }
                            </div>
                        </div>
                }
            </header>
        </>
    )
}

export default Header