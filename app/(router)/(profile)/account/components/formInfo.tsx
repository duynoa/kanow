import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import Image from "next/image";

type Props = {
    form: any,
    isState: any,
}
const FormInfo = ({ form, isState }: Props) => {
    return (
        <Form {...form}>
            <div className="space-y-4" >
                <div className='flex flex-col 2xl:gap-6 lg:gap-4 gap-6 bg-white'>
                    <div className="">
                        <h1 className="2xl:text-[18px] lg:text-sm font-semibold text-[#16171B] mb-3 md:order-none order-2">
                            Tên của bạn
                        </h1>
                        <div className='flex border-2 border-[#E6E8EC] rounded-2xl md:order-none order-1'>
                            <div className="w-1/2">
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem>
                                                <FormControl >
                                                    <Input
                                                        disabled={!isState.editInfo}
                                                        type="text"
                                                        className={`  disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs  w-full border-0 2xl:py-3 lg:py-2 md:py-2 py-2  rounded-none rounded-tl-2xl rounded-bl-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                        placeholder="Họ và tên đệm"
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
                            <div className={`${!isState.editInfo ? "bg-gray-100" : "white"}  flex items-center`}>
                                <Separator orientation="vertical" className={`${!isState.editInfo ? "bg-[#BEBFC2]" : "bg-[#BEBFC2]"} h-[60%]`} />
                            </div>
                            <div className="w-1/2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        disabled={!isState.editInfo}
                                                        type="text"
                                                        className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs w-full border-0 2xl:py-3 lg:py-2 md:py-2 py-2  rounded-none rounded-tr-2xl rounded-br-2xl px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                        placeholder="Tên của bạn"
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
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-2 md:grid-cols-2 col-span-12 gap-8 md:gap-8 sm:gap-4'>
                        <FormField
                            control={form.control}
                            name="dateInfo"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Ngày sinh
                                        </FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        disabled={!isState.editInfo} variant={"default"}
                                                        className={'w-full 2xl:py-3 2xl:text-sm lg:text-xs lg:py-2 md:py-2 py-2 disabled:bg-gray-200 disabled:border-gray-300 disabled:border-2 bg-white border-[#E6E8EC] hover:bg-transparent hover:disabled:bg-gray-200 border-2 text-[#3E424E] font-normal px-3 rounded-2xl justify-between text-left'}
                                                    >
                                                        {field.value ? moment(field.value).format("DD/MM/YYYY") : <span>Nhập ngày sinh</span>}
                                                        {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                                                        <div className="mr-2 h-5 max-h-5 w-5 max-w-5">
                                                            <Image src={'/icon/account/calendar.png'} width={1280} height={1024} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(newDate: any) => field.onChange(newDate)}
                                                        initialFocus
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
                            name="gender"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Giới tính
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className='flex items-center gap-8 md:gap-8 sm:gap-4'>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="male" className='text-[#2FB9BD] border-[#2FB9BD] 2xl:text-sm lg:text-xs' id="r1" />
                                                    <Label htmlFor="r1">Nam</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="girl" className='text-[#2FB9BD] border-[#2FB9BD] 2xl:text-sm lg:text-xs' id="r2" />
                                                    <Label htmlFor="r2">Nữ</Label>
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
                    <div className='grid lg:grid-cols-2 md:grid-cols-2 col-span-12 gap-8 md:gap-8 sm:gap-4'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isState.editInfo}
                                                type="text"
                                                className={`  disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC] border-2 2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Email"
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
                            name="phone"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xsfont-semibold text-[#16171B]">
                                            Số điện thoại
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isState.editInfo}
                                                type="text"
                                                className={`  disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC] border-2 2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Số điện thoại"
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
                </div>
            </div>
        </Form>
    )
}
export default FormInfo