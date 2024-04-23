import { NumericFormatCore } from "@/lib/numericFormat"

const NumericFormatCustom = (props: any) => {
    return <NumericFormatCore   {...props} className={`${props.className} `}

    />
}
export default NumericFormatCustom