'use client'

import Aos from 'aos';
import React, { Suspense, useEffect, useState } from 'react'

import Header from './Header';
import Footer from './Footer';

import { Be_Vietnam_Pro } from 'next/font/google'
import { useResize } from '@/hooks/useResize';


import Pusher from "pusher-js";
import ButtonToTop from '../button/ButtonToTop';
import { ToastContainer } from 'react-toastify';
import { usePathname } from 'next/navigation';

import AlertDialogLogout from '../alert/AlertDialogLogout';
import AlertCancel from '../alert/AlertCancel';

import AlertDialogCustom from '../alert/AlertDialogCustom';
import useAuthenticationAPI from '@/services/auth/auth.services';
import { useGeneralKey } from '@/hooks/useGeneralKey';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import 'swiper/css/autoplay'
import 'swiper/swiper-bundle.css';
import "aos/dist/aos.css";
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import "moment/locale/vi";

import { useDataHome, useDataInfoRentalCar, useDataListCarAutonomous, useDataListCarsDriver, useDataPolicy } from '@/hooks/useDataQueryKey';
import { useDialogAddress, useDialogRegisterOwnerDriver, useDialogRouteAddress } from '@/hooks/useOpenDialog';

import DialogFilterMyCar from '@/components/modals/DialogFilterMyCar';
import DialogFilterListCars from '@/components/modals/DialogFilterListCars';
import { DialogLogin } from '@/components/modals/DialogLogin';
import { DialogCalendar } from '@/components/modals/DialogCalendar';
import { DialogReviewImage } from '@/components/modals/DialogReviewImage';
import { DialogRequestCarRental } from '@/components/modals/DialogRequestCarRental';
import { DialogValidate } from '@/components/modals/DialogValidate';
import { DialogAnswerPolicy } from '@/components/modals/DialogAnswerPolicy';
import { DialogCancelCar } from '@/components/modals/DialogCancelCar';
import DialogFilterAddress from '@/components/modals/DialogFilterAddress';
import { DialogRegisterOwnerDriver } from '@/components/modals/DialogRegisterOwnerDriver';
import { DialogReportCar } from '@/components/modals/DialogReportCar';
import { DialogPromotions } from '@/components/modals/DialogPromotions';
import { getDataPolicy } from '@/services/cars/policy.services';
import { CustomDataPolicy } from '@/custom/CustomData';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from 'next/head';
import useGoogleApi from '@/services/filter/google/google.services';
import DialogRouteAddress from '../modals/DialogRouteAddress';

import Cookies from 'js-cookie';
import { DialogNotification } from '../modals/DialogNotification';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { DialogSubmit } from '../modals/DialogSubmit';

const inter = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    display: 'swap'
})

const LayoutContainer = ({
    children
}: {
    children: React.ReactNode
}) => {
    const pathname = usePathname()

    const [isMounted, setIsMounted] = useState<boolean>(false)

    const { getKeySettings } = useAuthenticationAPI()
    const { apiGetCurrentPosition } = useGoogleApi()
    const { informationUser, setInformationUser } = useAuth()

    const { generalKey, setGeneralKey } = useGeneralKey()
    const { isStateInfoRentalCar, queryKeyIsStateInfoRentalCar } = useDataInfoRentalCar()
    const {
        openDialogAddress,
        valueAddressPickup,
        valueAddressDestination,
        indexAddressDestination,
        setValueAddressPickup,
        setValueAddressDestination,
        setCoordinates,
    } = useDialogAddress()

    const {
        isStateNotification,
        queryKeyIsStateNotification,
    } = useNotification()

    const { setValueTwoAddress } = useDialogRouteAddress()
    const { openDialogRegisterOwnerDriver } = useDialogRegisterOwnerDriver();
    const { isStateListCarAutonomous, queryKeyIsStateListCarAutonomous } = useDataListCarAutonomous()
    const { isStateListCarsDriver, queryKeyIsStateListCarsDriver } = useDataListCarsDriver()
    const { queryKeyIsStatePolicy } = useDataPolicy()
    const {
        isVisibleMobile,
        isVisibleTablet,
        onResizeMobile,
        onResizeTablet,
        onCloseResizeMobile,
        onCloseResizeTablet
    } = useResize()

    let InitialCoordinates = {
        latCurrent: 0,
        lngCurrent: 0,
        lat: 0,
        lng: 0,
        latTo: 0,
        lngTo: 0,
    }

    const { isStateDataHome } = useDataHome()

    useEffect(() => {
        setIsMounted(true)

        Aos.init({
            duration: 1800,
            once: true
        });

        const fetchDataPolicy = async () => {
            const { data } = await getDataPolicy();

            if (data) {
                let { customDataPolicy } = CustomDataPolicy(data)
                queryKeyIsStatePolicy({
                    dataPolicy: customDataPolicy
                })
            }
        }

        const fetchKeyApi = async () => {
            try {
                const { data } = await getKeySettings()

                if (data) {
                    setGeneralKey(data)
                }
            } catch (error) {
                throw error
            }
        }

        fetchKeyApi()
        fetchDataPolicy()
    }, []);

    // chuyển lại page là 1 khi pathname khác
    useEffect(() => {
        const scrollTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        scrollTop()

        if (!pathname.startsWith('/list-cars-autonomous') && !pathname.startsWith('/list-cars-driver')) {
            queryKeyIsStateListCarAutonomous({
                ...isStateListCarAutonomous,
                page: 1
            })
            queryKeyIsStateListCarsDriver({
                ...isStateListCarsDriver,
                page: 1
            })
        }
    }, [pathname])

    useEffect(() => {
        const fetchAddressLocalStorage = async () => {
            // const savedCoordinates = localStorage.getItem('coordinates');
            const savedCoordinates = Cookies.get('coordinates');

            // Kiểm tra xem giá trị từ localStorage có tồn tại không
            if (savedCoordinates) {
                // if (savedCoordinates && !valueAddressPickup || savedCoordinates && !valueAddressDestination.some(item => item.valueAddress !== "")) {
                const parseCoordinates = JSON.parse(savedCoordinates)

                const dataParamsPickup = {
                    key: process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D,
                    location: `${parseCoordinates.lat},${parseCoordinates.lng}`,
                    address: "",
                    viewbox: "",
                }

                const dataParamsDestination = {
                    key: process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D,
                    location: `${parseCoordinates.latTo},${parseCoordinates.lngTo}`,
                    address: "",
                    viewbox: "",
                }

                if (pathname.startsWith('/list-cars-autonomous')) {
                    if (parseCoordinates.lat && parseCoordinates.lng) {
                        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup)

                        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result) {
                            const address = dataPickup.result[0].address
                            const location = dataPickup.result[0].location

                            setValueAddressPickup(address)
                            setCoordinates({
                                ...parseCoordinates,
                                lat: location.lat,
                                lng: location.lng,
                            })
                        }
                    }
                } else if (pathname.startsWith('/list-cars-driver')) {
                    if (parseCoordinates.lat && parseCoordinates.lng && parseCoordinates.latTo && parseCoordinates.lngTo) {
                        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup)
                        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination)

                        // điểm đón
                        if ((dataPickup && dataPickup.code == 'ok' && dataPickup.result) && dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
                            const addressPickup = dataPickup.result[0].address
                            const locationPickup = dataPickup.result[0].location
                            const addressDestination = dataDestination.result[0].address
                            const locationDestination = dataDestination.result[0].location

                            // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                            const updatedAddressDestination = [...valueAddressDestination];
                            updatedAddressDestination[indexAddressDestination] = {
                                id: valueAddressDestination[indexAddressDestination].id,
                                valueAddress: addressDestination ? addressDestination : ""
                            };


                            setValueAddressPickup(addressPickup)

                            setValueAddressDestination(updatedAddressDestination)

                            setCoordinates({
                                ...parseCoordinates,
                                lat: locationPickup.lat,
                                lng: locationPickup.lng,
                                latTo: locationDestination.lat,
                                lngTo: locationDestination.lng,
                            })

                            setValueTwoAddress(`${dataPickup.result[0].name} - ${dataDestination.result[0].name}`)
                        }
                    } else if (parseCoordinates.lat && parseCoordinates.lng) {
                        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup)

                        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result) {
                            const address = dataPickup.result[0].address
                            const location = dataPickup.result[0].location

                            setValueAddressPickup(address)
                            setCoordinates({
                                ...parseCoordinates,
                                lat: location.lat,
                                lng: location.lng,
                            })
                        }
                    } else if (parseCoordinates.latTo && parseCoordinates.lngTo) {
                        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination)

                        if (dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
                            const address = dataDestination.result[0].address
                            const location = dataDestination.result[0].location

                            // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                            const updatedAddressDestination = [...valueAddressDestination];
                            updatedAddressDestination[indexAddressDestination] = {
                                id: valueAddressDestination[indexAddressDestination].id,
                                valueAddress: address ? address : ""
                            };

                            setValueAddressDestination(updatedAddressDestination)
                            setCoordinates({
                                ...parseCoordinates,
                                latTo: location.lat,
                                lngTo: location.lng,
                            })
                        }
                    }
                } else if (pathname.startsWith('/detail-car')) {
                    if (parseCoordinates.lat && parseCoordinates.lng && parseCoordinates.latTo && parseCoordinates.lngTo) {
                        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup)
                        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination)

                        // điểm đón
                        if ((dataPickup && dataPickup.code == 'ok' && dataPickup.result) && dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
                            const addressPickup = dataPickup.result[0].address
                            const locationPickup = dataPickup.result[0].location
                            const addressDestination = dataDestination.result[0].address
                            const locationDestination = dataDestination.result[0].location

                            // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                            const updatedAddressDestination = [...valueAddressDestination];
                            updatedAddressDestination[indexAddressDestination] = {
                                id: valueAddressDestination[indexAddressDestination].id,
                                valueAddress: addressDestination ? addressDestination : ""
                            };


                            setValueAddressPickup(addressPickup)

                            setValueAddressDestination(updatedAddressDestination)

                            setCoordinates({
                                ...parseCoordinates,
                                lat: locationPickup.lat,
                                lng: locationPickup.lng,
                                latTo: locationDestination.lat,
                                lngTo: locationDestination.lng,
                            })

                            setValueTwoAddress(`${dataPickup.result[0].name} - ${dataDestination.result[0].name}`)
                        }
                    } else if (parseCoordinates.lat && parseCoordinates.lng) {
                        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup)

                        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result) {
                            const address = dataPickup.result[0].address
                            const location = dataPickup.result[0].location

                            setValueAddressPickup(address)
                            setCoordinates({
                                ...parseCoordinates,
                                lat: location.lat,
                                lng: location.lng,
                            })
                        }
                    } else if (parseCoordinates.latTo && parseCoordinates.lngTo) {
                        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination)

                        if (dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
                            const address = dataDestination.result[0].address
                            const location = dataDestination.result[0].location

                            // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                            const updatedAddressDestination = [...valueAddressDestination];
                            updatedAddressDestination[indexAddressDestination] = {
                                id: valueAddressDestination[indexAddressDestination].id,
                                valueAddress: address ? address : ""
                            };

                            setValueAddressDestination(updatedAddressDestination)
                            setCoordinates({
                                ...parseCoordinates,
                                latTo: location.lat,
                                lngTo: location.lng,
                            })
                        }
                    }
                } else if (pathname === "/" || pathname === "/home") {
                    if (parseCoordinates.lat && parseCoordinates.lng && parseCoordinates.latTo && parseCoordinates.lngTo) {
                        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup)
                        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination)

                        // điểm đón
                        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result) {
                            const address = dataPickup.result[0].address
                            const location = dataPickup.result[0].location

                            setValueAddressPickup(address)
                            setCoordinates({
                                ...parseCoordinates,
                                lat: location.lat,
                                lng: location.lng,
                            })

                        }

                        // điểm đến
                        if (dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
                            const address = dataDestination.result[0].address
                            const location = dataDestination.result[0].location

                            // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                            const updatedAddressDestination = [...valueAddressDestination];
                            updatedAddressDestination[indexAddressDestination] = {
                                id: valueAddressDestination[indexAddressDestination].id,
                                valueAddress: address ? address : ""
                            };


                            setValueAddressDestination(updatedAddressDestination)
                            setCoordinates({
                                ...parseCoordinates,
                                latTo: location.lat,
                                lngTo: location.lng,
                            })

                        }
                    } else if (parseCoordinates.lat && parseCoordinates.lng) {
                        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup)

                        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result) {
                            const address = dataPickup.result[0].address
                            const location = dataPickup.result[0].location

                            setValueAddressPickup(address)
                            setCoordinates({
                                ...parseCoordinates,
                                lat: location.lat,
                                lng: location.lng,
                            })
                        }
                    } else if (parseCoordinates.latTo && parseCoordinates.lngTo) {
                        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination)

                        if (dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
                            const address = dataDestination.result[0].address
                            const location = dataDestination.result[0].location

                            // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                            const updatedAddressDestination = [...valueAddressDestination];
                            updatedAddressDestination[indexAddressDestination] = {
                                id: valueAddressDestination[indexAddressDestination].id,
                                valueAddress: address ? address : ""
                            };

                            setValueAddressDestination(updatedAddressDestination)
                            setCoordinates({
                                ...parseCoordinates,
                                latTo: location.lat,
                                lngTo: location.lng,
                            })
                        }
                    }
                }
            }
        }

        fetchAddressLocalStorage()
    }, [pathname])

    // ẩn/hiện khi chuyển qua màn hình nhỏ khi không dùng chung div để tránh xung đột 
    useEffect(() => {
        // Kiểm tra kích thước màn hình và cập nhật trạng thái isVisible
        const handleResize = () => {
            if (window.innerWidth < 768) {
                // khi đến màn 768 thì bắt đầu thực hiện function
                onResizeMobile();
            } else {
                onCloseResizeMobile()
            }
            if (window.innerWidth <= 768) {
                onResizeTablet()
            } else {
                onCloseResizeTablet()
            }
        };

        // Gọi hàm handleResize khi kích thước màn hình thay đổi
        window.addEventListener('resize', handleResize);

        // Gọi hàm handleResize một lần khi component được render
        handleResize();

        // Hủy lắng nghe sự kiện resize khi component bị unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [
        isVisibleMobile,
        isVisibleTablet,
        onCloseResizeMobile,
        onCloseResizeTablet,
        onResizeMobile,
        onResizeTablet,
    ]);

    ///check chặn scroll của model lọc vị trí và model trở thành đối tác
    useEffect(() => {
        if (openDialogAddress || openDialogRegisterOwnerDriver) {
            document.body.style.overflow = "hidden";
            return
        }
        document.body.style.overflow = "unset";
    }, [openDialogAddress, openDialogRegisterOwnerDriver])

    useEffect(() => {
        if (generalKey && generalKey?.pusher && generalKey?.cluster && informationUser?.id) {
            const pusher = new Pusher(generalKey?.pusher, {
                authTransport: "ajax",
                cluster: generalKey?.cluster,
            });

            pusher.connection.bind("connected", () => {
                console.log("Đã kết nối thành công đến Pusher!");
            });

            pusher.connection.bind("error", (err: any) => {
                console.error("Lỗi kết nối Pusher:", err);
            });

            const presenceChannel = pusher.subscribe(`notifications-channel-${informationUser?.id}-customer`);

            presenceChannel.bind("notification", (data: any) => {
                console.log('NOTIFICATION PUSHER: ', data);
                if (data) {
                    const jsonData = JSON.parse(data?.json_data)

                    const newData: any = {
                        id: data.id,
                        object_id: +data.object_id,
                        object_type: `${data.object_type}`,
                        title: data.title,
                        content: data.content,
                        created_at: data.created_at,
                        is_read: 0,
                        customer_id: informationUser?.id,
                        json_data: jsonData,
                    }
                    // đổi trạng thái xác thực trong trang account
                    setInformationUser({
                        ...informationUser,
                        drivingLiscense: {
                            ...informationUser.drivingLiscense,
                            status: jsonData?.status
                        }
                    })

                    const newListNotifications = [newData, ...isStateNotification.dataListNotifications]

                    queryKeyIsStateNotification({
                        ...isStateNotification,
                        dataListNotifications: newListNotifications
                    })
                }
            });

            return () => {
                presenceChannel.unbind("notification"); // Unbind sự kiện khi component bị unmounted
                pusher.unsubscribe(`notifications-channel-${informationUser.id}-customer`); // Unsubscribe channel khi component bị unmounted
                pusher.disconnect(); // Ngắt kết nối khi component bị unmounted

            };
        }
    }, [
        generalKey,
        informationUser?.id,
        queryKeyIsStateNotification,
        isStateNotification.dataListNotifications,
    ]);

    return (
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_CLIENT_ID}`}>
            <body className={`${inter.className} w-full bg-[#FCFDFD]`}>
                <Suspense>
                    <Header />
                    <main className='overflow-hidden w-full h-full'>
                        {children}
                        <ButtonToTop />
                        <AlertDialogLogout />
                        <DialogLogin />
                        <DialogCalendar />
                        <DialogReviewImage />
                        <DialogRequestCarRental />
                        <DialogValidate />
                        <AlertCancel />
                        <DialogAnswerPolicy />
                        <DialogCancelCar />
                        <DialogPromotions />
                        <DialogReportCar />

                        <DialogFilterAddress />
                        <DialogRouteAddress />

                        <AlertDialogCustom />
                        <DialogSubmit />
                        <DialogRegisterOwnerDriver />
                        <DialogFilterMyCar />
                        <DialogFilterListCars />

                        <DialogNotification />
                    </main>
                    {pathname !== "/list-cars-autonomous" && pathname !== "/list-cars-driver" && <Footer />}
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </Suspense>

            </body>
        </GoogleOAuthProvider>
    )
}

export default LayoutContainer