import { DatePickerShowYear } from "@/components/datePicker/DatePickerShowYear";
import ProcessingImage from "@/components/image/ProcessingImage";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { toastCore } from "@/lib/toast";
import { changeCheckFileImage } from "@/utils/fnChange/changeFile";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdClear } from "react-icons/md";

type Props = {
    form: any,
    isState: any,
}

const FormPapers = ({ form, isState }: Props) => {
    let messages = ""
    const validateDateOrder = (birthday: string) => {
        const currentDate = new Date();
        const parsedBirthday = new Date(birthday);

        // Kiểm tra xem ngày sinh có lớn hơn ngày hiện tại hay không
        if (parsedBirthday > currentDate) {
            messages = "Ngày sinh không được lớn hơn ngày hiện tại";
            return false;
        }

        // Tính toán tuổi
        const age = currentDate.getFullYear() - parsedBirthday.getFullYear();

        // Kiểm tra xem người dùng có đủ 18 tuổi hay không
        if (age < 18) {
            messages = "Bạn chưa đủ 18 tuổi, chưa được cấp GPLX";
            return false;
        }

        // Nếu ngày sinh hợp lệ và người dùng đủ 18 tuổi, trả về true
        return true;
    };

    const [loadingProcessing, setLoadingProcessing] = useState<boolean>(false)
    const [processing, setProcessing] = useState<number>(0)
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
                                    value: isState.editPapers && isState.type === "editPapers",
                                    message: 'Vui lòng nhập số GPLX',
                                },
                                minLength: {
                                    value: 12,
                                    message: 'Số GPLX tối thiểu 12 số',
                                },
                                maxLength: {
                                    value: 12,
                                    message: 'Số GPLX tối đa 12 số',
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Số GPLX không hơp lệ'
                                }
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
                                                type="number"
                                                minLength={12}
                                                maxLength={12}
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
                                    value: isState.editPapers && isState.type === "editPapers",
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
                                    value: isState.editPapers && isState.type === "editPapers",
                                    message: 'Vui lòng chọn ngày sinh',
                                },
                                validate: {
                                    validate: (value) => {
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
                                            Ngày sinh {isState.editPapers && <span className="text-red-500">*</span>}
                                        </FormLabel>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        disabled={!isState.editPapers}
                                                        variant={"default"}
                                                        className={`border-[#E6E8EC] w-full focus:border-[#2FB9BD] 2xl:py-3 lg:py-2 md:py-2 py-2 2xl:text-sm lg:text-xs disabled:bg-gray-200 disabled:border-gray-300 disabled:border-2
                                                        bg-white  hover:bg-transparent hover:disabled:bg-gray-200 border-2 text-[#3E424E] font-normal px-3 rounded-2xl justify-between text-left`}
                                                    >
                                                        {field.value ? moment(field.value).format("DD/MM/YYYY") : <span>Chọn ngày sinh</span>}
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
                                                            form.setValue('datePapers', date)
                                                        }}
                                                        fromYear={1960}
                                                        toYear={2030}

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
                                    value: isState.editPapers && isState.type === "editPapers",
                                    message: 'Vui lòng thêm hình ảnh',
                                },
                            }}
                            render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                {isState.editPapers && fieldState?.invalid && fieldState?.error && (
                                                    <FormMessage>
                                                        {fieldState?.error?.message}
                                                    </FormMessage>
                                                )}
                                                <Input {...fieldProps}
                                                    onChange={async (event: any) => {
                                                        setLoadingProcessing(true)
                                                        setProcessing(0);
                                                        const file = await changeCheckFileImage(event.target.files[0], undefined, undefined, (process: any) => {
                                                            setProcessing(process)
                                                        })
                                                        setLoadingProcessing(false)
                                                        onChange(file)
                                                    }}
                                                    accept="image/*, application/pdf, image/heic"
                                                    id={!isState.editPapers ? "" : "picture"}
                                                    type="file"
                                                    multiple
                                                    className="hidden" />
                                                <div className="h-[280px] relative bg-white rounded-md">
                                                    {loadingProcessing ? (
                                                        <ProcessingImage processing={processing} />
                                                    ) :
                                                        value ?
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
                                                                                toastCore.error('Vui lòng chọn chỉnh sửa')
                                                                                return
                                                                            }
                                                                            const inputElement = document.getElementById('picture') as HTMLInputElement | null;
                                                                            if (inputElement && typeof inputElement !== 'undefined') {
                                                                                inputElement.value = '';
                                                                            }
                                                                            form.reset({ ...form.getValues(), filePapers: null })
                                                                        }}
                                                                        className="text-red-500 bg-red-200 md:size-9 size-8 rounded-full p-1 m-1 cursor-pointer md:text-[26px] text-xl"
                                                                    />
                                                                </div>
                                                            </>
                                                            :
                                                            <Label
                                                                onClick={() => {
                                                                    if (!isState.editPapers) {
                                                                        toastCore.error('Vui lòng chọn chỉnh sửa')
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