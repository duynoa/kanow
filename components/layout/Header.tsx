import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useCookie } from '@/hooks/useCookie';
import { useDataProfileMyCar } from '@/hooks/useDataQueryKey';
import { useNotification } from '@/hooks/useNotification';
import { useDialogLogin } from '@/hooks/useOpenDialog';
import { useResize } from '@/hooks/useResize';
import useAuthenticationAPI from '@/services/auth/auth.services';
import { getListNotifications } from '@/services/notification/notification.services';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCloseSharp } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import DropdownHeaderNotification from '../dropdown/DropdownHeaderNotification';
import { ActionTooltip } from '../tooltip/ActionTooltip';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import usePolicyApi from '@/services/policy/policy.services';
import { redirectToApp } from '@/utils/fnChange/redirectoApp';

interface IDataHeader {
    id: string,
    name: string,
    link: string,
    children: {
        id: string,
        title: string,
        link: string,
        linkNologin?: any,
        content?: string,
        descption?: string,
        type?: string
    }[],
    open: boolean
}

const initDataHeader = [
    {
        id: uuidv4(),
        name: 'Về chúng tôi',
        link: '/about-us',
        children: [],
        open: false
    },
    {
        id: "1",
        name: 'Xe tự lái',
        link: '#',
        open: false,
        children: [
            {
                id: uuidv4(),
                title: "Đăng ký thành chủ xe",
                link: '/list-my-car',
                linkNologin: '/partner/vehicle-owner'
            },
            // {
            //     id: uuidv4(),
            //     title: "Chính sách và quy định",
            //     link: '/policy-regulations?type=1',
            // },
            // {
            //     id: uuidv4(),
            //     title: "Quy chế hoạt động",
            //     link: '/operating-regulations?type=1',
            // },
            // {
            //     id: uuidv4(),
            //     title: "Bảo mật thông tin",
            //     link: '/security-info?type=1',
            // },
            // {
            //     id: uuidv4(),
            //     title: "Giải quyết tranh chấp",
            //     link: '/dispute-resolution?type=1',
            // },
            // {
            //     id: uuidv4(),
            //     title: "Chính sách hủy chuyến",
            //     link: '/cancel-policy?type=1',
            // },
        ],
    },
    {
        id: "2",
        name: 'Tài xế lái xe hộ',
        link: '#',
        open: false,
        children: [
            {
                id: uuidv4(),
                title: "Đăng ký thành tài xế",
                link: '/partner/driver',
                linkNologin: '/partner/driver',
            },
            // {
            //     id: "-5",
            //     title: "Hướng dẫn sử dụng",
            //     link: '/policy?type=2&id=-5',
            //     linkNologin: '/policy?type=2&id=-5',
            // },
            // {
            //     id: uuidv4(),
            //     title: "Chính sách và quy định",
            //     link: '/policy-regulations?type=2',
            // },
            // {
            //     id: uuidv4(),
            //     title: "Quy chế hoạt động",
            //     link: '/operating-regulations?type=2',
            // },
            // {
            //     id: uuidv4(),
            //     title: "Bảo mật thông tin",
            //     link: '/security-info?type=2',
            // },
            // {
            //     id: uuidv4(),
            //     title: "Giải quyết tranh chấp",
            //     link: '/dispute-resolution?type=2',
            // },
            // {
            //     id: uuidv4(),
            //     title: "Chính sách hủy chuyến",
            //     link: '/cancel-policy?type=2',
            // },
        ],
    },
]

const dataNotice = [
    {
        id: uuidv4(),
        title: "Giới thiệu về Kanow",
        desription: "Chào mừng bạn tham gia cộng đồng Kanow, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích.",
        link: '#',
        time: new Date(),
    },
    {
        id: uuidv4(),
        title: "Giới thiệu về Kanow",
        desription: "Chào mừng bạn tham gia cộng đồng Kanow, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích.",
        link: '#',
        time: new Date(),
    },
    {
        id: uuidv4(),
        title: "Giới thiệu về Kanow",
        desription: "Chào mừng bạn tham gia cộng đồng Kanow, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích.",
        link: '#',
        time: new Date(),
    },
    {
        id: uuidv4(),
        title: "Giới thiệu về Kanow",
        desription: "Chào mừng bạn tham gia cộng đồng Kanow, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích.",
        link: '#',
        time: new Date(),
    },
    {
        id: uuidv4(),
        title: "Giới thiệu về Kanow",
        desription: "Chào mừng bạn tham gia cộng đồng Kanow, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích.",
        link: '#',
        time: new Date(),
    },
    {
        id: uuidv4(),
        title: "Giới thiệu về Kanow",
        desription: "Chào mừng bạn tham gia cộng đồng Kanow, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích.",
        link: '#',
        time: new Date(),
    },
    {
        id: uuidv4(),
        title: "Giới thiệu về Kanow",
        desription: "Chào mừng bạn tham gia cộng đồng Kanow, bấm vào đây để xem những kinh nghiệm thuê xe hữu ích.",
        link: '#',
        time: new Date(),
    }
]

const Header = () => {
    const router = useRouter()
    const pathname = usePathname()
    const param = useSearchParams()

    const { isVisibleTablet } = useResize()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [isMounted, setIsMounted] = useState<boolean>(false)
    const [showActive, setShowActive] = useState<boolean>(false);
    const [isZoomAnimated, setIsZoomAnimated] = useState<boolean>(false);
    const [isScrollBlocked, setIsScrollBlocked] = useState<boolean>(false);
    const [dataHeader, setDataHeader] = useState<IDataHeader[]>(initDataHeader)

    const { getCookie, setCookie } = useCookie()
    const { apiInfoUser } = useAuthenticationAPI()
    const { apiPolicyList } = usePolicyApi()
    const { informationUser, setInformationUser } = useAuth()
    const { queryKeyIsStateProfileMyCar } = useDataProfileMyCar()
    const { openDialogLogin, setOpenDialogLogin, setStatusModal } = useDialogLogin()
    const { isStateNotification, queryKeyIsStateNotification } = useNotification()

    // useEffect(() => {
    //     setIsMounted(true)
    // }, [])

    useEffect(() => {
        const getInfoUser = async () => {
            const { data: information } = await apiInfoUser();
            if (information?.result) {
                setInformationUser(information?.info);
            } else {
                setCookie("token_kanow", "kanow", { expires: 7 });
                setInformationUser('')
                router.push('/');
            }
            setIsLoading(false)
        }

        if (getCookie && getCookie != "kanow" && !informationUser) {
            getInfoUser()
            setIsLoading(true)
        } else if (getCookie && getCookie != "kanow") {
        }
    }, [getCookie])

    useEffect(() => {
        if (informationUser && isStateNotification.dataListNotifications.length == 0) {
            const fetchListNotifications = async () => {
                try {
                    queryKeyIsStateNotification({
                        ...isStateNotification,
                        isLoading: {
                            ...isStateNotification.isLoading,
                            isLoadingNotification: true,
                        }
                    })

                    const dataParams = {
                        current_page: isStateNotification.page,
                        per_page: isStateNotification.limit,
                        type: "customer"
                    }

                    const { data } = await getListNotifications(dataParams)

                    if (data && data.data.length) {
                        queryKeyIsStateNotification({
                            ...isStateNotification,
                            dataNotify: data,
                            dataListNotifications: data.data,
                            isLoading: {
                                ...isStateNotification.isLoading,
                                isLoadingNotification: false,
                            },
                            next: data.links.next,
                            page: isStateNotification.page + 1
                        })
                    } else {
                        queryKeyIsStateNotification({
                            ...isStateNotification,
                            isLoading: {
                                ...isStateNotification.isLoading,
                                isLoadingNotification: false,
                            }
                        })
                    }

                } catch (err) {
                    throw err
                }
            }

            fetchListNotifications()
        }
    }, [informationUser])


    useEffect(() => {
        const fetchPolicies = async () => {
            const [selfDrivingPolicy, driverPolicy] = await Promise.all([
                apiPolicyList("1"),
                apiPolicyList("2")
            ]);

            if (selfDrivingPolicy.data && driverPolicy.data) {
                const newData = dataHeader.map((e: any) => {
                    if (e.id == "1") {
                        const children = selfDrivingPolicy?.data?.map((i: any) => {
                            return {
                                ...i,
                                link: `/policy?type=${i?.type}&id=${i?.id}`,
                                linkNologin: `/policy?type=${i?.type}&id=${i?.id}`,
                            }
                        });
                        return {
                            ...e,
                            children: [...e.children, ...children]
                        }
                    }
                    if (e.id == "2") {
                        const children = driverPolicy?.data?.map((i: any) => {
                            return {
                                ...i,
                                link: `/policy?type=${i?.type}&id=${i?.id}`,
                                linkNologin: `/policy?type=${i?.type}&id=${i?.id}`,
                            }
                        });
                        return {
                            ...e,
                            children: [...e.children, ...children]
                        }
                    }
                    return e
                });
                setDataHeader(newData);
            }
        }
        fetchPolicies();
    }, [])

    const handleClickToZoom = () => {
        setIsZoomAnimated(true);

        setTimeout(() => {
            setIsZoomAnimated(false);
        }, 200);

        if (getCookie && getCookie != "kanow" && informationUser) {
            queryKeyIsStateProfileMyCar({ tab: 4 })
        }
    };

    const zoomedStyle = {
        transform: isZoomAnimated ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s",
        willChange: "transform",
    };

    useEffect(() => {
        const body = document.body;
        if (isScrollBlocked) {
            body.classList.add('no-scroll'); // Thêm class để không cuộn
        } else {
            body.classList.remove('no-scroll'); // Xóa class để cho phép cuộn
        }
        return () => {
            body.classList.remove('no-scroll');
        };
    }, [isScrollBlocked]);

    const _ToogleIsShow = (): void => {
        setIsScrollBlocked(true);
        setShowActive(true)
    }

    const _ToogleIsOff = (id?: any) => {
        if (id) {
            setDataHeader(prevDataHeader =>
                prevDataHeader.map(e => ({
                    ...e,
                    open: e.id == id
                }))
            );
        } else {
            setDataHeader(prevDataHeader =>
                prevDataHeader.map(e => ({
                    ...e,
                    open: false
                }))
            );
        }

        setShowActive(false)
        setIsScrollBlocked(false);

        if (getCookie && getCookie != "kanow" && informationUser) {
            queryKeyIsStateProfileMyCar({ tab: 4 })
        }
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

    useEffect(() => {
        if (showActive) {
            setDataHeader(prevDataHeader =>
                prevDataHeader.map(e => {
                    const checkLink = e.children.some(i => (i.link == pathname || i.link == `${pathname}?${param}`))
                    return {
                        ...e,
                        open: pathname.includes(e.link) || checkLink
                    }
                })
            );
        }
    }, [showActive])

    const dataListUnreadNotify = isStateNotification.dataListNotifications?.filter((item) => item?.is_read == 0)



    // if (!isMounted) {
    //     return null;
    // }

    return (
        <>
            <header
                className='w-full 3xl:h-[120px] h-[80px] sticky z-40'
                style={{ background: pathname === "/" || pathname === "/home" ? "#D7F9F9" : "linear-gradient(180deg, rgba(194, 249, 249, 0.60) 0%, rgba(194, 249, 249, 0.00) 100%)" }}
            >
                        <div className={`xl:hidden grid-cols-4 custom-container 3xl:h-[120px] h-[80px] grid `}>
                            <Link
                                href="/"
                                className='col-span-2 flex items-center justify-start'
                                prefetch={false}
                            >
                                <Image
                                    alt='logo'
                                    src="/logo/logo_kanow.svg"
                                    width={300}
                                    height={300}
                                    priority
                                    className='w-[150px] h-[95px] object-contain'
                                />
                            </Link>

                            <div className="col-span-2 flex items-center justify-end gap-6">
                                {
                                    informationUser &&
                                    <DropdownHeaderNotification>
                                        <div className='cursor-pointer size-6 relative' >
                                            <Image
                                                src={'/icon/header/notifications.png'}
                                                width={100} height={100}
                                                alt='notifications.png'
                                                className='object-contain size-full'
                                            />
                                            {
                                                dataListUnreadNotify && dataListUnreadNotify.length > 0 &&
                                                <Badge variant="outline" className='absolute top-0 -right-1/2 -translate-x-1/3 -translate-y-1/2 bg-red-500 text-white rounded-full px-[7px] text-[10px] border-white'>
                                                    {dataListUnreadNotify?.length}
                                                </Badge>
                                            }
                                        </div>
                                    </DropdownHeaderNotification>
                                }
                                <button onClick={_ToogleIsShow.bind(this)} className='lg:hidden'>
                                    <Menu className='scale-110' />
                                </button>
                            </div>
                            {/* active services */}
                            {
                                showActive &&
                                <div className={`${showActive ? "translate-x-0" : "translate-x-[100%] hidden"} z-[999] transition duration-300 ease-in-out absolute bg-white h-screen w-screen top-0 left-0`}>
                                    <div className='custom-container h-[80px] pt-8 flex justify-between'>
                                        <Link
                                            href="/"
                                            className='flex items-center justify-center'
                                            prefetch={false}
                                        >
                                            <Image
                                                alt='logo'
                                                src="/logo/logo_kanow.svg"
                                                width={300}
                                                height={300}
                                                priority
                                                className='w-[120px] h-[80px] object-contain'
                                            />
                                        </Link>
                                        <button onClick={() => _ToogleIsOff()} className=''>
                                            <IoCloseSharp className='text-xl text-[#FA3434]' />
                                        </button>
                                    </div>
                                    <div className='custom-container mt-8 relative flex flex-col items-left h-screen overflow-y-auto'>
                                        {informationUser ?
                                            <div className='flex items-center justify-between mb-6'>
                                                <div className='flex items-center gap-2'>
                                                    <Link
                                                        onClick={() => _ToogleIsOff()}
                                                        href={'/account'}
                                                        className='3xl:size-10 3xl:min-w-10 3xl:min-h-10 size-8 min-w-8  min-h-8'
                                                        prefetch={false}
                                                    >
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
                                                        onClick={() => _ToogleIsOff()}
                                                        className={`text-[#0E0E0E]/80 flex gap-2 items-center cursor-pointer font-medium col-span-1 3xl:text-[17px] xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] transition-all`}
                                                        prefetch={false}
                                                    >
                                                        <span className='capitalize hover:opacity-65 transition-all duration-200 ease-linear'>
                                                            {informationUser?.fullname}
                                                        </span>
                                                        <IoIosArrowDown className='2xl:text-2xl text-xl text-[#2FB9BD]' />
                                                    </Link>
                                                </div>
                                            </div>
                                            :
                                            <div className='flex gap-2 mb-6'>
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        redirectToApp()
                                                    }}
                                                    // onClick={() => handleOpenChangeModal('signup')}
                                                    className='3xl:text-base text-sm 3xl:py-4 3xl:px-4 lg:p-3 px-4 py-2 w-fit 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                                                >
                                                    Đăng Ký
                                                </Button>
                                                <Separator orientation="vertical" className='bg-[#B4B8C5] h-auto my-2' />
                                                <Button
                                                    type="button"
                                                    onClick={() => handleOpenChangeModal('login')}
                                                    className='3xl:text-base text-sm 3xl:px-10 3xl:py-4 2xl:px-8 2xl:py-3 lg:px-6 lg:py-3 px-4 py-2 w-fit 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-[#2FB9BD]/80 transition-all overflow-hidden bg-[#2FB9BD] text-white'
                                                >
                                                    Đăng nhập
                                                </Button>
                                            </div>

                                        }
                                        {
                                            dataHeader.map((data) => {
                                                return (
                                                    data.children?.length > 0 ?
                                                        <React.Fragment key={data.id}>
                                                            <div
                                                                className='flex justify-between'
                                                                onClick={() => {
                                                                    setDataHeader(prevDataHeader =>
                                                                        prevDataHeader.map(e => ({
                                                                            ...e,
                                                                            open: e.id === data.id ? !e.open : false
                                                                        }))
                                                                    );
                                                                }}
                                                            >
                                                                <div className={`mb-6 cursor-pointer text-base w-fit duration-300 transition ease-in-out flex items-center 
                                                                    ${data.open && (pathname.includes(data.link) || data.children.some(e => e.link.startsWith(pathname)))
                                                                        ?
                                                                        'text-[#0E0E0E] underline underline-offset-8 decoration-2 decoration-[#2FB9BD]'
                                                                        :
                                                                        'text-[#9D9FA6]'
                                                                    }
                                                                `}>
                                                                    {data.name}
                                                                </div>
                                                                <div className=' md:w-[10%] w-[15%] flex justify-end'>
                                                                    <IoIosArrowDown className={`${data.open ? 'rotate-180 transform transition duration-700 ease-in-out text-[#2FB9BD]' : ''}`} />
                                                                </div>
                                                            </div>
                                                            <div className={`${data.open ? "mb-6" : ""} flex flex-col gap-2`}>
                                                                {
                                                                    (data.children?.length > 0 && data.open) && data.children?.map((item) => {
                                                                        console.log("item", item);

                                                                        return (
                                                                            <Link
                                                                                key={item.id}
                                                                                onClick={() => _ToogleIsOff(data.id)}
                                                                                href={`${getCookie && getCookie != "kanow" && informationUser && item.link != '/partner/driver' ? item.link : item.linkNologin}`}
                                                                                className={`${(pathname.includes(item.link) || item.link == `${pathname}?${param}`) ? 'bg-[#C2F9F9]' : ''} flex flex-row items-center gap-3 group hover:bg-[#F6F6F6] py-2 px-8 rounded-lg cursor-pointer`}
                                                                                prefetch={false}
                                                                            >
                                                                                <div className={`max-w-full font-medium 3xl:text-lg xxl:text-base xl:text-sm lg:text-[13px] text-sm hover:text-[#0E0E0E] transition-all duration-500 ease-in-out line-clamp-2`}>
                                                                                    {item?.title ? item?.title : ''}
                                                                                </div>
                                                                            </Link>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </React.Fragment>
                                                        :
                                                        <Link
                                                            key={data.id}
                                                            href={data.link}
                                                            className={`${pathname.includes(data.link) ? 'text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]' : 'text-[#9D9FA6]'} mb-6 text-base w-fit duration-300 transition ease-in-out flex items-center`}
                                                            onClick={() => _ToogleIsOff()}
                                                            prefetch={false}
                                                        >
                                                            {data.name}
                                                        </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="hidden custom-container 3xl:h-[120px] h-[80px] xl:grid grid-cols-12 items-center justify-center">
                            <Link
                                href="/"
                                className='col-span-2 w-full h-auto'
                                prefetch={false}
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
                                                data.children?.length > 0 ?
                                                    <ActionTooltip
                                                        side="bottom"
                                                        align="end"
                                                        label={(
                                                            <div className='flex flex-col gap-2'>
                                                                {
                                                                    (data.children?.length > 0) && data.children?.map((item) => {
                                                                        return (
                                                                            <Link
                                                                                key={item.id}
                                                                                href={`${getCookie && getCookie != "kanow" && informationUser && item.link != "/partner/driver" ? item.link : item.linkNologin}`}
                                                                                // href={`${getCookie && getCookie != "kanow" && informationUser && item.link != '/driver' ? '/list-my-car' : `/partner${item.link}`}`}
                                                                                className={`${((pathname.includes(item.link) || item.link == `${pathname}?${param}`) && item.link !== '/') ? 'bg-[#C2F9F9]' : ''} focus:scale-105 flex flex-row items-center gap-3 group hover:bg-[#C2F9F9] py-2 px-8 rounded-xl cursor-pointer`}
                                                                                // className={`${((pathname.includes(item.link) || item.link == `${pathname}?${param}`) && item.link !== '/') ? 'bg-[#C2F9F9]' : ''} focus:scale-105 flex flex-row items-center gap-3 group hover:bg-[#C2F9F9] py-2 px-8 rounded-xl cursor-pointer`}
                                                                                style={zoomedStyle}
                                                                                onClick={() => {
                                                                                    setDataHeader(prevDataHeader =>
                                                                                        prevDataHeader.map(e => ({
                                                                                            ...e,
                                                                                            open: e.id == item.id
                                                                                        }))
                                                                                    );
                                                                                    handleClickToZoom
                                                                                }}
                                                                                prefetch={false}
                                                                            >
                                                                                <div className={`max-w-full font-medium 3xl:text-lg xxl:text-base xl:text-sm lg:text-[13px] text-sm hover:text-[#0E0E0E] transition-all duration-300 ease-in-out line-clamp-2`}>
                                                                                    {item?.title ? item?.title : ''}
                                                                                </div>
                                                                            </Link>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        )}
                                                    >
                                                        <div className={`${(pathname.includes(data.link) || data.children.some(e => (e.link == pathname || e.link == `${pathname}?${param}`)))
                                                            ?
                                                            'text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]'
                                                            :
                                                            'text-[#0E0E0E]/80'
                                                            }
                                                            flex gap-2 items-center cursor-pointer font-medium col-span-1 3xl:text-lg xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] transition-all`}
                                                        >
                                                            <span>{data.name}</span>
                                                            <IoIosArrowDown className='2xl:text-2xl text-xl text-[#2FB9BD]' />
                                                        </div>
                                                    </ActionTooltip>
                                                    :
                                                    <Link
                                                        href={data.link}
                                                        className={`${(pathname.includes(data.link))
                                                            ?
                                                            'text-[#0E0E0E] underline underline-offset-8 decoration-4 decoration-[#2FB9BD]'
                                                            :
                                                            'text-[#0E0E0E]/80'} text-center font-medium col-span-1 3xl:text-lg xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] transition-all`
                                                        }
                                                        prefetch={false}
                                                    >
                                                        {data.name}
                                                    </Link>
                                            }
                                        </div>
                                    ))
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
                                                    <DropdownHeaderNotification>
                                                        <div className='cursor-pointer size-7 relative'>
                                                            <Image
                                                                src={'/icon/header/notifications.png'}
                                                                width={100}
                                                                height={100}
                                                                alt='notifications.png'
                                                                className='object-contain size-full'
                                                            />
                                                            {
                                                                dataListUnreadNotify && dataListUnreadNotify.length > 0 &&
                                                                <Badge variant="outline" className='absolute top-0 -right-1/2 -translate-x-1/3 -translate-y-1/2 bg-red-500 text-white rounded-full px-[7px] text-[10px] border-white'>
                                                                    {dataListUnreadNotify.length}
                                                                </Badge>
                                                            }
                                                        </div>
                                                    </DropdownHeaderNotification>
                                                    <Link
                                                        href={'/account'}
                                                        className='3xl:size-10 3xl:min-w-10 3xl:min-h-10 size-8 min-w-8  min-h-8'
                                                        prefetch={false}
                                                    >
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
                                                        className={`text-[#0E0E0E]/80 flex gap-2 items-center cursor-pointer font-medium col-span-1 3xl:text-[17px] xxl:text-base xl:text-sm text-sm hover:text-[#0E0E0E] transition-all`}
                                                        prefetch={false}
                                                    >
                                                        <div className='capitalize truncate max-w-[130px] caret-transparent hover:opacity-65 transition-all duration-200 ease-linear'>
                                                            {informationUser?.fullname}
                                                        </div>
                                                        <IoIosArrowDown className='2xl:text-2xl text-xl text-[#2FB9BD]' />
                                                    </Link>
                                                </>
                                                :
                                                <>
                                                    <Button
                                                        type="button"
                                                        className='3xl:text-base text-sm 3xl:py-4 3xl:px-4 p-3 w-fit 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                                                        onClick={() => {
                                                            redirectToApp()
                                                        }}
                                                    // onClick={() => handleOpenChangeModal('signup')}
                                                    >
                                                        Đăng Ký
                                                    </Button>
                                                    <Separator orientation="vertical" className='bg-[#B4B8C5] h-auto my-2' />
                                                    <Button
                                                        type="button"
                                                        className='3xl:text-base text-sm 3xl:px-10 3xl:py-4 2xl:px-8 2xl:py-3 px-6 py-3 w-fit 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-[#14555B]/80 transition-all overflow-hidden bg-[#14555B] text-white'
                                                        onClick={() => handleOpenChangeModal('login')}
                                                    >
                                                        Đăng nhập
                                                    </Button>
                                                </>
                                            }
                                        </>
                                }
                            </div>
                        </div>
            </header >
        </>
    )
}

export default Header