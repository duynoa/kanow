'use client'

import Nodata from "@/components/image/Nodata"
import SearchNormal from "@/components/search/SearchNormal"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetUsePolicy } from '@/managers/api-management/policy/useGetUsePolicy'
import usePolicyApi from '@/services/policy/policy.services'
import { useDrawerStore } from "@/stores/drawerStores"
import { ScrollToSection } from '@/utils/scroll/ScrollToSection'
import Image from "next/image"
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiChevronRight } from "react-icons/fi"


const PolicyMobile = () => {
    const pathname = usePathname()

    const { apiPolicyList } = usePolicyApi()

    const id = useSearchParams().get('id') ?? ""

    const param = useSearchParams().get('type')

    const [search, setSearch] = useState('')

    const { setOpenDrawer, setObjectData } = useDrawerStore()

    const [dataPolicy, setDataPolicy] = useState<any[]>()

    const [isIdPolicy, setIdPolicy] = useState<string>(id)

    const [isMounted, setIsMounted] = useState<boolean>(false)

    const [findObAccordion, setFindObAccordion] = useState<any>({})

    const { data: datatab, isLoading } = useGetUsePolicy()

    const [tab, setTab] = useState<any>({
        idTab: null,
        idContent: null
    })

    const findOb = dataPolicy?.find(e => e?.id == isIdPolicy)


    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        setFindObAccordion(datatab?.find((e: any) => e?.id == tab?.idTab))
    }, [tab])


    useEffect(() => {
        if (datatab) {
            setTab({
                idTab: datatab[0]?.id ?? null,
                idContent: null
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

    function removeAccents(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    useEffect(() => {
        if (!findObAccordion) return

        const normalizedSearch = removeAccents(search.toLowerCase())

        const newData = findObAccordion?.setup_qa_parent?.filter((e: any) =>
            removeAccents(e.name.toLowerCase()).includes(normalizedSearch)
        )

        setFindObAccordion({
            ...findObAccordion,
            setup_qa_parent: search ? newData : (datatab?.find((e: any) => e?.id == tab?.idTab)?.setup_qa_parent || [])
        })
    }, [search])


    if (!isMounted) {
        return null;
    }

    return (
        <div id='policy' className='px-6 pt-8 flex flex-col gap-4'>
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
                                        className={`w-fit whitespace-nowrap h-full col-span-1 cursor-pointer  font-medium text-[15px]  text-center pb-1 transition-all duration-150 ease-linear
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

            <div className="w-full">
                <SearchNormal
                    isClearable
                    value={search}
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setSearch(e?.target.value)}
                    setValue={(e) => setSearch(e)}
                />
            </div>
            <div className="flex flex-col gap-y-5 w-full">
                {
                    isLoading
                        ?
                        (
                            [...Array(10)].map((_, index) => (
                                <Skeleton key={index} className='flex items-center justify-between w-full h-16 my-2'>
                                </Skeleton >
                            ))
                        )
                        :
                        findObAccordion?.setup_qa_parent?.length > 0
                            ?
                            findObAccordion?.setup_qa_parent && findObAccordion?.setup_qa_parent?.map((e: any) => {
                                return (
                                    <div
                                        key={e?.id}
                                        className={`${e?.show === 1 ? "" : ""} flex w-full h-full cursor-pointer items-center  gap-4
                                            relative after:content-[''] after:absolute after:right-0 after:w-[calc(100%_-_95px)] after:h-px after:bg-gray-200 after:bottom-[-10px]`}
                                        onClick={() => {
                                            setOpenDrawer(true, 'policyMobi')
                                            setObjectData({ ...e })
                                        }}
                                    >
                                        <div className="size-[80px] bg-gray-200 rounded-md overflow-hidden">
                                            <Image
                                                src={e?.setup_qa_items[0]?.image ?? '/nodata/no-data-amico.png'}
                                                width={1280}
                                                height={1024}
                                                className="size-full block rounded-md object-cover px-2 pt-2"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 h-full flex-1">
                                            <h2 className="text-base font-bold line-clamp-3">{e?.name}</h2>
                                        </div>
                                        <div className="pl-2 text-gray-400">
                                            <FiChevronRight className="text-2xl" />
                                        </div>

                                    </div>
                                )
                            })
                            :
                            <Nodata type="policyMobi" />
                }
            </div>
        </div>
    )
}

export default PolicyMobile