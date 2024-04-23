import { useEffect, useState } from "react"

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
import { useDialogAddress, useDialogCalendar, useDialogFilterListCars } from "@/hooks/useOpenDialog";

import { FormatNumberHundred } from "../format/FormatNumber";
import { Button } from "../ui/button";
import { getListAutomaker, getListCars, getListTypeCars } from "@/services/cars/cars.services";
import { ScrollArea } from "../ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { toast } from "react-toastify";
import { CustomDataListCars } from "@/custom/CustomData";
import { IInitialStateListCarAutonomous } from "@/types/Initial/IInitial";
import { useDataListCarAutonomous, useDataListCarsDriver } from "@/hooks/useDataQueryKey";
import moment from "moment";
import { usePathname } from "next/navigation";
import SkeletonDialogFilterListCars from "../skeleton/SkeletonDialogFilterListCars";

type Props = {}

const DialogFilterListCars = ({ }: Props) => {
    // const { isStateListCarAutonomous, queryKeyIsStateListCarAutonomous } = useListCar()

    const pathname = usePathname()
    const [paramCompanyCarSearch, setParamCompanyCarSearch] = useState<string>("0")
    const [paramTransmissionSearch, setParamTransmissionSearch] = useState<string>("0")

    const { isStateListCarAutonomous, queryKeyIsStateListCarAutonomous } = useDataListCarAutonomous()
    const { isStateListCarsDriver, queryKeyIsStateListCarsDriver } = useDataListCarsDriver()
    const { openDialogFilterListCars, setOpenDialogFilterListCars, type } = useDialogFilterListCars()

    const {
        valueAddress,
        coordinates,
    } = useDialogAddress()

    const { dateReal } = useDialogCalendar()

    const handleOpenChangeModal = (type?: string) => {
        setOpenDialogFilterListCars(false, type)
        setTimeout(() => {
            if (pathname.startsWith("/list-cars-autonomous")) {
                setParamTransmissionSearch(isStateListCarAutonomous?.dataParams?.transmission_search)
                setParamCompanyCarSearch(isStateListCarAutonomous?.dataParams?.company_car_search)
            } else if (pathname.startsWith("/list-cars-driver")) {
                setParamTransmissionSearch(isStateListCarsDriver?.dataParams?.transmission_search)
                setParamCompanyCarSearch(isStateListCarsDriver?.dataParams?.company_car_search)

            }
        }, 300);
    }

    useEffect(() => {
        if (pathname.startsWith("/list-cars-autonomous")) {
            if (type === 'company_car_search' && openDialogFilterListCars && isStateListCarAutonomous?.filter?.listAutomaker?.length === 0) {
                const fetchDataListAutomaker = async () => {
                    try {
                        queryKeyIsStateListCarAutonomous({
                            ...isStateListCarAutonomous,
                            loading: {
                                isLoadingDialogFilterListCars: true
                            }
                        })

                        const dataParams = {
                            type: 1
                        }

                        const { data } = await getListAutomaker(dataParams);

                        if (data && data.data) {
                            queryKeyIsStateListCarAutonomous({
                                ...isStateListCarAutonomous,
                                filter: {
                                    ...isStateListCarAutonomous.filter,
                                    listAutomaker: data.data,
                                },
                                loading: {
                                    isLoadingDialogFilterListCars: false
                                }
                            })
                        } else {
                            queryKeyIsStateListCarAutonomous({
                                ...isStateListCarAutonomous,
                                loading: {
                                    isLoadingDialogFilterListCars: false
                                }
                            })

                        }
                    } catch (err) {
                        throw err
                    }
                }

                fetchDataListAutomaker()
            } else if (type === 'type_car_search' && openDialogFilterListCars && isStateListCarAutonomous?.filter?.listTypesCar?.length === 0) {
                const fetchDataListTypesCar = async () => {
                    try {
                        queryKeyIsStateListCarAutonomous({
                            ...isStateListCarAutonomous,
                            loading: {
                                isLoadingDialogFilterListCars: true
                            }
                        })
                        const dataParams = {
                            type: 1
                        }

                        const { data } = await getListTypeCars(dataParams);

                        if (data && data.data) {
                            queryKeyIsStateListCarAutonomous({
                                ...isStateListCarAutonomous,
                                filter: {
                                    ...isStateListCarAutonomous.filter,
                                    listTypesCar: data.data,
                                },
                                loading: {
                                    isLoadingDialogFilterListCars: false
                                }
                            })
                        } else {
                            queryKeyIsStateListCarAutonomous({
                                ...isStateListCarAutonomous,
                                loading: {
                                    isLoadingDialogFilterListCars: false
                                }
                            })

                        }
                    } catch (err) {
                        throw err
                    }
                }

                fetchDataListTypesCar()
            }
        } else if (pathname.startsWith("/list-cars-driver")) {
            if (type === 'company_car_search' && openDialogFilterListCars && isStateListCarsDriver?.filter?.listAutomaker?.length === 0) {
                const fetchDataListAutomaker = async () => {
                    try {
                        queryKeyIsStateListCarsDriver({
                            ...isStateListCarsDriver,
                            loading: {
                                isLoadingDialogFilterListCars: true
                            }
                        })

                        const dataParams = {
                            type: 2
                        }

                        const { data } = await getListAutomaker(dataParams);

                        if (data && data.data) {
                            queryKeyIsStateListCarsDriver({
                                ...isStateListCarsDriver,
                                filter: {
                                    ...isStateListCarsDriver.filter,
                                    listAutomaker: data.data,
                                },
                                loading: {
                                    isLoadingDialogFilterListCars: false
                                }
                            })
                        } else {
                            queryKeyIsStateListCarsDriver({
                                ...isStateListCarsDriver,
                                loading: {
                                    isLoadingDialogFilterListCars: false
                                }
                            })

                        }
                    } catch (err) {
                        throw err
                    }
                }

                fetchDataListAutomaker()
            } else if (type === 'type_car_search' && openDialogFilterListCars && isStateListCarsDriver?.filter?.listTypesCar?.length === 0) {
                const fetchDataListTypesCar = async () => {
                    try {
                        queryKeyIsStateListCarsDriver({
                            ...isStateListCarsDriver,
                            loading: {
                                isLoadingDialogFilterListCars: true
                            }
                        })

                        const dataParams = {
                            type: 2
                        }

                        const { data } = await getListTypeCars(dataParams);

                        if (data && data.data) {
                            queryKeyIsStateListCarsDriver({
                                ...isStateListCarsDriver,
                                filter: {
                                    ...isStateListCarsDriver.filter,
                                    listTypesCar: data.data,
                                },
                                loading: {
                                    isLoadingDialogFilterListCars: false
                                }
                            })
                        } else {
                            queryKeyIsStateListCarsDriver({
                                ...isStateListCarsDriver,
                                loading: {
                                    isLoadingDialogFilterListCars: false
                                }
                            })

                        }
                    } catch (err) {
                        throw err
                    }
                }

                fetchDataListTypesCar()
            }
        }
    }, [
        pathname,
        openDialogFilterListCars
    ])

    const handleFilterListCars = async (value: string | any, type: string) => {
        if (type === "company_car_search" && value) {
            setParamCompanyCarSearch(value)
        } else if (type === "type_car_search" && value) {
            if (pathname.startsWith("/list-cars-autonomous")) {
                const typeId = value.id;
                const currentTypeSearch = isStateListCarAutonomous.dataParams?.type_car_search || [];

                const isTypeExists = currentTypeSearch.includes(typeId);

                if (!isTypeExists) {
                    // Nếu không tồn tại, thêm vào mảng
                    const updatedTypeSearch = [...currentTypeSearch, typeId];

                    const query = {
                        type: pathname.startsWith("/list-cars-autonomous") ? 1 : 2,
                        "lat": valueAddress ? coordinates.lat : undefined,
                        "lon": valueAddress ? coordinates.lng : undefined,
                        date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                        company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                        type_car_search: updatedTypeSearch && updatedTypeSearch.length === 0 ? [] : updatedTypeSearch,
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
                        updatedTypeSearch?.length === 0 &&
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
                            next: data?.links?.next,
                            dataParams: {
                                ...isStateListCarAutonomous.dataParams,
                                type_car_search: updatedTypeSearch
                            }
                        })
                        // setOpenDialogFilterListCars(false);
                    }

                } else {
                    // Nếu tồn tại, loại bỏ khỏi mảng
                    const updatedTypeSearch = currentTypeSearch.filter(id => id !== typeId);

                    const query = {
                        type: pathname.startsWith("/list-cars-autonomous") ? 1 : 2,
                        "lat": valueAddress ? coordinates.lat : undefined,
                        "lon": valueAddress ? coordinates.lng : undefined,
                        date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                        company_car_search: isStateListCarAutonomous?.dataParams?.company_car_search == "0" ? undefined : isStateListCarAutonomous?.dataParams?.company_car_search,
                        type_car_search: updatedTypeSearch && updatedTypeSearch.length === 0 ? [] : updatedTypeSearch,
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
                        updatedTypeSearch?.length === 0 &&
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
                            next: data?.links?.next,
                            dataParams: {
                                ...isStateListCarAutonomous.dataParams,
                                type_car_search: updatedTypeSearch
                            }
                        })
                    }
                }

            } else if (pathname.startsWith("/list-cars-driver")) {
                const typeId = value.id;
                const currentTypeSearch = isStateListCarsDriver.dataParams?.type_car_search || [];

                const isTypeExists = currentTypeSearch.includes(typeId);

                if (!isTypeExists) {
                    // Nếu không tồn tại, thêm vào mảng
                    const updatedTypeSearch = [...currentTypeSearch, typeId];

                    const query = {
                        type: pathname.startsWith("/list-cars-autonomous") ? 1 : 2,
                        "lat": valueAddress ? coordinates.lat : undefined,
                        "lon": valueAddress ? coordinates.lng : undefined,
                        date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                        company_car_search: isStateListCarsDriver?.dataParams?.company_car_search == "0" ? undefined : isStateListCarsDriver?.dataParams?.company_car_search,
                        type_car_search: updatedTypeSearch && updatedTypeSearch.length === 0 ? [] : updatedTypeSearch,
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
                        updatedTypeSearch?.length === 0 &&
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
                            next: data?.links?.next,
                            dataParams: {
                                ...isStateListCarsDriver.dataParams,
                                type_car_search: updatedTypeSearch
                            }
                        })
                        // setOpenDialogFilterListCars(false);
                    }

                } else {
                    // Nếu tồn tại, loại bỏ khỏi mảng
                    const updatedTypeSearch = currentTypeSearch.filter(id => id !== typeId);

                    const query = {
                        type: pathname.startsWith("/list-cars-autonomous") ? 1 : 2,
                        "lat": valueAddress ? coordinates.lat : undefined,
                        "lon": valueAddress ? coordinates.lng : undefined,
                        date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                        company_car_search: isStateListCarsDriver?.dataParams?.company_car_search == "0" ? undefined : isStateListCarsDriver?.dataParams?.company_car_search,
                        type_car_search: updatedTypeSearch && updatedTypeSearch.length === 0 ? [] : updatedTypeSearch,
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
                        updatedTypeSearch?.length === 0 &&
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
                            next: data?.links?.next,
                            dataParams: {
                                ...isStateListCarsDriver.dataParams,
                                type_car_search: updatedTypeSearch
                            }
                        })
                    }
                }
            }
        } else if (type === "transmission_search" && value) {
            setParamTransmissionSearch(value)
        }
    }

    const handleSubmitFilter = async () => {
        if (pathname.startsWith("/list-cars-autonomous")) {
            const query = {
                type: pathname.startsWith("/list-cars-autonomous") ? 1 : 2,
                "lat": valueAddress ? coordinates.lat : undefined,
                "lon": valueAddress ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: paramCompanyCarSearch == "0" ? undefined : paramCompanyCarSearch,
                type_car_search: isStateListCarAutonomous?.dataParams?.type_car_search && isStateListCarAutonomous?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarAutonomous?.dataParams?.type_car_search,
                transmission_search: paramTransmissionSearch == "0" ? undefined : paramTransmissionSearch,
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
                    ...isStateListCarAutonomous,
                    listCardCars: customDataListCars,
                    dataParams: {
                        ...isStateListCarAutonomous.dataParams,
                        company_car_search: paramCompanyCarSearch,
                        transmission_search: paramTransmissionSearch,
                    },
                    page: 2,
                    next: data?.links?.next
                })

            }

            setOpenDialogFilterListCars(false);
        } else if (pathname.startsWith("/list-cars-driver")) {
            const query = {
                type: pathname.startsWith("/list-cars-autonomous") ? 1 : 2,
                "lat": valueAddress ? coordinates.lat : undefined,
                "lon": valueAddress ? coordinates.lng : undefined,
                date_search: `${moment(dateReal?.from).format("DD/MM/YYYY HH:mm:ss")} - ${moment(dateReal?.to).format("DD/MM/YYYY HH:mm:ss")}`,
                company_car_search: paramCompanyCarSearch == "0" ? undefined : paramCompanyCarSearch,
                type_car_search: isStateListCarsDriver?.dataParams?.type_car_search && isStateListCarsDriver?.dataParams?.type_car_search.length === 0 ? [] : isStateListCarsDriver?.dataParams?.type_car_search,
                transmission_search: paramTransmissionSearch == "0" ? undefined : paramTransmissionSearch,
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
                    ...isStateListCarsDriver,
                    listCardCars: customDataListCars,
                    dataParams: {
                        ...isStateListCarsDriver.dataParams,
                        company_car_search: paramCompanyCarSearch,
                        transmission_search: paramTransmissionSearch
                    },
                    page: 2,
                    next: data?.links?.next
                })

            }

            setOpenDialogFilterListCars(false);
        }

    }

    console.log('type: ', type);
    console.log('isStateListCarAutonomous: ', isStateListCarAutonomous);
    console.log('isStateListCarsDriver: ', isStateListCarsDriver);

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
                            type === "type_car_search" ?
                                <div className='grid grid-cols-3 gap-6 w-full'>
                                    {
                                        pathname.startsWith("/list-cars-autonomous") ?
                                            (
                                                isStateListCarAutonomous.loading.isLoadingDialogFilterListCars ?
                                                    <SkeletonDialogFilterListCars type="type_car_search" />
                                                    :
                                                    isStateListCarAutonomous?.filter?.listTypesCar && isStateListCarAutonomous?.filter?.listTypesCar?.map((item) => {

                                                        return (
                                                            <div
                                                                key={`typesCarId-${item.id}`}
                                                                className={`${isStateListCarAutonomous.dataParams?.type_car_search?.includes(item.id) ? "border-[#2FB9BD]/80 bg-[#2FB9BD]/10 text-[#2FB9BD] shadow-md" : "border-[#B4B8C5]"} col-span-1 flex flex-col justify-center items-center h-full border hover:shadow-xl hover:drop-shadow-xl duration-300 transition-all cursor-pointer rounded-xl 3xl:p-4 p-4`}
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
                                            )
                                            :
                                            (
                                                isStateListCarsDriver.loading.isLoadingDialogFilterListCars ?
                                                    <SkeletonDialogFilterListCars type="type_car_search" />
                                                    :
                                                    isStateListCarsDriver?.filter?.listTypesCar && isStateListCarsDriver?.filter?.listTypesCar?.map((item) => {

                                                        return (
                                                            <div
                                                                key={`typesCarId-${item.id}`}
                                                                className={`${isStateListCarsDriver.dataParams?.type_car_search?.includes(item.id) ? "border-[#2FB9BD]/80 bg-[#2FB9BD]/10 text-[#2FB9BD] shadow-md" : "border-[#B4B8C5]"} col-span-1 flex flex-col justify-center items-center h-full border hover:shadow-xl hover:drop-shadow-xl duration-300 transition-all cursor-pointer rounded-xl 3xl:p-4 p-4`}
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
                                            )
                                    }
                                </div>
                                :
                                null
                        }
                        {
                            type === "company_car_search" ?
                                <>
                                    {
                                        pathname.startsWith("/list-cars-autonomous") ?
                                            (
                                                isStateListCarAutonomous.loading.isLoadingDialogFilterListCars ?
                                                    <SkeletonDialogFilterListCars type="company_car_search" />
                                                    :
                                                    <RadioGroup
                                                        onValueChange={(value) => handleFilterListCars(value, "company_car_search")}
                                                        defaultValue="0"
                                                        value={paramCompanyCarSearch}
                                                        className='grid grid-cols-2 gap-6 w-full'
                                                        autoFocus={false}
                                                    >
                                                        <div key={'automakerId-0'} className='col-span-1 flex items-center space-x-3 group'>
                                                            <RadioGroupItem
                                                                value={`0`}
                                                                id={`0`}
                                                                className={`${paramCompanyCarSearch == "0" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
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
                                                            isStateListCarAutonomous?.filter?.listAutomaker && isStateListCarAutonomous?.filter?.listAutomaker?.map((item) => (
                                                                <div key={`automakerId-${item.id}`} className='col-span-1 flex items-center space-x-3 group'>
                                                                    <RadioGroupItem
                                                                        value={`${item.id}`}
                                                                        id={`${item.id}`}
                                                                        className={`${paramCompanyCarSearch == `${item.id}` ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
                                                                    />
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
                                            )
                                            :
                                            (
                                                isStateListCarsDriver.loading.isLoadingDialogFilterListCars ?
                                                    <SkeletonDialogFilterListCars type="company_car_search" />
                                                    :
                                                    <RadioGroup
                                                        onValueChange={(value) => handleFilterListCars(value, "company_car_search")}
                                                        defaultValue="0"
                                                        value={paramCompanyCarSearch}
                                                        className='grid grid-cols-2 gap-6 w-full'
                                                        autoFocus={false}
                                                    >
                                                        <div key={'automakerId-0'} className='col-span-1 flex items-center space-x-3 group'>
                                                            <RadioGroupItem
                                                                value={`0`}
                                                                id={`0`}
                                                                className={`${paramCompanyCarSearch == "0" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
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
                                                            isStateListCarsDriver?.filter?.listAutomaker && isStateListCarsDriver?.filter?.listAutomaker?.map((item) => (
                                                                <div key={`automakerId-${item.id}`} className='col-span-1 flex items-center space-x-3 group'>
                                                                    <RadioGroupItem value={`${item.id}`} id={`${item.id}`} className={`${paramCompanyCarSearch == `${item.id}` ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`} />
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
                                            )

                                    }
                                </>
                                :
                                null
                        }
                        {
                            type === "transmission_search" ?
                                <>
                                    <RadioGroup
                                        defaultValue="0"
                                        value={paramTransmissionSearch}
                                        onValueChange={(value) => handleFilterListCars(value, "transmission_search")}
                                        className='grid grid-cols-1 gap-6 w-full'
                                        autoFocus={false}
                                    >
                                        <div key={'transmissionId-0'} className='col-span-1 flex items-center space-x-3 group w-fit'>
                                            <RadioGroupItem
                                                value={`0`}
                                                id={`0`}
                                                className={`${paramTransmissionSearch == "0" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
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
                                        <div key={'transmissionId-1'} className='col-span-1 flex items-center space-x-3 group w-fit'>
                                            <RadioGroupItem
                                                value={`1`}
                                                id={`1`}
                                                className={`${paramTransmissionSearch == "1" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
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
                                        <div key={'transmissionId-2'} className='col-span-1 flex items-center space-x-3 group w-fit'>
                                            <RadioGroupItem
                                                value={`2`}
                                                id={`2`}
                                                className={`${paramTransmissionSearch == "2" ? "border-[#2FB9BD]" : "border-[#B4B8C5]"} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none group-hover:border-[#2FB9BD] text-[#2FB9BD] duration-300 transition`}
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
                                </>
                                :
                                null
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
                                        className='caret-transparent xl:px-6 xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full'
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

export default DialogFilterListCars
