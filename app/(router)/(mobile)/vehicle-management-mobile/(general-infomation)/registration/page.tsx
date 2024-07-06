"use client"
import ButtonLoading from "@/components/button/ButtonLoading";
import DropzoneFilesMulti from "@/components/image/DropzoneFilesMulti";
import ProcessingImage from "@/components/image/ProcessingImage";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import { uuidv4 } from "@/lib/uuid";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { changeCheckFileImage } from "@/utils/fnChange/changeFile";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { MdClear } from "react-icons/md";

type Props = {}


export default function VehicleRegistration(props: Props) {

    const form = useForm({
        defaultValues: {
            // cà vẹt giấy giờ
            imagesRegistration: [],
            // đăng kiểm
            imagesRegistry: [],
            // bảo hiểm
            imagesInsurance: [],
            // ảnh xe
            carPhoto: {
                // trước xe
                before: [],
                // sau xe
                after: [],
                // bên trái xe
                left: [],
                // bên phải xe
                right: []
            }
        }
    })

    const { dataDetail: { data, base }, idCar } = useVehicleManage()

    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const findValue = form.getValues()

    const { apiUpdateCar } = apiVehicleCommon()

    const [processing, setProcessing] = useState<number>(0)

    const [formLoading, setFormLoading] = useState({
        carPhotoBefore: false,
        carPhotoAfter: false,
        carPhotoLeft: false,
        carPhotoRight: false,
    });

    useEffect(() => {
        if (!Array.isArray(data) && data) {
            const converArray = (arr: any) => {
                return arr.map((i: any) => {
                    return {
                        ...i,
                        name: `${base.base}/${i.name}`,
                        nameDefault: i.name
                    }
                })
            }
            const arr = [
                ['imagesRegistration', data?.image_parrot_car?.length > 0 ? converArray(data?.image_parrot_car) : []],
                ['imagesRegistry', data?.image_registry_car?.length > 0 ? converArray(data?.image_registry_car) : []],
                ['imagesInsurance', data?.image_insurance_car?.length > 0 ? converArray(data?.image_insurance_car) : []],
                ['carPhoto.before', data?.image_car_position_before?.length > 0 ? converArray(data?.image_car_position_before) : []],
                ['carPhoto.after', data?.image_car_position_affter?.length > 0 ? converArray(data?.image_car_position_affter) : []],
                ['carPhoto.left', data?.image_car_position_left?.length > 0 ? converArray(data?.image_car_position_left) : []],
                ['carPhoto.right', data?.image_car_position_right?.length > 0 ? converArray(data?.image_car_position_right) : []],
            ]
            arr.forEach(([key, value]: any) => form.setValue(key, value))
        }
    }, [data])

    const onSubmit = async (value: any) => {
        queryKeyIsStateLoadSuccess({
            loading: {
                ...isStateLoadSuccess.loading,
                isLoadingButton: true
            }
        })

        let formData = new FormData()

        formData.append('car_id', idCar)
        // cà vẹt
        if (value.imagesRegistration?.length > 0) {
            value.imagesRegistration.forEach((i: any, index: number) => {
                formData.append(i.nameDefault ? `image_parrot_old[${index}]` : `image_parrot[${index}]`, i?.nameDefault || i || '')
            })
        } else {
            formData.append(`image_parrot_old[]`, '')
        }

        // đăng kiểm
        if (value.imagesRegistry?.length > 0) {
            value.imagesRegistry.forEach((i: any, index: number) => {
                formData.append(i.nameDefault ? `image_registry_old[${index}]` : `image_registry[${index}]`, i?.nameDefault || i || '')
            })
        } else {
            formData.append(`image_registry_old[]`, '')
        }
        //  bảo hiểm
        if (value.imagesInsurance?.length > 0) {
            value.imagesInsurance.forEach((i: any, index: number) => {
                formData.append(i.nameDefault ? `image_insurance_old[${index}]` : `image_insurance[${index}]`, i?.nameDefault || i || '')
            })
        } else {
            formData.append(`image_insurance_old[]`, '')
        }
        // hinh mặt trước
        formData.append('image_car_position_before', value?.carPhoto?.before[0]?.nameDefault || value?.carPhoto?.before[0]?.name || '')
        formData.append('image_car_position_affter', value?.carPhoto?.after[0]?.nameDefault || value?.carPhoto?.after[0]?.name || '')
        formData.append('image_car_position_left', value?.carPhoto?.left[0]?.nameDefault || value?.carPhoto?.left[0]?.name || '')
        formData.append('image_car_position_right', value?.carPhoto?.right[0]?.nameDefault || value?.carPhoto?.right[0]?.name || '')

        try {
            const { data: db } = await apiUpdateCar(formData)

            if (db.result) {
                toastCore.success('Lưu thông tin thành công')
                return
            }
            toastCore.error(db?.message)
        } catch (error) {

        } finally {
            queryKeyIsStateLoadSuccess({
                loading: {
                    ...isStateLoadSuccess.loading,
                    isLoadingButton: false
                }
            })
        }
    }



    const checkFile = (array: any, event: any) => {
        const check = array?.some((x: any) => {
            if (x?.nameDefault) {
                let text = x?.nameDefault?.split("_");
                let nameFile = text[text?.length - 1];
                return x?.name == event.target.files[0]?.name || x.name?.name == event.target.files[0]?.name || nameFile == event.target.files[0]?.name
            }
        })
        return check
    }

    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <Form {...form}>
                <div className="flex flex-col gap-6">
                    <div className="my-2">
                        <div className="flex md:flex-row flex-col justify-between">
                            <h1 className='text-[#3E424E] text-xl uppercase font-bold'>Cà vẹt / Giấy đăng ký xe ô tô</h1>
                        </div>
                        <FormField
                            control={form.control}
                            name="imagesRegistration"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng thêm hình giấy tờ xe',
                                },
                            }}
                            render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {

                                return (
                                    <FormItem className="">
                                        <FormLabel className="text-base font-semibold text-[#16171B]">
                                            Chọn hình giấy tờ xe
                                        </FormLabel>
                                        <FormControl>
                                            <>
                                                {
                                                    fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>
                                                            {fieldState?.error?.message}
                                                        </FormMessage>
                                                    )
                                                }
                                                <DropzoneFilesMulti
                                                    files={value || []}
                                                    onDrag={false}
                                                    setFiles={onChange}
                                                    className={`${fieldState?.invalid && fieldState?.error ? "border-red-500" : "border-[#BEBFC2]/80"}  h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                />
                                                {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                                    <div className="col-span-1  h-[250px]">
                                                        <Input {...fieldProps}
                                                            onChange={(event: any) => {
                                                                if (value?.length > 0 && event && checkFile(value, event)) {
                                                                    return checkFile(value, event)
                                                                }
                                                                onChange([...value, { id: uuidv4(), name: event.target.files[0] }])
                                                            }
                                                            }
                                                            accept="image/*, application/pdf, image/heic"
                                                            id={"imagesRegistration"}
                                                            type="file"
                                                            multiple
                                                            className="hidden" />
                                                        <Label
                                                            htmlFor={"imagesRegistration"}
                                                            className={`${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} relative overflow-hidden h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                        >
                                                            <IoMdAdd size={32} className="absolute z-10" />
                                                            <Image src={'/vehicle/registration/registration.jpg'} width={1280} height={102} alt="" className="opacity-35 md:size-full size-[65%] object-cover" />
                                                        </Label>
                                                    </div>
                                                    {value ?
                                                        <>
                                                            {
                                                                value.map((e: any, index: number) => {
                                                                    if (!e) return
                                                                    return (
                                                                        <div key={e} className="col-span-1 h-[250px] relative my-1">
                                                                            <Image

                                                                                src={e.name instanceof File ? URL.createObjectURL(e.name) : e.name ?? ""} width={1280}
                                                                                height={1024}
                                                                                alt="image" className="w-full h-full object-cover rounded-md"
                                                                            />
                                                                            <div
                                                                                className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                <MdClear
                                                                                    onClick={() => {
                                                                                        const imagesRegistration = document.getElementById("imagesRegistration") as HTMLInputElement | null;
                                                                                        if (imagesRegistration && typeof imagesRegistration !== 'undefined') {
                                                                                            imagesRegistration.value = '';
                                                                                        }
                                                                                        onChange(value?.filter((value: any) => value.name !== e.name))
                                                                                    }}
                                                                                    className="text-red-500 bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer md:text-[26px] text-xl"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                        : null
                                                    }
                                                </div> */}
                                            </>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                    <Separator orientation='horizontal' />
                    <div className="my-2">
                        <div className="flex md:flex-row flex-col justify-between">
                            <h1 className='text-[#3E424E] text-xl uppercase font-bold'>Đăng kiểm</h1>
                        </div>
                        <FormField
                            control={form.control}
                            name="imagesRegistry"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng thêm hình đăng kiểm',
                                },
                            }}
                            render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="text-base font-semibold text-[#16171B]">
                                            Chọn hình đăng kiểm
                                        </FormLabel>
                                        <FormControl>
                                            <>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>
                                                        {fieldState?.error?.message}
                                                    </FormMessage>
                                                )}
                                                <DropzoneFilesMulti
                                                    files={value || []}
                                                    onDrag={false}
                                                    setFiles={onChange}
                                                    className={`${fieldState?.invalid && fieldState?.error ? "border-red-500" : "border-[#BEBFC2]/80"}  h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                />
                                                {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                                    <div className="col-span-1  h-[250px]">
                                                        <Input {...fieldProps}
                                                            onChange={(event: any) => {
                                                                if (checkFile(value, event)) {
                                                                    return
                                                                }
                                                                onChange([...value, { id: uuidv4(), name: event.target.files[0] }])
                                                            }
                                                            }
                                                            accept="image/*, application/pdf, image/heic"
                                                            id={"imagesRegistry"}
                                                            type="file"
                                                            multiple
                                                            className="hidden" />
                                                        <Label
                                                            htmlFor={"imagesRegistry"}
                                                            className={`${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} relative overflow-hidden h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                        >
                                                            <IoMdAdd size={32} className="absolute z-10" />
                                                            <Image src={'/vehicle/registration/registry.jpg'} width={1280} height={102} alt="" className="opacity-35 md:size-full size-[65%] object-cover" />
                                                        </Label>
                                                    </div>
                                                    {value ?
                                                        <>
                                                            {
                                                                value.map((e: any, index: number) => {
                                                                    if (!e) return
                                                                    return (
                                                                        <div key={e} className="col-span-1 h-[250px] relative my-1">
                                                                            <Image

                                                                                src={e.name instanceof File ? URL.createObjectURL(e.name) : e.name ?? ""} width={1280}
                                                                                height={1024}
                                                                                alt="image" className="w-full h-full object-cover rounded-md"
                                                                            />
                                                                            <div
                                                                                className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                <MdClear
                                                                                    onClick={() => {
                                                                                        const imagesRegistry: any = document.getElementById("imagesRegistry") as HTMLInputElement | null;
                                                                                        if (imagesRegistry && typeof imagesRegistry !== 'undefined') {
                                                                                            imagesRegistry.value = '';
                                                                                        }
                                                                                        onChange(value?.filter((value: any) => value !== e))
                                                                                    }}
                                                                                    className="text-red-500 bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer md:text-[26px] text-xl"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                        : null
                                                    }
                                                </div> */}
                                            </>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                    <Separator orientation='horizontal' />
                    <div className="my-2">
                        <div className="flex md:flex-row flex-col justify-between">
                            <h1 className='text-[#3E424E] text-xl uppercase font-bold'>Bảo hiểm vật chất</h1>
                        </div>
                        <FormField
                            control={form.control}
                            name="imagesInsurance"
                            render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="text-base font-semibold text-[#16171B]">
                                            Chọn hình bảo hiểm vật chất
                                        </FormLabel>
                                        <FormControl>
                                            <>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>
                                                        {fieldState?.error?.message}
                                                    </FormMessage>
                                                )}
                                                <DropzoneFilesMulti
                                                    files={value || []}
                                                    onDrag={false}
                                                    setFiles={onChange}
                                                    className={`${"border-[#BEBFC2]/80"}  h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                />
                                                {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                                    <div className="col-span-1  h-[250px]">
                                                        <Input {...fieldProps}
                                                            onChange={(event: any) => {
                                                                if (checkFile(value, event)) {
                                                                    return
                                                                }
                                                                onChange([...value, { id: uuidv4(), name: event.target.files[0] }])
                                                            }}
                                                            accept="image/*, application/pdf, image/heic"
                                                            id={"imagesInsurance"}
                                                            type="file"
                                                            multiple
                                                            className="hidden" />
                                                        <Label
                                                            htmlFor={"imagesInsurance"}
                                                            className={`${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} relative overflow-hidden h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                        >
                                                            <IoMdAdd size={32} className="absolute z-10" />
                                                            <Image src={'/vehicle/registration/insurance.jpg'} width={1280} height={102} alt="" className="opacity-35 md:size-full size-[65%] object-cover" />
                                                        </Label>
                                                    </div>
                                                    {value ?
                                                        <>
                                                            {
                                                                value.map((e: any, index: number) => {
                                                                    if (!e) return
                                                                    return (
                                                                        <div key={e} className="col-span-1 h-[250px] relative my-1">
                                                                            <Image

                                                                                src={e.name instanceof File ? URL.createObjectURL(e.name) : e.name ?? ""}
                                                                                width={1280}
                                                                                height={1024}
                                                                                alt="image" className="w-full h-full object-cover rounded-md"
                                                                            />
                                                                            <div
                                                                                className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                <MdClear
                                                                                    onClick={() => {
                                                                                        const imagesInsurance: any = document.getElementById("imagesInsurance") as HTMLInputElement | null;
                                                                                        if (imagesInsurance && typeof imagesInsurance !== 'undefined') {
                                                                                            imagesInsurance.value = '';
                                                                                        }
                                                                                        onChange(value?.filter((value: any) => value !== e))
                                                                                    }}
                                                                                    className="text-red-500 bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer md:text-[26px] text-xl"
                                                                                />

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                        : null
                                                    }
                                                </div> */}
                                            </>
                                        </FormControl>
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                    <Separator orientation='horizontal' />
                    <div className="flex md:flex-row flex-col justify-between">
                        <h1 className='text-[#3E424E] text-xl uppercase font-bold'>Ảnh chi tiết xe</h1>
                    </div>
                    <div className="grid lg:grid-cols-2 col-span-1 gap-4">
                        <div className="my-2">
                            <FormField
                                control={form.control}
                                name="carPhoto.before"
                                rules={{
                                    validate: {
                                        maxFile: (value: any) => value?.length <= 1 || 'Chỉ cho phép tối đa 1 ảnh',
                                    },
                                    required: {
                                        value: true,
                                        message: 'Vui lòng thêm ảnh trước xe',
                                    }
                                }}
                                render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                                    return (
                                        <FormItem className="">
                                            <FormLabel className="text-base font-semibold text-[#16171B]">
                                                {value?.length > 0 ? 'Ảnh trước xe' : 'Chọn ảnh trước xe'}
                                            </FormLabel>
                                            <FormControl>
                                                <>
                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>
                                                            {fieldState?.error?.message}
                                                        </FormMessage>
                                                    )}
                                                    <div className={`grid col-span-1 gap-4`}>
                                                        <div className={`${value?.length > 0 && 'hidden'} col-span-1  h-[300px]`}>
                                                            <Input {...fieldProps}
                                                                onChange={async (event: any) => {
                                                                    if (value?.length > 0 && event && checkFile(value, event)) {
                                                                        return checkFile(value, event)
                                                                    }
                                                                    setFormLoading((prev) => ({ ...prev, carPhotoBefore: true }));
                                                                    setProcessing(0);
                                                                    const file = await changeCheckFileImage(event.target.files[0], undefined, undefined, (process: any) => {
                                                                        setProcessing(process)
                                                                    })
                                                                    setFormLoading((prev) => ({ ...prev, carPhotoBefore: false }));

                                                                    onChange([...value, { id: uuidv4(), name: file }])

                                                                }
                                                                }
                                                                accept="image/*, application/pdf, image/heic"
                                                                id={"carPhotoBefore"}
                                                                type="file"
                                                                multiple
                                                                disabled={value?.length > 0}
                                                                className="hidden" />
                                                            {
                                                                (formLoading?.carPhotoBefore) ? (
                                                                    <ProcessingImage processing={processing} />
                                                                ) :
                                                                    <Label
                                                                        htmlFor={"carPhotoBefore"}
                                                                        className={`${value?.length > 0 ? '!cursor-not-allowed' : ''} ${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} overflow-hidden relative h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                                    >
                                                                        <IoMdAdd size={32} className="absolute z-10" />
                                                                        <div className="flex items-center justify-center">
                                                                            <Image src={'/vehicle/registration/car/1.png'} width={1280} height={102} alt="" className="opacity-35 md:size-full size-[65%] object-cover" />
                                                                        </div>
                                                                    </Label>
                                                            }
                                                        </div>
                                                        {value ?
                                                            <>
                                                                {
                                                                    value.map((e: any, index: number) => {
                                                                        if (!e) return
                                                                        return (
                                                                            <div key={e} className="col-span-1 h-[300px] relative my-1">
                                                                                <Image
                                                                                    src={e.name instanceof File ? URL.createObjectURL(e.name) : e.name ?? ""}
                                                                                    width={1280}
                                                                                    height={1024}
                                                                                    alt="image" className="w-full h-full object-cover rounded-md"
                                                                                />
                                                                                <div
                                                                                    className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                    <MdClear
                                                                                        onClick={() => {
                                                                                            const carPhotoBefore: any = document.getElementById("carPhotoBefore") as HTMLInputElement | null;
                                                                                            if (carPhotoBefore && typeof carPhotoBefore !== 'undefined') {
                                                                                                carPhotoBefore.value = '';
                                                                                            }
                                                                                            onChange(value?.filter((value: any) => value !== e))
                                                                                        }}
                                                                                        className="text-red-500 bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer md:text-[26px] text-xl"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                            : null
                                                        }
                                                    </div>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="my-2">
                            <FormField
                                control={form.control}
                                name="carPhoto.after"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng thêm ảnh sau xe',
                                    },
                                    validate: {
                                        maxFile: (value: any) => value?.length <= 1 || 'Chỉ cho phép tối đa 1 ảnh',
                                    },
                                }}
                                render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                                    return (
                                        <FormItem className="">
                                            <FormLabel className="text-base font-semibold text-[#16171B]">
                                                {value?.length > 0 ? 'Ảnh sau xe' : 'Chọn ảnh sau xe'}
                                            </FormLabel>
                                            <FormControl>
                                                <>
                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>
                                                            {fieldState?.error?.message}
                                                        </FormMessage>
                                                    )}
                                                    <div className={`grid col-span-1 gap-4`}>
                                                        <div className={`${value?.length > 0 && 'hidden'} col-span-1  h-[300px]`}>
                                                            <Input {...fieldProps}
                                                                onChange={async (event: any) => {
                                                                    if (value?.length > 0 && event && checkFile(value, event)) {
                                                                        return checkFile(value, event)
                                                                    }
                                                                    setFormLoading((prev) => ({ ...prev, carPhotoAfter: true }));
                                                                    setProcessing(0);
                                                                    const file = await changeCheckFileImage(event.target.files[0], undefined, undefined, (process: any) => {
                                                                        setProcessing(process)
                                                                    })
                                                                    setFormLoading((prev) => ({ ...prev, carPhotoAfter: false }));

                                                                    onChange([...value, { id: uuidv4(), name: file }])
                                                                }
                                                                }
                                                                accept="image/*, application/pdf, image/heic"
                                                                id={"carPhotoAfter"}
                                                                type="file"
                                                                multiple
                                                                disabled={value?.length > 0}
                                                                className="hidden" />
                                                            {
                                                                (formLoading?.carPhotoAfter) ? (
                                                                    <ProcessingImage processing={processing} />
                                                                ) :
                                                                    <Label
                                                                        htmlFor={"carPhotoAfter"}
                                                                        className={`${value?.length > 0 ? '!cursor-not-allowed' : ''} ${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} overflow-hidden relative h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                                    >
                                                                        <IoMdAdd size={32} className="absolute z-10" />
                                                                        <div className="flex items-center justify-center">
                                                                            <Image src={'/vehicle/registration/car/2.png'} width={1280} height={102} alt="" className="opacity-35 md:size-full size-[65%] object-cover" />
                                                                        </div>
                                                                    </Label>
                                                            }
                                                        </div>
                                                        {value ?
                                                            <>
                                                                {
                                                                    value.map((e: any, index: number) => {
                                                                        if (!e) return
                                                                        return (
                                                                            <div key={e} className="col-span-1 h-[300px] relative my-1">
                                                                                <Image

                                                                                    src={e.name instanceof File ? URL.createObjectURL(e.name) : e.name ?? ""}
                                                                                    width={1280}
                                                                                    height={1024}
                                                                                    alt="image" className="w-full h-full object-cover rounded-md"
                                                                                />
                                                                                <div
                                                                                    className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                    <MdClear
                                                                                        onClick={() => {
                                                                                            const carPhotoAfter: any = document.getElementById("carPhotoAfter") as HTMLInputElement | null;
                                                                                            if (carPhotoAfter && typeof carPhotoAfter !== 'undefined') {
                                                                                                carPhotoAfter.value = '';
                                                                                            }
                                                                                            onChange(value?.filter((value: any) => value !== e))
                                                                                        }}
                                                                                        className="text-red-500 bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer md:text-[26px] text-xl"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                            : null
                                                        }
                                                    </div>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="my-2">
                            <FormField
                                control={form.control}
                                name="carPhoto.left"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng thêm ảnh bên trái xe',
                                    },
                                    validate: {
                                        maxFile: (value: any) => value?.length <= 1 || 'Chỉ cho phép tối đa 1 ảnh',
                                    },
                                }}
                                render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                                    return (
                                        <FormItem className="">
                                            <FormLabel className="text-base font-semibold text-[#16171B]">
                                                {value?.length > 0 ? 'Ảnh bên trái xe' : 'Chọn ảnh bên trái xe'}
                                            </FormLabel>
                                            <FormControl>
                                                <>
                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>
                                                            {fieldState?.error?.message}
                                                        </FormMessage>
                                                    )}
                                                    <div className={`grid col-span-1 gap-4`}>
                                                        <div className={`${value?.length > 0 && 'hidden'} col-span-1  h-[300px]`}>
                                                            <Input {...fieldProps}
                                                                onChange={async (event: any) => {
                                                                    if (value?.length > 0 && event && checkFile(value, event)) {
                                                                        return checkFile(value, event)
                                                                    }
                                                                    setFormLoading((prev) => ({ ...prev, carPhotoLeft: true }));
                                                                    setProcessing(0);
                                                                    const file = await changeCheckFileImage(event.target.files[0], undefined, undefined, (process: any) => {
                                                                        setProcessing(process)
                                                                    })
                                                                    setFormLoading((prev) => ({ ...prev, carPhotoLeft: false }));

                                                                    onChange([...value, { id: uuidv4(), name: file }])
                                                                }
                                                                }
                                                                accept="image/*, application/pdf, image/heic"
                                                                id={"carPhotoLeft"}
                                                                type="file"
                                                                multiple
                                                                disabled={value?.length > 0}
                                                                className="hidden" />
                                                            {
                                                                (formLoading?.carPhotoAfter) ? (
                                                                    <ProcessingImage processing={processing} />
                                                                ) :
                                                                    <Label
                                                                        htmlFor={"carPhotoLeft"}
                                                                        className={`${value?.length > 0 ? '!cursor-not-allowed' : ''} ${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} overflow-hidden relative h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                                    >
                                                                        <IoMdAdd size={32} className="absolute z-10" />
                                                                        <div className="flex items-center justify-center">
                                                                            <Image src={'/vehicle/registration/car/3.png'} width={1280} height={102} alt="" className="opacity-35 md:size-full size-[65%] object-cover" />
                                                                        </div>
                                                                    </Label>
                                                            }
                                                        </div>
                                                        {value ?
                                                            <>
                                                                {
                                                                    value.map((e: any, index: number) => {
                                                                        if (!e) return
                                                                        return (
                                                                            <div key={e} className="col-span-1 h-[300px] relative my-1">
                                                                                <Image

                                                                                    src={e.name instanceof File ? URL.createObjectURL(e.name) : e.name ?? ""}
                                                                                    width={1280}
                                                                                    height={1024}
                                                                                    alt="image" className="w-full h-full object-cover rounded-md"
                                                                                />
                                                                                <div
                                                                                    className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                    <MdClear
                                                                                        onClick={() => {
                                                                                            const carPhotoLeft: any = document.getElementById("carPhotoLeft") as HTMLInputElement | null;
                                                                                            if (carPhotoLeft && typeof carPhotoLeft !== 'undefined') {
                                                                                                carPhotoLeft.value = '';
                                                                                            }
                                                                                            onChange(value?.filter((value: any) => value !== e))
                                                                                        }}
                                                                                        className="text-red-500 bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer md:text-[26px] text-xl"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                            : null
                                                        }
                                                    </div>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="my-2">
                            <FormField
                                control={form.control}
                                name="carPhoto.right"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng thêm ảnh bên phải xe',
                                    },
                                }}
                                render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                                    return (
                                        <FormItem className="">
                                            <FormLabel className="text-base font-semibold text-[#16171B]">
                                                {value?.length > 0 ? 'Ảnh bên phải xe' : 'Chọn ảnh bên phải xe'}
                                            </FormLabel>
                                            <FormControl>
                                                <>
                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>
                                                            {fieldState?.error?.message}
                                                        </FormMessage>
                                                    )}
                                                    <div className={`grid col-span-1 gap-4`}>
                                                        <div className={`${value?.length > 0 && 'hidden'} col-span-1  h-[300px]`}>
                                                            <Input
                                                                {...fieldProps}
                                                                onChange={async (event: any) => {
                                                                    if (value?.length > 0 && event && checkFile(value, event)) {
                                                                        return checkFile(value, event)
                                                                    }
                                                                    setFormLoading((prev) => ({ ...prev, carPhotoRight: true }));
                                                                    setProcessing(0);
                                                                    const file = await changeCheckFileImage(event.target.files[0], undefined, undefined, (process: any) => {
                                                                        setProcessing(process)
                                                                    })
                                                                    setFormLoading((prev) => ({ ...prev, carPhotoRight: false }));

                                                                    onChange([...value, { id: uuidv4(), name: file }])
                                                                }
                                                                }
                                                                accept="image/*, application/pdf, image/heic"
                                                                id={"carPhotoRight"}
                                                                type="file"
                                                                multiple
                                                                disabled={value?.length > 0}
                                                                className="hidden" />
                                                            {
                                                                (formLoading?.carPhotoAfter) ? (
                                                                    <ProcessingImage processing={processing} />
                                                                ) :
                                                                    <Label
                                                                        htmlFor={"carPhotoRight"}
                                                                        className={`${value?.length > 0 ? '!cursor-not-allowed' : ''} ${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} overflow-hidden relative h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                                    >
                                                                        <IoMdAdd size={32} className="absolute z-10" />
                                                                        <div className="flex items-center justify-center">
                                                                            <Image src={'/vehicle/registration/car/4.png'} width={1280} height={102} alt="" className="opacity-35 md:size-full size-[65%] object-cover z-0" />
                                                                        </div>
                                                                    </Label>
                                                            }
                                                        </div>
                                                        {value ?
                                                            <>
                                                                {
                                                                    value.map((e: any, index: number) => {
                                                                        if (!e) return
                                                                        return (
                                                                            <div key={e} className="col-span-1 h-[300px] relative my-1">
                                                                                <Image

                                                                                    src={e.name instanceof File ? URL.createObjectURL(e.name) : e.name ?? ""}
                                                                                    width={1280}
                                                                                    height={1024}
                                                                                    alt="image" className="w-full h-full object-cover rounded-md"
                                                                                />
                                                                                <div
                                                                                    className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                    <MdClear
                                                                                        onClick={() => {
                                                                                            const carPhotoRight: any = document.getElementById("carPhotoRight") as HTMLInputElement | null;
                                                                                            if (carPhotoRight && typeof carPhotoRight !== 'undefined') {
                                                                                                carPhotoRight.value = '';
                                                                                            }
                                                                                            onChange(value?.filter((value: any) => value !== e))
                                                                                        }}
                                                                                        className="text-red-500 bg-red-200 size-7 rounded-full p-1 m-1 cursor-pointer md:text-[26px] text-xl"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                            : null
                                                        }
                                                    </div>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Form>
            <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                {/* <ButtonSaveForm title="Lưu giấy tờ xe" onClick={form.handleSubmit((values) => onSubmit(values))} /> */}
                <ButtonLoading
                    title="Lưu giấy tờ xe"
                    type="button"
                    onClick={form.handleSubmit((values) => onSubmit(values))}
                    className="flex items-center gap-2 md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                                border-2 h-14 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                    disabled={isStateLoadSuccess.loading.isLoadingButton}
                    isStateloading={isStateLoadSuccess.loading.isLoadingButton}
                />
            </div>
        </BackgroundUiVehicle>
    )
}