import { debounce } from "lodash";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";




import { cn } from "@/lib/utils";
import { toastCore } from "@/lib/toast";
import usePartnerApi from "@/services/partner/partner.services";
import { useDialogRegisterOwnerDriver } from "@/hooks/useOpenDialog";
import apiAddress from "@/services/profile/listAddress/listAddress.services";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Command } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from "../ui/commandCustom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useAuth } from "@/hooks/useAuth";


type Props = {
}

export function DialogRegisterOwnerDriver({ }: Props) {
    const path = usePathname()

    const queryParams: string = path.split("/")[2]

    const { informationUser } = useAuth()

    const { apiListCity } = apiAddress()

    const { apiRegisterOwnerDriver } = usePartnerApi()

    const [dataCity, setDataCity] = useState<any>([]);

    const [openCombobox, setOpenCombobox] = useState<boolean>(false);

    const { openDialogRegisterOwnerDriver, setOpenDialogRegisterOwnerDriver, type } = useDialogRegisterOwnerDriver();

    const form = useForm({
        defaultValues: {
            address: "",
            nameUser: "",
            phone: "",
            nameCar: ""
        },
    })

    const fetchListCity = async (search: any) => {
        try {
            const { data } = await apiListCity({ 'search': search })
            if (data?.data) {
                const newData = data?.data.map((e: any) => ({ label: e.name, value: e.province_id }))
                setDataCity(newData)
            }
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        if (openDialogRegisterOwnerDriver) {
            fetchListCity('')
            if (!!informationUser) {
                form.setValue('nameUser', informationUser?.fullname)
                form.setValue('phone', informationUser?.phone)
            }
            return
        }
        form.reset()
    }, [openDialogRegisterOwnerDriver])

    const onSubmit = async (data: any) => {
        let formData = new FormData();
        formData.append('phone', data.phone);
        formData.append('car', data.nameCar);
        formData.append('name', data.nameUser);
        formData.append('province_id', data.address);
        formData.append('type', `${queryParams === 'vehicle-owner' ? 2 : 3}`);

        const { data: res } = await apiRegisterOwnerDriver(formData)

        if (res?.result) {
            form.reset()
            setOpenDialogRegisterOwnerDriver(true, 'success')
            return
        }
        toastCore.error(res?.message)
    }

    return (
        <>
            <Dialog modal={false} open={openDialogRegisterOwnerDriver} >
                {openDialogRegisterOwnerDriver && (
                    <div
                        onClick={() => setOpenDialogRegisterOwnerDriver(false, 'reset')}
                        className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                )}
                <DialogContent className="px-0 pb-0 lg:max-w-[740px] lg:w-[740px] max-w-[95%] w-[95%] max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                    <DialogClose
                        onClick={() => setOpenDialogRegisterOwnerDriver(false, 'reset')}
                        className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                    >
                        <X className="size-8 text-[#000000]" />
                        <span className="sr-only">Close</span>
                    </DialogClose>

                    <DialogHeader className='flex items-center justify-center w-full border-b pb-4'>
                        <DialogTitle className='text-2xl capitalize'>
                            {type === 'success' ? 'Gửi yêu cầu thành công' : 'Trở thành đối tác'}
                        </DialogTitle>
                    </DialogHeader>
                    {type === 'success' ? (
                        <div className="px-4 pb-4 flex flex-col gap-4">
                            <div className="flex justify-center">
                                <FaCheckCircle className="text-6xl text-[#2FB9BD]" />
                            </div>
                            <DialogDescription className="text-base text-black font-normal">
                                Yêu cầu đăng ký trở thành đối tác của bạn đã được gửi.
                            </DialogDescription>
                            <DialogDescription className="text-base text-black font-normal">
                                Bộ phận phát triển kinh doanh của Kanow sẽ liên hệ bạn để tư vấn quy trình và hướng dẫn đăng xe trong thời gian sớm nhất.
                                Bạn cũng có thể đăng xe trực tiếp bằng cái tải ứng dụng Kanow và đăng xe theo hướng dẫn tại mục Xe của tôi.
                            </DialogDescription>
                            <DialogDescription className="text-base text-black font-normal">
                                Để được hỗ trợ, vui lòng gọi hotline <span className="text-[#2FB9BD]">1900 252 228</span> (T2-T7, 9AM-9PM).
                            </DialogDescription>
                            <DialogDescription className="text-base text-black font-normal">
                                Xin cảm ơn,
                            </DialogDescription>
                            <DialogDescription className="text-base text-[#2FB9BD] font-normal italic">
                                Kanow team
                            </DialogDescription>
                        </div>
                    ) :
                        <div className="px-4 flex flex-col gap-4 !z-[100]">
                            <DialogDescription>
                                Bạn vui lòng điền đầy đủ thông tin, Kanow sẽ liên hệ vói bạn trong vòng một ngày làm việc.
                            </DialogDescription>
                            <Form {...form}>
                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="address"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Vui lòng chọn khu vực',
                                            },
                                        }}
                                        render={({ field, fieldState }) => {
                                            const checkValue = dataCity.find((x: any) => x.value === field.value)?.label

                                            return (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium text-black dark:text-secondary/70">
                                                        Khu vực <span className="text-[#F15A5A]">*</span>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <>
                                                            <Popover open={openCombobox} onOpenChange={() => setOpenCombobox(!openCombobox)}   >
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] focus:border-[#2FB9BD] border-2 rounded-2xl hover:bg-transparent text-[#3E424E]"
                                                                    >
                                                                        {checkValue ? checkValue : "Chọn khu vực"}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="md:max-w-[700px] md:w-[700px] w-[380px] max-w-[380px] p-0">
                                                                    <Command className="w-full">
                                                                        <div className="relative">
                                                                            <Input
                                                                                className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-8 text-sm"
                                                                                onChange={debounce(({ target: { value } }) => {
                                                                                    fetchListCity(value)
                                                                                }, 500)}
                                                                                placeholder="Tìm kiếm khu vực"
                                                                            />
                                                                            <Search className="w-5 h-5 absolute top-1/2 -translate-y-1/2  left-2 text-[#200E32]" />
                                                                        </div>
                                                                        <CommandList className="h-[50%] overflow-auto">
                                                                            <CommandEmpty>Không có dữ liệu</CommandEmpty>
                                                                            {dataCity && dataCity?.length > 0 ?
                                                                                <CommandGroup>
                                                                                    {dataCity?.map((x: any) => (
                                                                                        <CommandItem
                                                                                            key={x.value}
                                                                                            onSelect={(e) => {
                                                                                                field.onChange(x.value)
                                                                                                setOpenCombobox(!openCombobox)
                                                                                            }}
                                                                                            value={x.value}
                                                                                            className="w-full"
                                                                                        >
                                                                                            {x.label}
                                                                                            <Check className={cn("mr-2 ml-2 h-4 w-4 text-[#2FB9BD]", field.value === x.value ? "opacity-100" : "opacity-0")} />
                                                                                        </CommandItem>
                                                                                    ))}
                                                                                </CommandGroup>
                                                                                : null
                                                                            }
                                                                        </CommandList>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </>
                                                    </FormControl>
                                                    {fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                    )}
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="nameUser"
                                    rules={{
                                        required: "Vui lòng nhập tên đối tác",
                                    }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-black dark:text-secondary/70">
                                                    Tên đối tác <span className="text-[#F15A5A]">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <>
                                                        <Input
                                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                            focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                            placeholder="Nhập tên đối tác"
                                                            type={'text'}
                                                            {...field}
                                                        />
                                                    </>
                                                </FormControl>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    rules={{
                                        required: "Vui lòng nhập số điện thoại",
                                        minLength: {
                                            value: 10,
                                            message: "Số điện thoại phải có ít nhất 10 số!"
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Số điện thoại không được dài hơn 10 số!"
                                        }
                                    }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-black dark:text-secondary/70">
                                                    Số điện thoại <span className="text-[#F15A5A]">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <>
                                                        <Input
                                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                            focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                            placeholder="Nhập số điện thoại"
                                                            type={'number'}
                                                            {...field}
                                                        />
                                                    </>
                                                </FormControl>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="nameCar"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng nhập xe đăng ký',
                                        },
                                    }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-black dark:text-secondary/70">
                                                    Xe đăng ký <span className="text-[#F15A5A]">*</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <>
                                                        <Input
                                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                            focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                            placeholder="Nhập xe đăng ký"
                                                            type={'text'}
                                                            {...field}
                                                        />
                                                    </>
                                                </FormControl>
                                                {fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        );
                                    }}
                                />
                            </Form>
                            <div className="mb-4 flex justify-end">
                                <Button
                                    onClick={() => form.handleSubmit((values: any) => onSubmit(values))()}
                                    className='xl:px-6 w-fit xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80'
                                >
                                    Gửi thông tin tới Kanow
                                </Button>
                            </div>
                        </div>

                    }

                </DialogContent>
            </Dialog>
        </>
    )
}
