import * as React from "react"

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
import moment from "moment"
import { SelectContentNocheck, SelectGroupNocheck, SelectItemNocheck, SelectNocheck, SelectTriggerNocheck, SelectValueNocheck } from "../ui/selectNocheck"

type Props = {
    dataMonths: any[]
}

const SelectCustom = ({ dataMonths }: Props) => {

    return (
        <SelectNocheck>
            <SelectTriggerNocheck className="w-[200px] border-0 bg-transparent 2xl:text-base text-sm text-[#2FB9BD] font-semibold focus:ring-0 focus:ring-offset-0">
                <SelectValueNocheck placeholder="Chọn tháng" />
            </SelectTriggerNocheck>
            <SelectContentNocheck>
                <SelectGroupNocheck>
                    {
                        dataMonths && dataMonths.map((date) => (
                            <SelectItemNocheck
                                key={`date-${date.id}`}
                                value={date.id}
                            >
                                {moment(date.date, "MM-YYYY").format("[Tháng] MM-YYYY")}
                            </SelectItemNocheck>
                        ))
                    }
                </SelectGroupNocheck>
            </SelectContentNocheck>
        </SelectNocheck>
    )
}
export default SelectCustom
