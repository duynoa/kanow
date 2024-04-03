'use client'

import React, { useEffect, useState } from 'react'

import { DialogAnswerPolicy } from '@/components/modals/DialogAnswerPolicy'
import { IInitialStateDetailCar } from '@/types/Cars/ICars'

import { useCookie } from '@/hooks/useCookie'
import {
    PiCar,
    PiCheckSquareOffset,
    PiClipboardText,
    PiClipboardTextBold,
    PiCreditCard,
    PiPath
} from 'react-icons/pi'
import Information from './components/Information'
import PriceList from './components/PriceList'
import { getInfoDetailCarTransaction } from '@/services/cars/payment.services'
import { IInitialStateInfoRentalCar } from '@/types/Cars/IInitial'
import PaymentMethods from '../../payment-methods/[slug]/components/PaymentMethods'
import { useResize } from '@/hooks/useResize'

type Props = {
    params: {
        slug: string
    }
}

const InfoRentalCar = ({ params }: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const { isVisibleMobile } = useResize()

    const dataStep = [
        {
            id: 1212,
            title: "Gửi yêu cầu",
            icon: <PiClipboardText className='size-6' />,
            status: 0,
            index: 0,
        },
        {
            id: 1214142,
            title: "Duyệt yêu cầu",
            icon: <PiCheckSquareOffset className='size-6' />,
            status: 1,
            index: 1,
        },
        {
            id: 121552,
            title: "Thanh toán cọc",
            icon: <PiCreditCard className='size-6' />,
            status: 2,
            index: 2,
        },
        {
            id: 1214442,
            title: "Khởi hành",
            icon: <PiCar className='size-6' />,
            status: 3,
            index: 3
        },
        {
            id: 1212555,
            title: "Kết thúc",
            icon: <PiPath className='size-6' />,
            status: 4,
            index: 4
        },
    ]

    const initialState: IInitialStateInfoRentalCar = {
        detailRentalCar: {
            status: undefined,
        }
    };

    const [isState, setIsState] = useState<any>(initialState)
    const queryKeyIsState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    useEffect(() => {
        setIsMounted(true)
    }, [])


    useEffect(() => {
        const fetchStepTransaction = async () => {
            const { data } = await getInfoDetailCarTransaction(params?.slug);
            console.log('data :', data);

            if (data && data.data && data.base) {
                queryKeyIsState({
                    detailRentalCar: {
                        ...isState.detailRentalCar,
                        status: {
                            statusCustom: data.data.status.status > 4 ? 4 : data.data.status.status,
                            status: data.data.status.status,
                            color: data.data.status.color,
                            name: data.data.status.name,
                        }
                    }
                })
            }
        }

        fetchStepTransaction()
    }, [])

    // Hàm để đếm số cụm từ trong một chuỗi (dùng để chỉnh vị trí chữ trong step nhìn cho tương đối)
    const countWordClusters = (sentence: string) => {
        // Phân tách chuỗi thành các từ bằng khoảng trắng
        const words = sentence.split(/\s+/);

        // Khởi tạo biến đếm cụm từ
        let clusterCount = 0;

        // Duyệt qua mảng các từ
        for (let i = 0; i < words.length - 1; i++) {
            // Kiểm tra xem từ hiện tại và từ kế tiếp có chứa nội dung không rỗng
            if (words[i].trim() !== '' && words[i + 1].trim() !== '') {
                // Nếu có, tăng biến đếm cụm từ lên 1
                clusterCount++;
            }
        }

        // Trả về số cụm từ
        return clusterCount;
    }

    if (!isMounted) {
        return null
    }

    return (
        <>
            <div className='w-full max-w-full bg-white/50'>
                <div className='3xl:pt-8 3xl:pb-16 pt-6 pb-12 md:px-0 px-10 custom-container flex items-center justify-center caret-transparent md:overflow-hidden overflow-auto'>
                    {
                        dataStep?.map((step, index) => {
                            return (
                                <div key={step.id} className='flex flex-col gap-3 relative'>
                                    <div className='flex items-center'>
                                        <div className={`
                                        ${index < isState?.detailRentalCar?.status?.statusCustom && "bg-[#C2F9F9] text-[#3E424E]"}
                                         ${step.status === isState?.detailRentalCar?.status?.statusCustom && "bg-[#2FB9BD] text-white"} 
                                         ${step.status > isState?.detailRentalCar?.status?.statusCustom && "bg-[#F6F6F8] text-[#3E424E]"} 
                                        flex justify-center items-center p-4 rounded-full`}
                                        >
                                            {step.icon ? step.icon : ""}
                                        </div>
                                        {
                                            dataStep?.length - 1 === index
                                                ?
                                                null
                                                :
                                                <div className='xl:w-52 lg:w-36 md:w-20 w-2 border border-dashed' />
                                        }
                                    </div>
                                    {
                                        isVisibleMobile ?
                                            null
                                            :
                                            <div className={`${step.title && countWordClusters(step.title) >= 2 ? '-left-4' : 'left-0'} absolute -bottom-6 text-sm font-semibold text-[#585F71] w-52`}>
                                                {step.title ? step.title : ""}
                                            </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                isState?.detailRentalCar?.status &&
                <div className='custom-container 3xl:mt-8 mt-4 flex lg:flex-row flex-col gap-6'>
                    <Information
                        isState={isState}
                        queryKeyIsState={queryKeyIsState}
                        params={params}
                    />

                    <PriceList
                        isState={isState}
                        queryKeyIsState={queryKeyIsState}
                        params={params}
                    />
                </div>
            }

            {/* thanh toán cọc */}
            {/* {
                isState?.detailRentalCar?.status && isState?.detailRentalCar?.status?.status === 2 &&
                <div className='bg-[#F6F6F8]'>
                    <PaymentMethods
                        isState={isState}
                        queryKeyIsState={queryKeyIsState}
                        listPaymentMethods={listPaymentMethods}
                    />
                </div>
            } */}

            <DialogAnswerPolicy
                isState={isState}
                queryKeyIsState={queryKeyIsState}
            />
        </>
    )
}

export default InfoRentalCar