import Image from "next/image"
import { IoMdAdd } from "react-icons/io"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IVehicleRegistration } from "@/types/Profile/mycar/IMyCar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MdClear } from "react-icons/md"

type Props = {
    form: any,
}
const StepImages = ({ form }: Props) => {

    return (
        <Form  {...form}>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className='text-[#3E424E] text-base font-medium'>Hình ảnh</h1>
                    <h4 className='text-[#3E424E] font-normal lg:text-sm text-xs'>
                        Đăng nhiều hình ở các góc độ khác nhau để tăng thông tin cho xe của bạn.
                    </h4>
                </div>
                <div className="">
                    <FormField
                        control={form.control}
                        name="stepImages.images"
                        rules={{
                            required: {
                                value: true,
                                message: 'Vui lòng thêm hình ảnh',
                            },
                        }}
                        render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                            return (
                                <FormItem className="">
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Chọn hình ảnh
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
                                                        accept="image/*, application/pdf, image/heic"
                                                        id={"picture"}
                                                        type="file"
                                                        multiple
                                                        className="hidden" />
                                                    <Label
                                                        htmlFor={"picture"}
                                                        className={`${fieldState?.invalid && fieldState?.error ? 'border-red-500' : 'border-[#BEBFC2]/80'} h-full  w-full cursor-pointer  hover:border-[#2FB9BD] border-2 border-dashed  rounded-md flex items-center justify-center`}
                                                    >
                                                        <IoMdAdd size={32} />
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
                                                                                    const inputElement = document.getElementById('picture') as HTMLInputElement | null;
                                                                                    if (inputElement && typeof inputElement !== 'undefined') {
                                                                                        inputElement.value = '';
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
        </Form>
    )
}
export default StepImages