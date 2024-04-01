'use client'
import Image from 'next/image'
import { uuidv4 } from '@/lib/uuid'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'

import { Button } from "@/components/ui/button"
import SessionStarRating from './components/SessionStarRating'
import apiAccount from '@/services/account/account.services'
import { useAuth } from '@/hooks/useAuth'
import moment from 'moment'
import { toastCore } from '@/lib/toast'
import useAuthenticationAPI from '@/services/auth/auth.services'
import FormInfo from './components/FormInfo'
import FormPapers from './components/FormPapers'

type Props = {}

type Rating = {
    id: any,
    avatar: string,
    name: string,
    date: any,
    content: string,
    star: number

}
export interface StatePageAccount {
    editInfo: boolean
    editPapers: boolean,
    dataStarRatings: Rating[],
    totalStar: number
}
const Account = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const initialSate: StatePageAccount = {
        editInfo: false,
        editPapers: false,
        dataStarRatings: [{
            id: uuidv4(),
            avatar: '/avatar/avatar1.png',
            name: 'Huy Tran',
            date: new Date(),
            content: "Xe tốt",
            star: 3
        },

        {
            id: uuidv4(),
            avatar: '/avatar/avatar1.png',
            name: 'Huy Tran Dac',
            date: new Date(),
            content: "Xe tốt",
            star: 3
        }
        ],
        totalStar: 1
    }

    const [isState, sIsState] = useState<StatePageAccount>(initialSate)

    const { informationUser, setInformationUser } = useAuth()

    const { apiInfoUser } = useAuthenticationAPI()

    const { apiUpdateInfo } = apiAccount()

    const queryState = (key: any) => sIsState((prev: StatePageAccount) => ({ ...prev, ...key }))

    const form = useForm({
        defaultValues: {
            fullName: "",
            dateInfo: new Date(),
            gender: informationUser?.gender == 1 ? "male" : "girl",
            email: "",
            phone: "",
            //giay phep lai xe
            namePapers: "",
            numberPapers: "",
            datePapers: new Date(),
            filePapers: null
        },
    });


    useEffect(() => {
        if (informationUser) {
            const newData = [
                {
                    name: 'fullName', value: informationUser?.fullname
                },
                {
                    name: 'dateInfo', value: informationUser?.birthday
                },
                {
                    name: 'email', value: informationUser?.email
                },
                {
                    name: 'phone', value: informationUser?.phone
                },
                {
                    name: 'gender', value: informationUser?.gender == 1 ? "male" : "girl"
                },
                {
                    name: 'namePapers', value: informationUser?.drivingLiscense?.fullname
                },
                {
                    name: 'numberPapers', value: informationUser?.drivingLiscense?.number_liscense
                },
                {
                    name: 'datePapers', value: informationUser?.drivingLiscense?.birthday
                },
                {
                    name: 'filePapers', value: informationUser?.drivingLiscense?.image
                }
            ]
            newData.forEach((item: any) => {
                form.setValue(item.name, item.value)
            })
        }
    }, [informationUser])


    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleClickButtonEdit = (type: string) => {
        if (type === "editInfo") {
            queryState({ editInfo: !isState.editInfo })
        } else {
            queryState({ editPapers: !isState.editPapers })
        }
    }

    const onSubmit = async (values: any, type: any) => {
        let form: any = new FormData();
        let success = false

        if (type === 'editInfo') {
            form.append('email', values.email ?? '')
            form.append('phone', values.phone ?? "")
            form.append('fullname', values.fullName ?? "")
            form.append('gender', values.gender === 'male' ? 1 : 2)
            form.append('birthday', moment(values.dateInfo).format('DD/MM/YYYY') ?? null)
        } else {
            form.append('image', values.filePapers ?? "")
            form.append('drivingLiscense[fullname]', values.namePapers ?? "")
            form.append('drivingLiscense[number_liscense]', values.numberPapers ?? "")
            form.append('drivingLiscense[driving_liscense_id]', informationUser.drivingLiscense.id ?? "")
            form.append('drivingLiscense[birthday]', moment(values.datePapers).format('DD/MM/YYYY') ?? null ?? "")
        }
        const { data: { message, result } } = await apiUpdateInfo(form)
        if (result) {
            toastCore.success(message)
            success = true
            type === 'editInfo' && queryState({ editInfo: !isState.editInfo })
            type === 'editPapers' && queryState({ editPapers: !isState.editPapers })
        } else {
            toastCore.error(message)
        }
        if (success) {
            const { data: information } = await apiInfoUser()
            if (information?.result) {
                setInformationUser(information?.info);
            }
            success = false
        }

    }


    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex flex-col gap-8">
            {/* helo */}
            <div className="rounded-2xl bg-white">
                <div className="md:p-8 p-6">
                    <div className="flex md:flex-row flex-col justify-between">
                        <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Thông tin tài khoản</h1>
                        <div className='flex items-center gap-5 md:my-0 my-5'>
                            <Button onClick={() => {
                                if (isState.editInfo) {
                                    form.handleSubmit((values) => onSubmit(values, 'editInfo'))()
                                } else {
                                    handleClickButtonEdit('editInfo')
                                }
                            }
                            }
                                className={`${isState.editInfo ? "bg-[#2FB9BD]/80 text-white hover:bg-[#2FB9BD]/80" : "hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD]"} md:w-fit w-full text-sm lg:px-8 px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                {isState.editInfo ? 'Cập nhật' : "Chỉnh sửa"}
                            </Button>
                            {isState.editInfo &&
                                <Button
                                    type='button'
                                    onClick={() => handleClickButtonEdit('editInfo')} className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8 px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                    Hủy
                                </Button>
                            }
                        </div>
                    </div>
                    <FormInfo form={form} isState={isState} />
                </div>
            </div>
            <div className="rounded-2xl bg-white">
                <div className="md:p-8 p-6 flex flex-col md:gap-6">
                    <div className="flex md:flex-row flex-col md:gap-0 gap-2 justify-between">
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center md:gap-4 gap-2'>
                                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold '>Giấy phép lái xe </h1>
                                <span className='bg-[#FA3434] rounded-2xl ml-1 text-white  py-1 px-4 text-xs  font-normal'>Chưa xác thực</span>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <h4 className='text-[#3E424E] font-normal lg:text-base text-sm'>
                                    Vì sao tôi phải xác thực GPLX
                                </h4>
                                <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                            </div>
                        </div>
                        <div className='flex items-center gap-5 md:my-0 my-5'>
                            <Button onClick={() => {
                                if (isState.editPapers) {
                                    form.handleSubmit((values) => onSubmit(values, 'editPapers'))()
                                } else {
                                    handleClickButtonEdit('editPapers')
                                }
                            }
                            }
                                className={`${isState.editPapers ? "bg-[#2FB9BD]/80 text-white hover:bg-[#2FB9BD]/80" : "hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD]"} md:w-fit w-full text-sm lg:px-8 px-5 xl:py-3 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                {isState.editPapers ? 'Cập nhật' : "Chỉnh sửa"}
                            </Button>
                            {isState.editPapers &&
                                <Button
                                    type='button'
                                    onClick={() => handleClickButtonEdit('editPapers')} className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8 px-5 xl:py-3 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                    Hủy
                                </Button>
                            }
                        </div>
                    </div>
                    <FormPapers form={form} isState={isState} />
                </div>
            </div>
            <div className="rounded-2xl bg-white">
                <div className="md:p-8 p-6 flex flex-col gap-8">
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl font-semibold '>Danh sách xe</h1>
                    <Image src={'/card/no_car.png'} alt="logo" width={1280} height={1024} className='w-full h-full object-cover'></Image>
                </div>
            </div>
            <div className="rounded-2xl bg-white">
                <SessionStarRating isState={isState} />
            </div>
        </div >
    )
}

export default Account