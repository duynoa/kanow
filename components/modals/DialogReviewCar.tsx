import React, { useEffect, useState } from "react"

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

import { BadgeAlert, X } from "lucide-react";

import { useDialogReportCar, useDialogReviewCar } from "@/hooks/useOpenDialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

import { useForm } from "react-hook-form";

import { useDataDetailCar, useDataInfoRentalCar } from "@/hooks/useDataQueryKey";
import { useAuth } from "@/hooks/useAuth";
import StarRatings from "react-star-ratings";
import { uuidv4 } from "@/lib/uuid";
import { Badge } from "../ui/badge";
import { getListContentReview, postAddReviewCar } from "@/services/cars/cars.services";
import { toastCore } from "@/lib/toast";

type Props = {}

const dataFake = [
    {
        id: uuidv4(),
        name: "Chuyên nghiệp",
    },
    {
        id: uuidv4(),
        name: "Giao hàng tận tay",
    },
    {
        id: uuidv4(),
        name: "Vấn đề vệ sinh",
    },
    {
        id: uuidv4(),
        name: "Thân thiện",
    },
    {
        id: uuidv4(),
        name: "Giao hàng không tiếp xúc",
    },
    {
        id: uuidv4(),
        name: "Giao hàng nhanh",
    },
]

export function DialogReviewCar({ }: Props) {
    const [rating, setRating] = useState<number>(4);
    const [selectedReasons, setSelectedReasons] = useState<any[]>([]);

    const { openDialogReviewCar, setOpenDialogReviewCar } = useDialogReviewCar()

    const { informationUser } = useAuth()
    const { isStateInfoRentalCar } = useDataInfoRentalCar()

    console.log('informationUser', informationUser);
    console.log('isStateInfoRentalCar', isStateInfoRentalCar);

    const form = useForm({
        defaultValues: {
            content: ""
        },
    });

    useEffect(() => {
        if (openDialogReviewCar) {
            const fetchListContentReview = async () => {
                try {
                    let type_review;
                    if (informationUser?.id === isStateInfoRentalCar?.detailRentalCar?.customer?.id) {
                        type_review = 2
                    } else if (informationUser?.id !== isStateInfoRentalCar?.detailRentalCar?.customer?.id) {
                        type_review = 1
                    }

                    let dataParams = {
                        type_review: type_review
                    }

                    const { data } = await getListContentReview(dataParams)

                    console.log('data list content review', data);

                } catch (err) {
                    throw err
                }
            }
            fetchListContentReview()
        }
    }, [openDialogReviewCar])


    const changeRating = (newRating: number) => {
        setRating(newRating);
    };

    const handleOpenChangeModal = () => {
        setOpenDialogReviewCar(false)
    }


    const handleChangeReason = (item: any) => {
        setSelectedReasons((prevSelectedReasons) => {
            if (prevSelectedReasons.includes(item.id)) {
                return prevSelectedReasons.filter((reasonId) => reasonId !== item.id);
            } else {
                return [...prevSelectedReasons, item.id];
            }
        });
    };

    const onSubmit = async (values: any) => {
        try {
            console.log('values :', values);
            let type_review;
            if (informationUser?.id === isStateInfoRentalCar?.detailRentalCar?.customer?.id) {
                type_review = 2
            } else if (informationUser?.id !== isStateInfoRentalCar?.detailRentalCar?.customer?.id) {
                type_review = 1
            }


            const dataSubmit = {
                content: values.content,
                star: rating,
                transaction_id: isStateInfoRentalCar?.detailRentalCar?.id,
                type_review: type_review,
            }

            const { data } = await postAddReviewCar(dataSubmit)

            console.log('data submit 123', data);

            if (data && data.result) {
                toastCore.success("Đánh giá thành công!")
                setOpenDialogReviewCar(false)
            } else {
                toastCore.error(data.message)
                setOpenDialogReviewCar(false)
            }
        } catch (err) {
            throw err
        }
    }


    return (
        <Dialog modal open={openDialogReviewCar} onOpenChange={handleOpenChangeModal}>
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
                    {
                        informationUser?.id === isStateInfoRentalCar?.detailRentalCar?.customer?.id &&
                        <DialogTitle className='text-2xl capitalize'>
                            Chủ xe đánh giá
                        </DialogTitle>
                    }
                    {
                        informationUser?.id !== isStateInfoRentalCar?.detailRentalCar?.customer?.id &&
                        <DialogTitle className='text-2xl capitalize'>
                            Người thuê xe đánh giá
                        </DialogTitle>
                    }
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
                        <div className='flex flex-col gap-4 md:px-6 px-3'>
                            <div className='flex items-center justify-between font-semibold'>
                                {
                                    rating === 1 &&
                                    <div className='3xl:text-lg text-base'>
                                        Kém
                                    </div>
                                }
                                {
                                    rating === 2 &&
                                    <div className='3xl:text-lg text-base'>
                                        Trung Bình
                                    </div>
                                }
                                {
                                    rating === 3 &&
                                    <div className='3xl:text-lg text-base'>
                                        Khá
                                    </div>
                                }
                                {
                                    rating === 4 &&
                                    <div className='3xl:text-lg text-base'>
                                        Tốt
                                    </div>
                                }
                                {
                                    rating === 5 &&
                                    <div className='3xl:text-lg text-base'>
                                        Hoàn hảo
                                    </div>
                                }
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="#FCC43E"
                                    starHoverColor='#FCC43E'
                                    starDimension='24px'
                                    starSpacing='0px'
                                    numberOfStars={5}
                                    name='rating'
                                    changeRating={changeRating}
                                />
                            </div>

                            <div className='flex flex-wrap gap-2'>
                                {
                                    dataFake && dataFake?.map((item) => (
                                        <React.Fragment key={`reason-${item.id}`}>
                                            <Badge
                                                variant={"secondary"}
                                                onClick={() => handleChangeReason(item)}
                                                className={`px-4 py-2 text-sm w-fit cursor-pointer caret-transparent hover:bg-[#2FB9BD]/20 hover:border-[#2FB9BD] hover:text-[#2FB9BD] transition duration-200 
                                                ${selectedReasons.includes(item.id)
                                                        ? 'bg-white border-[#2FB9BD] bg-[#2FB9BD]/20 text-[#2FB9BD] '
                                                        : ''
                                                    }`}
                                            >
                                                {item.name}
                                            </Badge>
                                        </React.Fragment>
                                    ))
                                }
                            </div>

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

                            <Button
                                type="submit"
                                className='xl:px-6 xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-full'
                            >
                                Áp dụng
                            </Button>
                            {/* <div className='pt-8 pb-4 bg-white'>
                            </div> */}
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
