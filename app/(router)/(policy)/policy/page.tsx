'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { SelectContentNocheck, SelectGroupNocheck, SelectItemNocheck, SelectNocheck, SelectTriggerNocheck, SelectValueNocheck } from '@/components/ui/selectNocheck'
import { Skeleton } from '@/components/ui/skeleton'
import { useResize } from '@/hooks/useResize'
import { useGetUsePolicy } from '@/managers/api-management/policy/useGetUsePolicy'
import usePolicyApi from '@/services/policy/policy.services'
import { ScrollToSection } from '@/utils/scroll/ScrollToSection'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import PolicyMobile from "./components/PolicyMobile"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Nodata from "@/components/image/Nodata"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
const Page = () => {
    const router = useRouter()

    const pathname = usePathname()

    const { apiPolicyList } = usePolicyApi()

    const { isVisibleTablet } = useResize()

    const id = useSearchParams().get('id') ?? ""

    const param = useSearchParams().get('type')

    const [dataPolicy, setDataPolicy] = useState<any[]>()

    const [isIdPolicy, setIdPolicy] = useState<string>(id)

    const [isMounted, setIsMounted] = useState<boolean>(false)

    const { data: datatab, isLoading } = useGetUsePolicy()

    const [tab, setTab] = useState<any>({
        idTab: null,
        idContent: null
    })

    const findOb = dataPolicy?.find(e => e?.id == isIdPolicy)

    const findObAccordion = datatab?.find((e: any) => e?.id == tab?.idTab) || {}


    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (datatab) {
            setTab({
                idTab: datatab[0]?.id ?? null,
                idContent: datatab[0]?.setup_qa_parent[0]?.id ?? null
            })
        }
    }, [datatab])


    useEffect(() => {
        const fetchPolicies = async () => {
            const { data } = await apiPolicyList(param)
            const newData = data?.map((e: any) => {
                return {
                    ...e,
                    link: `/policy?type=${e?.type}&id=${e?.id}`
                }
            })
            setIdPolicy(id)
            setDataPolicy([
                {
                    id: -5,
                    title: "Hướng dẫn sử dụng",
                    link: '/policy?type=2&id=-5',
                    descption: null,
                    content: null
                },
                ...newData
            ])
        }
        fetchPolicies();
        ScrollToSection('policy')
    }, [pathname, param, id])



    const tabsNavigation = [
        {
            id: '1',
            title: "Chính sách & quy định",
            link: `/policy-regulations?type=${param}`
        },
        {
            id: '2',
            title: "Quy chế hoạt động",
            link: `/operating-regulations?type=${param}`
        },
        {
            id: '3',
            title: "Bảo mật thông tin",
            link: `/security-info?type=${param}`
        },
        {
            id: '4',
            title: "Giải quyết tranh chấp",
            link: `/dispute-resolution?type=${param}`
        },
        {
            id: '5',
            title: "Chính sách huỷ chuyến",
            link: `/cancel-policy?type=${param}`
        },
    ]

    const handleChangeTab = (value: string) => {
        router.push(`/policy?type=${param}&id=${value}`)
        setIdPolicy(value)
    }




    if (!isMounted) {
        return null;
    }

    return (
        <div id='policy' className='flex flex-col lg:gap-20 md:gap-16 gap-10 custom-container'>
            <div className="w-full lg:h-[50vh] md:h-[50dvh] h-[30dvh] bg-[url('/policy/banner_supercar.jpg')] bg-cover bg-center rounded-xl flex justify-center items-center">
                <div className='3xl:text-6xl md:text-5xl text-3xl text-white font-semibold'>
                    {dataPolicy?.find(e => e?.id == isIdPolicy)?.title ?? ""}
                </div>
            </div>
            <div className='bg-[#2FB9BD]/20 w-full xl:p-8 p-4 rounded-xl md:flex flex-col gap-4 hidden'>
                <div className='text-center 3xl:text-4xl md:text-3xl text-2xl text-[#000000] font-bold'>
                    Thông báo
                </div>
                <div className='md:text-base text-sm font-light flex flex-col gap-2'>
                    <div className='space-x-1'>
                        <span className='font-bold'>Kanow</span>
                        <span>
                            xin thông báo về việc bổ sung
                        </span>
                        <span className='font-bold'>Chính sách bảo mật</span>
                        <span>
                            liên quan đến các vấn đề mới trong việc bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP của Chính phủ Việt Nam.
                        </span>
                    </div>

                    <span>
                        Trong quá trình thiết lập mối quan hệ giữa Kanow và Người dùng, giữ các người dùng với nhau phụ thuộc vào từng loại hình dịch vụ mà chúng tôi cung cấp, Kanow có thể thu thập và xử lý dữ liệu cá nhân của Quý Khách hàng. Kanow cam kết đảm bảo an toàn và Bảo vệ dữ liệu cá nhân của Quý người dùng theo quy định của pháp luật Việt Nam.
                    </span>

                    <span>
                        Theo đó bắt đầu từ ngày ra thông báo này, chúng tôi cần xác nhận lại sự đồng ý của bạn để tiếp tục thu thập, xử lý và chia sẻ dữ liệu cá nhân của bạn. Tuy nhiên, chúng tôi muốn nhắc nhở rằng nếu thu hồi sự đồng ý của mình, Quý Người dùng sẽ không thể tiếp cận với những người dùng khác trên nền tảng để phục vụ nhu cầu sử dụng dịch vụ của mình.
                    </span>

                    <div className='space-x-1'>
                        <span className='font-bold'>Kanow</span>
                        <span>hiểu rằng việc bảo vệ dữ liệu cá nhân là rất quan trọng, và chúng tôi cam kết tuân thủ Nghị định 13/2023/NĐ-CP và các quy định về bảo vệ dữ liệu liên quan khác. Bỏ qua thông tin này nếu bạn đồng ý để chia sẻ thông tin cá nhân của mình với các Người dùng khác trên nền tảng</span>
                        <span className='font-bold'>Kanow.</span>
                        <span>Hoặc vào tài khoản của mình vào để thu hồi/xóa dữ liệu. Cảm ơn sự quan tâm của bạn về vấn đề này. Chúng tôi rất trân trọng và hy vọng sẽ có cơ hội tiếp tục hỗ trợ bạn trong tương lai.</span>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-5 gap-6'>
                <div className='lg:col-span-1 col-span-5 flex flex-col w-full h-full'>
                    {
                        isVisibleTablet
                            ?
                            <SelectNocheck value={isIdPolicy as string} onValueChange={(value) => handleChangeTab(`${value}`)}>
                                <div className='w-full flex justify-center'>
                                    <SelectTriggerNocheck className="focus:outline-none focus:ring-0 focus:ring-offset-0">
                                        <SelectValueNocheck placeholder="Chọn giờ nhận xe" />
                                    </SelectTriggerNocheck>
                                </div>
                                <SelectContentNocheck>
                                    <SelectGroupNocheck>
                                        {
                                            dataPolicy && dataPolicy.map((tab) => (
                                                <SelectItemNocheck
                                                    key={tab.id}
                                                    value={`${tab.id}`}
                                                    className='flex flex-row items-center'
                                                >
                                                    {tab.title}
                                                </SelectItemNocheck>
                                            ))
                                        }
                                    </SelectGroupNocheck>
                                </SelectContentNocheck>
                            </SelectNocheck>
                            :
                            dataPolicy && dataPolicy?.map((tab) => (
                                <div key={tab.id} className='w-full flex flex-col gap-1'>
                                    <div
                                        onClick={() => {
                                            setIdPolicy(tab?.id)
                                            router.push(tab?.link)
                                        }}
                                        className={`${tab.id == isIdPolicy ? "bg-[#2FB9BD] text-white rounded-r-3xl font-medium" : "font-light hover:scale-[1.01] hover:font-medium"} 
                                        w-fit 2xl:text-base text-sm xxl:px-6 xl:px-4 px-2 py-3 cursor-pointer`}
                                    >
                                        {tab.title ? tab.title : ""}
                                    </div>
                                </div>
                            ))
                    }
                </div>
                <div className='lg:col-span-4 col-span-5 w-full h-full 2xl:pb-20 pb-16'>
                    {
                        findOb?.id == -5
                            ?
                            // <div className='flex flex-col gap-4'>
                            //     <ScrollArea type='hover' className='w-full'>
                            //         <div className="flex items-center gap-8 w-full">
                            //             {
                            //                 datatab && datatab?.map((e: any) => {
                            //                     return (
                            //                         <div
                            //                             key={e?.id}
                            //                             className={`w-fit whitespace-nowrap h-full col-span-1 cursor-pointer  font-medium xl:text-lg text-base  text-center pb-1 transition-all duration-150 ease-linear
                            //                             ${e?.id == tab.idTab ? "border-b-[#2FB9BD] text-gray-800" : "border-b-white text-gray-500"} hover:border-b-[#2FB9BD] hover:text-gray-800 border-b-2`}
                            //                             onClick={() => {
                            //                                 setTab((x: any) => ({
                            //                                     idContent: e?.setup_qa_parent[0]?.id ?? null,
                            //                                     idTab: e?.id,
                            //                                 }))
                            //                             }}
                            //                         >
                            //                             {e.name}
                            //                         </div>
                            //                     )
                            //                 })
                            //             }
                            //         </div>
                            //         <ScrollBar orientation="horizontal" className='w-0 h-0' />
                            //     </ScrollArea>

                            //     <div className="">
                            //         <Accordion value={tab?.idContent} onValueChange={(value) => {
                            //             setTab((x: any) => ({
                            //                 ...x,
                            //                 idContent: value,
                            //             }))
                            //         }}
                            //             type="single"
                            //             className="w-full flex flex-col gap-3 "
                            //         >
                            //             {
                            //                 isLoading
                            //                     ?
                            //                     (
                            //                         [...Array(5)].map((_, index) => (
                            //                             <Skeleton key={index} className='flex items-center justify-between w-full h-16 my-2'>
                            //                             </Skeleton >
                            //                         ))
                            //                     )
                            //                     :
                            //                     findObAccordion?.setup_qa_parent && findObAccordion?.setup_qa_parent?.map((question: any, index: any) => (
                            //                         <AccordionItem
                            //                             key={question.id as string}
                            //                             value={question.id as string}
                            //                             className={`rounded-lg p-3 transition-all duration-150 ease-linear border border-gray-200  ${tab.idContent == question.id ? 'bg-gray-100/60' : ''}  leading-normal shadow-sm md:leading-relaxed`}>
                            //                             <AccordionTrigger className="focus-visible:outline-none w-full py-2 hover:no-underline">
                            //                                 <div className='flex items-center gap-4 justify-between w-full group transition-all duration-150 ease-linear'>
                            //                                     <div className={`2xl:text-lg text-base ${tab.idContent == question.id ? 'text-[#2FB9BD]' : 'text-[#000000] group-hover:text-[#2FB9BD]'} 
                            //                                      transition-all duration-150 ease-linear  font-medium text-start`}
                            //                                     >
                            //                                         {question?.name ?? ''}
                            //                                     </div>
                            //                                     <div className="3xl:min-w-[30px] min-w-[20px]">
                            //                                         {
                            //                                             tab.idContent == question.id ?
                            //                                                 <IoIosArrowUp className={`3xl:text-3xl text-2xl accordionChevron text-[#2FB9BD] group-hover:text-[#2FB9BD] shrink-0 transition-transform duration-200`} />
                            //                                                 :
                            //                                                 <IoIosArrowDown className={`3xl:text-3xl text-2xl accordionChevron text-[#06282D] group-hover:text-[#2FB9BD] shrink-0 transition-transform duration-200`} />
                            //                                         }
                            //                                     </div>
                            //                                 </div >
                            //                             </AccordionTrigger >
                            //                             <AccordionContent className='xl:text-base text-sm'>
                            //                                 <span className="" dangerouslySetInnerHTML={{ __html: question?.content ?? "" }}></span>
                            //                                 {/* <span className="[&_img]:w-full [&_img]:object-cover" dangerouslySetInnerHTML={{ __html: question?.content ?? "" }}></span> */}
                            //                             </AccordionContent>
                            //                         </AccordionItem >
                            //                     ))
                            //             }
                            //         </Accordion >
                            //     </div>
                            // </div>
                            // <PolicyMobile />
                            <div id='policy' className={`px-6 flex flex-col gap-4`}>
                                <ScrollArea type='hover' className='w-full'>
                                    <div className="flex items-center gap-3 w-full">
                                        {
                                            isLoading
                                                ?
                                                [...Array(5)].map((_, index) => (
                                                    <div key={index} className="w-[80px] h-10 bg-gray-200 rounded-md animate-pulse"></div>
                                                ))
                                                :
                                                datatab && datatab?.map((e: any) => {
                                                    return (
                                                        <div
                                                            key={e?.id}
                                                            className={`w-fit select-none whitespace-nowrap h-full col-span-1 cursor-pointer  font-medium text-[15px]  text-center pb-1 transition-all duration-150 ease-linear
                                                        ${e?.id == tab.idTab ? "border-b-[#2FB9BD] text-gray-800" : "border-b-transparent text-gray-500"} hover:border-b-[#2FB9BD] hover:text-gray-800 border-b-2`}
                                                            onClick={() => {
                                                                setTab((x: any) => ({
                                                                    idContent: null,
                                                                    idTab: e?.id,
                                                                }))
                                                            }}
                                                        >
                                                            {e.name}
                                                        </div>
                                                    )
                                                })
                                        }
                                    </div>
                                    <ScrollBar orientation="horizontal" className='w-0 h-0' />
                                </ScrollArea>
                                {
                                    findObAccordion?.setup_qa_parent?.length > 0
                                        ?
                                        <Timeline timelineData={findObAccordion} tab={tab} />
                                        :
                                        <Nodata type="policy" />
                                }
                            </div>
                            :
                            <div dangerouslySetInnerHTML={{ __html: findOb?.content ?? "" }}></div>
                    }

                </div>
            </div>
        </div>

    )
}

const PhoneMockup = ({
    images,
    currentIndex,
    setCurrentIndex,
}: {
    images: string[];
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
}) => {
    const swiperRef = useRef<any>(null); // Tham chiếu tới Swiper

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(currentIndex);
        }
    }, [currentIndex]);

    return (
        <div className="relative w-[280px] bg-transparent h-[550px] rounded-[60px] shadow-xl overflow-hidden border-[14px] border-black">
            <div className="absolute top-[10px] left-1/2 transform -translate-x-1/2 w-[100px] h-[25px] bg-black rounded-full z-10"></div>
            {
                images?.length > 0 &&
                <>
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
                        <button
                            className="swiper-button-prev-custom bg-gray-400 w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-gray-400/90 transition-colors"
                        >
                            <ChevronLeft className="text-white" />
                        </button>
                    </div>

                    <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                        <button
                            className="swiper-button-next-custom bg-gray-400 w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-gray-400/90 transition-colors"
                        >
                            <ChevronRight className="text-white" />
                        </button>
                    </div>
                </>
            }
            {
                images?.length > 0
                    ?
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        modules={[Navigation, Pagination]}
                        slidesPerView={1}
                        navigation={{
                            nextEl: ".swiper-button-next-custom",
                            prevEl: ".swiper-button-prev-custom",
                        }}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                        initialSlide={currentIndex}
                        className="h-full w-full modal-htu"
                        pagination={{
                            clickable: true,
                            renderBullet: (index, className) => {
                                return `<span class="${className}"></span>`
                            },
                        }}
                        loop
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={image || "/logo/logo_kanow_black.png"}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-contain"
                                    width={1280}
                                    height={1024}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    :
                    <div className="h-[calc(550px_-_40px)] flex flex-col items-center justify-center">
                        <Image
                            alt={"@logo_kanow_black"}
                            src={"/logo/logo_kanow_black.png"}
                            width={1280}
                            height={1024}
                            className="size-1/2 object-contain"
                        />
                    </div>
            }
            <style jsx global>{`
            .modal-htu .swiper-pagination-bullets  {
             width: fit-content;
               background-color: rgba(0,0,0,.4);
                position: relative;
                padding: 1px 12px;
                border-radius: 20px;
                bottom: 40px;
                left:50%;
                transform: translateX(-50%);
            }
            .swiper-pagination-bullet-active {
                background-color: #ffffff !important;
            }
            `}</style>
        </div>
    );
};


function Timeline({ timelineData, tab }: { timelineData: any, tab: any }) {

    const [currentIndex, setCurrentIndex] = useState(0); // Index của mục timeline

    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index ảnh hiện tại

    const images = timelineData?.setup_qa_parent?.[currentIndex]?.setup_qa_items?.map(
        (item: any) => item.image
    ) || [];

    const handleTimelineClick = (index: number) => {
        setCurrentIndex(index);
        setCurrentImageIndex(0);
    };


    useEffect(() => {
        setCurrentImageIndex(0);
        setCurrentIndex(0);
    }, [tab]);

    return (
        <div className="grid grid-cols-12 min-h-screen 2xl:gap-12 md:gap-8 gap-2 pt-8">
            <div className="2xl:col-span-4 md:col-span-6 col-span-12 flex items-start justify-center">
                <PhoneMockup
                    images={images}
                    currentIndex={currentImageIndex}
                    setCurrentIndex={setCurrentImageIndex}
                />
            </div>
            <div className="2xl:col-span-8 md:col-span-6 col-span-12 pt-8">
                <div className="relative ml-4 space-y-8">
                    {
                        timelineData?.setup_qa_parent?.map((item: any, index: number, arr: any[]) => (
                            <div key={item.id} className="relative min-h-[80px]" onClick={() => handleTimelineClick(index)}>
                                {/* Đường kẻ dọc */}
                                {index < arr.length - 1 && (
                                    <div className="absolute left-0 top-[37px] w-0.5 bg-gray-200 h-[95%]"></div>
                                )}

                                {/* Điểm tròn trên timeline */}
                                <motion.div
                                    className={cn(
                                        "absolute w-9 h-9 rounded-full -left-[17px] cursor-pointer ",
                                        "border-2 border-white",
                                        currentIndex === index ? "bg-[#2FB9BD]" : "bg-[#2FB9BD]/10 hover:bg-[#2FB9BD] group"
                                    )}
                                    whileHover={{ scale: 1.2 }}
                                    animate={{
                                        scale: currentIndex === index ? 1.1 : 1,
                                        transition: { type: "spring", stiffness: 300, damping: 20 },
                                    }}
                                >
                                    <div className={`flex items-center justify-center ${currentIndex === index ? "text-white" : "text-[#2FB9BD]"} group-hover:text-white  text-sm h-full w-full font-bold`}>
                                        {index + 1}
                                    </div>
                                </motion.div>

                                {/* Nội dung */}
                                <motion.div
                                    className={cn("ml-8 pt-0.5 cursor-pointer group", currentIndex === index && "text-[#2FB9BD]")}
                                    initial={false}
                                    animate={{
                                        transition: { type: "spring", stiffness: 300, damping: 20 },
                                    }}
                                >
                                    <motion.div
                                        className="font-medium xxl:text-lg text-base"
                                        initial={false}
                                        animate={{
                                            transition: { type: "spring", stiffness: 300, damping: 20 },
                                        }}
                                    >
                                        {item?.name}
                                    </motion.div>
                                    <motion.div
                                        className={cn("xxl:text-sm text-xs", currentIndex === index ? "text-[#2FB9BD]" : "text-gray-600")}
                                        initial={false}
                                        animate={{
                                            opacity: currentIndex === index ? 1 : 0.7,
                                        }}
                                        dangerouslySetInnerHTML={{ __html: item?.content ?? "" }}
                                    ></motion.div>
                                </motion.div>
                            </div>
                        ))
                    }
                </div>

            </div >
        </div >
    )
}

export default Page