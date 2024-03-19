import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

type Props = {}

const SectionBenefitsVehicleOwner = (props: Props) => {
    const listDataBenefits = [
        {
            id: uuidv4(),
            title: "Thu nhập",
            content: "Gia tăng thu nhập từ 5-10 triệu/tháng",
            icon: "/icon/about/icon_empty_wallet.png"
        },
        {
            id: uuidv4(),
            title: "Nhanh chóng",
            content: "Thủ tục đăng ký cho thuê ONLINE nhanh chóng trong 10 phút",
            icon: "/icon/about/icon_timer.png"
        },
        {
            id: uuidv4(),
            title: "Chủ động",
            content: "Toàn quyền quyết định giá & thời gian cho thuê.",
            icon: "/icon/about/icon_flag.png"
        },
        {
            id: uuidv4(),
            title: "Bảo hiểm",
            content: "Hỗ trợ bảo hiểm mất cắp xe nguyên chiếc từ MIC & VNI",
            icon: "/icon/about/icon_security_user.png"
        },
        {
            id: uuidv4(),
            title: "GPS",
            content: "Hỗ trợ cài đặt GPS với giá gốc để quản lí xe an toàn.",
            icon: "/icon/about/icon_gps.png"
        },
        {
            id: uuidv4(),
            title: "Chăm sóc đối tác",
            content: "Đội ngũ KANOW tư vấn cho thuê chặt chẽ và an toàn",
            icon: "/icon/about/icon_star.png"
        },
    ]

    const listIncome = [
        {
            id: uuidv4(),
            title: "TP.HCM (khu vực trung tâm)",
            incomeInMonth: "Từ 5 - 10 triệu",
            dateInMonth: "Từ 6 - 12 ngày"
        },
        {
            id: uuidv4(),
            title: "TP.HCM (khu vực ngoại thành)",
            incomeInMonth: "Từ 3 - 6 triệu",
            dateInMonth: "Từ 4 - 8 ngày"
        },
        {
            id: uuidv4(),
            title: "Hà Nội (khu vực trung tâm)",
            incomeInMonth: "Từ 5 - 8 triệu",
            dateInMonth: "Từ 6 - 10 ngày"
        },
        {
            id: uuidv4(),
            title: "Hà Nội (khu vực ngoại thành)",
            incomeInMonth: "Từ 3 - 6 triệu",
            dateInMonth: "Từ 4 - 8 ngày"
        },
        {
            id: uuidv4(),
            title: "Đà Nẵng",
            incomeInMonth: "Từ 3 - 6 triệu",
            dateInMonth: "Từ 4 - 8 ngày"
        },
        {
            id: uuidv4(),
            title: "Bình Dương",
            incomeInMonth: "Từ 3 - 6 triệu",
            dateInMonth: "Từ 4 - 8 ngày"
        },
        {
            id: uuidv4(),
            title: "Đà Lạt",
            incomeInMonth: "Từ 3 - 6 triệu",
            dateInMonth: "Từ 4 - 8 ngày"
        },
        {
            id: uuidv4(),
            title: "Phú Quốc",
            incomeInMonth: "Từ 5 - 10 triệu",
            dateInMonth: "Từ 6 - 12 ngày"
        },
        {
            id: uuidv4(),
            title: "Thành phố khác",
            incomeInMonth: "Từ 5 - 10 triệu",
            dateInMonth: "Từ 6 - 12 ngày"
        },
    ]

    return (
        <>
            <div className='custom-container gap-4 space-y-8 py-20'>
                <div className='flex flex-col gap-2 items-center justify-center'>
                    <div className='3xl:text-4xl 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-3xl text-[30px] leading-tight capitalize font-bold md:max-w-[85%] max-w-full text-[#101010] md:text-center text-start'>
                        Tại sao bạn nên cho thuê xe trên KANOW
                    </div>
                    <div className='3xl:text-base xl:text-sm md:text-sm text-base text-[#8C93A3] font-medium md:text-center text-start'>
                        Tự do kiếm thêm thu nhập, lái xe với sự tự tin
                    </div>
                </div>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 3xl:gap-8 xl:gap-6 gap-4'>
                    {
                        listDataBenefits && listDataBenefits.map((item) => (
                            <div key={item.id} className='col-span-1 bg-[#F0F5F5] hover:bg-slate-100 transition rounded-xl 3xl:px-8 3xl:py-6 p-6 flex flex-row gap-4 items-center caret-transparent cursor-default'>
                                <div className={`bg-[#16171B] group-hover:scale-105 duration-300 transition-colors 3xl:text-lg text-base text-white 3xl:size-14 lg:size-12 size-10 3xl:min-w-[56px] lg:min-w-[48px] min-w-[40px] flex items-center justify-center rounded-full`}>
                                    <Image
                                        width={80}
                                        height={80}
                                        src={item.icon ? item.icon : "/default/default.png"}
                                        className='3xl:size-7 lg:size-6 size-5 object-contain'
                                        alt="icon"
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='3xl:text-lg text-base text-[#1EAAB1] font-semibold'>
                                        {item.title ? item.title : ''}
                                    </div>
                                    <div className='3xl:text-base text-sm text-[#757B8A] font-medium'>
                                        {item.content ? item.content : ''}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="md:bg-[url('/background/benefit_vehicle_owner_background.png')] bg-[url('/background/benefit_vehicle_owner_background_mobile.png')] bg-cover drop-shadow-2xl 3xl:pt-40 xl:pt-32 xl:pb-24 md:pt-24 pt-24 pb-16">
                <div className='custom-container flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <div className='3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010] lg:max-w-[80%] max-w-full md:text-start text-center'>
                            Thu nhập ước tính của chủ xe
                        </div>
                        <div className='3xl:text-base xl:text-sm lg:text-sm md:text-sm text-base text-[#6F7689] font-medium 3xl:max-w-[50%] lg:max-w-[50%] max-w-full'>
                            KANOW dựa trên dữ liệu thu nhập bình quân 6 tháng gần nhất của các chủ xe đang kinh doanh hiệu quả trên hệ thống và thống kê theo từng khu vực.
                        </div>
                    </div>
                    <div className='grid grid-cols-3 overflow-auto w-full'>
                        <div className='col-span-1 grid grid-rows-9 w-full'>
                            <div className='row-span-1 border border-b-0 border-r-0 border-[#B4B8C5] py-2 md:px-4 px-2 rounded-tl-xl' />
                            {
                                listIncome && listIncome.map((item, index) => (
                                    <div key={item.id} className={`${listIncome.length - 1 === index ? "rounded-bl-xl border-r-0 lg:py-3 py-4 md:px-4 px-2" : " border-b-0 border-r-0 py-2 md:px-4 px-2"} 3xl:text-base md:text-sm text-xs flex items-center row-span-1 border border-[#B4B8C5] py-2 md:px-4 px-2`}>
                                        {item.title}
                                    </div>
                                ))
                            }
                        </div>
                        <div className='col-span-1 grid grid-rows-9'>
                            <div className='row-span-1 border border-b-0 border-r-0 border-[#B4B8C5] bg-[#E2F0FE] py-2 md:px-4 px-2 flex items-center'>
                                <Badge className='md:text-sm text-xs bg-[#5599EC] hover:bg-[#5599EC]/80 text-white py-1 md:px-4 px-2 font-medium cursor-default'>
                                    Thu nhập theo tháng
                                </Badge>
                            </div>
                            {
                                listIncome && listIncome.map((item, index) => (
                                    <div key={item.id} className={`${listIncome.length - 1 === index ? "border-r-0 lg:py-3 py-4 md:px-4 px-2" : " border-b-0 border-r-0 py-2 md:px-4 px-2"} 3xl:text-base md:text-sm text-xs flex items-center row-span-1 border border-[#B4B8C5] py-2 md:px-4 px-2`}>
                                        {item.incomeInMonth}
                                    </div>
                                ))
                            }
                        </div>
                        <div className='col-span-1 grid grid-rows-9'>
                            <div className='row-span-1 border border-b-0 border-[#B4B8C5] bg-[#F1FCFC] py-2 md:md:px-4 px-2 flex items-center rounded-tr-xl'>
                                <Badge className='md:text-sm text-xs bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 text-white py-1 md:px-4 px-2 font-medium cursor-default'>
                                    Số ngày thuê/tháng
                                </Badge>
                            </div>
                            {
                                listIncome && listIncome.map((item, index) => (
                                    <div key={item.id} className={`${listIncome.length - 1 === index ? "rounded-br-xl lg:py-3 py-4 md:md:px-4 px-2" : " border-b-0 py-2 md:px-4 px-2"} 3xl:text-base md:text-sm text-xs flex items-center row-span-1 border border-[#B4B8C5]`}>
                                        {item.dateInMonth}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionBenefitsVehicleOwner