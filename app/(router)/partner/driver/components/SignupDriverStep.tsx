import Image from 'next/image';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { HiArrowLongRight, HiArrowLongLeft } from "react-icons/hi2";
import Link from 'next/link';
import { Clock4 } from 'lucide-react';
import { FormatPhoneNumber } from '@/components/format/FormatNumber';


type Props = {}

const SignupDriverStep = (props: Props) => {
    const dataStep = [
        {
            id: '1',
            step: 'Bước 1',
            title: 'Chuẩn bị về thể trạng',
        },
        {
            id: '2',
            step: 'Bước 2',
            title: 'Chuẩn bị về hồ sơ',
        },
        {
            id: '3',
            step: 'Bước 3',
            title: 'Nộp hồ sơ',
        },
        {
            id: '4',
            step: 'Bước 4',
            title: 'Thực hiện các thủ tục tài xế',
        },
    ]

    const [activeStep, setActiveStep] = useState<string>(dataStep[0].id)

    const dataStep1 = [
        {
            id: uuidv4(),
            icon: '/icon/step/icon_weighing_scale.png',
            title: 'Cân nặng',
            description: '56 kg trở lên'
        },
        {
            id: uuidv4(),
            icon: '/icon/step/icon_head.png',
            title: 'Ngoại hình',
            description: 'Đầu tóc gọn gàng'
        },
        {
            id: uuidv4(),
            icon: '/icon/step/icon_height.png',
            title: 'Chiều cao',
            description: 'Từ 1.60 m'
        },
        {
            id: uuidv4(),
            icon: '/icon/step/icon_portrait.png',
            title: 'Hình xăm',
            description: 'Không lộ hình xăm ra ngoài'
        },
        {
            id: uuidv4(),
            icon: '/icon/step/icon_birthday_cake.png',
            title: 'Độ tuổi',
            description: '26 - 50 tuổi'
        },
    ]

    const dataStep2 = [
        {
            id: uuidv4(),
            descriptionFirst: "1. Giấy phép lái xe",
            descriptionSecond: "B2 trở lên còn hạn sử dụng",
            link: "#"
        },
        {
            id: uuidv4(),
            descriptionFirst: "2. Căn cước công dân khai báo",
            descriptionSecond: "VNID cấp 2",
            link: "#"
        },
        {
            id: uuidv4(),
            descriptionFirst: "3. Lí lịch tư pháp",
            descriptionSecond: "mẫu 1 hoặc 2",
            link: "#"
        },
        {
            id: uuidv4(),
            descriptionFirst: "4. Giấy xác nhận hạnh kiểm",
            descriptionSecond: "địa phương cư trú",
            link: "#"
        },
        {
            id: uuidv4(),
            descriptionFirst: "5. Giấy khám sức khoẻ theo",
            descriptionSecond: "mẫu TT14",
            link: "#"
        },
        {
            id: uuidv4(),
            descriptionFirst: "6. Giấy khám xác nhận",
            descriptionSecond: "HIV và chất gây nghiện",
            link: "#"
        },
    ]

    const dataStep4 = [
        {
            id: uuidv4(),
            description: "Mua đồng phục tài xế lái xe",
        },
        {
            id: uuidv4(),
            description: "Nộp ví tiền tài xế để tạo số dư trong tài khoản",
        },
    ]

    const handleChangeStep = (id: string) => {
        setActiveStep(id)
    }

    return (
        <div className='3xl:py-20 py-16 flex flex-col 3xl:gap-10 gap-6 custom-container'>
            <div className='text-center 3xl:text-[36px] 2xl:text-[30px] xl:text-[30px] lg:text-[30px] md:text-[30px] text-[26px] leading-tight capitalize font-bold text-[#101010]'>
                Đăng ký thành tài xế
            </div>
            <div className='border rounded-lg grid xxl:grid-cols-5 grid-cols-8'>
                <div className='xxl:col-span-1 md:col-span-2 col-span-8 bg-[#F1F4F4] lg:p-6 p-4 flex flex-col h-full rounded-tl-lg rounded-bl-lg'>
                    {
                        dataStep && dataStep.map((item, index) => (
                            <div key={item.id} className='flex flex-row 3xl:gap-4 gap-2 cursor-pointer group' onClick={() => handleChangeStep(item.id)}>
                                <div className='flex flex-col items-center'>
                                    <div className={`${activeStep === item.id ? 'bg-[#1EAAB1]' : 'bg-[#B4B8C5]'} group-hover:scale-105 duration-300 transition-colors 3xl:text-lg lg:text-base text-xs text-white 3xl:size-10 lg:size-8 size-6 flex items-center justify-center rounded-full`}>
                                        {index + 1}
                                    </div>
                                    {
                                        index === dataStep.length - 1 ?
                                            null
                                            :
                                            <div className={`${activeStep === item.id ? 'border-[#2FB9BD]' : 'border-[#B4B8C5]'} h-12 border-x border-y-0 border-dashed`} />
                                    }
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='3xl:text-xs text-[10px] uppercase text-[#1EAAB1] font-semibold'>
                                        {item.step ? item.step : ''}
                                    </div>
                                    <div className={`${activeStep === item.id ? 'text-[#16171B] font-semibold' : 'text-[#3E424E] font-medium'} 3xl:text-base text-sm `}>
                                        {item.title ? item.title : ''}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    activeStep === '1' &&
                    <div className='xxl:col-span-4 md:col-span-6 col-span-8 bg-white flex flex-col 3xl:min-h-[620px] md:min-h-[560px] min-h-[660px] rounded-tr-lg rounded-br-lg'>
                        <div className='3xl:px-8 3xl:py-6 lg:p-6 p-4 border-b flex flex-col gap-1'>
                            <div className='3xl:text-base text-sm uppercase text-[#2FB9BD] font-semibold'>
                                Bước 1
                            </div>
                            <div className={`3xl:text-3xl text-2xl text-[#383A43] font-semibold`}>
                                Quy định về thể trạng
                            </div>
                        </div>
                        <div className='flex flex-col justify-between h-full'>
                            <div className='3xl:px-20 lg:px-16 px-10 py-10 grid grid-cols-2 3xl:gap-14 lg:gap-12 gap-10'>
                                {
                                    dataStep1 && dataStep1.map((item) => (
                                        <div key={item.id} className='md:col-span-1 col-span-2 xl:max-w-[80%] max-w-[95%] h-full'>
                                            <div className='flex items-center gap-4'>
                                                <div className='3xl:w-[70px] 3xl:min-w-[70px] 3xl:h-[70px] lg:w-[60px] lg:min-w-[60px] lg:h-[60px] w-[50px] min-w-[50px] h-[50px]'>
                                                    <Image
                                                        alt="icon"
                                                        src={item.icon ? item.icon : '/default/default.png'}
                                                        width={100}
                                                        height={100}
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>
                                                <div className='flex flex-col gap-1'>
                                                    <div className='3xl:text-sm xl:text-xs lg:text-[10px] text-[10px] text-[#2FB9BD] uppercase font-semibold'>
                                                        {item.title ? item.title : ''}
                                                    </div>
                                                    <div className='3xl:text-lg xl:text-base lg:text-sm text-sm text-[#16171B] font-bold'>
                                                        {item.description ? item.description : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='3xl:px-8 3xl:py-6 lg:p-6 p-4 flex justify-between items-center disable-selection'>
                                <div className='flex items-center gap-2 cursor-not-allowed group'>
                                    <HiArrowLongLeft className='xl:size-10 size-8 text-[#B4B8C5]' />
                                </div>
                                <div onClick={() => setActiveStep('2')} className='flex items-center gap-2 cursor-pointer group'>
                                    <div className='xl:text-base text-sm text-[#FF9900] font-semibold group-hover:translate-x-2 duration-300 transition-all'>Xem bước 2</div>
                                    <HiArrowLongRight className='xl:size-10 size-8 text-[#FF9900] group-hover:translate-x-2 duration-300 transition-all' />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    activeStep === '2' &&
                    <div className='xxl:col-span-4 md:col-span-6 col-span-8 bg-white flex flex-col 3xl:min-h-[620px] md:min-h-[560px] min-h-[660px] rounded-tr-lg rounded-br-lg'>
                        <div className='3xl:px-8 3xl:py-6 lg:p-6 p-4 border-b flex flex-col gap-1'>
                            <div className='3xl:text-base text-sm uppercase text-[#1EAAB1] font-semibold'>
                                Bước 2
                            </div>
                            <div className={`3xl:text-3xl text-2xl text-[#383A43] font-semibold`}>
                                Chuẩn bị về hồ sơ
                            </div>
                        </div>
                        <div className='flex flex-col justify-between h-full'>
                            <div className='3xl:px-8 md:px-6 px-4 3xl:pt-12 md:pt-10 pt-8 flex flex-col md:gap-12 gap-8'>
                                <div className='flex flex-col gap-2'>
                                    {
                                        dataStep2 && dataStep2.map((item) => (
                                            <div key={item.id} className='gap-1 font-bold space-x-1'>
                                                <span className='3xl:text-lg lg:text-base md:text-sm text-base text-[#16171B]'>
                                                    {item.descriptionFirst}
                                                </span>

                                                <span className='3xl:text-lg lg:text-base md:text-sm text-base text-[#FF9900]'>
                                                    {item.descriptionSecond}
                                                </span>

                                                <Link
                                                    href={item.link}
                                                    className='3xl:text-lg lg:text-base md:text-sm text-base text-[#2FB9BD] hover:text-[#2FB9BD]/80 duration-300 transition ease-in-out underline underline-offset-2 underline-[#2FB9BD]'
                                                >
                                                    (Xem mẫu)
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className='p-4 border border-[#FF9900] bg-[#FF9900]/[0.12] rounded-xl flex flex-col gap-1'>
                                    <div className='3xl:text-sm lg:text-xs text-[10px] text-[#FF9900] font-semibold uppercase'>
                                        Yêu cầu bắt buộc
                                    </div>
                                    <div className='3xl:text-lg lg:text-base md:text-sm text-base text-[#16171B] font-bold'>
                                        Bạn cần có kinh nghiệm lái xe từ 5 năm trở lên
                                    </div>
                                </div>
                            </div>
                            <div className='3xl:px-8 3xl:py-6 lg:p-6 p-4 flex justify-between items-center disable-selection'>
                                <div onClick={() => setActiveStep('1')} className='flex items-center gap-2 cursor-pointer group'>
                                    <HiArrowLongLeft className='xl:size-10 size-8 text-[#FF9900] group-hover:-translate-x-2 duration-300 transition-all' />
                                    <div className='xl:text-base text-sm text-[#FF9900] font-semibold group-hover:-translate-x-2 duration-300 transition-all'>Xem bước 1</div>
                                </div>
                                <div onClick={() => setActiveStep('3')} className='flex items-center gap-2 cursor-pointer group'>
                                    <div className='xl:text-base text-sm text-[#FF9900] font-semibold group-hover:translate-x-2 duration-300 transition-all'>Xem bước 3</div>
                                    <HiArrowLongRight className='xl:size-10 size-8 text-[#FF9900] group-hover:translate-x-2 duration-300 transition-all' />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    activeStep === '3' &&
                    <div className='xxl:col-span-4 md:col-span-6 col-span-8 bg-white flex flex-col 3xl:min-h-[620px] md:min-h-[560px] min-h-[660px] rounded-tr-lg rounded-br-lg'>
                        <div className='3xl:px-8 3xl:py-6 lg:p-6 p-4 border-b flex flex-col gap-1'>
                            <div className='3xl:text-base text-sm uppercase text-[#1EAAB1] font-semibold'>
                                Bước 3
                            </div>
                            <div className={`3xl:text-3xl text-2xl text-[#383A43] font-semibold`}>
                                Nộp hồ sơ
                            </div>
                        </div>
                        <div className='flex flex-col justify-between h-full'>
                            <div className='3xl:p-8 md:px-6 px-4 py-4 flex flex-col gap-12'>
                                <div className='flex flex-col gap-3'>
                                    <div className='px-2 py-1 bg-[#C2F9F9] lg:text-lg text-base text-[#16171B] font-bold'>
                                        Nộp hồ sơ trực tiếp tại:
                                    </div>
                                    <div className='flex flex-row items-center gap-3'>
                                        <div className='size-6 min-w-6'>
                                            <Image
                                                src="/icon/step/icon_buildings.svg"
                                                alt="icon"
                                                width={80}
                                                height={80}
                                                className='size-6 object-contain'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='3xl:text-base lg:text-sm md:text-xs text-sm text-[#3E424E] font-semibold'>
                                                Văn phòng CÔNG TY TNHH KANOW
                                            </div>
                                            <div className='3xl:text-base lg:text-sm md:text-xs text-sm text-[#3E424E] font-semibold'>
                                                84 Tôn Thất Tùng, Phường Bến Thành, Quận 1, TP.HCM
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center gap-3'>
                                        <div className='size-6 min-w-6'>
                                            <Clock4 className='size-6 min-w-6 text-[#3E424E]' />
                                        </div>
                                        <div className='3xl:text-base lg:text-sm md:text-xs text-sm text-[#3E424E] font-semibold'>
                                            Nộp hồ sơ vào 8h00 - 8h45 sáng Chủ nhật hàng tuần và tham gia đào tạo kỹ năng mềm
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-3'>
                                    <div className='px-2 py-1 bg-[#C2F9F9] lg:text-lg text-base text-[#16171B] font-bold'>
                                        Đăng ký hồ sơ online
                                    </div>
                                    <div className='flex flex-row items-center gap-3'>
                                        <div className='size-6 min-w-6'>
                                            <Image
                                                src="/icon/step/icon_zalo.svg"
                                                alt="icon"
                                                width={80}
                                                height={80}
                                                className='size-6 min-w-6 object-contain'
                                            />
                                        </div>
                                        <Link
                                            href="https://zalo.me/2281264205827497572"
                                            target='_blank'
                                            className='3xl:text-base lg:text-sm md:text-xs text-sm text-[#3E424E] font-semibold hover:underline hover:underline-offset-2'
                                        >
                                            https://zalo.me/2281264205827497572
                                        </Link>
                                    </div>
                                    <div className='flex flex-row items-center gap-3'>
                                        <div className='size-6 min-w-6'>
                                            <Image
                                                src="/icon/step/icon_call.svg"
                                                alt="icon"
                                                width={80}
                                                height={80}
                                                className='size-6 min-w-6 object-contain'
                                            />
                                        </div>
                                        <div className='3xl:text-base lg:text-sm md:text-xs text-sm text-[#3E424E] font-semibold'>
                                            {/* 19009235 - 0908.084.499 */}
                                            {FormatPhoneNumber('0843999999')}
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center gap-3'>
                                        <div className='size-6 min-w-6'>
                                            <Image
                                                src="/icon/step/icon_monitor.svg"
                                                alt="icon"
                                                width={80}
                                                height={80}
                                                className='size-6 min-w-6 object-contain'
                                            />
                                        </div>
                                        <Link
                                            href="http://kanow.vn/"
                                            target='_blank'
                                            className='3xl:text-base lg:text-sm md:text-xs text-sm text-[#3E424E] font-semibold hover:underline hover:underline-offset-2'
                                        >
                                            http://kanow.vn/
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='3xl:px-8 3xl:py-6 lg:p-6 p-4 flex justify-between items-center disable-selection'>
                                <div onClick={() => setActiveStep('2')} className='flex items-center gap-2 cursor-pointer group'>
                                    <HiArrowLongLeft className='xl:size-10 size-8 text-[#FF9900] group-hover:-translate-x-2 duration-300 transition-all' />
                                    <div className='xl:text-base text-sm text-[#FF9900] font-semibold group-hover:-translate-x-2 duration-300 transition-all'>Xem bước 2</div>
                                </div>
                                <div onClick={() => setActiveStep('4')} className='flex items-center gap-2 cursor-pointer group'>
                                    <div className='xl:text-base text-sm text-[#FF9900] font-semibold group-hover:translate-x-2 duration-300 transition-all'>Xem bước 4</div>
                                    <HiArrowLongRight className='xl:size-10 size-8 text-[#FF9900] group-hover:translate-x-2 duration-300 transition-all' />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    activeStep === '4' &&
                    <div className='xxl:col-span-4 md:col-span-6 col-span-8 bg-white flex flex-col 3xl:min-h-[620px] md:min-h-[560px] min-h-[660px] rounded-tr-lg rounded-br-lg'>
                        <div className='3xl:px-8 3xl:py-6 lg:p-6 p-4 border-b flex flex-col gap-1'>
                            <div className='3xl:text-base text-sm uppercase text-[#1EAAB1] font-semibold'>
                                Bước 4
                            </div>
                            <div className={`3xl:text-3xl text-2xl text-[#383A43] font-semibold`}>
                                Thực hiện các thủ tục tài xế
                            </div>
                        </div>
                        <div className='flex flex-col justify-between h-full'>
                            <div className='3xl:px-14 md:px-12 px-10 3xl:py-8 py-6 flex flex-col gap-12'>
                                <ol className='list-decimal font-bold'>
                                    {
                                        dataStep4 && dataStep4.map((item) => (
                                            <li key={item.id}>
                                                <div className='3xl:text-lg lg:text-base md:text-sm text-base text-[#16171B] font-bold'>
                                                    {item.description ? item.description : ""}
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ol>
                            </div>
                            <div className='3xl:px-8 3xl:py-6 lg:p-6 p-4 flex justify-between items-center disable-selection'>
                                <div onClick={() => setActiveStep('3')} className='flex items-center gap-2 cursor-pointer group'>
                                    <HiArrowLongLeft className='xl:size-10 size-8 text-[#FF9900] group-hover:-translate-x-2 duration-300 transition-all' />
                                    <div className='xl:text-base text-sm text-[#FF9900] font-semibold group-hover:-translate-x-2 duration-300 transition-all'>Xem bước 3</div>
                                </div>
                                {/* <div onClick={() => setActiveStep('4')} className='flex items-center gap-2 cursor-pointer group'>
                                    <div className='text-base text-[#FF9900] font-semibold group-hover:translate-x-2 duration-300 transition-all'>Xem bước 4</div>
                                    <HiArrowLongRight className='xl:size-10 size-8 text-[#FF9900] group-hover:translate-x-2 duration-300 transition-all' />
                                </div> */}
                                <div className='flex items-center gap-2 cursor-not-allowed group'>
                                    <HiArrowLongRight className='xl:size-10 size-8 text-[#B4B8C5]' />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default SignupDriverStep