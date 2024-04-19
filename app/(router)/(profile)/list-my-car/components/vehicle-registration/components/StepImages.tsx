import Image from "next/image"
import { IoMdAdd } from "react-icons/io"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IVehicleRegistration } from "@/types/Profile/mycar/IMyCar"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"

type Props = {
    form: any,
    isState: IVehicleRegistration
    queryState: (key: any) => void
}
const StepImages = ({ form, isState, queryState }: Props) => {

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
                        render={({ field: { value, onChange, ...fieldProps }, fieldState }) => {
                            return (
                                <FormItem className="">
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">
                                        Chọn hình ảnh
                                    </FormLabel>
                                    <FormControl>
                                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                                            <div className="col-span-1  h-[250px]">
                                                <Input {...fieldProps}
                                                    onChange={(event: any) => {
                                                        onChange([...value, event.target.files[0]])
                                                    }
                                                    }
                                                    accept="image/*, application/pdf"
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
                                                        value.map((e: any) => {
                                                            if (!e) return
                                                            return (
                                                                <div key={e} className="col-span-1 h-[250px]">
                                                                    <Image

                                                                        src={e instanceof File ? URL.createObjectURL(e) : e ?? ""}
                                                                        width={1280}
                                                                        height={1024}
                                                                        alt="image" className="w-full h-full object-cover rounded-md"
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>
                                                : null
                                            }
                                        </div>
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