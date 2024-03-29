import { useEffect } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"

import { X } from "lucide-react"

import Image from "next/image";
import { useDialogFilterListCars } from "@/hooks/useOpenDialog";

import { FormatNumberHundred } from "../format/FormatNumber";
import { Button } from "../ui/button";
import { getListAutomaker, getListCars, getListTypeCars } from "@/services/cars/cars.services";
import { IInitialStateSearchCar } from "@/types/Cars/ICars";
import { ScrollArea } from "../ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { toast } from "react-toastify";
import { CustomDataListCars } from "@/custom/CustomData";

type Props = {
    isState: IInitialStateSearchCar,
    queryKeyIsState: (key: any) => void
}

export function DialogFilterListCars({ isState, queryKeyIsState }: Props) {
    const { openDialogFilterListCars, setOpenDialogFilterListCars, type } = useDialogFilterListCars()

    const handleOpenChangeModal = (type?: string) => {
        if (type === "type_car_search") {
            setOpenDialogFilterListCars(false)
        } else {
            toast("Vui lòng nhấn áp dụng!")
        }
    }

    useEffect(() => {
        if (type === 'company_car_search' && isState?.filter?.listAutomaker?.length === 0) {
            const fetchDataListAutomaker = async () => {
                const { data } = await getListAutomaker();

                if (data && data.data) {
                    queryKeyIsState({
                        filter: {
                            ...isState.filter,
                            listAutomaker: data.data,
                        }
                    })
                }
            }

            fetchDataListAutomaker()
        } else if (type === 'type_car_search' && isState?.filter?.listTypesCar?.length === 0) {
            const fetchDataListTypesCar = async () => {
                const { data } = await getListTypeCars();

                if (data && data.data) {
                    queryKeyIsState({
                        filter: {
                            ...isState.filter,
                            listTypesCar: data.data,
                        }
                    })
                }
            }

            fetchDataListTypesCar()

        }
    }, [
        type,
        isState?.filter,
        queryKeyIsState
    ])

    const handleFilterListCars = async (value: string | any, type: string) => {
        if (type === "company_car_search" && value) {
            queryKeyIsState({
                dataParams: {
                    ...isState.dataParams,
                    company_car_search: value,
                }
            })
        } else if (type === "type_car_search" && value) {
            const typeId = value.id;
            const currentTypeSearch = isState.dataParams?.type_car_search || [];

            const isTypeExists = currentTypeSearch.includes(typeId);

            if (!isTypeExists) {
                // Nếu không tồn tại, thêm vào mảng
                const updatedTypeSearch = [...currentTypeSearch, typeId];

                const query = {
                    company_car_search: isState?.dataParams?.company_car_search == "0" ? undefined : isState?.dataParams?.company_car_search,
                    type_car_search: updatedTypeSearch && updatedTypeSearch.length === 0 ? [] : updatedTypeSearch,
                    transmission_search: isState?.dataParams?.transmission_search == "0" ? undefined : isState?.dataParams?.transmission_search,
                    star_search: isState?.dataParams?.star_search == 0 ? undefined : isState?.dataParams?.star_search,
                    tram_search: isState?.dataParams?.tram_search == 0 ? undefined : isState?.dataParams?.tram_search,
                    discount_search: isState?.dataParams?.discount_search == 0 ? undefined : isState?.dataParams?.discount_search,
                    book_car_flash: isState?.dataParams?.book_car_flash == 0 ? undefined : isState?.dataParams?.book_car_flash,
                    mortgage: isState?.dataParams?.mortgage == 0 ? undefined : isState?.dataParams?.mortgage,
                    delivery_car: isState?.dataParams?.delivery_car == 0 ? undefined : isState?.dataParams?.delivery_car,
                }

                let limit = isState.limit.limitAllCars;

                if (
                    isState.dataParams?.company_car_search === "0" &&
                    updatedTypeSearch?.length === 0 &&
                    isState?.dataParams?.transmission_search == "0" &&
                    isState.dataParams?.star_search === 0 &&
                    isState.dataParams?.tram_search === 0 &&
                    isState.dataParams?.discount_search === 0 &&
                    isState.dataParams?.book_car_flash === 0 &&
                    isState.dataParams?.mortgage === 0 &&
                    isState.dataParams?.delivery_car === 0
                ) {
                    limit = isState.limit.limitAllCars;
                } else {
                    limit = isState.limit.limitFilterCars;
                }

                const { data } = await getListCars(1, limit, query)

                if (data && data.data && data.base) {
                    // let customDataListCars: any[] = data?.data?.map((item: any) => ({
                    //     id: item?.id,
                    //     address: `${item?.district}, ${item?.province}`,
                    //     image_car: item?.image_car?.map((image: any) => ({
                    //         ...image,
                    //         name: `${data?.base?.base}/${image.name}`
                    //     })),
                    //     customer: {
                    //         avatar: item?.customer?.avatar,
                    //         fullname: item?.customer?.fullname,
                    //         id: item?.customer?.id
                    //     },
                    //     type: {
                    //         delivery_car: item?.delivery_car === 1,
                    //         book_car_flash: item?.book_car_flash === 1,
                    //         mortgage: item?.book_car_flash === 1,
                    //         transmission_search: item?.transmission_search
                    //     },
                    //     favorite: item?.favourite_car,
                    //     name_car: item?.name,
                    //     point_star: item?.star,
                    //     total_trip: item?.total_trip,
                    //     price_before_promotion: item?.rent_cost,
                    //     price_after_promotion: item?.promotion?.length > 0 ? (item?.rent_cost - item?.promotion[0]?.price_promotion) : 0,
                    //     promotion: item?.promotion
                    // })) || []

                    let { customDataListCars } = CustomDataListCars(data)

                    queryKeyIsState({
                        listCardCars: customDataListCars,
                        page: 2,
                        next: data?.links?.next,
                        dataParams: {
                            ...isState.dataParams,
                            type_car_search: updatedTypeSearch
                        }
                    })

                    // setOpenDialogFilterListCars(false);
                }

            } else {
                // Nếu tồn tại, loại bỏ khỏi mảng
                const updatedTypeSearch = currentTypeSearch.filter(id => id !== typeId);

                const query = {
                    company_car_search: isState?.dataParams?.company_car_search == "0" ? undefined : isState?.dataParams?.company_car_search,
                    type_car_search: updatedTypeSearch && updatedTypeSearch.length === 0 ? [] : updatedTypeSearch,
                    transmission_search: isState?.dataParams?.transmission_search == "0" ? undefined : isState?.dataParams?.transmission_search,
                    star_search: isState?.dataParams?.star_search == 0 ? undefined : isState?.dataParams?.star_search,
                    tram_search: isState?.dataParams?.tram_search == 0 ? undefined : isState?.dataParams?.tram_search,
                    discount_search: isState?.dataParams?.discount_search == 0 ? undefined : isState?.dataParams?.discount_search,
                    book_car_flash: isState?.dataParams?.book_car_flash == 0 ? undefined : isState?.dataParams?.book_car_flash,
                    mortgage: isState?.dataParams?.mortgage == 0 ? undefined : isState?.dataParams?.mortgage,
                    delivery_car: isState?.dataParams?.delivery_car == 0 ? undefined : isState?.dataParams?.delivery_car,
                }


                let limit = isState.limit.limitAllCars;

                if (
                    isState.dataParams?.company_car_search === "0" &&
                    updatedTypeSearch?.length === 0 &&
                    isState?.dataParams?.transmission_search == "0" &&
                    isState.dataParams?.star_search === 0 &&
                    isState.dataParams?.tram_search === 0 &&
                    isState.dataParams?.discount_search === 0 &&
                    isState.dataParams?.book_car_flash === 0 &&
                    isState.dataParams?.mortgage === 0 &&
                    isState.dataParams?.delivery_car === 0
                ) {
                    limit = isState.limit.limitAllCars;
                } else {
                    limit = isState.limit.limitFilterCars;
                }

                const { data } = await getListCars(1, limit, query)

                if (data && data.data && data.base) {
                    // let customDataListCars: any[] = data?.data?.map((item: any) => ({
                    //     id: item?.id,
                    //     address: `${item?.district}, ${item?.province}`,
                    //     image_car: item?.image_car?.map((image: any) => ({
                    //         ...image,
                    //         name: `${data?.base?.base}/${image.name}`
                    //     })),
                    //     customer: {
                    //         avatar: item?.customer?.avatar,
                    //         fullname: item?.customer?.fullname,
                    //         id: item?.customer?.id
                    //     },
                    //     type: {
                    //         delivery_car: item?.delivery_car === 1,
                    //         book_car_flash: item?.book_car_flash === 1,
                    //         mortgage: item?.book_car_flash === 1,
                    //         transmission_search: item?.transmission_search
                    //     },
                    //     favorite: item?.favourite_car,
                    //     name_car: item?.name,
                    //     point_star: item?.star,
                    //     total_trip: item?.total_trip,
                    //     price_before_promotion: item?.rent_cost,
                    //     price_after_promotion: item?.promotion?.length > 0 ? (item?.rent_cost - item?.promotion[0]?.price_promotion) : 0,
                    //     promotion: item?.promotion
                    // })) || []

                    let { customDataListCars } = CustomDataListCars(data)

                    queryKeyIsState({
                        listCardCars: customDataListCars,
                        page: 2,
                        next: data?.links?.next,
                        dataParams: {
                            ...isState.dataParams,
                            type_car_search: updatedTypeSearch
                        }
                    })
                }
            }
        } else if (type === "transmission_search" && value) {
            queryKeyIsState({
                dataParams: {
                    ...isState.dataParams,
                    transmission_search: value,
                }
            })
        }
    }

    const handleSubmitFilter = async () => {
        const query = {
            company_car_search: isState?.dataParams?.company_car_search == "0" ? undefined : isState?.dataParams?.company_car_search,
            type_car_search: isState?.dataParams?.type_car_search && isState?.dataParams?.type_car_search.length === 0 ? [] : isState?.dataParams?.type_car_search,
            transmission_search: isState?.dataParams?.transmission_search == "0" ? undefined : isState?.dataParams?.transmission_search,
            star_search: isState?.dataParams?.star_search == 0 ? undefined : isState?.dataParams?.star_search,
            tram_search: isState?.dataParams?.tram_search == 0 ? undefined : isState?.dataParams?.tram_search,
            discount_search: isState?.dataParams?.discount_search == 0 ? undefined : isState?.dataParams?.discount_search,
            book_car_flash: isState?.dataParams?.book_car_flash == 0 ? undefined : isState?.dataParams?.book_car_flash,
            mortgage: isState?.dataParams?.mortgage == 0 ? undefined : isState?.dataParams?.mortgage,
            delivery_car: isState?.dataParams?.delivery_car == 0 ? undefined : isState?.dataParams?.delivery_car,
        }

        let limit = isState.limit.limitAllCars;

        if (
            isState.dataParams?.company_car_search === "0" &&
            isState.dataParams?.type_car_search?.length === 0 &&
            isState?.dataParams?.transmission_search == "0" &&
            isState.dataParams?.star_search === 0
        ) {
            limit = isState.limit.limitAllCars;
        } else {
            limit = isState.limit.limitFilterCars;
        }

        console.log('query', query);

        const { data } = await getListCars(1, limit, query)

        if (data && data.data && data.base) {
            let { customDataListCars } = CustomDataListCars(data)

            queryKeyIsState({
                listCardCars: customDataListCars,
                page: 2,
                next: data?.links?.next
            })

            setOpenDialogFilterListCars(false);
        }
    }

    return (
        <Dialog
            modal
            open={openDialogFilterListCars}
            onOpenChange={() => handleOpenChangeModal(type)}
        >
            <DialogOverlay />
            <DialogContent className="px-0 py-0 lg:max-w-[720px] md:max-w-[620px] w-full max-h-[90vh] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                {
                    type === "type_car_search" &&
                    <DialogClose
                        onClick={() => handleOpenChangeModal(type)}
                        className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                    >
                        <X className="size-8 text-[#000000]" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                }

                <DialogHeader className='flex items-center justify-center w-full border-b drop-shadow-sm py-4'>
                    <DialogTitle className='text-2xl capitalize'>
                        {type === "type_car_search" && "Loại xe"}
                        {type === "company_car_search" && "Hãng xe"}
                        {type === "transmission_search" && "Truyền động"}
                    </DialogTitle>
                </DialogHeader>

                <div className='flex flex-col justify-between h-[500px] gap-3'>
                    <ScrollArea className='md:pl-6 md:pr-6 pl-4 pr-4 h-[50vh] caret-transparent'>
                        {
                            type === "type_car_search" &&
                            <div className='grid grid-cols-3 gap-6 w-full'>
                                {
                                    isState?.filter?.listTypesCar && isState?.filter?.listTypesCar?.map((item) => {

                                        return (
                                            <div
                                                key={`typesCarId-${item.id}`}
                                                className={`${isState.dataParams?.type_car_search?.includes(item.id) ? "border-[#2FB9BD]/80 bg-[#2FB9BD]/10 text-[#2FB9BD] shadow-md" : "border-[#B4B8C5]"} col-span-1 flex flex-col justify-center items-center h-full border hover:shadow-xl hover:drop-shadow-xl duration-300 transition-all cursor-pointer rounded-xl 3xl:p-4 p-4`}
                                                onClick={() => handleFilterListCars(item, "type_car_search")}
                                            >
                                                <div className='w-20 h-auto'>
                                                    <Image
                                                        alt="icon"
                                                        width={200}
                                                        height={200}
                                                        src={item?.image ? item?.image : "/default/default.png"}
                                                        className={`w-full h-full object-contain`}
                                                    />
                                                </div>
                                                <div className='flex flex-col justify-center items-center gap-1'>
                                                    <div className='3xl:text-base text-sm font-medium text-center'>
                                                        {item?.name ? item?.name : ""}
                                                    </div>
                                                    <div className='3xl:text-xs text-xs font-light text-gray-400'>
                                                        {item?.total_car ? FormatNumberHundred(item?.total_car, 200) : 0} xe
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {
                            type === "company_car_search" &&
                            <RadioGroup
                                onValueChange={(value) => handleFilterListCars(value, "company_car_search")}
                                defaultValue="0"
                                value={isState?.dataParams?.company_car_search}
                                className='grid grid-cols-2 gap-6 w-full'
                                autoFocus={false}
                            >
                                <div key={'automakerId-0'} className='col-span-1 flex items-center space-x-3 group'>
                                    <RadioGroupItem
                                        value={`0`}
                                        id={`0`}
                                        className={`${isState?.dataParams?.company_car_search == "0" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
                                    />
                                    <Label
                                        htmlFor={`0`}
                                        className="flex items-center gap-4 cursor-pointer"
                                    >
                                        <div className='3xl:text-base text-sm text-[#3A3E4C] font-normal capitalize'>
                                            Tất cả
                                        </div>
                                    </Label>
                                </div>

                                {
                                    isState?.filter?.listAutomaker && isState?.filter?.listAutomaker?.map((item) => (
                                        <div key={`automakerId-${item.id}`} className='col-span-1 flex items-center space-x-3 group'>
                                            <RadioGroupItem value={`${item.id}`} id={`${item.id}`} className={`${isState?.dataParams?.company_car_search == `${item.id}` ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`} />
                                            <Label
                                                htmlFor={`${item.id}`}
                                                className="flex items-center gap-2 cursor-pointer"
                                            >
                                                <div className='w-10 h-auto'>
                                                    <Image
                                                        alt="icon"
                                                        width={80}
                                                        height={80}
                                                        src={item?.image ? item?.image : "/default/default.png"}
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>
                                                <div className='3xl:text-base text-sm text-[#3A3E4C] font-normal capitalize'>
                                                    {item.name ? item.name : ""}
                                                </div>
                                                <div className='3xl:text-sm text-xs text-[#B4B8C5] font-normal'>
                                                    ({item.total_car ? item.total_car : 0} xe)
                                                </div>
                                            </Label>
                                        </div>
                                    ))
                                }
                            </RadioGroup>
                        }
                        {
                            type === "transmission_search" &&
                            <RadioGroup
                                defaultValue="0"
                                value={isState?.dataParams?.transmission_search}
                                onValueChange={(value) => handleFilterListCars(value, "transmission_search")}
                                className='grid grid-cols-1 gap-6 w-full'
                                autoFocus={false}
                            >
                                <div key={'transmissionId-0'} className='col-span-1 flex items-center space-x-3 group'>
                                    <RadioGroupItem
                                        value={`0`}
                                        id={`0`}
                                        className={`${isState?.dataParams?.transmission_search == "0" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
                                    />
                                    <Label
                                        htmlFor={`0`}
                                        className="flex items-center gap-4 cursor-pointer"
                                    >
                                        <div className='3xl:text-base text-sm font-normal capitalize'>
                                            Tất cả
                                        </div>
                                    </Label>
                                </div>
                                <div key={'transmissionId-1'} className='col-span-1 flex items-center space-x-3 group'>
                                    <RadioGroupItem
                                        value={`1`}
                                        id={`1`}
                                        className={`${isState?.dataParams?.transmission_search == "1" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
                                    />
                                    <Label
                                        htmlFor={`1`}
                                        className="flex items-center gap-4 cursor-pointer"
                                    >
                                        <div className='3xl:text-base text-sm font-normal capitalize'>
                                            Số sàn
                                        </div>
                                    </Label>
                                </div>
                                <div key={'transmissionId-2'} className='col-span-1 flex items-center space-x-3 group'>
                                    <RadioGroupItem
                                        value={`2`}
                                        id={`2`}
                                        className={`${isState?.dataParams?.transmission_search == "2" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
                                    />
                                    <Label
                                        htmlFor={`2`}
                                        className="flex items-center gap-4 cursor-pointer"
                                    >
                                        <div className='3xl:text-base text-sm font-normal capitalize'>
                                            Số tự động
                                        </div>
                                    </Label>
                                </div>

                            </RadioGroup>
                        }
                    </ScrollArea>

                    {
                        type === "type_car_search" ?
                            null
                            :
                            <div className='border-t py-4 drop-shadow-2xl bg-white'>
                                <div className='md:px-6 px-3'>
                                    <Button
                                        type="button"
                                        className='xl:px-6 xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full'
                                        onClick={() => handleSubmitFilter()}
                                    >
                                        Áp dụng
                                    </Button>
                                </div>
                            </div>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
