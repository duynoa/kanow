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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

import { useForm } from "react-hook-form";

import { postReportCar } from "@/services/cars/report.services";
import { toastCore } from "@/lib/toast";

import { IInitialStateDetailCar } from "@/types/Initial/IInitial";
import { useDataDetailCar } from "@/hooks/useDataQueryKey";

type Props = {}

export function DialogReportCar({ }: Props) {
    const { openDialogReportCar, setOpenDialogReportCar } = useDialogReportCar()
    const { isStateDetailCar, queryKeyIsStateDetailCar } = useDataDetailCar()

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
        try {
            let dataReport = {
                content: values?.content ? values?.content : "",
                report_id: isStateDetailCar?.reportCar?.selectReportCar,
                car_id: isStateDetailCar?.dataDetailCar?.id
            }

            const { data } = await postReportCar(dataReport)

            if (data?.result) {
                toastCore?.success(data?.message)
                setOpenDialogReportCar(false)
                form.reset()
                queryKeyIsStateDetailCar({
                    reportCar: {
                        ...isStateDetailCar?.reportCar,
                        selectReportCar: ""
                    }
                })
            } else {
                console.log(data?.message)
            }

        } catch (err) {
            throw err
        }
    }

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
                    <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
                        <div className='flex flex-col gap-6 md:px-6 px-3'>
                            <div className='flex flex-col gap-2 pb-6 border border-b border-x-0 border-t-0'>
                                <Label className='text-base text-[#000000] font-semibold'>Lý do báo xấu</Label>
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
                                    render={({ field, fieldState }) => {
                                        const handleTextareaChange = (
                                            e: React.ChangeEvent<HTMLTextAreaElement>
                                        ) => {
                                            field.onChange(e);
                                        }

                                        return (
                                            <FormItem>
                                                <div>
                                                    <FormControl>
                                                        <Textarea
                                                            disabled={form.formState.isSubmitting}
                                                            placeholder="Nhập nội dung"
                                                            className={`3xl:h-40 h-36 resize border rounded-lg bg-white focus-visible:ring-0 text-black focus-visible:ring-offset-0`}
                                                            onChange={handleTextareaChange}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        <div className='pt-8 pb-4 bg-white'>
                            <div className='md:px-6 px-3'>
                                <Button
                                    type="submit"
                                    className='xl:px-6 xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full'
                                >
                                    Áp dụng
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
