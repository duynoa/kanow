'use client'

import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { FaRegQuestionCircle } from 'react-icons/fa'
import FormInfo from './components/formInfo'
import FormPapers from './components/formPapers'
import Image from 'next/image'
import { uuidv4 } from '@/lib/uuid'
import SessionStarRating from './components/SessionStarRating'
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
        }],
        totalStar: 1
    }
    const [isState, sIsState] = useState<StatePageAccount>(initialSate)


    const queryState = (key: any) => sIsState((prev: StatePageAccount) => ({ ...prev, ...key }))

    const form = useForm({
        defaultValues: {
            lastName: "",
            name: "",
            dateInfo: new Date(),
            gender: "male",
            email: "",
            phone: "",
            namePapers: "",
            numberPapers: "",
            datePapers: new Date(),
            filePapers: null
        },
    });
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

        console.log("values : ", values);
        console.log("type : ", type);

    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex flex-col gap-8 mb-12">
            {/* helo */}
            <div className="rounded-2xl bg-white">
                <div className="p-8">
                    <div className="3xl:flex xxl:flex 2xl:flex xl:flex lg:flex md:flex sm:flex  justify-between">
                        <h1 className='text-[#3E424E] 2xl:text-2xl lg:text-xl md:text-base sm:text-sm text-sm  font-semibold'>Thông tin tài khoản</h1>
                        <div className='flex items-center gap-5'>
                            <Button onClick={() => {
                                if (isState.editInfo) {
                                    form.handleSubmit((values) => onSubmit(values, 'editInfo'))()
                                } else {
                                    handleClickButtonEdit('editInfo')
                                }
                            }
                            }
                                className={`${isState.editInfo ? "bg-[#2FB9BD]/80 text-white hover:bg-[#2FB9BD]/80" : "hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD]"} md:w-fit w-full 3xl:text-lg 2xl:text-base lg:text-md md:text-xs sm:text-[11px] lg:px-8 px-5 2xl:py-3 xl:py-2 py-2 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                {isState.editInfo ? 'Cập nhật' : "Chỉnh sửa"}
                            </Button>
                            {isState.editInfo &&
                                <Button
                                    type='button'
                                    onClick={() => handleClickButtonEdit('editInfo')} className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full 3xl:text-lg 2xl:text-base lg:text-md md:text-xs sm:text-[11px] lg:px-8 px-5 2xl:py-3 xl:py-2 py-2 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                    Hủy
                                </Button>
                            }
                        </div>
                    </div>
                    <FormInfo form={form} isState={isState} />
                </div>
            </div>
            <div className="rounded-2xl bg-white">
                <div className="p-8 flex flex-col gap-8">
                    <div className="flex justify-between">
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center lg:gap-4 md:gap-1 sm:gap-1'>
                                <h1 className='text-[#3E424E] 2xl:text-2xl lg:text-xl md:text-base sm:text-sm text-sm  font-semibold '>Giấy phép lái xe </h1>
                                <span className='bg-[#FA3434] rounded-2xl ml-1 text-white  py-1 lg:px-4 px-2 text-xs 2xl:text-xs lg:text-[9px] md:text-[8px] sm:text-[8px] text-[8px]  font-normal'>Chưa xác thực</span>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <h4 className='text-[#3E424E] font-normal text-base 2xl:text-base lg:text-sm md:text-xs sm:text-[8px]'>
                                    Vì sao tôi phải xác thực GPLX
                                </h4>
                                <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <Button onClick={() => {
                                if (isState.editPapers) {
                                    form.handleSubmit((values) => onSubmit(values, 'editPapers'))()
                                } else {
                                    handleClickButtonEdit('editPapers')
                                }
                            }
                            }
                                className={`${isState.editPapers ? "bg-[#2FB9BD]/80 text-white hover:bg-[#2FB9BD]/80" : "hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD]"} md:w-fit w-full 3xl:text-lg 2xl:text-base lg:text-md md:text-xs sm:text-[11px] lg:px-8 px-5 xl:py-3 py-2 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                {isState.editPapers ? 'Cập nhật' : "Chỉnh sửa"}
                            </Button>
                            {isState.editPapers &&
                                <Button
                                    type='button'
                                    onClick={() => handleClickButtonEdit('editPapers')} className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full 3xl:text-lg 2xl:text-base lg:text-md md:text-xs sm:text-[11px] lg:px-8 px-5 xl:py-3 py-2 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                    Hủy
                                </Button>
                            }
                        </div>
                    </div>
                    <FormPapers form={form} isState={isState} />
                </div>
            </div>
            <div className="rounded-2xl bg-white">
                <div className="p-8 flex flex-col gap-8">
                    <h1 className='text-[#3E424E] 2xl:text-2xl lg:text-xl md:text-base sm:text-sm text-sm font-semibold '>Danh sách xe</h1>
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