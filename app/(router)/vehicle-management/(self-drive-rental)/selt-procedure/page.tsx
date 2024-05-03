"use client"
import ButtonSaveForm from "@/components/button/ButtonSaveForm";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useVehicleManage } from "@/hooks/useVehicleManage";
import { toastCore } from "@/lib/toast";
import { uuidv4 } from "@/lib/uuid";
import apiVehicleSurcharge from "@/services/vehicle-management/surcharge.services";
import apiVehicleCommon from "@/services/vehicle-management/vehicle-common.services";
import BackgroundUiVehicle from "@/themes/vehicle-management/BackgroundUiVehicle";
import { ICarRentalDocuments, IMortgage } from "@/types/VehicleManagement/SelfDriveRental/IProcedure";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
type Props = {}


export default function SeltProcedure(props: Props) {

    const arrayMortgage: IMortgage[] = [
        {
            id: uuidv4(),
            value: "Không yêu cầu khách thuê tiền mặt hoặc xe máy",
            label: "Không yêu cầu khách thuê tiền mặt hoặc xe máy"
        },
        {
            id: uuidv4(),
            value: "15 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) hoặc Xe máy (kèm cà vẹt gốc) giá trị 15 triệu",
            label: "15 triệu (tiền mặt/chuyển khoản cho chủ xe khi nhận xe) hoặc Xe máy (kèm cà vẹt gốc) giá trị 15 triệu"
        }
    ]

    const arrayCarRentalDocuments: ICarRentalDocuments[] = [
        {
            id: uuidv4(),
            value: 'GPLX&CCCD',
            label: 'GPLX & CCCD gắp chíp (đối chiếu)',
            icon: ""
        },
        {
            id: uuidv4(),
            value: 'GPLX',
            label: 'GPLX (đối chiếu) & Passport (giữ lại)',
            icon: ""
        }
    ]


    const form = useForm({
        defaultValues: {
            mortgage: "",
            // giấy tờ thuê xe,
            carRentalDocuments: ["GPLX", 'GPLX&CCCD'],
            // điều khoản
            rules: ""
        }
    })

    const initialState: any = {
        openMortgage: false,
    }

    const { apiListSurchargeCar } = apiVehicleSurcharge()

    const [isState, setIsState] = useState(initialState)


    const queryState = (key: any) => setIsState((prev: any) => ({ ...prev, ...key }))


    const { dataDetail: { data }, idCar, dataOther } = useVehicleManage()


    const findValue = form.getValues()


    const { apiUpdateCar } = apiVehicleCommon()


    const onSubmit = async (value: any) => {
        // "mortgage": "0", //1 thế chấp, truyen 0 hoac 1
        // "note_mortgage": "", //ghi chu the chap
        let formData = new FormData()
        formData.append('car_id', idCar)
        formData.append('rules', value.rules)
        formData.append('note_mortgage', value.mortgage)
        formData.append('mortgage', data?.mortgage)

        const { data: db } = await apiUpdateCar(formData)
        if (db.result) {
            toastCore.success('Lưu thông tin thành công')
            return
        }
        toastCore.error(db.message)
    }

    useEffect(() => {
        if (!Array.isArray(data) && data) {
            form.setValue("rules", data?.rules)
            form.setValue("mortgage", data?.note_mortgage)
            queryState({ openMortgage: data?.mortgage == 1 })
            return
        }
        form.reset()
    }, [data])


    return (
        <BackgroundUiVehicle className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h1 className='text-[#3E424E] lg:text-2xl text-xl  font-semibold'>Thủ tục cho thuê</h1>
            </div>
            <Form {...form}>
                <div className="grid grid-cols-1 gap-6">
                    {isState.openMortgage && (
                        <FormField
                            control={form.control}
                            name="mortgage"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">Tài sản thế chấp</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {arrayMortgage.map((x) => {
                                                return (
                                                    <FormItem key={x.value} className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem checked={field.value.includes(x.value)} value={x.value} className='text-[#2FB9BD] border-[#2FB9BD] 2xl:text-sm lg:text-xs' id={x.value} />
                                                        </FormControl>
                                                        <Label htmlFor={x.value} className="font-normal cursor-pointer md:text-sm text-[13px]">
                                                            {x.label}
                                                        </Label>
                                                    </FormItem>
                                                )
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="carRentalDocuments"
                        render={({ field }: any) => {
                            return (
                                <FormItem className="space-y-3">
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">Giấy tờ thuê xe</FormLabel>
                                    <FormDescription>
                                        <h1 className="text-xs text-gray-400">Thiết lập các giấy tờ khách bắt buộc phải có (bản gốc) khi thuê xe {data?.name}</h1>
                                    </FormDescription>
                                    <FormControl>
                                        <>
                                            {arrayCarRentalDocuments.map((x) => {
                                                return (
                                                    <RadioGroup
                                                        key={x.value}
                                                        onValueChange={(e) => {
                                                            return e ? field.onChange([...field.value, e]) : field.onChange(field.value.filter((y: any) => y !== x.value))
                                                        }}
                                                        defaultValue={field.value.includes(x.value)}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem key={x.value} className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem {...field} checked={field.value.includes(x.value)} value={x.value} className='text-[#2FB9BD] border-[#2FB9BD] 2xl:text-sm lg:text-xs' id={x.value} />
                                                            </FormControl>
                                                            <Label htmlFor={x.value} className="font-normal cursor-pointer md:text-sm text-[13px]">
                                                                {x.label}
                                                            </Label>
                                                        </FormItem>
                                                    </RadioGroup>
                                                )
                                            })}
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="rules"
                        rules={{
                            required: {
                                value: true,
                                message: "Vui lòng nhập các điều khoản"
                            }
                        }}
                        render={({ field, fieldState }) => {
                            return (
                                <FormItem className="space-y-3">
                                    <FormLabel className="2xl:text-sm lg:text-xs font-semibold text-[#16171B]">Điều khoản thuê xe <span className="text-red-500 px-1">*</span> </FormLabel>
                                    <FormDescription>
                                        <h1 className="text-xs text-gray-400">Thiết lập các yêu cầu khi thuê xe {data?.name}</h1>
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            className={`disabled:bg-[#E6E8EC] 2xl:text-sm lg:text-xs disabled:border-gray-300 disabled:border-2  w-full border-[#E6E8EC]
                                 focus:border-[#2FB9BD] border-2 min-h-[150px]  2xl:py-3 lg:py-2 md:py-2 py-2  rounded-2xl   px-3 focus-visible:ring-0 text-[#3E424E] font-normal focus-visible:ring-offset-0 `}
                                            placeholder="Nhập các điều khoản"
                                            {...field}
                                        />
                                    </FormControl>
                                    {fieldState?.invalid && fieldState?.error && (
                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                    )}
                                </FormItem>
                            )
                        }}
                    />
                </div>
                <div className="flex items-center md:justify-end justify-between gap-2 mt-4">
                    <ButtonSaveForm title="Lưu thông tin" onClick={form.handleSubmit((values) => onSubmit(values))} />
                </div>
            </Form>
        </BackgroundUiVehicle>
    )
}