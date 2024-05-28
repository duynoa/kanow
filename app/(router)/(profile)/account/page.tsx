'use client'
import moment from 'moment'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'

import { toastCore } from '@/lib/toast'
import { useAuth } from '@/hooks/useAuth'
import Nodata from '@/components/image/Nodata'
import { Button } from "@/components/ui/button"
import FormPapers from './components/FormPapers'
import FormInformation from './components/FormInfomation'
import { StatePageAccount } from '@/types/Profile/IAccount'
import SessionStarRating from './components/SessionStarRating'
import useAuthenticationAPI from '@/services/auth/auth.services'
import apiAccount from '@/services/profile/account/account.services'
import BackgroundUiProfile from '@/themes/profile/BackgroundUiProfile'
import { ActionTooltip } from '@/components/tooltip/ActionTooltip'
import { useDataPolicy } from '@/hooks/useDataQueryKey'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
type Props = {}


const Account = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const initialSate: StatePageAccount = {
        editInfo: false,
        editPapers: false,
        dataStarRatings: [],
        type: "",
        //danh gia
        totalStar: 0,
        totalReview: 0,
        ///phan trang danh gia
        page: 1,
        limit: 5,
        tabRatings: "1",
        nextPage: "",
        loadingData: false
    }

    const { apiInfoUser } = useAuthenticationAPI()

    const { isStatePolicy } = useDataPolicy()

    const { informationUser, setInformationUser } = useAuth()

    const { apiUpdateInfo, apiPaginationStartingUser, apiListRatings } = apiAccount()

    const [isState, sIsState] = useState<StatePageAccount>(initialSate)

    const queryState = (key: any) => sIsState((prev: StatePageAccount) => ({ ...prev, ...key }))

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const form = useForm({
        defaultValues: {
            fullName: informationUser?.fullname ?? "",
            dateInfo: informationUser?.birthday ?? null,
            gender: informationUser?.gender == 1 && "male" || informationUser?.gender == 2 && "girl",
            email: informationUser?.email ?? "",
            phone: informationUser?.phone ?? "",
            //giay phep lai xe
            namePapers: informationUser?.drivingLiscense?.fullname ?? "",
            numberPapers: informationUser?.drivingLiscense?.number_liscense ?? '',
            datePapers: informationUser?.drivingLiscense?.birthday ?? null,
            filePapers: informationUser?.drivingLiscense?.image ?? null
        },
    });


    const onSetValue = (informationUser: any, type: string) => {
        const editInfo = [
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
                name: 'gender', value: informationUser?.gender == 1 && "male" || informationUser?.gender == 2 && "girl"
            },
        ]
        const editPapers = [
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

        let newData: any[] = []

        if (type == 'all') {
            newData = [...editInfo, ...editPapers]
        } else if (type == 'editInfo') {
            newData = editInfo
        } else {
            newData = editPapers
        }
        newData.forEach((item: any) => {
            form.setValue(item.name, item.value)
        })
    }

    const dataStarRatings = (array: any[]) => {
        const data = array.map((item: any) => {
            return {
                id: item?.id,
                avatar: item?.avatar ? item?.avatar : '/avatar/avatar1.png',
                name: item?.customer_name,
                date: item?.date,
                content: item?.content,
                star: item?.star
            }
        })
        return data
    }


    const handleClickButtonEdit = (type: string) => {
        form.clearErrors()
        queryState({ type: type })
        onSetValue(informationUser, type)
        if (type === "editInfo") {
            queryState({ editInfo: !isState.editInfo })
        } else {
            queryState({ editPapers: !isState.editPapers })
        }
    }

    const onSubmit = async (values: any, type: any) => {
        let form: any = new FormData();
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
            form.append('drivingLiscense[driving_liscense_id]', informationUser?.drivingLiscense?.id ?? "")
            form.append('drivingLiscense[birthday]', moment(values.datePapers).format('DD/MM/YYYY') ?? null ?? "")
        }


        const { data: { message, result } } = await apiUpdateInfo(form)
        if (result) {
            toastCore.success(message)
            const { data: information } = await apiInfoUser()
            if (information?.result) {
                setInformationUser(information?.info);
            }
            type === 'editInfo' && queryState({ editInfo: !isState.editInfo })
            type === 'editPapers' && queryState({ editPapers: !isState.editPapers })
            return
        }
        toastCore.error(message)
    }

    const fetChDataRatings = async (page: any) => {
        let form: any = new FormData();
        form.append('current_page', page)
        form.append('per_page', isState.limit)
        form.append('type_review', isState.tabRatings)
        queryState({ loadingData: true })
        const { data } = await apiListRatings(form)
        if (data?.data) {
            const newData = dataStarRatings(data?.data)
            queryState({
                dataStarRatings: newData,
                totalReview: data?.total_review,
                totalStar: data?.star_avg,
                nextPage: data?.links?.next,
            })
            queryState({ loadingData: false })
            return
        }
    }
    const handleNextPage = async () => {
        let form: any = new FormData();
        form.append('current_page', isState.page)
        form.append('per_page', isState.limit)
        form.append('type_review', isState.tabRatings)
        const { data } = await apiListRatings(form)

        if (data?.data) {
            const newData = dataStarRatings(data?.data)
            queryState({
                dataStarRatings: [...isState.dataStarRatings, ...newData],
                nextPage: data?.links?.next,
            })
            return
        }
    }

    useEffect(() => {
        if (isState.page != 1) {
            handleNextPage()
        }
        if (isState.page == 1) {
            fetChDataRatings(1)
        }
    }, [isState.page, isState.tabRatings])



    const handleClickOptionsButton = async (type: string) => {
        const checkKey: any = {
            editInfo: isState.editInfo,
            editPapers: isState.editPapers
        }
        if (checkKey[type]) {
            queryState({ type: type })
            // delay để  nó set xong type rồi mới submit mục đích rào submit
            await new Promise((resolve) => setTimeout(resolve, 100))
            form.handleSubmit((values) => onSubmit(values, `${type}`))()
            return
        }
        handleClickButtonEdit(`${type}`)
        form.clearErrors()
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div className="flex flex-col gap-8">
            {/* helo */}
            <BackgroundUiProfile>
                <div className="flex md:flex-row flex-col justify-between">
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Thông tin tài khoản</h1>
                    <div className='flex items-center gap-5 md:my-0 my-5'>
                        <Button onClick={() => {
                            handleClickOptionsButton('editInfo')
                        }}
                            className={`${isState.editInfo ? "bg-[#2FB9BD]/80 text-white hover:bg-[#2FB9BD]/80" : "hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD]"} md:w-fit w-full text-sm lg:px-8
                                 px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                            {isState.editInfo ? 'Cập nhật' : "Chỉnh sửa"}
                        </Button>
                        {isState.editInfo &&
                            <Button
                                type='button'
                                onClick={() => handleClickButtonEdit('editInfo')} className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full 
                                    text-sm lg:px-8 px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                Hủy
                            </Button>
                        }
                    </div>
                </div>
                <FormInformation form={form} isState={isState} />
            </BackgroundUiProfile>
            <BackgroundUiProfile>
                <div className=" flex flex-col md:gap-6">
                    <div className="flex md:flex-row flex-col md:gap-0 gap-2 justify-between">
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center md:gap-4 gap-2'>
                                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold '>Giấy phép lái xe </h1>
                                <span className={`${(
                                    (informationUser?.drivingLiscense?.length == 0 || informationUser?.drivingLiscense?.status == 0) && "bg-[#FF9900]" ||
                                    informationUser?.drivingLiscense?.status == 1 && "bg-[#2FB9BD]" ||
                                    informationUser?.drivingLiscense?.status == 2 && "bg-[#FA3434]"
                                )} rounded-2xl ml-1 text-white  py-1 px-4 text-xs  font-normal`}>
                                    {(informationUser?.drivingLiscense?.length == 0 || informationUser?.drivingLiscense?.status == 0) && "Chưa xác thực" ||
                                        informationUser?.drivingLiscense?.status == 1 && "Đã xác thực" ||
                                        informationUser?.drivingLiscense?.status == 2 && 'Không xác thực'
                                    }
                                </span>
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <h4 className='text-[#3E424E] font-normal lg:text-base text-sm'>
                                    Vì sao tôi phải xác thực GPLX
                                </h4>
                                <ActionTooltip
                                    side="bottom"
                                    align="center"
                                    label={(
                                        <div className='flex flex-col gap-1 text-center justify-center max-w-[240px]'>
                                            <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.document_license ? isStatePolicy?.dataPolicy?.document_license : ''}` }} />
                                        </div>
                                    )}
                                >
                                    <div>
                                        <FaRegQuestionCircle className='text-[#FF9900] text-xl cursor-pointer' />
                                    </div>
                                </ActionTooltip>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 md:my-0 my-5'>
                            <Button onClick={() => {
                                handleClickOptionsButton('editPapers')
                            }}
                                className={`${isState.editPapers ? "bg-[#2FB9BD]/80 text-white hover:bg-[#2FB9BD]/80" : "hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD]"} md:w-fit w-full text-sm
                                 lg:px-8 px-5 xl:py-3 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                {isState.editPapers ? 'Cập nhật' : "Chỉnh sửa"}
                            </Button>
                            {isState.editPapers &&
                                <Button
                                    type='button'
                                    onClick={() => handleClickButtonEdit('editPapers')} className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm
                                     lg:px-8 px-5 xl:py-3 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                    Hủy
                                </Button>
                            }
                        </div>
                    </div>
                    <FormPapers form={form} isState={isState} />
                </div>
            </BackgroundUiProfile>
            <BackgroundUiProfile>
                <SessionStarRating isState={isState} queryState={queryState} />
                {!isState.loadingData && isState?.nextPage &&
                    <div className="flex justify-center items-center my-4">
                        <Button
                            onClick={() => queryState({ page: isState.page + 1 })}
                            type='button'
                            className={`hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] text-sm lg:px-8 px-10 py-2 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                            Xem thêm
                        </Button>
                    </div>
                }
            </BackgroundUiProfile>
        </div >
    )
}

export default Account