'use client'

import React, { useEffect, useState } from 'react'

import { DialogAnswerPolicy } from '@/components/modals/DialogAnswerPolicy'

import { useCookie } from '@/hooks/useCookie'
import {
    PiCar,
    PiCheckSquareOffset,
    PiClipboardText,
    PiClipboardTextBold,
    PiCreditCard,
    PiPath
} from 'react-icons/pi'
import { getInfoDetailCarTransaction, getListPaymentMode } from '@/services/cars/payment.services'
import { IInitialStatePayment } from '@/types/Initial/IInitial'
import PaymentMethods from './components/PaymentMethods'
import { CustomDataInfoRentalCar } from '@/custom/CustomData'
import { useDataInfoRentalCar, useDataPaymentRental } from '@/hooks/useDataQueryKey'
import { useSearchParams } from 'next/navigation'

type Props = {
    params: {
        slug: string
    }
}

const InfoRentalCar = ({ params }: Props) => {
    const searchParams = useSearchParams()
    const typeCarDetail = searchParams.get('type')

    const [isMounted, setIsMounted] = useState<boolean>(false)
    const { isStatePaymentRental, queryKeyIsStatePaymentRental } = useDataPaymentRental()

    useEffect(() => {
        setIsMounted(true)
    }, [])



    useEffect(() => {
        const fetchListPaymentMode = async () => {
            const { data } = await getListPaymentMode();

            const indexFirstArray = data.data.findIndex((item: any) => item.type === 1)

            if (data && data.data) {
                queryKeyIsStatePaymentRental({
                    listPaymentMode: data.data,
                    payment: {
                        idActivePaymentMethod: data?.data[indexFirstArray]?.id,
                        indexPaymentMethod: indexFirstArray
                    }
                })
            }
        }

        const fetchPriceWithCar = async () => {
            const dataParams = {
                type: (typeCarDetail === "1" || typeCarDetail === "2") ? parseInt(typeCarDetail) : null
            }

            const { data } = await getInfoDetailCarTransaction(params?.slug, dataParams);

            if (data && data.data && data.base) {
                let { customDataInfoRentalCar } = CustomDataInfoRentalCar(data)

                queryKeyIsStatePaymentRental({
                    detailRentalCar: customDataInfoRentalCar
                })
            }
        }

        fetchListPaymentMode()
        fetchPriceWithCar()
    }, [params.slug])

    if (!isMounted) {
        return null
    }

    return (
        <div className='bg-[#F6F6F8]'>
            <PaymentMethods />
        </div>
    )
}

export default InfoRentalCar