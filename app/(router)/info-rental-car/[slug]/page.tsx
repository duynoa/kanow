'use client'

import React, { useEffect, useState } from 'react'

import { DialogAnswerPolicy } from '@/components/modals/DialogAnswerPolicy'
import { IInitialStateDetailCar } from '@/types/Cars/ICars'

import { useCookie } from '@/hooks/useCookie'
import {
    PiCar,
    PiCheckSquareOffset,
    PiClipboardTextFill,
    PiCreditCard,
    PiPath
} from 'react-icons/pi'

type Props = {
    params: {
        slug: string
    }
}

const InfoRentalCar = ({ params }: Props) => {
    const { getCookie } = useCookie()
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const dataStep = [
        {
            id: 1212,
            title: "Gửi yêu cầu",
            icon: <PiClipboardTextFill />
        },
        {
            id: 1214142,
            title: "Duyệt yêu cầu",
            icon: <PiCheckSquareOffset />
        },
        {
            id: 121552,
            title: "Thanh toán cọc",
            icon: <PiCreditCard />
        },
        {
            id: 1212,
            title: "Khởi hành",
            icon: <PiCar />
        },
        {
            id: 1212,
            title: "Kết thúc",
            icon: <PiPath />
        },
    ]

    const initialState: IInitialStateDetailCar = {
        dataDetailCar: {
            id: "",
            address: "",
            image_car: [],
            car_owner: {
                avatar: "",
                fullname: "",
                id: "",
            },
            type: {
                delivery_car: false,
                book_car_flash: false,
                mortgage: false,
                transmission_search: "",
            },
            favorite_car: false,
            name_car: "",
            point_star: 0,
            total_trip: 0,
            price: {
                price_before_promotion: 0,
                price_after_promotion: 0,

                rent_cost_day: 0,
                price_insurance_day: 0,
                temp_total_amount: 0,
                total_amount: 0,

                max_money_discount: 0,
            },
            promotion: [],
            trait_car: {
                number_seat: 0,
                number_car: "",
                type_fuel: "",
                year_manu: "",
            },
            describe_car: "",
            other_amenities_car: [],
            info_review_car: {
                review_car: [],
                star: 0,
                total_review_car: 0,
            },
            collateral_car: {
                mortgage: 0,
                mortgage_policy_car: "",
                note_mortgage: "",
            },
            surcharge_car: [],
            cancel_trip: {
                title_cancel_trip: "",
                compensation_refund: "",
                note_cancel_trip: "",
                policy_cancel_trip: [],
            },
            policy: {
                car_rental_policy: "",
                car_collateral_policy: "",
                car_insurance_policy: "",
                car_price_policy: "",
            },
        },
        infoPromotion: {
            selectPromotion: "0",
            activePromotion: null,
        },
        listCarsRelated: [],
        reportCar: {
            listReportCar: [],
            selectReportCar: "",
            contentReportCar: ""
        },
        onSuccess: {
            onSuccessPage: false
        }
    };

    const [isState, setIsState] = useState<IInitialStateDetailCar>(initialState)
    const queryKeyIsState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    useEffect(() => {
        setIsMounted(true)
    }, [])

    console.log('params slug :', params.slug);

    if (!isMounted) {
        return null
    }

    return (
        <>
            <div className='w-full max-w-full bg-white/50'>
                <div className='space-x-1 text-center 3xl:text-4xl md:text-3xl text-2xl font-bold text-[#101010] 3xl:py-8 py-6 custom-container'>
                    {
                        dataStep?.map((step) => (
                            <div key={step.id} className='flex fleex--col gap-2'>

                            </div>
                        ))
                    }
                </div>
            </div>

            {/*<div className='custom-container 3xl:mt-8 mt-4 flex lg:flex-row flex-col gap-6'>
                <InfomationCar
                    isState={isState}
                    queryKeyIsState={queryKeyIsState}
                    params={params}
                    handleClickFavorite={handleClickFavorite}
                />

                <PaymentCar
                    isState={isState}
                    queryKeyIsState={queryKeyIsState}
                />
            </div>*/}

            <DialogAnswerPolicy
                isState={isState}
                queryKeyIsState={queryKeyIsState}
            />
        </>
    )
}

export default InfoRentalCar