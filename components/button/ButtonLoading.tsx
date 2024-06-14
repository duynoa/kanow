import { Button } from "@/components/ui/button"

type Props = {
    onClick: () => void;
    title: string
    disabled?: boolean
    className?: string
    type?: "button" | "submit" | "reset"
    isStateloading: boolean
}
const ButtonLoading = ({ onClick, title, disabled, className, isStateloading, type }: Props) => {
    // const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    //     if (event.key === 'Enter') {
    //         onClick();
    //     }
    // };

    console.log('type', type);


    return (
        <Button
            onClick={() => onClick()}
            type={type ? type : "button"}
            className={className}
            disabled={disabled}
        // onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => handleKeyDown(event)}
        >
            {
                isStateloading &&
                <span className="text-white inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            }
            <span>{title}</span>
        </Button >
    )
}
export default ButtonLoading