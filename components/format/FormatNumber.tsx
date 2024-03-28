export const FormatNumberToThousands = (number: number): string => {
    if (number >= 1000) {
        return (number / 1000)?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "k";
    } else {
        return number?.toString();
    }
}

export const FormatNumberComma = (number: number): string => {
    return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const FormatNumberDot = (number: number): string => {
    return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const FormatNumberToDecimal = (number: number, decimalPlaces: number): string => {
    const roundedNumber = parseFloat(number.toFixed(decimalPlaces));
    return roundedNumber?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const FormatNumberHundred = (number: number, max_number: number): string => {
    if (number >= max_number) {
        return `${max_number}+`;
    } else {
        return number?.toString()
    }
}
// export const formatPhoneNumber = (phoneNumber: string): string => {
//     return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
// };
export const formatPhoneNumber = (number: number | string, decimalPlaces?: number): string => {
    // Chuyển đổi số điện thoại thành chuỗi và loại bỏ tất cả các ký tự không phải là số
    const numberString = number.toString().replace(/\D/g, '');

    // Kiểm tra xem chuỗi số điện thoại có đủ độ dài không để áp dụng định dạng
    if (numberString.length < 10) {
        return numberString; // Trả về số điện thoại không định dạng nếu ngắn hơn 10 ký tự
    }

    // Tạo chuỗi số điện thoại với định dạng
    const formattedNumber = numberString.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");

    return formattedNumber;
}