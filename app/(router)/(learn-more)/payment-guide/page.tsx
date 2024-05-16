"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Skeleton } from '@/components/ui/skeleton'
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
    idOpen: string[]
}

const SecurityInfo = (props: Props) => {
    const initialState: IState = {
        isLoading: false,
        idOpen: [],
        listData: [

        ]
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

    return (
        <div className='flex flex-col gap-4 2xl:pb-20 pb-16'>
            <div className='3xl:text-4xl text-2xl text-[#000000] font-semibold'>
                Hướng dẫn thanh toán
            </div>
            <Accordion onValueChange={(value) => queryState({ idOpen: value })} type="multiple" className="w-full">
                {
                    isState.isLoading ?
                        [...Array(7)].map((_, index) => (
                            <Skeleton key={index} className='flex items-center justify-between w-full h-14 my-4'>
                            </Skeleton >
                        ))
                        :
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
                }
            </Accordion >
        </div >
    )
}

export default SecurityInfo