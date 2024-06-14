import React from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { X } from "lucide-react";

import { useDialogReportCar } from "@/hooks/useOpenDialog";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

import { useForm } from "react-hook-form";

import { postReportCar } from "@/services/cars/report.services";
import { toastCore } from "@/lib/toast";

import { IInitialStateDetailCar } from "@/types/Initial/IInitial";
import { useDataDetailCar } from "@/hooks/useDataQueryKey";
import { useLoadSuccess } from "@/hooks/useLoadSuccess";
import ButtonLoading from "../button/ButtonLoading";

type Props = {}

export function DialogReportCar({ }: Props) {
    const { openDialogReportCar, setOpenDialogReportCar } = useDialogReportCar()
    const { isStateDetailCar, queryKeyIsStateDetailCar } = useDataDetailCar()
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    const form = useForm({
        defaultValues: {
            content: ""
        },
    });

    const handleOpenChangeModal = () => {
        setOpenDialogReportCar(false)
        setTimeout(() => {
            queryKeyIsStateDetailCar({
                reportCar: {
                    ...isStateDetailCar?.reportCar,
                    selectReportCar: ""
                }
            })
            form.reset();
        }, 300);
    }

    const handleChangeSelectReport = (value: string) => {
        queryKeyIsStateDetailCar({
            reportCar: {
                ...isStateDetailCar?.reportCar,
                selectReportCar: value,
            }
        })
    }

    const onSubmit = async (values: any) => {
        console.log('check submit');

        try {
            queryKeyIsStateLoadSuccess({
                loading: {
                    isLoadingButton: true,
                }
            })
            let dataReport = {
                content: values?.content ? values?.content : "",
                report_id: isStateDetailCar?.reportCar?.selectReportCar,
                car_id: isStateDetailCar?.dataDetailCar?.id
            }

            const { data } = await postReportCar(dataReport)
            console.log('data data', data);


            if (data?.result) {
                setOpenDialogReportCar(false)
                form.reset()
                queryKeyIsStateDetailCar({
                    reportCar: {
                        ...isStateDetailCar?.reportCar,
                        selectReportCar: ""
                    }
                })

                queryKeyIsStateLoadSuccess({
                    loading: {
                        ...isStateLoadSuccess.loading,
                        isLoadingButton: false,
                    }
                })

                toastCore.success("Báo cáo xe thành công")
            } else {
                queryKeyIsStateLoadSuccess({
                    loading: {
                        ...isStateLoadSuccess.loading,
                        isLoadingButton: false,
                    }
                })

                toastCore.error(data?.message)
            }

        } catch (err) {
            throw err
        }
    }

    // vì Textarea bị xung đột nên bắt buộc...
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, onForm: any) => {
        if (e.key === "Enter" && e.ctrlKey) { // Kiểm tra Ctrl (Cmd) + Enter    
            e.preventDefault(); // Ngăn form gửi đi
            const textarea = e.currentTarget;
            const value = textarea.value;
            const selectionStart = textarea.selectionStart;
            const selectionEnd = textarea.selectionEnd;

            // Thêm ký tự xuống dòng (\n) vào vị trí con trỏ
            const newValue = value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);

            // Cập nhật giá trị của textarea
            textarea.value = newValue;

            // Đặt lại con trỏ vào vị trí mới
            textarea.setSelectionRange(selectionStart + 1, selectionStart + 1);

            // Gửi sự kiện change nếu cần
            const event = new Event('input', { bubbles: true });
            textarea.dispatchEvent(event);
        } else if (e.key === "Enter" && e.ctrlKey === false) {
            console.log('check enter');
            onForm()
            e.preventDefault(); // Ngăn form gửi đi
            // form.handleSubmit((values) => onSubmit(values))
        }
    };

    return (
        <Dialog modal open={openDialogReportCar} onOpenChange={handleOpenChangeModal}>
            <DialogOverlay />
            <DialogContent className="px-0 lg:max-w-[520px] md:max-w-[480px] w-full overflow-auto max-h-[90vh] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <DialogClose
                    onClick={handleOpenChangeModal}
                    className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                >
                    <X className="size-8 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader className='flex items-center justify-center w-full border-b pb-4'>
                    <DialogTitle className='text-2xl capitalize'>
                        Báo cáo xe
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => onSubmit(values))} className='space-y-4'>
                        <div className='flex flex-col gap-6'>
                            <div className='flex flex-col gap-2 pb-6 border border-b border-x-0 border-t-0'>
                                <Label className='text-base text-[#000000] font-semibold'>
                                    Lý do báo xấu
                                </Label>
                                <Select
                                    value={isStateDetailCar?.reportCar?.selectReportCar}
                                    onValueChange={(value) => handleChangeSelectReport(value)}
                                >
                                    <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                                        <SelectValue placeholder="Chọn lí do" className='placeholder:text-base placeholder:font-medium placeholder:text-red-500' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                isStateDetailCar?.reportCar?.listReportCar && isStateDetailCar?.reportCar?.listReportCar.map((item) => (
                                                    <SelectItem
                                                        key={item.id}
                                                        value={`${item.id}`}
                                                        className='flex flex-row items-center'
                                                    >
                                                        <div>
                                                            {item.name ? item.name : ''}
                                                        </div>
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <FormField
                                    control={form.control}
                                    name="content"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Vui lòng nhập nội dung báo cáo',
                                        },
                                    }}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea
                                                        disabled={form.formState.isSubmitting}
                                                        placeholder="Nhập nội dung"
                                                        className={`${fieldState?.invalid && fieldState?.error ? "border border-[#FA3434]" : "border"} 3xl:h-40 h-36 resize  rounded-lg bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0`}
                                                        onKeyDown={(event) => handleKeyDown(event, form.handleSubmit((values) => onSubmit(values)))}
                                                        {...field}
                                                    />

                                                </FormControl>

                                                {
                                                    fieldState?.invalid && fieldState?.error && (
                                                        <FormMessage>{fieldState?.error?.message}</FormMessage>
                                                    )
                                                }
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        <ButtonLoading
                            title="Áp dụng"
                            type="submit"
                            onClick={() => { }}
                            className="flex items-center gap-2 w-full text-white border-[#2FB9BD] rounded-xl
                                border-2 h-14 bg-[#2FB9BD] font-semibold text-base leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80"
                            disabled={isStateLoadSuccess.loading.isLoadingButton}
                            isStateloading={isStateLoadSuccess.loading.isLoadingButton}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
