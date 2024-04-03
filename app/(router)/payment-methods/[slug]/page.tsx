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
import { getInfoDetailCarTransaction } from '@/services/cars/payment.services'
import { IInitialStateInfoRentalCar, IInitialStatePayment } from '@/types/Cars/IInitial'
import PaymentMethods from './components/PaymentMethods'

type Props = {
    params: {
        slug: string
    }
}

const InfoRentalCar = ({ params }: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const listPaymentMethods = [
        {
            id: 237281738,
            name: "Thanh toán bằng tiền mặt",
            logo: "/other/payment/cash.png",
            type: "cash",
        },
        {
            id: 2372,
            name: "Thẻ ngân hàng nội địa",
            logo: "/other/payment/local_card.png",
            type: "local_card",
        },
        {
            id: 237738,
            name: "Thẻ quốc tế",
            logo: "/other/payment/international_card.png",
            type: "international_card",
        },
        {
            id: 281738,
            name: "Thanh toán qua Momo",
            logo: "/other/payment/momo.png",
            type: "momo",
        },
    ]

    const initialState: IInitialStatePayment = {
        payment: {
            idActivePaymentMethod: listPaymentMethods[0]?.id,
            indexPaymentMethod: 0
        }
    };

    const [isState, setIsState] = useState<IInitialStatePayment>(initialState)
    const queryKeyIsState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) {
        return null
    }

    return (
        <div className='bg-[#F6F6F8]'>
            <PaymentMethods
                isState={isState}
                queryKeyIsState={queryKeyIsState}
                listPaymentMethods={listPaymentMethods}
            />
        </div>
    )
}

export default InfoRentalCar