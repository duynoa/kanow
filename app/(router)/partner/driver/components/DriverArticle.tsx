import React from 'react'
import { Button } from '@/components/ui/button'
import { IoArrowForwardOutline } from 'react-icons/io5'
import Link from 'next/link'

type Props = {}

const DriverArticle = (props: Props) => {
    return (
        <div className='grid grid-cols-4 gap-4 custom-container'>
            <div className="col-span-2 bg-[url('/other/car/car1.png')] bg-cover bg-center 3xl:h-[420px] 2xl:h-[380px] xxl:h-[380px] xl:h-[380px] lg:h-[380px] md:h-[380px] h-[260px] w-full rounded-2xl flex flex-col justify-between p-8">
                <div className='3xl:text-4xl 2xl:text-3xl xxl:text-2xl xl:text-xl lg:text-xl md:text-base text-base text-white font-semibold line-clamp-2 max-w-full'>
                    Tư vấn đăng ký trở thành tài xế KANOW
                </div>
                <div className=''>
                    <Button
                        size="readMore"
                        className='2xl:px-8 2xl:py-3 xl:px-6 xl:py-3 px-4 py-2 flex items-center gap-2 font-bold text-[#000000] bg-[#9DF2EE] hover:bg-[#9DF2EE]/90 group-hover:translate-x-2'
                    >
                        <span className='3xl:text-base lg:text-sm md:text-base text-lg uppercase'>Đăng ký ngay</span>
                    </Button>
                </div>
            </div>
            <div className='col-span-2 grid grid-cols-2 gap-4'>
                <div className='col-span-1 grid grid-rows-2 gap-4'>
                    <Link
                        href="#"
                        className='row-span-1 bg-[#CDFEDD] flex flex-col justify-between p-6 rounded-2xl group'
                    >
                        <div className='3xl:text-base text-sm text-[#5C5C5C]'>
                            Cước vận chuyển siêu thấp
                        </div>
                        <div className='3xl:text-3xl 2xl:text-2xl text-2xl text-[#0A6313] group-hover:text-[#0A6313]/80 duration-200 transition ease-in-out font-bold flex items-end gap-2'>
                            <span className=''>Lý do bạn nên đến với KANOW</span>
                            <div>
                                <IoArrowForwardOutline className='xl:text-2xl text-xl -rotate-45 group-hover:translate-x-2 duration-200 transition ease-in-out' />
                            </div>
                        </div>
                    </Link>
                    <Link
                        href="#"
                        className='row-span-1 bg-[#FFEFD7] flex flex-col justify-between p-6 rounded-2xl group'
                    >
                        <div className='3xl:text-base text-sm text-[#5C5C5C]'>
                            Đa dạng nguồn hàng
                        </div>
                        <div className='3xl:text-3xl 2xl:text-2xl text-2xl text-[#B95900] group-hover:text-[#B95900]/80 duration-200 transition ease-in-out font-bold flex items-end gap-2'>
                            <span className=''>Những quyền lợi của tài xế</span>
                            <div>
                                <IoArrowForwardOutline className='xl:text-2xl text-xl -rotate-45 group-hover:translate-x-2 duration-200 transition ease-in-out' />
                            </div>
                        </div>
                    </Link>
                </div>
                <Link
                    href="#"
                    className='col-span-1 bg-[#CCF9FC] flex flex-col justify-between p-6 rounded-2xl group'
                >
                    <div className='3xl:text-base text-sm text-[#5C5C5C]'>
                        Quy trình rõ ràng, minh bạch
                    </div>
                    <div className='3xl:text-3xl 2xl:text-2xl text-2xl text-[#0B695D] group-hover:text-[#0B695D]/80 duration-200 transition ease-in-out font-bold flex items-end gap-2'>
                        <span className=''>Hỏi đáp thủ tục dành cho tài xế</span>
                        <div>
                            <IoArrowForwardOutline className='xl:text-2xl text-xl -rotate-45 group-hover:translate-x-2 duration-200 transition ease-in-out' />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default DriverArticle