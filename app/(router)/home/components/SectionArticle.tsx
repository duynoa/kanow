import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'
import BlurImage from '@/components/image/BlurImage'
import { Button } from '@/components/ui/button'
import { useResize } from '@/hooks/useResize'
import { useGetNewsEventList } from '@/managers/api-management/news-event/useGetNewsEventList'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { A11y, Pagination } from 'swiper/modules'
import { SwiperSlide, Swiper } from 'swiper/react'
import { v4 as uuidv4 } from 'uuid';

type Props = {}

const SectionArticle = (props: Props) => {
    const { data: dataNewsEventList } = useGetNewsEventList({ page: 1, limit: 3 })
    const { isVisibleMobile, isVisibleTablet } = useResize()

    const dataArticle = [
        {
            id: uuidv4(),
            image: '/other/car/car1.png',
            description: 'Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW',
            type: "Thông báo"
        },
        {
            id: uuidv4(),
            image: '/other/car/car1.png',
            description: 'Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW',
            type: "Thông báo"
        },
        {
            id: uuidv4(),
            image: '/other/car/car1.png',
            description: 'Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW',
            type: "Thông báo"
        },
    ]

    const customPaginationBanner = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
            return `<span class=${className}></span>`
        },
    }

    return (
        <div className="flex lg:bg-[url('/background/folder_background.png')] bg-[url('/background/folder_background_mobile.png')] bg-cover border-b drop-shadow-lg 3xl:-mt-[520px] 2xl:-mt-[420px] xl:-mt-[390px] lg:-mt-[300px] md:-mt-[420px] -mt-[280px]">
            <div className='custom-container flex flex-col md:items-center items-start md:justify-center w-full 3xl:pt-64 3xl:pb-32 2xl:pt-48 2xl:pb-32 xxl:pt-44 xxl:pb-28 xl:pt-44 xl:pb-24 lg:pt-32 lg:pb-20 md:pt-72 md:pb-20 pt-44 pb-10'>
                <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010]'>
                    Bài viết
                </div>
                <Link
                    href={`/news-events/24`}
                    className='relative group w-fit hidden'
                    aria-hidden="true"
                >
                    hidden
                </Link>

                {
                    isVisibleTablet ?
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={"auto"}
                            modules={[Pagination, A11y]}
                            allowTouchMove={true}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: "15",
                                    allowTouchMove: true
                                },
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: "15",
                                    allowTouchMove: true
                                },
                                768: {
                                    slidesPerView: 1,
                                    spaceBetween: "15",
                                    allowTouchMove: true
                                },
                            }}
                            pagination={customPaginationBanner}
                            className='custom-swiper-article w-full mt-4 md:h-[420px] h-[300px]'
                        >
                            {
                                dataNewsEventList?.data && dataNewsEventList?.data?.map((item: any, index: number) => (
                                    <SwiperSlide key={item.id}>
                                        <Link
                                            href={`/news-events/${item.id}?${ConvertToSlug(item?.title ?? "")}`}
                                            className='relative group w-full'
                                            aria-hidden="true"
                                        >
                                            <div className='w-full 3xl:h-[532px] 2xl:h-[532px] xxl:h-[524px] xl:h-[464px] lg:h-[416px] md:h-[400px] h-[260px] group overflow-hidden rounded-2xl'>
                                                <Image
                                                    width={1920}
                                                    height={1080}
                                                    loading='lazy'
                                                    alt='image'
                                                    src={item.image ? item.image : '/default/default.png'}
                                                    className='w-full h-full object-cover rounded-2xl group-hover:scale-105 duration-500 transition ease-in-out'
                                                />
                                            </div>
                                            <div className='flex flex-col 2xl:gap-4 gap-2 absolute md:left-[50px] left-[40px] md:top-[50px] top-[40px] 2xl:pr-4 pr-6'>
                                                <div className='md:text-xl text-xl uppercase font-medium font-[inter] text-white line-clamp-2'>
                                                    {/* Thông báo */}
                                                    {item.title ?? ""}
                                                </div>
                                                <div className='md:text-sm text-base text-white font-semibold line-clamp-2 xxl:max-w-[75%] xl:max-w-[85%] max-w-full'>
                                                    {/* Một số lưu ý cho chủ xe khi lần đầu cho thuê xe tại KANOW */}
                                                    {item.descption ?? ""}
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
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        :
                        <div className='xl:mt-10 mt-6 grid grid-cols-3 3xl:gap-8 xl:gap-6 gap-4 w-full'>
                            {dataNewsEventList?.data?.length > 0 && (
                                <div className='w-full lg:col-span-2 col-span-3'>
                                    <Link href={`/news-events/${dataNewsEventList?.data[0].id}`} className='relative group'>
                                        <div className='w-full 3xl:h-[532px] 2xl:h-[532px] xxl:h-[524px] xl:h-[464px] lg:h-[416px] md:h-[320px] h-[200px] group overflow-hidden rounded-2xl'>
                                            <div className='absolute rounded-2xl top-0 w-full h-full z-[5] bg-[#000000]/30' />
                                            <BlurImage
                                                image={dataNewsEventList?.data[0].image || '/default/default.png'}
                                                alt="image_card"
                                                width={1200}
                                                height={600}
                                                className="rounded-2xl"
                                                zoomIn={true}
                                            />
                                        </div>
                                        <div className='flex flex-col 2xl:gap-4 gap-2 absolute md:left-[50px] left-[40px] md:top-[50px] top-[40px] 2xl:pr-4 pr-6 z-10'>
                                            {/* <div className='lg:text-sm md:text-base text-lg uppercase font-medium font-[inter] text-[#61F7F7] line-clamp-2'>
                                                {dataNewsEventList?.data[0].type || ""}
                                            </div>
                                            <div className='3xl:text-2xl 2xl:text-xl xxl:text-xl xl:text-lg lg:text-lg md:text-sm text-base text-white font-semibold line-clamp-2 xxl:max-w-[75%] xl:max-w-[85%] max-w-full'>
                                                {dataNewsEventList?.data[0].description || ""}
                                            </div> */}
                                            <div className='3xl:text-xl 2xl:text-[17px] xxl:text-[17px] xl:text-base lg:text-base md:text-xl text-xl  text-white font-semibold group-hover:text-white/70 duration-500 transition ease-in-out xxl:line-clamp-2 line-clamp-1'>
                                                {dataNewsEventList?.data[0]?.title ?? ""}
                                            </div>
                                            <span
                                                dangerouslySetInnerHTML={{ __html: `${dataNewsEventList?.data[0]?.descption ?? ''}` }}
                                                className="3xl:!text-2xl 2xl:text-xl xxl:text-xl xl:text-lg lg:text-lg md:text-sm text-base text-white font-semibold line-clamp-2 max-w-full"
                                            />
                                        </div>
                                        <div className='absolute md:left-[50px] left-[40px] md:bottom-[50px] bottom-[40px] z-10'>
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
                            )}

                            <div className='w-full lg:col-span-1 col-span-3 flex flex-col 3xl:gap-8 xl:gap-6 gap-4 xxl:max-h-[500px] xl:max-h-[440px] lg:max-h-[400px] md:max-h-[640px] max-h-[200px]'>
                                {dataNewsEventList?.data?.length > 1 && dataNewsEventList?.data?.slice(1, 3)?.map((article: any, index: number) => (
                                    <Link key={index} href={`/news-events/${article.id}`} className='relative group'>
                                        <div className='w-full 3xl:h-[250px] 2xl:h-[250px] xxl:h-[250px] xl:h-[220px] lg:h-[200px] md:h-[320px] h-[200px] group overflow-hidden rounded-2xl relative'>
                                            <div className='absolute rounded-2xl top-0 w-full h-full z-[5] bg-[#000000]/30' />
                                            <BlurImage
                                                image={article.image || '/default/default.png'}
                                                alt="image_card"
                                                width={1200}
                                                height={600}
                                                className="rounded-2xl"
                                                zoomIn={true}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-2 absolute md:left-[30px] left-[20px] md:top-[30px] top-[20px] 2xl:pr-4 pr-6 z-10'>
                                            <div className='3xl:text-xl 2xl:text-[17px] xxl:text-[17px] xl:text-base lg:text-base md:text-xl text-xl  text-white font-semibold group-hover:text-white/70 duration-500 transition ease-in-out xxl:line-clamp-2 line-clamp-1'>
                                                {article?.title ? article?.title : ""}
                                            </div>
                                            <span
                                                dangerouslySetInnerHTML={{ __html: `${article?.descption ?? ''}` }}
                                                className="3xl:text-xl 2xl:text-xl xxl:text-xl xl:text-lg lg:text-lg md:text-sm text-base text-white font-semibold line-clamp-2 max-w-full"
                                            />
                                        </div>
                                        <div className='absolute md:left-[30px] left-[20px] md:bottom-[30px] bottom-[20px] z-10'>
                                            <Button
                                                size="readMore"
                                                className='2xl:px-8 2xl:py-3 xl:px-6 xl:py-3 px-4 py-2 flex items-center gap-2 font-bold text-[#000000] bg-[#9DF2EE] group-hover:bg-[#9DF2EE]/90 group-hover:translate-x-2'
                                            >
                                                <span className='xl:text-base lg:text-sm md:text-base text-lg'>Xem thêm</span>
                                                <IoArrowForwardOutline className='xl:text-xl text-lg -rotate-45' />
                                            </Button>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default SectionArticle