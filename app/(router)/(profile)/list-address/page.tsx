'use client'
import { debounce } from "lodash"
import { toastCore } from "@/lib/toast"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import ListAddressMap from "./components/ListAddressMap"
import FormCreatAddress from "./components/FormCreatAddress"
import apiAddress from "@/services/profile/listAddress/listAddress.services"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAlert } from "@/hooks/useAlertDialog"
import BackgroundUiProfile from "@/themes/profile/BackgroundUiProfile"
import { IListAddress } from "@/types/Profile/IListAddress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useResize } from "@/hooks/useResize"
import { useDialogAddress } from "@/hooks/useOpenDialog"

type Props = {}

const ListAddress = (props: Props) => {
    const initialSatate: IListAddress = {
        idAddress: "0",
        tabAddress: 'list',
        openCity: false,
        openDistrict: false,
        openWards: false,
        dataCity: [],
        dataDistrict: [],
        dataWards: [],
        listAddress: [],
        isLoadingAddress: false
    }

    const form = useForm({
        defaultValues: {
            nameAddress: '',
            category: '1',
            city: '',
            district: '',
            wards: '',
            address: '',
            defaultAddress: false
        }
    })

    const { isVisibleMobile, isVisibleTablet } = useResize()

    const valuesForm = form.getValues()

    const { coordinates, setCoordinates } = useDialogAddress()


    const [isState, setIsState] = useState<IListAddress>(initialSatate)

    const { setOpenAlert, onFinally } = useAlert()

    const queryKeyIsState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))

    const { apiListCity, apiListDistrict, apiListWard, apiCreateAddress, apiListAddress, apiDetailAddress, apiDeleteAddress } = apiAddress()

    const fetchListAddress = async () => {
        queryKeyIsState({ isLoadingAddress: true })
        try {
            const { data } = await apiListAddress()
            queryKeyIsState({ listAddress: data?.data })
        } catch (error) {
            throw error
        } finally {
            queryKeyIsState({ isLoadingAddress: false })
        }
    }

    useEffect(() => {
        if (onFinally) {
            queryKeyIsState({ idAddress: '0', tabAddress: 'list' })
        }
    }, [onFinally])

    useEffect(() => {
        fetchListAddress()
    }, [isState.tabAddress])

    const fetchDetailAddress = async () => {
        try {
            const { data } = await apiDetailAddress(isState.idAddress)
            if (data?.data) {
                const db = [
                    { name: 'nameAddress', value: data?.data?.name },
                    { name: 'category', value: data?.data?.type },
                    { name: 'city', value: data?.data?.province?.id },
                    { name: 'district', value: data?.data?.district?.id },
                    { name: 'wards', value: data?.data?.ward?.id },
                    { name: 'address', value: data?.data?.address },
                    { name: 'defaultAddress', value: data?.data?.default_address == 0 ? false : true }
                ]

                setCoordinates({ lat: data?.data?.latitude, lng: data?.data?.longitude })

                db.forEach((item: any) => {
                    form.setValue(item.name, item.value);
                });
            }
        } catch (error) {
            throw error
        } finally {
            await fetchListCity('')
        }
    }

    useEffect(() => {
        if (isState.idAddress != '0') {
            fetchDetailAddress()
        }
    }, [isState.idAddress])

    const fetchListCity = async (search: any) => {
        try {
            const { data } = await apiListCity({ 'search': search })
            if (data?.data) {
                const newData = data?.data.map((e: any) => ({ label: e.name, value: e.province_id }))
                queryKeyIsState({ dataCity: newData })
            }
        } catch (error) {
            throw error
        }
    }

    const fetchDistrict = async (search: any) => {
        try {
            const { data } = await apiListDistrict({ 'search': search, "province_id": valuesForm.city })
            if (data?.data) {
                const newData = data?.data.map((e: any) => ({ label: e.name, value: e.district_id }))
                queryKeyIsState({ dataDistrict: newData })
            }
        } catch (error) {
            throw error
        }
    }

    const fetchWards = async (search: any) => {
        try {
            const { data } = await apiListWard({ 'search': search, "district_id": valuesForm.district })
            if (data?.data) {
                const newData = data?.data.map((e: any) => ({ label: e.name, value: e.wards_id }))
                queryKeyIsState({ dataWards: newData })
            }
        } catch (error) {
            throw error

        }
    }

    useEffect(() => {
        if (isState.tabAddress === 'add') {
            fetchListCity("")
        }
    }, [isState.openCity])

    useEffect(() => {
        if (valuesForm.city) {
            fetchDistrict('')
        }
    }, [isState.openDistrict, valuesForm.city])

    useEffect(() => {
        if (valuesForm.district) {
            fetchWards('')
        }
    }, [isState.openWards, valuesForm.district])


    const handleSearchApi = debounce((value, type) => {
        switch (type) {
            case 'city':
                fetchListCity(value)
                break;
            case 'district':
                fetchDistrict(value)
                break;
            case 'wards':
                fetchWards(value)
                break;
            default:
                break;
        }
    }, 700)


    const onSubmit = async (values: any) => {
        try {
            let formData = new FormData();
            formData.append('type', values.category);
            formData.append('name', values.nameAddress);
            formData.append('province_id', values.city);
            formData.append('district_id', values.district);
            formData.append('ward_id', values.wards);
            formData.append('address', values.address.split(',')[0].trim());
            formData.append('default_address', values.defaultAddress ? '1' : '0');
            formData.append('id', isState.idAddress);
            formData.append('latitude', `${coordinates?.lat}`)
            formData.append('longitude', `${coordinates?.lng}`)
            const { data } = await apiCreateAddress(formData)

            if (data?.result) {
                toastCore.success(data?.message)
                queryKeyIsState({ tabAddress: 'list', idAddress: '0' })
                form.reset()
                return
            }
            toastCore.error(data?.message)
        } catch (error) {
            throw error
        }
    }

    return (

        <BackgroundUiProfile className={''}>
            <Tabs value={isState.tabAddress} onValueChange={(e) => {
                queryKeyIsState({ tabAddress: e, idAddress: '0' })
                form.reset()
            }} className="flex flex-col gap-4 ">
                <div className="flex md:flex-row flex-col md:gap-0 gap-2 justify-between">
                    <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>{isState.tabAddress === 'list' ? 'Địa chỉ của tôi' : isState.idAddress === '0' ? 'Thêm địa chỉ' : 'Thay đổi địa chỉ'}</h1>
                    <TabsList className="bg-transparent" asChild>
                        <div className={`${isState.idAddress != '0' ? 'flex gap-4 items-center' : ""}`}>
                            {isState.idAddress != '0' &&
                                <Button
                                    type="button"
                                    onClick={() => setOpenAlert(true, 'deleteAddres', isState.idAddress)}
                                    className={`bg-[#2FB9BD]/80  hover:bg-[#2FB9BD]/80" hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                                        px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}
                                >
                                    Xóa địa chỉ
                                </Button>
                            }
                            {isState.tabAddress === 'list' &&
                                <TabsTrigger asChild value="add">
                                    <Button
                                        className={`data-[state=active]:bg-[#2FB9BD]/80 bg-[#2FB9BD]/80 data-[state=active]:text-white hover:bg-[#2FB9BD]/80 text-white border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                                px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                        Thêm địa chỉ
                                    </Button>
                                </TabsTrigger>
                            }
                            {
                                isState.tabAddress === 'add' &&
                                <TabsTrigger asChild value="list">
                                    <Button
                                        className={`data-[state=active]:bg-[#2FB9BD]/80 bg-[#2FB9BD]/80 data-[state=active]:text-white hover:bg-[#2FB9BD]/80 text-white border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                            px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}>
                                        Hủy
                                    </Button>
                                </TabsTrigger>
                            }
                        </div>
                    </TabsList>
                </div>
                <div>
                    <TabsContent value="list" className="">
                        <ScrollArea
                            className={`${isState.listAddress?.length > 0 &&
                                isVisibleMobile ? (isState.listAddress?.length > 3 ? 'h-[400px]' : 'h-auto') :
                                isVisibleTablet ? isState.listAddress?.length > 3 ? 'h-[880px]' : 'h-auto' : isState.listAddress?.length >= 4 ? 'h-[780px]' : 'h-[550px]'} lg:pr-6 pr-3`}
                        >
                            <ListAddressMap isState={isState} queryKeyIsState={queryKeyIsState} />
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="add">
                        <FormCreatAddress
                            form={form}
                            isState={isState}
                            queryKeyIsState={queryKeyIsState}
                            handleSearchApi={handleSearchApi}
                            onSubmit={onSubmit}
                        />
                    </TabsContent>
                </div>
            </Tabs>
        </BackgroundUiProfile>
    )
}
export default ListAddress