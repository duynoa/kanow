import React, { useEffect, useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";

import { X } from "lucide-react";

import { useDialogCancelCar } from "@/hooks/useOpenDialog";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "../ui/form";

import { useForm } from "react-hook-form";
import { getListReasonsCancel, postReasonCancelCar } from "@/services/cars/cancelCar.services";
import { Badge } from "../ui/badge";
import { toastCore } from "@/lib/toast";
type Props = {}

export function DialogCancelCar({ }: Props) {
    const {
        openDialogCancelCar,
        setOpenDialogCancelCar,
        dataListReasonsCancel,
        setDataListReasonsCancel,
        type,
        dataInfo
    } = useDialogCancelCar()

    const [contentReason, setContentReason] = useState<string>("");

    const form = useForm({
        defaultValues: {
            content: ""
        },
    });

    const handleOpenChangeModal = () => {
        setOpenDialogCancelCar(!openDialogCancelCar, "")
        form.reset();
    }

    useEffect(() => {
        if (openDialogCancelCar) {
            const fetchListReasonsCancel = async () => {
                const { data } = await getListReasonsCancel(type)
                console.log('data data Dtaa:', data);
                if (data && data.data) {
                    setDataListReasonsCancel(data.data)
                }
            }
            fetchListReasonsCancel()
        }
    }, [type])


    console.log('type : ', type);

    const handleChangeReason = (item: any) => {
        console.log('item : ', item);
        setContentReason(item.note)
    }

    const onSubmit = async (values: any) => {
        try {
            if (contentReason) {
                let dataReport = {
                    status: 5,
                    note: contentReason,
                    transaction_id: dataInfo?.car_id
                }

                const { data } = await postReasonCancelCar(dataReport)
                console.log('data xcxc', data);

                if (data?.result) {
                    toastCore?.success(data?.message)
                    setContentReason("")
                    form.reset()
                    setTimeout(() => {
                        setOpenDialogCancelCar(false)
                    }, 100);
                } else {
                    console.log(data?.message)
                    toastCore.error(data.message)
                }
            } else {
                toastCore.error("Vui lòng nhập nội dung!")
            }
        } catch (err) {
            throw err
        }
    }

    return (
        <Dialog modal open={openDialogCancelCar}>
            {/* <Dialog modal open={openDialogCancelCar} onOpenChange={handleOpenChangeModal}> */}
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
                        Xác nhận huỷ chuyến
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
                        <div className='flex flex-col gap-6 md:px-6 px-3'>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-base text-[#000000] font-semibold'>Lí do huỷ chuyến:</Label>

                                <div className='flex flex-wrap gap-2'>
                                    {
                                        dataListReasonsCancel && dataListReasonsCancel?.map((item) => (
                                            <React.Fragment key={`reason-${item.id}`}>
                                                <Badge onClick={() => handleChangeReason(item)} className='px-4 py-2 text-sm w-fit cursor-pointer caret-transparent bg-white border-[#2FB9BD] text-[#2FB9BD] hover:bg-[#2FB9BD]/20 duration-200 transition'>
                                                    {item.note}
                                                </Badge>
                                            </React.Fragment>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-base text-[#000000] font-semibold'>Nội dung</Label>
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field, fieldState }) => {
                                        const handleTextareaChange = (
                                            e: React.ChangeEvent<HTMLTextAreaElement>
                                        ) => {
                                            field.onChange(e);
                                            setContentReason(e.target.value)
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
                                                            value={contentReason}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        <div className='pt-8 md:px-6 px-3 flex flex-row gap-2 justify-end bg-white caret-transparent'>
                            <Button
                                type="button"
                                onClick={handleOpenChangeModal}
                                className='3xl:text-base text-sm w-fit py-3 px-6 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-transparent transition-all overflow-hidden bg-transparent text-[#585F71]'
                            >
                                Hủy
                            </Button>

                            <Button
                                type="submit"
                                className='3xl:text-base text-sm w-fit py-3 px-6 3xl:gap-2 gap-1 3xl:rounded-2xl rounded-xl cursor-pointer hover:scale-105 hover:bg-red-500/80 transition-all overflow-hidden bg-red-500 text-white'
                            >
                                Huỷ chuyến
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
