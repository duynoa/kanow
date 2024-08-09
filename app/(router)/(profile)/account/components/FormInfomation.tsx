import { DatePickerShowYear } from "@/components/datePicker/DatePickerShowYear";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { regexPatterns } from "@/lib/regex";
import { toastCore } from "@/lib/toast";
import moment from "moment";
import Image from "next/image";

type Props = {
    form: any,
    isState: any,
}
const FormInformation = ({ form, isState }: Props) => {
    let messages = ""
    const validateDateOrder = (brithday: string) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const parsedBrithday = new Date(brithday);
        if (parsedBrithday > currentDate) {
            messages = "Ngày sinh không được lớn hơn ngày hiện tại";
            return false;
        }
        return true;
    };

    return (
        <Form {...form}>
            <div className="space-y-4" >
                <div className='flex flex-col lg:gap-8 md:gap-6 gap-5 bg-white'>
                    <div className="">
                        <FormField
                            control={form.control}
                            name="fullName"
                            rules={{
                                required: {
                                    value: isState.editInfo && isState.type === "editInfo"
                                    ,
                                    message: 'Vui lòng nhập họ và tên',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Tên của bạn {isState.editInfo && <span className="text-red-500">*</span>}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isState.editInfo}
                                                type="text"
                                                className={`  disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                                 focus:border-[#2FB9BD] border-2  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Họ và tên của bạn"
                                                {...field}
                                            />
                                        </FormControl>

                                        {isState.editInfo && fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                    <div className='md:grid md:grid-cols-2 flex flex-col md:gap-8 gap-4'>
                        <div className="md:order-none order-1">
                            <FormField
                                control={form.control}
                                name="dateInfo"
                                rules={{
                                    required: {
                                        value: isState.editInfo && isState.type === "editInfo",
                                        message: 'Vui lòng chọn ngày sinh',
                                    },
                                    validate: {
                                        dateOrder: (value) => {
                                            try {
                                                validateDateOrder(value);
                                                return messages || true;
                                            } catch (error) {
                                                throw error;
                                            }
                                        },
                                    },
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                                Ngày sinh {isState.editInfo && <span className="text-red-500">*</span>}
                                            </FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            disabled={!isState.editInfo} variant={"default"}
                                                            className="w-full 2xl:py-3 2xl:text-sm lg:text-xs lg:py-2 md:py-2 py-2 disabled:bg-gray-200 disabled:border-gray-300 disabled:border-2 bg-white focus:border-[#2FB9BD]
                                                             border-[#E6E8EC]   hover:bg-transparent hover:disabled:bg-gray-200 border-2 text-[#3E424E] font-normal px-3 rounded-2xl justify-between text-left"
                                                        >
                                                            {field.value ? moment(field.value).format("DD/MM/YYYY") : <span>Chọn ngày sinh</span>}
                                                            {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                                                            <div className="mr-2 h-5 max-h-5 w-5 max-w-5">
                                                                <Image src={'/icon/account/calendar.png'} width={1280} height={1024} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <DatePickerShowYear
                                                            mode="single"
                                                            captionLayout="dropdown-buttons"
                                                            selected={field.value}
                                                            onSelect={(newDate: any) => field.onChange(newDate)}
                                                            form={(e: any) => {
                                                                const date: any = new Date(field.value)
                                                                if (e > 12) {
                                                                    date.setFullYear(e)
                                                                } else {
                                                                    date.setMonth(e)
                                                                }
                                                                form.setValue('dateInfo', date)
                                                            }}
                                                            fromYear={1960}
                                                            toYear={2030}

                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>

                                            {isState.editInfo && fieldState?.invalid && fieldState?.error && (
                                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                                            )}
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giới tính
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(e) => {
                                                    if (!isState.editInfo) {
                                                        toastCore.error('Vui lòng chọn chỉnh sửa')
                                                        return
                                                    }
                                                    field.onChange(e)
                                                }
                                                }
                                                value={field.value}
                                                className='flex items-center gap-8 md:gap-8 sm:gap-4'>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="male" className='text-[#2FB9BD] border-[#2FB9BD] 2xl:text-sm lg:text-xs' id="r1" />
                                                    <Label className="cursor-pointer" htmlFor="r1">Nam</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="girl" className='text-[#2FB9BD] border-[#2FB9BD] 2xl:text-sm lg:text-xs' id="r2" />
                                                    <Label className="cursor-pointer" htmlFor="r2">Nữ</Label>
                                                </div>
                                            </RadioGroup>
                                        </FormControl>

                                        {fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                    <div className='grid lg:grid-cols-2 md:grid-cols-2 col-span-12 md:gap-8 gap-4'>
                        <FormField
                            control={form.control}
                            name="email"
                            rules={{
                                required: {
                                    value: isState.editInfo && isState.type === "editInfo",
                                    message: 'Vui lòng nhập email',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Email  {isState.editInfo && <span className="text-red-500">*</span>}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isState.editInfo}
                                                type="text"
                                                className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC] border-2 focus:border-[#2FB9BD]
                                                 2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>

                                        {isState.editInfo && fieldState?.invalid && fieldState?.error && (
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
                                required: {
                                    value: isState.editInfo && isState.type === "editInfo",
                                    message: 'Vui lòng nhập số điện thoại',
                                },
                                minLength: {
                                    value: 10,
                                    message: "Số điện thoại phải có ít nhất 10 số"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Số điện thoại không được dài hơn 10 số"
                                },
                                pattern: {
                                    value: regexPatterns.phone,
                                    message: "Số điện thoại không hợp lệ",
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xsfont-semibold text-[#16171B]">
                                            Số điện thoại  {isState.editInfo && <span className="text-red-500">*</span>}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isState.editInfo}
                                                type='tel'
                                                maxLength={10}
                                                className={`  disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC] border-2  focus:border-[#2FB9BD]
                                                2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Số điện thoại"
                                                {...field}
                                            />
                                        </FormControl>

                                        {isState.editInfo && fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
        </Form>
    )
}
export default FormInformation