"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import Image from "next/image";
import { useRef } from "react";
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

    const refImagesRegistration = useRef<HTMLInputElement>(null)
    const refImagesRegistry = useRef<HTMLInputElement>(null)
    const refImagesInsurance = useRef<HTMLInputElement>(null)
    const refImagesCarPhotoBefore = useRef<HTMLInputElement>(null)
    const refImagesCarPhotoAfter = useRef<HTMLInputElement>(null)
    const refImagesCarPhotoLeft = useRef<HTMLInputElement>(null)
    const refImagesCarPhotoRight = useRef<HTMLInputElement>(null)

    const { dataDetail: { data, base }, idCar } = useVehicleManage()

    const findValue = form.getValues()

    const onSubmit = async (value: any) => {
        console.log(value)
        toastCore.error('Chức năng đang phát triển')
    }


    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <Form {...form}>
                <div className="flex flex-col gap-6">
                    <div className="my-2">
                        <div className="flex md:flex-row flex-col justify-between">
                            <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Cà vẹt / Giấy đăng ký xe ô tô</h1>
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
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Chọn hình giấy tờ xe
                                        </FormLabel>
                                        <FormControl>
                                            <>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>
                                                        {fieldState?.error?.message}
                                                    </FormMessage>
                                                )}
                                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                                    <div className="col-span-1  h-[250px]">
                                                        <Input {...fieldProps}
                                                            onChange={(event: any) => {
                                                                if (value?.some((value: any) => value?.name == event.target.files[0]?.name)) {
                                                                    return
                                                                }
                                                                onChange([...value, event.target.files[0]])
                                                            }
                                                            }
                                                            accept="image/*, application/pdf"
                                                            id={"imagesRegistration"}
                                                            ref={refImagesRegistration}
                                                            type="file"
                                                            multiple
                                                            className="hidden" />
                                                        <Label
                                                            htmlFor={"imagesRegistration"}
                                                            className={`${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} relative overflow-hidden h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                        >
                                                            <IoMdAdd size={32} className="absolute z-10" />
                                                            <Image src={'/vehicle/registration/registration.jpg'} width={1280} height={102} alt="" className="opacity-25 size-full object-cover" />
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

                                                                                src={e instanceof File ? URL.createObjectURL(e) : e ?? ""}
                                                                                width={1280}
                                                                                height={1024}
                                                                                alt="image" className="w-full h-full object-cover rounded-md"
                                                                            />
                                                                            <div
                                                                                className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                <MdClear
                                                                                    onClick={() => {
                                                                                        const inputValue = refImagesRegistration.current?.value;
                                                                                        if (inputValue) {
                                                                                            refImagesRegistration.current.value = '';
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
                    <Separator orientation='horizontal' />
                    <div className="my-2">
                        <div className="flex md:flex-row flex-col justify-between">
                            <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Đăng kiểm</h1>
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
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Chọn hình đăng kiểm
                                        </FormLabel>
                                        <FormControl>
                                            <>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>
                                                        {fieldState?.error?.message}
                                                    </FormMessage>
                                                )}
                                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                                    <div className="col-span-1  h-[250px]">
                                                        <Input {...fieldProps}
                                                            onChange={(event: any) => {
                                                                if (value?.some((value: any) => value?.name == event.target.files[0]?.name)) {
                                                                    return
                                                                }
                                                                onChange([...value, event.target.files[0]])
                                                            }
                                                            }
                                                            accept="image/*, application/pdf"
                                                            id={"imagesRegistry"}
                                                            ref={refImagesRegistration}
                                                            type="file"
                                                            multiple
                                                            className="hidden" />
                                                        <Label
                                                            htmlFor={"imagesRegistry"}
                                                            className={`${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} relative overflow-hidden h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                        >
                                                            <IoMdAdd size={32} className="absolute z-10" />
                                                            <Image src={'/vehicle/registration/registry.jpg'} width={1280} height={102} alt="" className="opacity-25 size-full object-cover" />
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

                                                                                src={e instanceof File ? URL.createObjectURL(e) : e ?? ""}
                                                                                width={1280}
                                                                                height={1024}
                                                                                alt="image" className="w-full h-full object-cover rounded-md"
                                                                            />
                                                                            <div
                                                                                className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                <MdClear
                                                                                    onClick={() => {
                                                                                        const inputValue = refImagesRegistry.current?.value;
                                                                                        if (inputValue) {
                                                                                            refImagesRegistry.current.value = '';
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
                    <Separator orientation='horizontal' />
                    <div className="my-2">
                        <div className="flex md:flex-row flex-col justify-between">
                            <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Bảo hiểm vật chất</h1>
                        </div>
                        <FormField
                            control={form.control}
                            name="imagesInsurance"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng thêm hình bảo hiểm vật chất',
                                },
                            }}
                            render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Chọn hình bảo hiểm vật chất
                                        </FormLabel>
                                        <FormControl>
                                            <>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>
                                                        {fieldState?.error?.message}
                                                    </FormMessage>
                                                )}
                                                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                                    <div className="col-span-1  h-[250px]">
                                                        <Input {...fieldProps}
                                                            onChange={(event: any) => {
                                                                if (value?.some((value: any) => value?.name == event.target.files[0]?.name)) {
                                                                    return
                                                                }
                                                                onChange([...value, event.target.files[0]])
                                                            }
                                                            }
                                                            accept="image/*, application/pdf"
                                                            id={"imagesInsurance"}
                                                            ref={refImagesRegistration}
                                                            type="file"
                                                            multiple
                                                            className="hidden" />
                                                        <Label
                                                            htmlFor={"imagesInsurance"}
                                                            className={`${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} relative overflow-hidden h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                        >
                                                            <IoMdAdd size={32} className="absolute z-10" />
                                                            <Image src={'/vehicle/registration/insurance.jpg'} width={1280} height={102} alt="" className="opacity-25 size-full object-cover" />
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

                                                                                src={e instanceof File ? URL.createObjectURL(e) : e ?? ""}
                                                                                width={1280}
                                                                                height={1024}
                                                                                alt="image" className="w-full h-full object-cover rounded-md"
                                                                            />
                                                                            <div
                                                                                className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                <MdClear
                                                                                    onClick={() => {
                                                                                        const inputValue = refImagesInsurance.current?.value;
                                                                                        if (inputValue) {
                                                                                            refImagesInsurance.current.value = '';
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
                    <Separator orientation='horizontal' />
                    <div className="flex md:flex-row flex-col justify-between">
                        <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Ảnh chi tiết xe</h1>
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
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
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
                                                                onChange={(event: any) => {
                                                                    if (value?.some((value: any) => value?.name == event.target.files[0]?.name)) {
                                                                        return
                                                                    }
                                                                    onChange([event.target.files[0]])
                                                                }
                                                                }
                                                                accept="image/*, application/pdf"
                                                                id={"carPhoto.before"}
                                                                ref={refImagesCarPhotoBefore}
                                                                type="file"
                                                                multiple
                                                                disabled={value?.length > 0}
                                                                className="hidden" />
                                                            <Label
                                                                htmlFor={"carPhoto.before"}
                                                                className={`${value?.length > 0 ? '!cursor-not-allowed' : ''} ${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} overflow-hidden relative h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                            >
                                                                <IoMdAdd size={32} className="absolute z-10" />
                                                                <Image src={'/vehicle/registration/mazda1.png'} width={1280} height={102} alt="" className="opacity-25 object-cover" />
                                                            </Label>
                                                        </div>
                                                        {value ?
                                                            <>
                                                                {
                                                                    value.map((e: any, index: number) => {
                                                                        if (!e) return
                                                                        return (
                                                                            <div key={e} className="col-span-1 h-[300px] relative my-1">
                                                                                <Image

                                                                                    src={e instanceof File ? URL.createObjectURL(e) : e ?? ""}
                                                                                    width={1280}
                                                                                    height={1024}
                                                                                    alt="image" className="w-full h-full object-cover rounded-md"
                                                                                />
                                                                                <div
                                                                                    className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                    <MdClear
                                                                                        onClick={() => {
                                                                                            const inputValue = refImagesCarPhotoBefore.current?.value;
                                                                                            if (inputValue) {
                                                                                                refImagesCarPhotoBefore.current.value = '';
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
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
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
                                                                onChange={(event: any) => {
                                                                    if (value?.some((value: any) => value?.name == event.target.files[0]?.name)) {
                                                                        return
                                                                    }
                                                                    onChange([...value, event.target.files[0]])
                                                                }
                                                                }
                                                                accept="image/*, application/pdf"
                                                                id={"carPhoto.after"}
                                                                ref={refImagesCarPhotoAfter}
                                                                type="file"
                                                                multiple
                                                                disabled={value?.length > 0}
                                                                className="hidden" />
                                                            <Label
                                                                htmlFor={"carPhoto.after"}
                                                                className={`${value?.length > 0 ? '!cursor-not-allowed' : ''} ${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} overflow-hidden relative h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                            >
                                                                <IoMdAdd size={32} className="absolute z-10" />
                                                                <Image src={'/vehicle/registration/mazda2.png'} width={1280} height={102} alt="" className="opacity-25 object-cover" />
                                                            </Label>
                                                        </div>
                                                        {value ?
                                                            <>
                                                                {
                                                                    value.map((e: any, index: number) => {
                                                                        if (!e) return
                                                                        return (
                                                                            <div key={e} className="col-span-1 h-[300px] relative my-1">
                                                                                <Image

                                                                                    src={e instanceof File ? URL.createObjectURL(e) : e ?? ""}
                                                                                    width={1280}
                                                                                    height={1024}
                                                                                    alt="image" className="w-full h-full object-cover rounded-md"
                                                                                />
                                                                                <div
                                                                                    className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                    <MdClear
                                                                                        onClick={() => {
                                                                                            const inputValue = refImagesCarPhotoAfter.current?.value;
                                                                                            if (inputValue) {
                                                                                                refImagesCarPhotoAfter.current.value = '';
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
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
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
                                                                onChange={(event: any) => {
                                                                    if (value?.some((value: any) => value?.name == event.target.files[0]?.name)) {
                                                                        return
                                                                    }
                                                                    onChange([...value, event.target.files[0]])
                                                                }
                                                                }
                                                                accept="image/*, application/pdf"
                                                                id={"carPhoto.left"}
                                                                ref={refImagesCarPhotoLeft}
                                                                type="file"
                                                                multiple
                                                                disabled={value?.length > 0}
                                                                className="hidden" />
                                                            <Label
                                                                htmlFor={"carPhoto.left"}
                                                                className={`${value?.length > 0 ? '!cursor-not-allowed' : ''} ${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} overflow-hidden relative h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                            >
                                                                <IoMdAdd size={32} className="absolute z-10" />
                                                                <Image src={'/vehicle/registration/mazda3.png'} width={1280} height={102} alt="" className="opacity-25 object-cover" />
                                                            </Label>
                                                        </div>
                                                        {value ?
                                                            <>
                                                                {
                                                                    value.map((e: any, index: number) => {
                                                                        if (!e) return
                                                                        return (
                                                                            <div key={e} className="col-span-1 h-[300px] relative my-1">
                                                                                <Image

                                                                                    src={e instanceof File ? URL.createObjectURL(e) : e ?? ""}
                                                                                    width={1280}
                                                                                    height={1024}
                                                                                    alt="image" className="w-full h-full object-cover rounded-md"
                                                                                />
                                                                                <div
                                                                                    className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                    <MdClear
                                                                                        onClick={() => {
                                                                                            const inputValue = refImagesCarPhotoLeft.current?.value;
                                                                                            if (inputValue) {
                                                                                                refImagesCarPhotoLeft.current.value = '';
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
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
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
                                                            <Input {...fieldProps}
                                                                onChange={(event: any) => {
                                                                    if (value?.some((value: any) => value?.name == event.target.files[0]?.name)) {
                                                                        return
                                                                    }
                                                                    onChange([...value, event.target.files[0]])
                                                                }
                                                                }
                                                                accept="image/*, application/pdf"
                                                                id={"carPhoto.right"}
                                                                ref={refImagesCarPhotoRight}
                                                                type="file"
                                                                multiple
                                                                disabled={value?.length > 0}
                                                                className="hidden" />
                                                            <Label
                                                                htmlFor={"carPhoto.right"}
                                                                className={`${value?.length > 0 ? '!cursor-not-allowed' : ''} ${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} overflow-hidden relative h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                            >
                                                                <IoMdAdd size={32} className="absolute z-10" />
                                                                <Image src={'/vehicle/registration/mazda4.png'} width={1280} height={102} alt="" className="opacity-25 object-cover z-0" />
                                                            </Label>
                                                        </div>
                                                        {value ?
                                                            <>
                                                                {
                                                                    value.map((e: any, index: number) => {
                                                                        if (!e) return
                                                                        return (
                                                                            <div key={e} className="col-span-1 h-[300px] relative my-1">
                                                                                <Image

                                                                                    src={e instanceof File ? URL.createObjectURL(e) : e ?? ""}
                                                                                    width={1280}
                                                                                    height={1024}
                                                                                    alt="image" className="w-full h-full object-cover rounded-md"
                                                                                />
                                                                                <div
                                                                                    className="bg-white rounded-full rounded-fit absolute top-0 right-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                                    <MdClear
                                                                                        onClick={() => {
                                                                                            const inputValue = refImagesCarPhotoRight.current?.value;
                                                                                            if (inputValue) {
                                                                                                refImagesCarPhotoRight.current.value = '';
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
                <ButtonSaveForm title="Lưu giấy tờ xe" onClick={form.handleSubmit((values) => onSubmit(values))} />
            </div>
        </BackgroundUiVehicle>
    )
}