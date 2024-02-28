'use client'

// import Aos from 'aos';
import React, { useEffect } from 'react'

import Header from './Header';
import Footer from './Footer';

import { Be_Vietnam_Pro } from 'next/font/google'
import { useResize } from '@/hooks/useResize';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
// import "aos/dist/aos.css";
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
    const { isVisibleMobile, onResizeMobile, onCloseResizeMobile } = useResize()

    // ẩn/hiện khi chuyển qua màn hình nhỏ khi không dùng chung div để tránh xung đột 
    useEffect(() => {
        // Kiểm tra kích thước màn hình và cập nhật trạng thái isVisible
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                // khi đến màn 768 thì bắt đầu thực hiện function
                onResizeMobile();
            } else {
                onCloseResizeMobile()
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
    }, [isVisibleMobile]);

    useEffect(() => {
        const scrollTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        scrollTop()
    }, [])

    return (
        <html lang="en">
            <body className={`${inter.className} w-full`}>
                <Header />
                <main className='overflow-hidden w-full'>
                    {children}
                </main>
                <Footer />
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
        </html >
    )
}

export default LayoutContainer