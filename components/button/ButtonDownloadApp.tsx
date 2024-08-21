'use client'

import { useState, useEffect, useCallback } from 'react'

import { HiOutlineArrowNarrowUp } from "react-icons/hi";
import { IoCloseCircle } from 'react-icons/io5';
import { Button } from '../ui/button';

const ButtonDownloadApp = () => {
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [isShow, sIsShow] = useState(false)

    const handleNavigation = useCallback(() => {
        var heightScreen = window.innerHeight;
        if (heightScreen > window.scrollY) {
            sIsShow(false)
        } else if (heightScreen < window.scrollY) {
            sIsShow(true)
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleNavigation);
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    const handleDownloadClick = () => {
        const userAgent = navigator.userAgent || (navigator as any).vendor || (window as any).opera;

        if (/android/i.test(userAgent)) {
            // Điều hướng đến Google Play
            window.location.href = 'https://play.google.com/store/apps/details?id=com.kanow&pcampaignid=web_share';
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            // Điều hướng đến App Store
            window.location.href = 'https://apps.apple.com/vn/app/kanow-thu%C3%AA-xe-t%E1%BB%B1-l%C3%A1i/id6503139402?l=vi';
        } else {
            // Điều hướng đến trang web hoặc link dự phòng
            window.location.href = 'https://play.google.com/store/apps/details?id=com.kanow&pcampaignid=web_share';
        }
    };

    return (
        <div className='fixed right-0 bottom-2 md:space-y-4 space-y-4 z-[999] w-full shadow-2xl'>
            <div className={`${isShow ? "translate-y-0" : "translate-y-[200%]"} transition-transform duration-300 relative flex flex-row justify-between items-center w-full bg-gray-100 p-4`}>
                <div className='max-w-[10%]'>
                    <IoCloseCircle
                        className='size-5 text-gray-500'
                        onClick={() => sIsShow(false)}
                    />
                </div>
                <div className='text-base font-bold max-w-[60%]'>
                    Dịch vụ thuê xe KANOW
                </div>
                <div className='max-w-[30%]'>
                    <Button
                        onClick={handleDownloadClick}
                        type="button"
                        className='text-sm 3xl:px-10 3xl:py-4 2xl:px-8 2xl:py-3 lg:px-6 lg:py-3 px-4 py-2 w-fit 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-[#2FB9BD]/80 transition-all overflow-hidden bg-[#2FB9BD] text-white'
                    >
                        Tải ngay
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ButtonDownloadApp;