import { Button } from "@/components/ui/button"

type Props = {
    onClick: () => void;
    title: string
}
const ButtonSaveForm = ({ onClick, title }: Props) => {
    return (
        <Button
            onClick={() => onClick()}
            type="button"
            className={`md:w-fit w-full text-white border-[#2FB9BD] rounded-xl
                border-2 px-10 py-3 bg-[#2FB9BD] font-semibold 3xl:text-base lg:text-sm text-xs leading-[17px] hover:bg-[#2FB9BD]/80 hover:border-[#2FB9BD]/80`}>
            {title}
        </Button>
    )
}
export default ButtonSaveForm