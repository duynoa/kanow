import { useEffect, useState } from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"

import { X } from "lucide-react"

import { useDialogAnswerPolicy } from "@/hooks/useOpenDialog";
import { IInitialStateDetailCar } from "@/types/Initial/IInitial";
import { useDataInfoRentalCar, useDataPolicy } from "@/hooks/useDataQueryKey";

type Props = {}

export function DialogAnswerPolicy({ }: Props) {
    const { openDialogAnswerPolicy, setOpenDialogAnswerPolicy, type } = useDialogAnswerPolicy()
    const { isStatePolicy } = useDataPolicy()
    const { isStateInfoRentalCar } = useDataInfoRentalCar()

    const handleOpenChangeModal = () => {
        setOpenDialogAnswerPolicy(!openDialogAnswerPolicy)
    }

    return (
        <Dialog
            modal
            open={openDialogAnswerPolicy}
            onOpenChange={() => handleOpenChangeModal()}
        >
            <DialogOverlay />
            <DialogContent className="px-0 py-0 lg:max-w-[720px] md:max-w-[620px] max-w-[95%] w-full max-h-[95vh] overflow-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
                <DialogClose
                    onClick={() => handleOpenChangeModal()}
                    className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                >
                    <X className="size-8 text-[#000000]" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <DialogHeader className='flex items-center justify-center w-full border-b drop-shadow-sm py-4'>
                    <DialogTitle className='text-2xl capitalize max-w-[70%] caret-transparent'>
                        {type === "documentation_policy_car" && "Giấy tờ thuê xe"}
                        {type === "mortgage_policy_car" && "Tài sản thế chấp"}
                        {type === "setting_price_car" && "Đơn giá thuê xe"}
                        {type === "setting_insurance_car" && "Bảo hiểm thuê xe"}
                        {type === "cancellation_policy" && "Thủ tục hoàn tiền & đền cọc"}
                        {type === "document_deposit" && "Chính sách cọc"}
                        {type === "document_payment" && "Thanh toán khi nhận xe"}
                        {type === "total_km_car_talent" && "Chính sách di chuyển"}
                        {type === "rent_cost_owner" && "Đơn giá thuê - Chủ xe"}
                        {type === "fee_service_owner" && "Phí dịch vụ - Chủ xe"}
                    </DialogTitle>
                </DialogHeader>

                <div className='flex flex-col gap-2 p-4'>
                    {/* policy giấy tờ thuê xe */}
                    {
                        type === "documentation_policy_car" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.documentation_policy_car ? isStatePolicy?.dataPolicy?.documentation_policy_car : ''}` }} />
                    }
                    {/* policy tài sản thế chấp */}
                    {
                        type === "mortgage_policy_car" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.mortgage_policy_car ? isStatePolicy?.dataPolicy?.mortgage_policy_car : ''}` }} />
                    }
                    {/* policy đơn giá thuê */}
                    {
                        type === "setting_price_car" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.setting_price_car ? isStatePolicy?.dataPolicy?.setting_price_car : ''}` }} />
                    }
                    {/* policy bảo hiểm */}
                    {
                        type === "setting_insurance_car" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.setting_insurance_car ? isStatePolicy?.dataPolicy?.setting_insurance_car : ''}` }} />
                    }
                    {/* policy huỷ chuyến */}
                    {
                        type === "cancellation_policy" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund ? isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund : ''}` }} />
                    }
                    {/* policy cọc */}
                    {
                        type === "document_deposit" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund ? isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund : ''}` }} />
                    }
                    {/* policy thanh toán khi nhận xe */}
                    {
                        type === "document_payment" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund ? isStatePolicy?.dataPolicy?.cancel_trip?.compensation_refund : ''}` }} />
                    }
                    {/* policy số km tối đa đi được */}
                    {
                        type === "total_km_car_talent" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStatePolicy?.dataPolicy?.car_talent?.total_km_car_talent ? isStatePolicy?.dataPolicy?.car_talent?.total_km_car_talent : ''}` }} />
                    }
                    {/* policy đơn giá thuê - chủ xe */}
                    {
                        type === "rent_cost_owner" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStateInfoRentalCar?.detailRentalCar?.policy?.rent_cost_owner ? isStateInfoRentalCar?.detailRentalCar?.policy?.rent_cost_owner : ''}` }} />
                    }
                    {/* policy phí dịch vụ - chủ xe */}
                    {
                        type === "fee_service_owner" &&
                        <span dangerouslySetInnerHTML={{ __html: `${isStateInfoRentalCar?.detailRentalCar?.policy?.fee_service_owner ? isStateInfoRentalCar?.detailRentalCar?.policy?.fee_service_owner : ''}` }} />
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
