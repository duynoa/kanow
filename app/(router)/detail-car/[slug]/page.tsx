'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'

import { FaStar } from 'react-icons/fa'
import { FaCircleCheck } from 'react-icons/fa6'
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti'

import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useResize } from '@/hooks/useResize'
import { useDialogImage } from '@/hooks/useDialogImage'

import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FormatNumberHundred, FormatNumberToDecimal, FormatNumberToThousands } from '@/components/format/FormatNumber'
import { DialogReviewImage } from '@/components/modals/DialogReviewImage'
import { DialogPromotion } from '@/components/modals/DialogPromotion'
import { DialogCalendar } from '@/components/modals/DialogCalendar'

import PaymentCar from './components/PaymentCar'
import InformationCar from './components/InformationCar';
import { getDataDetailCar, getListCarsRelated, postUpdateFavoriteHeartCar } from '@/services/cars/cars.services'
import { CustomDataDetailCar, CustomDataListCars, CustomDataPolicy } from '@/custom/CustomData'
import { DialogAnswerPolicy } from '@/components/modals/DialogAnswerPolicy'
import { getListPromotions } from '@/services/cars/promotion.services'
import { useDialogCalendar, useDialogLogin, useDialogPromotion, useDialogReportCar } from '@/hooks/useOpenDialog'
import { useCookie } from '@/hooks/useCookie'
import { DialogReportCar } from '@/components/modals/DialogReportCar'
import { getListReportCar } from '@/services/cars/report.services'
import { IInitialStateDetailCar } from '@/types/Initial/IInitial'
import { getDataPolicy } from '@/services/cars/policy.services'
import { useDataDetailCar, useDataPolicy } from '@/hooks/useDataQueryKey'
import moment from 'moment'
import { getListCalendarPriceMonth } from '@/services/cars/calendar.services'

type Props = {
    params: {
        slug: string
    }
}

const DetailCar = ({ params }: Props) => {
    const { getCookie } = useCookie()
    const { setOpenDialogLogin } = useDialogLogin()
    const { dataListReportCar } = useDialogReportCar()
    const { isVisibleMobile, isVisibleTablet } = useResize()
    const { dataPromotions, setDataPromotions } = useDialogPromotion()
    const { setOpenDialogReview, setDataImage, setIndexImage } = useDialogImage();

    const { isStateDetailCar, queryKeyIsStateDetailCar } = useDataDetailCar()

    const { queryKeyIsStatePolicy } = useDataPolicy()
    const { dateReal, dateTemp, numberDay, setDataCalendar } = useDialogCalendar()

    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [slug, setSlug] = useState(params.slug);
    // Sử dụng useState để theo dõi trạng thái của header thứ hai
    const [showSecondHeader, setShowSecondHeader] = useState(false);

    // const initialState: IInitialStateDetailCar = {
    //     dataDetailCar: {
    //         id: "",
    //         address: "",
    //         full_address: "",
    //         image_car: [],
    //         car_owner: {
    //             avatar: "",
    //             fullname: "",
    //             id: "",
    //         },
    //         type: {
    //             delivery_car: false,
    //             book_car_flash: false,
    //             mortgage: false,
    //             transmission_search: "",
    //         },
    //         favorite_car: false,
    //         name_car: "",
    //         point_star: 0,
    //         total_trip: 0,
    //         price: {
    //             percent_deposit: 0,
    //             price_before_promotion: 0,
    //             price_after_promotion: 0,

    //             rent_cost: 0,
    //             rent_cost_day: 0,
    //             price_insurance_day: 0,
    //             temp_total_amount: 0,
    //             total_amount: 0,

    //             max_money_discount: 0,
    //             // tiền đặt cọc
    //             price_depoist: 0,
    //             // số ngày
    //             number_day: 0,
    //             // thanh toán khi nhận xe
    //             cash_on_delivery: 0
    //         },
    //         promotion: [],
    //         trait_car: {
    //             number_seat: 0,
    //             number_car: "",
    //             type_fuel: "",
    //             year_manu: "",
    //         },
    //         describe_car: "",
    //         other_amenities_car: [],
    //         info_review_car: {
    //             review_car: [],
    //             star: 0,
    //             total_review_car: 0,
    //         },
    //         collateral_car: {
    //             mortgage: 0,
    //             mortgage_policy_car: "",
    //             note_mortgage: "",
    //         },
    //         surcharge_car: [],
    //     },
    //     infoPromotion: {
    //         selectPromotion: "0",
    //         activePromotion: null,
    //     },
    //     listCarsRelated: [],
    //     reportCar: {
    //         listReportCar: [],
    //         selectReportCar: "",
    //         contentReportCar: ""
    //     },
    //     onSuccess: {
    //         onSuccessPage: false
    //     },
    // };

    // const [isStateDetailCar, setIsState] = useState<IInitialStateDetailCar>(initialState)
    // const queryKeyIsStateDetailCar = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const fetchDataDetailCar = async () => {
        try {
            queryKeyIsStateDetailCar({
                onSuccess: {
                    onSuccessPage: true
                }
            })

            let dataParams = {
                date_search: `${dateTemp ? `${moment(dateTemp?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateTemp?.to).format("DD/MM/YYYY HH:mm:ss")}` : `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`} `
            }
            const { data } = await getDataDetailCar(params.slug, dataParams)

            if (data && data.data && data.base.base) {
                let { customDataDetailCar } = CustomDataDetailCar(data, numberDay)
                console.log('customDataDetailCar', customDataDetailCar);

                queryKeyIsStateDetailCar({
                    dataDetailCar: customDataDetailCar,
                    onSuccess: {
                        onSuccessPage: false
                    }
                })
            }
        } catch (err) {
            throw err
        }

    }

    const fetchDataListCarsRelated = async () => {
        try {
            const dataListCar = {
                car_id: params.slug,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`
            }

            const { data } = await getListCarsRelated(dataListCar)

            if (data && data.data && data.base.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateDetailCar({
                    listCarsRelated: customDataListCars,
                })
            }
        } catch (err) {
            throw err
        }
    }

    // fetch lịch detail
    const fetchDataListCalendarPriceMonth = async () => {
        try {
            let dataCar = {
                car_id: params.slug
            }

            const { data } = await getListCalendarPriceMonth(dataCar)

            if (data && data.data) {
                setDataCalendar(data.data)
            }
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        fetchDataDetailCar()
    }, [slug, getCookie, dateTemp, dateReal])


    useEffect(() => {
        const fetchListPromotions = async () => {
            if (dataPromotions.length === 0) {
                try {
                    const dataSearch = {
                        code: ""
                    }
                    const { data } = await getListPromotions(dataSearch)
                    if (data && data.data) {
                        setDataPromotions(data?.data)
                    }
                } catch (err) {
                    throw err
                }
            }
        }

        const fetchListReportCar = async () => {
            if (dataListReportCar.length === 0) {
                try {
                    const { data } = await getListReportCar();

                    if (data && data.data) {
                        queryKeyIsStateDetailCar({
                            reportCar: {
                                ...isStateDetailCar?.reportCar,
                                listReportCar: data.data
                            }
                        })
                    }

                } catch (err) {
                    throw err
                }
            }
        }

        const fetchDataPolicy = async () => {
            const { data } = await getDataPolicy();

            if (data) {
                let { customDataPolicy } = CustomDataPolicy(data)
                queryKeyIsStatePolicy({
                    dataPolicy: customDataPolicy
                })
            }
        }

        // fetchDataDetailCar()
        fetchDataListCalendarPriceMonth()
        fetchDataPolicy()
        fetchDataListCarsRelated()
        fetchListPromotions()
        fetchListReportCar()
    }, [slug, getCookie])

    useEffect(() => {
        if (numberDay) {
            queryKeyIsStateDetailCar({
                dataDetailCar: {
                    ...isStateDetailCar?.dataDetailCar,
                    price: {
                        ...isStateDetailCar?.dataDetailCar?.price,
                        // tổng tạm tính 
                        temp_total_amount: (isStateDetailCar?.dataDetailCar?.price?.rent_cost_day + isStateDetailCar?.dataDetailCar?.price?.price_insurance_day) * (numberDay ? numberDay : 1),

                        // thành tiền
                        total_amount:
                            isStateDetailCar?.dataDetailCar?.promotion?.length > 0
                                ?
                                ((isStateDetailCar?.dataDetailCar?.price?.rent_cost_day - isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion) * (numberDay ? numberDay : 1)) + isStateDetailCar?.dataDetailCar?.price?.price_insurance_day
                                :
                                (isStateDetailCar?.dataDetailCar?.price?.rent_cost_day + isStateDetailCar?.dataDetailCar?.price?.price_insurance_day) * (numberDay ? numberDay : 1),

                        // tiền đặt cọc
                        price_depoist:
                            isStateDetailCar?.dataDetailCar?.promotion?.length > 0
                                ?
                                ((isStateDetailCar?.dataDetailCar?.price?.rent_cost_day - isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion) * (numberDay ? numberDay : 1) + isStateDetailCar?.dataDetailCar?.price?.price_insurance_day) * (isStateDetailCar?.dataDetailCar?.price?.percent_deposit / 100)
                                :
                                (isStateDetailCar?.dataDetailCar?.price?.rent_cost_day + isStateDetailCar?.dataDetailCar?.price?.price_insurance_day) * (numberDay ? numberDay : 1) * (isStateDetailCar?.dataDetailCar?.price?.percent_deposit / 100)
                        ,
                        // số ngày
                        // number_day: +isStateDetailCar?.dataDetailCar?.price?.number_day,
                        number_day: numberDay ? numberDay : 1,
                        // thanh toán khi nhận xe (Thành tiền - tiền cọc)
                        cash_on_delivery:
                            isStateDetailCar?.dataDetailCar?.promotion?.length > 0
                                ?
                                (((+isStateDetailCar?.dataDetailCar?.price?.rent_cost_day - +isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion) + (+isStateDetailCar?.dataDetailCar?.price?.price_insurance_day)) * (numberDay ? numberDay : 1)) - ((((isStateDetailCar?.dataDetailCar?.price?.rent_cost_day - isStateDetailCar?.dataDetailCar?.promotion[0]?.price_promotion) + isStateDetailCar?.dataDetailCar?.price?.price_insurance_day) * (numberDay ? numberDay : 1)) * (isStateDetailCar?.dataDetailCar?.price?.percent_deposit / 100))
                                :
                                ((isStateDetailCar?.dataDetailCar?.price?.rent_cost_day + isStateDetailCar?.dataDetailCar?.price?.price_insurance_day) * (numberDay ? numberDay : 1)) - (((isStateDetailCar?.dataDetailCar?.price?.rent_cost_day + isStateDetailCar?.dataDetailCar?.price?.price_insurance_day) * (numberDay ? numberDay : 1)) * (isStateDetailCar?.dataDetailCar?.price?.percent_deposit / 100)),

                    }
                }
            })
        }
    }, [numberDay])


    const handleClickFavorite = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, car_id?: number | string, index?: number) => {
        e.stopPropagation()
        e.preventDefault();

        if (car_id && index !== undefined) {
            // xử lí sự kiện thả tim trong mảng
            try {
                const dataParams = {
                    car_id: car_id,
                    status: isStateDetailCar?.listCarsRelated[index]?.favorite_car ? 0 : 1
                }

                const { data } = await postUpdateFavoriteHeartCar(dataParams)

                if (data.result && getCookie !== "kanow" && getCookie !== undefined) {
                    fetchDataListCarsRelated()
                } else {
                    setOpenDialogLogin(true)
                }

            } catch (err) {
                throw err
            }
        } else {
            // xử lí sự kiện thả tim trong detail
            try {
                const dataParams = {
                    car_id: params.slug,
                    status: isStateDetailCar?.dataDetailCar?.favorite_car ? 0 : 1
                }

                const { data } = await postUpdateFavoriteHeartCar(dataParams)
                if (data.result && getCookie !== "kanow" && getCookie !== undefined) {
                    fetchDataDetailCar()
                } else {
                    setOpenDialogLogin(true)
                }

            } catch (err) {
                throw err
            }

        }
    }

    // Định nghĩa một hàm xử lý sự kiện cuộn trang
    const handleScroll = () => {
        // Lấy vị trí cuộn của trang
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        // Kiểm tra nếu vị trí cuộn vượt qua một ngưỡng nhất định, ví dụ 100px
        if (scrollPosition > 100) {
            // Nếu vượt qua ngưỡng, hiển thị header thứ hai
            setShowSecondHeader(true);
        } else {
            // Nếu không, ẩn nó đi
            setShowSecondHeader(false);
        }
    }

    // Sử dụng useEffect để đăng ký sự kiện cuộn khi component được mount
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Cleanup: đảm bảo gỡ bỏ sự kiện cuộn khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Click vào chuyển đến id trong header2
    const handleClickToId = (itemId: number | string, index?: number | string) => {
        // Tìm phần tử có id tương ứng
        const targetElement = document.getElementById(`section-${itemId}`);

        // Nếu tìm thấy, cuộn trang đến vị trí của phần tử
        if (targetElement) {
            // Tính toán vị trí cuộn mới
            const scrollToPosition = targetElement.offsetTop;

            window.scrollTo({
                top: scrollToPosition, // Đặt vị trí đầu tiên của phần tử mục tiêu ở đầu trang
                behavior: "smooth", // Hiệu ứng cuộn mượt
            });
        }
    };

    const customPagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<span class=${className}></span>`
        },
    }

    const handleOpenReviewImage = (id: number | string, index: number) => {
        setOpenDialogReview(true)
        setIndexImage(index)
        setDataImage(isStateDetailCar?.dataDetailCar?.image_car)
    }

    if (!isMounted) {
        return null
    }

    return (
        <>
            <div className={`${showSecondHeader ? "block" : "hidden"} 3xl:h-[120px] w-full h-[80px] z-30 fixed top-0 bg-white`}>
                <div className='custom-container h-full flex flex-row items-center gap-10'>
                    <div
                        onClick={() => handleClickToId(1)}
                        className='3xl:text-lg text-base font-semibold cursor-pointer'
                    >
                        Đặc điểm
                    </div>
                    <div
                        onClick={() => handleClickToId(2)}
                        className='3xl:text-lg text-base font-semibold cursor-pointer'
                    >
                        Chủ xe
                    </div>
                    <div
                        onClick={() => handleClickToId(3)}
                        className='3xl:text-lg text-base font-semibold cursor-pointer'
                    >
                        Vị trí xe
                    </div>
                    <div
                        onClick={() => handleClickToId(4)}
                        className='3xl:text-lg text-base font-semibold cursor-pointer'
                    >
                        Giấy tờ thuê xe
                    </div>
                </div>
            </div>
            {
                isVisibleTablet ?
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        modules={[Autoplay, Pagination, A11y]}
                        allowTouchMove={true}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                allowTouchMove: true,
                            },
                            640: {
                                slidesPerView: 1,
                                allowTouchMove: true,
                            },
                            768: {
                                slidesPerView: 1,
                                allowTouchMove: true
                            },
                            1024: {
                                slidesPerView: 3,
                                allowTouchMove: true
                            }
                        }}
                        autoplay={true}
                        pagination={customPagination}
                        className='custom-swiper-detail-car w-full md:h-[380px] h-[240px] lg:px-2'
                    >
                        {
                            isStateDetailCar?.dataDetailCar && isStateDetailCar?.dataDetailCar?.image_car && isStateDetailCar?.dataDetailCar?.image_car.map((carDetail: any, index: number) => (
                                <SwiperSlide
                                    key={`carDetail-${carDetail.id}`}
                                    onClick={() => handleOpenReviewImage(carDetail.id, index)}
                                >
                                    <div className='w-full md:h-[380px] h-[240px] cursor-pointer'>
                                        <Image
                                            src={carDetail.name ? carDetail.name : '/default/default.png'}
                                            alt="car"
                                            width={800}
                                            height={600}
                                            className='w-full h-full object-cover lg:rounded-2xl'
                                        />
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    :
                    <div className='custom-container'>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={20}
                            modules={[Autoplay, Pagination, A11y]}
                            allowTouchMove={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    allowTouchMove: true,
                                    spaceBetween: "auto"
                                },
                                640: {
                                    slidesPerView: 1,
                                    allowTouchMove: true,
                                    spaceBetween: "auto"
                                },
                                768: {
                                    slidesPerView: 1,
                                    allowTouchMove: true
                                },
                                1024: {
                                    slidesPerView: 3,
                                    allowTouchMove: true
                                }
                            }}
                            autoplay={true}
                            pagination={customPagination}
                            className='custom-swiper-detail-car w-full 3xl:h-[330px] xl:h-[280px] lg:h-[240px] md:h-[380px] h-[240px] lg:px-2'
                        >
                            {
                                isStateDetailCar?.dataDetailCar && isStateDetailCar?.dataDetailCar?.image_car && isStateDetailCar?.dataDetailCar?.image_car?.map((carDetail: any, index: number) => (
                                    <SwiperSlide key={`carDetail-${carDetail.id}`} onClick={() => handleOpenReviewImage(carDetail.id, index)}>
                                        <div className='w-full 3xl:h-[300px] xl:h-[240px] lg:h-[200px] md:h-[380px] h-[240px] cursor-pointer'>
                                            <Image
                                                src={carDetail.name ? carDetail.name : '/default/default.png'}
                                                alt="car"
                                                width={800}
                                                height={600}
                                                className='w-full h-full object-cover lg:rounded-2xl'
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
            }

            <div className='custom-container 3xl:mt-8 mt-4 flex lg:flex-row flex-col gap-6'>
                <InformationCar handleClickFavorite={handleClickFavorite} />

                <PaymentCar />
            </div>

            <div className='bg-[#F6F6F8] md:py-20 py-10'>
                <div className='custom-container flex flex-col 3xl:gap-10 gap-6'>
                    <div className='3xl:text-4xl text-3xl capitalize text-[#09080D] font-bold'>
                        Xe tương tự
                    </div>
                    {
                        isVisibleMobile ?
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={10}
                                modules={[Pagination, A11y]}
                                allowTouchMove={true}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                        allowTouchMove: true
                                    },
                                    640: {
                                        slidesPerView: 1,
                                        allowTouchMove: true
                                    },
                                    768: {
                                        slidesPerView: 1,
                                        allowTouchMove: true
                                    },
                                }}
                                pagination={customPagination}
                                className='custom-swiper-intro w-full h-[420px]'
                            >
                                {
                                    isStateDetailCar?.listCarsRelated && isStateDetailCar?.listCarsRelated.map((card, index) => (
                                        <SwiperSlide key={`carDetail-${card.id}`}>
                                            <Link
                                                key={card.id}
                                                id={`card-${card.id}`}
                                                className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0'
                                                href={`/detail-car/${card.id}?${ConvertToSlug(card?.name_car)}`}
                                            >
                                                {
                                                    card?.promotion?.length > 0 ?
                                                        <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                                            Giảm {card?.promotion[0]?.percent}% - {card?.promotion[0]?.name ? card?.promotion[0]?.name : ""}
                                                        </div>
                                                        :
                                                        null
                                                }
                                                <div className='w-full 3xl:h-[230px] xxl:h-auto xl:h-[180px] h-[180px] relative'>
                                                    <Image
                                                        width={600}
                                                        height={600}
                                                        alt="image_card"
                                                        src={card?.image_car?.length > 0 ? card?.image_car[0]?.name : '/default/default.png'}
                                                        className='w-full h-full object-cover rounded-xl'
                                                    />
                                                    <div
                                                        onClick={(event) => handleClickFavorite(event, card.id, index)}
                                                        className='absolute right-2 top-2 bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out z-20'
                                                    >
                                                        <TiHeartFullOutline className={`${card.favorite_car ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                                                    </div>
                                                    <div className='flex gap-2 absolute bottom-[10px] left-[10px]'>
                                                        {
                                                            card?.type?.mortgage ?
                                                                <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                    Miễn thế chấp
                                                                </Badge>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            card?.type?.book_car_flash ?
                                                                <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                    Đặt xe nhanh
                                                                </Badge>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-2 mt-2'>
                                                    <Badge className='bg-[#C9DCF9]/35 hover:bg-[#C9DCF9]/50 text-[#3561FF] 3xl:text-sm text-xs font-medium cursor-default caret-transparent'>
                                                        {card?.type?.transmission_search ? card?.type?.transmission_search : ""}
                                                    </Badge>
                                                    {
                                                        card?.type?.delivery_car ?
                                                            <Badge className='bg-[#F9ECC9]/35 hover:bg-[#F9ECC9]/50 text-[#FF9900] 3xl:text-sm text-xs font-medium cursor-default'>
                                                                Giao tận nơi
                                                            </Badge>
                                                            :
                                                            null
                                                    }
                                                </div>
                                                <div className='flex gap-3 items-center'>
                                                    <div className='3xl:w-12 3xl:max-w-12 3xl:h-12 w-10 max-w-10 h-10 '>
                                                        <Avatar className='w-full h-full shadow'>
                                                            <AvatarImage
                                                                src={card?.car_owner?.avatar ? card?.car_owner?.avatar : '/avatar/avatar_default.png'}
                                                                alt="@kanow"
                                                            />
                                                            <AvatarFallback >
                                                                <Image
                                                                    width={100}
                                                                    height={100}
                                                                    src='/avatar/avatar_default.png'
                                                                    alt="@kanow"
                                                                    className='w-full h-full'
                                                                />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                    <div className='flex flex-col gap-1 w-[80%] max-w-[80%]'>
                                                        <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase line-clamp-1'>
                                                            {card.name_car ? card.name_car : ''}
                                                        </div>
                                                        <div className='flex gap-1 items-center'>
                                                            <TiLocation className='text-base text-[#FA3434] w-[16px] max-w-[16px]' />
                                                            <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%] line-clamp-1'>
                                                                {card.address ? card.address : ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='border-b border-[#D7D9E0]/50' />
                                                <div className='flex items-center justify-between 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2 bg-[#F2FCF7] p-2 rounded-lg'>
                                                    <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2'>
                                                        {
                                                            card.point_star ?
                                                                <div className='flex items-center gap-1'>
                                                                    <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#FFC118]' />
                                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                        {card.point_star ? (FormatNumberToDecimal(card.point_star, 1)) : 0}
                                                                    </div>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            card.total_trip ?
                                                                <div className='flex items-center gap-1'>
                                                                    <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#3AC996]' />
                                                                    <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                        {card.total_trip ? FormatNumberHundred(card.total_trip, 100) : 0} Chuyến
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                                    Chưa có chuyến
                                                                </div>
                                                        }
                                                    </div>

                                                    <div className='flex items-center gap-1'>
                                                        {
                                                            card?.promotion?.length > 0 ?
                                                                <>
                                                                    <div className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#D7D9E0] font-medium line-through'>
                                                                        {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                    </div>
                                                                    <div className='flex'>
                                                                        <span className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#1AC5CA] font-medium'>
                                                                            {card.price_after_promotion ? FormatNumberToThousands(card.price_after_promotion) : 0}
                                                                        </span>
                                                                        <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                            /ngày
                                                                        </span>
                                                                    </div>
                                                                </>
                                                                :
                                                                <div className='flex'>
                                                                    <span className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#1AC5CA] font-medium'>
                                                                        {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                    </span>
                                                                    <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                        /ngày
                                                                    </span>
                                                                </div>
                                                        }
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            :
                            <div className='grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-8 gap-6 justify-start w-full h-full'>
                                {
                                    isStateDetailCar?.listCarsRelated && isStateDetailCar?.listCarsRelated?.map((card, index) => (
                                        <Link
                                            key={card.id}
                                            id={`card-${card.id}`}
                                            className='col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                            href={`/detail-car/${card.id}?${ConvertToSlug(card?.name_car)}`}
                                        >
                                            {
                                                card?.promotion?.length > 0 ?
                                                    <div className='w-fit rounded-tl-xl rounded-br-xl absolute top-0 left-0 bg-[#FA3434] px-2 py-1 text-sm font-semibold text-white z-10'>
                                                        Giảm {card?.promotion[0]?.percent}% - {card?.promotion[0]?.name ? card?.promotion[0]?.name : ""}
                                                    </div>
                                                    :
                                                    null
                                            }
                                            <div className='w-full 3xl:h-[230px] xxl:h-auto xl:h-[180px] h-[180px] relative'>
                                                <Image
                                                    width={600}
                                                    height={600}
                                                    alt="image_card"
                                                    src={card?.image_car?.length > 0 ? card?.image_car[0]?.name : '/default/default.png'}
                                                    className='w-full h-full object-cover rounded-xl'
                                                />
                                                <div
                                                    onClick={(event) => handleClickFavorite(event, card.id, index)}
                                                    className='absolute right-2 top-2 bg-[#1D1D1D]/40 rounded-full p-2 cursor-pointer hover:bg-[#1D1D1D]/50 group duration-200 transition-color ease-in-out z-20'
                                                >
                                                    <TiHeartFullOutline className={`${card.favorite_car ? 'text-[#FA3434]' : 'text-white'} text-xl group-hover:scale-105 duration-200 transition-color ease-in-out`} />
                                                </div>
                                                <div className='flex gap-2 absolute bottom-[10px] left-[10px]'>
                                                    {
                                                        card?.type?.mortgage ?
                                                            <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                Miễn thế chấp
                                                            </Badge>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        card?.type?.book_car_flash ?
                                                            <Badge className='bg-[#000000]/50 font-normal cursor-default 3xl:text-sm text-xs'>
                                                                Đặt xe nhanh
                                                            </Badge>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2 mt-2'>
                                                <Badge className='bg-[#C9DCF9]/35 hover:bg-[#C9DCF9]/50 text-[#3561FF] 3xl:text-sm text-xs font-medium cursor-default caret-transparent'>
                                                    {card?.type?.transmission_search ? card?.type?.transmission_search : ""}
                                                </Badge>
                                                {
                                                    card?.type?.delivery_car ?
                                                        <Badge className='bg-[#F9ECC9]/35 hover:bg-[#F9ECC9]/50 text-[#FF9900] 3xl:text-sm text-xs font-medium cursor-default'>
                                                            Giao tận nơi
                                                        </Badge>
                                                        :
                                                        null
                                                }
                                            </div>
                                            <div className='flex gap-3 items-center'>
                                                <div className='3xl:w-12 3xl:max-w-12 3xl:h-12 w-10 max-w-10 h-10 '>
                                                    <Avatar className='w-full h-full shadow'>
                                                        <AvatarImage
                                                            src={card?.car_owner?.avatar ? card?.car_owner?.avatar : '/avatar/avatar_default.png'}
                                                            alt="@kanow"
                                                        />
                                                        <AvatarFallback >
                                                            <Image
                                                                width={100}
                                                                height={100}
                                                                src='/avatar/avatar_default.png'
                                                                alt="@kanow"
                                                                className='w-full h-full'
                                                            />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </div>
                                                <div className='flex flex-col gap-1 w-[80%] max-w-[80%]'>
                                                    <div className='3xl:text-lg text-base text-[#1D1D1D] font-bold uppercase line-clamp-1'>
                                                        {card.name_car ? card.name_car : ''}
                                                    </div>
                                                    <div className='flex gap-1 items-center'>
                                                        <TiLocation className='text-base text-[#FA3434] w-[16px] max-w-[16px]' />
                                                        <div className='3xl:text-sm text-xs text-[#8C93A3] font-medium w-[90%] max-w-[90%] line-clamp-1'>
                                                            {card.address ? card.address : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='border-b border-[#D7D9E0]/50' />
                                            <div className='flex items-center justify-between 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2 bg-[#F2FCF7] p-2 rounded-lg'>
                                                <div className='flex items-center 3xl:gap-4 xxl:gap-2 xl:gap-4 lg:gap-1 gap-2'>
                                                    {
                                                        card.point_star ?
                                                            <div className='flex items-center gap-1'>
                                                                <FaStar className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#FFC118]' />
                                                                <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                    {card.point_star ? (FormatNumberToDecimal(card.point_star, 1)) : 0}
                                                                </div>
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        card.total_trip ?
                                                            <div className='flex items-center gap-1'>
                                                                <FaCircleCheck className='3xl:text-base 2xl:text-sm xxl:text-xs md:text-sm text-base text-[#3AC996]' />
                                                                <div className='3xl:text-sm 2xl:text-xs xxl:text-[11px] md:text-xs text-sm text-[#484D5C] font-semibold'>
                                                                    {card.total_trip ? FormatNumberHundred(card.total_trip, 100) : 0} Chuyến
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className='3xl:text-sm text-xs text-[#8C93A3]'>
                                                                Chưa có chuyến
                                                            </div>
                                                    }
                                                </div>

                                                <div className='flex items-center gap-1'>
                                                    {
                                                        card?.promotion?.length > 0 ?
                                                            <>
                                                                <div className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#D7D9E0] font-medium line-through'>
                                                                    {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                </div>
                                                                <div className='flex'>
                                                                    <span className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#1AC5CA] font-medium'>
                                                                        {card.price_after_promotion ? FormatNumberToThousands(card.price_after_promotion) : 0}
                                                                    </span>
                                                                    <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                        /ngày
                                                                    </span>
                                                                </div>
                                                            </>
                                                            :
                                                            <div className='flex'>
                                                                <span className='3xl:text-lg 2xl:text-base xxl:text-sm md:text-[15px] text-base text-[#1AC5CA] font-medium'>
                                                                    {card.price_before_promotion ? FormatNumberToThousands(card.price_before_promotion) : 0}
                                                                </span>
                                                                <span className='3xl:text-[13px] text-[11px] text-[#585F71] flex justify-start font-semibold capitalize'>
                                                                    /ngày
                                                                </span>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
            <DialogPromotion />
            <DialogReportCar />
        </>
    )
}

export default DetailCar