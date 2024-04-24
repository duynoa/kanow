import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


import { X } from "lucide-react"
import { useForm } from "react-hook-form";

import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuPlane } from "react-icons/lu";
import { TiLocation } from "react-icons/ti";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { useGeneralKey } from "@/hooks/useGeneralKey";
import { useDialogAddress, useDialogCalendar } from "@/hooks/useOpenDialog";
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

export function DialogFilterAddress({ }: Props) {
    const pathname = usePathname()
    const { generalKey } = useGeneralKey()

    const { apiGetAddress } = useGoogleApi()

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
        setOnSubmitFilter
    } = useDialogAddress()

    const form = useForm({
        defaultValues: {
            valueAddress: ""
        },
    })

    const [dataPlane, setDataPlane] = useState<IPlace[]>([])

    const onSubmit = async (dataAddress: any) => {
        if (pathname.startsWith('/list-cars-autonomous')) {
            const query = {
                "lat": dataAddress.valueAddress ? coordinates.lat : undefined,
                "lon": dataAddress.valueAddress ? coordinates.lng : undefined,
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
                isStateListCarAutonomous.dataParams?.company_car_search === "0" &&
                isStateListCarAutonomous.dataParams?.type_car_search?.length === 0 &&
                isStateListCarAutonomous?.dataParams?.transmission_search == "0" &&
                isStateListCarAutonomous.dataParams?.star_search === 0
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

                setValueAddressPickup(dataAddress.valueAddress)
                setOpenDialogAddress(false)
            }

        } else if (pathname.startsWith('/list-cars-driver')) {
            const query = {
                "lat": dataAddress.valueAddress ? coordinates.lat : undefined,
                "lon": dataAddress.valueAddress ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: isStateListCarsDriver?.dataParams?.company_car_search == "0" ? undefined : isStateListCarsDriver?.dataParams?.company_car_search,
                type_car_search: isStateListCarsDriver?.dataParams?.type_car_search && isStateListCarsDriver?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarsDriver?.dataParams?.type_car_search,
                transmission_search: isStateListCarsDriver?.dataParams?.transmission_search == "0" ? undefined : isStateListCarsDriver?.dataParams?.transmission_search,
                star_search: isStateListCarsDriver?.dataParams?.star_search == 0 ? undefined : isStateListCarsDriver?.dataParams?.star_search,
                tram_search: isStateListCarsDriver?.dataParams?.tram_search == 0 ? undefined : isStateListCarsDriver?.dataParams?.tram_search,
                discount_search: isStateListCarsDriver?.dataParams?.discount_search == 0 ? undefined : isStateListCarsDriver?.dataParams?.discount_search,
                book_car_flash: isStateListCarsDriver?.dataParams?.book_car_flash == 0 ? undefined : isStateListCarsDriver?.dataParams?.book_car_flash,
                mortgage: isStateListCarsDriver?.dataParams?.mortgage == 0 ? undefined : isStateListCarsDriver?.dataParams?.mortgage,
                delivery_car: isStateListCarsDriver?.dataParams?.delivery_car == 0 ? undefined : isStateListCarsDriver?.dataParams?.delivery_car,
            }

            let limit = isStateListCarsDriver.limit.limitAllCars;

            if (
                isStateListCarsDriver.dataParams?.company_car_search === "0" &&
                isStateListCarsDriver.dataParams?.type_car_search?.length === 0 &&
                isStateListCarsDriver?.dataParams?.transmission_search == "0" &&
                isStateListCarsDriver.dataParams?.star_search === 0
            ) {
                limit = isStateListCarsDriver.limit.limitAllCars;
            } else {
                limit = isStateListCarsDriver.limit.limitFilterCars;
            }

            const { data } = await getListCars(1, limit, query)

            if (data && data.data && data.base) {
                let { customDataListCars } = CustomDataListCars(data)

                queryKeyIsStateListCarsDriver({
                    listCardCars: customDataListCars,
                    page: 2,
                    next: data?.links?.next
                })

                setValueAddressPickup(dataAddress.valueAddress)
                setOpenDialogAddress(false)
            }

        } else {
            if (type === "address_pickup") {
                console.log('dataAddress', dataAddress);
                setValueAddressPickup(dataAddress.valueAddress)
                setOpenDialogAddress(false)
                setOnSubmitFilter(true)
            } else if (type === "address_destination") {
                // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                const updatedAddressDestination = [...valueAddressDestination];
                updatedAddressDestination[indexAddressDestination] = {
                    id: valueAddressDestination[indexAddressDestination].id,
                    valueAddress: dataAddress.valueAddress
                };

                console.log('dataAddress', dataAddress);
                console.log('updatedAddressDestination', updatedAddressDestination);


                // Đặt lại giá trị của mảng điểm đến với điểm đến được cập nhật
                setValueAddressDestination(updatedAddressDestination);

                // Đóng dialog địa chỉ
                setOpenDialogAddress(false);

                // Đặt cờ để gửi bộ lọc
                setOnSubmitFilter(true);
            }
        }
    }

    console.log('valueAddressDestination: ', valueAddressDestination);


    const getGeolocated = useGeolocated({
        onSuccess(position) {
            setCoordinates({
                defaultLat: position.coords.latitude,
                defaultLng: position.coords.longitude,
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            fetchLocationName(position.coords.latitude, position.coords.longitude)
        }
    })

    const handleAddressCurent = () => {
        return getGeolocated.getPosition()
    }

    // lấy danh sách giao xe sân bay
    const fetchAirportCarDelivery = async () => {
        try {
            const { data: { data } } = await apiGetListAirportCarDelivery()
            if (data) {
                setDataPlane(data)
            }
        } catch (error) {
            throw error
        }
    };

    // lấy địa chỉ theo vị trí hiên tại của google
    const fetchLocationName = async (lat: any, lng: any) => {
        try {
            const response = await apiGetAddress(lat, lng, generalKey.google_api_key)
            const data = response.data;
            if (data.status === 'OK') {
                const address = data.results[0].formatted_address

                form.setValue("valueAddress", address);
                return
            }
            console.log('Không tìm thấy thông tin vị trí.');
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    // lấy định vị tọa độ hiện tại
    useEffect(() => {
        if (openDialogAddress) {
            fetchAirportCarDelivery()
            if (valueAddressPickup) {
                form.setValue("valueAddress", valueAddressPickup)
                return
            }
            form.reset()
            return
        }
    }, [openDialogAddress, generalKey.google_api_key])

    return (
        <>
            <Dialog modal={false} open={openDialogAddress} >
                {openDialogAddress && (
                    <div
                        onClick={() => setOpenDialogAddress(false)}
                        className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                )}
                <DialogContent className="px-0 pb-0 lg:max-w-[740px] lg:w-[740px] max-w-[95%] w-[95%] max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    <DialogClose
                        onClick={() => setOpenDialogAddress(false)}
                        className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                    >
                        <X className="size-8 text-[#000000]" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    <DialogHeader className='flex items-center justify-center w-full border-b pb-4'>
                        <DialogTitle className='text-2xl capitalize'>
                            Địa điểm
                        </DialogTitle>
                    </DialogHeader>
                    <div className="px-4 flex flex-col gap-4 !z-[100]">
                        <Form {...form}>
                            <FormField
                                control={form.control}
                                name="valueAddress"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <div className="relative">
                                                        <TiLocation className="size-5 text-[#1EAAB1] absolute top-1/2 -translate-y-1/2 left-2" />
                                                        <SearchAddress onChange={(e: any) => {
                                                            field.onChange(e)
                                                        }}
                                                        >
                                                            <Input
                                                                type="text"
                                                                className={`disabled:bg-[#E6E8EC] lg:text-base text-sm  disabled:border-gray-300 disabled:border-2  focus:border-[#2FB9BD]
                                                            w-full border-[#E6E8EC] !pl-7 !pr-[38px] border-2 lg:py-3 py-2 rounded-2xl px-3 focus-visible:ring-0 text-black font-medium focus-visible:ring-offset-0 `}
                                                                placeholder="Nhập địa điểm"
                                                                onKeyUp={() => {
                                                                    setCoordinates({ lat: 0, lng: 0 })
                                                                }}
                                                                {...field}
                                                            />
                                                        </SearchAddress>
                                                        {
                                                            field.value &&
                                                            <X
                                                                onClick={() => form.reset()}
                                                                className="absolute cursor-pointer right-0 -translate-x-1/2 top-1/2 -translate-y-1/2 text-xs text-white bg-[#2FB9BD] p-1 rounded-full"
                                                            />
                                                        }
                                                    </div>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />

                            <div onClick={() => handleAddressCurent()} className="lg:py-3 py-2 px-1 flex items-center gap-2 cursor-pointer hover:bg-gray-100  rounded-2xl transition-all duration-150 ease-linear">
                                <TiLocation className="size-5 text-[#1EAAB1]" />
                                <h1 className="font-medium lg:text-base text-sm">Vị trí hiện tại</h1>
                            </div>
                            <Separator />
                            <div className="p-1 flex flex-col gap-4">
                                <h1 className="font-medium lg:text-base text-sm">Giao xe sân bay</h1>
                                <FormField
                                    control={form.control}
                                    name="valueAddress"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center flex-wrap gap-2">
                                                        {dataPlane.map(e => {
                                                            return (
                                                                <Badge key={e.id}
                                                                    onClick={() => {
                                                                        field.onChange(e.address)
                                                                        setCoordinates({ lat: e.latitude, lng: e.longitude })
                                                                    }}
                                                                    variant="outline"
                                                                    className={`${field.value == e.address ? "border-[#2FB9BD]" : "border-[#E6E8EC]"} font-medium py-2 px-4 cursor-pointer hover:bg-gray-100 hover:border-[#2FB9BD] border-2 flex items-center gap-1 lg:text-base text-sm`}
                                                                    >
                                                                    <LuPlane className="" />
                                                                    <span className="capitalize">{e.name}</span>
                                                                </Badge>
                                                            )
                                                        })}
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </Form>
                        <div className="mb-4 flex justify-end">
                            <Button
                                onClick={() => form.handleSubmit((values: any) => onSubmit(values))()}
                                className='xl:px-6 w-fit xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80'
                            >
                                Áp dụng
                            </Button>
                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )
}
