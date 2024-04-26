'use client'

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { FormatNumberHundred, FormatNumberToDecimal, FormatNumberToThousands } from '@/components/format/FormatNumber';

import { FaCalendarAlt, FaStar } from 'react-icons/fa';
import { LuSettings2 } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { FaCircleCheck } from 'react-icons/fa6';
import { TiHeartFullOutline, TiLocation } from 'react-icons/ti';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';

import ConvertToSlug from '@/components/convertSlug/ConvertToSlug';
import { useResize } from '@/hooks/useResize';

import { useDialogAddress, useDialogCalendar, useDialogFilterListCars, useDialogLogin } from '@/hooks/useOpenDialog';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';
import { getListCars, postUpdateFavoriteHeartCar } from '@/services/cars/cars.services';

import { CustomDataListCars } from '@/custom/CustomData';
import { useCookie } from '@/hooks/useCookie';
import moment from 'moment';
import { useDataListCarAutonomous } from '@/hooks/useDataQueryKey';
import SkeletonListCar from '@/components/skeleton/SkeletonListCar';
import Nodata from '@/components/image/Nodata';
import useGoogleApi from '@/services/filter/google/google.services';

type Props = {}

const ListCarAutonomous = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [flagFirstFetchApi, setFlagFirstFetchApi] = useState<boolean>(false)


    // KHAI BÁO ZUSTAND
    const { isVisibleMobile } = useResize()
    const { setOpenDialogLogin } = useDialogLogin()
    const { dateReal, setOpenDialogCalendar } = useDialogCalendar()
    const { setOpenDialogFilterListCars } = useDialogFilterListCars()
    const { getCookie } = useCookie()
    const {
        coordinates,
        onSubmitFilter,
        valueAddressPickup,
        valueAddressDestination,
        indexAddressDestination,
        setType,
        setValueAddressPickup,
        setValueAddressDestination,
        setIndexAddressDestination,
        setCoordinates,
        setOnSubmitFilter,
        setOpenDialogAddress,
    } = useDialogAddress()

    // THÊM MỘT HẰNG SỐ ĐỂ ĐỊNH NGHĨA KHOẢNG ĐỘ CHO PHÉP
    const ALLOWED_OFFSET = 600;
    // const ALLOWED_OFFSET = 200;

    // KHAI BÁO REF 
    // SỬ DỤNG TRONG SCROLL ĐỂ NGĂN CHẶN VIỆC GỌI API LIÊN TỤC
    const isAtBottomRef = useRef<boolean>(false);
    // CHECK VỊ TRÍ CUỐI CÙNG
    const lastContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const [isFilterFixed, setIsFilterFixed] = useState<boolean>(false);
    const { isStateListCarAutonomous, queryKeyIsStateListCarAutonomous } = useDataListCarAutonomous()

    const { apiGetCurrentPosition } = useGoogleApi()

    // DATA BỘ LỌC FILTER
    const listFilter = [
        {
            id: uuidv4(),
            type: "type_car_search",
            name: "Loại xe",
            value: 0,
        },
        {
            id: uuidv4(),
            type: "company_car_search",
            name: "Hãng xe",
            value: 0,
        },
        {
            id: uuidv4(),
            type: "star_search",
            name: "Chủ xe 5 sao",
            value: 1,
        },
        {
            id: uuidv4(),
            type: "tram_search",
            name: "Xe điện",
            value: 3,
        },
        {
            id: uuidv4(),
            type: "discount_search",
            name: "Xe giảm giá",
            value: 1,
        },
        {
            id: uuidv4(),
            type: "book_car_flash",
            name: "Đặt xe nhanh",
            value: 1,
        },
        {
            id: uuidv4(),
            type: "mortgage",
            name: "Miễn thế chấp",
            value: 2,
        },
        {
            id: uuidv4(),
            type: "delivery_car",
            name: "Giao xe tận nơi",
            value: 1,
        },
        {
            id: uuidv4(),
            type: "transmission_search",
            name: "Truyền động",
            value: 0
        },
    ]

    useEffect(() => {
        setIsMounted(true)
    }, [])

    console.log('valueAddressPickup : ', valueAddressPickup);
    console.log('isStateListCarAutonomous : ', isStateListCarAutonomous);

    // SỬ DỤNG useEffect ĐỂ FETCH LIST CARS LẦN ĐẦU TIÊN VÀO
    const handleFetchListCars = async (page: any) => {
        try {
            const savedCoordinates = localStorage.getItem('coordinates');
            if(savedCoordinates){
                const parseCoordinates = JSON.parse(savedCoordinates)
                
                queryKeyIsStateListCarAutonomous({
                    onSuccess: {
                        onSuccessPage: true
                    }
                })
                const dataParams = {
                    type: 1,
                    "lat": parseCoordinates ? parseCoordinates.lat : undefined,
                    "lon": parseCoordinates ? parseCoordinates.lng : undefined,
                    date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                    company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                    type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                    transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                    star_search: isStateListCarAutonomous?.dataParams?.star_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.star_search,
                    tram_search: isStateListCarAutonomous?.dataParams?.tram_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.tram_search,
                    discount_search: isStateListCarAutonomous?.dataParams?.discount_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.discount_search,
                    book_car_flash: isStateListCarAutonomous?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarAutonomous?.dataParams?.book_car_flash,
                    mortgage: isStateListCarAutonomous?.dataParams?.mortgage == 0 ? undefined : isStateListCarAutonomous?.dataParams?.mortgage,
                    delivery_car: isStateListCarAutonomous?.dataParams?.delivery_car == 0 ? undefined : isStateListCarAutonomous?.dataParams?.delivery_car,
                }
                const { data } = await getListCars(page, isStateListCarAutonomous.limit.limitAllCars, dataParams)
    
                if (data && data.data && data.base) {
                    let { customDataListCars } = CustomDataListCars(data)
    
                    queryKeyIsStateListCarAutonomous({
                        listCardCars: customDataListCars,
                        page: isStateListCarAutonomous.page + 1,
                        next: data?.links?.next,
                        onSuccess: {
                            onSuccessPage: false
                        }
                    })
                    setFlagFirstFetchApi(true)
                }
            }

        } catch (err) {
            throw err
        } finally {
            setOnSubmitFilter(false)
        }
    }

    useEffect(() => {
        handleFetchListCars(isStateListCarAutonomous?.page)
    }, [])

    // event reload api...
    useEffect(() => {
        if (onSubmitFilter) {
            handleFetchListCars(1)
            queryKeyIsStateListCarAutonomous({ page: 1 })
        }

        if (isStateListCarAutonomous.onSuccess.onSuccessPage && flagFirstFetchApi) {
            handleFilterClick(undefined, "date")
        }
    }, [onSubmitFilter, isStateListCarAutonomous.onSuccess.onSuccessPage])

    // scroll down > 60px show header 2
    useEffect(() => {
        const handleScroll = () => {
            const topOffset = window.scrollY || document.documentElement.scrollTop;

            if (topOffset > 60) {
                setIsFilterFixed(true);
            } else if (topOffset <= 60) {
                setIsFilterFixed(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // event loadmore
    useEffect(() => {
        const handleWheel = () => {
            const lastScrollCurrentRef = lastContainerRef.current;

            if (lastScrollCurrentRef) {
                const lastRefBottom = Math.floor(lastScrollCurrentRef.getBoundingClientRect().bottom);
                const currentScroll = Math.floor(window.scrollY);

                if (currentScroll >= lastRefBottom - ALLOWED_OFFSET && !isAtBottomRef.current && isStateListCarAutonomous.isLoadingScroll === false) {
                    // Bạn đã cuộn đến cuối phần ScrollArea
                    if (isStateListCarAutonomous.listCardCars && isStateListCarAutonomous.next !== null) {
                        queryKeyIsStateListCarAutonomous({ isLoadingScroll: true });

                        const fetchDataListCar = async () => {
                            const query = {
                                type: 1,
                                "lat": valueAddressPickup ? coordinates.lat : undefined,
                                "lon": valueAddressPickup ? coordinates.lng : undefined,
                                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                                // date_search: "10/04/2024 11:00:00 - 11/04/2024 12:00:00",
                                company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                                transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                                star_search: isStateListCarAutonomous?.dataParams?.star_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.star_search,
                                tram_search: isStateListCarAutonomous?.dataParams?.tram_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.tram_search,
                                discount_search: isStateListCarAutonomous?.dataParams?.discount_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.discount_search,
                                book_car_flash: isStateListCarAutonomous?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarAutonomous?.dataParams?.book_car_flash,
                                mortgage: isStateListCarAutonomous?.dataParams?.mortgage == 0 ? undefined : isStateListCarAutonomous?.dataParams?.mortgage,
                                delivery_car: isStateListCarAutonomous?.dataParams?.delivery_car == 0 ? undefined : isStateListCarAutonomous?.dataParams?.delivery_car,
                            }

                            const { data } = await getListCars(isStateListCarAutonomous.page, isStateListCarAutonomous.limit.limitAllCars, query);

                            console.log('check data : ', data);


                            if (data && data?.links && data?.data && data?.base) {
                                let { customDataListCars } = CustomDataListCars(data)

                                queryKeyIsStateListCarAutonomous({
                                    listCardCars: [...(isStateListCarAutonomous.listCardCars || []), ...customDataListCars],
                                    page: isStateListCarAutonomous.page + 1,
                                    next: data?.links?.next
                                });

                                const lastElementIndex = isStateListCarAutonomous.listCardCars.length - 1;
                                // Lấy id của phần tử đầu tiên trong mảng mới
                                const lastElementId = isStateListCarAutonomous.listCardCars && isStateListCarAutonomous.listCardCars.length > 0 ? `card-${isStateListCarAutonomous.listCardCars[lastElementIndex]?.id}` : "";
                                const lastElement = document.getElementById(lastElementId);

                                if (lastElement) {
                                    const newElementTop = lastElement.getBoundingClientRect().bottom + window.scrollY + ALLOWED_OFFSET

                                    window.scrollTo({
                                        top: newElementTop,
                                        behavior: "smooth",
                                    });
                                }

                                queryKeyIsStateListCarAutonomous({
                                    isLoadingScroll: false
                                })
                            } else {
                                queryKeyIsStateListCarAutonomous({
                                    listCardCars: isStateListCarAutonomous.listCardCars,
                                    next: data?.links?.next,
                                    page: data?.links?.next !== null ? isStateListCarAutonomous.page + 1 : isStateListCarAutonomous.page,
                                    isLoadingScroll: false,
                                });
                            }
                        };
                        setTimeout(() => fetchDataListCar(), 500);
                    } else {
                        console.log("check next false");
                    }

                    isAtBottomRef.current = true;
                } else if (currentScroll < lastRefBottom && isAtBottomRef.current) {
                    isAtBottomRef.current = false;
                }
            }
        };

        const scrollCurrent = scrollContainerRef.current;

        scrollCurrent?.addEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);

        return () => {
            scrollCurrent?.removeEventListener(isVisibleMobile ? "touchmove" : "wheel", handleWheel);
        };
    }, [
        scrollContainerRef,
        isStateListCarAutonomous.next,
        isStateListCarAutonomous.listCardCars,
        isStateListCarAutonomous.page,
        isStateListCarAutonomous.isLoadingScroll,
        isVisibleMobile
    ]);

    // handle open modal address
    const handleOpenDialogAddress = (type: string, index?: number) => {
        setOpenDialogAddress(true)
        setType(type)
    }

    const isValueNonZeroOrNonEmptyArray = (key: string, type: string) => {
        if (type === "filter") {
            const newValue: any = isStateListCarAutonomous.dataParams
            const value = newValue[key];
            return value != 0 && (Array.isArray(value) ? value.length != 0 : true);
        } else if (type === "reset_filter") {
            const { dataParams } = isStateListCarAutonomous;

            return Object.values(dataParams).some(value => value != 0 && (!Array.isArray(value) || value.length != 0));
        }
    };

    // handle On/Off favorite car
    const handleClickFavorite = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, car_id?: number | string, index?: number) => {
        e.stopPropagation()
        e.preventDefault();

        if (car_id && index !== undefined) {
            // xử lí sự kiện thả tim trong mảng
            try {
                const dataParams = {
                    car_id: car_id,
                    status: isStateListCarAutonomous?.listCardCars[index]?.favorite_car ? 0 : 1
                }

                const { data } = await postUpdateFavoriteHeartCar(dataParams)

                if (data.result && getCookie !== "kanow" && getCookie !== undefined) {
                    let newDataTest = isStateListCarAutonomous?.listCardCars.map((item: any) => {
                        if (item.id === car_id) {
                            return {
                                ...item,
                                favorite_car: !item.favorite_car
                            }
                        } else {
                            return item
                        }
                    })

                    queryKeyIsStateListCarAutonomous({
                        listCardCars: newDataTest
                    })
                } else {
                    setOpenDialogLogin(true)
                }
            } catch (err) {
                throw err
            }
        }
    };

    // handle Opendialog with type
    const handleOpenDialog = (type: string) => {
        if (type === 'calendar') {
            setOpenDialogCalendar(true)
        } else if (type === 'type_car_search' || type === 'company_car_search' || type === "transmission_search") {
            setOpenDialogFilterListCars(true, type)
        }
    };

    // handle Reset Filter
    const handleResetFilter = async () => {
        const query = {
            type: 1,
            "lat": valueAddressPickup ? coordinates.lat : undefined,
            "lon": valueAddressPickup ? coordinates.lng : undefined,
            date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
            company_car_search: undefined,
            type_car_search: [],
            transmission_search: undefined,
            star_search: undefined,
            tram_search: undefined,
            discount_search: undefined,
            book_car_flash: undefined,
            mortgage: undefined,
            delivery_car: undefined,
        }

        const { data } = await getListCars(1, isStateListCarAutonomous.limit.limitAllCars, query)

        if (data && data.data && data.base) {
            let { customDataListCars } = CustomDataListCars(data)

            queryKeyIsStateListCarAutonomous({
                listCardCars: customDataListCars,
                page: 2,
                next: data?.links?.next,
                dataParams: {
                    company_car_search: "0",
                    transmission_search: "0",
                    type_car_search: [],
                    tram_search: 0,
                    discount_search: 0,
                    book_car_flash: 0,
                    delivery_car: 0,
                    mortgage: 0,
                    star_search: 0,
                }
            })
        }
    };

    // handle Click filter search
    const handleFilterClick = async (item: any, type?: string) => {
        if (item?.type === "star_search") {
            const newStarSearch = isStateListCarAutonomous?.dataParams?.star_search !== item.value ? item.value : 0;

            const query = {
                type: 1,
                "lat": valueAddressPickup ? coordinates.lat : undefined,
                "lon": valueAddressPickup ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                star_search: newStarSearch == 0 ? undefined : newStarSearch,
                tram_search: isStateListCarAutonomous?.dataParams?.tram_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.tram_search,
                discount_search: isStateListCarAutonomous?.dataParams?.discount_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.discount_search,
                book_car_flash: isStateListCarAutonomous?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarAutonomous?.dataParams?.book_car_flash,
                mortgage: isStateListCarAutonomous?.dataParams?.mortgage == 0 ? undefined : isStateListCarAutonomous?.dataParams?.mortgage,
                delivery_car: isStateListCarAutonomous?.dataParams?.delivery_car == 0 ? undefined : isStateListCarAutonomous?.dataParams?.delivery_car,
            }

            let limit = isStateListCarAutonomous.limit.limitAllCars;

            if (
                isStateListCarAutonomous.dataParams?.company_car_search === "0" &&
                isStateListCarAutonomous.dataParams?.type_car_search?.length === 0 &&
                isStateListCarAutonomous?.dataParams?.transmission_search == "0" &&
                newStarSearch === 0 &&
                isStateListCarAutonomous.dataParams?.tram_search === 0 &&
                isStateListCarAutonomous.dataParams?.discount_search === 0 &&
                isStateListCarAutonomous.dataParams?.book_car_flash === 0 &&
                isStateListCarAutonomous.dataParams?.mortgage === 0 &&
                isStateListCarAutonomous.dataParams?.delivery_car === 0
            ) {
                limit = isStateListCarAutonomous.limit.limitAllCars;
            } else {
                limit = isStateListCarAutonomous.limit.limitFilterCars;
            }

            const { data } = await getListCars(1, limit, query)

            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateListCarAutonomous({
                    listCardCars: customDataListCars,
                    page: 2,
                    next: data?.links?.next,
                    dataParams: {
                        ...isStateListCarAutonomous.dataParams,
                        star_search: newStarSearch
                    }
                })
            }
        } else if (item?.type === "tram_search") {
            const newTramSearch = isStateListCarAutonomous?.dataParams?.tram_search !== item.value ? item.value : 0;

            const query = {
                type: 1,
                "lat": valueAddressPickup ? coordinates.lat : undefined,
                "lon": valueAddressPickup ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                star_search: isStateListCarAutonomous?.dataParams?.star_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.star_search,
                tram_search: newTramSearch == 0 ? undefined : newTramSearch,
                discount_search: isStateListCarAutonomous?.dataParams?.discount_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.discount_search,
                book_car_flash: isStateListCarAutonomous?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarAutonomous?.dataParams?.book_car_flash,
                mortgage: isStateListCarAutonomous?.dataParams?.mortgage == 0 ? undefined : isStateListCarAutonomous?.dataParams?.mortgage,
                delivery_car: isStateListCarAutonomous?.dataParams?.delivery_car == 0 ? undefined : isStateListCarAutonomous?.dataParams?.delivery_car,
            }

            let limit = isStateListCarAutonomous.limit.limitAllCars;

            if (
                isStateListCarAutonomous.dataParams?.company_car_search === "0" &&
                isStateListCarAutonomous.dataParams?.type_car_search?.length === 0 &&
                isStateListCarAutonomous?.dataParams?.transmission_search == "0" &&
                isStateListCarAutonomous.dataParams?.star_search === 0 &&
                newTramSearch === 0 &&
                isStateListCarAutonomous.dataParams?.discount_search === 0 &&
                isStateListCarAutonomous.dataParams?.book_car_flash === 0 &&
                isStateListCarAutonomous.dataParams?.mortgage === 0 &&
                isStateListCarAutonomous.dataParams?.delivery_car === 0
            ) {
                limit = isStateListCarAutonomous.limit.limitAllCars;
            } else {
                limit = isStateListCarAutonomous.limit.limitFilterCars;
            }

            const { data } = await getListCars(1, limit, query)

            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateListCarAutonomous({
                    listCardCars: customDataListCars,
                    page: 2,
                    next: data?.links?.next,
                    dataParams: {
                        ...isStateListCarAutonomous.dataParams,
                        tram_search: newTramSearch
                    }
                })
            }
        } else if (item?.type === "discount_search") {
            const newDiscountSearch = isStateListCarAutonomous?.dataParams?.discount_search !== item.value ? item.value : 0;

            const query = {
                type: 1,
                "lat": valueAddressPickup ? coordinates.lat : undefined,
                "lon": valueAddressPickup ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                star_search: isStateListCarAutonomous?.dataParams?.star_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.star_search,
                tram_search: isStateListCarAutonomous?.dataParams?.tram_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.tram_search,
                discount_search: newDiscountSearch == 0 ? undefined : newDiscountSearch,
                book_car_flash: isStateListCarAutonomous?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarAutonomous?.dataParams?.book_car_flash,
                mortgage: isStateListCarAutonomous?.dataParams?.mortgage == 0 ? undefined : isStateListCarAutonomous?.dataParams?.mortgage,
                delivery_car: isStateListCarAutonomous?.dataParams?.delivery_car == 0 ? undefined : isStateListCarAutonomous?.dataParams?.delivery_car,
            }

            let limit = isStateListCarAutonomous.limit.limitAllCars;

            if (
                isStateListCarAutonomous.dataParams?.company_car_search === "0" &&
                isStateListCarAutonomous.dataParams?.type_car_search?.length === 0 &&
                isStateListCarAutonomous?.dataParams?.transmission_search == "0" &&
                isStateListCarAutonomous.dataParams?.star_search === 0 &&
                isStateListCarAutonomous.dataParams?.tram_search === 0 &&
                newDiscountSearch === 0 &&
                isStateListCarAutonomous.dataParams?.book_car_flash === 0 &&
                isStateListCarAutonomous.dataParams?.mortgage === 0 &&
                isStateListCarAutonomous.dataParams?.delivery_car === 0
            ) {
                limit = isStateListCarAutonomous.limit.limitAllCars;
            } else {
                limit = isStateListCarAutonomous.limit.limitFilterCars;
            }

            const { data } = await getListCars(1, limit, query)

            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateListCarAutonomous({
                    listCardCars: customDataListCars,
                    page: 2,
                    next: data?.links?.next,
                    dataParams: {
                        ...isStateListCarAutonomous.dataParams,
                        discount_search: newDiscountSearch
                    }
                })
            }
        } else if (item?.type === "book_car_flash") {
            const newBookCarFlashSearch = isStateListCarAutonomous?.dataParams?.book_car_flash !== item.value ? item.value : 0;

            const query = {
                type: 1,
                "lat": valueAddressPickup ? coordinates.lat : undefined,
                "lon": valueAddressPickup ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                star_search: isStateListCarAutonomous?.dataParams?.star_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.star_search,
                tram_search: isStateListCarAutonomous?.dataParams?.tram_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.tram_search,
                discount_search: isStateListCarAutonomous?.dataParams?.discount_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.discount_search,
                book_car_flash: newBookCarFlashSearch == 0 ? undefined : newBookCarFlashSearch,
                mortgage: isStateListCarAutonomous?.dataParams?.mortgage == 0 ? undefined : isStateListCarAutonomous?.dataParams?.mortgage,
                delivery_car: isStateListCarAutonomous?.dataParams?.delivery_car == 0 ? undefined : isStateListCarAutonomous?.dataParams?.delivery_car,
            }

            let limit = isStateListCarAutonomous.limit.limitAllCars;

            if (
                isStateListCarAutonomous.dataParams?.company_car_search === "0" &&
                isStateListCarAutonomous.dataParams?.type_car_search?.length === 0 &&
                isStateListCarAutonomous?.dataParams?.transmission_search == "0" &&
                isStateListCarAutonomous.dataParams?.star_search === 0 &&
                isStateListCarAutonomous.dataParams?.tram_search === 0 &&
                isStateListCarAutonomous.dataParams?.discount_search === 0 &&
                newBookCarFlashSearch === 0 &&
                isStateListCarAutonomous.dataParams?.mortgage === 0 &&
                isStateListCarAutonomous.dataParams?.delivery_car === 0
            ) {
                limit = isStateListCarAutonomous.limit.limitAllCars;
            } else {
                limit = isStateListCarAutonomous.limit.limitFilterCars;
            }

            const { data } = await getListCars(1, limit, query)

            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateListCarAutonomous({
                    listCardCars: customDataListCars,
                    page: 2,
                    next: data?.links?.next,
                    dataParams: {
                        ...isStateListCarAutonomous.dataParams,
                        book_car_flash: newBookCarFlashSearch
                    }
                })
            }
        } else if (item?.type === "mortgage") {
            const newMortgageSearch = isStateListCarAutonomous?.dataParams?.mortgage !== item.value ? item.value : 0;

            const query = {
                type: 1,
                "lat": valueAddressPickup ? coordinates.lat : undefined,
                "lon": valueAddressPickup ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                star_search: isStateListCarAutonomous?.dataParams?.star_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.star_search,
                tram_search: isStateListCarAutonomous?.dataParams?.tram_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.tram_search,
                discount_search: isStateListCarAutonomous?.dataParams?.discount_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.discount_search,
                book_car_flash: isStateListCarAutonomous?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarAutonomous?.dataParams?.book_car_flash,
                mortgage: newMortgageSearch == 0 ? undefined : newMortgageSearch,
                delivery_car: isStateListCarAutonomous?.dataParams?.delivery_car == 0 ? undefined : isStateListCarAutonomous?.dataParams?.delivery_car,
            }

            let limit = isStateListCarAutonomous.limit.limitAllCars;

            if (
                isStateListCarAutonomous.dataParams?.company_car_search === "0" &&
                isStateListCarAutonomous.dataParams?.type_car_search?.length === 0 &&
                isStateListCarAutonomous?.dataParams?.transmission_search == "0" &&
                isStateListCarAutonomous.dataParams?.star_search === 0 &&
                isStateListCarAutonomous.dataParams?.tram_search === 0 &&
                isStateListCarAutonomous.dataParams?.discount_search === 0 &&
                isStateListCarAutonomous.dataParams?.book_car_flash === 0 &&
                newMortgageSearch === 0 &&
                isStateListCarAutonomous.dataParams?.delivery_car === 0
            ) {
                limit = isStateListCarAutonomous.limit.limitAllCars;
            } else {
                limit = isStateListCarAutonomous.limit.limitFilterCars;
            }

            const { data } = await getListCars(1, limit, query)

            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateListCarAutonomous({
                    listCardCars: customDataListCars,
                    page: 2,
                    next: data?.links?.next,
                    dataParams: {
                        ...isStateListCarAutonomous.dataParams,
                        mortgage: newMortgageSearch
                    }
                })
            }
        } else if (item?.type === "delivery_car") {
            const newDeliveryCarSearch = isStateListCarAutonomous?.dataParams?.delivery_car !== item.value ? item.value : 0;

            const query = {
                type: 1,
                "lat": valueAddressPickup ? coordinates.lat : undefined,
                "lon": valueAddressPickup ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                star_search: isStateListCarAutonomous?.dataParams?.star_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.star_search,
                tram_search: isStateListCarAutonomous?.dataParams?.tram_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.tram_search,
                discount_search: isStateListCarAutonomous?.dataParams?.discount_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.discount_search,
                book_car_flash: isStateListCarAutonomous?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarAutonomous?.dataParams?.book_car_flash,
                mortgage: isStateListCarAutonomous?.dataParams?.mortgage == 0 ? undefined : isStateListCarAutonomous?.dataParams?.mortgage,
                delivery_car: newDeliveryCarSearch == 0 ? undefined : newDeliveryCarSearch,
            }

            let limit = isStateListCarAutonomous.limit.limitAllCars;

            if (
                isStateListCarAutonomous.dataParams?.company_car_search === "0" &&
                isStateListCarAutonomous.dataParams?.type_car_search?.length === 0 &&
                isStateListCarAutonomous?.dataParams?.transmission_search == "0" &&
                isStateListCarAutonomous.dataParams?.star_search === 0 &&
                isStateListCarAutonomous.dataParams?.tram_search === 0 &&
                isStateListCarAutonomous.dataParams?.discount_search === 0 &&
                isStateListCarAutonomous.dataParams?.book_car_flash === 0 &&
                isStateListCarAutonomous.dataParams?.mortgage === 0 &&
                newDeliveryCarSearch === 0
            ) {
                limit = isStateListCarAutonomous.limit.limitAllCars;
            } else {
                limit = isStateListCarAutonomous.limit.limitFilterCars;
            }

            const { data } = await getListCars(1, limit, query)

            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateListCarAutonomous({
                    listCardCars: customDataListCars,
                    page: 2,
                    next: data?.links?.next,
                    dataParams: {
                        ...isStateListCarAutonomous.dataParams,
                        delivery_car: newDeliveryCarSearch
                    }
                })
            }
        } else if (!item && type === 'date') {
            const query = {
                type: 1,
                "lat": valueAddressPickup ? coordinates.lat : undefined,
                "lon": valueAddressPickup ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                star_search: isStateListCarAutonomous?.dataParams?.star_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.star_search,
                tram_search: isStateListCarAutonomous?.dataParams?.tram_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.tram_search,
                discount_search: isStateListCarAutonomous?.dataParams?.discount_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.discount_search,
                book_car_flash: isStateListCarAutonomous?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarAutonomous?.dataParams?.book_car_flash,
                mortgage: isStateListCarAutonomous?.dataParams?.mortgage == 0 ? undefined : isStateListCarAutonomous?.dataParams?.mortgage,
                delivery_car: isStateListCarAutonomous?.dataParams?.delivery_car == 0 ? undefined : isStateListCarAutonomous?.dataParams?.delivery_car,
            }

            let limit = isStateListCarAutonomous.limit.limitAllCars;

            if (
                isStateListCarAutonomous.dataParams?.company_car_search === "0" &&
                isStateListCarAutonomous.dataParams?.type_car_search?.length === 0 &&
                isStateListCarAutonomous?.dataParams?.transmission_search == "0" &&
                isStateListCarAutonomous.dataParams?.star_search === 0 &&
                isStateListCarAutonomous.dataParams?.tram_search === 0 &&
                isStateListCarAutonomous.dataParams?.discount_search === 0 &&
                isStateListCarAutonomous.dataParams?.book_car_flash === 0 &&
                isStateListCarAutonomous.dataParams?.mortgage === 0 &&
                isStateListCarAutonomous.dataParams?.delivery_car === 0
            ) {
                limit = isStateListCarAutonomous.limit.limitAllCars;
            } else {
                limit = isStateListCarAutonomous.limit.limitFilterCars;
            }

            const { data } = await getListCars(1, limit, query)

            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateListCarAutonomous({
                    ...isStateListCarAutonomous,
                    listCardCars: customDataListCars,
                    page: 2,
                    next: data?.links?.next,
                    onSuccess: {
                        onSuccessPage: false
                    }
                })
            }

        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        < >
            <div className={`${isFilterFixed ? "fixed bg-[#FCFDFD] z-30 w-full top-0" : "w-full"}`}>
                <div className='custom-container flex lg:flex-row flex-col lg:gap-16 gap-6 md:items-center lg:justify-start justify-center py-6'>
                    <div className='caret-transparent xl:w-[30%] xl:max-w-[30%] lg:w-[25%] lg:max-w-[25%] w-full max-w-full lg:text-start text-center 3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-[26px] text-[26px] capitalize font-bold text-[#101010]'>
                        Thuê xe tự lái
                    </div>
                    {
                        isVisibleMobile ?
                            <div className='flex items-center justify-between'>
                                <div className='flex flex-col p-1'>
                                    <div
                                        id="place"
                                        onClick={() => setOpenDialogAddress(true)}
                                        className='w-full text-xs truncate cursor-pointer text-[#16171B] rounded-xl border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                    >
                                        {valueAddressPickup ? valueAddressPickup : 'Chọn địa điểm'}
                                    </div>
                                    <div>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                                `w-full justify-start text-left font-normal rounded-xl bg-inherit border-0 text-xs`,
                                                !dateReal && "text-muted-foreground"
                                            )}
                                            onClick={() => handleOpenDialog('calendar')}
                                        >
                                            {dateReal?.from ? (
                                                dateReal.to ? (
                                                    <>
                                                        {format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                                        {format(dateReal.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                                    </>
                                                ) : (
                                                    format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
                                                )
                                            ) : (
                                                <span className='text-[#B4B8C5] font-medium 3xl:text-base text-sm'>Chọn ngày</span>
                                            )}
                                        </Button>
                                    </div>

                                </div>
                                <div>
                                    <RiSearchLine className='size-6' />
                                </div>
                            </div>
                            :
                            <div className='grid grid-cols-11 gap-4 xl:w-[70%] xl:max-w-[70%] lg:w-[75%] lg:max-w-[75%] w-full max-w-full'>
                                <div className="relative w-full col-span-5">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                        <TiLocation className="3xl:text-2xl text-xl text-[#1EAAB1]" />
                                    </span>
                                    {/* <Input
                                        id="place"
                                        type='text'
                                        placeholder='Nhập địa điểm'
                                        className='3xl:py-[18px] p-3 pl-12 text-[#16171B] rounded-xl bg-[#F6F6F8]/70 border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#B4B8C5] placeholder:font-medium' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                    /> */}
                                    <div
                                        id="place"
                                        onClick={() => handleOpenDialogAddress('address_pickup')}
                                        className='3xl:py-4 py-3.5 pl-11 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate cursor-pointer text-[#16171B] rounded-xl bg-[#F6F6F8]/70 border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                    >
                                        {valueAddressPickup ? valueAddressPickup : 'Chọn địa điểm'}
                                    </div>
                                </div>

                                <div className='col-span-5'>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            `3xl:py-4 3xl:px-3 px-3 py-3.5 w-full justify-start text-left font-normal rounded-xl bg-[#F6F6F8]/70 border-0 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs`,
                                            !dateReal && "text-muted-foreground"
                                        )}
                                        onClick={() => handleOpenDialog('calendar')}
                                    >
                                        <FaCalendarAlt className="3xl:mr-4 mr-2 3xl:text-lg text-base text-[#1EAAB1]" />
                                        {dateReal?.from ? (
                                            dateReal.to ? (
                                                <>
                                                    {format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })} -{" "}
                                                    {format(dateReal.to, "HH'h'mm dd/MM/yyyy", { locale: vi })}
                                                </>
                                            ) : (
                                                format(dateReal.from, "HH'h'mm dd/MM/yyyy", { locale: vi })
                                            )
                                        ) : (
                                            <span className='text-[#B4B8C5] font-medium 3xl:text-base text-sm'>Chọn ngày</span>
                                        )}
                                    </Button>
                                </div>

                                <div className='col-span-1'>
                                    <Button className={cn('3xl:p-4 p-3 bg-[#FF9900] hover:bg-[#FF9900]/80 hover:scale-105 rounded-xl text-white duration-200 transiton-colors ease-in-out')}>
                                        <RiSearchLine className='3xl:text-2xl text-xl' />
                                    </Button>
                                </div>
                            </div>
                    }
                </div>
                <div className={` py-4 border-t border-b  w-full`}>
                    <div className='custom-container'>
                        <div className='flex items-center justify-center w-full relative'>
                            <div className='flex items-center gap-2'>
                                <div
                                    onClick={() => handleResetFilter()}
                                    className={`${isValueNonZeroOrNonEmptyArray("", "reset_filter") ? "border border-[#2FB9BD]/80 bg-[#2FB9BD]/10 text-[#2FB9BD]" : "bg-[#F3F3F6] text-[#06282D] hover:bg-[#F3F3F6]/80 "} py-3 px-4 w-fit h-fit rounded-lg cursor-pointer hover:scale-105 duration-200 transition relative caret-transparent`}
                                >
                                    <LuSettings2 className='3xl:text-2xl text-xl' />
                                    {
                                        isValueNonZeroOrNonEmptyArray("", "reset_filter")
                                            ?
                                            <div className='w-2 h-2 rounded-full border border-red-500 bg-red-500 absolute top-1 right-1' />
                                            :
                                            null
                                    }
                                </div>
                            </div>
                            <Swiper
                                slidesPerView={"auto"}
                                spaceBetween={0}
                                loop={false}
                                allowTouchMove={true}
                                className='flex gap-3 w-fit px-2 py-1'
                            >
                                {
                                    listFilter && listFilter.map((item) => (
                                        <SwiperSlide
                                            key={item.id}
                                            className={`${isValueNonZeroOrNonEmptyArray(item.type, "filter") ? "border border-[#2FB9BD]/80 bg-[#2FB9BD]/10 text-[#2FB9BD]" : "bg-[#F3F3F6] hover:bg-[#F3F3F6]/80"} 3xl:text-base text-sm mx-2 py-3 px-4 w-fit rounded-lg cursor-pointer text-[#06282D] font-medium caret-transparent hover:scale-105 duration-200 transition`}
                                            onClick={(item?.type === "type_car_search" || item?.type === "company_car_search" || item?.type === "transmission_search") ? (() => handleOpenDialog(item.type)) : (() => handleFilterClick(item))}
                                        >
                                            {item.name ? item.name : ''}
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div >

            <div
                className={`${isFilterFixed ? "lg:mt-40 mt-60" : "mt-6"} ${isStateListCarAutonomous?.isLoadingScroll ? "pb-0" : "pb-20"}`}
                ref={scrollContainerRef}
            >
                <div className='custom-container grid xxl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-6 gap-4 justify-start h-full'>
                    {
                        isStateListCarAutonomous.onSuccess.onSuccessPage ?
                            <>
                                {[...Array(8)].map((_, index) => (
                                    <React.Fragment key={`index-${index}`}>
                                        <SkeletonListCar />
                                    </React.Fragment>
                                ))}
                            </>
                            :
                            (
                                isStateListCarAutonomous?.listCardCars && isStateListCarAutonomous?.listCardCars?.length > 0 ?
                                    isStateListCarAutonomous?.listCardCars?.map((card: any, index: number) => (
                                        <Link
                                            id={`card-${card.id}`}
                                            key={card.id}
                                            className='caret-transparent col-span-1 bg-white border w-full p-4 flex flex-col 3xl:gap-4 gap-3 rounded-xl relative z-0 hover:scale-105 transition duration-200 ease-in-out'
                                            href={`/detail-car/${card.id}?type=1&${ConvertToSlug(card?.name_car)}`}
                                            prefetch={false}
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
                                                    width={400}
                                                    height={300}
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
                                            <div className={`flex items-center ${card?.location?.distance ? 'justify-between' : 'justify-start'} gap-2 mt-2`}>
                                                <div className='flex items-center gap-2'>
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
                                                {card?.location?.distance &&
                                                    <div className='text-[#1AC5CA] text-xs font-semibold'>~ {card?.location?.distance} km</div>
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
                                    :
                                    <Nodata
                                        type="list-cars"
                                        className="xxl:col-span-4 lg:col-span-3 md:col-span-2 col-span-1"
                                    />
                            )

                    }

                </div>
                {
                    isStateListCarAutonomous?.isLoadingScroll && (
                        <div className="w-full 3xl:h-[80px] h-[60px] flex justify-center items-center gap-2 bg-white shadow-2xl mt-6">
                            <div className="text-[#2FB9BD] inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                            <span className="text-[#2FB9BD] 3xl:text-xl text-base">Loading...</span>
                        </div>
                    )
                }
                <div ref={lastContainerRef} />
            </div>
        </>
    )
}

export default ListCarAutonomous