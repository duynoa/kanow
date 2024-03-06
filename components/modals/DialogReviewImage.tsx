import { useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { X } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { useDialogImage } from "@/hooks/useDialogImage";

type Props = {
}

export function DialogReviewImage({ }: Props) {
    const { openDialogReview, setOpenDialogReview, dataImage, indexImage } = useDialogImage();

    const handleOpenChangeModal = () => {
        setOpenDialogReview(!openDialogReview)
    }

    console.log('dataImage', dataImage);


    const sortedDataImage = [...dataImage];
    if (dataImage?.some((item: any) => item?.preview)) {
        const selectedElement = sortedDataImage?.splice(indexImage, 1)[0];
        sortedDataImage?.unshift(selectedElement);
    }
    if (dataImage?.some((item: any) => item.image)) {
        const selectedElement = sortedDataImage?.splice(indexImage, 1)[0];
        sortedDataImage?.unshift(selectedElement);
    }

    return (
        <Dialog modal open={openDialogReview} onOpenChange={handleOpenChangeModal}>
            <DialogOverlay />
            <DialogContent className="md:max-w-[80%] max-w-full w-full flex justify-center p-0 gap-0 bg-transparent border-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <Carousel className="w-full max-w-full h-full ">
                    {/* <Carousel className="w-full 3xl:max-w-[760px] 2xl:max-w-[520px] max-w-[520px] p-2 "> */}
                    <CarouselContent>
                        {sortedDataImage?.length > 0 &&
                            sortedDataImage?.map((image: any, index: any) => {
                                const imageUrl = image?.image ? image?.image : URL.createObjectURL(image);

                                return (
                                    <CarouselItem
                                        key={`index-${index}`}
                                        className="w-full max-w-full h-auto max-h-[800px]"
                                    // className="w-full 3xl:max-w-[760px] 2xl:max-w-[520px] max-w-[520px]"
                                    >
                                        <Image
                                            width={1920}
                                            height={1080}
                                            alt="image"
                                            src={imageUrl}
                                            className="w-full h-full aspect-square object-contain"
                                            priority
                                        />
                                    </CarouselItem>
                                );
                            })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </DialogContent>
        </Dialog>
    )
}
