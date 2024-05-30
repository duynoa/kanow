'use client'

import React, { useEffect, useState } from 'react'

import { DialogAnswerPolicy } from '@/components/modals/DialogAnswerPolicy'

import { useCookie } from '@/hooks/useCookie'
import {
    PiCar,
    PiCheckBold,
    PiCheckSquareOffset,
    PiClipboardText,
    PiClipboardTextBold,
    PiCreditCard,
    PiPath
} from 'react-icons/pi'
import Information from './components/Information'
import PriceList from './components/PriceList'
import { getInfoDetailCarTransaction } from '@/services/cars/payment.services'

import { useResize } from '@/hooks/useResize'
import { useDataInfoRentalCar, useDataPolicy } from '@/hooks/useDataQueryKey'
import { CustomDataInfoRentalCar, CustomDataPolicy } from '@/custom/CustomData'
import { getDataPolicy } from '@/services/cars/policy.services'
import SkeletonIntroRentalCar from './components/SkeletonIntroRentalCar'
import { useSearchParams } from 'next/navigation'
import { useGeneralKey } from '@/hooks/useGeneralKey'
import { useAuth } from '@/hooks/useAuth'

import Pusher from "pusher-js";
import { useDialogReviewCar } from '@/hooks/useOpenDialog'
import { DialogReviewCar } from '@/components/modals/DialogReviewCar'

type Props = {
    params: {
        slug: string
    }
}

const InfoRentalCar = ({ params }: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const [onFetchingDataTransaction, setOnFetchingDataTransaction] = useState<boolean>(false)

    const searchParams = useSearchParams()
    const typeCarDetail = searchParams.get('type')

    const { informationUser } = useAuth()

    const { generalKey, setGeneralKey } = useGeneralKey()

    const {
        isStateInfoRentalCar,
        isLoadingSkeletonIntroRentalCar,
        queryKeyIsStateInfoRentalCar,
        setIsLoadingSkeletonIntroRentalCar
    } = useDataInfoRentalCar()

    const { openDialogReviewCar, setOpenDialogReviewCar } = useDialogReviewCar()

    const { queryKeyIsStatePolicy } = useDataPolicy()
    const { isVisibleMobile } = useResize()

    const dataStep = [
        {
            id: 1212,
            title: "Gửi yêu cầu",
            icon: <PiCheckBold className='size-5' />,
            status: 0,
            index: 0,
        },
        {
            id: 1214142,
            title: "Duyệt yêu cầu",
            icon: <PiCheckBold className='size-5' />,
            status: 1,
            index: 1,
        },
        {
            id: 121552,
            title: "Thanh toán cọc",
            icon: <PiCheckBold className='size-5' />,
            status: 2,
            index: 2,
        },
        {
            id: 1214442,
            title: "Khởi hành",
            icon: <PiCheckBold className='size-5' />,
            status: 3,
            index: 3
        },
        {
            id: 1212555,
            title: "Kết thúc",
            icon: <PiCheckBold className='size-5' />,
            status: 4,
            index: 4
        },
    ]

    const fetchStepTransaction = async () => {
        try {
            setIsLoadingSkeletonIntroRentalCar(true)

            const dataParams = {
                type: (typeCarDetail === "1" || typeCarDetail === "2") ? parseInt(typeCarDetail) : null
            }

            const { data } = await getInfoDetailCarTransaction(params?.slug, dataParams);
            console.log('data data data:', data);

            if (data && data.data && data.base) {
                let { customDataInfoRentalCar } = CustomDataInfoRentalCar(data)

                queryKeyIsStateInfoRentalCar({
                    detailRentalCar: customDataInfoRentalCar
                })

                if (informationUser) {
                    if (data?.data?.status?.status === 4) {
                        const isOwner = informationUser?.id === data?.data?.customer?.id;
                        const isRenter = informationUser?.id !== data?.data?.customer?.id;

                        if (isOwner && !isRenter && !data?.data?.review_owner) {
                            setOpenDialogReviewCar(true);
                        } else if (!isOwner && isRenter && !data?.data?.review) {
                            setOpenDialogReviewCar(true);
                        }
                    } else {
                        setOpenDialogReviewCar(false)
                    }
                }
                setIsLoadingSkeletonIntroRentalCar(false)
            } else {
                setIsLoadingSkeletonIntroRentalCar(false)
            }
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        setIsMounted(true)
        // lấy data thanh step các bước thanh toán xe
    }, [])

    useEffect(() => {
        fetchStepTransaction()
    }, [params?.slug, informationUser])



    // useEffect(() => {

    // }, [informationUser, isStateInfoRentalCar.detailRentalCar?.status?.status])

    console.log('openDialogReviewCar: ', openDialogReviewCar);


    useEffect(() => {
        if (generalKey && generalKey?.pusher && generalKey?.cluster && informationUser?.id) {
            const pusher = new Pusher(generalKey?.pusher, {
                authTransport: "ajax",
                cluster: generalKey?.cluster,
            });

            pusher.connection.bind("connected", () => {
                console.log("Đã kết nối thành công đến Pusher!");
            });

            pusher.connection.bind("error", (err: any) => {
                console.error("Lỗi kết nối Pusher:", err);
            });

            const presenceChannel = pusher.subscribe(`notifications-channel-${informationUser?.id}-customer`);

            presenceChannel.bind("change-status", (data: any) => {
                console.log('CHANGE-STATUS PUSHER: ', data);

                if (data && isStateInfoRentalCar?.detailRentalCar) {
                    queryKeyIsStateInfoRentalCar({
                        detailRentalCar: {
                            ...isStateInfoRentalCar?.detailRentalCar,
                            status: {
                                ...isStateInfoRentalCar?.detailRentalCar?.status,
                                status: +data.status,
                                statusCustom: +data.status,
                                note: data.note_status
                            }
                        },
                        loading: {
                            ...isStateInfoRentalCar.loading,
                            isLoadingButton: false
                        }
                    })
                }
            });

            return () => {
                presenceChannel.unbind("change-status"); // Unbind sự kiện khi component bị unmounted
                pusher.unsubscribe(`notifications-channel-${informationUser?.id}-customer`); // Unsubscribe channel khi component bị unmounted
                pusher.disconnect(); // Ngắt kết nối khi component bị unmounted

            };
        }
    }, [
        generalKey,
        informationUser?.id,
        isStateInfoRentalCar.detailRentalCar,
        queryKeyIsStateInfoRentalCar,
    ]);

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
            {
                isLoadingSkeletonIntroRentalCar
                    ?
                    <SkeletonIntroRentalCar />
                    :
                    <div>
                        <div className='w-full max-w-full bg-white/50'>
                            {
                                isStateInfoRentalCar?.detailRentalCar?.status && isStateInfoRentalCar?.detailRentalCar?.status?.status <= 4 ?
                                    <div className='3xl:pt-8 3xl:pb-16 pt-6 pb-12 custom-container flex md:gap-3 gap-2 items-center justify-center caret-transparent md:overflow-hidden overflow-auto'>
                                        {
                                            dataStep?.map((step, index) => {
                                                return (
                                                    <div key={step.id} className='flex items-center md:gap-3 gap-2'>
                                                        <div className={`
                                        ${isStateInfoRentalCar?.detailRentalCar && index < isStateInfoRentalCar?.detailRentalCar?.status?.statusCustom && "bg-[#2FB9BD] text-white"}
                                         ${isStateInfoRentalCar?.detailRentalCar && step.status !== 4 && (isStateInfoRentalCar?.detailRentalCar && step.status === isStateInfoRentalCar?.detailRentalCar?.status?.statusCustom) && "border-2 border-[#2FB9BD] bg-[#F1FCFC] text-[#2FB9BD]"} 
                                         ${isStateInfoRentalCar?.detailRentalCar && step.status === 4 && (isStateInfoRentalCar?.detailRentalCar && step.status === isStateInfoRentalCar?.detailRentalCar?.status?.statusCustom) && "bg-[#2FB9BD] text-white"} 
                                         ${isStateInfoRentalCar?.detailRentalCar && step.status > isStateInfoRentalCar?.detailRentalCar?.status?.statusCustom && "border-2 border-[#B4B8C5] bg-[#F6F6F8] text-[#B4B8C5]"} 
                                        flex justify-center items-center size-6 max-w-6 p-5 rounded-full`}
                                                        >
                                                            <div className='3xl:text-base text-sm'>
                                                                {
                                                                    (isStateInfoRentalCar?.detailRentalCar?.status?.status === 4) || (isStateInfoRentalCar?.detailRentalCar && (index < isStateInfoRentalCar?.detailRentalCar?.status?.statusCustom)) ?
                                                                        step.icon
                                                                        :
                                                                        index + 1}
                                                            </div>
                                                        </div>

                                                        {
                                                            isVisibleMobile ?
                                                                null
                                                                :
                                                                <div className={`
                                                ${isStateInfoRentalCar?.detailRentalCar && index < isStateInfoRentalCar?.detailRentalCar?.status?.statusCustom && " text-[#585F71]"}
                                                ${isStateInfoRentalCar?.detailRentalCar && step.status === isStateInfoRentalCar?.detailRentalCar?.status?.statusCustom && "text-[#2FB9BD]"} 
                                                ${isStateInfoRentalCar?.detailRentalCar && step.status > isStateInfoRentalCar?.detailRentalCar?.status?.statusCustom && "text-[#585F71]"}
                                                font-medium w-fit
                                                `}>
                                                                    {step.title ? step.title : ""}
                                                                </div>
                                                        }
                                                        {
                                                            dataStep?.length - 1 === index
                                                                ?
                                                                null
                                                                :
                                                                <div className='md:w-20 w-1 border border-dashed' />
                                                        }

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        {
                            isStateInfoRentalCar?.detailRentalCar?.status &&
                            <div className='custom-container 3xl:mt-8 mt-4 flex lg:flex-row flex-col gap-6'>
                                <Information params={params} />
                                <PriceList params={params} />
                            </div>
                        }
                    </div>
            }
            <DialogReviewCar fetchStepTransaction={fetchStepTransaction} />
        </>
    )
}

export default InfoRentalCar