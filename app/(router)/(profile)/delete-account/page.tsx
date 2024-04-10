// 'use client'
// import React, { useState } from "react"
import BackgroundUiProfile from "@/themes/profile/BackgroundUiProfile";
// import UnderDevelopment from "@/components/underDevelopment/UnderDevelopment";
import Image from "next/image";
import apiDeleteAccount from "@/services/profile/deleteAccount/deleteAccount.services";
type Props = {}


// const ChangePassWord = (props: Props) => {

//     return (
//         <BackgroundUiProfile className="flex flex-col gap-4 ">
//             <div className='flex flex-col gap-2'>
//                 <div className='flex items-center md:gap-4 gap-2'>
//                     <h1 className='text-[#3E424E] lg:text-2xl text-xl font-semibold '>Yêu cầu xóa tài khoản</h1>
//                 </div>
//                 <div className='flex flex-row items-center gap-2'>
//                     <h4 className='text-[#3E424E] font-normal lg:text-base text-sm'>
//                         Lưu ý khi yêu cầu xóa tài khoản
//                     </h4>
//                 </div>
//             </div>
//             <div className="h-auto w-full">
//                 <Image src={'/lockAccount/log.png'} width={1280} height={1024} alt="" className="size-[40%] object-cover mx-auto" />
//             </div>
//             <h1>
//                 Khi xóa tài khoản, các thông tin sau (nếu có) sẽ bị xóa trên hệ thống:

//                 Thông tin cá nhân
//                 Thông tin lịch sử chuyến và danh sách xe
//                 Tiền ví và điểm thưởng sẽ được thanh toán theo quy định và chính sách hiện hành của Mioto.

//                 Việc đồng ý xóa tài khoản là bạn đã chấp nhận điều khoản chính sách xóa tài khoản của Mioto.

//                 Yêu cầu xóa tài khoản sẽ được xử lý trong vòng 15 ngày làm việc. Mioto sẽ liên hệ trực tiếp với bạn thông qua Email hoặc Số điện thoại đã cung cấp.

//                 Mọi thắc mắc xin liên hệ Fanpage của Mioto hoặc Hotline 1900 9217 (7AM - 10PM) để được hỗ trợ.
//             </h1>
//             {/* <UnderDevelopment /> */}

//         </BackgroundUiProfile>
//     )
// }
// export default ChangePassWord

export default async function ChangePassWord(props: Props) {
    const { apiLogAccount } = apiDeleteAccount()

    const { data } = await apiLogAccount()

    console.log(data);


    return <BackgroundUiProfile className="flex flex-col gap-4 ">
        <div className='flex flex-col gap-2'>
            <div className='flex items-center md:gap-4 gap-2'>
                <h1 className='text-[#3E424E] lg:text-2xl text-xl font-semibold '>Yêu cầu xóa tài khoản</h1>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <h4 className='text-[#3E424E] font-normal lg:text-base text-sm'>
                    Lưu ý khi yêu cầu xóa tài khoản
                </h4>
            </div>
        </div>
        <div className="h-auto w-full">
            <Image src={'/lockAccount/log.png'} width={1280} height={1024} alt="" className="size-[40%] object-cover mx-auto" />
        </div>
        <h1>
            Khi xóa tài khoản, các thông tin sau (nếu có) sẽ bị xóa trên hệ thống:

            Thông tin cá nhân
            Thông tin lịch sử chuyến và danh sách xe
            Tiền ví và điểm thưởng sẽ được thanh toán theo quy định và chính sách hiện hành của Mioto.

            Việc đồng ý xóa tài khoản là bạn đã chấp nhận điều khoản chính sách xóa tài khoản của Mioto.

            Yêu cầu xóa tài khoản sẽ được xử lý trong vòng 15 ngày làm việc. Mioto sẽ liên hệ trực tiếp với bạn thông qua Email hoặc Số điện thoại đã cung cấp.

            Mọi thắc mắc xin liên hệ Fanpage của Mioto hoặc Hotline 1900 9217 (7AM - 10PM) để được hỗ trợ.
        </h1>
    </BackgroundUiProfile>
}