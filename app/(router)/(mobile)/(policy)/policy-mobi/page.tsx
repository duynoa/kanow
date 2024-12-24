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
import { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'


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
        <div id='policy' className='flex flex-col lg:gap-20 md:gap-16 gap-10 custom-container mt-16'>
            <div className='grid grid-cols-5 gap-6'>
                <div className='col-span-5 w-full h-full 2xl:pb-20 pb-16'>
                    {
                        findOb?.id == -5
                            ?
                            <div className='flex flex-col gap-4'>
                                <ScrollArea type='hover' className='w-full'>
                                    <div className="flex items-center gap-8 w-full">
                                        {
                                            datatab && datatab?.map((e: any) => {
                                                return (
                                                    <div
                                                        key={e?.id}
                                                        className={`w-fit whitespace-nowrap h-full col-span-1 cursor-pointer  font-medium text-sm  text-center pb-1 transition-all duration-150 ease-linear
                                                        ${e?.id == tab.idTab ? "border-b-[#2FB9BD] text-gray-800" : "border-b-white text-gray-500"} hover:border-b-[#2FB9BD] hover:text-gray-800 border-b-2`}
                                                        onClick={() => {
                                                            setTab((x: any) => ({
                                                                idContent: e?.setup_qa_parent[0]?.id ?? null,
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

                                <div className="">
                                    <Accordion value={tab?.idContent} onValueChange={(value) => {
                                        setTab((x: any) => ({
                                            ...x,
                                            idContent: value,
                                        }))
                                    }}
                                        type="single"
                                        className="w-full flex flex-col gap-3 "
                                    >
                                        {
                                            isLoading
                                                ?
                                                (
                                                    [...Array(5)].map((_, index) => (
                                                        <Skeleton key={index} className='flex items-center justify-between w-full h-16 my-2'>
                                                        </Skeleton >
                                                    ))
                                                )
                                                :
                                                findObAccordion?.setup_qa_parent && findObAccordion?.setup_qa_parent?.map((question: any, index: any) => (
                                                    <AccordionItem
                                                        key={question.id as string}
                                                        value={question.id as string}
                                                        className={`rounded-lg p-3 transition-all duration-150 ease-linear border border-gray-200  ${tab.idContent == question.id ? 'bg-gray-100/60' : ''}  leading-normal shadow-sm md:leading-relaxed`}>
                                                        <AccordionTrigger className={`focus-visible:outline-none w-full py-2 hover:no-underline`}>
                                                            <div className='flex items-center gap-4 justify-between w-full group transition-all duration-150 ease-linear'>
                                                                <div className={`text-sm ${tab.idContent == question.id ? 'text-[#2FB9BD]' : 'text-[#000000] group-hover:text-[#2FB9BD]'} 
                                                                 transition-all duration-150 ease-linear  font-medium text-start`}
                                                                >
                                                                    {question?.name ?? ''}
                                                                </div>
                                                                <div className="3xl:min-w-[30px] min-w-[20px]">
                                                                    {
                                                                        tab.idContent == question.id ?
                                                                            <IoIosArrowUp className={`3xl:text-3xl text-2xl accordionChevron text-[#2FB9BD] group-hover:text-[#2FB9BD] shrink-0 transition-transform duration-200`} />
                                                                            :
                                                                            <IoIosArrowDown className={`3xl:text-3xl text-2xl accordionChevron text-[#06282D] group-hover:text-[#2FB9BD] shrink-0 transition-transform duration-200`} />
                                                                    }
                                                                </div>
                                                            </div >
                                                        </AccordionTrigger >
                                                        <AccordionContent className='xl:text-base text-sm'>
                                                            <span className="[&_img]:w-full [&_img]:object-cover" dangerouslySetInnerHTML={{ __html: question?.content ?? "" }}></span>
                                                        </AccordionContent>
                                                    </AccordionItem >
                                                ))
                                        }
                                    </Accordion >
                                </div>
                            </div>
                            :
                            <div dangerouslySetInnerHTML={{ __html: findOb?.content ?? "" }}></div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Page