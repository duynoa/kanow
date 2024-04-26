import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog"


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
import { useDialogAddress, useDialogAnswerPolicy, useDialogCalendar, useDialogRouteAddress } from "@/hooks/useOpenDialog";
import SearchAddress from "../searchAddress/SearchAddress";
import useGoogleApi from "@/services/filter/google/google.services";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import useAirportCarDeliveryApi from "@/services/filter/listAirport/airportCarDelivery.services";
import { useGeolocated } from "react-geolocated";
import { usePathname } from "next/navigation";
import { getListCars } from "@/services/cars/cars.services";
import { useDataListCarAutonomous, useDataListCarsDriver, useDataPolicy } from "@/hooks/useDataQueryKey";
import { CustomDataListCars } from "@/custom/CustomData";
import moment from "moment";
import { debounce } from "lodash";
import { useDebounce } from "use-debounce";
import { ScrollArea } from "../ui/scroll-area";
import SkeletonDialogAddress from "../skeleton/SkeletonDialogAddress";
import { FaRegQuestionCircle } from "react-icons/fa";
import { ActionTooltip } from "../tooltip/ActionTooltip";
import { useResize } from "@/hooks/useResize";
import Map from "../map/Maps";

import { MFBuilding, MFDirectionsRenderer, MFMap } from "react-map4d-map"

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

interface MarkerOptions {
    title: string;
    visible: boolean;
    draggable: boolean;
    userInteractionEnabled: boolean;
    position?: { lat: number; lng: number }; // Định nghĩa thuộc tính position
}

interface Options {
    routes: Array<Array<{ lat: number; lng: number }>>;
    originMarkerOptions: MarkerOptions;
    destinationMarkerOptions: MarkerOptions;
    activeOutlineWidth: number;
    inactiveOutlineWidth: number;
    inactiveOutlineColor: string;
}

const DialogRouteAddress = memo(({ }: Props) => {
    const pathname = usePathname()
    const { apiRouteMatrixAddress } = useGoogleApi()

    const { isStateListCarAutonomous, queryKeyIsStateListCarAutonomous } = useDataListCarAutonomous()
    const { isStateListCarsDriver, queryKeyIsStateListCarsDriver } = useDataListCarsDriver()
    const { dateReal } = useDialogCalendar()

    const { isVisibleTablet } = useResize()
    const { setOpenDialogAnswerPolicy } = useDialogAnswerPolicy()

    const {
        onSubmitFilter,
        setOnSubmitFilter,
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

    const { openDialogRouteAddress, dataTotalAddress, setOpenDialogRouteAddress, setDataTotalAddress } = useDialogRouteAddress()

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
    const [options, setOptions] = useState<any>({});

    useEffect(() => {
        if (openDialogRouteAddress) {
            const fetchDataRouteMatrixAddress = async () => {
                try {
                    const dataParams = {
                        key: process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D,
                        origin: `${coordinates.lat},${coordinates.lng}`,
                        destination: `${coordinates.latTo},${coordinates.lngTo}`,
                        mode: "car",
                        language: "vi",
                        weighting: 1,
                        optimize: false,
                    }

                    const { data } = await apiRouteMatrixAddress(dataParams)

                    console.log('data ', data);
                    if (data && data.code == "ok" && data.result) {
                        const formatDataToOptions = (data: any) => {
                            // Khởi tạo mảng routes rỗng
                            const routes1: any[] = [];
                            const routes2: any[] = [];
                            // Duyệt qua mỗi tuyến đường trong data.routes
                            data.routes.forEach((route: any) => {
                                // Xử lý mỗi tuyến đường
                                const processedRouteStart = route.legs[0].steps.map((step: any) => ({
                                    lat: step.startLocation.lat,
                                    lng: step.startLocation.lng
                                }));

                                console.log('route : ', route);

                                const processedRouteEnd = route.legs[0].steps.map((step: any) => ({
                                    lat: step.endLocation.lat,
                                    lng: step.endLocation.lng
                                }));
                                console.log('processedRouteEnd : ', processedRouteEnd);


                                // Thêm tuyến đường đã xử lý vào mảng routes
                                routes1.push(processedRouteStart);
                                routes2.push(processedRouteEnd);
                            });

                            const originPosition = {
                                lat: parseFloat(data.routes[0].legs[0].startLocation.lat),
                                lng: parseFloat(data.routes[0].legs[0].startLocation.lng)
                            };

                            const destinationPosition = {
                                lat: parseFloat(data.routes[0].legs[0].endLocation.lat),
                                lng: parseFloat(data.routes[0].legs[0].endLocation.lng)
                            };

                            const originMarkerOptions = {
                                position: originPosition,
                                title: "Start",
                                draggable: true,
                                visible: true
                            };

                            const destinationMarkerOptions = {
                                position: destinationPosition,
                                title: "End",
                                draggable: true,
                                visible: true,
                                userInteractionEnabled: false
                            };

                            const options = {
                                routes: [routes1[0], routes2[1]],
                                // routes: routes,
                                originMarkerOptions: originMarkerOptions,
                                destinationMarkerOptions: destinationMarkerOptions,
                                activeOutlineWidth: 0,
                                inactiveOutlineWidth: 1,
                                inactiveOutlineColor: "#FF00FF"
                            };

                            return options;
                        };

                        // Sử dụng hàm để format data thành options
                        const options = formatDataToOptions(data.result);
                        console.log('options', options);


                        // Đặt options vào state
                        setOptions(options);
                    }

                } catch (err) {
                    throw err
                }
            }
            fetchDataRouteMatrixAddress()
        }
    }, [openDialogRouteAddress])

    // handle close modal
    const handleCloseModal = () => {
        setOpenDialogRouteAddress(false)
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
                isStateListCarAutonomous.dataParams?.company_car_search === "0" &&
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
                setCoordinates(coordinatesComponent)
                setValueAddressPickup(dataAddress)
                setOpenDialogAddress(false)
            }

        } else if (pathname.startsWith('/list-cars-driver')) {
            const query = {
                lat: dataAddress ? coordinatesComponent.lat : undefined,
                lon: dataAddress ? coordinatesComponent.lng : undefined,
                type: 2,
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
                isStateListCarsDriver.dataParams?.star_search === 0 &&
                isStateListCarsDriver.dataParams?.tram_search === 0 &&
                isStateListCarsDriver.dataParams?.discount_search === 0 &&
                isStateListCarsDriver.dataParams?.book_car_flash === 0 &&
                isStateListCarsDriver.dataParams?.mortgage === 0 &&
                isStateListCarsDriver.dataParams?.delivery_car === 0
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

                setValueAddressPickup(dataAddress)
                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))
                setCoordinates(coordinatesComponent)
                setValueAddressPickup(dataAddress)
                setOpenDialogAddress(false)
            }

        } else {
            if (type === "address_pickup" && dataAddress) {
                setValueAddressPickup(dataAddress)
                setCoordinates(coordinatesComponent)
                setDataAddress("")
                setOpenDialogAddress(false)
                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))
                console.log('check ?/');


            } else if (type === "address_destination" && dataAddress) {
                // Cập nhật giá trị của điểm đến tại chỉ mục index bằng giá trị mới
                const updatedAddressDestination = [...valueAddressDestination];
                updatedAddressDestination[indexAddressDestination] = {
                    id: valueAddressDestination[indexAddressDestination].id,
                    valueAddress: dataAddress
                };

                setCoordinates(coordinatesComponent)
                // Đặt lại giá trị của mảng điểm đến với điểm đến được cập nhật
                setValueAddressDestination(updatedAddressDestination);
                setDataAddress("")

                // Đóng dialog địa chỉ
                setOpenDialogAddress(false);

                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))
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

                localStorage.removeItem("latCoordinates")
                localStorage.removeItem("lngCoordinates")

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
                    valueAddress: "dataAddress"
                };

                setValueAddressDestination([updatedAddressDestination])

                localStorage.setItem("coordinates", JSON.stringify(coordinatesComponent))
            }
        }
    }

    // const option = {
    //     routes: [
    //         [
    //             { lat: 16.078814, lng: 108.221592 },
    //             { lat: 16.078972, lng: 108.223034 },
    //             { lat: 16.075353, lng: 108.223513 },
    //         ],
    //         [
    //             { lat: 16.078814, lng: 108.221592 },
    //             { lat: 16.077491, lng: 108.221735 },
    //             { lat: 16.077659, lng: 108.223212 },
    //             { lat: 16.075353, lng: 108.223513 },
    //         ],
    //     ],
    //     originMarkerOptions: {
    //         position: { lat: 16.079774, lng: 108.220534 },
    //         title: "Start",
    //         draggable: true,
    //         visible: true,
    //     },
    //     destinationMarkerOptions: {
    //         position: { lat: 16.073661, lng: 108.222972 },
    //         title: "End",
    //         visible: true,
    //         draggable: true,
    //         userInteractionEnabled: false,
    //     },

    //     activeOutlineWidth: 0,
    //     inactiveOutlineWidth: 2,
    //     inactiveOutlineColor: "#FF00FF",
    // };


    console.log('options', options);

    return (
        <>
            <Dialog modal={true} open={openDialogRouteAddress} >
                {
                    openDialogRouteAddress && (
                        <div
                            onClick={handleCloseModal}
                            className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                    )
                }
                <DialogPortal>
                    <DialogContent className="flex flex-col px-0 pb-0 lg:max-w-[740px] lg:w-[740px] max-w-[95%] w-[95%] min-h-[90vh] max-h-[95vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                        <DialogClose
                            onClick={handleCloseModal}
                            className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                        >
                            <X className="size-8 text-[#000000]" />
                            <span className="sr-only">Close</span>
                        </DialogClose>

                        <DialogHeader className='flex items-center justify-center w-full border-b pb-4 h-[60px]'>
                            <DialogTitle className='text-2xl capitalize'>
                                Lộ trình
                            </DialogTitle>
                        </DialogHeader>

                        <div className="flex flex-col gap-4 px-4 justify-between h-full min-h-[calc(90vh_-_60px)]">
                            <div className='flex flex-col gap-4 h-full'>
                                <div className='flex flex-row items-center gap-1'>
                                    <div className='3xl:text-sm text-xs text-[#767676]'>
                                        Di chuyển liên tỉnh, trả khách tại điểm đón.
                                    </div>
                                    {
                                        isVisibleTablet ?
                                            <div onClick={() => setOpenDialogAnswerPolicy(true, "car_price_policy")}>
                                                <FaRegQuestionCircle className='text-[#767676] text-lg cursor-pointer' />
                                            </div>
                                            :
                                            <ActionTooltip
                                                side="bottom"
                                                align="center"
                                                label={(
                                                    <div className='2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                        {/* <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy ? isStatePolicy?.dataPolicy?.car_price_policy : ''}` }} /> */}
                                                        chưa có
                                                    </div>
                                                )}
                                            >
                                                <div>
                                                    <FaRegQuestionCircle className='text-[#767676] lg:text-lg text-base cursor-pointer' />
                                                </div>
                                            </ActionTooltip>
                                    }
                                </div>

                                <div className='w-full h-[400px]'>
                                    <MFMap
                                        options={{
                                            center: { lat: coordinates.lat, lng: coordinates.lng },
                                            zoom: 16,
                                            controls: true,
                                            mapType: "RASTER",
                                        }}

                                        accessKey={`${process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D}`}
                                        version={"2.4"}

                                    >
                                        <MFDirectionsRenderer
                                            routes={options.routes}
                                            originMarkerOptions={options.originMarkerOptions}
                                            destinationMarkerOptions={options.destinationMarkerOptions}
                                            activeOutlineWidth={options.activeOutlineWidth}
                                            inactiveOutlineWidth={options.inactiveOutlineWidth}
                                            inactiveOutlineColor={options.inactiveOutlineColor}
                                        />
                                    </MFMap>
                                </div>
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

DialogRouteAddress.displayName = 'DialogRouteAddress';

export default DialogRouteAddress
