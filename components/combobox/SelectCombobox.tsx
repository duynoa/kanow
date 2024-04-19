import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/commandCustom"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, Search } from "lucide-react"

const SelectCombobox = ({ data, onChange, field, onValueChange, placeholderInput }: any) => {
    return (
        <Command className="w-full">
            {/* <CommandInput placeholder="Search x..." /> */}
            {/* <CommandInput placeholder="Type 'cat' or 'dog'..." onValueChange={(e) => onValueChange(e)} /> */}
            <div className="relative">
                <Input
                    className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-8 text-sm"
                    onChange={({ target: { value } }) => onValueChange(value)}
                    placeholder={placeholderInput}
                />
                <Search className="w-5 h-5 absolute top-1/2 -translate-y-1/2  left-2 text-[#200E32]" />
            </div>
            <CommandList>
                <CommandEmpty>Không có dữ liệu</CommandEmpty>
                {data && data?.length > 0 ?
                    <CommandGroup>
                        {data?.map((x: any) => (
                            <CommandItem
                                key={x.value}
                                onSelect={(e) => onChange(x.value)}
                                value={x.value}
                                className="w-full"
                            >
                                {x.label}
                                <Check className={cn("mr-2 ml-2 h-4 w-4 text-[#2FB9BD]", field.value === x.value ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    : null
                }
            </CommandList>
        </Command>

    )
}
export default SelectCombobox