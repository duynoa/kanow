'use client'

import Aos from 'aos';
import React, { useEffect, useState } from 'react'

import Header from './Header';
import Footer from './Footer';

import { Be_Vietnam_Pro } from 'next/font/google'
import { useResize } from '@/hooks/useResize';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import 'swiper/css/autoplay'
import "aos/dist/aos.css";
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ButtonToTop from '../button/ButtonToTop';
import { usePathname } from 'next/navigation';

import AlertDialogLogout from '../alert/AlertDialogLogout';
import { DialogLogin } from '../modals/DialogLogin';
import { DialogCalendar } from '../modals/DialogCalendar';
import { DialogReviewImage } from '../modals/DialogReviewImage';
import { DialogRequestCarRental } from '../modals/DialogRequestCarRental';
import { DialogValidate } from '../modals/DialogValidate';
import AlertCancel from '../alert/AlertCancel';
import { DialogAnswerPolicy } from '../modals/DialogAnswerPolicy';
import Script from 'next/script';
import { useGoogleKey } from '@/hooks/useGoogleKey';
import apiGoogleKey from '@/services/gooogle/googleKey.services';
import AlertDialogCustom from '../alert/AlertDialogCustom';

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

    const { setGoogleKey } = useGoogleKey()

    const { apiGetGoogleKey } = apiGoogleKey()

    const { isVisibleMobile, onResizeMobile, onCloseResizeMobile, isVisibleTablet, onResizeTablet, onCloseResizeTablet } = useResize()

    useEffect(() => {
        const scrollTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        scrollTop()

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
    }, [isVisibleMobile, onCloseResizeMobile, onCloseResizeTablet, onResizeMobile, onResizeTablet, isVisibleTablet]);
    // apiGoogleKey
    useEffect(() => {
        const getKey = async () => {
            try {
                // const { data } = await apiGetGoogleKey()
                // if (data) {
                //     setGoogleKey(data)
                // }
            } catch (error) {
                throw error
            }
        }
        getKey()
    }, [])
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
                    {/* // nút xóa địa chỉ */}
                    <AlertDialogCustom />
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