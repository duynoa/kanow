"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton'
import { uuidv4 } from "@/lib/uuid"
import { getPanymentGuide } from '@/services/learn-more/payment-guide.services'
import { useEffect, useState } from 'react'
import { GoDash } from 'react-icons/go'
import { IoMdAdd } from 'react-icons/io'
type Props = {}
interface IState {
    isLoading?: boolean
    listData?: {
        active: number,
        content: string,
        created_at: string,
        id: number | string,
        title: string,
        updated_at: string
    }[]
    idOpen: string[],
    isOpenPaymentGuide: string[]
}

const SecurityInfo = (props: Props) => {
    const initialState: IState = {
        isLoading: false,
        idOpen: [],
        listData: [],
        isOpenPaymentGuide: []
    }

    const [isState, setIsState] = useState<IState>(initialState)

    const queryState = (key: any) => setIsState((prev: IState) => ({ ...prev, ...key }))

    const fetchListData = async () => {
        queryState({ isLoading: true })
        await new Promise(resolve => setTimeout(resolve, 1500))
        try {
            const { data: { data } } = await getPanymentGuide()
            if (data) {
                queryState({ listData: data })
            }
        } catch (error) {
            throw error
        } finally {
            queryState({ isLoading: false })
        }
    }

    useEffect(() => {
        fetchListData()
    }, [])

    const dataPaymentGuide = [
        {
            id: "23",
            title: "Quy trình thanh toán giữa khách hàng và chủ xe",
            step: [
                {
                    id: uuidv4(),
                    name: "Khách hàng tìm hiểu kỹ thông tin về dịch vụ, loại xe khách muốn thuê, thời gian di chuyển phù hợp và chi phí trước khi thực hiện đặt xe tại KANOW."
                },
                {
                    id: uuidv4(),
                    name: "Sau đó phía KANOW sẽ kiểm tra thông tin, liên hệ đến khách và xác nhận thông tin đặt xe qua email hoặc tin nhắn điện thoại hoặc thông báo trên ứng dụng và Zalo đến khách hàng để khách nắm thông tin."
                },
                {
                    id: uuidv4(),
                    name: "Tiếp đến, khách hàng thực hiện thanh toán tiền cọc phí thuê xe thông qua các phương thức chuyển khoản ngân hàng hoặc liên kết thẻ."
                },
                {
                    id: uuidv4(),
                    name: "Sau khi khách thanh toán thành công, KANOW sẽ gửi xác nhận đặt cọc thành công qua email hoặc qua thông báo ứng dụng hoặc Zalo đến khách hàng."
                },
                {
                    id: uuidv4(),
                    name: "Khách hàng sẽ thực hiện thanh toán phần còn lại cho chủ xe thông qua hình thức chuyển khoản hoặc tiền mặt."
                },
            ],
            subTitle: "Sau khi lựa chọn xe, phía chủ xe và khách hàng sẽ thỏa thuận phương thức thanh toán phù hợp cho cả 2 bên.",
            content: "Các bước trong quy trình thanh toán được thực hiện như sau:"
        },
        {
            id: "4343",
            title: "Quy trình thanh toán giữa chủ xe và công ty",
            step: [
                {
                    id: uuidv4(),
                    name: "Các chủ xe thực hiện đầy đủ các bước đăng ký xe cho thuê tại KANOW"
                },
                {
                    id: uuidv4(),
                    name: "Sau khi đăng ký thành công, chủ xe sẽ thực hiện xem xét và phê duyệt các yêu cầu thuê xe của khách hàng. Và phía công ty KANOW sẽ tính phí % dịch vụ trên mỗi chuyến đi."
                },
                {
                    id: uuidv4(),
                    name: "Chủ xe thực hiện thanh toán phí dịch vụ cho phía chủ công ty KANOW thông qua hình thức chuyển khoản hoặc liên kết thẻ."
                },
            ],
            subTitle: "",
            content: "Các chủ xe sẽ thực hiện thanh toán phí cho phía chủ Công ty theo các bước sau đây:"
        },
    ]

    return (
        <div className="flex flex-col gap-6 2xl:pb-20 pb-16">
            <div className='flex flex-col gap-4'>
                <div className='3xl:text-4xl text-2xl text-[#000000] font-semibold'>
                    Hướng dẫn thanh toán
                </div>
                <Accordion onValueChange={(value) => queryState({ idOpen: value })} type="multiple" className="w-full">
                    {
                        isState.isLoading ?
                            (
                                [...Array(4)].map((_, index) => (
                                    <Skeleton key={index} className='flex items-center justify-between w-full h-12 my-4'>
                                    </Skeleton >
                                ))
                            )
                            :
                            (
                                isState.listData && isState.listData.map((question, index) => (
                                    <AccordionItem key={question.id as string} value={question.id as string} className=' border-none'>
                                        <AccordionTrigger className="focus-visible:outline-none w-full py-2 hover:no-underline">
                                            <div className='flex items-center gap-4 justify-between w-full group transition-all duration-150 ease-linear'>
                                                <div className={`2xl:text-xl text-base ${isState.idOpen.includes(question.id as string) ? 'text-[#2FB9BD]' : 'text-[#000000] group-hover:text-[#2FB9BD]'} 
                                     transition-all duration-150 ease-linear  font-medium text-start`}
                                                >
                                                    {index + 1}. {question.title ? question.title : ''}
                                                </div>
                                                <div className="3xl:min-w-[30px] min-w-[20px] md:block hidden">
                                                    {
                                                        isState.idOpen.includes(question.id as string) ?
                                                            <GoDash className={`3xl:text-3xl text-2xl accordionChevron text-[#2FB9BD] group-hover:text-[#2FB9BD] shrink-0 transition-transform duration-200`} />
                                                            :
                                                            <IoMdAdd className={`3xl:text-3xl text-2xl accordionChevron text-[#06282D] group-hover:text-[#2FB9BD] shrink-0 transition-transform duration-200`} />
                                                    }
                                                </div>
                                            </div >
                                        </AccordionTrigger >
                                        <AccordionContent className='xl:text-base text-sm'>
                                            <span className="[&_img]:w-full [&_img]:object-cover" dangerouslySetInnerHTML={{ __html: question.content ?? "" }}></span>
                                        </AccordionContent>
                                    </AccordionItem >
                                ))
                            )
                    }
                </Accordion >
            </div>
            <div className='flex flex-col gap-4'>
                <div className='3xl:text-4xl text-2xl text-[#000000] font-semibold'>
                    Quy trình thanh toán
                </div>

                <Accordion onValueChange={(value) => queryState({ isOpenPaymentGuide: value })} type="multiple" className="w-full">
                    {
                        dataPaymentGuide && dataPaymentGuide.map((payment, index) => (
                            <AccordionItem
                                key={payment.id as string}
                                value={payment.id as string}
                                className=' border-none'
                            >
                                <AccordionTrigger className="focus-visible:outline-none w-full py-2 hover:no-underline">
                                    <div className='flex items-center gap-4 justify-between w-full group transition-all duration-150 ease-linear'>
                                        <div className={`${isState.isOpenPaymentGuide.includes(payment.id as string) ? 'text-[#2FB9BD]' : 'text-[#000000] group-hover:text-[#2FB9BD]'} 2xl:text-xl text-base transition-all duration-150 ease-linear  font-medium text-start`}>
                                            {index + 1}. {payment.title ? payment.title : ''}
                                        </div>
                                        <div className="3xl:min-w-[30px] min-w-[20px] md:block hidden">
                                            {
                                                isState.isOpenPaymentGuide.includes(payment.id as string) ?
                                                    <GoDash className={`3xl:text-3xl text-2xl accordionChevron text-[#2FB9BD] group-hover:text-[#2FB9BD] shrink-0 transition-transform duration-200`} />
                                                    :
                                                    <IoMdAdd className={`3xl:text-3xl text-2xl accordionChevron text-[#06282D] group-hover:text-[#2FB9BD] shrink-0 transition-transform duration-200`} />
                                            }
                                        </div>
                                    </div >
                                </AccordionTrigger >
                                <AccordionContent className='xl:text-base text-sm space-y-2'>
                                    {
                                        payment.subTitle !== ""
                                            ?
                                            <>
                                                <span>{payment.subTitle}</span>
                                                <br />
                                            </>
                                            :
                                            (null)
                                    }
                                    <span>{payment.content}</span>
                                    <br />
                                    <ul className='list-disc space-y-1'>
                                        {
                                            payment.step && payment.step.map((item, index) => (
                                                <li className='space-x-2' key={`id-${item.id}`}>
                                                    <span className='text-base font-bold'>Bước {index + 1}:</span>
                                                    <span>{item?.name ? item?.name : ""}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </AccordionContent>
                            </AccordionItem >
                        ))
                    }
                </Accordion >
            </div>
        </div>
    )
}

export default SecurityInfo