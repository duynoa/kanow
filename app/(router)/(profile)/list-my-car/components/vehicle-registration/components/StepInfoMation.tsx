import { ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import SelectCombobox from "@/components/combobox/SelectCombobox"
import { IVehicleRegistration } from "@/types/Profile/mycar/IMyCar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Image from "next/image"

type Props = {
    form: any,
    isState: IVehicleRegistration
    queryState: (key: any) => void
}
const StepInfoMation = ({ form, isState, queryState }: Props) => {
    return (
        <Form  {...form}>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className='text-[#3E424E] text-base font-medium'>Thông tin cơ bản  <span className="text-red-500 text-xs font-semibold">(Lưu ý: Thông tin cơ bản không thể thay đổi sau khi đăng kí)</span></h1>
                    <FormField
                        control={form.control}
                        name="stepInformation.licensePlates"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập biển số xe',
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Biển số xe <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                            placeholder="Nhập biển số xe"
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
                    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4">
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="stepInformation.carCompany"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn hãng xe',
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Hãng xe <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Popover
                                                    open={isState.stateInformation.openCarCompany}
                                                    onOpenChange={() => queryState({ stateInformation: !isState.stateInformation.openCarCompany })}
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                        >
                                                            {/* {checkValue ? checkValue : "Chọn hãng xe"} */}
                                                            Chọn hãng xe
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
                                                            placeholderInput="Tìm kiếm hãng xe"

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
                        <FormField
                            control={form.control}
                            name="stepInformation.carModel"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng chọn mẫu xe',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Mẫu xe <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Popover
                                                open={isState.stateInformation.openCarModel}
                                                onOpenChange={() => queryState({ stateInformation: !isState.stateInformation.openCarModel })}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                    >
                                                        {/* {checkValue ? checkValue : "Chọn mẫu xe"} */}
                                                        Chọn mẫu xe
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
                                                        placeholderInput="Tìm kiếm mẫu xe"

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
                        <FormField
                            control={form.control}
                            name="stepInformation.seats"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng chọn số ghế',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Số ghế<span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Popover
                                                open={isState.stateInformation.openSeats}
                                                onOpenChange={() => queryState({ stateInformation: !isState.stateInformation.openSeats })}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                    >
                                                        {/* {checkValue ? checkValue : "Chọn số ghế"} */}
                                                        Chọn số ghế
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
                                                        placeholderInput="Tìm kiếm số ghế"

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
                        <FormField
                            control={form.control}
                            name="stepInformation.yearOfmManufacture"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng chọn năm sản xuất',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Năm sản xuất <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Popover
                                                open={isState.stateInformation.openYearOfManufacture}
                                                onOpenChange={() => queryState({ stateInformation: !isState.stateInformation.openYearOfManufacture })}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                    >
                                                        {/* {checkValue ? checkValue : "Chọn năm sản xuất"} */}
                                                        Chọn năm sản xuất
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
                                                        placeholderInput="Tìm kiếm năm sản xuất"

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
                        <FormField
                            control={form.control}
                            name="stepInformation.move"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng chọn chuyển động',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Chuyển động <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Popover
                                                open={isState.stateInformation.openYearOfManufacture}
                                                onOpenChange={() => queryState({ stateInformation: !isState.stateInformation.openYearOfManufacture })}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                    >
                                                        {/* {checkValue ? checkValue : "Chọn chuyển động"} */}
                                                        Chọn chuyển động
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
                                                        placeholderInput="Tìm kiếm chuyển động"

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
                        <FormField
                            control={form.control}
                            name="stepInformation.feuelType"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Vui lòng chọn loại nhiên liệu',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem className="flex flex-col gap-1 w-full max-w-full">
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Loại nhiên liệu <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Popover
                                                open={isState.stateInformation.openYearOfManufacture}
                                                onOpenChange={() => queryState({ stateInformation: !isState.stateInformation.openYearOfManufacture })}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="2xl:py-3 lg:py-2 md:py-2 py-2 px-3 2xl:text-sm lg:text-xs  justify-between border-[#E6E8EC] border-2 rounded-2xl hover:bg-transparent"
                                                    >
                                                        {/* {checkValue ? checkValue : "Chọn loại nhiên liệu"} */}
                                                        Chọn loại nhiên liệu
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
                                                        placeholderInput="Tìm kiếm loại nhiên liệu"

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
                <div className="flex flex-col gap-4">
                    <h1 className='text-[#3E424E] text-base font-medium'>Thông tin xe</h1>
                    <FormField
                        control={form.control}
                        name="stepInformation.fuelConsumptionLevel"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng nhập mức tiêu thụ nhiên liệu',
                            },
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Mức tiêu thụ nhiên liệu  <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                            placeholder="Nhập số lít nhiên liệu cho quãng đường 100km. "
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
                    <FormField
                        control={form.control}
                        name="stepInformation.describe"
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Mô tả
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                            placeholder="Nhập mô tả"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="stepInformation.feature"
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem>
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Tính năng
                                    </FormLabel>
                                    <FormControl >
                                        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3">
                                            {isState.stateInformation.dataFeature && isState.stateInformation.dataFeature.map((item) => {
                                                return (
                                                    <Label htmlFor={`${item.id}`} key={item.id}
                                                        className={`flex ${field.value?.includes(item.id) ? 'border-[#2FB9BD] text-[#2FB9BD]' : ''}
                                                             items-center justify-center gap-2 border-2  py-8 col-span-1 rounded-lg cursor-pointer`}
                                                    >
                                                        <div className="size-6">
                                                            <Image src={item.image} alt="" width={1280} height={1024} className="object-cover size-full" />
                                                        </div>
                                                        <Checkbox
                                                            checked={field.value?.includes(item.id)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value: any) => value !== item.id
                                                                        )
                                                                    )
                                                            }}
                                                            hidden
                                                            id={`${item.id}`}
                                                        />
                                                        {item.name}
                                                    </Label>
                                                )
                                            })}
                                        </div>
                                    </FormControl>
                                    {/* {isState.stateInformation.dataFeuelType.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name="stepInformation.feature"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className={`flex
                                                             ${field.value?.includes(item.id) ? 'bg-[#2FB9BD]' : ''}
                                                             items-center justify-center gap-2 border-2 min-w-[200px] min-h-[100px]`}
                                                        >
                                                            <Label htmlFor={`${item.id}`} className="font-normal">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(item.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, item.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value: any) => value !== item.id
                                                                                    )
                                                                                )
                                                                        }}
                                                                        hidden
                                                                        id={`${item.id}`}
                                                                    />
                                                                </FormControl>
                                                                {item.name}
                                                            </Label>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))} */}
                                </FormItem>
                            );
                        }}
                    />
                </div>
            </div>

        </Form>
    )
}
export default StepInfoMation