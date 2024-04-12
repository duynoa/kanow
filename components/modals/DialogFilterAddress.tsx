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
import { uuidv4 } from "@/lib/uuid";
import { Button } from "../ui/button";
import { LuPlane } from "react-icons/lu";
import { TiLocation } from "react-icons/ti";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { useGeneralKey } from "@/hooks/useGeneralKey";
import { useDialogAddress } from "@/hooks/useOpenDialog";
import SearchAddress from "../searchAddress/SearchAddress";
import useGoogleApi from "@/services/google/google.services";
import { Form, FormControl, FormField, FormItem } from "../ui/form";


type Props = {
}
interface IPlace {
    id: string
    name: string
}

export function DialogFilterAddress({ }: Props) {
    const { generalKey } = useGeneralKey()

    const { apiGetAddress } = useGoogleApi()

    const {
        openDialogAddress,
        valueAddress,
        setOpenDialogAddress,
        setValueAddress,
        latitude,
        longitude,
        setLatitude,
        setLongitude } = useDialogAddress()

    const form = useForm({
        defaultValues: {
            valueAddres: ""
        },
    })

    const initialData = [
        {
            id: uuidv4(),
            name: 'Tân sơn nhất',
        },
        {
            id: uuidv4(),
            name: 'Nội bài',
        },
        {
            id: uuidv4(),
            name: 'Đà nẵng',
        },
        {
            id: uuidv4(),
            name: 'Cam ranh',
        },
        {
            id: uuidv4(),
            name: 'Phú quốc',
        },
        {
            id: uuidv4(),
            name: 'Liên khương',
        }

    ]

    const [dataPlane, setDataPlane] = useState<IPlace[]>(initialData)

    const onSubmit = async (data: any) => {
        setValueAddress(data.valueAddres)
        setOpenDialogAddress(false)
    }

    const handleAddressCurent = async () => await fetchLocationName()

    const fetchLocationName = async () => {
        try {
            const response = await apiGetAddress(latitude, longitude, generalKey.google_api_key)
            const data = response.data;
            if (data.status === 'OK') {
                const address = data.results[0].formatted_address.split(',').slice(1).join(',');
                // const address = data.results[0].address_components?.map((e: any) => {
                //     return ["street_number", "route", 'plus_code'].includes(e.types[0]) ? undefined : e.long_name;
                // }).filter(Boolean).join(', ')
                form.setValue("valueAddres", address);
                // form.setValue("valueAddres", address.split(',').slice(1).join(','));
                return
            }
            console.log('Không tìm thấy thông tin vị trí.');
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };
    //lấy định vị tọa độ hiện tại
    useEffect(() => {
        if (openDialogAddress) {
            navigator.geolocation.watchPosition((position) => {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            })
            if (valueAddress) {
                form.setValue("valueAddres", valueAddress)
                return
            }
            form.reset()
            document.body.style.overflow = "hidden";
            return
        }
        document.body.style.overflow = "unset";
    }, [openDialogAddress])


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
                                name="valueAddres"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <div className="relative">
                                                        <TiLocation className="text-xl text-[#1EAAB1] absolute top-1/2 -translate-y-1/2 left-1" />
                                                        <SearchAddress onChange={(e: any) => {
                                                            field.onChange(e.split(',').slice(1).join(','))
                                                        }}>
                                                            <Input
                                                                type="text"
                                                                className={`disabled:bg-[#E6E8EC] lg:text-base text-sm  disabled:border-gray-300 disabled:border-2  focus:border-[#2FB9BD]
                                                            w-full border-[#E6E8EC] !pl-7 !pr-[38px] border-2 lg:py-3 py-2 rounded-2xl   px-3 focus-visible:ring-0 text-black font-medium focus-visible:ring-offset-0 `}
                                                                placeholder="Nhập địa điểm"
                                                                {...field}
                                                            />
                                                        </SearchAddress>
                                                        {field.value &&
                                                            <X
                                                                onClick={() => form.reset()}
                                                                className="absolute cursor-pointer right-0 -translate-x-1/2 top-1/2 -translate-y-1/2 text-xs text-white bg-[#2FB9BD] p-1 rounded-full" />}
                                                    </div>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />

                            <div onClick={() => handleAddressCurent()} className="lg:py-3 py-2 px-1 flex items-center gap-2 cursor-pointer hover:bg-gray-100  rounded-2xl transition-all duration-150 ease-linear">
                                <TiLocation className="text-xl text-[#1EAAB1]" />
                                <h1 className="font-medium lg:text-base text-sm">Vị trí hiện tại</h1>
                            </div>
                            <Separator />
                            <div className="p-1 flex flex-col gap-4">
                                <h1 className="font-medium lg:text-base text-sm">Giao xe sân bay</h1>
                                <FormField
                                    control={form.control}
                                    name="valueAddres"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex items-center flex-wrap gap-2">
                                                        {dataPlane.map(e => {
                                                            return (
                                                                <Badge key={e.id}
                                                                    onClick={() => field.onChange(e.name)}
                                                                    variant="outline"
                                                                    className={`${field.value == e.name ? "border-[#2FB9BD]" : "border-[#E6E8EC]"} font-medium py-2 px-4 cursor-pointer hover:bg-gray-100 hover:border-[#2FB9BD] border-2 flex items-center gap-1 lg:text-base text-sm`}>
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
