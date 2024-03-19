import { FormatNumberComma } from '@/components/format/FormatNumber'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { v4 as uuidv4 } from "uuid"

type Props = {}

interface IDataStatistics {
    id: string,
    title: string,
    number: string | number,
    type: string
}

const SectionSecondAbout = (props: Props) => {

    const dataStatistics: IDataStatistics[] = [
        {
            id: uuidv4(),
            title: "Chuyến đi",
            number: 10000,
            type: "plus",
        },
        {
            id: uuidv4(),
            title: "Đối tác chủ xe",
            number: 2500,
            type: "normal",
        },
        {
            id: uuidv4(),
            title: "Khách hàng",
            number: 900,
            type: "normal",
        },
        {
            id: uuidv4(),
            title: "Lượt book",
            number: 900,
            type: "normal",
        },
        {
            id: uuidv4(),
            title: "Thành phố tại Việt Nam",
            number: 20,
            type: "normal",
        },
        {
            id: uuidv4(),
            title: "Đánh giá trung bình của khách hàng",
            number: "4,5/5",
            type: "rate",
        },
    ]

    return (
        <>
            <div className="3xl:pt-32 xl:pt-24 pt-16 3xl:pb-44 xl:pb-32 lg:pb-28 md:pb-36 pb-28 md:bg-[url('/background/about_background_1.png')] bg-[url('/background/about_background_mobile_1.png')] bg-cover bg-bottom drop-shadow-lg">
                <div className="custom-container grid grid-cols-2 3xl:gap-20 gap-14">
                    <div className="lg:col-span-1 col-span-2 h-full">
                        <Image
                            src="/other/about/test_image.png"
                            alt="image"
                            width={500}
                            height={500}
                            className='w-full h-auto object-contain rounded-xl'
                        />
                    </div>
                    <div className='lg:col-span-1 col-span-2 h-full flex flex-col xl:gap-4 lg:gap-2 gap-4 xl:pt-6'>
                        <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010]'>
                            Drive Explore Inspire
                        </div>

                        <div className='flex flex-col xl:gap-2 gap-1 3xl:text-base xl:text-sm lg:text-[13px] md:text-sm text-base text-[#8C93A3] font-medium'>
                            <div className='space-x-1 font-medium'>
                                <span className='text-[#2FB9BD]'>Cầm lái và</span>
                                <span className='text-[#FF9900]'>Khám phá thế giới</span>
                                <span className='text-[#2FB9BD]'>đầy</span>
                                <span className='text-[#FF9900]'>Cảm hứng.</span>
                            </div>
                            <div>
                                KANOW đặt mục tiêu trở thành cộng động người dùng ô tô Văn minh & Uy tín #1 tại Việt Nam, nhằm mang lại những giá trị thiết thực cho tất cả những thành viên hướng đến một cuộc sống tốt đẹp hơn.
                            </div>
                            <div>
                                Chúng tôi tin rằng mỗi hành trình đều quan trọng, vì vậy đội ngũ và các đối tác của NANOW với nhiều kinh nghiệm về lĩnh vực cho thuê xe, công nghệ, bảo hiểm & du lịch sẽ mang đến cho hành trình của bạn thêm nhiều trải nghiệm mới lạ, thú vị cùng sự an toàn ở mức cao nhất.
                            </div>
                        </div>

                        <div className='w-full'>
                            <Button className='md:w-fit w-full 3xl:text-lg text-base px-12 py-3 3xl:gap-2 gap-1 rounded-2xl cursor-pointer hover:scale-105 hover:bg-[#2FB9BD]/80 transition-all overflow-hidden bg-[#2FB9BD] text-white'>
                                Chọn thuê xe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="lg:-mt-[120px] md:-mt-[130px] -mt-[80px] lg:bg-top-right md:bg-center bg-cover bg-center"
                style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(3, 67, 69, 0.66) 0%, rgba(3, 67, 69, 0.66) 100%), url('/background/about_background_2.png') lightgray -336px -138.606px / 126.106% 171.919% no-repeat" }}
            >
                <div className='custom-container 3xl:pt-52 xl:pt-48 xl:pb-20 lg:pt-40 md:pt-48 pt-32 pb-16 grid lg:grid-cols-2 grid-cols-3 lg:gap-20 md:gap-14 gap-10'>
                    <div className='lg:col-span-1 md:col-span-1 col-span-3 flex flex-col justify-center md:text-start text-center 3xl:gap-6 gap-4'>
                        <div className="3xl:text-[3rem] 2xl:text-[2.5rem] xxl:text-[2.25rem] xl:text-[2.25rem] lg:text-[1.875rem] md:text-[1.875rem] text-[1.5rem] font-bold lg:max-w-[55%] max-w-full text-white capitalize leading-tight">
                            Những con số ấn tượng
                        </div>
                        <div className='3xl:text-sm xl:text-xs md:text-xs text-sm text-[#FCFDFD] font-light '>
                            *Thống kê tới tháng 3/2024
                        </div>
                    </div>
                    <div className='lg:col-span-1 md:col-span-2 col-span-3 grid grid-cols-2 3xl:gap-24 lg:gap-16 gap-10'>
                        {
                            dataStatistics && dataStatistics.map((item) => (
                                <div key={item.id} className='md:col-span-1 col-span-2 flex flex-col text-center'>
                                    <div className='3xl:text-5xl 2xl:text-4xl xl:text-4xl lg:text-4xl md:text-4xl text-5xl leading-tight capitalize font-bold text-white'>
                                        {item.type === "plus" && item.number ? `${FormatNumberComma(+item.number)} +` : ''}
                                        {item.type === "normal" && item.number ? FormatNumberComma(+item.number) : ''}
                                        {item.type === "rate" && item.number ? item.number : ''}
                                    </div>
                                    <div className="3xl:text-base text-sm text-[#FFFFFF]/80 font-light">
                                        {item.title ? item.title : ''}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionSecondAbout