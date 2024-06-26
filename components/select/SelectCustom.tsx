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
    dataMonths: any[],
    selectedMonth: any,
    handleChangeValue: (value: any) => void
}

const SelectCustom = ({ dataMonths, selectedMonth, handleChangeValue }: Props) => {

    return (
        <SelectNocheck
            value={selectedMonth}
            onValueChange={(value) => handleChangeValue(value)}
        >
            <SelectTriggerNocheck className="md:w-[240px] w-[180px] border-0 bg-transparent 2xl:text-base md:text-sm text-base text-[#2FB9BD] font-semibold focus:ring-0 focus:ring-offset-0">
                <SelectValueNocheck placeholder="Chọn tháng" />
            </SelectTriggerNocheck>
            <SelectContentNocheck >
                <SelectGroupNocheck>
                    {
                        dataMonths && dataMonths.map((date) => (
                            <SelectItemNocheck
                                key={`date-${date.date}`}
                                value={date.date}
                            >
                                {moment(date.date, "MM-yyyy").format("[Tháng] MM-yyyy")}
                            </SelectItemNocheck>
                        ))
                    }
                </SelectGroupNocheck>
            </SelectContentNocheck>
        </SelectNocheck>
    )
}
export default SelectCustom
