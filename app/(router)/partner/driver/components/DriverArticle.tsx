import React from 'react'
import { Button } from '@/components/ui/button'
import { IoArrowForwardOutline } from 'react-icons/io5'
import Link from 'next/link'

type Props = {}

const DriverArticle = (props: Props) => {

    const handleItemClick = (itemId: number | string) => {
        // Tìm phần tử có id tương ứng
        const targetElement = document.getElementById(`section-${itemId}`);

        // Nếu tìm thấy, cuộn trang đến vị trí của phần tử
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth", // Hiệu ứng cuộn mượt
                block: "start", // Đặt vị trí đầu tiên của phần tử mục tiêu ở đầu trang
                inline: "nearest", // Đặt vị trí ngang của phần tử mục tiêu gần nhất
            });
        }

    };

    return (
        <div className='grid grid-cols-4 gap-4 custom-container'>
            <div className="lg:col-span-2 col-span-4 bg-[url('/other/car/car1.png')] bg-cover bg-center 3xl:h-[420px] 2xl:h-[380px] xxl:h-[380px] xl:h-[360px] lg:h-[340px] md:h-[340px] h-[260px] w-full rounded-2xl flex flex-col justify-between lg:p-8 p-6">
                <div className='3xl:text-4xl 2xl:text-3xl xxl:text-3xl xl:text-3xl lg:text-2xl md:text-3xl text-2xl text-white font-semibold line-clamp-2 max-w-full'>
                    Tư vấn đăng ký trở thành tài xế KANOW
                </div>
                <div className=''>
                    <Button
                        size="readMore"
                        className='xl:px-8 xl:py-4 px-6 py-3 flex items-center gap-2 font-bold text-[#000000] bg-[#9DF2EE] hover:bg-[#9DF2EE]/90 group-hover:translate-x-2'
                    >
                        <span className='3xl:text-base lg:text-sm md:text-base text-base uppercase'>Đăng ký ngay</span>
                    </Button>
                </div>
            </div>
            <div className='lg:col-span-2 col-span-4 grid grid-cols-2 gap-4'>
                <div className='md:col-span-1 col-span-2 grid grid-rows-2 gap-4'>
                    <div
                        onClick={() => handleItemClick('whykanow')}
                        className='row-span-1 bg-[#CDFEDD] flex flex-col lg:h-full h-[160px] justify-between xl:p-6 p-5 rounded-2xl group cursor-pointer'
                    >
                        <div className='3xl:text-base text-sm text-[#5C5C5C]'>
                            Cước vận chuyển siêu thấp
                        </div>
                        <div className='3xl:text-3xl xxl:text-2xl xl:text-xl lg:text-lg md:text-2xl text-2xl text-[#0A6313] group-hover:text-[#0A6313]/80 duration-200 transition ease-in-out font-bold flex items-end gap-2'>
                            <span className=''>Lý do bạn nên đến với KANOW</span>
                            <div>
                                <IoArrowForwardOutline className='xl:text-2xl text-xl -rotate-45 group-hover:translate-x-2 duration-200 transition ease-in-out' />
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => handleItemClick('benefits')}
                        className='row-span-1 bg-[#FFEFD7] flex flex-col lg:h-full h-[160px] justify-between xl:p-6 p-5 rounded-2xl group cursor-pointer'
                    >
                        <div className='3xl:text-base text-sm text-[#5C5C5C]'>
                            Đa dạng nguồn hàng
                        </div>
                        <div className='3xl:text-3xl xxl:text-2xl xl:text-xl lg:text-lg md:text-2xl text-2xl text-[#B95900] group-hover:text-[#B95900]/80 duration-200 transition ease-in-out font-bold flex items-end gap-2'>
                            <span className=''>Những quyền lợi của tài xế</span>
                            <div>
                                <IoArrowForwardOutline className='xl:text-2xl text-xl -rotate-45 group-hover:translate-x-2 duration-200 transition ease-in-out' />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => handleItemClick('questions')}
                    className='md:col-span-1 col-span-2 bg-[#CCF9FC] md:h-full h-[160px] flex flex-col justify-between xl:p-6 p-5 rounded-2xl group cursor-pointer'
                >
                    <div className='3xl:text-base text-sm text-[#5C5C5C]'>
                        Quy trình rõ ràng, minh bạch
                    </div>
                    <div className='3xl:text-3xl xxl:text-2xl xl:text-xl lg:text-lg md:text-2xl text-2xl text-[#0B695D] group-hover:text-[#0B695D]/80 duration-200 transition ease-in-out font-bold flex items-end gap-2'>
                        <span className=''>Hỏi đáp thủ tục dành cho tài xế</span>
                        <div>
                            <IoArrowForwardOutline className='xl:text-2xl text-xl -rotate-45 group-hover:translate-x-2 duration-200 transition ease-in-out' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DriverArticle