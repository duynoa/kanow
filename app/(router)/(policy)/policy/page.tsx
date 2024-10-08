'use client'

import { useResize } from '@/hooks/useResize'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SelectContentNocheck, SelectGroupNocheck, SelectItemNocheck, SelectNocheck, SelectTriggerNocheck, SelectValueNocheck } from '@/components/ui/selectNocheck'
import usePolicyApi from '@/services/policy/policy.services'

const Page = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    const pathname = usePathname()

    const { apiPolicyList } = usePolicyApi()

    const { isVisibleTablet } = useResize()

    const id = useSearchParams().get('id') ?? ""

    const param = useSearchParams().get('type')

    const [dataPolicy, setDataPolicy] = useState<any[]>()

    const [isIdPolicy, setIdPolicy] = useState<string>(id)


    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])


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
            setDataPolicy(newData)
        }
        fetchPolicies();
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
        <div className='flex flex-col lg:gap-20 md:gap-16 gap-10 custom-container'>
            <div className="w-full lg:h-[50vh] md:h-[50dvh] h-[30dvh] bg-[url('/policy/banner_supercar.jpg')] bg-cover bg-center rounded-xl flex justify-center items-center">
                <div className='3xl:text-6xl md:text-5xl text-3xl text-white font-semibold'>
                    {dataPolicy?.find(e => e?.id == isIdPolicy)?.title ?? ""}
                </div>
            </div>
            <div className='bg-[#2FB9BD]/20 w-full xl:p-8 p-4 rounded-xl flex flex-col gap-4'>
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
                            <SelectNocheck onValueChange={(value) => handleChangeTab(value)}>
                                <div className='w-full flex justify-center'>
                                    <SelectTriggerNocheck className="max-w-[80%] focus:outline-none focus:ring-0 focus:ring-offset-0">
                                        <SelectValueNocheck placeholder="Chọn giờ nhận xe" />
                                    </SelectTriggerNocheck>
                                </div>
                                <SelectContentNocheck>
                                    <SelectGroupNocheck>
                                        {
                                            dataPolicy && dataPolicy.map((tab) => (
                                                <SelectItemNocheck
                                                    key={tab.id}
                                                    value={tab.id}
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
                    <div dangerouslySetInnerHTML={{ __html: dataPolicy?.find(e => e?.id == isIdPolicy)?.content ?? "" }}></div>
                </div>
            </div>
        </div>
    )
}

export default Page