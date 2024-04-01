import moment from "moment";
import Image from "next/image";
import { MdClear } from "react-icons/md";
import { toastCore } from "@/lib/toast";
import { IoMdAdd } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";

type Props = {
    form: any,
    isState: any,
}

const FormPapers = ({ form, isState }: Props) => {
    return (
        <Form {...form}>
            <div className="space-y-4" >
                <div className='grid md:grid-cols-2 grid-cols-1 lg:gap-8 md:gap-6 gap-5 '>
                    <div className='flex flex-col 2xl:gap-6 lg:gap-4 gap-6 bg-white'>
                        <h1 className="text-[#3E424E] font-semibold text-[18px]">Thông tin chung</h1>
                        <FormField
                            control={form.control}
                            rules={{
                                required: {
                                    value: isState.editPapers,
                                    message: 'Vui lòng nhập số GPLX',
                                },
                            }}
                            name="numberPapers"
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Số GPLX {isState.editPapers && <span className="text-red-500">*</span>}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isState.editPapers}
                                                type="text"
                                                className={`  disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs md:py-2 py-2 disabled:border-gray-300 disabled:border-2  focus:border-[#2FB9BD]
                                                w-full border-[#E6E8EC] border-2 2xl:py-3 lg:py-2 rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Số GPLX"
                                                {...field}
                                            />
                                        </FormControl>

                                        {isState.editPapers && fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="namePapers"
                            rules={{
                                required: {
                                    value: isState.editPapers,
                                    message: 'Vui lòng nhập họ và tên',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Họ và tên {isState.editPapers && <span className="text-red-500">*</span>}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isState.editPapers}
                                                type="text"
                                                className={`  disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC] focus:border-[#2FB9BD]
                                                 border-2  2xl:py-3 lg:py-2 md:py-2 py-2 rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                                placeholder="Nhập đầy đủ họ và tên"
                                                {...field}
                                            />
                                        </FormControl>

                                        {isState.editPapers && fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="datePapers"
                            rules={{
                                required: {
                                    value: isState.editPapers,
                                    message: 'Vui lòng chọn ngày tháng năm sinh',
                                },
                            }}
                            render={({ field, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                            Ngày sinh {isState.editPapers && <span className="text-red-500">*</span>}
                                        </FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        disabled={!isState.editPapers}
                                                        variant={"default"}
                                                        className="w-full focus:border-[#2FB9BD] 2xl:py-3 lg:py-2 md:py-2 py-2 2xl:text-sm lg:text-xs disabled:bg-gray-200 disabled:border-gray-300 disabled:border-2
                                                         bg-white border-[#E6E8EC] hover:bg-transparent hover:disabled:bg-gray-200 border-2 text-[#3E424E] font-normal px-3 rounded-2xl justify-between text-left"
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

                                        {isState.editPapers && fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>{fieldState?.error?.message}</FormMessage>
                                        )}
                                    </FormItem>
                                );
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-6">
                        <Label htmlFor="picture" className="text-[#3E424E] font-semibold text-[18px]">Hình ảnh {isState.editPapers && <span className="text-red-500">*</span>}</Label>
                        <FormField
                            control={form.control}
                            name="filePapers"
                            rules={{
                                required: {
                                    value: isState.editPapers,
                                    message: 'Vui lòng chọn hình ảnh',
                                },
                            }}
                            render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <Input {...fieldProps}
                                                    onChange={(event: any) => {

                                                        onChange(event.target.files[0])
                                                    }

                                                    }
                                                    accept="image/*, application/pdf"
                                                    id={!isState.editPapers ? "" : "picture"}
                                                    type="file"
                                                    multiple
                                                    className="hidden" />
                                                <div className="h-[280px] relative bg-white rounded-md">
                                                    {value ?
                                                        <>
                                                            <Image
                                                                src={value instanceof File ? URL.createObjectURL(value) : value}
                                                                width={1280}
                                                                height={1024}
                                                                alt="image" className="w-full h-full object-cover rounded-md"
                                                            />
                                                            <div
                                                                className="bg-white rounded-full rounded-fit absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                                                <MdClear
                                                                    onClick={() => {
                                                                        if (!isState.editPapers) {
                                                                            toastCore.warning('Vui lòng chọn chỉnh sửa')
                                                                            return
                                                                        }
                                                                        const inputElement = document.getElementById('picture') as HTMLInputElement | null;
                                                                        if (inputElement) {
                                                                            inputElement.value = '';
                                                                        }
                                                                        form.reset({ ...form.getValues(), filePapers: null })
                                                                    }}
                                                                    className="text-red-500 bg-red-200 w-fit h-fit rounded-full p-1 m-1 cursor-pointer" size={26}
                                                                />
                                                            </div>
                                                        </>
                                                        :
                                                        <Label
                                                            onClick={() => {
                                                                if (!isState.editPapers) {
                                                                    toastCore.warning('Vui lòng chọn chỉnh sửa')
                                                                }
                                                            }}
                                                            htmlFor={!isState.editPapers ? "" : "picture"}
                                                            className={`${isState.editPapers && fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} h-full w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                        >
                                                            <IoMdAdd size={32} />
                                                        </Label>
                                                    }
                                                </div>
                                            </>
                                        </FormControl>
                                        {/* {fieldState?.invalid && fieldState?.error && (
                                            <FormMessage>
                                                {fieldState?.error?.message}
                                            </FormMessage>
                                        )} */}
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
export default FormPapers