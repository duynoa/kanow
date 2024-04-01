
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useCookie } from "@/hooks/useCookie";
import { useDialogLogin, useDialogRequestCarRental } from "@/hooks/useOpenDialog";
import Image from "next/image";

type Props = {};

export function DialogRequestCarRental({ }: Props) {
    const { setCookie, removeCookie } = useCookie()
    const { openDialogRequestCarRental, dataListRequestCarRental, setOpenDialogRequestCarRental } = useDialogRequestCarRental()

    console.log('dataListRequestCarRental', dataListRequestCarRental);
    console.log('openDialogRequestCarRental', openDialogRequestCarRental);


    return (
        <Dialog modal open={openDialogRequestCarRental} onOpenChange={() => setOpenDialogRequestCarRental(false)}>
            <DialogOverlay />
            <DialogContent className={`lg:max-w-[1024px] max-w-[95%] py-0 max-h-[90vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0`}>
                <DialogClose
                    onClick={() => setOpenDialogRequestCarRental(false)}
                    className="size-8 border flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-4 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <DialogHeader className="flex items-start w-full pt-6">
                    <DialogTitle className={`text-2xl capitalize font-semibold`}>
                        Xác nhận đặt xe
                    </DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-4 pb-6'>
                        <div className='w-56 h-36'>
                            <Image
                                alt="image"
                                width={400}
                                height={400}
                                className='w-full h-full object-cover rounded-lg'
                                src={dataListRequestCarRental?.dataDetailCar && dataListRequestCarRental?.dataDetailCar?.image_car ? dataListRequestCarRental?.dataDetailCar?.image_car[0]?.name : "/default/default.png"}
                            />
                        </div>

                        <div className='flex flex-col justify-between'>
                            <div className='text-base font-semibold uppercase'>
                                {dataListRequestCarRental?.dataDetailCar?.name_car ? dataListRequestCarRental?.dataDetailCar?.name_car : ""}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='space-x-2'>
                                    <span>
                                        Mã số xe: {dataListRequestCarRental?.dataDetailCar?.trait_car?.number_car ? dataListRequestCarRental?.dataDetailCar?.trait_car?.number_car : ""}
                                    </span>
                                    <span className="">

                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
