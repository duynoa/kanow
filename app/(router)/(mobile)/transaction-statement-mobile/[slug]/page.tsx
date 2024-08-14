'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { FaStar } from 'react-icons/fa'
import { FaArrowLeftLong, FaCircleCheck } from 'react-icons/fa6'
import { TiArrowBackOutline, TiHeartFullOutline, TiLocation } from 'react-icons/ti'

import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import ConvertToSlug from '@/components/convertSlug/ConvertToSlug'

import { useResize } from '@/hooks/useResize'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FormatNumberDot, FormatNumberHundred, FormatNumberSpace, FormatNumberToDecimal, FormatNumberToThousands } from '@/components/format/FormatNumber'

import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import moment from 'moment'
import { getListDetailSyntheticTransaction } from '@/services/cars/historyPayment.services'
import { useAuth } from '@/hooks/useAuth'
import { endOfMonth, isSameMonth, isThisMonth, parse, startOfMonth } from 'date-fns'
import { IInitialTransactionStatement } from '@/types/Payment/IPaymentCar'

type Props = {
    params: {
        slug: string
    }
}

const TransactionStatement = ({ params }: Props) => {
    const initialState: IInitialTransactionStatement = {
        //    table giao dịch hoàn thành chuyến trong kỳ
        dataTableFinish: [],
        totalPriceTableFinish: {
            totalRevenueCustomer: 0,
            totalPriceDone: 0,
        },
        //    table giao dịch huỷ trong kỳ
        dataTableCancel: [],
        totalPriceTableCancel: {
            totalPriceDone: 0,
        },
        // table giao dịch rút/nộp tiền trong kỳ
        dataTableRequestWithdrawMoney: [],
        totalPriceTableRequestWithdrawMoney: {
            totalPriceDone: 0,
        },
        amountPrice: {
            opening_balance: 0,
            ending_balance: 0,
            balance_period: 0,
        },
        date: {
            startDate: "",
            endDate: "",
        }
    }

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const typeCarDetail = searchParams.get('type')

    const router = useRouter()
    const { isVisibleMobile, isVisibleTablet } = useResize()
    const { informationUser } = useAuth()

    const [isMounted, setIsMounted] = useState<boolean>(false)
    const [isState, setIsState] = useState<any>(initialState)

    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    const dataFake = {
        "startTime": 1706720400000,
        "endTime": 1709225999999,
        "openingBalance": 601599,
        "endingBalance": 546650,
        "transactionsFinished": [
            {
                "amount": 144000,
                "trip": {
                    "id": "H5LFMESZ",
                    "serviceType": 1,
                    "timeBooked": 1702123669729,
                    "timeEnded": 1707987278369,
                    "tripDateFrom": 1707008400000,
                    "tripDateTo": 1708002000000,
                    "price": 17100000,
                    "deposit": 7086612,
                    "payAfter": 14391000,
                    "promotion": 0,
                    "fee": 2565000,
                    "travelerName": "Thiệp Trần",
                    "carName": "TOYOTA VELOZ CROSS 2022",
                    "carLP": "51L-01035"
                },
                "type": 1,
                "timeCreated": 1707987278436
            },
            {
                "amount": 133000,
                "trip": {
                    "id": "59JWWC9T",
                    "serviceType": 1,
                    "timeBooked": 1707792151763,
                    "timeEnded": 1708183221442,
                    "tripDateFrom": 1708009200000,
                    "tripDateTo": 1708182000000,
                    "price": 1900000,
                    "deposit": 729200,
                    "payAfter": 1482000,
                    "promotion": 160000,
                    "fee": 285000,
                    "travelerName": "quang thanh",
                    "carName": "TOYOTA VELOZ CROSS 2022",
                    "carLP": "51L-01035"
                },
                "type": 1,
                "timeCreated": 1708183221606
            },
            {
                "amount": 124150,
                "trip": {
                    "id": "ANM4R4ST",
                    "serviceType": 1,
                    "timeBooked": 1708176299538,
                    "timeEnded": 1708266927897,
                    "tripDateFrom": 1708189200000,
                    "tripDateTo": 1708272000000,
                    "price": 1019000,
                    "deposit": 364950,
                    "payAfter": 742000,
                    "promotion": 160000,
                    "fee": 152850,
                    "travelerName": "NGUYEN DUC VINH",
                    "carName": "TOYOTA VELOZ CROSS 2022",
                    "carLP": "51L-01035"
                },
                "type": 1,
                "timeCreated": 1708266928014
            },
            {
                "amount": 145500,
                "trip": {
                    "id": "3GWU2LYH",
                    "serviceType": 1,
                    "timeBooked": 1708494666313,
                    "timeEnded": 1708847577519,
                    "tripDateFrom": 1708605000000,
                    "tripDateTo": 1708858800000,
                    "price": 2790000,
                    "deposit": 1095920,
                    "payAfter": 2226000,
                    "promotion": 160000,
                    "fee": 418500,
                    "travelerName": "Tất Thắng",
                    "carName": "TOYOTA VELOZ CROSS 2022",
                    "carLP": "51L-01035"
                },
                "type": 1,
                "timeCreated": 1708847577660
            }
        ],
        "transactionsOther": [
            {
                "amount": -601599,
                "comment": "Thanh toán yêu cầu rút tiền ngày 04/02/2024",
                "type": 21,
                "timeCreated": 1707130138318
            }
        ],
        "transactionsCanceled": [
            {
                "amount": 327391,
                "comment": "",
                "trip": {
                    "id": "NFDLTY2T",
                    "serviceType": 1,
                    "timeBooked": 1714544840073,
                    "timeEnded": 1714574534947,
                    "tripDateFrom": 1714939200000,
                    "tripDateTo": 1715009400000,
                    "price": 890000,
                    "deposit": 327391,
                    "payAfter": 666000,
                    "promotion": 120000,
                    "fee": 133500,
                    "travelerName": "Minh",
                    "carName": "TOYOTA VELOZ CROSS 2022",
                    "carLP": "51L-01035",
                    "reasonCanceled": "Khách thuê hủy chuyến"
                },
                "type": 3,
                "timeCreated": 1714728257820
            }
        ],
        "totalTripFinished": 4,
        "rating": 5,
        "responseRate": "100%",
        "responseTime": "5 phút",
        "acceptRate": "100%",
        "timeRequested": 0,
        "amount": 1554841,
        "accountNumber": "0071000701945",
        "accountName": "Nguyen dinh quang",
        "bankName": "Vietcombank",
        "bankProvince": "",
        "bankBranch": ""
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const getDateRange = (monthYear: string): string => {
            const date = parse(monthYear, 'MM_yyyy', new Date());
            const startDate = startOfMonth(date);
            const currentDate = new Date();
            let endDate;

            if (isSameMonth(date, currentDate)) {
                endDate = currentDate;
            } else {
                endDate = endOfMonth(date);
            }

            queryState({
                date: {
                    startDate: startDate,
                    endDate: endDate
                }
            })

            return `From ${moment(startDate).format('DD-MM-yyyy')} to ${moment(endDate).format('DD-MM-yyyy')}`;
        };

        const data = getDateRange(params.slug)

    }, [params.slug])


    useEffect(() => {
        const fetchListDetailSyntheticTransaction = async () => {
            try {
                const dataParams = {
                    month_search: params?.slug ? params?.slug : "",
                }

                const { data } = await getListDetailSyntheticTransaction(dataParams)

                if (data) {
                    const totalRevenueCustomer = data.transactionFinish.data.reduce((accumulator: any, currentValue: any) => { return accumulator + currentValue.cost.revenue_customer }, 0)
                    const totalPriceDoneFinish = data.transactionFinish.data.reduce((accumulator: any, currentValue: any) => { return accumulator + currentValue.cost.account_balance }, 0)
                    const totalPriceDoneCancel = data.transactionCancel.data.reduce((accumulator: any, currentValue: any) => { return accumulator + currentValue.cost.account_balance }, 0)

                    queryState({
                        dataTableFinish: data.transactionFinish.data,
                        totalPriceTableFinish: {
                            totalRevenueCustomer: totalRevenueCustomer,
                            totalPriceDone: totalPriceDoneFinish,
                        },
                        dataTableCancel: data.transactionCancel.data,
                        totalPriceTableCancel: {
                            totalPriceDone: totalPriceDoneCancel,
                        },
                        amountPrice: {
                            opening_balance: data.opening_balance,
                            ending_balance: data.ending_balance,
                            balance_period: data.balance_period,
                        }
                    })
                }

                // if (data && data.transactionFinish && data.transactionFinish.data) {
                //     const totalRevenueCustomer = data.transactionFinish.data.reduce((accumulator: any, currentValue: any) => { return accumulator + currentValue.cost.revenue_customer }, 0)
                //     const totalPriceDone = data.transactionFinish.data.reduce((accumulator: any, currentValue: any) => { return accumulator + currentValue.cost.account_balance }, 0)

                //     queryState({
                //         dataTableFinish: data.transactionFinish.data,
                //         totalPriceTableFinish: {
                //             totalRevenueCustomer: totalRevenueCustomer,
                //             totalPriceDone: totalPriceDone,
                //         }
                //     })
                // }

                // if (data && data.transactionCancel && data.transactionCancel.data) {
                //     const totalPriceDone = data.transactionCancel.data.reduce((accumulator: any, currentValue: any) => { return accumulator + currentValue.cost.account_balance }, 0)

                //     queryState({
                //         dataTableCancel: data.transactionCancel.data,
                //         totalPriceTableCancel: {
                //             totalPriceDone: totalPriceDone,
                //         }
                //     })
                // }

                // if (data && data.requestWithdrawMoney && data.requestWithdrawMoney.data) {

                // }

                // if (data && data.balance_period && data.ending_balance && data.opening_balance) {
                //     queryState({
                //         amountPrice: {
                //             opening_balance: data.opening_balance,
                //             ending_balance: data.ending_balance,
                //             balance_period: data.balance_period,
                //         }
                //     })
                // }

            } catch (err) {
                throw err
            }
        }

        fetchListDetailSyntheticTransaction()
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <div className='3xl:mx-44 mx-6 flex flex-col gap-6 my-6'>
            <div className='3xl:mx-44 2xl:mx-32 xl:mx-28 lg:mx-12 md:mx-10 flex flex-col items-center justify-center gap-6 relative'>
                <div onClick={() => router.back()} className='md:absolute flex md:items-center items-start md:w-fit w-full gap-2 top-0 left-0 cursor-pointer text-[#2FB9BD] hover:text-[#2FB9BD]/80 hover:-translate-x-2 duration-300 transition'>
                    <div className='max-w-[20%] size-5'>
                        <TiArrowBackOutline className='size-5' />
                    </div>
                    <span className='max-w-[80%]'>
                        Quay lại
                    </span>
                </div>
                <div className='3xl:text-3xl text-2xl font-bold'>
                    Sao kê chi tiết giao dịch
                </div>
                <div className='space-x-2 text-[#545454] flex items-center md:flex-row flex-col text-center'>
                    <div className='space-x-2'>
                        <span className='text-sm'>Từ ngày</span>
                        <span className='px-3 py-1 bg-[#F6F6F6] font-medium 2xl:text-base text-sm'>
                            {moment(isState?.date?.startDate).format("DD-MM-yyyy")}
                        </span>
                    </div>
                    <div className='space-x-2'>
                        <span className='text-sm'>Đến ngày</span>
                        <span className='px-3 py-1 bg-[#F6F6F6] font-medium 2xl:text-base text-sm'>
                            {moment(isState?.date?.endDate).format("DD-MM-yyyy")}
                        </span>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-5'>
                <div className='lg:col-span-2 lg:block col-span-5 flex flex-col w-full'>
                    <div className='flex items-center justify-between w-full'>
                        <div className='w-[40%] max-w-[40%] text-base font-semibold'>
                            Chủ xe
                        </div>
                        <div className='w-[60%] max-w-[60%] '>
                            <span className='bg-[#F6F6F6] px-4 py-1 w-fit text-[#545454] text-base font-medium'>
                                {informationUser?.fullname ? informationUser?.fullname : ""}
                            </span>
                        </div>
                    </div>
                    {/* <div className='flex items-center justify-between w-full'>
                        <div className='w-[40%] max-w-[40%] text-base font-semibold'>
                            Mã số
                        </div>
                        <div className='w-[60%] max-w-[60%] text-[#545454] text-base font-medium bg-[#F6F6F6] px-4 py-1'>
                            UQ7FVL
                        </div>
                    </div> */}
                </div>
                <div className='lg:col-span-3 hidden' />
            </div>

            {/* table1 */}
            <div className='flex flex-col gap-4 w-full border-b pb-4'>
                <div className='3xl:text-xl text-lg font-semibold'>
                    Chuyến đi hoàn thành trong kì
                </div>
                <div className='overflow-x-auto pb-2'>
                    <div className=' xl:min-w-full xl:max-w-full min-w-[1280px] max-w-[1280px] grid grid-cols-13'>
                        {/* header */}
                        <div className='col-span-13 grid grid-cols-13  w-full bg-[#7DF9FF]/30 border-r rounded-t-xl'>
                            <div className='col-span-4 grid grid-cols-4 grid-rows-3'>
                                <div className='col-span-4 row-span-1 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 py-1 rounded-tl-xl'>
                                    Thời gian
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Mã chuyến đi
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Ngày đi
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Ngày về
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Ngày đặt xe
                                </div>
                            </div>
                            <div className='col-span-4 grid grid-cols-4 grid-rows-3 '>
                                <div className='col-span-4 row-span-1 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 py-1'>
                                    Thông tin chuyến đi
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Khách hàng
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Xe thuê
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Biển số xe
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Đơn giá
                                </div>
                            </div>
                            <div className='col-span-2 grid grid-cols-2 grid-rows-3 '>
                                <div className='col-span-2 row-span-1 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 py-1'>
                                    Thanh toán
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Đặt cọc tại Kanow
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Thanh toán chủ xe
                                </div>
                            </div>
                            <div className='col-span-3 grid grid-cols-3'>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Kanow KM
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Phí vận hành
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2  rounded-tr-xl">
                                    Thay đổi số dư
                                </div>
                            </div>
                        </div>
                        {/* body */}
                        <div className='col-span-13 grid grid-cols-13 border-b border-r'>
                            {
                                isState?.dataTableFinish && isState?.dataTableFinish?.length > 0 && isState?.dataTableFinish?.map((item: any, index: number) => (
                                    <React.Fragment key={`id-${item.id}`}>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-4 grid grid-cols-4 grid-rows-2`}>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <Link
                                                    href={`/info-rental-car/${item.id}?type=${item.type}`}
                                                    className='3xl:text-sm text-[13px] text-[#2FB9BD] hover:text-[#2FB8BD]/80 cursor-pointer transition duration-300 w-full text-center'
                                                >
                                                    {item?.reference_no ? item?.reference_no : ""}
                                                </Link>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {moment(item?.date_start).format("DD/MM/YYYY")}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {moment(item?.date_end).format("DD/MM/YYYY")}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {moment(item?.date_create).format("DD/MM/YYYY")}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-4 grid grid-cols-4 grid-rows-2`}>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {item?.customer?.fullname}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {item?.car?.name}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberDot(item?.car?.number_car)}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.amount)}đ
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-2 grid grid-cols-2 grid-rows-2`}>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.depoist)}đ
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.payment_customer)}đ
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-3 grid grid-cols-3`}>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.promotion)}đ
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.service)}đ
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.account_balance)}đ
                                                </span>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className='col-span-12 grid grid-cols-12'>
                    <div className='2xl:col-span-8 lg:col-span-6 lg:block hidden ' />
                    <div className='2xl:col-span-4 lg:col-span-6 col-span-12 flex flex-col gap-2 w-full'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='w-[60%] max-w-[60%] text-[#545454] text-[15px] font-semibold'>
                                Tổng thay đổi - Chuyến đi hoàn thành
                            </div>
                            <div className='w-[40%] max-w-[40%] text-[#545454] text-[15px] text-end font-semibold'>
                                {FormatNumberSpace(isState?.totalPriceTableFinish?.totalPriceDone)} đ
                            </div>
                        </div>
                        <div className='flex items-center justify-between w-full'>
                            <div className='w-[60%] max-w-[60%] text-[15px] text-[#2FB9BD] font-bold'>
                                Thu nhập của chủ xe
                            </div>
                            <div className='w-[40%] max-w-[40%] text-[#2FB9BD] text-[15px] text-end font-bold'>
                                {FormatNumberSpace(isState?.totalPriceTableFinish?.totalRevenueCustomer)} đ
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* table2 */}
            <div className='flex flex-col gap-4 w-full border-b pb-4'>
                <div className='3xl:text-xl text-lg font-semibold'>
                    Giao dịch rút/nộp tiền trong kì
                </div>
                <div className='grid grid-cols-12'>
                    <div className='2xl:col-span-5 lg:col-span-7 col-span-12'>
                        {/* header */}
                        <div className='2xl:col-span-5 lg:col-span-7 col-span-12 grid grid-cols-10  w-full bg-[#7DF9FF]/30 border-r rounded-t-xl'>
                            <div className='col-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 py-1 rounded-tl-xl'>
                                Ngày giao dịch
                            </div>

                            <div className='col-span-6 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 py-1'>
                                Nội dung
                            </div>

                            <div className='col-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 py-1 rounded-tr-xl'>
                                Thay đổi số dư
                            </div>
                        </div>
                        {/* body */}
                        <div className='2xl:col-span-5 lg:col-span-7 col-span-12 grid grid-cols-10 border-b border-r'>
                            {
                                dataFake.transactionsOther.map((item, index) => (
                                    <React.Fragment key={`index-${index}`}>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2`}>
                                            <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                {moment(item.timeCreated).format("DD/MM/YYYY")}
                                            </span>
                                        </div>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-6 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2`}>
                                            <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                {item.comment}
                                            </span>
                                        </div>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2`}>
                                            <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                {FormatNumberSpace(item.amount)}đ
                                            </span>
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                        <div className='2xl:col-span-5 lg:col-span-7 col-span-12 grid grid-cols-5 mt-4'>
                            <div className='col-span-1' />
                            <div className='col-span-4 flex flex-col gap-2 w-full'>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='w-[70%] max-w-[70%] text-[#545454] text-[15px] font-semibold'>
                                        Tổng thay đổi - Giao dịch rút/nộp tiền
                                    </div>
                                    <div className='w-[30%] max-w-[30%] text-[#545454] text-[15px] text-end font-semibold'>
                                        {FormatNumberSpace(-601599)} đ
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='2xl:col-span-7 lg:col-span-5 lg:block hidden' />
                </div>

            </div>

            {/* table3 */}
            <div className='flex flex-col gap-4 w-full border-b pb-4'>
                <div className='3xl:text-xl text-lg font-semibold'>
                    Giao dịch hủy chuyến trong kì
                </div>
                <div className='overflow-x-auto pb-2'>
                    <div className='xl:min-w-full xl:max-w-full min-w-[1280px] max-w-[1280px] grid grid-cols-13'>
                        {/* header */}
                        <div className='col-span-13 grid grid-cols-13  w-full bg-[#7DF9FF]/30 border-r rounded-t-xl'>
                            <div className='col-span-4 grid grid-cols-4 grid-rows-3 '>
                                <div className='col-span-4 row-span-1 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 py-1 rounded-tl-xl'>
                                    Thời gian
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Mã chuyến đi
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Ngày đi
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Ngày về
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-center text-[15px] border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Ngày đặt xe
                                </div>
                            </div>
                            <div className='col-span-4 grid grid-cols-4 grid-rows-3 '>
                                <div className='col-span-4 row-span-1 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 py-1'>
                                    Thông tin chuyến đi
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Khách hàng
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Xe thuê
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Biển số xe
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Đơn giá
                                </div>
                            </div>
                            <div className='col-span-2 grid grid-cols-2 grid-rows-3 '>
                                <div className='col-span-2 row-span-1 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 py-1'>
                                    Thanh toán
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Đặt cọc tại Kanow
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Thanh toán chủ xe
                                </div>
                            </div>
                            <div className='col-span-3 grid grid-cols-3'>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Nội dung huỷ chuyến
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                    Hoàn tiền/Đền cọc
                                </div>
                                <div className="col-span-1 row-span-2 text-[#545454]/80 font-medium flex items-center justify-center text-[15px] text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2 rounded-tr-xl">
                                    Thay đổi số dư
                                </div>
                            </div>
                        </div>
                        {/* body */}
                        <div className='col-span-13 grid grid-cols-13 border-b border-r'>
                            {
                                isState?.dataTableCancel && isState?.dataTableCancel?.length > 0 && isState?.dataTableCancel?.map((item: any, index: number) => (
                                    <React.Fragment key={`id_cancel_${item.id}`}>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-4 grid grid-cols-4 grid-rows-2`}>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <Link
                                                    href={`/info-rental-car/${item.id}?type=${item.type}`}
                                                    className='3xl:text-sm text-[13px] text-[#2FB9BD] hover:text-[#2FB8BD]/80 cursor-pointer transition duration-300 w-full text-center'
                                                >
                                                    {item?.reference_no}
                                                </Link>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {moment(item?.date_start).format("DD/MM/YYYY")}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {moment(item?.date_end).format("DD/MM/YYYY")}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {moment(item?.date_create).format("DD/MM/YYYY")}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-3 grid grid-cols-3 grid-rows-2`}>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {item?.customer?.fullname}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {item?.car?.name}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberDot(item?.car?.number_car)}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.amount)}đ
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-2 grid grid-cols-2 grid-rows-2`}>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.depoist)}đ
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.payment_customer)}đ
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`${index % 2 !== 0 ? "bg-[#F6F6F6]/20" : "bg-white"} col-span-3 grid grid-cols-3`}>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {item?.note ? item?.note : ""}
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.refund_money)}đ
                                                </span>
                                            </div>
                                            <div className="col-span-1 row-span-2 text-[#545454] font-medium flex items-center justify-center text-center border border-r-0 border-b-0 3xl:py-[6px] 3xl:px-3 py-[4px] px-2">
                                                <span className='3xl:text-sm text-[13px] font-normal w-full text-center'>
                                                    {FormatNumberSpace(item?.cost?.account_balance)}đ
                                                </span>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className='col-span-12 grid grid-cols-12'>
                    <div className='2xl:col-span-8 lg:col-span-6 lg:block hidden' />
                    <div className='2xl:col-span-4 lg:col-span-6 col-span-12 flex flex-col gap-2 w-full'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='w-[60%] max-w-[60%] text-[#545454] text-[15px] font-semibold'>
                                Tổng thay đổi - Giao dịch hủy chuyến
                            </div>
                            <div className='w-[40%] max-w-[40%] text-[#545454] text-[15px] text-end font-semibold'>
                                {FormatNumberSpace(isState?.totalPriceTableCancel?.totalPriceDone)} đ
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2 bg-[#F6F6F6] py-3 px-6 rounded-md'>
                <div className='flex items-center justify-between'>
                    <div className='text-sm uppercase text-[#545454] font-bold'>
                        Tổng cộng thay đổi trong kì
                    </div>
                    <div className='text-sm text-[#545454] font-bold'>
                        {FormatNumberSpace(isState?.amountPrice?.balance_period)}đ
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='text-sm uppercase text-[#545454] font-bold'>
                        Tiền đầu kì
                    </div>
                    <div className='text-sm text-[#545454] font-bold'>
                        {FormatNumberSpace(isState?.amountPrice?.opening_balance)}đ
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='text-sm uppercase text-[#2FB9BD] font-bold'>
                        Tiền cuối kì
                    </div>
                    <div className='text-sm text-[#2FB9BD] font-bold'>
                        {FormatNumberSpace(isState?.amountPrice?.ending_balance)}đ
                    </div>
                </div>
            </div>

            <div className='text-sm text-[#545454] font-normal'>
                Ghi chú: Mọi vấn đề thắc mắc về thông tin ghi nhận trên bản sao kê chi tiết giao dịch, Quý đối tác vui lòng liên hệ với bộ phận Chăm Sóc Khách Hàng của Kanow tại 1900 252 228 để biết thêm chi tiết. Xin cám ơn!
            </div>
        </div>
    )
}

export default TransactionStatement