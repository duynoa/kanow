import Image from "next/image";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
} from "@/components/ui/dialog"

import { X } from "lucide-react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";

import { useDialogImage } from "@/hooks/useDialogImage";

type Props = {
}

export function DialogReviewImage({ }: Props) {
    const { openDialogReview, setOpenDialogReview, dataImage, indexImage } = useDialogImage();

    const handleOpenChangeModal = () => {
        setOpenDialogReview(!openDialogReview)
    }

    const sortedDataImage = [...dataImage];
    if (dataImage?.some((item: any) => item?.preview)) {
        const selectedElement = sortedDataImage?.splice(indexImage, 1)[0];
        sortedDataImage?.unshift(selectedElement);
    }
    if (dataImage?.some((item: any) => item.name)) {
        const selectedElement = sortedDataImage?.splice(indexImage, 1)[0];
        sortedDataImage?.unshift(selectedElement);
    }

    console.log('dataImage', dataImage);


    return (
        <Dialog modal open={openDialogReview} >
            <DialogOverlay />
            <DialogContent className="md:max-w-[80%] shadow-none max-w-full w-full flex justify-center p-0 gap-0 bg-transparent border-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <DialogClose
                    onClick={handleOpenChangeModal}
                    className="3xl:size-10 size-8 border flex items-center justify-center p-2 rounded-full absolute lg:-right-10 md:-right-12 right-4 3xl:-top-12 lg:-top-10 md:-top-12 -top-14 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                >
                    <X className="size-8 text-white" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <Carousel className="w-full max-w-full h-full ">
                    {/* <Carousel className="w-full 3xl:max-w-[760px] 2xl:max-w-[520px] max-w-[520px] p-2 "> */}
                    <CarouselContent>
                        {
                            sortedDataImage?.length > 0 &&
                            sortedDataImage?.map((image: any, index: any) => {
                                const imageUrl = image?.name ? image?.name : URL?.createObjectURL(image?.name);

                                console.log('image?.name : ', image?.name);

                                return (
                                    <CarouselItem
                                        key={`index-${index}`}
                                        className='w-auto'
                                    >
                                        <div className="w-full max-w-full h-full 3xl:max-h-[800px] max-h-[600px]">
                                            <Image
                                                width={1536}
                                                height={900}
                                                alt="image"
                                                src={imageUrl}
                                                className="w-full h-full aspect-video lg:object-contain object-cover object-center"
                                                priority
                                            />
                                        </div>
                                    </CarouselItem>
                                );
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </DialogContent>
        </Dialog>
    )
}
