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
import { Button } from "../ui/button";
import { TiLocation } from "react-icons/ti";
import { memo, useEffect, useState } from "react";

import { useDialogAddress, useDialogAnswerPolicy, useDialogCalendar, useDialogRouteAddress } from "@/hooks/useOpenDialog";
import useGoogleApi from "@/services/filter/google/google.services";
import { usePathname } from "next/navigation";
import { getListCars } from "@/services/cars/cars.services";
import { useDataListCarAutonomous, useDataListCarsDriver, useDataPolicy } from "@/hooks/useDataQueryKey";
import { CustomDataListCars } from "@/custom/CustomData";
import moment from "moment";

import { FaRegQuestionCircle } from "react-icons/fa";
import { ActionTooltip } from "../tooltip/ActionTooltip";
import { useResize } from "@/hooks/useResize";
import Map from "../map/Maps";

import { MFDirectionsRenderer, MFMap } from "react-map4d-map"
import { Label } from "../ui/label";
import { toastCore } from "@/lib/toast";
import { FormatDistance } from "../format/FormatNumber";

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
        coordinates,
        indexAddressDestination,
        valueAddressPickup,
        valueAddressDestination,
        setType,
        setIndexAddressDestination,
        setOpenDialogAddress,
    } = useDialogAddress()

    const {
        flagCloseModalRouteAddress,
        openDialogRouteAddress,
        dataTotalAddress,
        setOpenDialogRouteAddress,
        setDataTotalAddress,
        setValueTwoAddress,
        setFlagCloseModalRouteAddress
    } = useDialogRouteAddress()

    const [flagValidateSubmit, setFlagValidateSubmit] = useState<boolean>(false)
    const [options, setOptions] = useState<any>({});

    // Lấy thời điểm hiện tại
    const currentTime = new Date();

    // Tính thời điểm hết hạn của cookie là 60 giây sau thời điểm hiện tại
    const expirationTime = new Date(currentTime.getTime() + 30 * 60 * 1000);

    useEffect(() => {
        if (openDialogRouteAddress) {
            const fetchDataRouteMatrixAddress = async () => {
                try {
                    const dataParams = {
                        key: process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D,
                        // origin: `${coordinates.lat},${coordinates.lng}`,
                        // destination: `${coordinates.latTo},${coordinates.lngTo}`,
                        // mode: "car",
                        // language: "vi",
                        // weighting: 1,
                        // optimize: false,
                        origin: `${coordinates.lat},${coordinates.lng}`,
                        destination: `${coordinates.lat},${coordinates.lng}`,
                        points: `${coordinates.latTo},${coordinates.lngTo}`,
                        mode: "car",
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
                                    lng: step.startLocation.lng,
                                    lat: step.startLocation.lat,
                                }));

                                console.log('route : ', route);

                                const processedRouteEnd = route.legs[0].steps.map((step: any) => ({
                                    lng: step.endLocation.lng,
                                    lat: step.endLocation.lat,
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
                                // routes: [routes1[0], routes2[1]],
                                routes: routes2,
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

                        // Đặt options vào state
                        setOptions(options);
                        setDataTotalAddress({
                            distance: data.result.routes[0].distance
                        })
                    }

                } catch (err) {
                    throw err
                }
            }
            fetchDataRouteMatrixAddress()
        }
    }, [openDialogRouteAddress, valueAddressPickup, valueAddressDestination[indexAddressDestination].valueAddress])

    // handle close modal
    const handleCloseModal = () => {
        if (!flagValidateSubmit) {
            toastCore.error("Vui lòng chọn địa điểm đón hoặc địa điểm đến!")
        } else if (flagCloseModalRouteAddress) {
            toastCore.error("Vui lòng nhấn tìm xe!")
        } else {
            setOpenDialogRouteAddress(false)

            setFlagValidateSubmit(false)
            setFlagCloseModalRouteAddress(false)
        }
    }

    // submit áp dụng
    const onSubmit = async () => {
        if (pathname.startsWith('/list-cars-driver')) {
            const query = {
                lat: valueAddressPickup ? coordinates.lat : undefined,
                lon: valueAddressPickup ? coordinates.lng : undefined,
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

                setOpenDialogRouteAddress(false)

                setValueTwoAddress(`${valueAddressPickup.split(',')[0]} - ${valueAddressDestination[indexAddressDestination].valueAddress.split(',')[0]}`)

                Cookies.set('coordinates', JSON.stringify(coordinates), { expires: expirationTime });
            }

        }
    }

    const handleOpenDialogAddress = (type: string, index?: number) => {
        setOpenDialogAddress(true)
        setType(type)
        if (index) {
            setIndexAddressDestination(index)
        }
    }

    useEffect(() => {
        if (!valueAddressPickup || !valueAddressDestination[indexAddressDestination].valueAddress) {
            setFlagValidateSubmit(false)
        } else {
            setFlagValidateSubmit(true)
        }
    }, [valueAddressPickup, valueAddressDestination[indexAddressDestination].valueAddress])

    return (
        <>
            <Dialog modal={true} open={openDialogRouteAddress} >
                <DialogPortal>
                    <DialogOverlay />
                    <DialogContent className="flex flex-col px-0 pb-0 lg:max-w-[740px] lg:w-[740px] max-w-[95%] w-[95%] min-h-[90vh] max-h-[95vh] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
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

                        <div className="flex flex-col gap-4 px-4 justify-between h-full overflow-auto min-h-[calc(90vh_-_60px)]">
                            <div className='flex flex-col gap-4 h-full'>
                                <div className='flex flex-row items-center gap-1'>
                                    <div className='3xl:text-sm text-xs text-[#767676]'>
                                        Di chuyển liên tỉnh, trả khách tại điểm đón.
                                    </div>
                                    {
                                        isVisibleTablet ?
                                            <div onClick={() => setOpenDialogAnswerPolicy(true, "setting_price_car")}>
                                                <FaRegQuestionCircle className='text-[#767676] text-lg cursor-pointer' />
                                            </div>
                                            :
                                            <ActionTooltip
                                                side="bottom"
                                                align="center"
                                                label={(
                                                    <div className='2xl:max-w-[560px] xl:max-w-[520px] max-w-[420px]'>
                                                        {/* <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy ? isStatePolicy?.dataPolicy?.setting_price_car : ''}` }} /> */}
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

                                <div className='w-full 3xl:h-[400px] h-[300px] '>
                                    <MFMap
                                        options={{
                                            center: { lat: coordinates.lat, lng: coordinates.lng },
                                            zoom: 16,
                                            controls: true,
                                            mapType: "RASTER",
                                        }}

                                        accessKey={`${process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D}`}
                                        // accessKey={``}
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

                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                            Địa điểm đón
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <TiLocation className="text-xl text-[#1EAAB1]" />
                                            </span>
                                            <div
                                                id="place"
                                                onClick={() => handleOpenDialogAddress('address_pickup')}
                                                className='pl-10  cursor-pointer pr-2 py-3 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 border-0 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                            >
                                                {valueAddressPickup ? valueAddressPickup : 'Chọn địa điểm đón'}
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        valueAddressDestination && valueAddressDestination?.map((destination, index) => (
                                            <div className='flex flex-col gap-2 w-full' key={index}>
                                                <Label className='text-sm text-[#6F7689]' htmlFor="place">
                                                    Địa điểm đến {valueAddressDestination.length === 1 ? "" : index + 1}
                                                </Label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <TiLocation className="text-xl text-[#1EAAB1]" />
                                                    </span>
                                                    <div
                                                        id="place"
                                                        onClick={() => handleOpenDialogAddress('address_destination', index)}
                                                        className='pl-10  cursor-pointer pr-2 py-3 w-full 3xl:text-base 2xl:text-sm xl:text-[13px] lg:text-xs md:text-xs text-xs truncate justify-start rounded-xl bg-[#F6F6F8]/70 border-0 hover:bg-[#F6F6F8]/70 focus-visible:outline-none focus-visible:ring-0 
                                        focus-visible:ring-offset-0 text-[#16171B] font-normal' // Để cung cấp khoảng trống bên trái để không làm che biểu tượng
                                                    >
                                                        {valueAddressDestination[index].valueAddress ? valueAddressDestination[index].valueAddress : 'Chọn địa điểm đến'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className='border rounded-lg p-4 flex flex-col'>
                                    <div className='flex justify-between'>
                                        <div className='3xl:text-base text-sm font-medium'>
                                            Tổng lộ trình:
                                        </div>
                                        <div className='3xl:text-base text-sm font-bold'>
                                            {dataTotalAddress?.distance?.value ? FormatDistance(dataTotalAddress.distance.value) : 0}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end mb-4">
                                <Button
                                    disabled={!flagValidateSubmit ? true : false}
                                    onClick={() => onSubmit()}
                                    className='xl:px-6 w-fit xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80'
                                >
                                    Tìm xe
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
