import { FormatNumberDot } from '@/components/format/FormatNumber'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useDataPaymentRental } from '@/hooks/useDataQueryKey'
import { toastCore } from '@/lib/toast'
import { postPaymentRentalCar } from '@/services/cars/payment.services'
import { IInitialStatePayment } from '@/types/Initial/IInitial'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { BsArrow90DegLeft } from 'react-icons/bs'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { PiCheckCircleFill } from 'react-icons/pi'

type Props = {}

const PaymentMethods = ({ }: Props) => {
    const router = useRouter()
    const { isStatePaymentRental, queryKeyIsStatePaymentRental } = useDataPaymentRental()

    const handleChangePayment = (item: any, index: number) => {
        queryKeyIsStatePaymentRental({
            payment: {
                idActivePaymentMethod: item.id,
                indexPaymentMethod: index
            }
        })
    }

    const handleSubmitPayment = async () => {
        try {
            const dataPayment = {
                payment_mode_id: isStatePaymentRental?.payment?.idActivePaymentMethod,
                total: isStatePaymentRental?.detailRentalCar?.price?.price_depoist,
                transaction_id: isStatePaymentRental?.detailRentalCar?.id
            }
            const { data } = await postPaymentRentalCar(dataPayment)
            console.log('data :', data);
            if (data && data.result) {
                toastCore.success("Thanh toán cọc thành công!")
                router.push(`/info-rental-car/${isStatePaymentRental?.detailRentalCar?.id}`)
            } else {
                toastCore.error(data.message)
            }
        } catch (err) {
            throw err
        }
    }

    return (
        <div className="custom-container flex flex-col gap-4 py-10">
            <div className='text-4xl font-bold capitalize text-center'>
                Chọn phương thức thanh toán
            </div>

            <div className='flex lg:flex-row flex-col gap-8'>
                <div className='flex flex-col gap-4 xxl:w-[70%] xxl:max-w-[70%] lg:w-[65%] lg:max-w-[65%] w-full max-w-full h-full lg:order-none order-1'>
                    <div
                        onClick={() => router.back()}
                        className='flex items-center gap-2 text-[#039fdb] hover:text-[#039fdb]/80 cursor-pointer w-fit group hover:-translate-x-2 duration-200 transition'
                    >
                        <FaArrowLeftLong className="size-4" />
                        <div className='text-base font-medium'>
                            Trở về
                        </div>
                    </div>
                    <div className='3xl:text-base text-sm text-[#3E424E]'>
                        Vui lòng chọn phương thức thanh toán
                    </div>

                    <div className='flex flex-col gap-3'>
                        {
                            isStatePaymentRental?.listPaymentMode && isStatePaymentRental?.listPaymentMode?.map((item, index) => (
                                <div
                                    key={`payment-${item.id}`}
                                    className={`${isStatePaymentRental?.payment?.idActivePaymentMethod === item?.id ? "bg-[#F1FCFC] border-2 border-[#2FB9BD]" : "bg-white"} flex-flex-col px-4 py-3 rounded-xl caret-transparent cursor-pointer relative`}
                                    onClick={() => handleChangePayment(item, index)}
                                >
                                    <div className='flex items-center gap-4'>
                                        <div className='w-12 h-12'>
                                            <Image
                                                alt="logo_payment"
                                                src={item?.image ? item?.image : "/default/default.png"}
                                                width={100}
                                                height={100}
                                                className='w-full h-full object-contain'
                                            />
                                        </div>
                                        <div className='3xl:text-base text-sm font-semibold text-[#3E424E]'>
                                            {item?.name ? item?.name : ""}
                                        </div>
                                    </div>
                                    {
                                        isStatePaymentRental?.payment?.idActivePaymentMethod === item?.id && item?.type !== 1 &&
                                        <div className='flex flex-col gap-4'>
                                            <div className='flex items-center justify-between pb-3 border-b ml-16'>
                                                <div className='flex flex-col gap-1 max-w-[80%]'>
                                                    <div className='3xl:text-base text-sm text-[#585F71] font-semibold'>
                                                        Lưu thông tin thẻ
                                                    </div>
                                                    <div className='3xl:text-base text-sm text-[#50777E] font-medium space-x-1'>
                                                        <span>Lưu ý: Một số Ngân hàng sẽ</span>
                                                        <span className='text-red-500'>không cho phép</span>
                                                        <span>lưu thông tin thẻ ATM</span>
                                                    </div>
                                                </div>
                                                <div className='max-w-[20%]'>
                                                    <Switch id="airplane-mode" className='data-[state=checked]:bg-[#2FB9BD]' />
                                                </div>
                                            </div>

                                            <div className='flex items-center justify-between ml-16'>
                                                <div className='max-w-[50%]'>
                                                    <div className='3xl:text-base text-sm text-[#50777E] font-medium space-x-1'>
                                                        Thêm thông tin thẻ của bạn
                                                    </div>
                                                </div>

                                                <div className='max-w-[50%] w-full'>
                                                    <Button
                                                        type="button"
                                                        className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-[#1D1D1D] bg-[#9DF2EE] hover:bg-[#9DF2EE]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                                                    >
                                                        Thêm thẻ
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        isStatePaymentRental?.payment?.idActivePaymentMethod === item?.id &&
                                        <div className='absolute right-3 top-3'>
                                            <PiCheckCircleFill className='size-6 text-[#2FB9BD]' />
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div >

                <div className='flex flex-col 3xl:gap-4 lg:gap-2 gap-4 xxl:w-[30%] xxl:max-w-[30%] lg:w-[35%] lg:max-w-[35%] w-full max-w-full h-full lg:order-none order-2'>
                    <div className='3xl:p-6 p-4 border rounded-xl bg-white'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <div className='3xl:text-base text-sm text-[#8C93A3]'>
                                    Tổng tiền:
                                </div>

                                <div className='3xl:text-3xl text-2xl text-[#1EAAB1] font-semibold'>
                                    {FormatNumberDot(isStatePaymentRental?.detailRentalCar?.price?.price_depoist ? +isStatePaymentRental?.detailRentalCar?.price?.price_depoist : 0)}đ
                                </div>
                            </div>

                            {/* <div className='flex items-center justify-between'>
                                <div className='3xl:text-base text-sm text-[#8C93A3]'>
                                    Tiết kiệm:
                                </div>

                                <div className='3xl:text-xl text-lg text-[#B4B8C5] font-medium'>
                                    {FormatNumberDot(300000)}đ
                                </div>
                            </div> */}
                        </div>

                        <div className='flex flex-col gap-2 mt-4'>
                            <div className='3xl:text-base text-sm text-[#8C93A3]'>
                                Phương thức thanh toán
                            </div>
                            <div className='flex items-center gap-2 mb-4'>
                                <div className='w-12 h-12'>
                                    <Image
                                        src={isStatePaymentRental?.listPaymentMode?.[isStatePaymentRental.payment.indexPaymentMethod]?.image ? isStatePaymentRental?.listPaymentMode[isStatePaymentRental.payment.indexPaymentMethod]?.image : "/default/default.png"}
                                        alt="method"
                                        width={200}
                                        height={200}
                                        className='w-full h-full object-contain'
                                    />
                                </div>
                                <div className='3xl:text-base text-sm font-bold'>
                                    {/* Thanh toán qua Momo */}
                                    {isStatePaymentRental?.listPaymentMode[isStatePaymentRental.payment.indexPaymentMethod]?.name ? isStatePaymentRental?.listPaymentMode[isStatePaymentRental.payment.indexPaymentMethod]?.name : ""}
                                </div>
                            </div>
                            <Button
                                type="button"
                                className='py-4 w-full flex justify-center items-center 3xl:text-lg text-base text-white bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 transition-all duration-300 font-semibold rounded-xl caret-transparent'
                                onClick={handleSubmitPayment}
                            >
                                Thanh toán
                            </Button>
                        </div>

                        <div className='space-y-2 3xl:text-sm text-xs text-[#6F7689] mt-6'>
                            <div>
                                Trường hợp nhiều khách đặt xe cùng một thời điểm, hệ thống sẽ ưu tiên khách hàng thanh toán sớm nhất
                            </div>
                            <div>
                                Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền hoặc liên lạc bên ngoài trang web hoặc ngoài ứng dụng KANOWW
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PaymentMethods