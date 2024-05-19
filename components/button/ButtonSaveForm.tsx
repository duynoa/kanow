import { Button } from "@/components/ui/button"
import { useLoadSuccess } from "@/hooks/useLoadSuccess";

type Props = {
    onClick: () => void;
    title: string
    disabled?: boolean
}
const ButtonSaveForm = ({ onClick, title, disabled }: Props) => {
    const { isStateLoadSuccess, queryKeyIsStateLoadSuccess } = useLoadSuccess()

    return (
        <Button
            onClick={() => onClick()}
            type="button"
            className={`flex items-center gap-2 md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                border-2 3xl:px-10 3xl:py-3 px-6 py-3 bg-[#2FB9BD] font-semibold 2xl:text-base lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}
            disabled={disabled}
        >
            {isStateLoadSuccess.loading.isLoadingButton && <span className="text-[#white] inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />}
            <span>{title}</span>
        </Button >
    )
}
export default ButtonSaveForm