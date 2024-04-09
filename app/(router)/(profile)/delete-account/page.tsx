'use client'
import React, { useState } from "react"
import BackgroundUiProfile from "@/themes/profile/BackgroundUiProfile";
import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment";

type Props = {}


const ChangePassWord = (props: Props) => {

    return (
        <BackgroundUiProfile className="flex flex-col gap-4 ">
            {/* <div className='flex flex-col gap-2'>
                <div className='flex items-center md:gap-4 gap-2'>
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl font-semibold '>Đổi mật khẩu</h1>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <h4 className='text-[#3E424E] font-normal lg:text-base text-sm'>
                        Vui lòng nhập mật khẩu cũ của bạn để thực hiện thay đổi mật khẩu
                    </h4>
                </div>
            </div> */}
            <UnderDevelopment />

        </BackgroundUiProfile>
    )
}
export default ChangePassWord