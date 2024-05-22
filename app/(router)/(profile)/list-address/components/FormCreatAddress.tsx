'use client'
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import SelectCombobox from "../../../../../components/combobox/SelectCombobox"
import SearchAddress from "@/components/searchAddress/SearchAddress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useDialogAddress } from "@/hooks/useOpenDialog"
const FormCreatAddress = ({ form, isState, queryKeyIsState, handleSearchApi, onSubmit }: any) => {
    const { setOpenBoxSearch } = useDialogAddress()

    return (
        <Form {...form}>
            <div className="space-y-4" >
                <div className='flex flex-col 2xl:gap-6 lg:gap-4 gap-6 bg-white'>
                    <h1 className="text-[#3E424E] font-semibold text-[18px]">Thông tin địa chỉ</h1>
                    <FormField
                        control={form.control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng chọn loại',
                            },
                        }}
                        name="category"
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Loại địa điểm <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex  gap-4 items-center">
                                            <RadioGroupItem {...field} className="hidden" value="1" id="1" />
                                            <Label className={`${field.value == '1' ? ' border-[#2FB9BD]/80 ' : 'border-[#B4B8C5] '}
                                                             lg:py-3 py-2 lg:px-8 px-[13px] hover:scale-105 transition-all duration-200 ease-linear  rounded-xl border-2 cursor-pointer flex items-center text-[#16171B] gap-2`}
                                                htmlFor="1">
                                                <div className="lg:size-5 size-4">
                                                    <Image src={'/profile/address/home-2.png'} width={1280} height={1024} className="w-full h-full" alt="" />
                                                </div>
                                                <h5 className="leading-4 lg:text-sm text-xs font-medium">Nhà riêng</h5>
                                            </Label>

                                            <RadioGroupItem {...field} className="hidden" value="2" id="2" />
                                            <Label className={`${field.value == '2' ? ' border-[#2FB9BD]/80 ' : 'border-[#B4B8C5] '}
                                                             lg:py-3 py-2 lg:px-8 px-[13px] hover:scale-105 transition-all duration-200 ease-linear  rounded-xl border-2 cursor-pointer flex items-center text-[#16171B] gap-2`}
                                                htmlFor="2">
                                                <div className="lg:size-5 size-4">
                                                    <Image src={'/profile/address/building-4.png'} width={1280} height={1024} className="w-full h-full" alt="" />
                                                </div>
                                                <h5 className="leading-4 lg:text-sm text-xs font-medium">Công ty</h5>
                                            </Label>

                                            <RadioGroupItem {...field} className="hidden" value="3" id="3" />
                                            <Label className={`${field.value == '3' ? ' border-[#2FB9BD]/80 ' : 'border-[#B4B8C5] '}
                                                             lg:py-3 py-2 lg:px-8 px-[13px] hover:scale-105 transition-all duration-200 ease-linear  rounded-xl border-2 cursor-pointer flex items-center text-[#16171B] gap-2`}
                                                htmlFor="3">
                                                <div className="lg:size-5 size-4">
                                                    <Image src={'/profile/address/stickynote.png'} width={1280} height={1024} className="w-full h-full" alt="" />
                                                </div>
                                                <h5 className="leading-4 lg:text-sm text-xs font-medium">Khác</h5>
                                            </Label>
                                        </RadioGroup>
                                    </FormControl>
                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            );
                        }}
                    />
                    <div className="grid grid-cols-12 items-center 2xl:gap-6 lg:gap-4 gap-6">
                        <div className="lg:col-span-4 col-span-12">
                            <FormField
                                control={form.control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn tỉnh thành',
                                    },
                                }}
                                name="city"
                                render={({ field, fieldState }) => {
                                    const checkValue = isState.dataCity.find((x: any) => x.value === field.value)?.label
                                    return (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Tỉnh thành <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.openCity} onOpenChange={() => queryKeyIsState({ openCity: !isState.openCity })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 2xl:text-sm lg:text-xs  md:py-2 py-2 px-3 justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : "Chọn tỉnh thành"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0">
                                                        <SelectCombobox
                                                            data={isState.dataCity}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryKeyIsState({ openCity: false })
                                                                form.setValue('district', '')
                                                                form.setValue('wards', '')
                                                            }}
                                                            placeholderInput="Tìm kiếm tỉnh thành"
                                                            onValueChange={(e: any) => handleSearchApi(e, 'city')}

                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>

                                            {fieldState?.invalid && fieldState?.error && (
                                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <FormField
                                control={form.control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn quận / huyện',
                                    },
                                }}
                                name="district"
                                render={({ field, fieldState }) => {
                                    const checkValue = isState.dataDistrict.find((x: any) => x.value === field.value)?.label
                                    return (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Quận / Huyện <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.openDistrict} onOpenChange={() => queryKeyIsState({ openDistrict: !isState.openDistrict })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 2xl:text-sm lg:text-xs  md:py-2 py-2 px-3 justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : "Chọn quận / huyện"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0">
                                                        <SelectCombobox
                                                            data={isState.dataDistrict}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryKeyIsState({ openDistrict: false })
                                                                form.setValue('wards', '')
                                                            }}
                                                            onValueChange={(e: any) => handleSearchApi(e, 'district')}
                                                            placeholderInput="Tìm kiếm quận / huyện"

                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>

                                            {fieldState?.invalid && fieldState?.error && (
                                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <FormField
                                control={form.control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn phường / xã',
                                    },
                                }}
                                name="wards"
                                render={({ field, fieldState }) => {
                                    const checkValue = isState.dataWards.find((x: any) => x.value === field.value)?.label
                                    return (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Phường / Xã <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.openWards} onOpenChange={() => queryKeyIsState({ openWards: !isState.openWards })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {checkValue ? checkValue : "Chọn phường / xã"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full p-0">
                                                        <SelectCombobox
                                                            data={isState.dataWards}
                                                            field={field}
                                                            onChange={(e: any) => {
                                                                field.onChange(e)
                                                                queryKeyIsState({ openWards: false })
                                                            }}
                                                            onValueChange={(e: any) => handleSearchApi(e, 'wards')}
                                                            placeholderInput="Tìm kiếm phường / xã"

                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>

                                            {fieldState?.invalid && fieldState?.error && (
                                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập tên gợi nhớ',
                            },
                        }}
                        name="nameAddress"
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Tên gợi nhớ <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs  disabled:border-gray-300 disabled:border-2  focus:border-[#2FB9BD]
                                                            w-full border-[#E6E8EC] border-2 2xl:py-3 lg:py-2 md:py-2 py-2 rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                            placeholder="Tên gợi nhớ cho địa chỉ của bạn"
                                            {...field}
                                        />
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
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập địa chỉ',
                            },
                        }}
                        name="address"
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Địa chỉ <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <SearchAddress field={field} onChange={(e: any) => field.onChange(e)} >
                                            <Input
                                                type="text"
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs  disabled:border-gray-300 disabled:border-2  focus:border-[#2FB9BD]
                                                            w-full border-[#E6E8EC] border-2 2xl:py-3 lg:py-2 md:py-2 py-2 rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập địa chỉ của bạn"
                                                {...field}
                                                onChange={(e: any) => {
                                                    field.onChange(e)
                                                    setOpenBoxSearch(true)
                                                }}
                                                onClick={() => setOpenBoxSearch(true)}
                                                onBlur={() => setOpenBoxSearch(false)}
                                            />
                                        </SearchAddress>
                                    </FormControl>
                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            );
                        }}
                    />
                    <div>
                        <FormField
                            control={form.control}
                            name="defaultAddress"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormControl>
                                            <div className="flex items-center justify-start gap-2">
                                                <FormLabel htmlFor="dfAddress" className="cursor-pointer 2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                    Đặt làm địa chỉ mặc định
                                                </FormLabel>
                                                <Switch
                                                    id="dfAddress"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-[#2FB9BD] "
                                                />
                                            </div>
                                        </FormControl>

                                        {fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="button"
                        disabled={form.formState.isSubmitting}
                        onClick={() => form.handleSubmit((values: any) => onSubmit(values))()}
                        className={`bg-[#2FB9BD]/80  hover:bg-[#2FB9BD]/80" hover:bg-[#2FB9BD]/80 hover:text-white bg-white text-[#2FB9BD] border-[#2FB9BD] md:w-fit w-full text-sm lg:px-8
                                    px-5 2xl:py-3 xl:py-2.5 py-2.5 3xl:gap-2 gap-1 rounded-xl cursor-pointer hover:scale-105  uppercase transition-all overflow-hidden  border uppercases`}
                    >
                        {isState.idAddress === '0' ? 'Thêm địa chỉ mới' : 'Cập nhật địa chỉ'}
                    </Button>
                </div>
            </div>
        </Form>
    )
}
export default FormCreatAddress