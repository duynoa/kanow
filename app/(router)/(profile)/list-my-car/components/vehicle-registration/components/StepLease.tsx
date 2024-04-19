import SelectCombobox from "@/components/combobox/SelectCombobox"
import { Button } from "@/components/ui/button"
import { CustomSlider } from "@/components/ui/customSlider"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { IVehicleRegistration } from "@/types/Profile/mycar/IMyCar"
import { ChevronsUpDown } from "lucide-react"

type Props = {
    form: any,
    isState: IVehicleRegistration
    queryState: (key: any) => void
}
const StepLease = ({ form, isState, queryState }: Props) => {
    console.log("isState", isState);

    return (
        <>
            <Form  {...form}>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className='text-[#3E424E] text-base font-medium'>Thông tin thuê xe </h1>
                    </div>
                    <div className="grid md:grid-cols-2 col-span-1 grid-rows-1 md:gap-6 gap-4">
                        <div className="md:col-span-2 col-span-1">
                            <FormField
                                control={form.control}
                                name="stepLease.unitPrice"
                                rules={{
                                    required: {
                                        value: false,
                                        message: 'Vui lòng nhập đơn giá thuê',
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <FormItem className="space-y-0 flex flex-col gap-2">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Đơn giá thuê mặc định<span className="text-red-500">*</span>
                                                <h1 className="text-xs text-gray-400">Giá đề xuất 390k</h1>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                    placeholder="390K"
                                                    type={'number'}
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
                        </div>
                        <div className="md:col-span-2 col-span-1">
                            <FormField
                                control={form.control}
                                name="stepLease.vehicleAddress"
                                render={({ field, fieldState }) => {
                                    return (
                                        <FormItem className="flex flex-col justify-between space-y-0">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Địa chỉ xe
                                            </FormLabel>
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    rules={{
                                                        required: {
                                                            value: false,
                                                            message: 'Vui lòng chọn tỉnh thành',
                                                        },
                                                    }}
                                                    name="stepLease.vehicleAddress.city"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Tỉnh/ Thành phố <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover
                                                                            open={isState.stateLease.openCity}
                                                                            onOpenChange={() => queryState({
                                                                                stateLease: {
                                                                                    ...isState.stateLease,
                                                                                    openCity: !isState.stateLease.openCity
                                                                                }
                                                                            })}
                                                                        >
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {/* {checkValue ? checkValue : "Chọn hãng xe"} */}
                                                                                    Chọn tỉnh thành
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={[]}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        // field.onChange(e)
                                                                                        // queryKeyIsState({ openWards: false })
                                                                                    }}
                                                                                    // onValueChange={(e: any) => handleSearchApi(e, 'wards')}
                                                                                    placeholderInput="Tìm kiếm tỉnh thành"

                                                                                />
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
                                                <FormField
                                                    control={form.control}
                                                    name="stepLease.vehicleAddress.district"
                                                    rules={{
                                                        required: {
                                                            value: false,
                                                            message: 'Vui lòng chọn quận huyện',
                                                        },
                                                    }}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Quận/ huyện <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover
                                                                            onOpenChange={() => queryState({
                                                                                stateLease: {
                                                                                    ...isState.stateLease,
                                                                                    openDistrict: !isState.stateLease.openDistrict
                                                                                }
                                                                            })}
                                                                            open={isState.stateLease.openDistrict}
                                                                        >
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3  w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {/* {checkValue ? checkValue : "Chọn hãng xe"} */}
                                                                                    Chọn quận huyện
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={[]}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        // field.onChange(e)
                                                                                        // queryKeyIsState({ openWards: false })
                                                                                    }}
                                                                                    // onValueChange={(e: any) => handleSearchApi(e, 'wards')}
                                                                                    placeholderInput="Tìm kiếm quận huyện"

                                                                                />
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
                                                <FormField
                                                    control={form.control}
                                                    rules={{
                                                        required: {
                                                            value: false,
                                                            message: 'Vui lòng chọn phường/ xã',
                                                        },
                                                    }}
                                                    name="stepLease.vehicleAddress.ward"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Phường/ xã <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover
                                                                            onOpenChange={() => queryState({
                                                                                stateLease: {
                                                                                    ...isState.stateLease,
                                                                                    openWards: !isState.stateLease.openWards
                                                                                }
                                                                            })}
                                                                            open={isState.stateLease.openWards}
                                                                        >
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3  w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {/* {checkValue ? checkValue : "Chọn hãng xe"} */}
                                                                                    Chọn phường xã
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[620px] xxl:w-[480px] 2xl:w-[500px] xl:w-[400px] lg:w-[310px] md:w-[310px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={[]}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        // field.onChange(e)
                                                                                        // queryKeyIsState({ openWards: false })
                                                                                    }}
                                                                                    // onValueChange={(e: any) => handleSearchApi(e, 'wards')}
                                                                                    placeholderInput="Tìm kiếm phường xã"

                                                                                />
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
                                                <FormField
                                                    control={form.control}
                                                    rules={{
                                                        required: {
                                                            value: false,
                                                            message: 'Vui lòng nhập tên đường',
                                                        }
                                                    }}
                                                    name="stepLease.vehicleAddress.street"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Tên đường <span className="text-red-500">*</span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                                                     focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                                        placeholder="Nhập tên đường"
                                                                        type={'text'}
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
                                            </div>
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="stepLease.discount.open"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giảm giá
                                            <h1 className="text-xs text-gray-400">Bật tính năng</h1>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="">
                                                <Switch
                                                    className="data-[state=checked]:bg-[#2FB9BD] "
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </div>
                                        </FormControl>
                                        {field.value &&
                                            <FormField
                                                control={form.control}
                                                name="stepLease.discount.value"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                Giảm giá cho thuê tuần (% trên đơn giá)
                                                            </FormLabel>
                                                            <FormControl>
                                                                <>
                                                                    <CustomSlider
                                                                        defaultValue={[20]} max={100} step={1}
                                                                        onValueChange={field.onChange}
                                                                    />
                                                                </>
                                                            </FormControl>
                                                            <div className="flex justify-between">
                                                                <FormDescription>
                                                                    Giảm đề xuất {20}%
                                                                </FormDescription>
                                                                <FormDescription className='font-bold'>
                                                                    {field.value}%
                                                                </FormDescription>
                                                            </div>
                                                            {fieldState?.invalid && fieldState?.error && (
                                                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                            )}
                                                        </FormItem>
                                                    );
                                                }}
                                            />}
                                        {fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />


                        <FormField
                            control={form.control}
                            name="stepLease.bookCarQuickly.open"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Đặt xe nhanh
                                            <h1 className="text-xs text-gray-400">Bật tính năng</h1>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="">
                                                <Switch
                                                    className="data-[state=checked]:bg-[#2FB9BD] "
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </div>
                                        </FormControl>
                                        {field.value &&
                                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="stepLease.bookCarQuickly.wordLimit"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Giới hạn từ
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover
                                                                        // open={isState.stateInformation.openCarCompany}
                                                                        // onOpenChange={() => queryState({ stateInformation: !isState.stateInformation.openCarCompany })}
                                                                        >
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3 w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {/* {checkValue ? checkValue : "Chọn hãng xe"} */}
                                                                                    Giới hạn từ
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[300px] xxl:w-[280px] 2xl:w-[250px] xl:w-[200px] lg:w-[150px] md:w-[160px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={[]}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        // field.onChange(e)
                                                                                        // queryKeyIsState({ openWards: false })
                                                                                    }}
                                                                                // onValueChange={(e: any) => handleSearchApi(e, 'wards')}
                                                                                // placeholderInput="Tìm kiếm thời gian"

                                                                                />
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
                                                <FormField
                                                    control={form.control}
                                                    name="stepLease.bookCarQuickly.until"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Giới hạn từ
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <Popover
                                                                        // open={isState.stateInformation.openCarCompany}
                                                                        // onOpenChange={() => queryState({ stateInformation: !isState.stateInformation.openCarCompany })}
                                                                        >
                                                                            <PopoverTrigger asChild>
                                                                                <Button
                                                                                    variant="outline"
                                                                                    role="combobox"
                                                                                    className="2xl:py-3  w-full lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                                                >
                                                                                    {/* {checkValue ? checkValue : "Chọn hãng xe"} */}
                                                                                    Cho đến
                                                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="3xl:w-[300px] xxl:w-[280px] 2xl:w-[250px] xl:w-[200px] lg:w-[150px] md:w-[160px] w-auto">
                                                                                <SelectCombobox
                                                                                    data={[]}
                                                                                    field={field}
                                                                                    onChange={(e: any) => {
                                                                                        // field.onChange(e)
                                                                                        // queryKeyIsState({ openWards: false })
                                                                                    }}
                                                                                // onValueChange={(e: any) => handleSearchApi(e, 'wards')}
                                                                                // placeholderInput="Tìm kiếm thời gian"

                                                                                />
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
                                        }
                                        {fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />

                        {/* // giao xe tận nơi*/}
                        <FormField
                            control={form.control}
                            name="stepLease.vehicleHanding.open"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giao xe tận nơi
                                            <h1 className="text-xs text-gray-400">Bật tính năng</h1>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="">
                                                <Switch
                                                    className="data-[state=checked]:bg-[#2FB9BD] "
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </div>
                                        </FormControl>
                                        {field.value &&
                                            <div className="flex flex-col gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="stepLease.vehicleHanding.intersectionSquare"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Quãng đường giao xe tối đa
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            defaultValue={[20]} max={50} step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className="flex justify-between">
                                                                    <FormDescription>
                                                                        Quãng đường đề xuất: đề xuất {20}km
                                                                    </FormDescription>
                                                                    <FormDescription className='font-bold'>
                                                                        {field.value}km
                                                                    </FormDescription>
                                                                </div>
                                                                {fieldState?.invalid && fieldState?.error && (
                                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                )}
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="stepLease.vehicleHanding.deliveryFee"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Vượt phí giới hạn (tính mỗi km)
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            defaultValue={[5]} max={50} step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className="flex justify-between">
                                                                    <FormDescription>
                                                                        Phí đề xuất: đề xuất {3}k
                                                                    </FormDescription>
                                                                    <FormDescription className='font-bold'>
                                                                        {field.value}k
                                                                    </FormDescription>
                                                                </div>
                                                                {fieldState?.invalid && fieldState?.error && (
                                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                )}
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="stepLease.vehicleHanding.freeDelivery"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Miễn phí giao nhận xe trong vòng
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            defaultValue={[1]} max={50} step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className="flex justify-between">
                                                                    <FormDescription>
                                                                        Quãng đường đề xuất {1}km
                                                                    </FormDescription>
                                                                    <FormDescription className='font-bold'>
                                                                        {field.value}km
                                                                    </FormDescription>
                                                                </div>
                                                                {fieldState?.invalid && fieldState?.error && (
                                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                )}
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            </div>
                                        }
                                        {fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                        {/* //gioi han so km */}
                        <FormField
                            control={form.control}
                            name="stepLease.limitedKilometers.open"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giới hạn số km
                                            <h1 className="text-xs text-gray-400">Bật tính năng</h1>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="">
                                                <Switch
                                                    className="data-[state=checked]:bg-[#2FB9BD] "
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </div>
                                        </FormControl>
                                        {field.value &&
                                            <div className="flex flex-col gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="stepLease.limitedKilometers.maximumKilometers"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Số km tối đa trong 1 ngày
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            defaultValue={[400]} max={500} step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className="flex justify-between">
                                                                    <FormDescription>
                                                                        Số km đề xuất: đề xuất {400}km
                                                                    </FormDescription>
                                                                    <FormDescription className='font-bold'>
                                                                        {field.value}km
                                                                    </FormDescription>
                                                                </div>
                                                                {fieldState?.invalid && fieldState?.error && (
                                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                )}
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="stepLease.limitedKilometers.overLimitFee"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem>
                                                                <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                                    Vượt phí giới hạn (tính mỗi km)
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <>
                                                                        <CustomSlider
                                                                            defaultValue={[3]} max={5} step={1}
                                                                            onValueChange={field.onChange}
                                                                        />
                                                                    </>
                                                                </FormControl>
                                                                <div className="flex justify-between">
                                                                    <FormDescription>
                                                                        Phí đề xuất: đề xuất {3}k
                                                                    </FormDescription>
                                                                    <FormDescription className='font-bold'>
                                                                        {field.value}k
                                                                    </FormDescription>
                                                                </div>
                                                                {fieldState?.invalid && fieldState?.error && (
                                                                    <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                                )}
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            </div>
                                        }
                                        <FormField
                                            control={form.control}
                                            name="stepLease.carRentalConditions"
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <FormItem className="">
                                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                            Điều khoản thuê xe
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                className={`disabled:bg-[#E6E8EC] min-h-[170px] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                                focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                                placeholder="Nhập rõ các yêu cầu để khách có thể thuê xe."
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
                                        {fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                </div>
            </Form>
        </>
    )
}
export default StepLease