'use client'

import Aos from 'aos';
import React, { useEffect } from 'react'

import Header from './Header';
import Footer from './Footer';

import { Be_Vietnam_Pro } from 'next/font/google'
import { useResize } from '@/hooks/useResize';


import Pusher from "pusher-js";
import ButtonToTop from '../button/ButtonToTop';
import { ToastContainer } from 'react-toastify';
import { usePathname } from 'next/navigation';

import AlertDialogLogout from '../alert/AlertDialogLogout';
import { DialogLogin } from '../modals/DialogLogin';
import { DialogCalendar } from '../modals/DialogCalendar';
import { DialogReviewImage } from '../modals/DialogReviewImage';
import { DialogRequestCarRental } from '../modals/DialogRequestCarRental';
import { DialogValidate } from '../modals/DialogValidate';
import AlertCancel from '../alert/AlertCancel';
import { DialogAnswerPolicy } from '../modals/DialogAnswerPolicy';

import AlertDialogCustom from '../alert/AlertDialogCustom';
import useAuthenticationAPI from '@/services/auth/auth.services';
import { useGeneralKey } from '@/hooks/useGeneralKey';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import 'swiper/css/autoplay'
import "aos/dist/aos.css";
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useDataInfoRentalCar, useDataListCarAutonomous } from '@/hooks/useDataQueryKey';
import { DialogCancelCar } from '../modals/DialogCancelCar';
import { DialogFilterAddress } from '../modals/DialogFilterAddress';
import { useDialogAddress, useDialogRegisterOwnerDriver } from '@/hooks/useOpenDialog';
import { useParams } from 'next/navigation';
import { DialogRegisterOwnerDriver } from '../modals/DialogRegisterOwnerDriver';
import DialogFilterMyCar from '../modals/DialogFilterMyCar';
import { DialogPromotion } from '../modals/DialogPromotion';
import { DialogReportCar } from '../modals/DialogReportCar';

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

    const { getKeySettings } = useAuthenticationAPI()

    const { generalKey, setGeneralKey } = useGeneralKey()

    const { isStateInfoRentalCar, queryKeyIsStateInfoRentalCar } = useDataInfoRentalCar()

    const { openDialogAddress, } = useDialogAddress()

    const { openDialogRegisterOwnerDriver } = useDialogRegisterOwnerDriver();
    const { isStateListCarAutonomous, queryKeyIsStateListCarAutonomous } = useDataListCarAutonomous()

    const {
        isVisibleMobile,
        isVisibleTablet,
        onResizeMobile,
        onResizeTablet,
        onCloseResizeMobile,
        onCloseResizeTablet
    } = useResize()


    // if (typeof document !== 'undefined') {
    //     document.addEventListener('visibilitychange', () => {
    //         if (document.visibilityState === 'hidden') {
    //             console.log('Tab không được nhìn thấy');
    //         } else {
    //             navigator.geolocation.getCurrentPosition((position) => {
    //                 console.log('position', position);

    //                 // setCoordinates({
    //                 //     defaultLat: position.coords.latitude,
    //                 //     defaultLng: position.coords.longitude,
    //                 //     lat: position.coords.latitude,
    //                 //     lng: position.coords.longitude
    //                 // })
    //             })
    //         }
    //     });
    // }

    useEffect(() => {
        const scrollTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        scrollTop()


        if (!pathname.startsWith('/list-car-autonomous')) {
            queryKeyIsStateListCarAutonomous({
                ...isStateListCarAutonomous,
                page: 1
            })
        }
        // if (!pathname.startsWith('/list-car-autonomous') && !pathname.startsWith('/detail-car/')) {
        //     queryKeyIsStateListCarAutonomous({
        //         ...isStateListCarAutonomous,
        //         page: 1
        //     })
        //     console.log('checkkkhjkhkhkhkhkhjkhkkkhkhkk');
        // } else if (pathname.startsWith('/detail-car/')) {
        //     queryKeyIsStateListCarAutonomous({
        //         ...isStateListCarAutonomous,
        //         page: isStateListCarAutonomous?.page - 1
        //     })

        // }
    }, [pathname])


    useEffect(() => {
        Aos.init({
            duration: 1800,
            once: true
        });
    }, []);

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

    // getKeySettings
    useEffect(() => {
        const getKey = async () => {
            try {
                const { data } = await getKeySettings()

                console.log('data Key: ', data);

                if (data) {
                    setGeneralKey(data)
                }
            } catch (error) {
                throw error
            }
        }
        getKey()

    }, [])

    ///check chặn scroll của model lọc vị trí và model trở thành đối tác
    useEffect(() => {
        if (openDialogAddress || openDialogRegisterOwnerDriver) {
            document.body.style.overflow = "hidden";
            return
        }
        document.body.style.overflow = "unset";
    }, [openDialogAddress, openDialogRegisterOwnerDriver])
    // if (navigator.geolocation) {
    //     navigator.geolocation.watchPosition((position) => {
    //         console.log("position", position);

    //         setLatitude(position.coords.latitude)
    //         setLongitude(position.coords.longitude)
    //     })
    // }



    useEffect(() => {
        if (generalKey && generalKey?.pusher && generalKey?.cluster) {
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

            const presenceChannel = pusher.subscribe("notification-status");
            //pusher xóa mẫu
            presenceChannel.bind("change-status", (data: any) => {
                if (data && isStateInfoRentalCar?.detailRentalCar) {
                    queryKeyIsStateInfoRentalCar({
                        detailRentalCar: {
                            ...isStateInfoRentalCar?.detailRentalCar,
                            status: {
                                ...isStateInfoRentalCar?.detailRentalCar?.status,
                                status: +data.status,
                                statusCustom: +data.status,
                                note: data.note_status
                            }
                        }
                    })
                    console.log('data dsadsadsad đá sads: ', data);

                }
            });

            return () => {
                presenceChannel.unbind(); // Unbind sự kiện khi component bị unmounted
                pusher.unsubscribe("notification-status"); // Unsubscribe channel khi component bị unmounted
                pusher.disconnect(); // Ngắt kết nối khi component bị unmounted
            };
        }
    }, [generalKey, isStateInfoRentalCar, queryKeyIsStateInfoRentalCar]);

    return (
        <html lang="en">
            <body className={`${inter.className} w-full bg-[#FCFDFD]`}>
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
                    <DialogFilterAddress />
                    <DialogPromotion />
                    <DialogReportCar />

                    <AlertDialogCustom />
                    <DialogRegisterOwnerDriver />
                    <DialogFilterMyCar />
                </main>
                {pathname !== "/list-car-autonomous" && <Footer />}
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
            </body>
            {/* <Script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1cC7gG0SKu8ZVC4N5T89u9QfVQVMM_ZY" type="text/javascript" /> */}
        </html >
    )
}

export default LayoutContainer