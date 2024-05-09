'use client'
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useDialogFilterMyCar } from "@/hooks/useOpenDialog"
import { SelectItemNocheck } from "@/components/ui/selectNocheck"
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import { useDataProfileMyCar } from "@/hooks/useDataQueryKey"

type Props = {
    children?: React.ReactNode,
}

const DialogFilterMyCar = ({ children }: Props) => {
    const { dataFilter, openDialogFilterCar, setOpenDialogFilterCar, setValueFilter, valueFilter, defaultValue, setDefaultValue } = useDialogFilterMyCar()

    const [valueModel, setValueModel] = useState<any>(valueFilter ?? -1)
    const { queryKeyIsStateProfileMyCar, isStateProfileMyCar } = useDataProfileMyCar()

    const handleSubmitFilter = () => {
        queryKeyIsStateProfileMyCar({ page: 1 })
        setValueFilter(valueModel)
        setDefaultValue(valueFilter)
        setOpenDialogFilterCar(!openDialogFilterCar)
    }


    useEffect(() => {
        if (openDialogFilterCar) {
            setValueModel(valueFilter ?? -1)
        }
    }, [openDialogFilterCar])

    return (
        <Dialog
            modal
            open={openDialogFilterCar}
        >
            <DialogPortal>
                <DialogOverlay onClick={() => setOpenDialogFilterCar(!openDialogFilterCar)} className="bg-black/60" />
                <DialogContent className="lg:w-[425px] w-[90%] p-0">
                    <DialogClose onClick={() => setOpenDialogFilterCar(!openDialogFilterCar)} className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
                    >
                        <X className="size-8 text-[#000000]" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                    <DialogHeader className='flex items-center justify-center w-full border-b drop-shadow-sm lg:p-6 p-5'>
                        <DialogTitle className='text-2xl capitalize'>
                            Trạng thái lọc
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 lg:px-6 px-5">
                        <Select
                            value={valueModel as string}
                            defaultValue={valueModel as string}
                            onValueChange={(value) => setValueModel(value)}
                        >
                            <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0 ">
                                <SelectValue placeholder="Chọn trạng thái lọc" />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectGroup >
                                    {dataFilter.map((item: any) => (
                                        <SelectItemNocheck
                                            key={item.id}
                                            value={item.id as string}
                                        >
                                            <div className="flex items-center gap-2">
                                                <h1 style={{
                                                    color: item.color
                                                }}>{item.name}</h1>
                                                <Check className={cn("mr-2 ml-2 h-4 w-4 text-[#2FB9BD]", valueModel === item.id ? "opacity-100" : "opacity-0")} />
                                            </div>
                                        </SelectItemNocheck>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter className="lg:px-6 px-5 lg:pb-6 pb-5 ml-auto">
                        <Button
                            type="button"
                            className='xl:px-6 xl:py-3 px-4 py-2 xl:text-base text-sm rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 w-fit'
                            onClick={() => {
                                // queryState({ openFilter: false, page: 1, status_car: value })
                                handleSubmitFilter()
                            }}
                        >
                            Áp dụng
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </DialogPortal>
        </Dialog>
    )


}
export default DialogFilterMyCar