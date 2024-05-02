import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog"
import Cookies from 'js-cookie';

import { X } from "lucide-react"
import { Controller, useForm } from "react-hook-form";

import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuPlane } from "react-icons/lu";
import { TiLocation } from "react-icons/ti";
import { Separator } from "../ui/separator";
import { memo, useCallback, useEffect, useState } from "react";
import { useGeneralKey } from "@/hooks/useGeneralKey";
import { useDialogAddress, useDialogCalendar, useDialogRouteAddress } from "@/hooks/useOpenDialog";
import SearchAddress from "../searchAddress/SearchAddress";
import useGoogleApi from "@/services/filter/google/google.services";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import useAirportCarDeliveryApi from "@/services/filter/listAirport/airportCarDelivery.services";
import { useGeolocated } from "react-geolocated";
import { usePathname } from "next/navigation";
import { getListCars } from "@/services/cars/cars.services";
import { useDataListCarAutonomous, useDataListCarsDriver } from "@/hooks/useDataQueryKey";
import { CustomDataListCars } from "@/custom/CustomData";
import moment from "moment";
import { debounce } from "lodash";
import { useDebounce } from "use-debounce";
import { ScrollArea } from "../ui/scroll-area";
import SkeletonDialogAddress from "../skeleton/SkeletonDialogAddress";

type Props = {
}
interface IPlace {
    address: string;
    created_at: string;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    name_location: string;
    updated_at: string
}

const DialogFilterAddress = memo(({ }: Props) => {
    const pathname = usePathname()
    const { apiGetCurrentPosition, apiViewboxSearch } = useGoogleApi()
    const { apiGetListAirportCarDelivery } = useAirportCarDeliveryApi()

    const { isStateListCarAutonomous, queryKeyIsStateListCarAutonomous } = useDataListCarAutonomous()
    const { isStateListCarsDriver, queryKeyIsStateListCarsDriver } = useDataListCarsDriver()
    const { dateReal } = useDialogCalendar()

    const {
        type,
        coordinates,
        indexAddressDestination,
        openDialogAddress,
        valueAddressPickup,
        valueAddressDestination,
        setOpenDialogAddress,
        setValueAddressPickup,
        setValueAddressDestination,
        setCoordinates,
    } = useDialogAddress()

    const {
        itemValuePickup,
        itemValueDestination,
        setValueTwoAddress,
        setItemValuePickup,
        setItemValueDestination,
        setFlagCloseModalRouteAddress,
    } = useDialogRouteAddress()

    const [dataPlane, setDataPlane] = useState<IPlace[]>([])
    const [dataBoxSearch, setDataBoxSearch] = useState<any[]>([])

    const [openBoxSearch, setOpenBoxSearch] = useState<boolean>(false)
    const [debouncedOpenBoxSearch] = useDebounce(openBoxSearch, 500)

    const [dataAddress, setDataAddress] = useState<string>("")
    const [debouncedDataAddress] = useDebounce(dataAddress, 500)

    const [coordinatesComponent, setCoordinatesComponent] = useState<any>({
        latCurrent: 0,
        lngCurrent: 0,
        lat: 0,
        lng: 0,
        latTo: 0,
        lngTo: 0,
    })

    const [flagValidateSubmit, setFlagValidateSubmit] = useState<boolean>(false)
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false)


    const VietnamBounds = "8.175944,102.148125,23.393395,109.464211";

    // chạy 1 lần duy nhất để lấy vị trí toạ độ của máy tính
    const getGeolocated = useGeolocated({
        onSuccess(position) {

            setCoordinatesComponent({
                ...coordinates,
                latCurrent: position.coords.latitude,
                lngCurrent: position.coords.longitude
            })
        }
    })
    // khi có data thì mới chạy để lấy ra view box search
    useEffect(() => {
        if (debouncedDataAddress) {
            const fetchDataTextSearch = async () => {
                try {
                    const dataParams = {
                        key: process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D,
                        viewbox: VietnamBounds,
                        text: debouncedDataAddress,
                        types: "",
                        tag: "",
                        datetime: "",
                    }

                    const { data } = await apiViewboxSearch(dataParams)

                    if (data && data.code == 'ok' && data.result) {
                        setDataBoxSearch(data.result)
                        // setOpenBoxSearch(true)
                    }

                } catch (err) {
                    throw err
                }
            }

            fetchDataTextSearch()
        }
    }, [debouncedDataAddress])

    useEffect(() => {
        if (openDialogAddress && type === "address_pickup" && valueAddressPickup) {
            setDataAddress(valueAddressPickup)
            setCoordinatesComponent({
                ...coordinates,
                lat: coordinates.lat,
                lng: coordinates.lng,
            })
        } else if (openDialogAddress && type === "address_destination" && valueAddressDestination) {
            setDataAddress(valueAddressDestination[indexAddressDestination].valueAddress)

            setCoordinatesComponent({
                ...coordinates,
                latTo: coordinates.latTo,
                lngTo: coordinates.lngTo,
            })
        }
        if (openDialogAddress) {
            const currentPosition = () => {
                return getGeolocated.getPosition()
            }
            currentPosition()
        }

        if (openDialogAddress && dataPlane.length === 0) {
            fetchAirportCarDelivery()
        }
    }, [openDialogAddress, type])

    // change input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setOpenBoxSearch(true)
        setDataAddress(value);
    };

    // clear data address
    const handleClearDataAddress = () => {
        setDataAddress("")
        if (type === "address_pickup") {
            setCoordinatesComponent({
                ...coordinatesComponent,
                lat: 0,
                lng: 0,
            })
        } else if (type === "address_destination") {
            setCoordinatesComponent({
                ...coordinatesComponent,
                latTo: 0,
                lngTo: 0,
            })
        }
        setFlagValidateSubmit(true)
    }

    // click change address
    const handleChangeAddress = (item: any, typeClick: string) => {
        console.log('item : ', item);
        if (typeClick === "viewboxsearch") {
            setFlagValidateSubmit(true)

            setDataAddress(item.address)
            if (type === "address_pickup") {
                setCoordinatesComponent({
                    ...coordinatesComponent,
                    lat: item.location.lat,
                    lng: item.location.lng,
                })
                setItemValuePickup(item)

            } else if (type === "address_destination") {
                setCoordinatesComponent({
                    ...coordinatesComponent,
                    latTo: item.location.lat,
                    lngTo: item.location.lng,
                })
                setItemValueDestination(item)

            }
            setOpenBoxSearch(false)
        } else if (typeClick === "airport") {
            setFlagValidateSubmit(true)

            setDataAddress(item.address)
            if (type === "address_pickup") {
                setCoordinatesComponent({
                    ...coordinatesComponent,
                    lat: item.latitude,
                    lng: item.longitude,
                })

                setItemValuePickup(item)
            } else if (type === "address_destination") {
                setCoordinatesComponent({
                    ...coordinatesComponent,
                    latTo: item.latitude,
                    lngTo: item.longitude,
                })

                setItemValueDestination(item)
            }
            setOpenBoxSearch(false)

        }
    }

    // lấy địa chỉ theo vị trí hiên tại của map 4d
    const fetchLocationName = async (lat: any, lng: any) => {
        try {
            const dataParams = {
                key: process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D,
                location: `${lat},${lng}`,
                address: "",
                viewbox: "",
            }

            const { data } = await apiGetCurrentPosition(dataParams)

            if (data && data.code == 'ok' && data.result) {
                const address = data.result[0].address
                const location = data.result[0].location

                setDataAddress(address)
                setCoordinatesComponent({
                    ...coordinatesComponent,
                    lat: location.lat,
                    lng: location.lng,
                })

                return
            }
            console.log('Không tìm thấy thông tin vị trí.');
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    // handle click lấy vị trí hiện tại
    const handleAddressCurrent = () => {
        fetchLocationName(coordinatesComponent.latCurrent, coordinatesComponent.lngCurrent)
        setFlagValidateSubmit(true)
    }

    // lấy danh sách giao xe sân bay
    const fetchAirportCarDelivery = async () => {
        try {
            setIsLoadingData(true)

            const { data } = await apiGetListAirportCarDelivery()

            if (data && data.data) {
                setDataPlane(data.data)
                setIsLoadingData(false)
            } else {
                setIsLoadingData(false)
            }
        } catch (error) {
            throw error
        }
    };

    // submit áp dụng
    const onSubmit = async () => {
        if (pathname.startsWith('/list-cars-autonomous')) {
            const query = {
                lat: dataAddress ? coordinatesComponent.lat : undefined,
                lon: dataAddress ? coordinatesComponent.lng : undefined,
                type: 1,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                transmission_search: isStateListCarAutonomous?.dataParams?.transmission_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.transmission_search,
                star_search: isStateListCarAutonomous?.dataParams?.star_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.star_search,
                tram_search: isStateListCarAutonomous?.dataParams?.tram_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.tram_search,
                discount_search: isStateListCarAutonomous?.dataParams?.discount_search == 0 ? undefined : isStateListCarAutonomous?.dataParams?.discount_search,
                book_car_flash: isStateListCarAutonomous?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarAutonomous?.dataParams?.book_car_flash,
                mortgage: isStateListCarAutonomous?.dataParams?.mortgage == 0 ? undefined : isStateListCarAutonomous?.dataParams?.mortgage,
                delivery_car: isStateListCarAutonomous?.dataParams?.delivery_car == 0 ? undefined : isStateListCarAutonomous?.dataParams?.delivery_car,
            }

            let limit = isStateListCarAutonomous.limit.limitAllCars;

            if (
                isStateListCarAutonomous.dataParams?.company_car_search == "0" &&
                isStateListCarAutonomous.dataParams?.type_car_search?.length === 0 &&
                isStateListCarAutonomous?.dataParams?.transmission_search == "0" &&
                isStateListCarAutonomous.dataParams?.star_search === 0 &&
                isStateListCarAutonomous.dataParams?.tram_search === 0 &&
                isStateListCarAutonomous.dataParams?.discount_search === 0 &&
                isStateListCarAutonomous.dataParams?.book_car_flash === 0 &&
                isStateListCarAutonomous.dataParams?.mortgage === 0 &&
                isStateListCarAutonomous.dataParams?.delivery_car === 0
            ) {
                limit = isStateListCarAutonomous.limit.limitAllCars;
            } else {
                limit = isStateListCarAutonomous.limit.limitFilterCars;
            }

            const { data } = await getListCars(1, limit, query)

            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateListCarAutonomous({
                    listCardCars: customDataListCars,
                    page: 2,
                    next: data?.links?.next
                })

                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))
                // Cookies.set('coordinates', JSON.stringify(coordinatesComponent));
                setCoordinates(coordinatesComponent)
                setValueAddressPickup(dataAddress)
                setOpenDialogAddress(false)
            }

        } else if (pathname.startsWith('/list-cars-driver')) {
            if (type === "address_pickup" && dataAddress) {
                setValueAddressPickup(dataAddress)
                setCoordinates(coordinatesComponent)
                setOpenDialogAddress(false)
                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))
                // Đặt cookie với giá trị tương ứng
                // Cookies.set('coordinates', JSON.stringify(coordinatesComponent));
            } else if (type === "address_destination" && dataAddress) {
                // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                const updatedAddressDestination = [...valueAddressDestination];
                updatedAddressDestination[indexAddressDestination] = {
                    id: valueAddressDestination[indexAddressDestination].id,
                    valueAddress: dataAddress
                };

                setCoordinates(coordinatesComponent)
                setValueAddressDestination(updatedAddressDestination);

                setOpenDialogAddress(false);

            } else if (type === "address_pickup") {
                console.log('check');

                setCoordinates({
                    ...coordinatesComponent,
                    lat: 0,
                    lng: 0,
                })
                setValueAddressPickup("")
                setOpenDialogAddress(false)
                setFlagValidateSubmit(false)

            } else if (type === "address_destination") {
                setCoordinates({
                    ...coordinatesComponent,
                    latTo: 0,
                    lngTo: 0,
                })
                setOpenDialogAddress(false)
                setFlagValidateSubmit(false)

                const updatedAddressDestination = [...valueAddressDestination];
                updatedAddressDestination[indexAddressDestination] = {
                    id: valueAddressDestination[indexAddressDestination].id,
                    valueAddress: ""
                };

                setValueAddressDestination([updatedAddressDestination])
            }

            setFlagCloseModalRouteAddress(true)
        } else {
            if (type === "address_pickup" && dataAddress) {
                setValueAddressPickup(dataAddress)
                setCoordinates(coordinatesComponent)
                setDataAddress("")
                setOpenDialogAddress(false)

                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))

                // Cookies.set('coordinates', JSON.stringify(coordinatesComponent));
                setValueTwoAddress(itemValuePickup.name)

            } else if (type === "address_destination" && dataAddress) {
                // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                const updatedAddressDestination = [...valueAddressDestination];
                updatedAddressDestination[indexAddressDestination] = {
                    id: valueAddressDestination[indexAddressDestination].id,
                    valueAddress: dataAddress
                };

                setDataAddress("")
                setCoordinates(coordinatesComponent)
                setValueAddressDestination(updatedAddressDestination);

                setValueTwoAddress(`${itemValuePickup.name} - ${itemValueDestination.name}`)
                setOpenDialogAddress(false);

                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))

                // Cookies.set('coordinates', JSON.stringify(coordinatesComponent));

            } else if (type === "address_pickup") {
                console.log('check');

                setCoordinates({
                    ...coordinatesComponent,
                    lat: 0,
                    lng: 0,
                })
                setValueAddressPickup("")
                setOpenDialogAddress(false)
                setFlagValidateSubmit(false)

                setValueTwoAddress("")

                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))

                // Cookies.set('coordinates', JSON.stringify(coordinatesComponent));

            } else if (type === "address_destination") {
                setCoordinates({
                    ...coordinatesComponent,
                    latTo: 0,
                    lngTo: 0,
                })
                setOpenDialogAddress(false)
                setFlagValidateSubmit(false)

                const updatedAddressDestination = [...valueAddressDestination];
                updatedAddressDestination[indexAddressDestination] = {
                    id: valueAddressDestination[indexAddressDestination].id,
                    valueAddress: ""
                };

                setValueAddressDestination([updatedAddressDestination])

                // xoá itemActiveDestination
                setValueTwoAddress(itemValuePickup.name)
                // Cookies.set('coordinates', JSON.stringify(coordinatesComponent));
                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))

            }
        }
    }

    // handle close modal
    const handleCloseModal = () => {
        setOpenDialogAddress(false)
        setFlagValidateSubmit(false)
        setCoordinatesComponent({
            latCurrent: 0,
            lngCurrent: 0,
            lat: 0,
            lng: 0,
            latTo: 0,
            lngTo: 0,
        })
        setDataAddress("")
    }

    return (
        <>
            <Dialog modal={true} open={openDialogAddress} >
                <DialogPortal>
                    <DialogOverlay />
                    <DialogContent className="flex flex-col px-0 pb-0 lg:max-w-[740px] lg:w-[740px] max-w-[95%] w-[95%] min-h-[60vh] max-h-[95vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                        <DialogClose
                            onClick={handleCloseModal}
                            className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                        >
                            <X className="size-8 text-[#000000]" />
                            <span className="sr-only">Close</span>
                        </DialogClose>

                        <DialogHeader className='flex items-center justify-center w-full border-b pb-4 h-[60px]'>
                            <DialogTitle className='text-2xl capitalize'>
                                Địa điểm
                            </DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-4 px-4 justify-between h-full min-h-[calc(60vh_-_60px)]">
                            <div className='flex flex-col gap-4 h-full'>
                                <div className="relative">
                                    <TiLocation className="size-5 text-[#1EAAB1] absolute top-1/2 -translate-y-1/2 left-2" />
                                    <Input
                                        type="text"
                                        className={`disabled:bg-[#E6E8EC] lg:text-base text-sm  disabled:border-gray-300 disabled:border-2  focus:border-[#2FB9BD]
                                                            w-full border-[#E6E8EC] !pl-7 !pr-[38px] border-2 lg:py-3 py-2 rounded-2xl px-3 focus-visible:ring-0 text-black font-medium focus-visible:ring-offset-0 `}
                                        placeholder="Nhập địa điểm"
                                        onKeyUp={() => {
                                            setCoordinates({ lat: 0, lng: 0 })
                                        }}
                                        onChange={handleInputChange}
                                        value={dataAddress}
                                    />
                                    {
                                        dataAddress &&
                                        <X
                                            onClick={handleClearDataAddress}
                                            className="absolute cursor-pointer right-0 -translate-x-1/2 top-1/2 -translate-y-1/2 text-xs text-white bg-[#2FB9BD] p-1 rounded-full"
                                        />
                                    }
                                    {
                                        debouncedOpenBoxSearch && debouncedDataAddress && dataBoxSearch.length > 0 ?
                                            <ScrollArea className='absolute top-full left-0 bg-white border w-full h-[260px] z-40 pr-2 mt-2 rounded-2xl'>
                                                <div className='flex flex-col '>
                                                    {dataBoxSearch.slice(0, 10).map((item, index) => (
                                                        <div
                                                            key={item.id}
                                                            onClick={() => handleChangeAddress(item, 'viewboxsearch')}
                                                            className={`${dataBoxSearch.length - 1 === index ? "" : "border-b"} flex flex-row gap-2 px-4 py-3 hover:bg-slate-100 cursor-pointer duration-200 transition ease-in-out`}
                                                        >
                                                            <div className='size-5'>
                                                                <TiLocation className="size-5 text-[#1EAAB1]" />
                                                            </div>
                                                            <div>
                                                                {item.address}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                            :
                                            null
                                    }
                                </div>

                                <div onClick={() => handleAddressCurrent()} className="lg:py-3 py-2 px-1 flex items-center gap-2 cursor-pointer hover:bg-gray-100  rounded-2xl transition-all duration-150 ease-linear">
                                    <TiLocation className="size-5 text-[#1EAAB1]" />
                                    <h1 className="font-medium lg:text-base text-sm">Vị trí hiện tại</h1>
                                </div>

                                <Separator />

                                {
                                    isLoadingData ?
                                        <SkeletonDialogAddress />
                                        :
                                        <div className="p-1 flex flex-col gap-4">
                                            <h1 className="font-medium lg:text-base text-sm">Giao xe sân bay</h1>
                                            <div className="flex items-center flex-wrap gap-2">
                                                {
                                                    dataPlane && dataPlane?.map(item => {

                                                        return (
                                                            <Badge key={item.id}
                                                                onClick={() => handleChangeAddress(item, "airport")}
                                                                variant="outline"
                                                                className={`${(type == "address_pickup" && (+coordinatesComponent.lat.toFixed(4) == +item.latitude.toFixed(4)) && (+coordinatesComponent.lng.toFixed(4) == +item.longitude.toFixed(4))) ||
                                                                    (type == "address_destination" && (+coordinatesComponent.latTo.toFixed(4) == +item.latitude.toFixed(4)) && (+coordinatesComponent.lngTo.toFixed(4) == +item.longitude.toFixed(4)))
                                                                    ? "border-[#2FB9BD]" : "border-[#E6E8EC]"}
                                                                     font-medium py-2 px-4 cursor-pointer hover:bg-gray-100 hover:border-[#2FB9BD] border-2 flex items-center gap-1 lg:text-base text-sm`}
                                                            >
                                                                <LuPlane className="" />
                                                                <span className="capitalize">{item.name}</span>
                                                            </Badge>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                }
                            </div>

                            <div className="flex items-center justify-end mb-4">
                                <Button
                                    disabled={!flagValidateSubmit ? true : false}
                                    onClick={() => onSubmit()}
                                    className='xl:px-6 w-fit xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80'
                                >
                                    Áp dụng
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </>
    )
})

DialogFilterAddress.displayName = 'DialogFilterAddress';

export default DialogFilterAddress
