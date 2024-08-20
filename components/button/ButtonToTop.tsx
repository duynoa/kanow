'use client'

import { useState, useEffect, useCallback } from 'react'

import { HiOutlineArrowNarrowUp } from "react-icons/hi";

const ButtonToTop = () => {
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

    return (
        <div className='fixed bottom-20 lg:right-10 right-5 md:space-y-4 space-y-4 z-[999]'>
            <div className={`${isShow ? "translate-x-0" : "translate-x-[200%]"} transition-transform duration-300 relative flex flex-col justify-center items-center`}>
                <button type="button" onClick={() => scrollTop()} className='relative z-[1] lg:w-14 w-12 lg:h-14 h-12 rounded-full bg-[#2FB9BD] text-white flex flex-col justify-center items-center'>
                    <HiOutlineArrowNarrowUp className='text-2xl'/>
                </button>
                <div className='w-14 h-14 rounded-full bg-[#D7E4FF]/30 absolute animate-ping' />
            </div>
        </div>
    )
}

export default ButtonToTop;