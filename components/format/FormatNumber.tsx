export const FormatNumberToThousands = (number: number): string => {
    if (number >= 1000) {
        return (number / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "k";
    } else {
        return number.toString();
    }
}

export const FormatNumberComma = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const FormatNumberDot = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const FormatNumberToDecimal = (number: number, decimalPlaces: number): string => {
    const roundedNumber = parseFloat(number.toFixed(decimalPlaces));
    return roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const FormatNumberHundred = (number: number, max_number: number): string => {
    if (number >= max_number) {
        return `${max_number}+`;
    } else {
        return number.toString()
    }
}