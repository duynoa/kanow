import BlurImage from '@/components/image/BlurImage'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoArrowForwardOutline } from 'react-icons/io5'

type Props = {}

const SectionArticle = (props: Props) => {
    // const dataArticle = [
    //     {
    //         id:
    //     }
    // ]

    return (
        <div className="flex lg:bg-[url('/background/folder_background.png')] bg-[url('/background/folder_background_mobile.png')] bg-cover border-b drop-shadow-lg 3xl:-mt-[520px] 2xl:-mt-[420px] xl:-mt-[390px] lg:-mt-[300px] -mt-[420px]">
            <div className='custom-container flex flex-col items-center justify-center w-full 3xl:pt-64 3xl:pb-32 2xl:pt-48 2xl:pb-32 xxl:pt-44 xxl:pb-28 xl:pt-44 xl:pb-24 lg:pt-32 lg:pb-20 pt-72 pb-44'>
                <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-[26px] text-3xl capitalize font-bold text-[#101010]'>
                    Bài viết
                </div>
                <div className='xl:mt-10 mt-6 grid grid-cols-3 3xl:gap-8 xl:gap-6 gap-4 w-full'>
                    <div className='w-full lg:col-span-2 col-span-3'>
                        <Link
                            href="#"
                            className='relative group'
                        >
                            <div className='w-full 3xl:h-[532px] 2xl:h-[532px] xxl:h-[524px] xl:h-[464px] lg:h-[416px] md:h-[320px] h-[200px] group overflow-hidden rounded-2xl'>
                                {/* <Image
                                    width={1920}
                                    height={1080}
                                    loading='lazy'
                                    alt='image'
                                    src="/other/car/car1.png"
                                    className='w-full h-full object-cover rounded-2xl group-hover:scale-105 duration-500 transition ease-in-out'
                                /> */}
                                <BlurImage
                                    image={"/other/car/car1.png" ? "/other/car/car1.png" : '/default/default.png'}
                                    alt="image_card"
                                    width={1200}
                                    height={600}
                                    className="rounded-2xl"
                                    zoomIn={true}
                                />
                            </div>
                            <div className='flex flex-col 2xl:gap-4 gap-2 absolute md:left-[50px] left-[40px] md:top-[50px] top-[40px] 2xl:pr-4 pr-6'>
                                <div className='lg:text-sm md:text-base text-lg uppercase font-medium font-[inter] text-[#61F7F7] line-clamp-2'>
                                    Thông báo
                                </div>
                                <div className='3xl:text-2xl 2xl:text-xl xxl:text-xl xl:text-lg lg:text-lg md:text-sm text-base text-white font-semibold line-clamp-2 xxl:max-w-[75%] xl:max-w-[85%] max-w-full'>
                                    Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW
                                </div>
                            </div>
                            <div className='absolute md:left-[50px] left-[40px] md:bottom-[50px] bottom-[40px]'>
                                <Button
                                    size="readMore"
                                    className='2xl:px-8 2xl:py-3 xl:px-6 xl:py-3 px-4 py-2 flex items-center gap-2 font-bold text-[#000000] bg-[#9DF2EE] group-hover:bg-[#9DF2EE]/90 group-hover:translate-x-2'
                                >
                                    <span className='xl:text-base lg:text-sm md:text-base text-lg'>Xem thêm</span>
                                    <IoArrowForwardOutline className='xl:text-xl text-lg -rotate-45' />
                                </Button>
                            </div>
                        </Link>
                    </div>
                    <div className='w-full lg:col-span-1 col-span-3 flex flex-col 3xl:gap-8 xl:gap-6 gap-4 xxl:max-h-[500px] xl:max-h-[440px] lg:max-h-[400px] md:max-h-[640px] max-h-[200px]'>
                        <Link
                            href="#"
                            className='relative group'
                        >
                            <div className='w-full 3xl:h-[250px] 2xl:h-[250px] xxl:h-[250px] xl:h-[220px] lg:h-[200px] md:h-[320px] h-[200px] group overflow-hidden rounded-2xl'>
                                {/* <Image
                                    width={1920}
                                    height={1080}
                                    loading='lazy'
                                    alt='image'
                                    src="/other/car/car1.png"
                                    className='w-full h-full object-cover rounded-2xl group-hover:scale-105 duration-500 transition ease-in-out'
                                /> */}
                                <BlurImage
                                    image={"/other/car/car1.png" ? "/other/car/car1.png" : '/default/default.png'}
                                    alt="image_card"
                                    width={1200}
                                    height={600}
                                    className="rounded-2xl"
                                    zoomIn={true}
                                />
                            </div>
                            <div className='flex flex-col gap-2 absolute md:left-[30px] left-[20px] md:top-[30px] top-[20px] 2xl:pr-4 pr-6'>
                                <div className='lg:text-sm md:text-base text-lg uppercase font-medium font-[inter] text-[#61F7F7] line-clamp-2'>
                                    Thông báo
                                </div>
                                <div className='3xl:text-xl 2xl:text-xl xxl:text-xl xl:text-lg lg:text-lg md:text-sm text-base text-white font-semibold line-clamp-2 xxl:max-w-[75%] xl:max-w-[85%] max-w-full'>
                                    Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW
                                </div>
                            </div>
                            <div className='absolute md:left-[30px] left-[20px] md:bottom-[30px] bottom-[20px]'>
                                <Button
                                    size="readMore"
                                    className='2xl:px-8 2xl:py-3 xl:px-6 xl:py-3 px-4 py-2 flex items-center gap-2 font-bold text-[#000000] bg-[#9DF2EE] group-hover:bg-[#9DF2EE]/90 group-hover:translate-x-2'
                                >
                                    <span className='xl:text-base lg:text-sm md:text-base text-lg'>Xem thêm</span>
                                    <IoArrowForwardOutline className='xl:text-xl text-lg -rotate-45' />
                                </Button>
                            </div>
                        </Link>
                        <Link
                            href="#"
                            className='relative group'
                        >
                            <div className='w-full 3xl:max-h-[250px] 2xl:max-h-[250px] xxl:h-[250px] xl:h-[220px] lg:h-[200px] md:h-[320px] h-[200px] group overflow-hidden rounded-2xl'>
                                {/* <Image
                                    width={1920}
                                    height={1080}
                                    loading='lazy'
                                    alt='image'
                                    src="/other/car/car1.png"
                                    className='w-full h-full object-cover rounded-2xl group-hover:scale-105 duration-500 transition ease-in-out'
                                /> */}
                                <BlurImage
                                    image={"/other/car/car1.png" ? "/other/car/car1.png" : '/default/default.png'}
                                    alt="image_card"
                                    width={1200}
                                    height={600}
                                    className="rounded-2xl"
                                    zoomIn={true}
                                />
                            </div>
                            <div className='flex flex-col gap-2 absolute md:left-[30px] left-[20px] md:top-[30px] top-[20px] 2xl:pr-4 pr-6'>
                                <div className='lg:text-sm md:text-base text-lg uppercase font-medium font-[inter] text-[#61F7F7] line-clamp-2'>
                                    Thông báo
                                </div>
                                <div className='3xl:text-xl 2xl:text-xl xxl:text-xl xl:text-lg lg:text-lg md:text-sm text-base text-white font-semibold line-clamp-2 xxl:max-w-[75%] xl:max-w-[85%] max-w-full'>
                                    Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW
                                </div>
                            </div>
                            <div className='absolute md:left-[30px] left-[20px] md:bottom-[30px] bottom-[20px]'>
                                <Button
                                    size="readMore"
                                    className='2xl:px-8 2xl:py-3 xl:px-6 xl:py-3 px-4 py-2 flex items-center gap-2 font-bold text-[#000000] bg-[#9DF2EE] group-hover:bg-[#9DF2EE]/90 group-hover:translate-x-2'
                                >
                                    <span className='xl:text-base lg:text-sm md:text-base text-lg'>Xem thêm</span>
                                    <IoArrowForwardOutline className='xl:text-xl text-lg -rotate-45' />
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