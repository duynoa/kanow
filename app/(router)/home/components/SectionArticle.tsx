import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoArrowForwardOutline } from 'react-icons/io5'

type Props = {}

const SectionArticle = (props: Props) => {
    return (
        <div className="flex bg-[url('/background/folder_background.png')] bg-cover border-b drop-shadow -mt-[700px]">
            <div className='custom-container flex flex-col items-center justify-center w-full 3xl:pb-32 3xl:pt-96 py-16'>
                <div className='3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl text-xl capitalize font-bold text-[#101010]'>
                    Bài viết
                </div>
                <div className='mt-10 grid grid-cols-3 gap-8 w-full'>
                    <div className='w-full col-span-2'>
                        <Link
                            href="#"
                            className='relative group'
                        >
                            <div className='w-full 3xl:h-[532px] 2xl:h-[500px] xl:h-[500px] md:h-[480px] h-[480px] group overflow-hidden rounded-2xl'>
                                <Image
                                    width={1920}
                                    height={1080}
                                    loading='lazy'
                                    alt='image'
                                    src="/other/car/car1.png"
                                    className='w-full h-full object-cover rounded-2xl group-hover:scale-105 duration-500 transition ease-in-out'
                                />
                            </div>
                            <div className='flex flex-col md:gap-4 gap-2 absolute md:left-[50px] left-[40px] md:top-[50px] top-[40px] 2xl:pr-4 pr-6'>
                                <div className='lg:text-sm md:text-base text-lg uppercase font-medium font-[inter] text-[#61F7F7] line-clamp-2'>
                                    Thông báo
                                </div>
                                <div className='3xl:text-2xl 2xl:text-xl xxl:text-xl xl:text-xl lg:text-xl md:text-sm text-base text-white font-semibold line-clamp-4 max-w-[75%]'>
                                    Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW
                                </div>
                            </div>
                            <div className='absolute md:left-[50px] left-[40px] md:bottom-[50px] bottom-[40px]'>
                                <Button
                                    size="readMore"
                                    className='flex items-center gap-2 lg:text-base md:text-base text-lg font-bold text-[#000000] bg-[#9DF2EE] group-hover:bg-[#9DF2EE]/90 group-hover:translate-x-2 2xl:px-8 2xl:py-3 px-6 py-3'
                                >
                                    <span>Xem thêm</span>
                                    <IoArrowForwardOutline className='text-xl -rotate-45' />
                                </Button>
                            </div>
                        </Link>
                    </div>
                    <div className='w-full col-span-1 flex flex-col gap-8 max-h-[500px]'>
                        <Link
                            href="#"
                            className='relative group'
                        >
                            <div className='w-full 3xl:h-[250px] 2xl:h-[250px] xl:h-[250px] md:h-[250px] h-[250px] group overflow-hidden rounded-2xl'>
                                <Image
                                    width={1920}
                                    height={1080}
                                    loading='lazy'
                                    alt='image'
                                    src="/other/car/car1.png"
                                    className='w-full h-full object-cover rounded-2xl group-hover:scale-105 duration-500 transition ease-in-out'
                                />
                            </div>
                            <div className='flex flex-col gap-2 absolute md:left-[30px] left-[20px] md:top-[30px] top-[20px] 2xl:pr-4 pr-6'>
                                <div className='lg:text-sm md:text-base text-lg uppercase font-medium font-[inter] text-[#61F7F7] line-clamp-2'>
                                    Thông báo
                                </div>
                                <div className='3xl:text-xl 2xl:text-xl xxl:text-xl xl:text-xl lg:text-xl md:text-sm text-base text-white font-semibold line-clamp-4 max-w-[75%]'>
                                    Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW
                                </div>
                            </div>
                            <div className='absolute md:left-[30px] left-[20px] md:bottom-[30px] bottom-[20px]'>
                                <Button
                                    size="readMore"
                                    className='flex items-center gap-2 lg:text-base md:text-base text-lg font-bold text-[#000000] bg-[#9DF2EE] group-hover:bg-[#9DF2EE]/90 group-hover:translate-x-2 2xl:px-8 2xl:py-3 px-6 py-3'
                                >
                                    <span>Xem thêm</span>
                                    <IoArrowForwardOutline className='text-xl -rotate-45' />
                                </Button>
                            </div>
                        </Link>
                        <Link
                            href="#"
                            className='relative group'
                        >
                            <div className='w-full 3xl:max-h-[250px] 2xl:max-h-[250px] xl:h-[250px] md:h-[250px] h-[250px] group overflow-hidden rounded-2xl'>
                                <Image
                                    width={1920}
                                    height={1080}
                                    loading='lazy'
                                    alt='image'
                                    src="/other/car/car1.png"
                                    className='w-full h-full object-cover rounded-2xl group-hover:scale-105 duration-500 transition ease-in-out'
                                />
                            </div>
                            <div className='flex flex-col gap-2 absolute md:left-[30px] left-[20px] md:top-[30px] top-[20px] 2xl:pr-4 pr-6'>
                                <div className='lg:text-sm md:text-base text-lg uppercase font-medium font-[inter] text-[#61F7F7] line-clamp-2'>
                                    Thông báo
                                </div>
                                <div className='3xl:text-xl 2xl:text-xl xxl:text-xl xl:text-xl lg:text-xl md:text-sm text-base text-white font-semibold line-clamp-4 max-w-[75%]'>
                                    Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW
                                </div>
                            </div>
                            <div className='absolute md:left-[30px] left-[20px] md:bottom-[30px] bottom-[20px]'>
                                <Button
                                    size="readMore"
                                    className='flex items-center gap-2 lg:text-base md:text-base text-lg font-bold text-[#000000] bg-[#9DF2EE] group-hover:bg-[#9DF2EE]/90 group-hover:translate-x-2 2xl:px-8 2xl:py-3 px-6 py-3'
                                >
                                    <span>Xem thêm</span>
                                    <IoArrowForwardOutline className='text-xl -rotate-45' />
                                </Button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionArticle