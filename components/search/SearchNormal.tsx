import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
type Props<T> = {
    classNameParent?: string,
    classNameIcon?: string,
    classNameInput?: string,
    placeholder?: string,
    isClearable?: boolean,
    value?: string,
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    setValue?: (e: any) => void;

} & InputHTMLAttributes<HTMLInputElement>;
const SearchNormal = <T extends string | number>({
    classNameParent,
    classNameInput,
    classNameIcon,
    placeholder = "Search...",
    isClearable = false,
    value = "",
    onChange,
    setValue,
    ...inputProps
}: Props<T>) => {


    return (
        <div className={cn('relative', classNameParent)}>
            <Search className={cn('w-5 h-5 absolute top-[30%] left-4 text-[#64748B] dark:text-[#99A8C1]', classNameIcon)} />
            <Input
                type="text"
                placeholder={placeholder}
                className={cn(`focus-visible:ring-0 dark:placeholder:text-[#4F5D72] focus-visible:ring-offset-0 border border-[#E2E8F0] dark:border-[#394456] text-small-default rounded-xl bg-transparent px-12 py-3 h-auto`, classNameInput)}
                value={value}
                onChange={onChange && onChange}
                {...inputProps}
            />
            {
                (isClearable && value !== "") &&
                <div
                    onClick={() => {
                        setValue && setValue("")
                    }}
                    className={'absolute top-1/2 -translate-y-1/2 right-4 bg-gray-200 rounded-full hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer'}>
                    <X className="size-5 text-[#64748B] p-1" />
                </div>
            }
        </div>
    )
}
export default SearchNormal